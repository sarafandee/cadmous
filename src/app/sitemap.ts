import { eq } from 'drizzle-orm'
import type { MetadataRoute } from 'next'

import { db } from '@/db/client'
import { events, newsPosts } from '@/db/schema/content'
import { locales } from '@/i18n/routing'

export const revalidate = 3600

const STATIC_PATHS = [
  '/',
  '/vision-mission',
  '/history',
  '/director',
  '/admissions',
  '/requirements',
  '/policies',
  '/kindergarten',
  '/elementary',
  '/intermediate',
  '/secondary-lebanese',
  '/integrative',
  '/international-programs',
  '/news',
  '/events',
  '/contact',
]

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    'http://localhost:3000'
  )
}

function localized(path: string): string[] {
  return locales.map((l) => (l === 'en' ? path || '/' : `/${l}${path === '/' ? '' : path}`))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const root = siteUrl()
  const now = new Date()

  const [newsRows, eventRows] = await Promise.all([
    db
      .select({ slug: newsPosts.slug, updatedAt: newsPosts.updatedAt })
      .from(newsPosts)
      .where(eq(newsPosts.status, 'published')),
    db
      .select({ slug: events.slug, updatedAt: events.updatedAt })
      .from(events)
      .where(eq(events.status, 'published')),
  ])

  const staticEntries = STATIC_PATHS.flatMap((p) =>
    localized(p).map((url) => ({
      url: new URL(url, root).toString(),
      lastModified: now,
    })),
  )

  const newsEntries = newsRows.flatMap((n) =>
    localized(`/news/${n.slug}`).map((url) => ({
      url: new URL(url, root).toString(),
      lastModified: n.updatedAt,
    })),
  )

  const eventEntries = eventRows.flatMap((e) =>
    localized(`/events/${e.slug}`).map((url) => ({
      url: new URL(url, root).toString(),
      lastModified: e.updatedAt,
    })),
  )

  return [...staticEntries, ...newsEntries, ...eventEntries]
}
