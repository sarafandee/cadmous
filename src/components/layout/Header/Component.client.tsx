'use client'
import React, { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { LanguageToggle } from '@/components/LanguageToggle'

type NavLabels = {
  home: string
  about: string
  divisions: string
  admissions: string
  news: string
  events: string
  contact: string
  school: string
  director: string
  visionMission: string
  history: string
  policies: string
  allDivisions: string
  kindergarten: string
  elementary: string
  intermediate: string
  secondaryLebanese: string
  integrative: string
  intlPrograms: string
  requirements: string
  englishApp: string
  frenchApp: string
  arabicApp: string
}

const navLabels: Record<'en' | 'ar' | 'fr', NavLabels> = {
  en: {
    home: 'Home',
    about: 'About',
    divisions: 'Divisions',
    admissions: 'Admissions',
    news: 'News',
    events: 'Events',
    contact: 'Contact',
    school: 'Cadmous College',
    director: "Director's Message",
    visionMission: 'Vision & Mission',
    history: 'History',
    policies: 'Policies',
    allDivisions: 'All Divisions',
    kindergarten: 'Kindergarten',
    elementary: 'Elementary',
    intermediate: 'Intermediate',
    secondaryLebanese: 'Lebanese Secondary',
    integrative: 'Integrative',
    intlPrograms: 'International Programs',
    requirements: 'Requirements',
    englishApp: 'English Application',
    frenchApp: 'French Application',
    arabicApp: 'Arabic Application',
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
    director: 'كلمة المدير',
    visionMission: 'الرسالة والرؤية',
    history: 'تاريخنا',
    policies: 'السياسات',
    allDivisions: 'كل الأقسام',
    kindergarten: 'الروضة',
    elementary: 'الابتدائي',
    intermediate: 'المتوسّط',
    secondaryLebanese: 'الثانوي اللبناني',
    integrative: 'قسم الدمج',
    intlPrograms: 'البرامج الدوليّة',
    requirements: 'المتطلّبات',
    englishApp: 'طلب بالإنكليزيّة',
    frenchApp: 'طلب بالفرنسيّة',
    arabicApp: 'طلب بالعربيّة',
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
    director: 'Mot du directeur',
    visionMission: 'Mission & Vision',
    history: 'Histoire',
    policies: 'Politiques',
    allDivisions: 'Toutes les divisions',
    kindergarten: 'Maternelle',
    elementary: 'Primaire',
    intermediate: 'Intermédiaire',
    secondaryLebanese: 'Secondaire libanais',
    integrative: "Département d'inclusion",
    intlPrograms: 'Programmes internationaux',
    requirements: 'Conditions',
    englishApp: 'Demande en anglais',
    frenchApp: 'Demande en français',
    arabicApp: 'Demande en arabe',
  },
}

type LeafLink = { href: string; label: string }
type NavItem = { href?: string; label: string; children?: LeafLink[] }

function buildNav(l: NavLabels): NavItem[] {
  return [
    { href: '/', label: l.home },
    {
      label: l.about,
      children: [
        { href: '/director', label: l.director },
        { href: '/vision-mission', label: l.visionMission },
        { href: '/history', label: l.history },
        { href: '/policies', label: l.policies },
      ],
    },
    {
      label: l.divisions,
      children: [
        { href: '/divisions', label: l.allDivisions },
        { href: '/kindergarten', label: l.kindergarten },
        { href: '/elementary', label: l.elementary },
        { href: '/intermediate', label: l.intermediate },
        { href: '/secondary-lebanese', label: l.secondaryLebanese },
        { href: '/integrative', label: l.integrative },
        { href: '/international-programs', label: l.intlPrograms },
      ],
    },
    {
      label: l.admissions,
      children: [
        { href: '/requirements', label: l.requirements },
        { href: '/application/en', label: l.englishApp },
        { href: '/application/fr', label: l.frenchApp },
        { href: '/application/ar', label: l.arabicApp },
      ],
    },
    { href: '/news', label: l.news },
    { href: '/events', label: l.events },
    { href: '/contact', label: l.contact },
  ]
}

function isActiveChild(pathname: string, children: LeafLink[]): boolean {
  return children.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'))
}

function DesktopGroup({
  item,
  pathname,
}: {
  item: NavItem
  pathname: string
}) {
  if (!item.children) {
    const active = item.href === pathname
    return (
      <Link
        href={item.href!}
        className={`rounded-[4px] px-3 py-2 text-[13.5px] font-medium transition-colors ${
          active ? 'text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        {item.label}
      </Link>
    )
  }
  const active = isActiveChild(pathname, item.children)
  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center gap-1.5 rounded-[4px] px-3 py-2 text-[13.5px] font-medium transition-colors ${
          active ? 'text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        {item.label}
        <svg
          className="h-3 w-3 opacity-60 transition group-hover:rotate-180"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="invisible absolute start-0 top-full z-50 min-w-[220px] translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="mt-2 overflow-hidden rounded-[6px] border border-white/10 bg-navy-800 shadow-2xl">
          <ul className="flex flex-col py-1">
            {item.children.map((c) => {
              const childActive = pathname === c.href
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className={`block px-4 py-2 text-[13px] transition-colors ${
                      childActive
                        ? 'bg-white/5 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function MobileGroup({
  item,
  pathname,
}: {
  item: NavItem
  pathname: string
}) {
  const active = item.children ? isActiveChild(pathname, item.children) : pathname === item.href
  const [open, setOpen] = useState(active)
  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className={`block rounded-md px-3 py-2 text-sm font-medium ${
          active ? 'bg-white/5 text-white' : 'text-white/70'
        }`}
      >
        {item.label}
      </Link>
    )
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
          active ? 'bg-white/5 text-white' : 'text-white/70'
        }`}
      >
        <span>{item.label}</span>
        <svg
          className={`h-3 w-3 transition ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="ms-3 mt-1 flex flex-col border-s border-white/10 ps-3">
          {item.children.map((c) => {
            const childActive = pathname === c.href
            return (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className={`block px-3 py-2 text-sm ${
                    childActive ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {c.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export const HeaderClient: React.FC = () => {
  const pathname = usePathname()
  const locale = useLocale() as keyof typeof navLabels
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setIsMobileOpen(false)
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [pathname])

  const l = navLabels[locale] ?? navLabels.en
  const nav = buildNav(l)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)]">
        <div className="flex items-center justify-between py-3.5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/seed/logo-small.png"
              alt={l.school}
              className="h-10 w-auto"
            />
            <div className="leading-tight">
              <div className="text-[17px] font-bold tracking-[0.005em] text-white">
                {l.school}
              </div>
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                IB World School
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item, i) => (
              <DesktopGroup key={i} item={item} pathname={pathname} />
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
              {nav.map((item, i) => (
                <MobileGroup key={i} item={item} pathname={pathname} />
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
