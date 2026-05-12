import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageHeader, Section, Timeline } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcAbout: string
  bcThis: string
  lede: string
  events: { year: string; title: string; body: string }[]
}> = {
  en: {
    title: 'History',
    bcAbout: 'About Us',
    bcThis: 'History',
    lede: 'Cadmous College has served families in Tyre and the south since 1976.',
    events: [
      { year: '1976', title: 'Cadmous College founded', body: '[Lorem ipsum founding placeholder]' },
      { year: '1980s', title: 'Programme expansion', body: '[Lorem ipsum expansion placeholder]' },
      { year: '1990s', title: 'New campus', body: '[Lorem ipsum facilities placeholder]' },
      { year: '2000s', title: 'International outlook', body: '[Lorem ipsum placeholder]' },
      { year: '2010s', title: 'IB authorisation', body: '[Lorem ipsum IB placeholder]' },
      { year: 'Today', title: 'Continuing the work', body: '[Lorem ipsum present-day placeholder]' },
    ],
  },
  fr: {
    title: 'Notre histoire',
    bcAbout: 'À propos',
    bcThis: 'Histoire',
    lede: 'Le Collège Cadmous sert les familles de Tyr et du Sud depuis 1976.',
    events: [
      { year: '1976', title: 'Fondation du Collège Cadmous', body: '[Texte à remplacer]' },
      { year: 'Années 1980', title: 'Élargissement du programme', body: '[Texte à remplacer]' },
      { year: 'Années 1990', title: 'Nouveau campus', body: '[Texte à remplacer]' },
      { year: 'Années 2000', title: 'Ouverture internationale', body: '[Texte à remplacer]' },
      { year: 'Années 2010', title: 'Autorisation IB', body: '[Texte à remplacer]' },
      { year: "Aujourd'hui", title: 'Une mission qui se poursuit', body: '[Texte à remplacer]' },
    ],
  },
  ar: {
    title: 'تاريخنا',
    bcAbout: 'من نحن',
    bcThis: 'التاريخ',
    lede: 'تخدم مدرسة قدموس عائلات صور وجنوب لبنان منذ عام 1976.',
    events: [
      { year: '1976', title: 'تأسيس مدرسة قدموس', body: '[نص بديل للتأسيس]' },
      { year: 'الثمانينيات', title: 'توسّع البرنامج', body: '[نص بديل للتوسّع]' },
      { year: 'التسعينيات', title: 'حرم جديد', body: '[نص بديل للمنشآت]' },
      { year: '2000+', title: 'انفتاح دولي', body: '[نص بديل للانفتاح]' },
      { year: '2010+', title: 'اعتماد البكالوريا الدولية', body: '[نص بديل للاعتماد]' },
      { year: 'اليوم', title: 'استمرار المسيرة', body: '[نص بديل للحاضر]' },
    ],
  },
}

export default async function HistoryPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en

  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcAbout }, { label: t.bcThis }]}
        lede={t.lede}
      />
      <Section>
        <Timeline items={t.events} />
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
