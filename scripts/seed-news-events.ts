import { eq } from 'drizzle-orm'

import { db } from '../src/db/client'
import {
  eventTranslations,
  events,
  newsPosts,
  newsTranslations,
} from '../src/db/schema/content'
import { siteSettings } from '../src/db/schema/cms'

// Bump SEED_VERSION when you change the seed data and want the seeder to
// re-upsert into existing rows on the next deploy. The current value is
// stored in site_settings under key `seed.news-events.version`.
const SEED_VERSION = 2
const SEED_KEY = 'seed.news-events.version'

type Translations = { en: string; ar: string; fr: string }

type NewsSeed = {
  slug: string
  publishedAt: string
  imagePath: string
  title: Translations
  summary: Translations
  body: Translations
}

type EventSeed = {
  slug: string
  startDate: string
  imagePath?: string
  title: Translations
  description: Translations
}

// ──────────────── News (AR is source-of-truth; EN + FR translated) ────────────────

const NEWS: NewsSeed[] = [
  // News 14
  {
    slug: 'congratulations-from-cadmous-management',
    publishedAt: '2025-08-02T13:12:00Z',
    imagePath: '/images/seed/posts/news-14-1.jpg',
    title: {
      ar: 'تهنئة من إدارة مدرسة قدموس',
      en: 'Congratulations from Cadmous College Management',
      fr: 'Félicitations de la direction de Cadmous',
    },
    summary: {
      ar: 'تهنئة من إدارة المدرسة لتلامذتها بنتائج الامتحانات الرسمية للعام 2024-2025.',
      en: 'A note from the school administration congratulating our students on their 2024-2025 official exam results.',
      fr: "Un mot de la direction de l'école pour féliciter nos élèves de leurs résultats aux examens officiels 2024-2025.",
    },
    body: {
      ar: 'إدارة مدرسة قدموس، بشخص رئيسها الأب جان يونس وأفراد الهيئتين التعليمية والإدارية، تفتخر بتلامذتها الأحبّة في صفوف علوم الحياة، العلوم العامة، والاقتصاد والاجتماع، في قسميهما الإنكليزي والفرنسي، وتبارك لهم نجاحهم وتميّزهم في الامتحانات الرسمية لهذا العام. وقد تقدّم إلى هذه الامتحانات 52 تلميذًا وتلميذة، فجاءت النتائج على النحو التالي: 50 تلميذًا نجحوا بنسبة 100% بين الناجحين، وتلميذان لم يوفَّقا في الدورة الأولى، على أمل أن يحقّقا النجاح في الدورة الثانية.',
      en: 'The administration of Cadmous College, represented by its head Father Jean Younes together with the teaching and administrative bodies, takes great pride in our beloved students in the Life Sciences, General Sciences, and Economics & Sociology classes — across both the English and French sections — and congratulates them on their success and distinction in this year\'s official exams. 52 students sat for the exams, with the following results: 50 students passed (a 100% pass rate among successful candidates), and 2 students did not succeed in the first round, with hopes that they will pass in the second round.',
      fr: "La direction de Cadmous College, représentée par son supérieur le Père Jean Younes et les membres des équipes pédagogique et administrative, est fière de ses chers élèves des classes de Sciences de la vie, Sciences générales, et Sociologie & Économie — dans les sections anglaise et française — et les félicite pour leur réussite et leur distinction aux examens officiels de cette année. 52 élèves se sont présentés aux examens, avec les résultats suivants : 50 élèves ont réussi (un taux de 100 % parmi les candidats reçus), et 2 élèves n'ont pas réussi à la première session, avec l'espoir qu'ils décrochent leur succès à la deuxième session.",
    },
  },
  // News 13 — EN translation is from the original site
  {
    slug: 'historic-ib-achievement',
    publishedAt: '2025-07-05T16:51:00Z',
    imagePath: '/images/seed/posts/news-13-1.jpg',
    title: {
      ar: 'إنجاز تاريخي عظيم لطلابنا في برنامج البكالوريا الدولية',
      en: 'A Historic Achievement for Our IB Students',
      fr: 'Une réussite historique pour nos élèves IB',
    },
    summary: {
      ar: 'جميع طلابنا الستة عشر في برنامج البكالوريا الدولية اجتازوا امتحاناتهم الرسمية بنجاح كامل للعام 2024-2025.',
      en: 'All 16 of our IB Diploma students successfully passed their 2024-2025 official exams.',
      fr: 'Nos 16 élèves du programme IB ont tous réussi leurs examens officiels 2024-2025.',
    },
    body: {
      ar: 'بالنيابة عن مدير المدرسة الأب د. جان يونس، ومدير قسم البرامج الدولية الأستاذ أسامة سالم، يسرّنا أن نعلن بفخر أنّ جميع طلابنا الستة عشر في برنامج البكالوريا الدولية قد اجتازوا امتحاناتهم الرسمية بنجاح كامل للعام الدراسي 2024-2025. فرغم التحديات الهائلة التي فرضتها الظروف الصعبة، من تداعيات الحرب إلى انقطاع التعلّم الحضوري، أثبت طلابنا إصرارًا لا يتزعزع، ووقفوا إلى جانب معلميهم بإيمان وجهد مشترك. لقد جسّدوا معنى العزيمة، وأكدوا أنّ الصعوبات لا تُضعف الهمم بل تزيدها صلابة. هذا الإنجاز المشرّف هو ثمرة العمل الدؤوب والإصرار، ورسالة أمل إلى مجتمعنا بأسره: نحن قادرون على تخطّي كلّ العقبات عندما نتكاتف ونعمل بروح واحدة. مبارك لطلابنا الأبطال، طلاب البكالوريا الدولية! المستقبل ينتظركم، فامضوا إليه بثقة!',
      en: 'On behalf of our esteemed school superior, Father Jean Younes, and the Director of the International Program Department, Mr. Ossama Salem, we are honored to announce that all 16 of our IB students have successfully conquered their official exams. These young scholars have faced unimaginable challenges, enduring the trials of war and loss of classroom time. Yet, they stood firm, united with their dedicated teachers, to demonstrate unwavering resolve and extraordinary strength. They have shown that adversity only fuels their determination to succeed. This remarkable accomplishment is not just a reflection of their hard work but a powerful statement to our entire community: we can rise above any obstacle. Their success is a beacon of hope and an inspiration to all. Congratulations, IB students! The future is yours to conquer.',
      fr: "Au nom de notre supérieur estimé, le Père Jean Younes, et du directeur du département des programmes internationaux, M. Ossama Salem, nous avons l'honneur d'annoncer que la totalité de nos 16 élèves du programme IB ont brillamment réussi leurs examens officiels. Ces jeunes érudits ont affronté des défis inimaginables, surmontant les épreuves de la guerre et la perte de temps de classe. Et pourtant ils sont restés debout, unis à leurs enseignants dévoués, démontrant une détermination inébranlable et une force extraordinaire. Ils ont prouvé que l'adversité ne fait qu'attiser leur volonté de réussir. Cette réussite remarquable est non seulement le fruit de leur travail mais un message puissant à toute notre communauté : nous pouvons nous élever au-dessus de tout obstacle. Leur succès est un phare d'espoir et une inspiration. Félicitations à nos élèves IB ! L'avenir est à vous.",
    },
  },
  // News 12 — poster-only, no body text on the original
  {
    slug: 'school-year-start-dates-2025-2026',
    publishedAt: '2025-06-07T04:29:00Z',
    imagePath: '/images/seed/posts/news-12-1.jpg',
    title: {
      ar: 'مواعيد بدء العام الدراسي 2025 - 2026',
      en: 'Start Dates for the 2025-2026 School Year',
      fr: 'Dates de rentrée pour l\'année scolaire 2025-2026',
    },
    summary: {
      ar: 'مواعيد بدء العام الدراسي الجديد 2025 - 2026.',
      en: 'Start dates for the upcoming 2025-2026 academic year.',
      fr: 'Dates de rentrée pour la prochaine année scolaire 2025-2026.',
    },
    body: { ar: '', en: '', fr: '' },
  },
  // News 10
  {
    slug: 'registration-2025-2026',
    publishedAt: '2025-06-07T03:47:00Z',
    imagePath: '/images/seed/posts/news-10-1.jpg',
    title: {
      ar: 'التسجيل للعام الدراسي 2025 - 2026',
      en: 'Registration 2025-2026',
      fr: 'Inscription 2025-2026',
    },
    summary: {
      ar: 'تذكير الأهالي بإكمال دفع القسط الحالي ورسم التسجيل قبل 15 حزيران.',
      en: "A reminder to families to complete this year's tuition payment and the registration fee before June 15.",
      fr: "Rappel aux familles de régler le solde des frais de l'année et les frais d'inscription avant le 15 juin.",
    },
    body: {
      ar: 'أهلنا الأعزاء، نذكّركم بضرورة التوجّه إلى مكتب المحاسبة لدفع ما تبقى من القسط لهذا العام، وتأمين مقاعد أولادكم للعام الدراسي القادم 2025-2026 من خلال دفع رسم التسجيل قبل 15 حزيران. يُعتبر التلميذ مسجَّلًا فقط بعد دفع كامل القسط الحالي ورسم التسجيل. الرسم غير قابل للاسترجاع في حال الانسحاب. لا إمكانية لفتح صفوف جديدة بسبب عدم وجود غرف. بلغ عدد المسجّلين حتى اليوم 776 من طلابنا الحاليين و150 طالبًا جديدًا. التسجيل المبكر يساعد المدرسة في التحضيرات (تأمين الكتب، الزيّ المدرسي والقرطاسية، وتوقيع العقود مع الأساتذة…). للاستعلام عن تفاصيل الأقساط، يمكنكم مراجعة مكتب المحاسبة مباشرة. شكرًا لتعاونكم وتفهّمكم الدائم.',
      en: "Dear families, we remind you to visit the accounting office to settle the remainder of this year's tuition and secure your children's seats for the upcoming 2025-2026 school year by paying the registration fee before June 15. A student is only considered registered after full payment of this year's tuition and the registration fee. The registration fee is non-refundable in case of withdrawal. We are unable to open new classes due to a lack of available rooms. Registrations so far: 776 returning students and 150 new students. Early registration helps the school prepare (textbooks, uniforms, stationery, and teacher contracts). For tuition details, please contact the accounting office directly. Thank you for your continued cooperation and understanding.",
      fr: "Chères familles, nous vous rappelons de vous rendre au bureau de la comptabilité pour régler le solde des frais de cette année et de réserver la place de vos enfants pour l'année scolaire 2025-2026 à venir en réglant les frais d'inscription avant le 15 juin. Un élève n'est considéré comme inscrit qu'après le paiement intégral des frais de l'année en cours et des frais d'inscription. Les frais d'inscription ne sont pas remboursables en cas de désistement. Nous ne pouvons pas ouvrir de nouvelles classes par manque de salles disponibles. Inscriptions à ce jour : 776 élèves de retour et 150 nouveaux élèves. Une inscription rapide aide l'école dans ses préparatifs (manuels, uniformes, papeterie, et contrats avec les enseignants). Pour le détail des frais, merci de contacter directement le bureau de la comptabilité. Merci de votre coopération et de votre compréhension.",
    },
  },
]

// ──────────────── Events ────────────────

const EVENTS: EventSeed[] = [
  {
    slug: 'historic-ib-achievement-event',
    startDate: '2025-07-05T16:53:00Z',
    imagePath: '/images/seed/posts/events-62-1.jpg',
    title: {
      ar: 'إنجاز تاريخي عظيم لطلابنا في برنامج البكالوريا الدولية',
      en: 'A Historic IB Achievement for Our Students',
      fr: 'Une réussite IB historique pour nos élèves',
    },
    description: {
      ar: 'احتفال بنجاح طلاب البكالوريا الدولية في امتحاناتهم الرسمية للعام 2024-2025.',
      en: 'A celebration of our IB students passing their 2024-2025 official exams.',
      fr: 'Une célébration de la réussite de nos élèves IB aux examens officiels 2024-2025.',
    },
  },
  {
    slug: 'graduation-class-of-2025',
    startDate: '2025-06-14T03:16:00Z',
    title: {
      ar: 'حفل تخرّج صفّ 2025',
      en: 'Graduation — Class of 2025',
      fr: 'Cérémonie de remise des diplômes — Promotion 2025',
    },
    description: {
      ar: 'حفل تخرّج صفّ 2025. شاهد الفيديو على يوتيوب: https://youtu.be/qBbQVoi9IJU',
      en: 'Graduation ceremony for the Class of 2025. Watch on YouTube: https://youtu.be/qBbQVoi9IJU',
      fr: 'Cérémonie de remise des diplômes de la promotion 2025. À regarder sur YouTube : https://youtu.be/qBbQVoi9IJU',
    },
  },
  {
    slug: 'a-celebration-unlike-any-other',
    startDate: '2025-06-07T04:54:00Z',
    imagePath: '/images/seed/posts/events-60-1.jpg',
    title: {
      ar: 'احتفال لا يشبه غيره',
      en: 'A Celebration Like No Other',
      fr: 'Une célébration unique',
    },
    description: {
      ar: 'احتفال خاصّ من مدرسة قدموس لتلامذتها وعائلاتها.',
      en: 'A special celebration from Cadmous College for our students and families.',
      fr: "Une célébration spéciale de Cadmous College pour nos élèves et leurs familles.",
    },
  },
  {
    slug: 'year-1-closing-ceremony-2024-2025',
    startDate: '2025-06-07T04:52:00Z',
    imagePath: '/images/seed/posts/events-59-1.jpg',
    title: {
      ar: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي (فرنسي وإنكليزي)',
      en: 'End-of-Year Ceremony 2024-2025 — Year 1 (French & English sections)',
      fr: "Cérémonie de fin d'année 2024-2025 — Année 1 (sections française et anglaise)",
    },
    description: {
      ar: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي الفرنسي والإنكليزي.',
      en: 'End-of-year ceremony 2024-2025 for our Year 1 students across the French and English sections.',
      fr: "Cérémonie de fin d'année 2024-2025 pour nos élèves de l'Année 1 dans les sections française et anglaise.",
    },
  },
  {
    slug: 'kindergarten-closing-ceremony-2024-2025',
    startDate: '2025-06-07T04:50:00Z',
    imagePath: '/images/seed/posts/events-58-1.jpg',
    title: {
      ar: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الروضات',
      en: 'End-of-Year Ceremony 2024-2025 — Kindergarten',
      fr: "Cérémonie de fin d'année 2024-2025 — Maternelle",
    },
    description: {
      ar: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الروضات.',
      en: 'End-of-year ceremony 2024-2025 for our Kindergarten students.',
      fr: "Cérémonie de fin d'année 2024-2025 pour nos élèves de maternelle.",
    },
  },
  {
    slug: 'cadmous-college-advertisement',
    startDate: '2024-06-15T15:21:00Z',
    title: {
      ar: 'إعلان مدرسة قدموس',
      en: 'Cadmous College Advertisement',
      fr: 'Publicité Cadmous College',
    },
    description: {
      ar: 'إعلان مدرسة قدموس. شاهد الفيديو على يوتيوب: https://youtu.be/a1zj1EHWqhQ',
      en: 'Cadmous College advertisement. Watch on YouTube: https://youtu.be/a1zj1EHWqhQ',
      fr: 'Publicité Cadmous College. À regarder sur YouTube : https://youtu.be/a1zj1EHWqhQ',
    },
  },
]

async function getStoredVersion(): Promise<number> {
  const row = await db.query.siteSettings.findFirst({
    where: (s, { and, eq: eq2 }) => and(eq2(s.key, SEED_KEY), eq2(s.locale, '')),
  })
  if (!row) return 0
  const v = parseInt(row.value, 10)
  return Number.isFinite(v) ? v : 0
}

async function setStoredVersion(v: number) {
  await db
    .insert(siteSettings)
    .values({ key: SEED_KEY, locale: '', value: String(v) })
    .onConflictDoUpdate({
      target: [siteSettings.key, siteSettings.locale],
      set: { value: String(v) },
    })
}

async function seedNews() {
  for (const n of NEWS) {
    const existing = await db.query.newsPosts.findFirst({ where: eq(newsPosts.slug, n.slug) })
    let postId: string
    if (existing) {
      postId = existing.id
      await db
        .update(newsPosts)
        .set({
          publishedAt: new Date(n.publishedAt),
          imagePath: n.imagePath,
          status: 'published',
        })
        .where(eq(newsPosts.id, postId))
    } else {
      const inserted = await db
        .insert(newsPosts)
        .values({
          slug: n.slug,
          publishedAt: new Date(n.publishedAt),
          imagePath: n.imagePath,
          status: 'published',
        })
        .returning({ id: newsPosts.id })
      postId = inserted[0].id
    }
    for (const locale of ['en', 'ar', 'fr'] as const) {
      await db
        .insert(newsTranslations)
        .values({
          postId,
          locale,
          title: n.title[locale],
          summary: n.summary[locale],
          body: n.body[locale],
        })
        .onConflictDoUpdate({
          target: [newsTranslations.postId, newsTranslations.locale],
          set: {
            title: n.title[locale],
            summary: n.summary[locale],
            body: n.body[locale],
          },
        })
    }
  }
  console.log(`Seeded ${NEWS.length} news posts.`)
}

async function seedEvents() {
  for (const e of EVENTS) {
    const existing = await db.query.events.findFirst({ where: eq(events.slug, e.slug) })
    let eventId: string
    if (existing) {
      eventId = existing.id
      await db
        .update(events)
        .set({
          startDate: new Date(e.startDate),
          imagePath: e.imagePath ?? null,
          status: 'published',
        })
        .where(eq(events.id, eventId))
    } else {
      const inserted = await db
        .insert(events)
        .values({
          slug: e.slug,
          startDate: new Date(e.startDate),
          imagePath: e.imagePath ?? null,
          status: 'published',
        })
        .returning({ id: events.id })
      eventId = inserted[0].id
    }
    for (const locale of ['en', 'ar', 'fr'] as const) {
      await db
        .insert(eventTranslations)
        .values({
          eventId,
          locale,
          title: e.title[locale],
          description: e.description[locale],
        })
        .onConflictDoUpdate({
          target: [eventTranslations.eventId, eventTranslations.locale],
          set: {
            title: e.title[locale],
            description: e.description[locale],
          },
        })
    }
  }
  console.log(`Seeded ${EVENTS.length} events.`)
}

async function main() {
  const args = new Set(process.argv.slice(2))
  const stored = await getStoredVersion()
  if (args.has('--if-stale')) {
    if (stored >= SEED_VERSION) {
      console.log(`[seed-news-events] stored=${stored} >= SEED_VERSION=${SEED_VERSION}; skipping.`)
      return
    }
    console.log(`[seed-news-events] stored=${stored} < SEED_VERSION=${SEED_VERSION}; seeding.`)
  }
  await seedNews()
  await seedEvents()
  await setStoredVersion(SEED_VERSION)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
