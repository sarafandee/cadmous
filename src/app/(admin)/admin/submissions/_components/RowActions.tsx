'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { archive, markRead, markUnread, unarchive } from '../actions'

type Kind = 'contact' | 'application'

export function RowActions({
  kind,
  id,
  isRead,
  isArchived,
}: {
  kind: Kind
  id: string
  isRead: boolean
  isArchived: boolean
}) {
  const [pending, start] = useTransition()

  function run(fn: () => Promise<void>, success: string) {
    start(async () => {
      try {
        await fn()
        toast.success(success)
      } catch {
        toast.error('Action failed')
      }
    })
  }

  return (
    <div className="flex items-center gap-2">
      {isRead ? (
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={pending}
          onClick={() => run(() => markUnread(kind, id), 'Marked unread')}
        >
          Mark unread
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={pending}
          onClick={() => run(() => markRead(kind, id), 'Marked read')}
        >
          Mark read
        </Button>
      )}
      {isArchived ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={pending}
          onClick={() => run(() => unarchive(kind, id), 'Restored')}
        >
          Restore
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={pending}
          onClick={() => run(() => archive(kind, id), 'Archived')}
        >
          Archive
        </Button>
      )}
    </div>
  )
}
