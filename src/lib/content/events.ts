import { asc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '@/db/client'
import { eventTranslations, events } from '@/db/schema/content'

import { asLocale, pickTranslation } from './_internal/locale'
import type { SchoolEvent } from './types'

export type { SchoolEvent }

const TAGS = {
  all: 'events',
  one: (slug: string) => `events:${slug}`,
} as const

type Row = {
  id: string
  slug: string
  startDateIso: string
  endDateIso: string | null
  location: string | null
  imagePath: string | null
  translations: { locale: string; title: string; description: string }[]
}

const fetchPublished = unstable_cache(
  async (): Promise<Row[]> => {
    const rows = await db.query.events.findMany({
      where: eq(events.status, 'published'),
      orderBy: [asc(events.startDate)],
      with: {
        translations: { columns: { locale: true, title: true, description: true } },
      },
    })
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      startDateIso: r.startDate.toISOString(),
      endDateIso: r.endDate?.toISOString() ?? null,
      location: r.location,
      imagePath: r.imagePath,
      translations: r.translations,
    }))
  },
  ['events', 'published', 'list'],
  { tags: [TAGS.all] },
)

function project(row: Row, locale: string): SchoolEvent | undefined {
  const t = pickTranslation(row.translations, asLocale(locale))
  if (!t) return undefined
  return {
    slug: row.slug,
    title: t.title,
    startDate: row.startDateIso,
    endDate: row.endDateIso ?? undefined,
    location: row.location ?? undefined,
    description: t.description || undefined,
    image: row.imagePath ?? undefined,
  }
}

export async function getAllEvents(locale: string): Promise<SchoolEvent[]> {
  const rows = await fetchPublished()
  return rows
    .map((r) => project(r, locale))
    .filter((e): e is SchoolEvent => e !== undefined)
}

export async function getEventBySlug(
  locale: string,
  slug: string,
): Promise<SchoolEvent | undefined> {
  const rows = await fetchPublished()
  const row = rows.find((r) => r.slug === slug)
  return row ? project(row, locale) : undefined
}

export const EVENTS_CACHE_TAGS = TAGS
