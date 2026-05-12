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
    title: 'Integrative Department',
    lede: 'Head of the Integrative Program — Mrs. Lucie Tannous El Hajj.',
    items: [
      {
        title: 'Recognising learning difficulties',
        body: 'We support students who face challenges in reading, writing, memory, arithmetic, or developmental and cognitive processes essential to academic achievement.',
      },
      {
        title: 'Individual education plans',
        body: 'New teaching approaches for foundational skills, plus work on long- and short-term memory, organised within an individual plan for each student.',
      },
      {
        title: 'Curriculum adaptation',
        body: "We adapt the curriculum with a coordinating team and build higher-order skills — organisation, time planning, and abstract thinking.",
      },
      {
        title: 'Inclusive community',
        body: 'A comfortable and inclusive environment that strengthens self-confidence, raises awareness, and supports families alongside their children.',
      },
    ],
  },
  fr: {
    title: "Département d'inclusion",
    lede: "Responsable du programme d'inclusion — Mme Lucie Tannous El Hajj.",
    items: [
      {
        title: "Reconnaître les difficultés d'apprentissage",
        body: "Nous accompagnons les élèves qui rencontrent des difficultés en lecture, écriture, mémoire, calcul ou dans les processus développementaux et cognitifs nécessaires à la réussite.",
      },
      {
        title: "Plans d'éducation individualisés",
        body: 'De nouvelles approches pour les compétences fondamentales, un travail sur la mémoire à court et long terme, dans un plan individualisé pour chaque élève.',
      },
      {
        title: 'Adaptation du programme',
        body: "Nous adaptons le programme avec une équipe coordinatrice et développons des compétences supérieures : organisation, planification du temps et pensée abstraite.",
      },
      {
        title: 'Une communauté inclusive',
        body: 'Un environnement confortable et inclusif qui renforce la confiance en soi, sensibilise et accompagne les familles aux côtés de leurs enfants.',
      },
    ],
  },
  ar: {
    title: 'قسم الدمج',
    lede: 'رئيسة برنامج الدمج — السيّدة لوسي طنّوس الحاجّ.',
    items: [
      {
        title: 'تبيّن الصعوبات التعلّمية',
        body: 'ندعم الطلاب الذين يواجهون صعوبات في القراءة والكتابة والذاكرة والحساب أو في العمليّات النمائيّة والمعرفيّة الأساسيّة للإنجاز الأكاديمي.',
      },
      {
        title: 'خطط تربويّة فرديّة',
        body: 'مقاربات جديدة لتعليم المهارات الأساسيّة، وعمل على الذاكرة القصيرة والطويلة المدى، ضمن خطّة فرديّة لكلّ طالب.',
      },
      {
        title: 'مواءمة المنهج',
        body: 'نُكيّف المنهج مع فريق منسِّق وننمّي مهارات عليا: التنظيم، وتخطيط الوقت، والتفكير المجرَّد.',
      },
      {
        title: 'مجتمع شامل',
        body: 'بيئة دامجة ومريحة تعزّز الثقة بالنفس وتنشر الوعي وتدعم الأهالي إلى جانب أبنائهم.',
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
      image="/images/seed/lucita-square.png"
      imageAlt="Mrs. Lucie Tannous El Hajj — Head of Integrative Program"
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
