'use server'

import { desc } from 'drizzle-orm'

import { db } from '@/db/client'
import { media } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

export async function listRecentMedia(limit = 60) {
  await requireAdmin()
  const rows = await db.query.media.findMany({
    orderBy: [desc(media.createdAt)],
    limit,
    columns: {
      id: true,
      path: true,
      altEn: true,
      width: true,
      height: true,
      size: true,
    },
  })
  return rows
}
