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
    title: 'Elementary',
    lede: 'Grades 1 – 5',
    items: [
      { title: 'Core subjects', body: 'Mathematics, sciences, languages, social studies, arts, and physical education.' },
      { title: 'Reading culture', body: 'A library-rich environment with weekly reading conferences and book fairs.' },
      { title: 'Project work', body: 'Inquiry projects each term — students learn to ask, investigate, and present.' },
      { title: 'Wellbeing', body: 'Pastoral support and a strong homeroom system anchor every child.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'What we offer',
      sectionTitle: 'Curriculum & life in Elementary.',
      ctaTitle: 'Apply to Elementary.',
      ctaBody: "Admissions are rolling. Reach out and we'll guide you through the next steps.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Contact us',
    },
  },
  fr: {
    title: 'Primaire',
    lede: 'CP – CM2',
    items: [
      { title: 'Matières fondamentales', body: 'Mathématiques, sciences, langues, sciences humaines, arts et EPS.' },
      { title: 'Culture de la lecture', body: 'Une bibliothèque riche, des cercles de lecture hebdomadaires et des foires du livre.' },
      { title: 'Travail par projet', body: "Des projets d'investigation chaque trimestre — questionner, enquêter, présenter." },
      { title: 'Bien-être', body: "Un encadrement pastoral et un système de titulaires solides ancrent chaque enfant." },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'Ce que nous offrons',
      sectionTitle: 'Programme et vie au primaire.',
      ctaTitle: 'Postuler au primaire.',
      ctaBody: 'Les admissions sont continues. Contactez-nous et nous vous guiderons.',
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'الابتدائية',
    lede: 'الصفوف 1 – 5',
    items: [
      { title: 'المواد الأساسية', body: 'الرياضيات، العلوم، اللغات، الدراسات الاجتماعية، الفنون، والتربية الرياضية.' },
      { title: 'ثقافة القراءة', body: 'مكتبة غنية، حلقات قراءة أسبوعية، ومعارض كتب.' },
      { title: 'العمل بالمشاريع', body: 'مشاريع بحثية كل فصل — السؤال، الاستقصاء، والعرض.' },
      { title: 'الرعاية', body: 'دعم تربوي ونظام صفّي قوي يُحيطان بكل طفل.' },
    ],
    labels: {
      bcDivisions: 'الأقسام',
      eyebrow: 'ما نقدّمه',
      sectionTitle: 'المنهج والحياة في الابتدائية.',
      ctaTitle: 'قدّم إلى الابتدائية.',
      ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
      ctaPrimary: 'القبول',
      ctaSecondary: 'تواصل معنا',
    },
  },
}

export default async function ElementaryPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80"
      imageAlt="Elementary"
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
