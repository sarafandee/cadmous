import Link from 'next/link'

import { requireAdmin } from '@/lib/admin/require-admin'
import { EventForm } from '../_components/EventForm'

export const metadata = { title: 'New event' }

export default async function NewEventPage() {
  await requireAdmin()
  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/events" className="text-zinc-500 hover:underline">← Events</Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">New event</h1>
      <div className="mt-8">
        <EventForm mode="create" />
      </div>
    </main>
  )
}
