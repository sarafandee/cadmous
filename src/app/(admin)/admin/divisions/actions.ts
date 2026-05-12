'use server'

import { and, eq, ne } from 'drizzle-orm'
import { revalidatePath, updateTag } from 'next/cache'

import { db } from '@/db/client'
import { divisionTranslations, divisions } from '@/db/schema/cms'
import { LOCALES } from '@/db/schema/content'
import type { Locale } from '@/db/schema/content'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'
import { DIVISIONS_CACHE_TAG } from '@/lib/content/divisions'
import { translateField } from '@/lib/translate'

import { divisionFormSchema, type DivisionFormValues } from './schema'

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function revalidateAll(slug: string) {
  updateTag(DIVISIONS_CACHE_TAG)
  revalidatePath(`/${slug}`)
  for (const l of LOCALES) {
    if (l === 'en') continue
    revalidatePath(`/${l}/${slug}`)
  }
}

async function ensureSlugUnique(slug: string, excludeId?: string) {
  const existing = await db
    .select({ id: divisions.id })
    .from(divisions)
    .where(
      excludeId
        ? and(eq(divisions.slug, slug), ne(divisions.id, excludeId))
        : eq(divisions.slug, slug),
    )
    .limit(1)
  return existing.length === 0
}

export async function updateDivisionAction(
  id: string,
  values: DivisionFormValues,
): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = divisionFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path.join('.'), i.message]),
      ),
    }
  }
  const v = parsed.data

  const current = await db.query.divisions.findFirst({ where: eq(divisions.id, id) })
  if (!current) return { ok: false, error: 'Not found' }

  if (v.slug !== current.slug && !(await ensureSlugUnique(v.slug, id))) {
    return {
      ok: false,
      error: 'Slug already taken',
      fieldErrors: { slug: 'Slug already taken' },
    }
  }

  await db
    .update(divisions)
    .set({
      slug: v.slug,
      position: v.position,
      imageUrl: v.imageUrl || null,
      imageAlt: v.imageAlt || null,
      status: v.status,
    })
    .where(eq(divisions.id, id))

  for (const l of LOCALES) {
    const t = v.translations[l]
    await db
      .insert(divisionTranslations)
      .values({
        divisionId: id,
        locale: l,
        title: t.title,
        lede: t.lede,
        items: JSON.stringify(t.items),
        machineTranslated: t.machineTranslated,
      })
      .onConflictDoUpdate({
        target: [divisionTranslations.divisionId, divisionTranslations.locale],
        set: {
          title: t.title,
          lede: t.lede,
          items: JSON.stringify(t.items),
          machineTranslated: t.machineTranslated,
        },
      })
  }

  await writeAudit({
    userId: session.user.id,
    action: current.status === v.status ? 'update' : v.status === 'published' ? 'publish' : 'unpublish',
    entityType: 'division',
    entityId: id,
    diff: { slug: v.slug, status: v.status },
  })

  revalidateAll(v.slug)
  if (current.slug !== v.slug) revalidateAll(current.slug)
  return { ok: true }
}

export async function translateDivisionAction(input: {
  from: Locale
  to: Locale
  title: string
  lede: string
  items: { title: string; body: string }[]
}): Promise<
  | { ok: true; title: string; lede: string; items: { title: string; body: string }[] }
  | { ok: false; error: string }
> {
  await requireAdmin()
  try {
    const [title, lede, items] = await Promise.all([
      translateField({ text: input.title, from: input.from, to: input.to, context: 'Division title' }),
      translateField({ text: input.lede, from: input.from, to: input.to, context: 'Division lede (subtitle)' }),
      Promise.all(
        input.items.map(async (it) => ({
          title: await translateField({
            text: it.title,
            from: input.from,
            to: input.to,
            context: 'Division feature title',
          }),
          body: await translateField({
            text: it.body,
            from: input.from,
            to: input.to,
            context: 'Division feature description',
          }),
        })),
      ),
    ])
    return { ok: true, title, lede, items }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Translation failed' }
  }
}
