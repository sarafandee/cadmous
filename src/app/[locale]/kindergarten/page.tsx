import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { DivisionPage } from '@/components/CadmousUI/DivisionPage'

import { divisionLabels } from '../_division-labels'

type Args = { params: Promise<{ locale: string }> }

const HEAD = { name: 'Mrs. Samar Costantine', role: 'Head of Kindergarten & Year 1', image: '/images/seed/samar-square.png' }

const T: Record<string, { title: string; body: string[] }> = {
  en: {
    title: 'Kindergarten & Year 1',
    body: [
      'This department is essential as it admits children as young as three years old. At this age, children are not used to being in unfamiliar places except for their homes or occasional visits to daycare centers. For these children, school is a whole new world, and we must recognize the significance of our mission and the need for accurate attention to every educational task we undertake. This is particularly important with young learners who tend to mimic and reproduce what they see and hear.',
      "The department's administration and teachers are committed to providing a nurturing environment and guidance for the healthy growth of children. They aim to explore the child's abilities and talents, allowing them to develop and shine. They provide the child with the skills and knowledge they need in a comfortable atmosphere that is free of pressure and exhaustion, enabling the child to show their true self. We believe that providing children with an accurate self-image is crucial for us to understand them better.",
      'The primary duty of a kindergarten teacher is to establish a safe and comforting environment for the children, enabling them to communicate freely without anxiety and to engage in spontaneous activities without hesitation.',
      'At the kindergarten and grade one departments, children receive academic education following the curriculum provided by the Educational Center for Research and Development. Students learn through the use of advanced technology and modern teaching methods under the guidance of specialized teachers.',
      'The department places significant importance on recreational activities that complement the academic curriculum. These activities encourage children to use their creativity, develop their imagination and ingenuity, and express their opinions freely. Children also develop their physical and cognitive strength by playing with friends, participating in parties, going on trips, and engaging in various activities that help them discover new things and communicate more effectively with their environment. These activities also help children adapt to the school environment, enhance their willingness to learn, and foster the formation of all aspects of their personality in an atmosphere that is full of joy and love.',
    ],
  },
  fr: {
    title: 'Maternelle et année 1',
    body: [
      "Ce département est essentiel puisqu'il accueille des enfants dès l'âge de trois ans. À cet âge, les enfants ne sont pas habitués à fréquenter des lieux inconnus, en dehors de leur foyer ou de visites occasionnelles dans des crèches. Pour eux, l'école est un monde entièrement nouveau, et nous devons mesurer l'importance de notre mission et la rigueur que demande chaque tâche pédagogique. Cela est d'autant plus crucial avec de jeunes apprenants qui imitent et reproduisent ce qu'ils voient et entendent.",
      "L'administration et les enseignants du département s'engagent à offrir un environnement bienveillant et un accompagnement pour le bon développement des enfants. Ils explorent les capacités et les talents de chaque enfant pour leur permettre de s'épanouir. Ils donnent à l'enfant les compétences et les connaissances dont il a besoin dans une atmosphère confortable, sans pression ni fatigue, lui permettant de se révéler. Nous croyons qu'aider les enfants à construire une image juste d'eux-mêmes est essentiel pour bien les comprendre.",
      "Le rôle principal d'une enseignante en maternelle est de créer un environnement sûr et rassurant qui permette aux enfants de communiquer librement, sans anxiété, et de s'engager dans des activités spontanées sans hésitation.",
      "En maternelle et en première année, les enfants reçoivent une éducation académique fondée sur le programme du Centre de Recherche et de Développement Pédagogique. Les élèves apprennent grâce à des technologies modernes et à des méthodes d'enseignement actuelles, sous la conduite d'enseignants spécialisés.",
      "Le département accorde une grande importance aux activités récréatives qui complètent le programme académique. Elles encouragent les enfants à mobiliser leur créativité, à développer leur imagination et leur ingéniosité, et à exprimer librement leurs opinions. Les enfants développent aussi leur force physique et cognitive en jouant entre amis, en participant à des fêtes, à des sorties et à diverses activités qui les aident à découvrir et à mieux communiquer avec leur environnement. Ces activités les aident également à s'adapter au cadre scolaire, à renforcer leur envie d'apprendre, et à construire l'ensemble de leur personnalité dans une atmosphère pleine de joie et d'affection.",
    ],
  },
  ar: {
    title: 'الروضة والصفّ الأوّل',
    body: [
      'هذا القسم في غاية الأهميّة لأنّه يستقبل أطفالًا في الثالثة من العمر. في هذه السنّ لم يعتد الأطفال على الأماكن غير المألوفة إلّا منازلهم أو زيارات قليلة إلى دور الحضانة. فالمدرسة بالنسبة إليهم عالم جديد كلّه، وعلينا أن نُدرك أهميّة رسالتنا والدقّة المطلوبة في كلّ مهمّة تربويّة، خصوصًا مع متعلّمين صغار يميلون إلى تقليد ما يرونه ويسمعونه.',
      'إدارة القسم والمعلّمات ملتزمات بتأمين بيئة حاضنة وتوجيه يصون نموّ الأطفال السليم. نسعى إلى استكشاف قدرات الطفل ومواهبه ليتطوّر ويتألّق. نُقدّم له المهارات والمعارف التي يحتاجها في جوّ مريح بعيد من الضغط والإرهاق، يُتيح له أن يُظهر ذاته الحقيقيّة. نؤمن بأنّ تكوين صورة ذاتيّة دقيقة لدى الطفل أمر جوهريّ لفهمه فهمًا أفضل.',
      'الواجب الأوّل للمعلّمة في الروضة هو إنشاء بيئة آمنة ومُريحة تُتيح للأطفال التعبير بحرّيّة دون قلق، والانخراط في النشاطات العفويّة دون تردّد.',
      'في قسمَي الروضة والصفّ الأوّل يتلقّى الأطفال تعليمًا أكاديميًّا وفق مناهج المركز التربويّ للبحوث والإنماء. يتعلّم الطلّاب باستخدام تكنولوجيا متقدّمة وأساليب تدريس حديثة على يد معلّمات متخصّصات.',
      'يولي القسم أهميّة كبيرة للأنشطة الترفيهيّة المكمِّلة للمنهج الأكاديميّ. تُحفّز هذه الأنشطة الأطفال على استثمار الإبداع وتنمية الخيال والابتكار، والتعبير عن آرائهم بحرّيّة. ينمّي الأطفال أيضًا قواهم الجسديّة والمعرفيّة باللعب مع الأصدقاء والمشاركة في الحفلات والرحلات، فيكتشفون أمورًا جديدة ويتواصلون مع محيطهم بصورة أفعل. كما تساعدهم على التكيّف مع المدرسة، وزيادة شغفهم بالتعلّم، وبناء شخصيّتهم المتكاملة في أجواء مفعمة بالفرح والمحبّة.',
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
