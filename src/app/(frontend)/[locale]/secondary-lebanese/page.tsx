export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  lede: string
  items: { title: string; body: string }[]
  labels: {
    bcDivisions: string
    eyebrow: string
    sectionTitle: string
    ctaTitle: string
    ctaBody: string
    ctaPrimary: string
    ctaSecondary: string
  }
}> = {
  en: {
    title: 'Secondary Lebanese',
    lede: 'Grades 10 – 12 · Lebanese Baccalauréat',
    items: [
      { title: 'Tracks', body: 'Sciences générales · Sciences de la vie · Sociology & economics · Lettres et humanités.' },
      { title: 'Languages of instruction', body: 'Arabic, French, and English used across the programme by subject.' },
      { title: 'Examination preparation', body: 'Mock examinations, revision clinics, and one-to-one tutoring.' },
      { title: 'University guidance', body: 'Counsellors support applications to Lebanese and regional universities.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'What we offer',
      sectionTitle: 'Curriculum & life in Secondary Lebanese.',
      ctaTitle: 'Apply to Secondary Lebanese.',
      ctaBody: "Admissions are rolling. Reach out and we'll guide you through the next steps.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Contact us',
    },
  },
  fr: {
    title: 'Secondaire libanais',
    lede: '2nde – Terminale · Baccalauréat libanais',
    items: [
      { title: 'Séries', body: 'Sciences générales · Sciences de la vie · Sociologie & Économie · Lettres et humanités.' },
      { title: 'Langues d’enseignement', body: 'Arabe, français et anglais selon les matières.' },
      { title: 'Préparation aux examens', body: 'Examens blancs, séances de révision et tutorat individuel.' },
      { title: 'Orientation universitaire', body: 'Les conseillers accompagnent les candidatures vers les universités libanaises et régionales.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'Ce que nous offrons',
      sectionTitle: 'Programme et vie au secondaire libanais.',
      ctaTitle: 'Postuler au secondaire libanais.',
      ctaBody: 'Les admissions sont continues. Contactez-nous et nous vous guiderons.',
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'الثانوي اللبناني',
    lede: 'الصفوف 10 – 12 · البكالوريا اللبنانية',
    items: [
      { title: 'الفروع', body: 'علوم عامة · علوم حياة · علم الاجتماع والاقتصاد · الآداب والإنسانيات.' },
      { title: 'لغات التدريس', body: 'العربية والفرنسية والإنجليزية بحسب المواد.' },
      { title: 'التحضير للامتحانات', body: 'امتحانات تجريبية، حصص مراجعة، ودروس فردية.' },
      { title: 'الإرشاد الجامعي', body: 'يدعم المرشدون التقدّم للجامعات اللبنانية والإقليمية.' },
    ],
    labels: {
      bcDivisions: 'الأقسام',
      eyebrow: 'ما نقدّمه',
      sectionTitle: 'المنهج والحياة في الثانوي اللبناني.',
      ctaTitle: 'قدّم إلى الثانوي اللبناني.',
      ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
      ctaPrimary: 'القبول',
      ctaSecondary: 'تواصل معنا',
    },
  },
}

export default async function SecondaryLebanesePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80"
      imageAlt="Secondary Lebanese"
      items={t.items}
      labels={t.labels}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
