import { requireAdmin } from '@/lib/admin/require-admin'

export default async function AdminDashboard() {
  const session = await requireAdmin()

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Dashboard
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Welcome, {session.user.name || session.user.email}
      </h1>
      <p className="mt-4 max-w-prose text-zinc-600">
        Authentication is wired. Content management (news, events, announcements,
        divisions, page blocks) lands in the next PRs.
      </p>
    </main>
  )
}
