'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Required'),
  website: z.string().max(0, 'Invalid submission').optional(), // honeypot
})

export type ContactResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string,
    website: formData.get('website') as string,
  }

  // Honeypot check
  if (raw.website) {
    return { success: false, error: 'Invalid submission' }
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Validation failed' }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'contact-inquiries',
      data: parsed.data,
    })

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'An error occurred. Please try again.' }
  }
}
