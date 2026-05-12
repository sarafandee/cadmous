import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  Card,
  FAQ,
  PageHeader,
  ProcessSteps,
  Section,
  SectionHead,
} from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<string, {
  title: string
  bcAdmissions: string
  bcThis: string
  lede: string
  processEyebrow: string
  processTitle: string
  stepLabel: string
  steps: { title: string; body: string }[]
  docsTitle: string
  docs: string[]
  datesTitle: string
  dates: [string, string][]
  applyEyebrow: string
  applyTitle: string
  appEn: { title: string; body: string; href: string }
  appFr: { title: string; body: string; href: string }
  appAr: { title: string; body: string; href: string }
  faqEyebrow: string
  faqTitle: string
  faqs: { q: string; a: string }[]
}> = {
  en: {
    title: 'Admissions Requirements',
    bcAdmissions: 'Admissions',
    bcThis: 'Requirements',
    lede: 'A clear path from first enquiry to first day of school.',
    processEyebrow: 'The process',
    processTitle: 'Four steps to admission.',
    stepLabel: 'STEP',
    steps: [
      { title: 'Enquire', body: 'Submit an online application or visit the school office.' },
      { title: 'Review', body: 'We assess academic records and supporting documents.' },
      { title: 'Interview', body: 'A meeting with the family and an age-appropriate assessment.' },
      { title: 'Decision', body: 'You receive an admissions decision and enrolment paperwork.' },
    ],
    docsTitle: 'Documents required',
    docs: [
      'Completed application form (English, French, or Arabic)',
      "Copy of the student's birth certificate",
      'Most recent two school reports',
      'Two passport-size photographs',
      'Vaccination record',
      '[Additional document placeholder]',
    ],
    datesTitle: 'Key dates',
    dates: [
      ['Applications open', 'October'],
      ['Open Day', 'November'],
      ['Application deadline', '31 January'],
      ['Decisions issued', 'March'],
      ['Enrolment confirmation', 'April'],
    ],
    applyEyebrow: 'Apply',
    applyTitle: 'Choose your application language.',
    appEn: { title: 'English Application', body: 'For families applying in English.', href: 'application/en' },
    appFr: { title: 'Demande Française', body: 'For families applying in French.', href: 'application/fr' },
    appAr: { title: 'طلب بالعربية', body: 'للعائلات التي تتقدّم بالطلب باللغة العربية.', href: 'application/ar' },
    faqEyebrow: 'FAQ',
    faqTitle: 'Common questions from families.',
    faqs: [
      { q: 'When can my child join Cadmous?', a: 'Admissions run on a rolling basis. The main intake is in September, with mid-year placements considered case by case.' },
      { q: 'Is there an entrance examination?', a: 'Yes — an age-appropriate assessment in language and mathematics, scheduled after the documents review.' },
      { q: 'Do you offer financial aid?', a: '[Placeholder — confirm with the school office.]' },
      { q: 'What languages will my child be taught in?', a: 'All three — English, French, and Arabic — with the balance shifting by grade and track.' },
      { q: 'How are placement decisions made?', a: 'Through the combined picture of records, the family interview, and the assessment.' },
    ],
  },
  fr: {
    title: "Conditions d'admission",
    bcAdmissions: 'Admissions',
    bcThis: 'Conditions',
    lede: "Un parcours clair, de la première prise de contact au premier jour d'école.",
    processEyebrow: 'Le processus',
    processTitle: "Quatre étapes vers l'admission.",
    stepLabel: 'ÉTAPE',
    steps: [
      { title: 'Demande', body: "Soumettez une candidature en ligne ou rendez-vous au bureau de l'école." },
      { title: 'Examen', body: 'Nous évaluons le dossier scolaire et les documents.' },
      { title: 'Entretien', body: 'Un rendez-vous avec la famille et une évaluation adaptée.' },
      { title: 'Décision', body: "Vous recevez la décision d'admission et le dossier d'inscription." },
    ],
    docsTitle: 'Documents requis',
    docs: [
      'Formulaire de candidature (anglais, français ou arabe)',
      "Copie de l'acte de naissance",
      'Deux derniers bulletins scolaires',
      "Deux photos d'identité",
      'Carnet de vaccination',
      '[Document complémentaire]',
    ],
    datesTitle: 'Dates clés',
    dates: [
      ['Ouverture des candidatures', 'Octobre'],
      ['Journée portes ouvertes', 'Novembre'],
      ['Clôture des candidatures', '31 janvier'],
      ['Annonce des décisions', 'Mars'],
      ['Confirmation', 'Avril'],
    ],
    applyEyebrow: 'Postuler',
    applyTitle: 'Choisissez la langue de votre demande.',
    appEn: { title: 'English Application', body: 'Pour les familles candidatant en anglais.', href: 'application/en' },
    appFr: { title: 'Demande Française', body: 'Pour les familles candidatant en français.', href: 'application/fr' },
    appAr: { title: 'طلب بالعربية', body: 'Pour les familles candidatant en arabe.', href: 'application/ar' },
    faqEyebrow: 'FAQ',
    faqTitle: 'Questions fréquentes des familles.',
    faqs: [
      { q: 'Quand mon enfant peut-il rejoindre Cadmous ?', a: 'Les admissions sont continues. La rentrée principale est en septembre ; les placements en cours d’année sont étudiés au cas par cas.' },
      { q: 'Existe-t-il un examen d’entrée ?', a: "Oui — une évaluation adaptée en langues et en mathématiques, après l'examen du dossier." },
      { q: 'Proposez-vous une aide financière ?', a: "[À confirmer avec le bureau de l'école.]" },
      { q: "Dans quelles langues sera enseigné mon enfant ?", a: 'Les trois — anglais, français et arabe — avec un équilibre variant selon le niveau et la filière.' },
      { q: 'Comment sont prises les décisions de placement ?', a: "À partir du dossier, de l'entretien et de l'évaluation." },
    ],
  },
  ar: {
    title: 'متطلّبات القبول',
    bcAdmissions: 'القبول',
    bcThis: 'المتطلّبات',
    lede: 'مسار واضح من أول استفسار إلى أول يوم دراسة.',
    processEyebrow: 'الإجراءات',
    processTitle: 'أربع خطوات نحو القبول.',
    stepLabel: 'خطوة',
    steps: [
      { title: 'الاستفسار', body: 'قدّم طلبًا إلكترونيًا أو زر مكتب المدرسة.' },
      { title: 'الفحص', body: 'نقيّم السجلات الأكاديمية والوثائق الداعمة.' },
      { title: 'المقابلة', body: 'لقاء مع العائلة وتقييم مناسب للعمر.' },
      { title: 'القرار', body: 'تستلم القرار وملف التسجيل.' },
    ],
    docsTitle: 'الوثائق المطلوبة',
    docs: [
      'نموذج طلب مكتمل (بالعربية أو الإنجليزية أو الفرنسية)',
      'نسخة عن شهادة ميلاد الطالب',
      'آخر علامتَين دراسيّتَين',
      'صورتان شخصيّتان',
      'دفتر اللقاحات',
      '[وثيقة إضافية]',
    ],
    datesTitle: 'تواريخ مهمّة',
    dates: [
      ['فتح باب القبول', 'تشرين الأول'],
      ['اليوم المفتوح', 'تشرين الثاني'],
      ['موعد إقفال الطلبات', '31 كانون الثاني'],
      ['إعلان القرارات', 'آذار'],
      ['تأكيد التسجيل', 'نيسان'],
    ],
    applyEyebrow: 'تقدّم بالطلب',
    applyTitle: 'اختر لغة الطلب.',
    appEn: { title: 'English Application', body: 'للعائلات التي تتقدّم بالإنجليزية.', href: 'application/en' },
    appFr: { title: 'Demande Française', body: 'للعائلات التي تتقدّم بالفرنسية.', href: 'application/fr' },
    appAr: { title: 'طلب بالعربية', body: 'للعائلات التي تتقدّم باللغة العربية.', href: 'application/ar' },
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'أكثر الأسئلة تكرارًا من العائلات.',
    faqs: [
      { q: 'متى يستطيع ابني الالتحاق بقدموس؟', a: 'القبول مفتوح طوال السنة. الالتحاق الرئيسي في أيلول، وتُدرَس حالات منتصف السنة كلٌّ على حدة.' },
      { q: 'هل هناك امتحان قبول؟', a: 'نعم — تقييم مناسب للعمر في اللغة والرياضيات، يُحدَّد بعد مراجعة الوثائق.' },
      { q: 'هل تتوفّر مساعدات مالية؟', a: '[للتأكيد مع مكتب المدرسة.]' },
      { q: 'بأي اللغات سيُدرَّس ابني؟', a: 'الثلاث — العربية والإنجليزية والفرنسية — مع اختلاف التوازن بحسب الصف والمسار.' },
      { q: 'كيف تُتّخذ قرارات التنسيب؟', a: 'بناءً على السجلات والمقابلة والتقييم معًا.' },
    ],
  },
}

export default async function RequirementsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcAdmissions }, { label: t.bcThis }]}
        lede={t.lede}
      />
      <Section>
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <ProcessSteps items={t.steps} stepLabel={t.stepLabel} />
      </Section>
      <Section alt>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {t.docsTitle}
            </h2>
            <ul className="ps-5 text-[15px] leading-[1.85] text-white/70 list-disc">
              {t.docs.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {t.datesTitle}
            </h2>
            <div className="flex flex-col gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10">
              {t.dates.map(([k, v], i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 bg-navy-800 px-5 py-4 text-[14.5px]"
                >
                  <span className="text-white">{k}</span>
                  <span className="tracking-[0.04em] text-white/40">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow={t.applyEyebrow} title={t.applyTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {[t.appEn, t.appFr, t.appAr].map((a, i) => (
            <Link
              key={i}
              href={`/${a.href}`}
              className="group"
            >
              <Card className="h-full">
                <h3 className="mb-2 text-[20px] font-bold leading-[1.25] text-white">
                  {a.title}
                </h3>
                <p
                  className="m-0 text-sm text-white/70"
                  dir={a.href === 'application/ar' ? 'rtl' : 'ltr'}
                >
                  {a.body}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section alt>
        <SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} />
        <FAQ items={t.faqs} />
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
