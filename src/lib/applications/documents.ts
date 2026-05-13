export const DOCUMENT_KINDS = [
  'passport',
  'passport_photos',
  'report_card',
  'medical',
  'passing_cert',
  'brevet',
  'other',
] as const

export type DocumentKind = (typeof DOCUMENT_KINDS)[number]

export function isDocumentKind(value: string): value is DocumentKind {
  return (DOCUMENT_KINDS as readonly string[]).includes(value)
}

export const DOCUMENT_KIND_LABELS: Record<DocumentKind, string> = {
  passport: 'Passport copy',
  passport_photos: 'Two passport photographs',
  report_card: 'Previous school report card',
  medical: 'Medical & vaccination report',
  passing_cert: 'Passing certificate (Ministry of Education)',
  brevet: 'Brevet certificate (Grade 11 applicants)',
  other: 'Other supporting document',
}

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024 // 8 MB

export const ALLOWED_UPLOAD_MIME = new Set<string>([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
])

const EXTENSION_BY_MIME: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export function extensionFor(mime: string): string | null {
  return EXTENSION_BY_MIME[mime] ?? null
}

// Lightweight magic-byte sniff to confirm the uploaded bytes match a
// declared MIME. Cheap, no extra deps. Defence in depth on top of the
// allowlist + name extension.
export function detectMime(buf: Uint8Array): string | null {
  if (buf.length < 12) return null
  // PDF: %PDF-
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46 && buf[4] === 0x2d) {
    return 'application/pdf'
  }
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'image/jpeg'
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return 'image/png'
  }
  // WebP: "RIFF"...."WEBP"
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return 'image/webp'
  }
  return null
}
