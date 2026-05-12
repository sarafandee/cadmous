import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ApplicationPageShell } from '@/components/CadmousUI/ApplicationPage'
import { locales, type Locale } from '@/i18n/routing'

type AppLang = 'en' | 'fr' | 'ar'
const APP_LANGS: AppLang[] = ['en', 'fr', 'ar']

type Args = { params: Promise<{ locale: string; appLang: string }> }

const TITLES: Record<Locale, Record<AppLang, string>> = {
  en: { en: 'English Application', fr: 'French Application', ar: 'Arabic Application' },
  fr: { en: 'Demande en anglais', fr: 'Demande en français', ar: 'Demande en arabe' },
  ar: { en: 'الطلب بالإنجليزية', fr: 'الطلب بالفرنسية', ar: 'الطلب بالعربية' },
}

const LABELS: Record<Locale, {
  bcAdmissions: string
  helpEyebrow: string
  helpBody: string
  helpCta: string
  otherLangs: string
}> = {
  en: {
    bcAdmissions: 'Admissions',
    helpEyebrow: 'Need help?',
    helpBody: 'Our admissions team is happy to walk you through any part of the application.',
    helpCta: 'Contact us',
    otherLangs: 'Other languages',
  },
  fr: {
    bcAdmissions: 'Admissions',
    helpEyebrow: "Besoin d'aide ?",
    helpBody: "Notre équipe d'admission est à votre disposition pour vous accompagner.",
    helpCta: 'Nous contacter',
    otherLangs: 'Autres langues',
  },
  ar: {
    bcAdmissions: 'القبول',
    helpEyebrow: 'تحتاج مساعدة؟',
    helpBody: 'فريق القبول جاهز لمرافقتك في أي جزء من الطلب.',
    helpCta: 'تواصل معنا',
    otherLangs: 'لغات أخرى',
  },
}

function isAppLang(value: string): value is AppLang {
  return (APP_LANGS as string[]).includes(value)
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    APP_LANGS.map((appLang) => ({ locale, appLang })),
  )
}

export default async function ApplicationPage({ params }: Args) {
  const { locale, appLang } = await params
  if (!isLocale(locale) || !isAppLang(appLang)) notFound()
  setRequestLocale(locale)

  const title = TITLES[locale][appLang]
  const labels = { ...LABELS[locale], bcThis: title }

  return (
    <ApplicationPageShell locale={locale} lang={appLang} title={title} labels={labels} />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, appLang } = await params
  if (!isLocale(locale) || !isAppLang(appLang)) return { title: 'Not Found' }
  return { title: `${TITLES[locale][appLang]} | Cadmous College` }
}
