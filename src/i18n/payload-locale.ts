import type { Locale } from './routing'

/**
 * Single adapter function for mapping next-intl locale to Payload locale parameter.
 * Used in every server component that fetches Payload content.
 * This ensures locale sync between routing and content fetching.
 */
export function getPayloadLocale(locale: string): Locale {
  const validLocales: Locale[] = ['ar', 'en', 'fr']
  if (validLocales.includes(locale as Locale)) {
    return locale as Locale
  }
  return 'ar'
}
