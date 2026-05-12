import Link from 'next/link'

import { requireAdmin } from '@/lib/admin/require-admin'
import { NewsForm } from '../_components/NewsForm'

export const metadata = { title: 'New post' }

export default async function NewNewsPage() {
  await requireAdmin()
  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/news" className="text-zinc-500 hover:underline">
          ← News
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">New post</h1>
      <p className="mt-1 max-w-prose text-sm text-zinc-500">
        Fill in English first; Save and use the Translate button on AR/FR to fill the rest from English.
      </p>
      <div className="mt-8">
        <NewsForm mode="create" />
      </div>
    </main>
  )
}
