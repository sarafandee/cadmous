'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { listRecentMedia } from '../media/actions'

type Item = {
  id: string
  path: string
  altEn: string
  width: number | null
  height: number | null
  size: number
}

export function MediaPicker({
  value,
  onChange,
  className,
}: {
  value: string
  onChange: (path: string) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Item[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'library' | 'upload' | 'url'>('library')
  const [urlInput, setUrlInput] = useState(value)
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState('')
  const [uploading, setUploading] = useState(false)

  async function loadLibrary() {
    setLoading(true)
    try {
      const rows = await listRecentMedia(60)
      setItems(rows)
    } catch {
      toast.error('Failed to load media library.')
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open && tab === 'library' && items === null) {
      void loadLibrary()
    }
  }, [open, tab, items])

  function pick(path: string) {
    onChange(path)
    setOpen(false)
  }

  async function onUpload() {
    if (!file) {
      toast.error('Pick a file first.')
      return
    }
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('alt', alt)
      const res = await fetch('/admin/api/upload', { method: 'POST', body: form })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        toast.error(j?.error ?? `Upload failed (${res.status})`)
        return
      }
      const j = (await res.json()) as { media: { path: string } }
      toast.success(`Uploaded: ${j.media.path}`)
      // Reset + select
      setFile(null)
      setAlt('')
      setItems(null) // re-fetch on next library view
      pick(j.media.path)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={cn('grid gap-3', className)}>
      <div className="flex items-start gap-4">
        <Thumb path={value} />
        <div className="grid gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
            {value ? 'Replace image' : 'Choose image'}
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-700 hover:text-red-800"
              onClick={() => onChange('')}
            >
              Remove
            </Button>
          )}
          {value && (
            <code className="block max-w-md truncate text-[11px] text-zinc-500">
              {value}
            </code>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose an image</DialogTitle>
            <DialogDescription>
              Pick from your media library, upload a new image, or paste any URL.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={tab} onValueChange={(t) => setTab(t as typeof tab)}>
            <TabsList>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="mt-4">
              {loading && <p className="text-sm text-zinc-500">Loading…</p>}
              {!loading && items && items.length === 0 && (
                <p className="text-sm text-zinc-500">
                  No uploads yet. Use the Upload tab to add one.
                </p>
              )}
              {!loading && items && items.length > 0 && (
                <ul className="grid max-h-[480px] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-5">
                  {items.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => pick(m.path)}
                        className={cn(
                          'block w-full overflow-hidden rounded-md border bg-white transition hover:border-zinc-900',
                          value === m.path ? 'border-zinc-900 ring-2 ring-zinc-900' : 'border-zinc-200',
                        )}
                      >
                        <div className="aspect-square bg-zinc-100">
                          <img src={m.path} alt={m.altEn} className="h-full w-full object-cover" />
                        </div>
                        <div className="px-2 py-1.5 text-left">
                          <p className="truncate text-[10px] text-zinc-500">
                            {m.width}×{m.height} · {Math.round(m.size / 1024)}KB
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="upload" className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="picker-file" className="mb-1.5 block">File</Label>
                <Input
                  id="picker-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <p className="mt-1 text-[11px] text-zinc-500">
                  JPEG, PNG, WebP, or GIF up to 10MB. Auto-resized to 2400px max and converted to WebP.
                </p>
              </div>
              <div>
                <Label htmlFor="picker-alt" className="mb-1.5 block">Alt text (English)</Label>
                <Input
                  id="picker-alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Students working in the STEAM lab"
                />
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={onUpload} disabled={!file || uploading}>
                  {uploading ? 'Uploading…' : 'Upload + use'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="url" className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="picker-url" className="mb-1.5 block">Image URL</Label>
                <Input
                  id="picker-url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <p className="mt-1 text-[11px] text-zinc-500">
                  Paste a full URL or an internal path like /uploads/2026/05/abc.webp.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => pick(urlInput.trim())}
                  disabled={!urlInput.trim()}
                >
                  Use URL
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Thumb({ path }: { path: string }) {
  if (!path) {
    return (
      <div className="grid h-24 w-32 place-items-center rounded-md border border-dashed border-zinc-300 bg-zinc-50 text-[10px] text-zinc-400">
        No image
      </div>
    )
  }
  return (
    <div className="h-24 w-32 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
      <img src={path} alt="" className="h-full w-full object-cover" />
    </div>
  )
}
