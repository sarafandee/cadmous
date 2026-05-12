import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { InfoGrid, PageHeader, Section } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcAbout: string
  bcThis: string
  lede: string
  note: string
  policies: { title: string; body: string }[]
}> = {
  en: {
    title: 'Policies',
    bcAbout: 'About Us',
    bcThis: 'Policies',
    lede: 'Public policies that shape life and learning at Cadmous.',
    note: '[Lorem ipsum — full PDF copies available on request.]',
    policies: [
      { title: 'Academic Integrity', body: 'Our standards on honesty in assessment, citation, and conduct.' },
      { title: 'Admissions Policy', body: 'How we evaluate applications fairly and consistently.' },
      { title: 'Assessment Policy', body: 'How we measure and report student learning.' },
      { title: 'Inclusion Policy', body: 'How we ensure every learner has access and support.' },
      { title: 'Language Policy', body: 'How English, French, and Arabic are taught and used.' },
      { title: 'Code of Conduct', body: 'Expectations for students, staff, and the wider community.' },
    ],
  },
  fr: {
    title: 'Politiques',
    bcAbout: 'À propos',
    bcThis: 'Politiques',
    lede: "Les politiques publiques qui encadrent la vie et l'apprentissage à Cadmous.",
    note: '[Copies PDF complètes disponibles sur demande.]',
    policies: [
      { title: 'Intégrité académique', body: "Nos normes en matière d'honnêteté, de citation et de conduite." },
      { title: 'Politique d’admission', body: "Comment nous évaluons les candidatures avec équité." },
      { title: "Politique d'évaluation", body: "Comment nous mesurons et rapportons les apprentissages." },
      { title: "Politique d'inclusion", body: "Comment chaque apprenant a accès au soutien nécessaire." },
      { title: 'Politique linguistique', body: "Comment l'anglais, le français et l'arabe sont enseignés et utilisés." },
      { title: 'Code de conduite', body: 'Attentes pour les élèves, le personnel et la communauté.' },
    ],
  },
  ar: {
    title: 'السياسات',
    bcAbout: 'من نحن',
    bcThis: 'السياسات',
    lede: 'سياسات عامة تُشكّل حياة المدرسة وتعلّمها.',
    note: '[نسخ PDF كاملة متوفّرة عند الطلب.]',
    policies: [
      { title: 'النزاهة الأكاديمية', body: 'معاييرنا في الأمانة في التقييم والتوثيق والسلوك.' },
      { title: 'سياسة القبول', body: 'كيف نقيّم الطلبات بإنصاف واتّساق.' },
      { title: 'سياسة التقييم', body: 'كيف نقيس تعلّم الطلاب ونُبلّغ عنه.' },
      { title: 'سياسة الدمج', body: 'كيف نضمن لكل متعلّم حقّ الوصول والدعم.' },
      { title: 'السياسة اللغوية', body: 'كيف تُدرَّس وتُستخدم الإنجليزية والفرنسية والعربية.' },
      { title: 'مدوّنة السلوك', body: 'توقّعاتنا من الطلاب والكادر والمجتمع.' },
    ],
  },
}

export default async function PoliciesPage({ params }: Args) {
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
        <InfoGrid items={t.policies} cols={3} />
        <p className="mt-9 text-[13px] text-white/40">{t.note}</p>
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
