import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '@/db/client'
import { pages } from '@/db/schema/cms'
import { parseBlocksOrEmpty, type Block } from '@/lib/blocks/schema'

import { asLocale, pickTranslation } from './_internal/locale'

const CACHE_TAG = 'pages'

export type PageDoc = {
  slug: string
  imageUrl: string | null
  title: string
  lede: string
  blocks: Block[]
}

type Row = {
  id: string
  slug: string
  imageUrl: string | null
  translations: { locale: string; title: string; lede: string; blocks: string }[]
}

const fetchPublished = unstable_cache(
  async (): Promise<Row[]> => {
    const rows = await db.query.pages.findMany({
      where: eq(pages.status, 'published'),
      with: {
        translations: {
          columns: { locale: true, title: true, lede: true, blocks: true },
        },
      },
    })
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      imageUrl: r.imageUrl,
      translations: r.translations,
    }))
  },
  ['pages', 'list'],
  { tags: [CACHE_TAG] },
)

function project(row: Row, locale: string): PageDoc | undefined {
  const t = pickTranslation(row.translations, asLocale(locale))
  if (!t) return undefined
  return {
    slug: row.slug,
    imageUrl: row.imageUrl,
    title: t.title,
    lede: t.lede,
    blocks: parseBlocksOrEmpty(t.blocks),
  }
}

export async function getPageBySlug(
  locale: string,
  slug: string,
): Promise<PageDoc | undefined> {
  const rows = await fetchPublished()
  const row = rows.find((r) => r.slug === slug)
  return row ? project(row, locale) : undefined
}

export const PAGES_CACHE_TAG = CACHE_TAG
