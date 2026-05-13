import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'

import { eq } from 'drizzle-orm'
import { Readable } from 'node:stream'

import { db } from '@/db/client'
import { applicationDocuments } from '@/db/schema/submissions'
import { requireAdmin } from '@/lib/admin/require-admin'
import { privateAbsolutePathFor } from '@/lib/uploads/paths'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, ctx: Ctx) {
  await requireAdmin()
  const { id } = await ctx.params
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return new Response('Bad Request', { status: 400 })
  }

  const row = await db.query.applicationDocuments.findFirst({
    where: eq(applicationDocuments.id, id),
  })
  if (!row) return new Response('Not Found', { status: 404 })

  const absolute = privateAbsolutePathFor(row.storedPath)
  let size: number
  try {
    const stats = await stat(absolute)
    if (!stats.isFile()) return new Response('Not Found', { status: 404 })
    size = stats.size
  } catch {
    return new Response('Not Found', { status: 404 })
  }

  const stream = Readable.toWeb(createReadStream(absolute)) as ReadableStream
  // Use Content-Disposition: attachment so admin browsers always
  // download rather than execute/render. Quote-escape the filename.
  const safeName = row.originalName.replace(/"/g, '')
  return new Response(stream, {
    headers: {
      'content-type': row.mime,
      'content-length': String(size),
      'content-disposition': `attachment; filename="${safeName}"`,
      'cache-control': 'private, no-store',
    },
  })
}
