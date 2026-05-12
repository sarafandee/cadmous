import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { headers } from 'next/headers'
import sharp from 'sharp'

import { db } from '@/db/client'
import { media } from '@/db/schema/content'
import { auth } from '@/lib/auth'
import { UPLOADS_ROOT, publicPathFor } from '@/lib/uploads/paths'

const MAX_BYTES = 10 * 1024 * 1024 // 10MB
const ACCEPTED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_DIMENSION = 2400

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: 'File too large (max 10MB)' }, { status: 413 })
  }
  if (!ACCEPTED.has(file.type)) {
    return Response.json(
      { error: `Unsupported type: ${file.type}` },
      { status: 415 },
    )
  }

  const input = Buffer.from(await file.arrayBuffer())
  const processed = await sharp(input)
    .rotate() // auto-orient from EXIF, then strip
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer({ resolveWithObject: true })

  const now = new Date()
  const yyyy = String(now.getUTCFullYear())
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const id = crypto.randomUUID()
  const filename = `${id}.webp`
  const dir = path.join(UPLOADS_ROOT, yyyy, mm)
  const absolute = path.join(dir, filename)

  await mkdir(dir, { recursive: true })
  await writeFile(absolute, processed.data)

  const publicPath = publicPathFor(absolute)

  const altRaw = form.get('alt')
  const alt = typeof altRaw === 'string' ? altRaw.slice(0, 280) : ''

  const inserted = await db
    .insert(media)
    .values({
      path: publicPath,
      mime: 'image/webp',
      size: processed.info.size,
      width: processed.info.width,
      height: processed.info.height,
      uploadedBy: session.user.id,
      altEn: alt,
      altAr: '',
      altFr: '',
    })
    .returning()

  return Response.json({ media: inserted[0] })
}
