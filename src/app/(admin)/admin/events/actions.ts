'use server'

import { and, eq, ne } from 'drizzle-orm'
import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db/client'
import { LOCALES, eventTranslations, events } from '@/db/schema/content'
import type { Locale } from '@/db/schema/content'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'
import { EVENTS_CACHE_TAGS } from '@/lib/content/events'
import { translateField } from '@/lib/translate'
import { eventFormSchema, type EventFormValues } from './schema'

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function revalidateEvents(slug?: string) {
  updateTag(EVENTS_CACHE_TAGS.all)
  if (slug) updateTag(EVENTS_CACHE_TAGS.one(slug))
  revalidatePath('/events')
  if (slug) revalidatePath(`/events/${slug}`)
  for (const l of LOCALES) {
    if (l === 'en') continue
    revalidatePath(`/${l}/events`)
    if (slug) revalidatePath(`/${l}/events/${slug}`)
  }
}

async function ensureSlugUnique(slug: string, excludeId?: string) {
  const existing = await db
    .select({ id: events.id })
    .from(events)
    .where(
      excludeId
        ? and(eq(events.slug, slug), ne(events.id, excludeId))
        : eq(events.slug, slug),
    )
    .limit(1)
  return existing.length === 0
}

export async function createEventAction(values: EventFormValues): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = eventFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }
  const v = parsed.data

  if (!(await ensureSlugUnique(v.slug))) {
    return { ok: false, error: 'Slug already taken', fieldErrors: { slug: 'Slug already taken' } }
  }

  const inserted = await db
    .insert(events)
    .values({
      slug: v.slug,
      startDate: new Date(v.startDate),
      endDate: v.endDate ? new Date(v.endDate) : null,
      location: v.location || null,
      status: v.status,
      imagePath: v.imagePath || null,
    })
    .returning({ id: events.id })

  const id = inserted[0].id

  await db.insert(eventTranslations).values(
    LOCALES.map((l) => ({
      eventId: id,
      locale: l,
      title: v.translations[l].title,
      description: v.translations[l].description,
      machineTranslated: v.translations[l].machineTranslated,
    })),
  )

  await writeAudit({
    userId: session.user.id,
    action: 'create',
    entityType: 'event',
    entityId: id,
    diff: { slug: v.slug, status: v.status },
  })
  revalidateEvents(v.slug)
  redirect(`/admin/events/${id}`)
}

export async function updateEventAction(
  id: string,
  values: EventFormValues,
): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = eventFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }
  const v = parsed.data

  const current = await db.query.events.findFirst({ where: eq(events.id, id) })
  if (!current) return { ok: false, error: 'Not found' }

  if (v.slug !== current.slug && !(await ensureSlugUnique(v.slug, id))) {
    return { ok: false, error: 'Slug already taken', fieldErrors: { slug: 'Slug already taken' } }
  }

  await db
    .update(events)
    .set({
      slug: v.slug,
      startDate: new Date(v.startDate),
      endDate: v.endDate ? new Date(v.endDate) : null,
      location: v.location || null,
      status: v.status,
      imagePath: v.imagePath || null,
    })
    .where(eq(events.id, id))

  for (const l of LOCALES) {
    const t = v.translations[l]
    await db
      .insert(eventTranslations)
      .values({
        eventId: id,
        locale: l,
        title: t.title,
        description: t.description,
        machineTranslated: t.machineTranslated,
      })
      .onConflictDoUpdate({
        target: [eventTranslations.eventId, eventTranslations.locale],
        set: {
          title: t.title,
          description: t.description,
          machineTranslated: t.machineTranslated,
        },
      })
  }

  await writeAudit({
    userId: session.user.id,
    action: current.status === v.status ? 'update' : v.status === 'published' ? 'publish' : 'unpublish',
    entityType: 'event',
    entityId: id,
    diff: { slug: v.slug, status: v.status, previousStatus: current.status },
  })
  revalidateEvents(v.slug)
  if (current.slug !== v.slug) revalidateEvents(current.slug)
  return { ok: true }
}

export async function deleteEventAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin()
  const current = await db.query.events.findFirst({ where: eq(events.id, id) })
  if (!current) return { ok: false, error: 'Not found' }
  await db.delete(events).where(eq(events.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'delete',
    entityType: 'event',
    entityId: id,
    diff: { slug: current.slug },
  })
  revalidateEvents(current.slug)
  redirect('/admin/events')
}

export async function translateEventAction(input: {
  from: Locale
  to: Locale
  fields: { title: string; description: string }
}): Promise<
  | { ok: true; fields: { title: string; description: string } }
  | { ok: false; error: string }
> {
  await requireAdmin()
  try {
    const [title, description] = await Promise.all([
      translateField({ text: input.fields.title, from: input.from, to: input.to, context: 'Event title' }),
      translateField({
        text: input.fields.description,
        from: input.from,
        to: input.to,
        context: 'Event description',
      }),
    ])
    return { ok: true, fields: { title, description } }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Translation failed' }
  }
}
