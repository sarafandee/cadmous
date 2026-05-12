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

type Subsection = { heading: string; body: string[] }
type ProgramBlock = {
  eyebrow: string
  title: string
  intro: string
  subsections?: Subsection[]
}

type Translation = {
  title: string
  bcAdmissions: string
  bcThis: string
  lede: string
  processEyebrow: string
  processTitle: string
  stepLabel: string
  steps: { title: string; body: string }[]
  programsEyebrow: string
  programsTitle: string
  kg: ProgramBlock
  lebanese: ProgramBlock
  international: ProgramBlock
  applyEyebrow: string
  applyTitle: string
  appEn: { title: string; body: string; href: string }
  appFr: { title: string; body: string; href: string }
  appAr: { title: string; body: string; href: string }
  faqEyebrow: string
  faqTitle: string
  faqs: { q: string; a: string }[]
}

const T: Record<string, Translation> = {
  en: {
    title: 'Admissions',
    bcAdmissions: 'Admissions',
    bcThis: 'Requirements',
    lede: 'Cadmous College provides an enriched education through both the National Curriculum for Lebanon and International Curriculum, empowering young minds to think creatively and exceed expectations.',
    processEyebrow: 'The process',
    processTitle: 'Four steps to admission.',
    stepLabel: 'Step',
    steps: [
      { title: 'Enquire', body: 'Submit an application or visit the school office.' },
      { title: 'Review', body: 'We assess academic records and supporting documents.' },
      { title: 'Interview & assessment', body: 'A meeting with the family and age-appropriate placement tests.' },
      { title: 'Decision', body: 'You receive an admissions decision and enrolment paperwork.' },
    ],
    programsEyebrow: 'By program',
    programsTitle: 'Admission requirements at each level.',
    kg: {
      eyebrow: 'Kindergarten',
      title: 'Kindergarten (KG1–KG3).',
      intro:
        "Admission is based on student assessments to determine school readiness. The school accepts students who are at the required age. Students are evaluated through a verbal interview during which the teacher observes pencil grip and recognition of colors and shapes. All students must be fully toilet trained before starting school.",
      subsections: [
        {
          heading: 'School psychologist',
          body: [
            'The school psychologist is one of the most important members of the school team — offering direct educational, behavioral, and emotional services to students, to ensure a supportive learning environment that promotes academic growth.',
            "Early intervention is critical for students with specific challenges. Techniques used include art therapy, game sessions, and meditation exercises. The psychologist coordinates with teachers and parents to provide recommendations for dealing with specific difficulties.",
          ],
        },
      ],
    },
    lebanese: {
      eyebrow: 'Lebanese Program',
      title: 'Primary, Elementary and Secondary (Lebanese Program).',
      intro:
        'Cadmous College is a learning community bound together by the principles of respect, responsibility, and honesty. We accept only students whose record demonstrates a clear commitment to these principles.',
      subsections: [
        {
          heading: 'A. The Admissions Interview',
          body: [
            'Interviews are scheduled with the family and the Head of the School and/or the relevant division director, depending on the grade level. Interviews usually take place in person.',
            "Each student's interests and questions are important to us. Applicants are encouraged to prepare a list of questions to ensure we address what matters most to them.",
          ],
        },
        {
          heading: 'B. English or French Language Assessment',
          body: [
            'All students applying for grades 1–12 sit an entrance exam in English or French, depending on the section they are applying to. Applicants must obtain a minimum score based on the grade to which they are applying.',
            "Cadmous College offers a special programme in grades 1–8 for students who require additional English language support.",
          ],
        },
        {
          heading: 'C. Other Assessments',
          body: [
            'Students in grades 1–12 also sit placement tests in Mathematics and Arabic. For non-native speakers of Arabic, a special exam is given. Students applying to grades 7–12 sit a proficiency exam in scientific subjects.',
            'Acceptance is based on the results of the entrance exams, previous academic records, and the personal interview.',
          ],
        },
      ],
    },
    international: {
      eyebrow: 'International Programs',
      title: 'IB Diploma and Pre-IB.',
      intro:
        'Cadmous College admits international and local students. We have implemented the International Programme curriculum since September 2016 and are an authorized school for the IB Diploma Programme. The IB Programme is open to all students, regardless of previous educational experience, provided they meet the Ministry of Education\'s requirements.',
      subsections: [
        {
          heading: 'Language requirements',
          body: [
            'The language of instruction in the IB Programme is English. Students whose first language is not English are expected to demonstrate grade-level mastery of the English language.',
            'Any Lebanese student currently enrolled in the Lebanese Program (with or without a foreign passport) can switch to the IB Program after acquiring the Lebanese Brevet Official Certificate.',
          ],
        },
        {
          heading: 'Pre-IB (Y9 & Y10)',
          body: [
            'Pre-IB students must have completed Year 8 and demonstrate a positive attitude and a willingness to work consistently and effectively.',
            'If the entrance requirements for Year 11 cannot be met, applicants can enrol in Pre-IB courses during the summer that precedes the academic year.',
          ],
        },
      ],
    },
    applyEyebrow: 'Apply',
    applyTitle: 'Choose your application language.',
    appEn: { title: 'English Application', body: 'For families applying in English.', href: 'application/en' },
    appFr: { title: 'Demande Française', body: 'Pour les familles candidatant en français.', href: 'application/fr' },
    appAr: { title: 'طلب بالعربية', body: 'للعائلات التي تتقدّم بالطلب باللغة العربية.', href: 'application/ar' },
    faqEyebrow: 'FAQ',
    faqTitle: 'Common questions from families.',
    faqs: [
      { q: 'When can my child join Cadmous?', a: 'Admissions run on a rolling basis. The main intake is in September, with mid-year placements considered case by case.' },
      { q: 'Is there an entrance examination?', a: 'Yes — placement tests in language, mathematics, and (from Year 7) science. Tests are scheduled after the records review.' },
      { q: 'What languages will my child be taught in?', a: 'All three — English, French, and Arabic — with the balance shifting by grade and track. The IB Programme is taught in English.' },
      { q: 'Can my child switch from the Lebanese to the IB Programme?', a: 'Yes — after acquiring the Lebanese Brevet Official Certificate.' },
    ],
  },
  fr: {
    title: 'Admissions',
    bcAdmissions: 'Admissions',
    bcThis: 'Conditions',
    lede: "Cadmous College offre un enseignement enrichi à travers le programme national libanais et un cursus international, pour permettre aux jeunes esprits de penser avec créativité et de dépasser les attentes.",
    processEyebrow: 'Le processus',
    processTitle: "Quatre étapes vers l'admission.",
    stepLabel: 'Étape',
    steps: [
      { title: 'Demande', body: "Soumettez une candidature ou rendez-vous au bureau de l'école." },
      { title: 'Examen', body: 'Nous évaluons le dossier scolaire et les documents.' },
      { title: 'Entretien & évaluation', body: 'Un rendez-vous avec la famille et des tests adaptés à l\'âge.' },
      { title: 'Décision', body: "Vous recevez la décision d'admission et le dossier d'inscription." },
    ],
    programsEyebrow: 'Par programme',
    programsTitle: "Conditions d'admission par cycle.",
    kg: {
      eyebrow: 'Maternelle',
      title: 'Maternelle (KG1–KG3).',
      intro: "L'admission est basée sur des évaluations pour déterminer la maturité scolaire. L'école accueille les enfants qui ont atteint l'âge requis. Les élèves sont évalués lors d'un entretien oral pendant lequel l'enseignante observe la tenue du crayon et la reconnaissance des couleurs et des formes. Les enfants doivent être pleinement propres avant d'entrer à l'école.",
      subsections: [
        {
          heading: "Le psychologue scolaire",
          body: [
            "Le psychologue est un membre clé de l'équipe scolaire : il propose un accompagnement éducatif, comportemental et émotionnel aux élèves pour garantir un environnement d'apprentissage favorable à la croissance académique.",
            "L'intervention précoce est essentielle pour les élèves rencontrant des difficultés. Les techniques utilisées incluent l'art-thérapie, les jeux et les exercices de méditation. Le psychologue coordonne avec les enseignants et les parents pour fournir des recommandations adaptées.",
          ],
        },
      ],
    },
    lebanese: {
      eyebrow: 'Programme libanais',
      title: 'Primaire et secondaire (programme libanais).',
      intro: "Cadmous College est une communauté d'apprentissage fondée sur le respect, la responsabilité et l'honnêteté. Nous accueillons uniquement les élèves dont le dossier témoigne d'un engagement clair envers ces principes.",
      subsections: [
        {
          heading: "A. L'entretien d'admission",
          body: [
            "Les entretiens sont programmés avec la famille et le chef d'établissement et/ou le directeur de cycle, selon le niveau. Ils ont généralement lieu en personne.",
            "Les centres d'intérêt et les questions de chaque élève comptent : nous encourageons les candidats à préparer une liste de questions pour aborder ce qui leur tient à cœur.",
          ],
        },
        {
          heading: 'B. Évaluation en anglais ou en français',
          body: [
            "Tous les candidats des classes 1 à 12 passent un examen d'entrée en anglais ou en français, selon la section visée. Une note minimale est requise en fonction du niveau demandé.",
            "Cadmous College offre un programme de soutien en anglais pour les élèves des classes 1 à 8 qui en ont besoin.",
          ],
        },
        {
          heading: 'C. Autres évaluations',
          body: [
            "Les élèves passent aussi des tests de placement en mathématiques et en arabe. Pour les non-arabophones, un test spécifique est proposé. Les candidats aux classes 7 à 12 passent en plus un examen de matières scientifiques.",
            "L'acceptation repose sur les résultats aux tests d'entrée, le dossier scolaire et l'entretien personnel.",
          ],
        },
      ],
    },
    international: {
      eyebrow: 'Programmes internationaux',
      title: 'IB Diploma et Pré-IB.',
      intro: "Cadmous accueille des élèves locaux et internationaux. Nous mettons en œuvre le programme international depuis septembre 2016 et nous sommes une école IB autorisée. Le programme IB est ouvert à tous les élèves, indépendamment de leur parcours antérieur, sous réserve de répondre aux exigences du ministère de l'Éducation.",
      subsections: [
        {
          heading: 'Exigences linguistiques',
          body: [
            "La langue d'enseignement du programme IB est l'anglais. Les élèves dont l'anglais n'est pas la première langue doivent démontrer une maîtrise correspondant à leur niveau scolaire.",
            "Tout élève libanais inscrit au programme libanais (avec ou sans passeport étranger) peut basculer vers le programme IB après l'obtention du Brevet officiel libanais.",
          ],
        },
        {
          heading: 'Pré-IB (Y9 & Y10)',
          body: [
            "Les élèves du Pré-IB doivent avoir achevé la huitième année et faire preuve d'une attitude positive et d'un travail régulier et efficace.",
            "Si les conditions d'entrée en Y11 ne sont pas remplies, les candidats peuvent suivre des cours Pré-IB durant l'été précédant l'année scolaire.",
          ],
        },
      ],
    },
    applyEyebrow: 'Postuler',
    applyTitle: 'Choisissez la langue de votre demande.',
    appEn: { title: 'English Application', body: 'For families applying in English.', href: 'application/en' },
    appFr: { title: 'Demande Française', body: 'Pour les familles candidatant en français.', href: 'application/fr' },
    appAr: { title: 'طلب بالعربية', body: 'Pour les familles candidatant en arabe.', href: 'application/ar' },
    faqEyebrow: 'FAQ',
    faqTitle: 'Questions fréquentes des familles.',
    faqs: [
      { q: 'Quand mon enfant peut-il rejoindre Cadmous ?', a: 'Les admissions sont continues. La rentrée principale est en septembre ; les placements en cours d\'année sont étudiés au cas par cas.' },
      { q: "Existe-t-il un examen d'entrée ?", a: "Oui — des tests adaptés en langues, en mathématiques et (à partir de la 7e) en sciences, après l'examen du dossier." },
      { q: "Dans quelles langues sera enseigné mon enfant ?", a: 'Les trois — anglais, français et arabe — avec un équilibre variant selon le niveau et la filière. Le programme IB est enseigné en anglais.' },
      { q: 'Peut-on passer du programme libanais au programme IB ?', a: 'Oui — après obtention du Brevet officiel libanais.' },
    ],
  },
  ar: {
    title: 'القبول',
    bcAdmissions: 'القبول',
    bcThis: 'المتطلّبات',
    lede: 'تُقدّم مدرسة قدموس تعليمًا غنيًّا عبر المنهج الوطنيّ اللبنانيّ والمناهج الدوليّة، يُمكّن العقول الشابّة من التفكير الإبداعيّ وتجاوز التوقّعات.',
    processEyebrow: 'الإجراءات',
    processTitle: 'أربع خطوات نحو القبول.',
    stepLabel: 'الخطوة',
    steps: [
      { title: 'الاستفسار', body: 'قدّم طلبًا أو زر مكتب المدرسة.' },
      { title: 'المراجعة', body: 'نُقيّم السجلّات الأكاديميّة والوثائق الداعمة.' },
      { title: 'المقابلة والتقييم', body: 'لقاء مع العائلة، واختبارات تنسيب مناسبة للعمر.' },
      { title: 'القرار', body: 'تستلم قرار القبول وملفّ التسجيل.' },
    ],
    programsEyebrow: 'حسب البرنامج',
    programsTitle: 'متطلّبات القبول في كلّ مرحلة.',
    kg: {
      eyebrow: 'الروضات',
      title: 'الروضات (KG1–KG3).',
      intro:
        'يستند القبول إلى تقييم جهوزيّة الطفل للمدرسة. تقبل المدرسة الطلّاب الذين بلغوا السنّ المطلوبة. يجري التقييم عبر مقابلة شفهيّة تُلاحظ فيها المعلّمة طريقة الإمساك بالقلم ومعرفة الألوان والأشكال. ويُشترط أن يكون الطفل قد تخلّى عن الحفاضات تمامًا قبل البدء بالمدرسة.',
      subsections: [
        {
          heading: 'الأخصّائيّة النفسيّة للمدرسة',
          body: [
            'تُعدّ الأخصّائيّة النفسيّة من أهمّ أعضاء الفريق المدرسيّ، إذ تُقدّم خدمات تربويّة وسلوكيّة وعاطفيّة مباشرة للطلّاب لضمان بيئة تعلّم داعمة تُعزّز النموّ الأكاديميّ.',
            'التدخّل المبكر بالغ الأهميّة للطلّاب الذين يواجهون تحدّيات. ومن الأساليب المعتمَدة: العلاج بالفنّ، وجلسات اللعب، وتمارين التأمّل. وتُنسّق الأخصّائيّة مع المعلّمين والأهالي لتقديم التوصيات المناسبة.',
          ],
        },
      ],
    },
    lebanese: {
      eyebrow: 'البرنامج اللبنانيّ',
      title: 'الابتدائيّ والمتوسّط والثانويّ (البرنامج اللبنانيّ).',
      intro:
        'مدرسة قدموس مجتمع تعلّمي يربطه الاحترام والمسؤوليّة والصدق. ونحن نقبل الطلّاب الذين تُظهر سجلّاتهم التزامًا واضحًا بهذه المبادئ.',
      subsections: [
        {
          heading: 'أ. مقابلة القبول',
          body: [
            'تُنظَّم المقابلات مع العائلة ومدير المدرسة و/أو مدير القسم المعنيّ، بحسب الصفّ المطلوب. وتجري عادةً وجاهيًّا.',
            'تهمّنا اهتمامات كلّ طالب وأسئلته. وندعو المتقدّمين إلى إعداد قائمة أسئلة لنناقش ما يُهمّهم أكثر.',
          ],
        },
        {
          heading: 'ب. تقييم اللغة الإنكليزيّة أو الفرنسيّة',
          body: [
            'يُتقدَّم جميع طلّاب الصفوف 1-12 إلى امتحان دخول بالإنكليزيّة أو الفرنسيّة بحسب القسم المطلوب. ويجب الحصول على الحدّ الأدنى من العلامة وفقًا للصفّ.',
            'وتقدّم المدرسة برنامجًا خاصًّا في الصفوف 1-8 للطلّاب الذين يحتاجون إلى دعم في اللغة الإنكليزيّة.',
          ],
        },
        {
          heading: 'ج. تقييمات أخرى',
          body: [
            'يخضع طلّاب الصفوف 1-12 لاختبارات تنسيب في الرياضيات واللغة العربيّة. ويُتاح اختبار خاصّ لغير الناطقين بالعربيّة. ويخضع طلّاب الصفوف 7-12 لامتحان كفاءة في العلوم.',
            'ويستند القبول إلى نتائج اختبارات الدخول والسجلّات الأكاديميّة والمقابلة الشخصيّة معًا.',
          ],
        },
      ],
    },
    international: {
      eyebrow: 'البرامج الدوليّة',
      title: 'البكالوريا الدوليّة وما قبل الـ IB.',
      intro:
        'تقبل مدرسة قدموس طلّابًا دوليّين ومحلّيّين. وتُطبّق المنهج الدوليّ منذ أيلول 2016 وهي مدرسة معتمَدة لبرنامج الدبلوم الدوليّ. وبرنامج الـ IB مفتوح لجميع الطلّاب أيًّا كانت خلفيّتهم التعليميّة، شرط استيفائهم متطلّبات وزارة التربية.',
      subsections: [
        {
          heading: 'متطلّبات اللغة',
          body: [
            'لغة التدريس في برنامج الـ IB هي الإنكليزيّة. ويُتوقّع من الطلّاب الذين ليست الإنكليزيّة لغتهم الأمّ إظهار إتقان مناسب للصفّ.',
            'يمكن لأيّ طالب لبنانيّ مسجَّل حاليًّا في البرنامج اللبنانيّ (بجواز سفر أجنبيّ أو من دونه) الانتقال إلى برنامج الـ IB بعد الحصول على شهادة البريفيه الرسميّة اللبنانيّة.',
          ],
        },
        {
          heading: 'ما قبل الـ IB (Y9 و Y10)',
          body: [
            'على طلّاب ما قبل الـ IB أن يكونوا قد أنهوا السنة الثامنة وأن يُظهروا موقفًا إيجابيًّا واستعدادًا للعمل المنتظم والفعّال.',
            'إن لم تتحقّق متطلّبات الدخول إلى الصفّ الحادي عشر، يُمكن للمتقدّمين الالتحاق بدورات ما قبل الـ IB خلال صيف السنة الدراسيّة.',
          ],
        },
      ],
    },
    applyEyebrow: 'قدّم بطلبك',
    applyTitle: 'اختر لغة الطلب.',
    appEn: { title: 'English Application', body: 'للعائلات التي تتقدّم بالإنكليزيّة.', href: 'application/en' },
    appFr: { title: 'Demande Française', body: 'للعائلات التي تتقدّم بالفرنسيّة.', href: 'application/fr' },
    appAr: { title: 'طلب بالعربيّة', body: 'للعائلات التي تتقدّم بالعربيّة.', href: 'application/ar' },
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'أكثر الأسئلة تكرارًا من العائلات.',
    faqs: [
      { q: 'متى يستطيع ابني الالتحاق بقدموس؟', a: 'القبول مفتوح طوال السنة. الالتحاق الرئيسيّ في أيلول، وتُدرَس حالات منتصف السنة كلٌّ على حدة.' },
      { q: 'هل هناك امتحان قبول؟', a: 'نعم — اختبارات تنسيب في اللغة والرياضيات، وفي العلوم اعتبارًا من الصفّ السابع، تُحدَّد بعد مراجعة الوثائق.' },
      { q: 'بأيّ اللغات سيُدرَّس ابني؟', a: 'الثلاث — العربيّة والإنكليزيّة والفرنسيّة — مع اختلاف التوازن بحسب الصفّ والمسار. ويُدرَّس برنامج الـ IB بالإنكليزيّة.' },
      { q: 'هل يمكن لابني الانتقال من البرنامج اللبنانيّ إلى الـ IB؟', a: 'نعم — بعد الحصول على شهادة البريفيه الرسميّة اللبنانيّة.' },
    ],
  },
}

function ProgramSection({ block }: { block: ProgramBlock }) {
  return (
    <div className="mb-12 last:mb-0">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
        {block.eyebrow}
      </div>
      <h3 className="mb-5 text-[26px] font-bold leading-[1.2] text-white">{block.title}</h3>
      <p className="mb-5 max-w-[78ch] text-[15.5px] leading-[1.75] text-white/70">{block.intro}</p>
      {block.subsections?.map((s, i) => (
        <div key={i} className="mb-6 last:mb-0">
          <h4 className="mb-3 text-[18px] font-semibold text-white">{s.heading}</h4>
          {s.body.map((p, j) => (
            <p key={j} className="mb-3 max-w-[78ch] text-[15px] leading-[1.7] text-white/70">
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
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
        breadcrumb={[{ label: t.bcAdmissions, href: '/requirements' }, { label: t.bcThis }]}
        lede={t.lede}
      />
      <Section>
        <SectionHead eyebrow={t.processEyebrow} title={t.processTitle} />
        <ProcessSteps items={t.steps} stepLabel={t.stepLabel} />
      </Section>
      <Section alt>
        <SectionHead eyebrow={t.programsEyebrow} title={t.programsTitle} />
        <ProgramSection block={t.kg} />
        <ProgramSection block={t.lebanese} />
        <ProgramSection block={t.international} />
      </Section>
      <Section>
        <SectionHead eyebrow={t.applyEyebrow} title={t.applyTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {[t.appEn, t.appFr, t.appAr].map((a, i) => (
            <Link key={i} href={`/${a.href}`} className="group">
              <Card className="h-full">
                <h3 className="mb-2 text-[20px] font-bold leading-[1.25] text-white">{a.title}</h3>
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
