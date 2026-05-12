import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

import { divisionLabels } from '../_division-labels'

type Args = { params: Promise<{ locale: string }> }

const HEAD = { name: 'Father Jean Pierre Karam (M.L.)', role: 'Head of Years 7 to 9', image: '/images/seed/jean-pierre-square.png' }

const T: Record<string, { title: string; body: string[] }> = {
  en: {
    title: 'Intermediate (Years 7 to 9)',
    body: [
      "The Elementary School years are an important time for students to not only learn fundamental concepts and mechanics but to also develop learning skills and approaches that will set the stage for a lifetime of success. Cadmous College Elementary focuses on children's natural curiosity and encourages them to dig deep into topics and subject areas.",
      "We include a variety of learning approaches, along with multi-sensory and hands-on activities that appeal to a variety of learning styles. These activities focus on children's natural sense of curiosity and encourage students to explore and discover.",
      'Our elementary school curriculum focuses on the various subject areas: English, Math, Science, Arabic, French, P.E., History, and Civics. Students will develop strong reading comprehension skills, write original composition pieces, develop critical thinking skills, learn fundamental math concepts, explore a variety of science topics, and learn about the world around them while maintaining a strong connection with the rich Arabic language.',
      'Our engaging Elementary School curriculum will encourage our students to explore, discover, and excel while learning fundamental concepts that lead to academic success for years to come!',
    ],
  },
  fr: {
    title: 'Intermédiaire (années 7 à 9)',
    body: [
      "Les années intermédiaires sont une période importante : les élèves y acquièrent non seulement les concepts fondamentaux et la mécanique disciplinaire, mais aussi les compétences et les approches d'apprentissage qui forgent le succès à long terme. À Cadmous College, nous misons sur la curiosité naturelle des enfants et les encourageons à approfondir les sujets et les matières.",
      "Nous combinons des approches variées et des activités multisensorielles et concrètes qui répondent à différents styles d'apprentissage. Ces activités s'appuient sur la curiosité naturelle des enfants et les invitent à explorer et à découvrir.",
      "Notre programme couvre les matières principales : anglais, mathématiques, sciences, arabe, français, EPS, histoire et éducation civique. Les élèves développent une solide compréhension écrite, rédigent des productions originales, affûtent leur pensée critique, apprennent les concepts mathématiques fondamentaux, explorent des sujets scientifiques variés, et découvrent le monde tout en maintenant un lien fort avec la richesse de la langue arabe.",
      "Notre programme stimulant encourage les élèves à explorer, découvrir et exceller, tout en construisant les fondations qui mèneront à la réussite académique pendant des années.",
    ],
  },
  ar: {
    title: 'المتوسّط (السنوات 7 إلى 9)',
    body: [
      'مرحلة المتوسّط فترة مهمّة لا يتعلّم فيها الطلّاب المفاهيم الأساسيّة والآليّات فحسب، بل يطوّرون أيضًا مهارات التعلّم والمقاربات التي تُهيّئهم للنجاح مدى الحياة. في مدرسة قدموس نُركّز على فضول الأطفال الطبيعيّ ونُشجّعهم على التعمّق في المواضيع والمواد.',
      'نَمزج مقاربات تعلّم متنوّعة ونشاطات متعدّدة الحواسّ وعمليّة تستجيب لأنماط التعلّم المختلفة. وتُغذّي هذه الأنشطة فضول الأطفال الطبيعيّ، وتدفعهم إلى الاستكشاف والاكتشاف.',
      'يُغطّي منهجنا المواد الأساسيّة: اللغة الإنكليزيّة، الرياضيات، العلوم، اللغة العربيّة، اللغة الفرنسيّة، التربية البدنيّة، التاريخ، والمدنيّات. يُنمّي الطلّاب مهارات قويّة في الفهم القرائيّ، ويكتبون نصوصًا أصيلة، ويُطوّرون التفكير الناقد، ويتعلّمون المفاهيم الرياضيّة الأساسيّة، ويستكشفون موضوعات علميّة متنوّعة، ويتعرّفون إلى العالم من حولهم مع الحفاظ على ارتباط متين باللغة العربيّة الغنيّة.',
      'يُحفّز منهجنا الطلّاب على الاستكشاف والاكتشاف والتفوّق، ويبني الأساسات التي تقود إلى نجاح أكاديميّ ممتدّ لسنوات قادمة.',
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
      body={t.body}
      labels={divisionLabels(locale, t.title)}
    />
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
