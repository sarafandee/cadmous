import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Lorem, PageHeader, Section } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcAbout: string
  bcThis: string
  the: string
  name: string
  quote: string
}> = {
  en: {
    title: 'A Word from the Director',
    bcAbout: 'About Us',
    bcThis: "Director's Message",
    the: 'The Director',
    name: "[Director's name placeholder]",
    quote: '"A school is, above all, a community. Ours is one in which curiosity is at home, languages live side by side, and every student is known."',
  },
  fr: {
    title: 'Mot de la Direction',
    bcAbout: 'À propos',
    bcThis: 'Mot du Directeur',
    the: 'Direction',
    name: '[Nom du Directeur — à confirmer]',
    quote: '« Une école est avant tout une communauté. La nôtre est un lieu où la curiosité se sent chez elle, où les langues vivent côte à côte, et où chaque élève est connu. »',
  },
  ar: {
    title: 'كلمة المدير',
    bcAbout: 'من نحن',
    bcThis: 'كلمة المدير',
    the: 'المدير',
    name: '[اسم المدير — للتحقق]',
    quote: '«المدرسة، قبل كل شيء، مجتمع. مجتمعنا تجد فيه الفضول بيته، وتتعايش فيه اللغات جنبًا إلى جنب، ويُعرف كل طالب باسمه».',
  },
}

export default async function DirectorPage({ params }: Args) {
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
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-[6px] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80"
                alt="Director"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 text-[13px] uppercase tracking-[0.12em] text-white/40">
              {t.the}
            </div>
            <div className="mt-1 text-[18px] font-bold text-white">{t.name}</div>
          </div>
          <div className="text-[17px] leading-[1.75] text-white/70">
            <p className="mb-6 text-[20px] leading-[1.55] text-white">{t.quote}</p>
            <Lorem paras={5} locale={locale} />
          </div>
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
