import { eq } from 'drizzle-orm'

import { db } from '../src/db/client'
import {
  eventTranslations,
  events,
  newsPosts,
  newsTranslations,
} from '../src/db/schema/content'

type Translations = { en: string; ar: string; fr: string }

type NewsSeed = {
  slug: string
  publishedAt: string // ISO
  imagePath: string
  title: Translations
  summary: Translations
  body: Translations
}

type EventSeed = {
  slug: string
  startDate: string // ISO
  imagePath?: string
  title: Translations
  description: Translations
}

// Most posts on the original cadmous.edu.lb are Arabic-only school announcements.
// We seed AR content into all three locale rows so the post is visible regardless
// of UI language — Arabic speakers see Arabic, English/French speakers also see
// Arabic (rather than a missing post). News #13 had an English translation on
// the original site; we use it for the EN row.

const AR_TITLE_13 = 'إنجاز تاريخي عظيم لطلابنا في برنامج البكالوريا الدولية'
const EN_TITLE_13 = 'A Historic Achievement for Our IB Students'
const AR_BODY_13 =
  'بالنيابة عن مدير المدرسة الأب د. جان يونس، ومدير قسم البرامج الدولية الأستاذ أسامة سالم، يسرّنا أن نعلن بفخر أن جميع طلابنا الستة عشر في برنامج البكالوريا الدولية قد اجتازوا امتحاناتهم الرسمية بنجاح كامل للعام الدراسي 2024-2025. فرغم التحديات الهائلة التي فرضتها الظروف الصعبة، من تداعيات الحرب إلى انقطاع التعلّم الحضوري، أثبت طلابنا إصرارًا لا يتزعزع، ووقفوا إلى جانب معلميهم بإيمان وجهد مشترك. لقد جسّدوا معنى العزيمة، وأكدوا أن الصعوبات لا تُضعف الهمم بل تزيدها صلابة. هذا الإنجاز المشرّف هو ثمرة العمل الدؤوب والإصرار، ورسالة أمل إلى مجتمعنا بأسره: نحن قادرون على تخطّي كل العقبات عندما نتكاتف ونعمل بروح واحدة. مبارك لطلابنا الأبطال، طلاب البكالوريا الدولية! المستقبل ينتظركم، فامضوا إليه بثقة!'
const EN_BODY_13 =
  'On behalf of our esteemed school superior, Father Jean Younes, and the Director of the International Program Department, Mr. Ossama Salem, we are honored to announce that all 16 of our IB students have successfully conquered their official exams for 2024-2025. These young scholars have faced unimaginable challenges, enduring the trials of war and loss of classroom time. Yet, they stood firm, united with their dedicated teachers, to demonstrate unwavering resolve and extraordinary strength. They have shown that adversity only fuels their determination to succeed. This remarkable accomplishment is not just a reflection of their hard work but a powerful statement to our entire community: we can rise above any obstacle. Congratulations, IB students! The future is yours to conquer.'

const AR_TITLE_14 = 'تهنئة من إدارة مدرسة قدموس'
const AR_BODY_14 =
  'إدارة مدرسة قدموس، بشخص رئيسها الأب جان يونس وأفراد الهيئتين التعليمية والإدارية، تفتخر بتلامذتها الأحبّة في صفوف علوم الحياة، العلوم العامة، والاقتصاد والاجتماع، في قسميهما الإنكليزي والفرنسي، وتبارك لهم نجاحهم وتميّزهم في الامتحانات الرسمية لهذا العام. وقد تقدّم إلى هذه الامتحانات 52 تلميذًا وتلميذة، فجاءت النتائج على النحو التالي: 50 تلميذًا نجحوا بنسبة 100% بين الناجحين، و2 تلميذين لم يوفَّقا في الدورة الأولى، على أمل أن يحققا النجاح في الدورة الثانية.'

const AR_TITLE_12 = 'مواعيد بدء العام الدراسي 2025 - 2026'
// news/12 has no extractable text body — content is on the poster image
const AR_BODY_12 = ''

const AR_TITLE_10 = 'التسجيل للعام الدراسي 2025 - 2026'
const AR_BODY_10 =
  'أهلنا الأعزاء، نذكّركم بضرورة التوجّه إلى مكتب المحاسبة لدفع ما تبقى من القسط لهذا العام، وتأمين مقاعد أولادكم للعام الدراسي القادم 2025-2026 من خلال دفع رسم التسجيل قبل 15 حزيران. يُعتبر التلميذ مسجّلًا فقط بعد دفع كامل القسط الحالي ورسم التسجيل. الرسم غير قابل للاسترجاع في حال الانسحاب. للاستعلام عن تفاصيل الأقساط، يمكنكم مراجعة مكتب المحاسبة مباشرة. شكرًا لتعاونكم وتفهّمكم الدائم.'

const NEWS: NewsSeed[] = [
  {
    slug: 'congratulations-from-cadmous-management',
    publishedAt: '2025-08-02T13:12:00Z',
    imagePath: '/images/seed/posts/news-14-1.jpg',
    title: { ar: AR_TITLE_14, en: AR_TITLE_14, fr: AR_TITLE_14 },
    summary: {
      ar: 'تهنئة من إدارة مدرسة قدموس لتلامذتها بنتائج الامتحانات الرسمية للعام 2024-2025.',
      en: 'تهنئة من إدارة مدرسة قدموس لتلامذتها بنتائج الامتحانات الرسمية للعام 2024-2025.',
      fr: 'تهنئة من إدارة مدرسة قدموس لتلامذتها بنتائج الامتحانات الرسمية للعام 2024-2025.',
    },
    body: { ar: AR_BODY_14, en: AR_BODY_14, fr: AR_BODY_14 },
  },
  {
    slug: 'historic-ib-achievement',
    publishedAt: '2025-07-05T16:51:00Z',
    imagePath: '/images/seed/posts/news-13-1.jpg',
    title: { ar: AR_TITLE_13, en: EN_TITLE_13, fr: AR_TITLE_13 },
    summary: {
      ar: 'جميع طلابنا الستة عشر في برنامج البكالوريا الدولية اجتازوا امتحاناتهم الرسمية بنجاح كامل للعام 2024-2025.',
      en: 'All 16 of our IB Diploma students successfully passed their official exams for 2024-2025.',
      fr: 'جميع طلابنا الستة عشر في برنامج البكالوريا الدولية اجتازوا امتحاناتهم الرسمية بنجاح كامل للعام 2024-2025.',
    },
    body: { ar: AR_BODY_13, en: EN_BODY_13, fr: AR_BODY_13 },
  },
  {
    slug: 'school-year-start-dates-2025-2026',
    publishedAt: '2025-06-07T04:29:00Z',
    imagePath: '/images/seed/posts/news-12-1.jpg',
    title: { ar: AR_TITLE_12, en: AR_TITLE_12, fr: AR_TITLE_12 },
    summary: {
      ar: 'مواعيد بدء العام الدراسي الجديد 2025 - 2026.',
      en: 'مواعيد بدء العام الدراسي الجديد 2025 - 2026.',
      fr: 'مواعيد بدء العام الدراسي الجديد 2025 - 2026.',
    },
    body: { ar: AR_BODY_12, en: AR_BODY_12, fr: AR_BODY_12 },
  },
  {
    slug: 'registration-2025-2026',
    publishedAt: '2025-06-07T03:47:00Z',
    imagePath: '/images/seed/posts/news-10-1.jpg',
    title: { ar: AR_TITLE_10, en: AR_TITLE_10, fr: AR_TITLE_10 },
    summary: {
      ar: 'تذكير الأهالي بإكمال دفع القسط الحالي ورسم التسجيل قبل 15 حزيران.',
      en: 'تذكير الأهالي بإكمال دفع القسط الحالي ورسم التسجيل قبل 15 حزيران.',
      fr: 'تذكير الأهالي بإكمال دفع القسط الحالي ورسم التسجيل قبل 15 حزيران.',
    },
    body: { ar: AR_BODY_10, en: AR_BODY_10, fr: AR_BODY_10 },
  },
]

// Events — most are video or photo galleries with little body text. Where there's
// a YouTube link, we include it in the description (Markdown link, rendered as text
// for now). Posters are seeded as the event image.

const AR_EVENT_61_DESC = 'حفل تخرّج صفّ 2025 — شاهد الفيديو على يوتيوب: https://youtu.be/qBbQVoi9IJU'
const EN_EVENT_61_DESC = 'Graduation Class of 2025 — watch on YouTube: https://youtu.be/qBbQVoi9IJU'

const AR_EVENT_57_DESC = 'إعلان مدرسة قدموس — شاهد الفيديو على يوتيوب: https://youtu.be/a1zj1EHWqhQ'
const EN_EVENT_57_DESC = 'Cadmous College advertisement — watch on YouTube: https://youtu.be/a1zj1EHWqhQ'

const EVENTS: EventSeed[] = [
  {
    slug: 'historic-ib-achievement-event',
    startDate: '2025-07-05T16:53:00Z',
    imagePath: '/images/seed/posts/events-62-1.jpg',
    title: {
      ar: 'إنجاز تاريخي عظيم لطلابنا في برنامج البكالوريا الدولية',
      en: 'إنجاز تاريخي عظيم لطلابنا في برنامج البكالوريا الدولية',
      fr: 'إنجاز تاريخي عظيم لطلابنا في برنامج البكالوريا الدولية',
    },
    description: {
      ar: 'احتفال بنجاح طلاب البكالوريا الدولية في امتحاناتهم الرسمية للعام 2024-2025.',
      en: 'A celebration of our IB students passing their 2024-2025 official exams.',
      fr: 'احتفال بنجاح طلاب البكالوريا الدولية في امتحاناتهم الرسمية للعام 2024-2025.',
    },
  },
  {
    slug: 'graduation-class-of-2025',
    startDate: '2025-06-14T03:16:00Z',
    title: {
      ar: 'حفل تخرّج صفّ 2025',
      en: 'Graduation Class of 2025',
      fr: 'حفل تخرّج صفّ 2025',
    },
    description: { ar: AR_EVENT_61_DESC, en: EN_EVENT_61_DESC, fr: AR_EVENT_61_DESC },
  },
  {
    slug: 'a-celebration-unlike-any-other',
    startDate: '2025-06-07T04:54:00Z',
    imagePath: '/images/seed/posts/events-60-1.jpg',
    title: { ar: 'احتفال لا يشبه غيره', en: 'احتفال لا يشبه غيره', fr: 'احتفال لا يشبه غيره' },
    description: {
      ar: 'احتفال خاصّ من مدرسة قدموس لتلامذتها وعائلاتها.',
      en: 'احتفال خاصّ من مدرسة قدموس لتلامذتها وعائلاتها.',
      fr: 'احتفال خاصّ من مدرسة قدموس لتلامذتها وعائلاتها.',
    },
  },
  {
    slug: 'year-1-closing-ceremony-2024-2025',
    startDate: '2025-06-07T04:52:00Z',
    imagePath: '/images/seed/posts/events-59-1.jpg',
    title: {
      ar: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي (فرنسي وإنكليزي)',
      en: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي (فرنسي وإنكليزي)',
      fr: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي (فرنسي وإنكليزي)',
    },
    description: {
      ar: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي الفرنسي والإنكليزي.',
      en: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي الفرنسي والإنكليزي.',
      fr: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الأوّل الأساسي الفرنسي والإنكليزي.',
    },
  },
  {
    slug: 'kindergarten-closing-ceremony-2024-2025',
    startDate: '2025-06-07T04:50:00Z',
    imagePath: '/images/seed/posts/events-58-1.jpg',
    title: {
      ar: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الروضات',
      en: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الروضات',
      fr: 'حفل اختتام نهاية العام الدراسي 2024-2025 لتلامذة صفوف الروضات',
    },
    description: {
      ar: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الروضات.',
      en: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الروضات.',
      fr: 'حفل اختتام العام الدراسي 2024-2025 لتلامذة صفوف الروضات.',
    },
  },
  {
    slug: 'cadmous-college-advertisement',
    startDate: '2024-06-15T15:21:00Z',
    title: {
      ar: 'إعلان مدرسة قدموس',
      en: 'Cadmous College Advertisement',
      fr: 'إعلان مدرسة قدموس',
    },
    description: { ar: AR_EVENT_57_DESC, en: EN_EVENT_57_DESC, fr: AR_EVENT_57_DESC },
  },
]

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
  const ifEmpty = process.argv.includes('--if-empty')
  if (ifEmpty) {
    const newsCount = await db.query.newsPosts.findFirst({})
    const eventCount = await db.query.events.findFirst({})
    if (newsCount || eventCount) {
      console.log('[seed-news-events] news_posts or events already populated; skipping.')
      return
    }
  }
  await seedNews()
  await seedEvents()
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
