'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db/client'
import { LOCALES, announcementTranslations, announcements } from '@/db/schema/content'
import type { Locale } from '@/db/schema/content'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'
import { ANNOUNCEMENTS_CACHE_TAGS } from '@/lib/content/announcements'
import { sanitizeRichText } from '@/lib/sanitize-html'
import { translateField } from '@/lib/translate'
import {
  announcementFormSchema,
  type AnnouncementFormValues,
} from './schema'

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function revalidateAll() {
  updateTag(ANNOUNCEMENTS_CACHE_TAGS.all)
  revalidatePath('/')
  for (const l of LOCALES) {
    if (l === 'en') continue
    revalidatePath(`/${l}`)
  }
}

export async function createAnnouncementAction(
  values: AnnouncementFormValues,
): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = announcementFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }
  const v = parsed.data

  const inserted = await db
    .insert(announcements)
    .values({
      severity: v.severity,
      status: v.status,
      startsAt: v.startsAt ? new Date(v.startsAt) : null,
      endsAt: v.endsAt ? new Date(v.endsAt) : null,
    })
    .returning({ id: announcements.id })

  const id = inserted[0].id

  await db.insert(announcementTranslations).values(
    LOCALES.map((l) => ({
      announcementId: id,
      locale: l,
      title: v.translations[l].title,
      body: sanitizeRichText(v.translations[l].body),
      machineTranslated: v.translations[l].machineTranslated,
    })),
  )

  await writeAudit({
    userId: session.user.id,
    action: 'create',
    entityType: 'announcement',
    entityId: id,
    diff: { severity: v.severity, status: v.status },
  })

  revalidateAll()
  redirect(`/admin/announcements/${id}`)
}

export async function updateAnnouncementAction(
  id: string,
  values: AnnouncementFormValues,
): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = announcementFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message])),
    }
  }
  const v = parsed.data

  const current = await db.query.announcements.findFirst({ where: eq(announcements.id, id) })
  if (!current) return { ok: false, error: 'Not found' }

  await db
    .update(announcements)
    .set({
      severity: v.severity,
      status: v.status,
      startsAt: v.startsAt ? new Date(v.startsAt) : null,
      endsAt: v.endsAt ? new Date(v.endsAt) : null,
    })
    .where(eq(announcements.id, id))

  for (const l of LOCALES) {
    const t = v.translations[l]
    const body = sanitizeRichText(t.body)
    await db
      .insert(announcementTranslations)
      .values({
        announcementId: id,
        locale: l,
        title: t.title,
        body,
        machineTranslated: t.machineTranslated,
      })
      .onConflictDoUpdate({
        target: [announcementTranslations.announcementId, announcementTranslations.locale],
        set: {
          title: t.title,
          body,
          machineTranslated: t.machineTranslated,
        },
      })
  }

  await writeAudit({
    userId: session.user.id,
    action: current.status === v.status ? 'update' : v.status === 'published' ? 'publish' : 'unpublish',
    entityType: 'announcement',
    entityId: id,
    diff: { severity: v.severity, status: v.status, previousStatus: current.status },
  })

  revalidateAll()
  return { ok: true }
}

export async function deleteAnnouncementAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin()
  const current = await db.query.announcements.findFirst({ where: eq(announcements.id, id) })
  if (!current) return { ok: false, error: 'Not found' }
  await db.delete(announcements).where(eq(announcements.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'delete',
    entityType: 'announcement',
    entityId: id,
  })
  revalidateAll()
  redirect('/admin/announcements')
}

export async function translateAnnouncementAction(input: {
  from: Locale
  to: Locale
  fields: { title: string; body: string }
}): Promise<
  | { ok: true; fields: { title: string; body: string } }
  | { ok: false; error: string }
> {
  await requireAdmin()
  try {
    const [title, body] = await Promise.all([
      translateField({ text: input.fields.title, from: input.from, to: input.to, context: 'Announcement title' }),
      translateField({ text: input.fields.body, from: input.from, to: input.to, context: 'Announcement body' }),
    ])
    return { ok: true, fields: { title, body } }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Translation failed' }
  }
}
