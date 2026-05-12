'use server'

import { z } from 'zod'

import { db } from '@/db/client'
import { contactSubmissions } from '@/db/schema/submissions'
import { rateLimit } from '@/lib/submissions/rate-limit'
import { getRequestMeta } from '@/lib/submissions/request-meta'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(200),
  email: z.string().trim().email('Invalid email').max(200),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1, 'Required').max(5000),
  website: z.string().max(0, 'Invalid submission').optional(), // honeypot
})

export type ContactResult = { success: true } | { success: false; error: string }

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  const raw = {
    name: (formData.get('name') ?? '') as string,
    email: (formData.get('email') ?? '') as string,
    phone: (formData.get('phone') ?? '') as string,
    message: (formData.get('message') ?? '') as string,
    website: (formData.get('website') ?? '') as string,
    locale: ((formData.get('locale') ?? 'en') as string).slice(0, 5),
  }

  if (raw.website) {
    return { success: false, error: 'Invalid submission' }
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  const meta = await getRequestMeta()
  const limited = rateLimit({
    key: `contact:${meta.ipHash ?? 'anon'}`,
    limit: 5,
    windowMs: 5 * 60_000,
  })
  if (!limited.ok) {
    return {
      success: false,
      error: 'Too many submissions. Please try again later.',
    }
  }

  await db.insert(contactSubmissions).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message,
    locale: raw.locale,
    ipHash: meta.ipHash,
    userAgent: meta.userAgent,
  })

  return { success: true }
}
