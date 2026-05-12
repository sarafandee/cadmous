'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Uploader() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState('')
  const [uploading, setUploading] = useState(false)

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
        const json = await res.json().catch(() => null)
        toast.error(json?.error ?? `Upload failed (${res.status})`)
        return
      }
      const json = (await res.json()) as { media: { path: string } }
      toast.success(`Uploaded: ${json.media.path}`)
      setFile(null)
      setAlt('')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-zinc-700">Upload image</h2>
      <p className="mt-1 text-xs text-zinc-500">
        JPEG, PNG, WebP or GIF, max 10MB. Stored as WebP under /uploads/.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="grid gap-3">
          <div>
            <Label htmlFor="file" className="mb-1.5 block">File</Label>
            <Input
              id="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <Label htmlFor="alt" className="mb-1.5 block">Alt text (English)</Label>
            <Input
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Students working in the STEAM lab"
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button onClick={onUpload} disabled={!file || uploading}>
            {uploading ? 'Uploading…' : 'Upload'}
          </Button>
        </div>
      </div>
    </section>
  )
}
