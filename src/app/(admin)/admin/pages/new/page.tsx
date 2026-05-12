import Link from 'next/link'

import { requireAdmin } from '@/lib/admin/require-admin'
import { PageForm } from '../_components/PageForm'

export const metadata = { title: 'New page' }

export default async function NewPagePage() {
  await requireAdmin()
  return (
    <main>
      <p className="text-xs">
        <Link href="/admin/pages" className="text-zinc-500 hover:underline">
          ← Pages
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">New page</h1>
      <p className="mt-1 max-w-prose text-sm text-zinc-500">
        Slug becomes the public URL (<code className="font-mono">/your-slug</code> for EN,
        <code className="font-mono">/ar/your-slug</code> for AR, etc.). Fill English first;
        AR/FR can be auto-filled from English using the Translate button.
      </p>
      <div className="mt-8">
        <PageForm mode="create" />
      </div>
    </main>
  )
}
