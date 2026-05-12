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
    title: 'Intermediate',
    lede: 'Grades 6 – 9',
    items: [
      { title: 'Academic stretch', body: 'Subject specialists across sciences, mathematics, humanities, and languages.' },
      { title: 'Choices begin', body: 'Optional courses in computing, design, and second-language pathways.' },
      { title: 'Service learning', body: 'Students contribute to local community projects through advisory.' },
      { title: 'Pathways forward', body: 'Counselling supports the move into the Lebanese or international tracks.' },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'What we offer',
      sectionTitle: 'Curriculum & life in Intermediate.',
      ctaTitle: 'Apply to Intermediate.',
      ctaBody: "Admissions are rolling. Reach out and we'll guide you through the next steps.",
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Contact us',
    },
  },
  fr: {
    title: 'Collège',
    lede: '6e – 3e',
    items: [
      { title: 'Exigence académique', body: 'Des spécialistes en sciences, mathématiques, sciences humaines et langues.' },
      { title: 'Premiers choix', body: 'Cours optionnels en informatique, design et parcours de deuxième langue.' },
      { title: 'Apprentissage par le service', body: 'Contribution à des projets locaux via le tutorat.' },
      { title: 'Pistes futures', body: "L'orientation accompagne le passage vers les filières libanaise ou internationale." },
    ],
    labels: {
      bcDivisions: 'Divisions',
      eyebrow: 'Ce que nous offrons',
      sectionTitle: 'Programme et vie au collège.',
      ctaTitle: 'Postuler au collège.',
      ctaBody: 'Les admissions sont continues. Contactez-nous et nous vous guiderons.',
      ctaPrimary: 'Admissions',
      ctaSecondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'المتوسّطة',
    lede: 'الصفوف 6 – 9',
    items: [
      { title: 'تعمّق أكاديمي', body: 'مختصّون في العلوم والرياضيات والإنسانيات واللغات.' },
      { title: 'بدء الخيارات', body: 'مواد اختيارية في الحوسبة والتصميم ومسارات اللغة الثانية.' },
      { title: 'تعلّم عبر الخدمة', body: 'يساهم الطلاب في مشاريع المجتمع المحلي ضمن نظام التوجيه.' },
      { title: 'مسارات لاحقة', body: 'يوجّه الإرشاد الطلاب نحو المسار اللبناني أو الدولي.' },
    ],
    labels: {
      bcDivisions: 'الأقسام',
      eyebrow: 'ما نقدّمه',
      sectionTitle: 'المنهج والحياة في المتوسّطة.',
      ctaTitle: 'قدّم إلى المتوسّطة.',
      ctaBody: 'القبول مفتوح طوال السنة. تواصل معنا وسنرشدك للخطوات التالية.',
      ctaPrimary: 'القبول',
      ctaSecondary: 'تواصل معنا',
    },
  },
}

export default async function IntermediatePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80"
      imageAlt="Intermediate"
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
