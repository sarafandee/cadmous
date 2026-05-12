import { desc } from 'drizzle-orm'

import { db } from '@/db/client'
import { media } from '@/db/schema/content'
import { requireAdmin } from '@/lib/admin/require-admin'

import { Uploader } from './Uploader'

export const metadata = { title: 'Media' }

export default async function MediaPage() {
  await requireAdmin()
  const items = await db.query.media.findMany({
    orderBy: [desc(media.createdAt)],
    limit: 60,
  })

  return (
    <main>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Library
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Media</h1>
      <p className="mt-1 max-w-prose text-sm text-zinc-500">
        Images uploaded here are resized to a 2400px maximum dimension and converted to
        WebP. Copy a path and paste it into a news/event image field.
      </p>

      <div className="mt-8 grid gap-8">
        <Uploader />

        <section>
          <h2 className="mb-3 text-sm font-semibold text-zinc-700">Recent uploads</h2>
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500">No uploads yet.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((m) => (
                <li
                  key={m.id}
                  className="overflow-hidden rounded-lg border border-zinc-200 bg-white"
                >
                  <div className="aspect-square bg-zinc-100">
                    <img
                      src={m.path}
                      alt={m.altEn}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <code className="block truncate text-[11px] text-zinc-600">{m.path}</code>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {m.width}×{m.height} · {Math.round(m.size / 1024)}KB
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
