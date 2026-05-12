'use client'
import React, { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { LanguageToggle } from '@/components/LanguageToggle'

const navLabels = {
  en: {
    home: 'Home',
    about: 'About',
    divisions: 'Divisions',
    admissions: 'Admissions',
    news: 'News',
    events: 'Events',
    contact: 'Contact',
    school: 'Cadmous College',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    divisions: 'الأقسام',
    admissions: 'القبول',
    news: 'الأخبار',
    events: 'الفعاليات',
    contact: 'اتصل بنا',
    school: 'مدرسة قدموس',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    divisions: 'Divisions',
    admissions: 'Admissions',
    news: 'Actualités',
    events: 'Événements',
    contact: 'Contact',
    school: 'Cadmous College',
  },
} as const

export const HeaderClient: React.FC = () => {
  const pathname = usePathname()
  const locale = useLocale() as keyof typeof navLabels
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const l = navLabels[locale] ?? navLabels.en

  const navLinks = [
    { href: '/', label: l.home },
    { href: '/vision-mission', label: l.about },
    { href: '/kindergarten', label: l.divisions },
    { href: '/requirements', label: l.admissions },
    { href: '/news', label: l.news },
    { href: '/events', label: l.events },
    { href: '/contact', label: l.contact },
  ] as const

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)]">
        <div className="flex items-center justify-between py-3.5">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-[6px] border border-crimson-400 bg-crimson-500/10 text-[16px] font-bold tracking-[0.04em] text-crimson-400">
              C
            </div>
            <div className="leading-tight">
              <div className="text-[17px] font-bold tracking-[0.005em] text-white">
                {l.school}
              </div>
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                IB World School
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-[4px] px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ms-3 border-s border-white/10 ps-3">
              <LanguageToggle />
            </div>
          </nav>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-md p-2 text-white/70 hover:bg-white/5 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileOpen && (
          <nav className="border-t border-white/10 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === link.href ? 'bg-white/5 text-white' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 pt-2">
                <LanguageToggle />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
