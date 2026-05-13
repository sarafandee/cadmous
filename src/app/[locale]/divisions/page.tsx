import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { PageHeader, Section } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

type DivisionEntry = {
  title: string
  range: string
  body: string
  href: string
}

const T: Record<
  string,
  {
    title: string
    bcThis: string
    lede: string
    learnMore: string
    divisions: DivisionEntry[]
  }
> = {
  en: {
    title: 'Our Divisions',
    bcThis: 'Divisions',
    lede: 'From age three through Grade 12, six divisions guide every student — from the first day of kindergarten to university.',
    learnMore: 'Learn more →',
    divisions: [
      {
        title: 'Kindergarten',
        range: 'Ages 3 – 6 · KG1 – Year 1',
        body: 'The first steps. A nurturing environment built on play, curiosity, and creativity, where young children discover school as a safe and joyful world.',
        href: '/kindergarten',
      },
      {
        title: 'Elementary',
        range: 'Grades 2 – 5',
        body: 'The foundational years. Literacy, numeracy, and the love of learning take root in three languages, supported by specialised teachers and modern methods.',
        href: '/elementary',
      },
      {
        title: 'Intermediate',
        range: 'Grades 6 – 9 · Brevet',
        body: 'Through the Brevet, students deepen academic inquiry and shape their identity as learners, with a curriculum that prepares them for secondary.',
        href: '/intermediate',
      },
      {
        title: 'Secondary Lebanese',
        range: 'Grades 10 – 12 · Lebanese Bac',
        body: 'The Lebanese Baccalaureate offered in three streams: General Sciences, Life Sciences, and Sociology & Economics. Students may pursue the IB Diploma in parallel.',
        href: '/secondary-lebanese',
      },
      {
        title: 'Integrative Program',
        range: 'All ages · Inclusive learning',
        body: 'An inclusive track for students who benefit from individualised support, woven into mainstream school life rather than separated from it.',
        href: '/integrative',
      },
      {
        title: 'International Programmes',
        range: 'Y9 – Y12',
        body: 'The IB Diploma Programme (Y11 – Y12), the International Programme (Y9 – Y10), and SAT preparation — recognised internationally and university-ready.',
        href: '/international-programs',
      },
    ],
  },
  fr: {
    title: 'Nos divisions',
    bcThis: 'Divisions',
    lede: "De 3 ans jusqu'à la classe de 12e, six divisions accompagnent chaque élève — du premier jour de maternelle à l'université.",
    learnMore: 'En savoir plus →',
    divisions: [
      {
        title: 'Maternelle',
        range: '3 – 6 ans · KG1 – 1re année',
        body: "Les premiers pas. Un cadre bienveillant fondé sur le jeu, la curiosité et la créativité, où les jeunes enfants découvrent l'école comme un monde sûr et joyeux.",
        href: '/kindergarten',
      },
      {
        title: 'Primaire',
        range: '2e – 5e année',
        body: "Les années fondatrices. Lecture, calcul et goût d'apprendre s'enracinent en trois langues, avec des enseignants spécialisés et des méthodes modernes.",
        href: '/elementary',
      },
      {
        title: 'Collège',
        range: '6e – 9e · Brevet',
        body: "Vers le Brevet, les élèves approfondissent leur questionnement académique et construisent leur identité d'apprenants, en préparation du secondaire.",
        href: '/intermediate',
      },
      {
        title: 'Secondaire libanais',
        range: '10e – 12e · Bac libanais',
        body: 'Le Baccalauréat libanais proposé en trois sections : Sciences générales, Sciences de la vie et Sociologie & Économie. Le Diplôme IB peut être suivi en parallèle.',
        href: '/secondary-lebanese',
      },
      {
        title: 'Programme intégratif',
        range: 'Tous âges · Apprentissage inclusif',
        body: "Un parcours inclusif pour les élèves qui bénéficient d'un soutien personnalisé, intégré à la vie scolaire ordinaire plutôt que séparé d'elle.",
        href: '/integrative',
      },
      {
        title: 'Programmes internationaux',
        range: 'Y9 – Y12',
        body: "Le Diplôme IB (Y11 – Y12), le Programme international (Y9 – Y10) et la préparation au SAT — reconnu internationalement et prêt pour l'université.",
        href: '/international-programs',
      },
    ],
  },
  ar: {
    title: 'أقسامنا',
    bcThis: 'الأقسام',
    lede: 'من الثالثة من العمر حتى الصفّ الثاني عشر، ستّة أقسام تواكب كلّ طالب — من اليوم الأوّل في الروضة إلى الجامعة.',
    learnMore: 'اعرف المزيد ←',
    divisions: [
      {
        title: 'الروضة',
        range: 'الأعمار 3 – 6 · KG1 – الصفّ الأوّل',
        body: 'الخطوات الأولى. بيئة حاضنة قائمة على اللعب والفضول والإبداع، حيث يكتشف الأطفال الصغار المدرسة عالمًا آمنًا ومليئًا بالفرح.',
        href: '/kindergarten',
      },
      {
        title: 'الابتدائيّة',
        range: 'الصفوف 2 – 5',
        body: 'السنوات التأسيسيّة. القراءة والحساب وحبّ التعلّم تترسّخ بثلاث لغات، بدعم من معلّمين متخصّصين ومناهج حديثة.',
        href: '/elementary',
      },
      {
        title: 'المتوسّطة',
        range: 'الصفوف 6 – 9 · الشهادة المتوسّطة',
        body: 'وصولًا إلى الشهادة المتوسّطة، يعمّق الطلّاب البحث الأكاديميّ ويبنون هويّتهم كمتعلّمين، استعدادًا للمرحلة الثانويّة.',
        href: '/intermediate',
      },
      {
        title: 'الثانوي اللبناني',
        range: 'الصفوف 10 – 12 · البكالوريا اللبنانيّة',
        body: 'البكالوريا اللبنانيّة بثلاثة فروع: العلوم العامّة، علوم الحياة، الاجتماع والاقتصاد. ويمكن للطلّاب متابعة دبلوم البكالوريا الدوليّة بالتوازي.',
        href: '/secondary-lebanese',
      },
      {
        title: 'البرنامج التكاملي',
        range: 'كلّ الأعمار · تعلّم شامل',
        body: 'مسار شامل للطلّاب الذين يستفيدون من دعم فرديّ، ضمن الحياة المدرسيّة العامّة لا منفصلًا عنها.',
        href: '/integrative',
      },
      {
        title: 'البرامج الدوليّة',
        range: 'الصفوف 9 – 12',
        body: 'دبلوم البكالوريا الدوليّة (الصفّان 11 و12)، البرنامج الدوليّ (الصفّان 9 و10)، وتحضير SAT — معترف به دوليًّا ومهيّئ للجامعة.',
        href: '/international-programs',
      },
    ],
  },
}

export default async function DivisionsIndexPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en

  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.bcThis }]}
        lede={t.lede}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.divisions.map((d, i) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col rounded-[6px] border border-white/10 bg-navy-800 p-7 transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-crimson-400 bg-crimson-500/10 font-bold tracking-[-0.02em] text-crimson-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mb-2 text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
                {d.title}
              </h3>
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40">
                {d.range}
              </div>
              <p className="mb-5 flex-1 text-[14.5px] leading-[1.55] text-white/70">
                {d.body}
              </p>
              <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-crimson-400 transition group-hover:text-crimson-500">
                {t.learnMore}
              </div>
            </Link>
          ))}
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
