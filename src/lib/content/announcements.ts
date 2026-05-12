import { and, eq, gte, lte, or, isNull } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '@/db/client'
import { announcementTranslations, announcements } from '@/db/schema/content'

import { asLocale, pickTranslation } from './_internal/locale'
import type { Announcement } from './types'

export type { Announcement }

const TAGS = { all: 'announcements' } as const

type Row = {
  id: string
  severity: 'info' | 'warning' | 'critical'
  startsAtIso: string | null
  endsAtIso: string | null
  translations: { locale: string; title: string; body: string }[]
}

const fetchActive = unstable_cache(
  async (): Promise<Row[]> => {
    const now = new Date()
    const rows = await db.query.announcements.findMany({
      where: and(
        eq(announcements.status, 'published'),
        or(isNull(announcements.startsAt), lte(announcements.startsAt, now)),
        or(isNull(announcements.endsAt), gte(announcements.endsAt, now)),
      ),
      with: {
        translations: { columns: { locale: true, title: true, body: true } },
      },
    })
    return rows.map((r) => ({
      id: r.id,
      severity: r.severity,
      startsAtIso: r.startsAt?.toISOString() ?? null,
      endsAtIso: r.endsAt?.toISOString() ?? null,
      translations: r.translations,
    }))
  },
  ['announcements', 'active'],
  { tags: [TAGS.all] },
)

function project(row: Row, locale: string): Announcement | undefined {
  const t = pickTranslation(row.translations, asLocale(locale))
  if (!t) return undefined
  return {
    id: row.id,
    severity: row.severity,
    title: t.title,
    body: t.body || undefined,
    startsAt: row.startsAtIso ?? undefined,
    endsAt: row.endsAtIso ?? undefined,
  }
}

export async function getActiveAnnouncements(locale: string): Promise<Announcement[]> {
  const rows = await fetchActive()
  return rows
    .map((r) => project(r, locale))
    .filter((a): a is Announcement => a !== undefined)
}

export const ANNOUNCEMENTS_CACHE_TAGS = TAGS
