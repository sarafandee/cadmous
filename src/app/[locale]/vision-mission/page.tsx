import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { Card, PageHeader, Section, SectionHead } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<
  string,
  {
    title: string
    breadcrumb: string
    lede: string
    mission: { title: string; body: string }
    vision: { title: string; body: string }
  }
> = {
  en: {
    title: 'Mission & Vision',
    breadcrumb: 'About Us',
    lede: 'What we stand for, and where we are heading.',
    mission: {
      title: 'Mission',
      body: 'Cadmous College teaches, challenges, and guides students to become knowledgeable, curious, confident, ethical, life-long learners and responsible global citizens, who aim for the betterment of their local community, country, and the world, by promoting cultural awareness and respect.',
    },
    vision: {
      title: 'Vision',
      body: 'Cadmous College is committed to its vision of offering the best education for the region and to be a leading educational community for students of all nationalities and religions.',
    },
  },
  fr: {
    title: 'Mission & Vision',
    breadcrumb: 'À propos',
    lede: 'Ce que nous défendons, et la direction que nous prenons.',
    mission: {
      title: 'Mission',
      body: "Cadmous College enseigne, met au défi et accompagne ses élèves pour qu'ils deviennent des apprenants curieux, confiants, éthiques et engagés tout au long de leur vie, ainsi que des citoyens responsables œuvrant à l'amélioration de leur communauté, de leur pays et du monde, en promouvant la conscience culturelle et le respect.",
    },
    vision: {
      title: 'Vision',
      body: "Cadmous College s'engage à offrir la meilleure éducation possible pour la région et à devenir une communauté éducative de référence accueillant des élèves de toutes nationalités et religions.",
    },
  },
  ar: {
    title: 'الرسالة والرؤية',
    breadcrumb: 'من نحن',
    lede: 'ما نؤمن به، والاتجاه الذي نسلكه.',
    mission: {
      title: 'الرسالة',
      body: 'تُعلِّم مدرسة قدموس طلابها وتتحدّاهم وتوجّههم ليصبحوا متعلّمين فضوليّين، واثقين، ذوي أخلاق، ومتعلّمين مدى الحياة، ومواطنين عالميّين مسؤولين، يسعون إلى تطوير مجتمعهم المحلّي وبلدهم والعالم، من خلال تعزيز الوعي الثقافي والاحترام.',
    },
    vision: {
      title: 'الرؤية',
      body: 'تلتزم مدرسة قدموس برؤيتها في تقديم أفضل تعليم في المنطقة، وأن تكون مجتمعًا تربويًّا رائدًا لطلاب من كلّ الجنسيات والأديان.',
    },
  },
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.breadcrumb }, { label: t.title }]}
        lede={t.lede}
      />
      <Section>
        <SectionHead />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8">
            <h2 className="mb-4 text-[24px] font-bold leading-[1.2] text-white">
              {t.mission.title}
            </h2>
            <p className="m-0 text-[15.5px] leading-[1.7] text-white/70">{t.mission.body}</p>
          </Card>
          <Card className="p-8">
            <h2 className="mb-4 text-[24px] font-bold leading-[1.2] text-white">
              {t.vision.title}
            </h2>
            <p className="m-0 text-[15.5px] leading-[1.7] text-white/70">{t.vision.body}</p>
          </Card>
        </div>
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
