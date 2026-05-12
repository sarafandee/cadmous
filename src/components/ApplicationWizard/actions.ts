'use server'

import { db } from '@/db/client'
import { applications } from '@/db/schema/submissions'
import { rateLimit } from '@/lib/submissions/rate-limit'
import { getRequestMeta } from '@/lib/submissions/request-meta'

import { fullApplicationSchema, type ApplicationFormData } from './schema'

export type SubmitResult =
  | { success: true; id: string }
  | { success: false; errors: Record<string, string> }

export async function submitApplication(
  data: ApplicationFormData,
  locale: string,
  appLang: string = locale,
): Promise<SubmitResult> {
  const parsed = fullApplicationSchema.safeParse(data)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      errors[issue.path.join('.')] = issue.message
    }
    return { success: false, errors }
  }

  const meta = await getRequestMeta()
  const limited = rateLimit({
    key: `application:${meta.ipHash ?? 'anon'}`,
    limit: 3,
    windowMs: 60 * 60_000,
  })
  if (!limited.ok) {
    return {
      success: false,
      errors: {
        _form: 'Too many submissions from this network. Please try again later.',
      },
    }
  }

  const studentName = [
    parsed.data.studentFirstName,
    parsed.data.studentMiddleName,
    parsed.data.studentFamilyName,
  ]
    .filter(Boolean)
    .join(' ')

  const inserted = await db
    .insert(applications)
    .values({
      payload: JSON.stringify(parsed.data),
      studentName,
      studentGrade: parsed.data.gradeApplying,
      guardianEmail:
        parsed.data.guardian1PersonalEmail ||
        parsed.data.guardian1BusinessEmail ||
        null,
      guardianPhone: parsed.data.guardian1Mobile || parsed.data.guardian1HomePhone || null,
      applicantLocale: locale.slice(0, 5),
      appLang: appLang.slice(0, 5),
      ipHash: meta.ipHash,
      userAgent: meta.userAgent,
    })
    .returning({ id: applications.id })

  return { success: true, id: inserted[0].id }
}
