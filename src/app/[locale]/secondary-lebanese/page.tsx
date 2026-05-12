import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

import { divisionLabels } from '../_division-labels'

type Args = { params: Promise<{ locale: string }> }

const HEAD = { name: 'Father Dr. Jean Younes (M.L.)', role: 'Head of Lebanese Secondary', image: '/images/seed/jean-younes-square.png' }

const T: Record<string, { title: string; intro: string; body: string[] }> = {
  en: {
    title: 'Lebanese Secondary',
    intro: 'The Lebanese Program (LP) offers an official unified curriculum with basic content established and approved by the Lebanese government.',
    body: [
      'The objectives of the Lebanese Curriculum are set by the Ministry of Education and Higher Education in all subjects across all grade levels; however, as of Grade 1, English Language & Literature course is fulfilled in all grade levels, except elementary and secondary classes, through the American Textbooks that enrich the learning process.',
      'The Lebanese Curriculum aims to develop citizens with a comprehensive vision; shape well-rounded members of the community; create productive individuals capable of exercising their roles, rights, and duties nationally and internationally; and provide learners with a range of knowledge, skills, and ideals not only in understanding and gaining new perspectives socially and intellectually but also in scrutinizing and synthesizing the acquired information to expand the learner\'s horizons.',
      'Thus, the program forms a solid, knowledgeable, and productive individual identity that prepares students to transition successfully and effectively into the college/university life and education.',
      'At the Secondary 2nd level, two streams are offered: Scientific, and Sociology and Economics. At this level, students also have the option to follow the International Baccalaureate Diploma Programme.',
      'At the Secondary 3rd level, three streams are offered: General Science, Life Sciences, and Sociology and Economics.',
    ],
  },
  fr: {
    title: 'Secondaire libanais',
    intro: 'Le programme libanais (LP) propose un cursus officiel unifié dont le contenu est défini et approuvé par le gouvernement libanais.',
    body: [
      "Les objectifs du programme libanais sont fixés par le ministère de l'Éducation et de l'Enseignement supérieur pour toutes les matières et tous les niveaux. Cependant, dès la première année et à tous les niveaux (hormis le primaire et le secondaire), le cours d'anglais — langue et littérature — est dispensé à l'aide de manuels américains qui enrichissent l'apprentissage.",
      "Le programme libanais vise à former des citoyens à la vision globale, des membres équilibrés de la communauté, des individus productifs capables d'exercer leurs rôles, leurs droits et leurs devoirs aux niveaux national et international, et à doter les élèves d'un ensemble de connaissances, de compétences et d'idéaux leur permettant non seulement de comprendre et d'acquérir de nouvelles perspectives sociales et intellectuelles, mais aussi d'examiner et de synthétiser les informations acquises pour élargir leurs horizons.",
      "Le programme forge ainsi une identité solide, savante et productive qui prépare l'élève à une transition réussie vers la vie universitaire.",
      "Au secondaire 2, deux filières sont proposées : Scientifique et Sociologie & Économie. À ce niveau, les élèves peuvent également suivre le programme de l'IB Diploma.",
      "Au secondaire 3, trois filières sont proposées : Sciences générales, Sciences de la vie, et Sociologie & Économie.",
    ],
  },
  ar: {
    title: 'الثانوي اللبناني',
    intro: 'يُقدّم البرنامج اللبنانيّ منهجًا رسميًّا موحّدًا، يضع محتواه الأساسيّ ويعتمده الدولة اللبنانيّة.',
    body: [
      'تُحدِّد وزارة التربية والتعليم العالي أهداف المنهج اللبنانيّ في جميع المواد وعلى مختلف المراحل. ومنذ الصفّ الأوّل، تُدرَّس مادّة «اللغة الإنكليزيّة وآدابها» في جميع المراحل (باستثناء الابتدائيّ والثانويّ) عبر الكتب الأميركيّة التي تُثري التجربة التعلّمية.',
      'يهدف المنهج اللبنانيّ إلى تكوين مواطنين بنظرة شاملة، وأعضاء متوازنين في المجتمع، وأفراد منتجين قادرين على أداء أدوارهم وحقوقهم وواجباتهم محلّيًا ودوليًّا؛ ويُزوّد المتعلّمين بمعارف ومهارات وقيم لا لفهم العالم واكتساب رؤى اجتماعيّة وفكريّة جديدة فحسب، بل أيضًا لتمحيص المعلومات وتركيبها لتوسيع آفاقهم.',
      'وهكذا يُبلور البرنامج هويّةً فرديّةً راسخةً ومعرفيّةً ومنتجة، تُعدّ الطلّاب لانتقالٍ ناجحٍ وفاعلٍ إلى الحياة الجامعيّة.',
      'في الثانويّ الثاني، يُتاح فرعان: العلوم، والاجتماع والاقتصاد. وفي هذه المرحلة يُمكن للطلّاب أيضًا الالتحاق ببرنامج البكالوريا الدوليّة.',
      'في الثانويّ الثالث، تُتاح ثلاثة فروع: العلوم العامّة، علوم الحياة، والاجتماع والاقتصاد.',
    ],
  },
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      head={HEAD}
      body={[t.intro, ...t.body]}
      labels={divisionLabels(locale, t.title)}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
