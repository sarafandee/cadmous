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
    title: 'Primary (Years 2 to 6)',
    lede: 'Head of Years 2 to 6 — Mrs. Hayfa Mozaya.',
    items: [
      {
        title: 'Lebanese National Curriculum',
        body: 'Builds on the foundations established in Kindergarten and Year 1, providing the guidance and support children need to succeed academically and socially.',
      },
      {
        title: 'Skills for a changing world',
        body: 'Children are developed into life-long learners who understand their individual learning needs and are equipped for an ever-changing world.',
      },
      {
        title: 'Personalised lessons',
        body: 'Highly skilled teachers adapt and personalise lessons so each child progresses with the right amount of stretch and challenge.',
      },
      {
        title: 'Beyond the classroom',
        body: 'A rich blend of social, physical, cultural, and artistic learning — extracurricular activities for holistic development and unique talents.',
      },
    ],
  },
  fr: {
    title: 'Primaire (années 2 à 6)',
    lede: 'Responsable des années 2 à 6 — Mme Hayfa Mozaya.',
    items: [
      {
        title: 'Programme national libanais',
        body: 'Poursuit les bases posées en maternelle et en année 1, en offrant accompagnement et soutien pour la réussite scolaire et sociale.',
      },
      {
        title: 'Compétences pour un monde en mutation',
        body: 'Les enfants deviennent des apprenants à vie qui comprennent leurs besoins individuels et sont armés pour un monde en évolution.',
      },
      {
        title: 'Leçons personnalisées',
        body: 'Des enseignants hautement qualifiés adaptent et personnalisent les leçons afin que chaque enfant progresse au bon rythme.',
      },
      {
        title: 'Au-delà de la classe',
        body: "Un riche mélange d'apprentissages sociaux, physiques, culturels et artistiques — activités parascolaires pour un développement complet.",
      },
    ],
  },
  ar: {
    title: 'الابتدائي (السنوات 2 إلى 6)',
    lede: 'رئيسة قسم السنوات 2 إلى 6 — السيّدة هيفاء مزيا.',
    items: [
      {
        title: 'المنهج الوطني اللبناني',
        body: 'يبني على الأسس الموضوعة في الروضة والسنة الأولى، ويوفّر الإرشاد والدعم اللازم للنجاح الأكاديمي والاجتماعي.',
      },
      {
        title: 'مهارات لعالم متغيّر',
        body: 'يصبح الأطفال متعلّمين مدى الحياة، يدركون احتياجاتهم التعلّمية، ويُجهَّزون لمواكبة عالم متبدّل.',
      },
      {
        title: 'دروس مخصَّصة',
        body: 'يكيّف المعلّمون ذوو الخبرة الدروسَ ويخصّصونها لكلّ طفل ضمن مستوى التحدّي المناسب.',
      },
      {
        title: 'ما بعد الصف',
        body: 'مزيج غنيّ من التعلّم الاجتماعي والبدني والثقافي والفنّي، وأنشطة لا صفّية تدعم النموّ الشامل والمواهب الفرديّة.',
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
      image="/images/seed/hayfa-square.jpg"
      imageAlt="Mrs. Hayfa Mozaya — Head of Years 2 to 6"
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
