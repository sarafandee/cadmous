/**
 * News content access. Public API is async on purpose so the static-data impl
 * below can later be swapped for a DB/CMS read without touching callers.
 *
 * Today: reads from src/lib/content/_static/news.data.ts.
 * Future: replace these function bodies (or this file) with admin-backed reads.
 * Keep the function signatures and return shapes stable.
 */

import { defaultLocale, locales, type Locale } from '@/i18n/routing'
import type { NewsPost } from './types'
import { NEWS_BY_LOCALE } from './_static/news.data'

export type { NewsPost }

function asLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale
}

export async function getAllNews(locale: string): Promise<NewsPost[]> {
  return NEWS_BY_LOCALE[asLocale(locale)]
}

export async function getNewsBySlug(
  locale: string,
  slug: string,
): Promise<NewsPost | undefined> {
  const posts = await getAllNews(locale)
  return posts.find((p) => p.slug === slug)
}
