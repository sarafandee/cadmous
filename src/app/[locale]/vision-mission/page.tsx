import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Eyebrow, InfoGrid, PageHeader, Section, SectionHead } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcAbout: string
  bcThis: string
  missionLabel: string
  visionLabel: string
  mission: string
  vision: string
  principlesEyebrow: string
  principlesTitle: string
  principles: { title: string; body: string }[]
}> = {
  en: {
    title: 'Vision & Mission',
    bcAbout: 'About Us',
    bcThis: 'Vision & Mission',
    missionLabel: 'Mission',
    visionLabel: 'Vision',
    mission:
      'Cadmous College teaches, challenges, and guides students to become knowledgeable, curious, confident, ethical, life-long learners and responsible global citizens, who aim for the betterment of their local community, country, and the world, by promoting cultural awareness and respect.',
    vision:
      'Cadmous College is committed to its vision of offering the best education for the region and to be a leading educational community for students of all nationalities and religions.',
    principlesEyebrow: 'Our principles',
    principlesTitle: 'What guides our school day to day.',
    principles: [
      { title: 'Curiosity', body: 'We treat questions as the starting point of learning, not the end of it.' },
      { title: 'Respect', body: 'For every student, every family, every culture under our roof.' },
      { title: 'Rigour', body: 'High expectations met with the support to reach them.' },
      { title: 'Service', body: 'Education shapes citizens — at home and in the world.' },
    ],
  },
  fr: {
    title: 'Vision & Mission',
    bcAbout: 'À propos',
    bcThis: 'Vision & Mission',
    missionLabel: 'Mission',
    visionLabel: 'Vision',
    mission:
      "Le Collège Cadmous enseigne, met au défi et guide les élèves pour devenir des apprenants tout au long de la vie — savants, curieux, confiants, éthiques — et des citoyens responsables œuvrant à l'amélioration de leur communauté, de leur pays et du monde.",
    vision:
      "Le Collège Cadmous s'engage à offrir la meilleure éducation pour la région et à être une communauté éducative de référence pour les élèves de toutes nationalités et religions.",
    principlesEyebrow: 'Nos principes',
    principlesTitle: 'Ce qui guide notre école au quotidien.',
    principles: [
      { title: 'Curiosité', body: "Les questions sont le point de départ de l'apprentissage." },
      { title: 'Respect', body: 'Pour chaque élève, chaque famille, chaque culture sous notre toit.' },
      { title: 'Exigence', body: 'Des attentes élevées et le soutien pour les atteindre.' },
      { title: 'Service', body: "L'éducation forme des citoyens — chez nous et dans le monde." },
    ],
  },
  ar: {
    title: 'الرؤية والرسالة',
    bcAbout: 'من نحن',
    bcThis: 'الرؤية والرسالة',
    missionLabel: 'الرسالة',
    visionLabel: 'الرؤية',
    mission:
      'تعلّم مدرسة قدموس طلابها وتتحدّاهم وترشدهم ليصبحوا متعلّمين مدى الحياة، فضوليّين، واثقين، مسؤولين عن مجتمعهم وبلدهم والعالم، عبر تعزيز الوعي الثقافي والاحترام.',
    vision:
      'تلتزم مدرسة قدموس برؤيتها في تقديم أفضل تعليم للمنطقة، وأن تكون مجتمعًا تعليميًا رائدًا لطلاب من كل الجنسيات والأديان.',
    principlesEyebrow: 'مبادئنا',
    principlesTitle: 'ما يقود مدرستنا يومًا بيوم.',
    principles: [
      { title: 'الفضول', body: 'نعتبر الأسئلة نقطة انطلاق التعلّم، لا نهايته.' },
      { title: 'الاحترام', body: 'لكل طالب وكل عائلة وكل ثقافة تحت سقفنا.' },
      { title: 'الصرامة', body: 'سقف عالٍ من التوقّعات يقابله دعم كافٍ.' },
      { title: 'الخدمة', body: 'التعليم يصوغ المواطنين — في الوطن وفي العالم.' },
    ],
  },
}

export default async function VisionMissionPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en

  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcAbout }, { label: t.bcThis }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[6px] border border-white/10 bg-navy-800 p-9">
            <Eyebrow>{t.missionLabel}</Eyebrow>
            <p className="text-[18px] leading-[1.7] text-white">{t.mission}</p>
          </div>
          <div className="rounded-[6px] border border-white/10 bg-navy-800 p-9">
            <Eyebrow>{t.visionLabel}</Eyebrow>
            <p className="text-[18px] leading-[1.7] text-white">{t.vision}</p>
          </div>
        </div>
      </Section>
      <Section alt>
        <SectionHead eyebrow={t.principlesEyebrow} title={t.principlesTitle} />
        <InfoGrid items={t.principles} />
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
