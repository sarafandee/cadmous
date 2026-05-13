import { unlink } from 'node:fs/promises'

import { and, eq, isNull } from 'drizzle-orm'

import { db } from '@/db/client'
import { applicationDocuments } from '@/db/schema/submissions'
import { rateLimit } from '@/lib/submissions/rate-limit'
import { getRequestMeta } from '@/lib/submissions/request-meta'
import { privateAbsolutePathFor } from '@/lib/uploads/paths'

type Ctx = { params: Promise<{ id: string }> }

// Public delete — only works for documents that haven't been linked to
// an application yet (still in draft state). Once submitted, only the
// admin can remove documents.
export async function DELETE(req: Request, ctx: Ctx) {
  const { id } = await ctx.params
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return Response.json({ error: 'Invalid id' }, { status: 400 })
  }

  const url = new URL(req.url)
  const draftId = url.searchParams.get('draftId') ?? ''
  if (!/^[0-9a-f-]{36}$/i.test(draftId)) {
    return Response.json({ error: 'Invalid draft id' }, { status: 400 })
  }

  const meta = await getRequestMeta()
  const limited = rateLimit({
    key: `app-delete:${meta.ipHash ?? 'anon'}`,
    limit: 60,
    windowMs: 60 * 60_000,
  })
  if (!limited.ok) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  const row = await db.query.applicationDocuments.findFirst({
    where: and(
      eq(applicationDocuments.id, id),
      eq(applicationDocuments.draftId, draftId),
      isNull(applicationDocuments.applicationId),
    ),
  })
  if (!row) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    await unlink(privateAbsolutePathFor(row.storedPath))
  } catch {
    // file may already be gone — proceed to delete row
  }
  await db.delete(applicationDocuments).where(eq(applicationDocuments.id, id))

  return Response.json({ ok: true })
}
