'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import {
  banUserAction,
  setUserRoleAction,
  unbanUserAction,
} from './actions'

export function UserRowActions({
  userId,
  role,
  banned,
  isSelf,
}: {
  userId: string
  role: string | null
  banned: boolean
  isSelf: boolean
}) {
  const [pending, start] = useTransition()

  function run(fn: () => Promise<{ ok: boolean; error?: string }>, success: string) {
    start(async () => {
      try {
        const r = await fn()
        if (!r.ok) {
          toast.error(r.error ?? 'Failed')
          return
        }
        toast.success(success)
      } catch {
        toast.error('Failed')
      }
    })
  }

  const newRole = role === 'admin' ? 'user' : 'admin'
  const roleLabel = role === 'admin' ? 'Demote to user' : 'Promote to admin'

  return (
    <div className="flex justify-end gap-2">
      {!isSelf && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-xs"
          disabled={pending}
          onClick={() =>
            run(
              () => setUserRoleAction(userId, newRole),
              `Role set to ${newRole}`,
            )
          }
        >
          {roleLabel}
        </Button>
      )}
      {!isSelf &&
        (banned ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            disabled={pending}
            onClick={() => run(() => unbanUserAction(userId), 'Unbanned')}
          >
            Unban
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-red-700"
            disabled={pending}
            onClick={() => run(() => banUserAction(userId), 'Banned')}
          >
            Ban
          </Button>
        ))}
      {isSelf && (
        <span className="text-[11px] text-zinc-500">(you)</span>
      )}
    </div>
  )
}
