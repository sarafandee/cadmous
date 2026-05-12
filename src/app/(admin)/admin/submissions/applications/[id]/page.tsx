import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db/client'
import { applications } from '@/db/schema/submissions'
import { requireAdmin } from '@/lib/admin/require-admin'

import { RowActions } from '../../_components/RowActions'

export const metadata = { title: 'Application' }

type Args = { params: Promise<{ id: string }> }

type PayloadShape = Record<string, unknown>

function tryParse(json: string): PayloadShape | null {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

const SECTIONS: { title: string; keys: string[] }[] = [
  {
    title: 'Student',
    keys: [
      'studentFirstName',
      'studentMiddleName',
      'studentFamilyName',
      'studentGender',
      'studentDOB',
      'studentPlaceOfBirth',
      'studentNationality',
      'studentSecondNationality',
      'gradeApplying',
      'requiresTransportation',
    ],
  },
  {
    title: 'Previous school',
    keys: [
      'previousSchool',
      'previousSchoolCountry',
      'previousGradeLevel',
      'languagesSpokenAtHome',
      'hasSkippedOrRepeated',
      'skippedOrRepeatedDetails',
      'hasSpecialNeeds',
      'specialNeedsDetails',
    ],
  },
  {
    title: 'Guardian 1',
    keys: [
      'guardian1FullName',
      'guardian1Relationship',
      'guardian1Nationality',
      'guardian1Occupation',
      'guardian1Company',
      'guardian1BusinessAddress',
      'guardian1BusinessEmail',
      'guardian1BusinessPhone',
      'guardian1HomeAddress',
      'guardian1PersonalEmail',
      'guardian1HomePhone',
      'guardian1Mobile',
    ],
  },
  {
    title: 'Guardian 2',
    keys: [
      'guardian2FullName',
      'guardian2Relationship',
      'guardian2Nationality',
      'guardian2Occupation',
      'guardian2Company',
      'guardian2BusinessAddress',
      'guardian2BusinessEmail',
      'guardian2BusinessPhone',
      'guardian2HomeAddress',
      'guardian2PersonalEmail',
      'guardian2HomePhone',
      'guardian2Mobile',
    ],
  },
  {
    title: 'Family',
    keys: [
      'familyStatus',
      'custodyHolder',
      'hasSiblingsAtCadmous',
      'siblingsAtCadmousYear',
      'emergency1Name',
      'emergency1Relationship',
      'emergency1Phone',
      'emergency2Name',
      'emergency2Relationship',
      'emergency2Phone',
    ],
  },
]

function humanize(key: string) {
  return key
    .replace(/^guardian1/, 'G1 ')
    .replace(/^guardian2/, 'G2 ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
}

export default async function ApplicationDetailPage({ params }: Args) {
  await requireAdmin()
  const { id } = await params
  const row = await db.query.applications.findFirst({ where: eq(applications.id, id) })
  if (!row) notFound()

  const payload = tryParse(row.payload) ?? {}
  const siblings = Array.isArray(payload.siblings) ? (payload.siblings as PayloadShape[]) : []

  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/submissions/applications" className="text-zinc-500 hover:underline">
          ← Applications
        </Link>
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{row.studentName}</h1>
        <RowActions
          kind="application"
          id={row.id}
          isRead={!!row.readAt}
          isArchived={!!row.archivedAt}
        />
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        Applying to {row.studentGrade} ·{' '}
        <span className="font-mono text-xs">{row.appLang}</span>
      </p>

      <dl className="mt-6 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="text-zinc-500">Submitted</dt>
        <dd>{row.createdAt.toISOString().replace('T', ' ').slice(0, 19)} UTC</dd>
        <dt className="text-zinc-500">Guardian email</dt>
        <dd>{row.guardianEmail ?? '—'}</dd>
        <dt className="text-zinc-500">Guardian phone</dt>
        <dd>{row.guardianPhone ?? '—'}</dd>
      </dl>

      {SECTIONS.map((section) => (
        <section key={section.title} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {section.title}
          </h2>
          <div className="mt-3 rounded-lg border border-zinc-200 bg-white">
            <dl className="grid grid-cols-[200px_1fr] divide-y divide-zinc-100 text-sm">
              {section.keys.map((k) => {
                const v = payload[k]
                if (v === undefined || v === '' || v === null) return null
                return (
                  <div key={k} className="contents">
                    <dt className="border-r border-zinc-100 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-500">
                      {humanize(k)}
                    </dt>
                    <dd className="px-4 py-2.5 text-zinc-800">{String(v)}</dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </section>
      ))}

      {siblings.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Siblings
          </h2>
          <ul className="mt-3 grid gap-2">
            {siblings.map((s, i) => (
              <li key={i} className="rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-sm">
                <span className="font-medium">{String(s.name ?? '—')}</span>
                <span className="ms-3 text-zinc-500">
                  Grade {String(s.grade ?? '—')} · {String(s.school ?? '—')} ·{' '}
                  {String(s.academicYear ?? '—')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
