'use client'

import React from 'react'
import { useLocale } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'

const localeLabels: Record<Locale, string> = {
  ar: 'العربية',
  en: 'EN',
  fr: 'FR',
}

export function LanguageToggle() {
  const pathname = usePathname()
  const currentLocale = useLocale()

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={`rounded px-2 py-1 text-sm transition-colors ${
            currentLocale === locale
              ? 'bg-blue-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          lang={locale}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </div>
  )
}
