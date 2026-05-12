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
    title: 'Intermediate (Years 7 to 9)',
    lede: 'Head of Years 7 to 9 — Father Jean Pierre Karam (M.L.).',
    items: [
      {
        title: 'Foundations + learning skills',
        body: 'A critical stage to learn fundamental concepts and develop the learning approaches that set the stage for lifelong success.',
      },
      {
        title: 'Multi-sensory, hands-on',
        body: "We combine learning approaches and activities that appeal to a variety of styles, leaning into children's natural curiosity.",
      },
      {
        title: 'A broad curriculum',
        body: 'English, Math, Science, Arabic, French, P.E., History, and Civics — comprehension, original composition, critical thinking, and Arabic language strength.',
      },
      {
        title: 'Explore, discover, excel',
        body: 'An engaging curriculum that encourages students to explore and excel while learning fundamentals that lead to academic success.',
      },
    ],
  },
  fr: {
    title: 'Intermédiaire (années 7 à 9)',
    lede: 'Responsable des années 7 à 9 — Père Jean Pierre Karam (M.L.).',
    items: [
      {
        title: 'Bases + compétences',
        body: "Une étape déterminante pour acquérir les concepts fondamentaux et les approches d'apprentissage utiles pour la vie.",
      },
      {
        title: 'Multi-sensoriel et concret',
        body: "Nous combinons des approches et activités variées qui mobilisent la curiosité naturelle des enfants.",
      },
      {
        title: 'Un programme étendu',
        body: 'Anglais, mathématiques, sciences, arabe, français, EPS, histoire et éducation civique — compréhension, écriture, pensée critique et maîtrise de la langue arabe.',
      },
      {
        title: 'Explorer, découvrir, exceller',
        body: 'Un programme stimulant qui encourage les élèves à explorer et à exceller tout en construisant les bases du succès académique.',
      },
    ],
  },
  ar: {
    title: 'المتوسّط (السنوات 7 إلى 9)',
    lede: 'رئيس قسم السنوات 7 إلى 9 — الأب جان بيار كرم (م.ل.).',
    items: [
      {
        title: 'الأسس ومهارات التعلّم',
        body: 'مرحلة جوهريّة لتعلّم المفاهيم الأساسيّة وتطوير مقاربات التعلّم التي تمهّد لنجاح يدوم مدى الحياة.',
      },
      {
        title: 'تعليم متعدّد الحواس وعمليّ',
        body: 'نمزج مقاربات وأنشطة متنوّعة تستجيب لأنماط التعلّم المختلفة وتغذّي فضول الأطفال الطبيعي.',
      },
      {
        title: 'منهج واسع',
        body: 'الإنكليزية، الرياضيات، العلوم، العربية، الفرنسية، التربية البدنية، التاريخ والمدنيّات — فهم، كتابة أصيلة، تفكير ناقد، ورسوخ في اللغة العربية.',
      },
      {
        title: 'استكشاف وتفوّق',
        body: 'منهج جاذب يشجّع الطلاب على الاستكشاف والتفوّق مع بناء أساسات للنجاح الأكاديمي.',
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
      image="/images/seed/jean-pierre-square.png"
      imageAlt="Father Jean Pierre Karam (M.L.) — Head of Years 7 to 9"
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
