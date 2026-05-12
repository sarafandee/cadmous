import { db } from '../src/db/client'
import { LOCALES } from '../src/db/schema/content'
import {
  announcementTranslations,
  announcements,
  eventTranslations,
  events,
  newsPosts,
  newsTranslations,
} from '../src/db/schema/content'

type NewsSeed = {
  slug: string
  publishedAt: string
  status: 'draft' | 'published'
  translations: Record<string, { title: string; summary: string; body: string }>
}

const NEWS: NewsSeed[] = [
  {
    slug: 'open-day-recap',
    publishedAt: '2026-05-04T00:00:00Z',
    status: 'published',
    translations: {
      en: {
        title: 'Open Day 2026: families meet our IB community',
        summary:
          'Hundreds of prospective families toured campus, met division heads, and saw the IB Diploma classrooms in action.',
        body: 'Open Day at Cadmous College welcomed prospective students and their families for an afternoon of tours, classroom visits, and conversations with our division heads. Visitors heard from our Diploma Programme coordinator about the IB curriculum and the AP track, walked through the new STEAM laboratory, and joined Q&A sessions hosted by senior students. Thank you to the parents, staff, and students who made the day what it was — a snapshot of our community at its best.',
      },
      ar: { title: '', summary: '', body: '' },
      fr: { title: '', summary: '', body: '' },
    },
  },
  {
    slug: 'new-steam-lab',
    publishedAt: '2026-04-18T00:00:00Z',
    status: 'published',
    translations: {
      en: {
        title: 'The STEAM laboratory opens for elementary and intermediate',
        summary:
          'A purpose-built space for hands-on science, technology, engineering, arts and mathematics — designed with our teachers.',
        body: 'Cadmous College is pleased to open its new STEAM laboratory, a flexible workshop space designed for project-based learning across science, technology, engineering, arts, and mathematics. The space includes a 3D printer station, microcontroller kits, an arts corner with traditional and digital tools, and reconfigurable tables for collaborative work. Designed in consultation with our teaching teams, the lab supports our elementary and intermediate divisions and will host after-school clubs starting next term.',
      },
      ar: { title: '', summary: '', body: '' },
      fr: { title: '', summary: '', body: '' },
    },
  },
  {
    slug: 'ib-cohort-science',
    publishedAt: '2026-03-30T00:00:00Z',
    status: 'published',
    translations: {
      en: {
        title: 'IB Diploma cohort takes top regional honors in science',
        summary:
          'Our DP science students presented original research at the South Lebanon Schools Symposium and brought home four prizes.',
        body: 'Students from our IB Diploma Programme presented original research at the South Lebanon Schools Symposium this month, with projects spanning environmental biology, applied physics, and chemistry. Cadmous students took home four prizes including the overall Best Research award. The cohort has been preparing these projects through the IB Extended Essay process, mentored by their subject teachers. Our congratulations to the students and their mentors.',
      },
      ar: { title: '', summary: '', body: '' },
      fr: { title: '', summary: '', body: '' },
    },
  },
]

type EventSeed = {
  slug: string
  startDate: string
  endDate?: string
  location?: string
  status: 'draft' | 'published'
  translations: Record<string, { title: string; description: string }>
}

const EVENTS: EventSeed[] = [
  {
    slug: 'spring-concert',
    startDate: '2026-06-12T18:00:00Z',
    location: 'Auditorium',
    status: 'published',
    translations: {
      en: {
        title: 'Spring concert',
        description:
          'A showcase of student musicianship from across the school — choir, ensembles, and soloists. Doors open at 5:30 PM; concert begins at 6:00 PM. Family and friends are warmly welcome.',
      },
      ar: { title: '', description: '' },
      fr: { title: '', description: '' },
    },
  },
  {
    slug: 'ib-info-evening',
    startDate: '2026-05-28T17:30:00Z',
    location: 'Library mezzanine',
    status: 'published',
    translations: {
      en: {
        title: 'IB Diploma information evening',
        description:
          'For parents and Grade 10 students considering the IB Diploma Programme. Our DP coordinator will walk through the curriculum, subject choices, Extended Essay, TOK, and CAS — followed by Q&A.',
      },
      ar: { title: '', description: '' },
      fr: { title: '', description: '' },
    },
  },
]

type AnnouncementSeed = {
  severity: 'info' | 'warning' | 'critical'
  status: 'draft' | 'published'
  translations: Record<string, { title: string; body: string }>
}

const ANNOUNCEMENTS: AnnouncementSeed[] = [
  {
    severity: 'info',
    status: 'published',
    translations: {
      en: {
        title: 'Applications open for 2026–2027',
        body: 'Admissions are open for all divisions. See the requirements page for guidelines and timelines.',
      },
      ar: { title: '', body: '' },
      fr: { title: '', body: '' },
    },
  },
]

async function clear() {
  // Cascade deletes through translations via FK ON DELETE CASCADE.
  await db.delete(newsPosts)
  await db.delete(events)
  await db.delete(announcements)
}

async function insertNews() {
  for (const n of NEWS) {
    const [{ id }] = await db
      .insert(newsPosts)
      .values({
        slug: n.slug,
        publishedAt: new Date(n.publishedAt),
        status: n.status,
      })
      .returning({ id: newsPosts.id })
    await db.insert(newsTranslations).values(
      LOCALES.map((l) => ({
        postId: id,
        locale: l,
        title: n.translations[l]?.title ?? '',
        summary: n.translations[l]?.summary ?? '',
        body: n.translations[l]?.body ?? '',
      })),
    )
  }
  console.log(`Inserted ${NEWS.length} news posts.`)
}

async function insertEvents() {
  for (const e of EVENTS) {
    const [{ id }] = await db
      .insert(events)
      .values({
        slug: e.slug,
        startDate: new Date(e.startDate),
        endDate: e.endDate ? new Date(e.endDate) : null,
        location: e.location ?? null,
        status: e.status,
      })
      .returning({ id: events.id })
    await db.insert(eventTranslations).values(
      LOCALES.map((l) => ({
        eventId: id,
        locale: l,
        title: e.translations[l]?.title ?? '',
        description: e.translations[l]?.description ?? '',
      })),
    )
  }
  console.log(`Inserted ${EVENTS.length} events.`)
}

async function insertAnnouncements() {
  for (const a of ANNOUNCEMENTS) {
    const [{ id }] = await db
      .insert(announcements)
      .values({ severity: a.severity, status: a.status })
      .returning({ id: announcements.id })
    await db.insert(announcementTranslations).values(
      LOCALES.map((l) => ({
        announcementId: id,
        locale: l,
        title: a.translations[l]?.title ?? '',
        body: a.translations[l]?.body ?? '',
      })),
    )
  }
  console.log(`Inserted ${ANNOUNCEMENTS.length} announcements.`)
}

async function main() {
  const args = new Set(process.argv.slice(2))
  if (args.has('--reset')) await clear()
  await insertNews()
  await insertEvents()
  await insertAnnouncements()
  console.log('Done.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
