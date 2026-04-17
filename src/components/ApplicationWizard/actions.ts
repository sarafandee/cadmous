'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { fullApplicationSchema, type ApplicationFormData } from './schema'

export type SubmitResult =
  | { success: true; id: number }
  | { success: false; errors: Record<string, string> }

export async function submitApplication(
  data: ApplicationFormData,
  locale: string,
): Promise<SubmitResult> {
  const parsed = fullApplicationSchema.safeParse(data)

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.')
      errors[path] = issue.message
    }
    return { success: false, errors }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const doc = await payload.create({
      collection: 'application-submissions',
      data: {
        ...parsed.data,
        submissionLocale: locale as 'ar' | 'en' | 'fr',
        status: 'new',
      },
    })

    return { success: true, id: doc.id as number }
  } catch (error) {
    console.error('Application submission error:', error)
    return {
      success: false,
      errors: { _form: 'An error occurred while submitting your application. Please try again.' },
    }
  }
}
