import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { ApplicationWizard } from '@/components/ApplicationWizard'
import { Card, Eyebrow, PageHeader, Section } from '@/components/CadmousUI'
import { Link } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'

type AppLang = 'en' | 'fr' | 'ar'
const APP_LANGS: AppLang[] = ['en', 'fr', 'ar']

type Args = { params: Promise<{ locale: string; appLang: string }> }

const TITLES: Record<Locale, Record<AppLang, string>> = {
  en: { en: 'English Application', fr: 'French Application', ar: 'Arabic Application' },
  fr: { en: 'Demande en anglais', fr: 'Demande en français', ar: 'Demande en arabe' },
  ar: { en: 'الطلب بالإنجليزية', fr: 'الطلب بالفرنسية', ar: 'الطلب بالعربية' },
}

const LABELS: Record<
  Locale,
  {
    bcAdmissions: string
    helpEyebrow: string
    helpBody: string
    helpCta: string
    otherLangs: string
  }
> = {
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

const LANG_LINK_LABEL: Record<AppLang, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
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
  const labels = LABELS[locale]

  return (
    <>
      <PageHeader
        locale={locale}
        title={title}
        breadcrumb={[{ label: labels.bcAdmissions, href: '/requirements' }, { label: title }]}
      />
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          <ApplicationWizard locale={locale} appLang={appLang} />
          <Card className="lg:sticky lg:top-24 p-7">
            <Eyebrow>{labels.helpEyebrow}</Eyebrow>
            <p className="mb-3 text-sm text-white/70">{labels.helpBody}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {labels.helpCta}
            </Link>
            <hr className="my-6 border-0 border-t border-white/10" />
            <Eyebrow>{labels.otherLangs}</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-2">
              {APP_LANGS.map((l) => (
                <Link
                  key={l}
                  href={`/application/${l}`}
                  className={`rounded-[4px] border px-3 py-1.5 text-xs font-semibold transition ${
                    l === appLang
                      ? 'border-crimson-400 bg-crimson-500/15 text-crimson-400'
                      : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  {LANG_LINK_LABEL[l]}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, appLang } = await params
  if (!isLocale(locale) || !isAppLang(appLang)) return { title: 'Not Found' }
  return { title: `${TITLES[locale][appLang]} | Cadmous College` }
}
