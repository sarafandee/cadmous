import { desc, isNotNull, isNull } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/db/client'
import { applications } from '@/db/schema/submissions'
import { auth } from '@/lib/auth'

const COLUMNS = [
  'id',
  'createdAt',
  'studentName',
  'studentGrade',
  'appLang',
  'guardianEmail',
  'guardianPhone',
  'readAt',
  'archivedAt',
] as const

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') {
    return new Response('Unauthorized', { status: 401 })
  }

  const url = new URL(req.url)
  const archived = url.searchParams.get('archived') === '1'

  const rows = await db
    .select()
    .from(applications)
    .where(archived ? isNotNull(applications.archivedAt) : isNull(applications.archivedAt))
    .orderBy(desc(applications.createdAt))

  const lines = [COLUMNS.join(',')]
  for (const r of rows) {
    lines.push(
      COLUMNS.map((c) => {
        const v = r[c]
        return v instanceof Date ? csvEscape(v.toISOString()) : csvEscape(v)
      }).join(','),
    )
  }
  const body = lines.join('\n') + '\n'

  const filename = `cadmous-applications-${new Date().toISOString().slice(0, 10)}.csv`

  return new Response(body, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  })
}
