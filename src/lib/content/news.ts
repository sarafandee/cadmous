import { eq, desc } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '@/db/client'
import { media, newsPosts, newsTranslations } from '@/db/schema/content'

import { asLocale, pickTranslation } from './_internal/locale'
import type { NewsPost } from './types'

export type { NewsPost }

const TAGS = {
  all: 'news',
  one: (slug: string) => `news:${slug}`,
} as const

type Row = {
  id: string
  slug: string
  publishedAtIso: string
  imagePath: string | null
  translations: { locale: string; title: string; summary: string; body: string }[]
}

const fetchPublished = unstable_cache(
  async (): Promise<Row[]> => {
    const rows = await db.query.newsPosts.findMany({
      where: eq(newsPosts.status, 'published'),
      orderBy: [desc(newsPosts.publishedAt)],
      with: {
        translations: {
          columns: { locale: true, title: true, summary: true, body: true },
        },
        image: { columns: { path: true } },
      },
    })
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      publishedAtIso: r.publishedAt.toISOString(),
      imagePath: r.image?.path ?? null,
      translations: r.translations,
    }))
  },
  ['news', 'published', 'list'],
  { tags: [TAGS.all] },
)

function project(row: Row, locale: string): NewsPost | undefined {
  const t = pickTranslation(row.translations, asLocale(locale))
  if (!t) return undefined
  return {
    slug: row.slug,
    title: t.title,
    publishedAt: row.publishedAtIso,
    summary: t.summary,
    body: t.body || undefined,
    image: row.imagePath ?? undefined,
  }
}

export async function getAllNews(locale: string): Promise<NewsPost[]> {
  const rows = await fetchPublished()
  return rows
    .map((r) => project(r, locale))
    .filter((p): p is NewsPost => p !== undefined)
}

export async function getNewsBySlug(
  locale: string,
  slug: string,
): Promise<NewsPost | undefined> {
  const rows = await fetchPublished()
  const row = rows.find((r) => r.slug === slug)
  return row ? project(row, locale) : undefined
}

export const NEWS_CACHE_TAGS = TAGS
