import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { PageHeader, ProseTwoCol, Section } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<
  string,
  {
    title: string
    breadcrumb: string
    lede: string
    body: string[]
  }
> = {
  en: {
    title: 'History',
    breadcrumb: 'About Us',
    lede: 'From the Phoenician alphabet torch to half a century of teaching in the South.',
    body: [
      'There is a history of education and civilization between “Cadmous” the legend and Cadmous the school.',
      '“Cadmous”, the Tyronian son of the south, rode the seas carrying with him the Phoenician alphabet torch to enlighten the way wherever he went while searching for his sister Europe. “Cadmous” spread education around the world and became the first alphabet teacher.',
      'Cadmous College follows in his footsteps by spreading his cultural message to this very day. Cadmous College has been leading and lightening the path in this area for almost half a century.',
    ],
  },
  fr: {
    title: 'Histoire',
    breadcrumb: 'À propos',
    lede: "Du flambeau de l'alphabet phénicien à un demi-siècle d'enseignement dans le sud.",
    body: [
      "Il existe une histoire d'éducation et de civilisation entre « Cadmous » la légende et Cadmous l'école.",
      "« Cadmous », fils tyrien du sud, parcourut les mers en portant avec lui le flambeau de l'alphabet phénicien pour éclairer le chemin partout où il allait, à la recherche de sa sœur Europe. « Cadmous » a répandu l'éducation à travers le monde et est devenu le premier maître d'alphabet.",
      "Cadmous College suit ses traces en diffusant son message culturel jusqu'à aujourd'hui. Cadmous College éclaire et guide cette région depuis près d'un demi-siècle.",
    ],
  },
  ar: {
    title: 'تاريخنا',
    breadcrumb: 'من نحن',
    lede: 'من شعلة الحرف الفينيقي إلى نصف قرن من التعليم في الجنوب.',
    body: [
      'ثمّة تاريخ من العلم والحضارة يجمع بين «قدموس» الأسطورة و«قدموس» المدرسة.',
      'ركب «قدموس»، ابن صور الجنوبيّ، البحار حاملًا شعلة الحرف الفينيقي ليُنير الطريق أينما حلّ، باحثًا عن أخته أوروبا. نشر «قدموس» العلم في أرجاء الأرض، وصار أوّل معلّم للأبجدية.',
      'تسير مدرسة قدموس على خطاه فتنقل رسالته الثقافيّة إلى يومنا هذا. وقد قادت طريق العلم وأنارته في هذه المنطقة منذ ما يقارب نصف قرن.',
    ],
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
        <ProseTwoCol
          image="/images/seed/history.jpg"
          imageAlt="Cadmous College through the decades"
          body={
            <>
              {t.body.map((p, i) => (
                <p key={i} className="mb-4 text-white/70">
                  {p}
                </p>
              ))}
            </>
          }
        />
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
