import { asc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'

import { db } from '@/db/client'
import { divisions } from '@/db/schema/cms'

import { asLocale, pickTranslation } from './_internal/locale'

const CACHE_TAG = 'divisions'
const itemsSchema = z.array(z.object({ title: z.string(), body: z.string() }))

export type DivisionItem = { title: string; body: string }
export type DivisionMeta = {
  slug: string
  imageUrl: string | null
  imageAlt: string | null
}
export type Division = DivisionMeta & {
  title: string
  lede: string
  items: DivisionItem[]
}

type Row = {
  id: string
  slug: string
  position: number
  imageUrl: string | null
  imageAlt: string | null
  translations: { locale: string; title: string; lede: string; items: string }[]
}

const fetchPublished = unstable_cache(
  async (): Promise<Row[]> => {
    const rows = await db.query.divisions.findMany({
      where: eq(divisions.status, 'published'),
      orderBy: [asc(divisions.position), asc(divisions.slug)],
      with: {
        translations: {
          columns: { locale: true, title: true, lede: true, items: true },
        },
      },
    })
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      position: r.position,
      imageUrl: r.imageUrl,
      imageAlt: r.imageAlt,
      translations: r.translations,
    }))
  },
  ['divisions', 'list'],
  { tags: [CACHE_TAG] },
)

function project(row: Row, locale: string): Division | undefined {
  const t = pickTranslation(row.translations, asLocale(locale))
  if (!t) return undefined
  const items = (() => {
    try {
      const parsed = itemsSchema.safeParse(JSON.parse(t.items))
      return parsed.success ? parsed.data : []
    } catch {
      return []
    }
  })()
  return {
    slug: row.slug,
    imageUrl: row.imageUrl,
    imageAlt: row.imageAlt,
    title: t.title,
    lede: t.lede,
    items,
  }
}

export async function getAllDivisions(locale: string): Promise<Division[]> {
  const rows = await fetchPublished()
  return rows
    .map((r) => project(r, locale))
    .filter((d): d is Division => d !== undefined)
}

export async function getDivisionBySlug(
  locale: string,
  slug: string,
): Promise<Division | undefined> {
  const rows = await fetchPublished()
  const row = rows.find((r) => r.slug === slug)
  return row ? project(row, locale) : undefined
}

export const DIVISIONS_CACHE_TAG = CACHE_TAG
