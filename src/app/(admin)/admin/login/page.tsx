import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { LoginForm } from './LoginForm'

export const metadata = { title: 'Sign in' }

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user && session.user.role === 'admin') {
    redirect('/admin')
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md flex-col justify-center px-6 py-12">
      <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Cadmous Admin is restricted to authorized staff.
        </p>
        <LoginForm className="mt-6" />
      </div>
    </main>
  )
}
