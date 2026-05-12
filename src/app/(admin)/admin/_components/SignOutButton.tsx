'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-xs"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await authClient.signOut()
          router.replace('/admin/login')
          router.refresh()
        })
      }
    >
      {pending ? 'Signing out…' : 'Sign out'}
    </Button>
  )
}
