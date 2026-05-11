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
    title: 'Kindergarten',
    lede: 'KG1 – KG2 · Ages 3 – 5',
    items: [
      { title: 'A Day at KG', body: 'Circle, play, story, snack, outdoor, project — a familiar daily rhythm built for young learners.' },
      { title: 'Languages', body: 'Daily exposure to English, French, and Arabic through song, story, and play.' },
      { title: 'Specialists', body: 'Music, movement, and art delivered by dedicated specialist teachers.' },
      { title: 'Transition to Grade 1', body: 'A structured bridge year prepares KG2 children for primary school.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'What we offer',
      sectionTitle: 'Curriculum & life in Kindergarten.',
      ctaTitle: 'Apply to Kindergarten.',
      ctaBody: "Admissions are rolling. Reach out and we'll guide you through the next steps.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Contact us',
    },
  },
  fr: {
    title: 'Maternelle',
    lede: 'Petite – Grande section · 3 – 5 ans',
    items: [
      { title: 'Une journée en maternelle', body: 'Regroupement, jeu, histoire, goûter, extérieur, projet — un rythme familier pour les jeunes apprenants.' },
      { title: 'Langues', body: 'Exposition quotidienne à l’anglais, au français et à l’arabe par la chanson, l’histoire et le jeu.' },
      { title: 'Spécialistes', body: 'Musique, motricité et arts assurés par des enseignants spécialisés.' },
      { title: 'Passage en CP', body: "Une année passerelle structurée pour préparer le primaire." },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'Ce que nous offrons',
      sectionTitle: 'Programme et vie en maternelle.',
      ctaTitle: 'Postuler à la maternelle.',
      ctaBody: "Les admissions sont continues. Contactez-nous et nous vous guiderons.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'الروضة',
    lede: 'الروضة الأولى والثانية · من 3 إلى 5 سنوات',
    items: [
      { title: 'يوم في الروضة', body: 'دائرة، لعب، قصة، استراحة، نشاط خارجي، مشروع — إيقاع يومي مألوف للمتعلّمين الصغار.' },
      { title: 'اللغات', body: 'تعرّض يومي للعربية والإنجليزية والفرنسية عبر الأغنية والقصة واللعب.' },
      { title: 'مختصّون', body: 'الموسيقى والحركة والفنّ بإشراف معلّمين مختصّين.' },
      { title: 'الانتقال إلى الصف الأول', body: 'سنة جسرية مدروسة تُهيّئ أطفال الروضة الثانية للابتدائي.' },
    ],
    labels: {
      bcDivisions: 'الأقسام',
      eyebrow: 'ما نقدّمه',
      sectionTitle: 'المنهج والحياة في الروضة.',
      ctaTitle: 'قدّم إلى الروضة.',
      ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
      ctaPrimary: 'القبول',
      ctaSecondary: 'تواصل معنا',
    },
  },
}

export default async function KindergartenPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="https://images.unsplash.com/photo-1587653263995-422546a7a569?w=1200&q=80"
      imageAlt="Kindergarten"
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
