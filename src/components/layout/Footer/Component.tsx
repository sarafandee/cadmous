import Link from 'next/link'
import React from 'react'
import { getLocale } from 'next-intl/server'

export async function Footer() {
  const locale = await getLocale()
  const year = new Date().getFullYear()

  const labels: Record<string, { school: string; ib: string; quickLinks: string; contact: string }> = {
    ar: {
      school: 'مدرسة قدموس',
      ib: 'مدرسة البكالوريا الدولية',
      quickLinks: 'روابط سريعة',
      contact: 'اتصل بنا',
    },
    en: {
      school: 'Cadmous College',
      ib: 'IB World School',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
    },
    fr: {
      school: 'Collège Cadmous',
      ib: "École du monde de l'IB",
      quickLinks: 'Liens rapides',
      contact: 'Contactez-nous',
    },
  }

  const t = labels[locale] || labels.en

  const navLinks = [
    { href: `/${locale}`, label: locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : 'Home' },
    { href: `/${locale}/about`, label: locale === 'ar' ? 'من نحن' : locale === 'fr' ? 'À propos' : 'About' },
    { href: `/${locale}/admissions`, label: locale === 'ar' ? 'القبول' : 'Admissions' },
    { href: `/${locale}/news`, label: locale === 'ar' ? 'الأخبار' : locale === 'fr' ? 'Actualités' : 'News' },
    { href: `/${locale}/contact`, label: t.contact },
  ]

  return (
    <footer className="mt-auto bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* School info */}
          <div>
            <h3 className="text-xl font-bold">{t.school}</h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-gold-400">
              {t.ib}
            </p>
            <p className="mt-4 text-sm text-navy-200">Lebanon</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-gold-400">{t.quickLinks}</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-navy-200 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-gold-400">{t.contact}</h4>
            <div className="space-y-2 text-sm text-navy-200">
              <p>info@cadmous.edu.lb</p>
              <p dir="ltr" className="text-start">+961 X XXX XXX</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-700 pt-6 text-center text-sm text-navy-300">
          © {year} {t.school}. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  )
}
