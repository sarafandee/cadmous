import { unstable_cache } from 'next/cache'
import { eq, inArray, or } from 'drizzle-orm'

import { db } from '@/db/client'
import { siteSettings } from '@/db/schema/cms'

import { asLocale } from './_internal/locale'

const CACHE_TAG = 'settings'

const fetchAll = unstable_cache(
  async () => db.select().from(siteSettings),
  ['settings', 'all'],
  { tags: [CACHE_TAG] },
)

export type SettingsMap = Record<string, string>

/**
 * Returns settings for the requested locale. Localized keys fall back to en;
 * non-localized keys (locale = '') are returned as-is.
 */
export async function getSettings(locale: string): Promise<SettingsMap> {
  const all = await fetchAll()
  const target = asLocale(locale)
  const out: SettingsMap = {}

  // First pass: shared (locale='') and en (fallback) values
  for (const row of all) {
    if (row.locale === '' || row.locale === 'en') {
      out[row.key] = row.value
    }
  }
  // Second pass: overlay the requested locale
  if (target !== 'en') {
    for (const row of all) {
      if (row.locale === target && row.value) {
        out[row.key] = row.value
      }
    }
  }

  return out
}

export const SETTINGS_CACHE_TAG = CACHE_TAG
