import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

import { divisionLabels } from '../_division-labels'

type Args = { params: Promise<{ locale: string }> }

const HEAD = { name: 'Mrs. Hayfa Mozaya', role: 'Head of Years 2 to 6', image: '/images/seed/hayfa-square.jpg' }

const T: Record<string, { title: string; body: string[] }> = {
  en: {
    title: 'Primary (Years 2 to 6)',
    body: [
      'Students in this program follow the National Curriculum for Lebanon, which continues to build on the foundations that are established in Kindergarten and year 1.',
      "Providing the required skills to tackle the ever-changing world is fundamental to the Primary School's approach to providing the most challenging and exciting learning experiences for every child. We are committed to developing our children to become long life learners who understand their individual learning needs.",
      'Our highly skilled and dedicated teachers fully appreciate what a privileged position they are in and what a significant difference they make to the lives of our children daily. They expertly ensure that lessons are adapted and personalized so that each child maximizes their progress and that there is the appropriate amount of stretch and challenge.',
      'Cadmous College ensures that a comprehensive curriculum and an enriched extracurricular program is available, allowing our children the opportunity to develop their unique skills and talents and have the opportunity to showcase them.',
      'The curriculum for the Primary School is based on the Lebanese National Curriculum, providing the required guidance and support children need to succeed both academically and socially. This is a rich blend of academic, social, physical, cultural, and artistic learning opportunities, covering all the major subject content focusing on the skills associated with each subject, as well as activities that are imperative for holistic development.',
      'By the end of Year 6, our aim is that all students will have gained a well-rounded education. They will have matured through understanding and character development, have developed articulate expression and confidence, and will be well prepared for their secondary education.',
    ],
  },
  fr: {
    title: 'Primaire (années 2 à 6)',
    body: [
      "Les élèves de ce programme suivent le programme national libanais, qui prolonge les bases établies en maternelle et en année 1.",
      "Offrir les compétences nécessaires pour appréhender un monde en perpétuelle évolution est au cœur de l'approche du primaire : proposer à chaque enfant les expériences d'apprentissage les plus stimulantes et les plus exigeantes. Nous nous engageons à former des apprenants à vie, conscients de leurs besoins individuels.",
      "Nos enseignants, hautement qualifiés et dévoués, mesurent pleinement la chance de leur position et la différence qu'ils opèrent au quotidien dans la vie de nos enfants. Ils adaptent et personnalisent leurs leçons avec expertise pour que chaque enfant progresse avec un niveau d'exigence approprié.",
      "Cadmous College garantit la disponibilité d'un programme complet et d'un riche dispositif parascolaire, offrant à chaque enfant l'occasion de développer ses talents singuliers et de les mettre en valeur.",
      "Le programme du primaire s'appuie sur le programme national libanais, qui fournit l'accompagnement nécessaire à la réussite académique et sociale. C'est un mélange riche d'apprentissages académiques, sociaux, physiques, culturels et artistiques, couvrant les contenus principaux et privilégiant les compétences associées à chaque matière, ainsi que les activités indispensables à un développement complet.",
      "À la fin de l'année 6, notre objectif est que chaque élève ait reçu une éducation équilibrée. Ils auront mûri par la compréhension et le développement de leur caractère, développé l'expression et la confiance en soi, et seront bien préparés à leur scolarité secondaire.",
    ],
  },
  ar: {
    title: 'الابتدائي (السنوات 2 إلى 6)',
    body: [
      'يتّبع طلّاب هذا البرنامج المنهج الوطني اللبناني الذي يبني على الأسس المرساة في الروضة والسنة الأولى.',
      'إنّ تأمين المهارات اللازمة لمواجهة عالم متبدّل باستمرار يقع في صميم مقاربة قسم الابتدائي: تقديم أكثر التجارب التعلّمية تحدّيًا وإثارةً لكلّ طفل. ونحن ملتزمون بتنمية أطفالنا ليصبحوا متعلّمين مدى الحياة يدركون احتياجاتهم التعلّمية الفرديّة.',
      'يُدرك معلّمونا ذوو الخبرة والكفاءة موقعَهم المتميّز والأثر الذي يصنعونه يوميًّا في حياة أطفالنا. وهم يُكيّفون الدروس ويُخصّصونها بحرفيّة كي يحقّق كلّ طفل أقصى تقدّمه ضمن تحدٍّ ملائم.',
      'تَكفل مدرسة قدموس توافر منهج شامل وبرنامج لاصفّي غنيّ يُتيحان لكلّ طفل تنمية مهاراته ومواهبه الفريدة وعرضها.',
      'يستند منهج المرحلة الابتدائيّة إلى المنهج الوطنيّ اللبنانيّ، فيُقدّم التوجيه والدعم اللازمين للنجاح الأكاديميّ والاجتماعيّ. وهو مزيج غنيّ من فرص التعلّم الأكاديميّ والاجتماعيّ والبدنيّ والثقافيّ والفنّي، يغطّي المضامين الكبرى مع التركيز على المهارات المرتبطة بكلّ مادّة، ويتضمّن أنشطة لا غنى عنها للنموّ الشامل.',
      'بنهاية السنة السادسة نطمح إلى أن يكون كلّ طالب قد تلقّى تعليمًا متكاملًا، نضج عبر الفهم وبناء الشخصيّة، وطوّر تعبيرًا واضحًا وثقةً بالنفس، وأصبح مهيَّأً جيّدًا للمرحلة الثانويّة.',
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
