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
    title: 'Integrative Program',
    lede: 'Inclusive learning across grades',
    items: [
      { title: 'Individualised plans', body: 'Each student has a personalised plan reviewed termly with family and teachers.' },
      { title: 'In-class support', body: 'Specialist teachers work alongside the homeroom, not apart from it.' },
      { title: 'Multi-disciplinary team', body: 'Educational psychologists, speech and language, and occupational therapy.' },
      { title: 'Family partnership', body: 'Regular meetings, transparent reporting, shared goals.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'What we offer',
      sectionTitle: 'Curriculum & life in the Integrative Program.',
      ctaTitle: 'Apply to the Integrative Program.',
      ctaBody: "Admissions are rolling. Reach out and we'll guide you through the next steps.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Contact us',
    },
  },
  fr: {
    title: 'Programme intégratif',
    lede: 'Apprentissage inclusif sur tous les niveaux',
    items: [
      { title: 'Plans individualisés', body: 'Chaque élève dispose d’un plan personnalisé revu chaque trimestre avec la famille et les enseignants.' },
      { title: 'Soutien en classe', body: 'Les spécialistes interviennent aux côtés du titulaire, dans la classe.' },
      { title: 'Équipe pluridisciplinaire', body: 'Psychologues scolaires, orthophonie et ergothérapie.' },
      { title: 'Partenariat familial', body: 'Réunions régulières, comptes-rendus transparents, objectifs partagés.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'Ce que nous offrons',
      sectionTitle: 'Programme et vie dans le programme intégratif.',
      ctaTitle: 'Postuler au programme intégratif.',
      ctaBody: 'Les admissions sont continues. Contactez-nous et nous vous guiderons.',
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'البرنامج التكاملي',
    lede: 'تعلّم شامل عبر جميع المراحل',
    items: [
      { title: 'خطط فردية', body: 'لكل طالب خطة شخصية تُراجع كل فصل مع العائلة والمعلّمين.' },
      { title: 'دعم داخل الصف', body: 'يعمل المختصّون إلى جانب معلّم الصف، لا بمعزل عنه.' },
      { title: 'فريق متعدّد التخصّصات', body: 'علم النفس التربوي، النطق واللغة، والعلاج الوظيفي.' },
      { title: 'شراكة مع العائلة', body: 'لقاءات منتظمة، تقارير شفّافة، وأهداف مشتركة.' },
    ],
    labels: {
      bcDivisions: 'الأقسام',
      eyebrow: 'ما نقدّمه',
      sectionTitle: 'المنهج والحياة في البرنامج التكاملي.',
      ctaTitle: 'قدّم إلى البرنامج التكاملي.',
      ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
      ctaPrimary: 'القبول',
      ctaSecondary: 'تواصل معنا',
    },
  },
}

export default async function IntegrativePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80"
      imageAlt="Integrative Program"
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
