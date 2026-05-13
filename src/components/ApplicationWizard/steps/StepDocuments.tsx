'use client'

import React, { useState } from 'react'

import {
  DOCUMENT_KINDS,
  DOCUMENT_KIND_LABELS,
  MAX_UPLOAD_BYTES,
  type DocumentKind,
} from '@/lib/applications/documents'

export type UploadedDoc = {
  id: string
  kind: DocumentKind
  originalName: string
  mime: string
  size: number
}

type Props = {
  draftId: string
  uploads: UploadedDoc[]
  onAdded: (doc: UploadedDoc) => void
  onRemoved: (id: string) => void
}

const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp'

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function StepDocuments({ draftId, uploads, onAdded, onRemoved }: Props) {
  const [busyKind, setBusyKind] = useState<DocumentKind | null>(null)
  const [errors, setErrors] = useState<Partial<Record<DocumentKind, string>>>({})

  async function handleFile(kind: DocumentKind, file: File) {
    setErrors((e) => ({ ...e, [kind]: undefined }))
    if (file.size > MAX_UPLOAD_BYTES) {
      setErrors((e) => ({
        ...e,
        [kind]: `File too large (max ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))}MB)`,
      }))
      return
    }

    setBusyKind(kind)
    try {
      const form = new FormData()
      form.set('draftId', draftId)
      form.set('kind', kind)
      form.set('file', file)
      const res = await fetch('/api/applications/upload', {
        method: 'POST',
        body: form,
      })
      const json = await res.json()
      if (!res.ok) {
        setErrors((e) => ({ ...e, [kind]: json.error ?? 'Upload failed' }))
        return
      }
      onAdded({
        id: json.id,
        kind: json.kind,
        originalName: json.originalName,
        mime: json.mime,
        size: json.size,
      })
    } catch {
      setErrors((e) => ({ ...e, [kind]: 'Network error — please try again' }))
    } finally {
      setBusyKind(null)
    }
  }

  return (
    <div className="space-y-5">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        Required Documents
      </h3>
      <p className="text-[13px] text-white/60">
        Please upload PDF or image files (JPG / PNG / WebP), max{' '}
        {Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))}MB each. Brevet certificate is
        required only for Grade 11 applicants.
      </p>

      <div className="space-y-3">
        {DOCUMENT_KINDS.map((kind) => {
          const files = uploads.filter((u) => u.kind === kind)
          return (
            <div
              key={kind}
              className="rounded-[6px] border border-white/10 bg-navy-900/40 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[14px] font-semibold text-white">
                    {DOCUMENT_KIND_LABELS[kind]}
                  </div>
                  {files.length === 0 && (
                    <div className="mt-1 text-[12px] text-white/40">
                      No file uploaded
                    </div>
                  )}
                </div>
                <label className="cursor-pointer rounded-[4px] border border-white/20 px-[14px] py-[8px] text-[12px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5">
                  <input
                    type="file"
                    accept={ACCEPT}
                    className="hidden"
                    disabled={busyKind === kind}
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) void handleFile(kind, f)
                      e.target.value = ''
                    }}
                  />
                  {busyKind === kind
                    ? 'Uploading…'
                    : files.length > 0
                      ? '+ Add another'
                      : '+ Upload'}
                </label>
              </div>

              {files.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {files.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between gap-3 rounded-[4px] border border-white/10 bg-navy-800/60 px-3 py-2 text-[12.5px] text-white/80"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="text-crimson-400">✓</span>
                        <span className="truncate">{f.originalName}</span>
                        <span className="shrink-0 text-white/40">
                          ({humanSize(f.size)})
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoved(f.id)}
                        className="shrink-0 text-[12px] font-semibold text-crimson-400 transition hover:text-crimson-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {errors[kind] && (
                <p className="mt-2 text-[11px] text-crimson-400">{errors[kind]}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
