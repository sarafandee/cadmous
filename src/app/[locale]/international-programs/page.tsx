import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

import { divisionLabels } from '../_division-labels'

const T: Record<
  string,
  {
    title: string
    lede: string
    items: { title: string; body: string }[]
  }
> = {
  en: {
    title: 'International Programs',
    lede: 'Head of International Programs — Mr. Ossama Salem. IB Diploma, Pre-IB International Program, and SAT preparation.',
    items: [
      {
        title: 'IB Diploma Programme (Y11–Y12)',
        body: 'A rigorous curriculum across six subjects plus Theory of Knowledge and CAS — preparation for top universities worldwide.',
      },
      {
        title: 'International Program (Y9–Y10)',
        body: 'A Cambridge-based curriculum with IB focus — conceptual, inquiry-based learning, with a global perspective. Feeds directly into the IBDP.',
      },
      {
        title: 'Critical thinking + global mindset',
        body: 'Students gain a wider breadth of subject knowledge, advanced critical thinking and independent learning skills, and a globally-minded worldview.',
      },
      {
        title: 'SAT preparation centre',
        body: 'Cadmous offers updated SAT tutoring and is an authorised SAT exam centre — open to Cadmous students and others.',
      },
    ],
  },
  fr: {
    title: 'Programmes internationaux',
    lede: 'Responsable des programmes internationaux — M. Ossama Salem. IB Diploma, Pré-IB et préparation au SAT.',
    items: [
      {
        title: 'IB Diploma (Y11–Y12)',
        body: 'Un cursus rigoureux dans six matières plus la théorie de la connaissance et le CAS — une préparation aux meilleures universités au monde.',
      },
      {
        title: 'International Program (Y9–Y10)',
        body: "Un programme inspiré du cursus Cambridge avec une approche IB — apprentissage conceptuel et perspective globale. Prépare directement à l'IBDP.",
      },
      {
        title: 'Pensée critique et ouverture',
        body: "Une étendue plus large de connaissances, des compétences avancées en pensée critique et apprentissage autonome, et une vision globale.",
      },
      {
        title: 'Centre de préparation au SAT',
        body: 'Cadmous offre une préparation actualisée au SAT et est un centre agréé pour les examens — ouvert aux élèves de Cadmous comme aux autres.',
      },
    ],
  },
  ar: {
    title: 'البرامج الدوليّة',
    lede: 'رئيس البرامج الدوليّة — السيّد أسامة سالم. بكالوريا دوليّة، وبرنامج تمهيدي، وإعداد لاختبار الـ SAT.',
    items: [
      {
        title: 'برنامج الدبلوم الدولي (السنتان 11 و12)',
        body: 'منهج صارم في ستّ مواد إلى جانب نظريّة المعرفة والـ CAS — إعداد للجامعات الأرفع في العالم.',
      },
      {
        title: 'البرنامج الدولي (السنتان 9 و10)',
        body: 'منهج مستوحى من كامبردج بنكهة IB — تعلّم مفاهيمي قائم على الاستقصاء بمنظور عالمي، يُمهّد مباشرة لبرنامج الدبلوم.',
      },
      {
        title: 'تفكير ناقد وانفتاح عالمي',
        body: 'سعة أكبر من المعرفة، ومهارات متقدّمة في التفكير الناقد والتعلّم المستقلّ، ورؤية كونيّة.',
      },
      {
        title: 'مركز إعداد للـ SAT',
        body: 'تقدّم قدموس تدريبًا محدَّثًا للـ SAT وهي مركز معتمَد لإجراء الاختبارات — مفتوحٌ لطلابها ولطلاب المدارس الأخرى.',
      },
    ],
  },
}

type Args = { params: Promise<{ locale: string }> }

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      lede={t.lede}
      image="/images/seed/ossama.jpeg"
      imageAlt="Mr. Ossama Salem — Head of International Programs"
      items={t.items}
      labels={divisionLabels(locale, t.title)}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
