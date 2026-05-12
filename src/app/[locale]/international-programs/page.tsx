import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import {
  Card,
  CTABanner,
  Eyebrow,
  PageHeader,
  Section,
  SectionHead,
} from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

type Bullet = { items: string[] }
type Block = string | Bullet | { quote: string }
type Locale = 'en' | 'fr' | 'ar'

type Translation = {
  title: string
  bcDivisions: string
  pageLede: string
  head: { role: string }
  ibDiploma: { eyebrow: string; title: string; body: Block[] }
  intlProgram: { eyebrow: string; title: string; body: Block[] }
  sat: { eyebrow: string; title: string; body: Block[] }
  credentials: { authorization: string; equivalency: string; logo: string }
  cta: { title: string; body: string; primary: string; secondary: string }
}

const HEAD_NAME = 'Mr. Ossama Salem'

const T: Record<Locale, Translation> = {
  en: {
    title: 'International Programs',
    bcDivisions: 'Divisions',
    pageLede: 'IB Diploma Programme · International Programme (Y9–Y10) · SAT preparation.',
    head: { role: 'Head of International Programs' },
    ibDiploma: {
      eyebrow: 'IB Diploma',
      title: 'IB Diploma Programme (Y11–Y12).',
      body: [
        'At Cadmous College, we are an accredited IB World School and have extensive experience in delivering the International Baccalaureate Diploma Programme, a qualification recognized and respected throughout the world.',
        'Our DP students (ages 16-19) are taught by exceptional teachers to thrive in a rapidly changing world. They excel academically and personally and are accepted into the world\'s top universities.',
        'IB learners are encouraged to think critically and solve complex problems to drive their learning.',
        {
          quote:
            'The International Baccalaureate (IB) aims to develop inquiring, knowledgeable and caring young people who help to create a better and more peaceful world through intercultural understanding and respect. The IB has a hard-earned reputation for high standards of teaching, pedagogical leadership and student achievement, working with schools, governments and international organizations to develop challenging programmes of international education and rigorous assessment.',
        },
        'The IB Diploma Programme is a rigorous academic curriculum that is an excellent preparation for university entrance around the world. Students are required to study six subjects: one science, one mathematics, one humanity, and two languages, plus an additional language or science or humanities subject. They also explore the nature of knowledge through the programme\'s unique "theory of knowledge" course. As part of the course, students also engage in CAS activities (Creativity, Activity, and Service) to nurture a complete international educational experience.',
        'Research shows that IB graduates, compared to other academic qualifications at age 16–19, generally benefit from:',
        {
          items: [
            'A better choice of university',
            'A wider breadth of subject knowledge than other pre-university programs',
            'Advanced critical thinking and independent learning skills',
            'A healthy and globally-minded worldview',
          ],
        },
        'Any Lebanese student currently enrolled in the Lebanese Program (with or without a foreign passport) can switch to the IB Program after acquiring the Lebanese Brevet Official Certificate.',
      ],
    },
    intlProgram: {
      eyebrow: 'International Programme',
      title: 'International Programme (Y9–Y10).',
      body: [
        'This program offers an opportunity for English speakers to join the school. Based on content and methods similar to the English Cambridge International Education Program and qualifications. The IP is tailored for local and international families who seek a holistic approach to education for their children: intellectual challenges and rigorous academics, as well as mindfulness and a global perspective. The IP feeds into the two-year IB Diploma Programme in Years 11 and 12.',
        'The IP is based on the Cambridge curriculum but with an IB focus: conceptual, inquiry-based learning, local/global context, and a strong focus on critical thinking.',
        'IB World Schools share a common philosophy — a commitment to high-quality, challenging, and international education — that we believe is important to shaping well-rounded students.',
      ],
    },
    sat: {
      eyebrow: 'SAT',
      title: 'SAT preparation centre.',
      body: [
        'Cadmous College offers the most recent and updated tutoring methods for SAT test takers. Courses are available for students that attend Cadmous and other schools.',
        'Cadmous College is proud to be a center for the SAT exams. Students can register for the SAT exam by contacting the school.',
      ],
    },
    credentials: {
      authorization: 'IB Diploma authorization',
      equivalency: 'IB equivalency',
      logo: 'IB Diploma Programme',
    },
    cta: {
      title: 'Apply to the IB Diploma Programme.',
      body: 'Reach out and we\'ll guide you through the next steps.',
      primary: 'Admissions',
      secondary: 'Contact us',
    },
  },
  fr: {
    title: 'Programmes internationaux',
    bcDivisions: 'Divisions',
    pageLede: 'IB Diploma · International Programme (Y9–Y10) · Préparation au SAT.',
    head: { role: 'Responsable des programmes internationaux' },
    ibDiploma: {
      eyebrow: 'IB Diploma',
      title: 'IB Diploma Programme (Y11–Y12).',
      body: [
        "À Cadmous College, nous sommes une école IB World accréditée, avec une longue expérience dans la mise en œuvre du programme IB Diploma, une qualification reconnue et respectée dans le monde entier.",
        "Nos élèves DP (16-19 ans) sont accompagnés par des enseignants d'exception pour réussir dans un monde en mutation rapide. Ils excellent sur les plans académique et personnel, et intègrent les meilleures universités du monde.",
        "Les apprenants IB sont encouragés à penser de manière critique et à résoudre des problèmes complexes pour orienter leur apprentissage.",
        {
          quote:
            "L'International Baccalaureate vise à former des jeunes curieux, instruits et attentionnés, qui contribuent à bâtir un monde meilleur et plus pacifique par la compréhension interculturelle et le respect. L'IB jouit d'une réputation solide en matière d'enseignement, de leadership pédagogique et de réussite des élèves, en collaboration avec les écoles, les gouvernements et les organisations internationales.",
        },
        "Le programme IB Diploma est un cursus académique rigoureux, excellent préparation à l'entrée à l'université. Les élèves étudient six matières : une science, une mathématique, une humanité et deux langues, plus une matière supplémentaire (langue, science ou humanité). Ils explorent aussi la nature du savoir via le cours unique « Theory of Knowledge », et s'engagent dans les activités CAS (Création, Activité, Service) pour une expérience éducative internationale complète.",
        "Les recherches montrent que, par rapport aux autres qualifications académiques à 16-19 ans, les diplômés IB bénéficient en général :",
        {
          items: [
            "D'un meilleur choix d'universités",
            "D'une étendue plus large de connaissances qu'avec d'autres programmes pré-universitaires",
            "De compétences avancées en pensée critique et apprentissage autonome",
            "D'une vision saine et globale du monde",
          ],
        },
        "Tout élève libanais actuellement inscrit au programme libanais (avec ou sans passeport étranger) peut basculer vers le programme IB après l'obtention du Brevet officiel libanais.",
      ],
    },
    intlProgram: {
      eyebrow: 'International Programme',
      title: 'International Programme (Y9–Y10).',
      body: [
        "Ce programme offre aux anglophones la possibilité de rejoindre l'école. Il s'appuie sur des contenus et méthodes proches du programme anglais Cambridge International Education. L'IP est conçu pour des familles locales et internationales qui recherchent une approche holistique : défis intellectuels et exigences académiques, ainsi qu'attention et perspective globale. L'IP conduit naturellement au programme IB Diploma sur deux ans en Y11 et Y12.",
        "L'IP s'appuie sur le programme Cambridge avec une orientation IB : apprentissage conceptuel et basé sur l'enquête, contextes local/global, et un accent fort sur la pensée critique.",
        "Les écoles IB World partagent une philosophie commune — un engagement pour une éducation de qualité, exigeante et internationale — qui contribue à former des élèves bien équilibrés.",
      ],
    },
    sat: {
      eyebrow: 'SAT',
      title: 'Centre de préparation au SAT.',
      body: [
        "Cadmous College propose les méthodes de tutorat les plus récentes pour les candidats au SAT. Les cours sont ouverts aux élèves de Cadmous et d'autres écoles.",
        "Cadmous College est fier d'être un centre d'examen SAT. Les élèves peuvent s'inscrire à l'examen en contactant l'école.",
      ],
    },
    credentials: {
      authorization: 'Autorisation IB Diploma',
      equivalency: 'Équivalence IB',
      logo: 'IB Diploma Programme',
    },
    cta: {
      title: "Postuler au programme IB Diploma.",
      body: 'Contactez-nous et nous vous guiderons à chaque étape.',
      primary: 'Admissions',
      secondary: 'Nous contacter',
    },
  },
  ar: {
    title: 'البرامج الدوليّة',
    bcDivisions: 'الأقسام',
    pageLede: 'برنامج البكالوريا الدوليّة · البرنامج الدوليّ (السنتان 9 و10) · إعداد لاختبار الـ SAT.',
    head: { role: 'رئيس البرامج الدوليّة' },
    ibDiploma: {
      eyebrow: 'البكالوريا الدوليّة',
      title: 'برنامج الدبلوم الدوليّ (السنتان 11 و12).',
      body: [
        'مدرسة قدموس مدرسة IB World معتمَدة ولها خبرة واسعة في تقديم برنامج البكالوريا الدوليّة (IB Diploma)، وهي شهادة معترَف بها ومحترَمة في العالم.',
        'يتلقّى طلابنا في الدبلوم (16-19 سنة) تعليمًا على يد معلّمين متميّزين، يُهيّئهم للتفوّق في عالم سريع التغيّر. يتفوّقون أكاديميًّا وشخصيًّا ويُقبَلون في كبرى جامعات العالم.',
        'يُشجَّع متعلّمو الـ IB على التفكير الناقد وحلّ المسائل المعقّدة لتوجيه تعلّمهم.',
        {
          quote:
            'تهدف منظّمة البكالوريا الدوليّة إلى تنشئة شباب فضوليّين عارفين مهتمّين بالآخر، يُسهمون في بناء عالم أفضل وأكثر سلمًا من خلال التفاهم بين الثقافات والاحترام. وللـ IB سمعة راسخة في معايير التدريس والقيادة التربويّة والإنجاز الطلّابيّ، بالعمل مع المدارس والحكومات والمنظّمات الدوليّة.',
        },
        'برنامج الدبلوم منهج صارم يُعدّ الطلاب لدخول الجامعات حول العالم. يدرس الطلاب ستّ موادّ: علمًا واحدًا، ورياضيات، ومادّة في العلوم الإنسانيّة، ولغتين، إضافةً إلى لغة أو علم أو علم إنسانيّ إضافيّ. كما يستكشفون طبيعة المعرفة عبر مساق «نظريّة المعرفة» الفريد، ويُشاركون في أنشطة CAS (الإبداع والنشاط والخدمة) لتجربة تربويّة دوليّة شاملة.',
        'تُظهر الأبحاث أنّ خرّيجي الـ IB، مقارنةً بالشهادات الأخرى في سنّ 16-19، يستفيدون عمومًا من:',
        {
          items: [
            'خيار جامعيّ أوسع',
            'سعة معرفيّة أكبر مقارنةً بالبرامج الجامعيّة التحضيريّة الأخرى',
            'مهارات متقدّمة في التفكير الناقد والتعلّم المستقلّ',
            'رؤية كونيّة سليمة ومنفتحة',
          ],
        },
        'يمكن لأيّ طالب لبنانيّ مسجَّل حاليًّا في البرنامج اللبنانيّ (سواء أكان حاملًا جواز سفر أجنبيًّا أم لا) أن ينتقل إلى برنامج الـ IB بعد الحصول على شهادة البريفيه الرسميّة اللبنانيّة.',
      ],
    },
    intlProgram: {
      eyebrow: 'البرنامج الدوليّ',
      title: 'البرنامج الدوليّ (السنتان 9 و10).',
      body: [
        'يُتيح هذا البرنامج للناطقين بالإنكليزيّة الانضمام إلى المدرسة، استنادًا إلى محتوى ومنهجيّات قريبة من برنامج Cambridge International Education الإنكليزيّ. وهو مُصمَّم للعائلات المحلّيّة والدوليّة الباحثة عن مقاربة شاملة لتعليم أبنائها: تحدٍّ فكريّ وأكاديميّ صارم، إضافةً إلى الوعي والمنظور العالميّ. ويُمهّد لبرنامج الـ IB Diploma على سنتين في الـ Y11 و Y12.',
        'يستند البرنامج الدوليّ إلى منهج Cambridge، مع توجّه قائم على فلسفة الـ IB: تعلّم مفاهيميّ قائم على الاستقصاء، وسياق محلّي/عالميّ، وتركيز قويّ على التفكير الناقد.',
        'تتشارك مدارس IB World فلسفةً واحدة — التزامًا بتعليم عالميّ النوعيّة، صعب ومتطلِّب — نراها أساسيّة لتشكيل طلاب متوازنين.',
      ],
    },
    sat: {
      eyebrow: 'الـ SAT',
      title: 'مركز إعداد للـ SAT.',
      body: [
        'تُقدّم مدرسة قدموس أحدث الأساليب لتدريس مادّة الـ SAT. الدورات متاحة لطلابها ولطلاب المدارس الأخرى.',
        'تفخر مدرسة قدموس بكونها مركزًا لإجراء امتحانات الـ SAT. يُمكن للطلاب التسجيل عبر التواصل مع المدرسة.',
      ],
    },
    credentials: {
      authorization: 'اعتماد الدبلوم الدوليّ',
      equivalency: 'معادلة الـ IB',
      logo: 'برنامج الدبلوم الدوليّ',
    },
    cta: {
      title: 'قدّم إلى برنامج الـ IB Diploma.',
      body: 'تواصل معنا وسنرشدك للخطوات التالية.',
      primary: 'القبول',
      secondary: 'تواصل معنا',
    },
  },
}

function BodyBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[16px] leading-[1.75] text-white/70">
      {blocks.map((b, i) => {
        if (typeof b === 'string') {
          return (
            <p key={i} className="mb-5">
              {b}
            </p>
          )
        }
        if ('quote' in b) {
          return (
            <blockquote
              key={i}
              className="my-6 border-s-2 border-crimson-400 ps-5 text-[15.5px] italic text-white/80"
            >
              {b.quote}
            </blockquote>
          )
        }
        return (
          <ul key={i} className="mb-5 ms-6 list-disc">
            {b.items.map((item, j) => (
              <li key={j} className="mb-1.5">
                {item}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[(locale as Locale) in T ? (locale as Locale) : 'en']
  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcDivisions, href: '/kindergarten' }, { label: t.title }]}
        lede={t.pageLede}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <Eyebrow>{t.ibDiploma.eyebrow}</Eyebrow>
            <h2 className="mb-6 max-w-[22ch] text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {t.ibDiploma.title}
            </h2>
            <BodyBlocks blocks={t.ibDiploma.body} />
          </div>
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[6px] border border-white/10 bg-navy-800">
              <div className="aspect-square">
                <img
                  src="/images/seed/ossama.jpeg"
                  alt={HEAD_NAME}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
                  {t.head.role}
                </div>
                <div className="mt-1.5 text-[18px] font-bold leading-tight text-white">
                  {HEAD_NAME}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="Credentials"
          title="Recognised internationally."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="/images/seed/authorization.pdf"
            target="_blank"
            rel="noopener"
            className="block"
          >
            <Card className="h-full transition hover:border-white/20">
              <div className="mb-3 flex h-32 items-center justify-center">
                <img
                  src="/images/seed/authorization_small.png"
                  alt={t.credentials.authorization}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-white">
                {t.credentials.authorization}
              </h3>
            </Card>
          </a>
          <a
            href="/images/seed/equivalency.png"
            target="_blank"
            rel="noopener"
            className="block"
          >
            <Card className="h-full transition hover:border-white/20">
              <div className="mb-3 flex h-32 items-center justify-center">
                <img
                  src="/images/seed/equivalency_small.png"
                  alt={t.credentials.equivalency}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-white">
                {t.credentials.equivalency}
              </h3>
            </Card>
          </a>
          <Card className="h-full">
            <div className="mb-3 flex h-32 items-center justify-center">
              <img
                src="/images/seed/dp-programme-logo-en-small.png"
                alt={t.credentials.logo}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-[15px] font-semibold text-white">
              {t.credentials.logo}
            </h3>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={t.intlProgram.eyebrow} title={t.intlProgram.title} />
        <div className="max-w-[72ch]">
          <BodyBlocks blocks={t.intlProgram.body} />
        </div>
      </Section>

      <Section alt>
        <SectionHead eyebrow={t.sat.eyebrow} title={t.sat.title} />
        <div className="max-w-[72ch]">
          <BodyBlocks blocks={t.sat.body} />
        </div>
      </Section>

      <CTABanner
        title={t.cta.title}
        body={t.cta.body}
        primary={{ href: '/requirements', label: t.cta.primary }}
        secondary={{ href: '/contact', label: t.cta.secondary }}
      />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[(locale as Locale) in T ? (locale as Locale) : 'en']
  return { title: `${t.title} | Cadmous College` }
}
