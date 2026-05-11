export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ApplicationPageShell } from '@/components/CadmousUI/ApplicationPage'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcAdmissions: string
  bcThis: string
  helpEyebrow: string
  helpBody: string
  helpCta: string
  otherLangs: string
}> = {
  en: {
    title: 'Arabic Application',
    bcAdmissions: 'Admissions',
    bcThis: 'Arabic Application',
    helpEyebrow: 'Need help?',
    helpBody: 'Our admissions team is happy to walk you through any part of the application.',
    helpCta: 'Contact us',
    otherLangs: 'Other languages',
  },
  fr: {
    title: 'Demande en arabe',
    bcAdmissions: 'Admissions',
    bcThis: 'Demande en arabe',
    helpEyebrow: "Besoin d'aide ?",
    helpBody: "Notre équipe d'admission est à votre disposition pour vous accompagner.",
    helpCta: 'Nous contacter',
    otherLangs: 'Autres langues',
  },
  ar: {
    title: 'الطلب بالعربية',
    bcAdmissions: 'القبول',
    bcThis: 'الطلب بالعربية',
    helpEyebrow: 'تحتاج مساعدة؟',
    helpBody: 'فريق القبول جاهز لمرافقتك في أي جزء من الطلب.',
    helpCta: 'تواصل معنا',
    otherLangs: 'لغات أخرى',
  },
}

export default async function ApplicationArPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <ApplicationPageShell
      locale={locale}
      lang="ar"
      title={t.title}
      labels={t}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
