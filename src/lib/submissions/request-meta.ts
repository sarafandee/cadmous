import 'server-only'

import { createHash } from 'node:crypto'
import { headers } from 'next/headers'

const IP_SALT = process.env.IP_HASH_SALT ?? 'cadmous-dev-salt'

export async function getRequestMeta() {
  const h = await headers()
  const xff = h.get('x-forwarded-for') ?? ''
  const ip = xff.split(',')[0]?.trim() || h.get('x-real-ip') || ''
  const userAgent = h.get('user-agent')?.slice(0, 280) ?? null
  const ipHash = ip
    ? createHash('sha256').update(IP_SALT + ':' + ip).digest('hex').slice(0, 32)
    : null
  return { ip, ipHash, userAgent }
}
