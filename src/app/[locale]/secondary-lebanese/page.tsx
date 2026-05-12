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
    title: 'Lebanese Secondary',
    lede: 'Head of Lebanese Secondary — Father Dr. Jean Youness (M.L.).',
    items: [
      {
        title: 'Official Lebanese Curriculum',
        body: 'The Lebanese Program (LP) offers an official unified curriculum with content established and approved by the Lebanese government.',
      },
      {
        title: 'English language enrichment',
        body: 'English Language & Literature is taught from Grade 1 onwards using American textbooks that enrich the learning experience.',
      },
      {
        title: 'Streams at Secondary II',
        body: 'Two streams are offered — Scientific, and Sociology & Economics. Students may also enrol in the IB Diploma Programme at this level.',
      },
      {
        title: 'Streams at Secondary III',
        body: 'Three streams are offered — General Science, Life Sciences, and Sociology & Economics — preparing students for university.',
      },
    ],
  },
  fr: {
    title: 'Secondaire libanais',
    lede: 'Responsable du secondaire libanais — Père Dr Jean Youness (M.L.).',
    items: [
      {
        title: 'Programme officiel libanais',
        body: 'Le programme libanais (LP) propose un cursus officiel unifié dont le contenu est défini et approuvé par le gouvernement.',
      },
      {
        title: 'Enrichissement en anglais',
        body: "L'anglais — langue et littérature — est enseigné dès la première année à l'aide de manuels américains qui enrichissent l'apprentissage.",
      },
      {
        title: 'Filières en Secondaire II',
        body: 'Deux filières sont proposées — Scientifique et Sociologie & Économie. Les élèves peuvent également suivre le programme IB Diploma.',
      },
      {
        title: 'Filières en Secondaire III',
        body: "Trois filières sont proposées — Sciences générales, Sciences de la vie et Sociologie & Économie — pour préparer à l'université.",
      },
    ],
  },
  ar: {
    title: 'الثانوي اللبناني',
    lede: 'رئيس القسم الثانوي اللبناني — الأب د. جان يونس (م.ل.).',
    items: [
      {
        title: 'المنهج اللبناني الرسمي',
        body: 'يقدّم البرنامج اللبناني منهجًا رسميًّا موحَّدًا بمحتوى تضعه الحكومة اللبنانيّة وتعتمده.',
      },
      {
        title: 'إغناء بالإنكليزية',
        body: 'تُدرَّس اللغة الإنكليزية وآدابها منذ السنة الأولى عبر كتب أميركية تُثري التجربة التعلّمية.',
      },
      {
        title: 'فروع الثانوي الثاني',
        body: 'يُتاح فرعان: العلوم، والاجتماع والاقتصاد. ويمكن للطلاب الالتحاق ببرنامج البكالوريا الدولية في هذه المرحلة.',
      },
      {
        title: 'فروع الثانوي الثالث',
        body: 'تُتاح ثلاثة فروع: العلوم العامة، علوم الحياة، والاجتماع والاقتصاد — لتهيئة الطلاب للجامعة.',
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
      image="/images/seed/jean-younes-square.png"
      imageAlt="Father Dr. Jean Youness (M.L.) — Head of Lebanese Secondary"
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
