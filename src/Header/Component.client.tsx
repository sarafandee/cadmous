'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { LanguageToggle } from '@/components/LanguageToggle'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'ar'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { href: `/${locale}`, label: locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : 'Home' },
    { href: `/${locale}/about`, label: locale === 'ar' ? 'من نحن' : locale === 'fr' ? 'À propos' : 'About' },
    { href: `/${locale}/news`, label: locale === 'ar' ? 'الأخبار' : locale === 'fr' ? 'Actualités' : 'News' },
    { href: `/${locale}/events`, label: locale === 'ar' ? 'الفعاليات' : locale === 'fr' ? 'Événements' : 'Events' },
    { href: `/${locale}/gallery`, label: locale === 'ar' ? 'معرض الصور' : locale === 'fr' ? 'Galerie' : 'Gallery' },
    { href: `/${locale}/admissions`, label: locale === 'ar' ? 'القبول' : locale === 'fr' ? 'Admissions' : 'Admissions' },
    { href: `/${locale}/contact`, label: locale === 'ar' ? 'اتصل بنا' : locale === 'fr' ? 'Contact' : 'Contact' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo / School Name */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-navy-800">
                {locale === 'ar' ? 'مدرسة قدموس' : 'Cadmous College'}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-gold-500">
                IB World School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-navy-50 text-navy-800'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ms-3 border-s border-gray-200 ps-3">
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
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

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <nav className="border-t border-gray-100 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-navy-50 text-navy-800'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-gray-100 pt-2">
                <LanguageToggle />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
