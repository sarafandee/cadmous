import { defaultLocale, locales, type Locale } from '@/i18n/routing'

export function asLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale
}

/**
 * Pick a translation row for the requested locale, falling back to the
 * default (en) on a per-translation basis. Returns `undefined` when neither
 * the requested locale nor default exists.
 */
export function pickTranslation<T extends { locale: string }>(
  rows: T[],
  locale: Locale,
): T | undefined {
  return (
    rows.find((r) => r.locale === locale) ?? rows.find((r) => r.locale === defaultLocale)
  )
}
