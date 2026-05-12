import { defaultLocale, locales, type Locale } from '@/i18n/routing'

export function asLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale
}

/**
 * Pick a translation row for the requested locale, with **per-field** fallback
 * to the default locale: if a string field in the target row is empty, the
 * default-locale row's value is used instead.
 *
 * Returns `undefined` only when neither row exists.
 */
export function pickTranslation<T extends { locale: string }>(
  rows: T[],
  locale: Locale,
): T | undefined {
  const target = rows.find((r) => r.locale === locale)
  const fallback = rows.find((r) => r.locale === defaultLocale)
  if (!target && !fallback) return undefined
  if (!target) return fallback
  if (!fallback || target.locale === defaultLocale) return target

  const merged: Record<string, unknown> = { ...(target as unknown as Record<string, unknown>) }
  const fb = fallback as unknown as Record<string, unknown>
  for (const key of Object.keys(fb)) {
    if (key === 'locale') continue
    const v = merged[key]
    if (typeof v === 'string' && v.trim() === '' && typeof fb[key] === 'string') {
      merged[key] = fb[key]
    }
  }
  return merged as T
}
