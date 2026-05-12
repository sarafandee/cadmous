'use server'

import { and, eq, ne } from 'drizzle-orm'
import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db/client'
import { LOCALES, newsPosts, newsTranslations } from '@/db/schema/content'
import type { Locale } from '@/db/schema/content'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'
import { NEWS_CACHE_TAGS } from '@/lib/content/news'
import { translateField } from '@/lib/translate'
import { newsFormSchema, type NewsFormValues } from './schema'

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

function revalidateNews(slug?: string) {
  updateTag(NEWS_CACHE_TAGS.all)
  if (slug) updateTag(NEWS_CACHE_TAGS.one(slug))
  revalidatePath('/news')
  revalidatePath(`/news/${slug ?? ''}`)
  for (const l of LOCALES) {
    if (l === 'en') continue
    revalidatePath(`/${l}/news`)
    if (slug) revalidatePath(`/${l}/news/${slug}`)
  }
}

async function ensureSlugUnique(slug: string, excludeId?: string) {
  const existing = await db
    .select({ id: newsPosts.id })
    .from(newsPosts)
    .where(
      excludeId
        ? and(eq(newsPosts.slug, slug), ne(newsPosts.id, excludeId))
        : eq(newsPosts.slug, slug),
    )
    .limit(1)
  return existing.length === 0
}

export async function createNewsAction(values: NewsFormValues): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = newsFormSchema.safeParse(values)
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

  if (!(await ensureSlugUnique(v.slug))) {
    return {
      ok: false,
      error: 'Slug already taken',
      fieldErrors: { slug: 'Slug already taken' },
    }
  }

  const inserted = await db
    .insert(newsPosts)
    .values({
      slug: v.slug,
      publishedAt: new Date(v.publishedAt),
      status: v.status,
      imagePath: v.imagePath || null,
    })
    .returning({ id: newsPosts.id })

  const id = inserted[0].id

  await db.insert(newsTranslations).values(
    LOCALES.map((l) => ({
      postId: id,
      locale: l,
      title: v.translations[l].title,
      summary: v.translations[l].summary,
      body: v.translations[l].body,
      machineTranslated: v.translations[l].machineTranslated,
    })),
  )

  await writeAudit({
    userId: session.user.id,
    action: 'create',
    entityType: 'news',
    entityId: id,
    diff: { slug: v.slug, status: v.status },
  })

  revalidateNews(v.slug)
  redirect(`/admin/news/${id}`)
}

export async function updateNewsAction(
  id: string,
  values: NewsFormValues,
): Promise<ActionResult> {
  const session = await requireAdmin()
  const parsed = newsFormSchema.safeParse(values)
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

  const current = await db.query.newsPosts.findFirst({ where: eq(newsPosts.id, id) })
  if (!current) return { ok: false, error: 'Not found' }

  if (v.slug !== current.slug && !(await ensureSlugUnique(v.slug, id))) {
    return {
      ok: false,
      error: 'Slug already taken',
      fieldErrors: { slug: 'Slug already taken' },
    }
  }

  await db
    .update(newsPosts)
    .set({
      slug: v.slug,
      publishedAt: new Date(v.publishedAt),
      status: v.status,
      imagePath: v.imagePath || null,
    })
    .where(eq(newsPosts.id, id))

  for (const l of LOCALES) {
    const t = v.translations[l]
    await db
      .insert(newsTranslations)
      .values({
        postId: id,
        locale: l,
        title: t.title,
        summary: t.summary,
        body: t.body,
        machineTranslated: t.machineTranslated,
      })
      .onConflictDoUpdate({
        target: [newsTranslations.postId, newsTranslations.locale],
        set: {
          title: t.title,
          summary: t.summary,
          body: t.body,
          machineTranslated: t.machineTranslated,
        },
      })
  }

  await writeAudit({
    userId: session.user.id,
    action: current.status === v.status ? 'update' : v.status === 'published' ? 'publish' : 'unpublish',
    entityType: 'news',
    entityId: id,
    diff: { slug: v.slug, status: v.status, previousStatus: current.status },
  })

  // Old slug too, in case it changed.
  revalidateNews(v.slug)
  if (current.slug !== v.slug) revalidateNews(current.slug)

  return { ok: true }
}

export async function deleteNewsAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin()
  const current = await db.query.newsPosts.findFirst({ where: eq(newsPosts.id, id) })
  if (!current) return { ok: false, error: 'Not found' }

  await db.delete(newsPosts).where(eq(newsPosts.id, id))

  await writeAudit({
    userId: session.user.id,
    action: 'delete',
    entityType: 'news',
    entityId: id,
    diff: { slug: current.slug },
  })

  revalidateNews(current.slug)
  redirect('/admin/news')
}

export async function translateNewsAction(input: {
  from: Locale
  to: Locale
  fields: { title: string; summary: string; body: string }
}): Promise<
  | { ok: true; fields: { title: string; summary: string; body: string } }
  | { ok: false; error: string }
> {
  await requireAdmin()
  try {
    const [title, summary, body] = await Promise.all([
      translateField({
        text: input.fields.title,
        from: input.from,
        to: input.to,
        context: 'News post title',
      }),
      translateField({
        text: input.fields.summary,
        from: input.from,
        to: input.to,
        context: 'News post summary (short blurb)',
      }),
      translateField({
        text: input.fields.body,
        from: input.from,
        to: input.to,
        context: 'News post body',
      }),
    ])
    return { ok: true, fields: { title, summary, body } }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Translation failed'
    return { ok: false, error: msg }
  }
}
