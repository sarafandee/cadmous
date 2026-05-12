import 'server-only'

import { db } from '@/db/client'
import { auditLog } from '@/db/schema/content'

type AuditAction = 'create' | 'update' | 'delete' | 'publish' | 'unpublish'

type WriteAudit = {
  userId: string | null
  action: AuditAction
  entityType: string
  entityId: string
  diff?: Record<string, unknown>
}

export async function writeAudit({ userId, action, entityType, entityId, diff }: WriteAudit) {
  await db.insert(auditLog).values({
    userId,
    action,
    entityType,
    entityId,
    diff: diff ? JSON.stringify(diff) : null,
  })
}
