import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname } from 'node:path'
import { Readable } from 'node:stream'

import { UPLOADS_ROOT, absolutePathFor } from '@/lib/uploads/paths'

const MIME_BY_EXT: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

type Ctx = { params: Promise<{ path: string[] }> }

export async function GET(_req: Request, ctx: Ctx) {
  const { path: segments } = await ctx.params
  if (!segments || segments.length === 0) {
    return new Response('Not Found', { status: 404 })
  }

  const publicPath = '/uploads/' + segments.join('/')
  const absolute = absolutePathFor(publicPath)

  // Path traversal guard — absolutePathFor uses path.resolve so we re-verify.
  if (!absolute.startsWith(UPLOADS_ROOT + '/') && absolute !== UPLOADS_ROOT) {
    return new Response('Forbidden', { status: 403 })
  }

  try {
    const stats = await stat(absolute)
    if (!stats.isFile()) {
      return new Response('Not Found', { status: 404 })
    }
    const mime = MIME_BY_EXT[extname(absolute).toLowerCase()] ?? 'application/octet-stream'
    const stream = Readable.toWeb(createReadStream(absolute)) as ReadableStream
    return new Response(stream, {
      headers: {
        'content-type': mime,
        'content-length': String(stats.size),
        // UUID-based names — content at a given URL is immutable.
        'cache-control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}
