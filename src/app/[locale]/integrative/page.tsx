import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

import { divisionLabels } from '../_division-labels'

type Args = { params: Promise<{ locale: string }> }

const HEAD = { name: 'Mrs. Lucie Tannous El Hajj', role: 'Head of Integrative Program', image: '/images/seed/lucita-square.png' }

const T: Record<string, { title: string; intro: string; body: string[]; servicesIntro: string; services: string[]; closing: string }> = {
  en: {
    title: 'Integrative Department',
    intro: 'Recently, we noticed that many students, especially in the primary and intermediate stages, face learning difficulties. These take multiple forms — inability to read or write, severe difficulty reading, weak memory, or struggle with arithmetic — as well as developmental difficulties tied to brain functions and the cognitive processes that a child needs for academic achievement.',
    body: [
      'From here, the Department of Inclusion came to include these students and help them overcome their difficulties according to their severity, which can affect self-esteem, education, professional matters, and social adaptation in all areas of daily life.',
    ],
    servicesIntro: 'The Integration Department provides multiple services, including creating new ways to teach basic skills such as reading, writing, and arithmetic by working on developing long- and short-term memory through an individual educational plan:',
    services: [
      "Determining students' levels, whether developmental or cognitive.",
      'Adapting the curriculum with the help of a coordinating team.',
      'Providing higher-level skills such as organization, time planning, and abstract thinking.',
      'Working to enhance self-confidence.',
      'Creating a comfortable, inclusive society and an incubating environment, and raising awareness and acceptance of differences between people.',
      'Encouraging and supporting students with learning difficulties to develop their skills and abilities.',
    ],
    closing: 'In addition to the above, the integration department aims to educate parents about the reality of their children\'s conditions, to help them draw a clear picture of their future, and to stimulate their abilities to follow their daily lives normally.',
  },
  fr: {
    title: "Département d'inclusion",
    intro: "Nous avons récemment observé que de nombreux élèves, surtout au primaire et au cycle intermédiaire, rencontrent des difficultés d'apprentissage. Elles prennent plusieurs formes — l'incapacité à lire ou à écrire, des difficultés sévères de lecture, une mémoire défaillante ou des difficultés en arithmétique — ainsi que des difficultés développementales liées aux fonctions cérébrales et aux processus cognitifs nécessaires à la réussite scolaire.",
    body: [
      "Le département d'inclusion accueille ces élèves et les aide à surmonter leurs difficultés selon leur gravité, sachant qu'elles peuvent toucher l'estime de soi, la scolarité, le parcours professionnel et l'adaptation sociale au quotidien.",
    ],
    servicesIntro: "Le département offre plusieurs services, dont de nouvelles façons d'enseigner les compétences de base — lecture, écriture, arithmétique — en travaillant la mémoire à court et à long terme dans le cadre d'un plan d'éducation individualisé :",
    services: [
      'Déterminer les niveaux des élèves, développementaux ou cognitifs.',
      "Adapter le programme avec l'appui d'une équipe coordinatrice.",
      "Développer des compétences supérieures : organisation, planification du temps, pensée abstraite.",
      'Renforcer la confiance en soi.',
      "Créer une société confortable et inclusive et un environnement porteur, en sensibilisant à l'acceptation des différences.",
      "Encourager et accompagner les élèves en difficulté pour qu'ils développent leurs compétences et leurs capacités.",
    ],
    closing: "Au-delà de ces actions, le département d'inclusion vise à informer les parents sur la réalité de la situation de leurs enfants, à les aider à se projeter dans l'avenir, et à stimuler leurs capacités à mener une vie quotidienne normale.",
  },
  ar: {
    title: 'قسم الدمج',
    intro: 'لاحظنا حديثًا أنّ كثيرًا من الطلّاب، لا سيّما في المرحلتين الابتدائيّة والمتوسّطة، يواجهون صعوبات تعلّميّة تتّخذ أشكالًا متعدّدة: العجز عن القراءة أو الكتابة، أو القراءة بصعوبة بالغة، أو ضعف الذاكرة، أو صعوبة في إجراء العمليّات الحسابيّة، إضافةً إلى صعوبات نمائيّة مرتبطة بوظائف الدماغ والعمليّات الذهنيّة والمعرفيّة التي يحتاج إليها الطفل في إنجازه الأكاديميّ.',
    body: [
      'من هنا جاء قسم الدمج ليحتضن هؤلاء الطلّاب ويُساعدهم على تجاوز صعوباتهم وفقًا لدرجة ظهورها وشدّتها، إذ تنعكس على تقدير الذات، والتعليم، والشؤون المهنيّة، والتكيّف الاجتماعيّ في كلّ أنشطة الحياة اليوميّة.',
    ],
    servicesIntro: 'يُقدّم قسم الدمج خدمات متعدّدة، منها ابتكار طرق جديدة لتعليم المهارات الأساسيّة كالقراءة والكتابة والحساب، عبر تطوير الذاكرة الطويلة والقصيرة المدى ضمن خطّة تربويّة فرديّة، من خلال:',
    services: [
      'تحديد مستويات الطلّاب نمائيًّا ومعرفيًّا.',
      'مواءمة المنهج بمساعدة فريق منسِّق.',
      'تنمية مهارات عليا كالتنظيم، وتخطيط الوقت، والتفكير المجرَّد.',
      'العمل على تعزيز الثقة بالنفس.',
      'بناء مجتمع دامج ومريح وبيئة حاضنة، ونشر الوعي وتقبّل الاختلافات بين الناس.',
      'تشجيع الطلّاب ذوي الصعوبات التعلّمية ودعمهم لتنمية مهاراتهم وقدراتهم.',
    ],
    closing: 'إضافةً إلى ما سبق، يسعى قسم الدمج إلى توعية الأهالي على حقيقة أوضاع أبنائهم وبناتهم، ومساعدتهم على رسم صورة واضحة لمستقبلهم، وتحفيز قدراتهم على متابعة حياتهم اليوميّة طبيعيًّا.',
  },
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  const body = [
    t.intro,
    ...t.body,
    t.servicesIntro,
    { items: t.services },
    t.closing,
  ]
  return (
    <DivisionPage
      locale={locale}
      title={t.title}
      head={HEAD}
      body={body}
      labels={divisionLabels(locale, t.title)}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
