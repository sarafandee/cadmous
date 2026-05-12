import 'server-only'

/**
 * Token-bucket-ish rate limiter that lives in-memory. Resets on every
 * container restart — fine for the small surface area we expose (two public
 * forms). If we ever see abuse beyond this, swap the backing store for the
 * SQLite DB.
 */

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfterMs: existing.resetAt - now }
  }

  existing.count += 1
  return { ok: true }
}
