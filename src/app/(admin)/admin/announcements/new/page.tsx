import Link from 'next/link'

import { requireAdmin } from '@/lib/admin/require-admin'
import { AnnouncementForm } from '../_components/AnnouncementForm'

export const metadata = { title: 'New announcement' }

export default async function NewAnnouncementPage() {
  await requireAdmin()
  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/announcements" className="text-zinc-500 hover:underline">← Announcements</Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">New announcement</h1>
      <div className="mt-8">
        <AnnouncementForm mode="create" />
      </div>
    </main>
  )
}
