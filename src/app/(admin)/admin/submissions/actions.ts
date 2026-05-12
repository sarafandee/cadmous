'use server'

import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@/db/client'
import { applications, contactSubmissions } from '@/db/schema/submissions'
import { writeAudit } from '@/lib/admin/audit'
import { requireAdmin } from '@/lib/admin/require-admin'

type Kind = 'contact' | 'application'

function tableFor(kind: Kind) {
  return kind === 'contact' ? contactSubmissions : applications
}

export async function markRead(kind: Kind, id: string) {
  const session = await requireAdmin()
  const t = tableFor(kind)
  await db
    .update(t)
    .set({ readAt: sql`(cast(unixepoch('subsecond') * 1000 as integer))` })
    .where(eq(t.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'update',
    entityType: `${kind}_submission`,
    entityId: id,
    diff: { readAt: 'set' },
  })
  revalidatePath(`/admin/submissions/${kind === 'contact' ? 'contact' : 'applications'}`)
  revalidatePath(`/admin/submissions/${kind === 'contact' ? 'contact' : 'applications'}/${id}`)
}

export async function markUnread(kind: Kind, id: string) {
  const session = await requireAdmin()
  const t = tableFor(kind)
  await db.update(t).set({ readAt: null }).where(eq(t.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'update',
    entityType: `${kind}_submission`,
    entityId: id,
    diff: { readAt: 'cleared' },
  })
  revalidatePath(`/admin/submissions/${kind === 'contact' ? 'contact' : 'applications'}`)
  revalidatePath(`/admin/submissions/${kind === 'contact' ? 'contact' : 'applications'}/${id}`)
}

export async function archive(kind: Kind, id: string) {
  const session = await requireAdmin()
  const t = tableFor(kind)
  await db
    .update(t)
    .set({ archivedAt: sql`(cast(unixepoch('subsecond') * 1000 as integer))` })
    .where(eq(t.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'update',
    entityType: `${kind}_submission`,
    entityId: id,
    diff: { archivedAt: 'set' },
  })
  revalidatePath(`/admin/submissions/${kind === 'contact' ? 'contact' : 'applications'}`)
}

export async function unarchive(kind: Kind, id: string) {
  const session = await requireAdmin()
  const t = tableFor(kind)
  await db.update(t).set({ archivedAt: null }).where(eq(t.id, id))
  await writeAudit({
    userId: session.user.id,
    action: 'update',
    entityType: `${kind}_submission`,
    entityId: id,
    diff: { archivedAt: 'cleared' },
  })
  revalidatePath(`/admin/submissions/${kind === 'contact' ? 'contact' : 'applications'}`)
}
