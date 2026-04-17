'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const localeLabels: Record<string, string> = {
  ar: 'العربية',
  en: 'EN',
  fr: 'FR',
}

const locales = ['ar', 'en', 'fr'] as const

export function LanguageToggle() {
  const pathname = usePathname()

  // Extract current locale and rest of path
  const segments = pathname.split('/')
  const currentLocale = segments[1] || 'ar'
  const restOfPath = '/' + segments.slice(2).join('/')

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${restOfPath === '/' ? '' : restOfPath}`}
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
