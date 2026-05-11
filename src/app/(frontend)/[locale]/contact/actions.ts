'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Required'),
  website: z.string().max(0, 'Invalid submission').optional(), // honeypot
})

export type ContactResult = { success: true } | { success: false; error: string }

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string,
    website: formData.get('website') as string,
  }

  if (raw.website) {
    return { success: false, error: 'Invalid submission' }
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  // TODO: wire to your own backend (email, database, etc.)
  // For now this just logs the submission server-side.
  console.log('[contact] submission received:', parsed.data)

  return { success: true }
}
