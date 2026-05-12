import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export async function getAdminSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin/login')
  }
  return session
}
