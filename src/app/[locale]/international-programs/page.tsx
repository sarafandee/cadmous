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
    title: 'International Programs',
    lede: 'IB Diploma · IGCSE',
    items: [
      { title: 'IB Diploma Programme', body: 'Six subject groups, theory of knowledge, extended essay, and CAS.' },
      { title: 'IGCSE pathway', body: 'A bridge into IB and into UK and international university systems.' },
      { title: 'University outcomes', body: '[Lorem ipsum placeholder — list past destinations only when verified.]' },
      { title: 'CAS programme', body: 'Creativity, Activity, Service — a structured way to grow beyond the classroom.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'What we offer',
      sectionTitle: 'Curriculum & life in International Programs.',
      ctaTitle: 'Apply to International Programs.',
      ctaBody: "Admissions are rolling. Reach out and we'll guide you through the next steps.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Contact us',
    },
  },
  fr: {
    title: 'Programmes internationaux',
    lede: 'Diplôme IB · IGCSE',
    items: [
      { title: 'Diplôme IB', body: 'Six groupes de matières, théorie de la connaissance, mémoire et CAS.' },
      { title: 'Parcours IGCSE', body: "Une passerelle vers l'IB et les systèmes universitaires britanniques et internationaux." },
      { title: 'Destinations universitaires', body: '[Texte à confirmer — ne pas publier sans vérification.]' },
      { title: 'Programme CAS', body: 'Créativité, Activité, Service — un cadre structuré pour grandir hors classe.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'Ce que nous offrons',
      sectionTitle: 'Programme et vie dans les programmes internationaux.',
      ctaTitle: 'Postuler aux programmes internationaux.',
      ctaBody: 'Les admissions sont continues. Contactez-nous et nous vous guiderons.',
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'البرامج الدولية',
    lede: 'دبلوم البكالوريا الدولية · IGCSE',
    items: [
      { title: 'دبلوم البكالوريا الدولية', body: 'ست مجموعات من المواد، نظرية المعرفة، البحث المعمّق، وCAS.' },
      { title: 'مسار IGCSE', body: 'جسر إلى البكالوريا الدولية والنظم الجامعية البريطانية والدولية.' },
      { title: 'المسارات الجامعية', body: '[نص بديل — لا تُنشر الوجهات إلا بعد التحقّق.]' },
      { title: 'برنامج CAS', body: 'الإبداع والنشاط والخدمة — إطار منظّم للنمو خارج الصف.' },
    ],
    labels: {
      bcDivisions: 'الأقسام',
      eyebrow: 'ما نقدّمه',
      sectionTitle: 'المنهج والحياة في البرامج الدولية.',
      ctaTitle: 'قدّم إلى البرامج الدولية.',
      ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
      ctaPrimary: 'القبول',
      ctaSecondary: 'تواصل معنا',
    },
  },
}

export default async function InternationalProgramsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
      imageAlt="International Programs"
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
