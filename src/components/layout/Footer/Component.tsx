import React from 'react'
import { getLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'

const labels = {
  en: {
    school: 'Cadmous College',
    ib: 'IB World School',
    quickLinks: 'Quick Links',
    contact: 'Contact Us',
    home: 'Home',
    about: 'About',
    admissions: 'Admissions',
    news: 'News',
    rights: 'All rights reserved.',
  },
  ar: {
    school: 'مدرسة قدموس',
    ib: 'مدرسة البكالوريا الدولية',
    quickLinks: 'روابط سريعة',
    contact: 'اتصل بنا',
    home: 'الرئيسية',
    about: 'من نحن',
    admissions: 'القبول',
    news: 'الأخبار',
    rights: 'جميع الحقوق محفوظة.',
  },
  fr: {
    school: 'Collège Cadmous',
    ib: "École du monde de l'IB",
    quickLinks: 'Liens rapides',
    contact: 'Contactez-nous',
    home: 'Accueil',
    about: 'À propos',
    admissions: 'Admissions',
    news: 'Actualités',
    rights: 'Tous droits réservés.',
  },
} as const

export async function Footer() {
  const locale = (await getLocale()) as keyof typeof labels
  const year = new Date().getFullYear()
  const t = labels[locale] ?? labels.en

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/vision-mission', label: t.about },
    { href: '/admissions', label: t.admissions },
    { href: '/news', label: t.news },
    { href: '/contact', label: t.contact },
  ] as const

  return (
    <footer className="mt-auto bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">{t.school}</h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-gold-400">
              {t.ib}
            </p>
            <p className="mt-4 text-sm text-navy-200">Lebanon</p>
          </div>

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

          <div>
            <h4 className="mb-4 font-semibold text-gold-400">{t.contact}</h4>
            <div className="space-y-2 text-sm text-navy-200">
              <p>info@cadmous.edu.lb</p>
              <p dir="ltr" className="text-start">+961 X XXX XXX</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-700 pt-6 text-center text-sm text-navy-300">
          © {year} {t.school}. {t.rights}
        </div>
      </div>
    </footer>
  )
}
