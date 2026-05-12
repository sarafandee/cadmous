/**
 * Events content access. Public API is async on purpose so the static-data impl
 * below can later be swapped for a DB/CMS read without touching callers.
 *
 * Today: reads from src/lib/content/_static/events.data.ts.
 * Future: replace these function bodies (or this file) with admin-backed reads.
 * Keep the function signatures and return shapes stable.
 */

import { defaultLocale, locales, type Locale } from '@/i18n/routing'
import type { SchoolEvent } from './types'
import { EVENTS_BY_LOCALE } from './_static/events.data'

export type { SchoolEvent }

function asLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale
}

export async function getAllEvents(locale: string): Promise<SchoolEvent[]> {
  return EVENTS_BY_LOCALE[asLocale(locale)]
}

export async function getEventBySlug(
  locale: string,
  slug: string,
): Promise<SchoolEvent | undefined> {
  const events = await getAllEvents(locale)
  return events.find((e) => e.slug === slug)
}
