'use server'

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

  // TODO: wire to your own backend (email, database, etc.)
  console.log('[admissions] submission received (locale=' + locale + '):', parsed.data)

  return { success: true, id: Date.now() }
}
