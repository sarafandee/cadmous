import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { PageHeader, Section } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

type Policy = {
  heading: string
  paragraphs: string[]
  bullets?: { intro?: string; items: string[]; outro?: string }
}

const T: Record<
  string,
  {
    title: string
    breadcrumb: string
    lede: string
    sections: Policy[]
  }
> = {
  en: {
    title: 'Policies',
    breadcrumb: 'About Us',
    lede: 'How we approach academic integrity at Cadmous College.',
    sections: [
      {
        heading: 'Academic Honesty Policy',
        paragraphs: [
          'Academic honesty is an essential aspect of teaching and learning in any environment. We at Cadmous College believe that academic honesty is the responsibility of all members of the school community including teachers, parents, and students. We inspirit our students to be honest and understand others.',
          "Dishonestly claiming authorship is plagiarism, which is a form of cheating. Plagiarism may be defined as: the practice of taking someone else's work or ideas and passing them off as one's own.",
        ],
        bullets: {
          intro: 'Cadmous College, therefore, accepts its students to:',
          items: [
            'Discuss an assignment with others for clarification.',
            'Discuss ideas and details for understanding.',
          ],
        },
      },
      {
        heading: 'Academic Dishonesty',
        paragraphs: [
          'Cadmous College considers a student to be academically dishonest if the student gains unfair help to complete a task.',
        ],
        bullets: {
          intro: 'Academic dishonesty can take many forms, including but not limited to:',
          items: ['Cheating', 'Plagiarism', 'Collusion', 'Falsification'],
        },
      },
      {
        heading: 'Education over enforcement',
        paragraphs: [
          'Most students know that deliberate cheating is wrong in any circumstance, but the act of receiving guidance, getting assistance, using quotations, downloading pages, or adapting material while working on major papers or projects is not a simple one, and for this reason, Cadmous College trains students in appropriate academic procedures. Teachers are responsible for monitoring academic integrity and informing the Coordinator in cases of inappropriate behavior.',
          "Academic honesty requires that all students and teachers respect the integrity of one another's work and recognize the importance of acknowledging and safeguarding intellectual property.",
        ],
      },
    ],
  },
  fr: {
    title: 'Politiques',
    breadcrumb: 'À propos',
    lede: "Notre approche de l'intégrité académique à Cadmous College.",
    sections: [
      {
        heading: "Politique d'honnêteté académique",
        paragraphs: [
          "L'honnêteté académique est un aspect essentiel de l'enseignement et de l'apprentissage dans tout contexte. À Cadmous College, nous estimons que l'honnêteté académique relève de la responsabilité de toute la communauté scolaire : enseignants, parents et élèves. Nous inspirons à nos élèves l'honnêteté et la compréhension d'autrui.",
          "S'attribuer faussement la paternité d'un travail constitue un plagiat, une forme de tricherie. Le plagiat peut être défini comme : la pratique consistant à reprendre le travail ou les idées d'autrui en les faisant passer pour les siennes.",
        ],
        bullets: {
          intro: 'Cadmous College accepte donc que ses élèves :',
          items: [
            'Discutent un devoir avec autrui pour clarification.',
            'Échangent des idées et des détails pour mieux comprendre.',
          ],
        },
      },
      {
        heading: 'Malhonnêteté académique',
        paragraphs: [
          "Cadmous College considère qu'un élève fait preuve de malhonnêteté académique s'il obtient une aide indue pour accomplir une tâche.",
        ],
        bullets: {
          intro: 'La malhonnêteté académique peut prendre plusieurs formes, notamment :',
          items: ['Triche', 'Plagiat', 'Collusion', 'Falsification'],
        },
      },
      {
        heading: 'Éducation plutôt que répression',
        paragraphs: [
          "La plupart des élèves savent que la tricherie délibérée est inacceptable, mais recevoir des conseils, de l'aide, utiliser des citations, télécharger des pages ou adapter du contenu pour des travaux majeurs n'est pas un acte anodin. C'est pourquoi Cadmous College forme ses élèves aux procédures académiques appropriées. Les enseignants sont responsables du suivi de l'intégrité académique et doivent informer le coordinateur en cas de comportement inapproprié.",
          "L'honnêteté académique exige que tous les élèves et enseignants respectent l'intégrité du travail des autres et reconnaissent l'importance de protéger la propriété intellectuelle.",
        ],
      },
    ],
  },
  ar: {
    title: 'السياسات',
    breadcrumb: 'من نحن',
    lede: 'نهجنا في النزاهة الأكاديمية في مدرسة قدموس.',
    sections: [
      {
        heading: 'سياسة الأمانة الأكاديمية',
        paragraphs: [
          'تشكّل الأمانة الأكاديمية ركيزةً أساسيّةً لأيّ بيئة تعليميّة. ونحن في مدرسة قدموس نؤمن بأنّ الأمانة الأكاديمية هي مسؤوليّة كلّ أفراد المجتمع المدرسيّ من معلّمين وأهل وطلاب. ونغرس في طلابنا الصدق وفهم الآخر.',
          'ادّعاء التأليف بطريقة غير صادقة هو انتحال، وهو شكل من أشكال الغش. ويُعرَّف الانتحال بأنّه: أخذ عمل الآخرين أو أفكارهم ونسبتها إلى الذات.',
        ],
        bullets: {
          intro: 'لذلك تسمح مدرسة قدموس لطلابها بـ:',
          items: [
            'مناقشة الواجب مع زملائهم لطلب التوضيح.',
            'تبادل الأفكار والتفاصيل بهدف الفهم.',
          ],
        },
      },
      {
        heading: 'الإخلال بالأمانة الأكاديمية',
        paragraphs: [
          'تعدّ مدرسة قدموس الطالب مُخلًّا بالأمانة الأكاديمية إذا حصل على مساعدة غير عادلة لإنجاز مهمّة.',
        ],
        bullets: {
          intro: 'يأخذ الإخلال بالأمانة الأكاديمية أشكالًا عدّة، من بينها:',
          items: ['الغشّ', 'الانتحال', 'التواطؤ', 'التزوير'],
        },
      },
      {
        heading: 'التوعية قبل العقوبة',
        paragraphs: [
          'يدرك معظم الطلاب أنّ الغشّ المتعمَّد خطأ في كلّ الظروف، غير أنّ تلقّي الإرشاد أو المساعدة، أو استخدام الاقتباسات، أو تنزيل صفحات، أو تكييف موادّ خلال العمل على أوراق كبيرة، ليس أمرًا بسيطًا؛ ولذلك تدرّب مدرسة قدموس طلابها على الإجراءات الأكاديميّة المناسبة. ويتولّى المعلّمون متابعة الأمانة الأكاديمية وإبلاغ المنسّق في حال السلوك غير اللائق.',
          'تتطلّب الأمانة الأكاديمية أن يحترم الطلاب والمعلّمون نزاهة عمل الآخرين، ويُدركوا أهميّة الاعتراف بالملكيّة الفكريّة وحمايتها.',
        ],
      },
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
        <div className="prose-invert mx-auto max-w-[78ch] text-white/80">
          {t.sections.map((s, i) => (
            <div key={i} className="mb-12">
              <h2 className="mb-5 text-[24px] font-bold leading-[1.2] text-white">{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mb-4 text-[15.5px] leading-[1.75] text-white/70">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <>
                  {s.bullets.intro && (
                    <p className="mb-3 text-[15.5px] text-white/70">{s.bullets.intro}</p>
                  )}
                  <ul className="mb-4 ms-6 list-disc text-[15.5px] text-white/70">
                    {s.bullets.items.map((b, k) => (
                      <li key={k} className="mb-1.5">
                        {b}
                      </li>
                    ))}
                  </ul>
                  {s.bullets.outro && (
                    <p className="mb-4 text-[15.5px] text-white/70">{s.bullets.outro}</p>
                  )}
                </>
              )}
            </div>
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
