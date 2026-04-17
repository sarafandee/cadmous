import { z } from 'zod'

export const studentInfoSchema = z.object({
  studentFirstName: z.string().min(1, 'Required'),
  studentMiddleName: z.string().min(1, 'Required'),
  studentFamilyName: z.string().min(1, 'Required'),
  studentGender: z.enum(['male', 'female'], { required_error: 'Required' }),
  studentDOB: z.string().min(1, 'Required'),
  studentPlaceOfBirth: z.string().min(1, 'Required'),
  studentNationality: z.string().min(1, 'Required'),
  studentSecondNationality: z.string().optional(),
  requiresTransportation: z.enum(['yes', 'no'], { required_error: 'Required' }),
  gradeApplying: z.string().min(1, 'Required'),
})

export const previousSchoolSchema = z.object({
  previousSchool: z.string().optional(),
  previousSchoolCountry: z.string().optional(),
  previousGradeLevel: z.string().min(1, 'Required'),
  languagesSpokenAtHome: z.string().min(1, 'Required'),
  hasSkippedOrRepeated: z.enum(['yes', 'no'], { required_error: 'Required' }),
  skippedOrRepeatedDetails: z.string().optional(),
  hasSpecialNeeds: z.enum(['yes', 'no'], { required_error: 'Required' }),
  specialNeedsDetails: z.string().optional(),
})

export const guardian1Schema = z.object({
  guardian1FullName: z.string().min(1, 'Required'),
  guardian1Relationship: z.string().min(1, 'Required'),
  guardian1Nationality: z.string().min(1, 'Required'),
  guardian1Occupation: z.string().optional(),
  guardian1Company: z.string().optional(),
  guardian1BusinessAddress: z.string().optional(),
  guardian1BusinessEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  guardian1BusinessPhone: z.string().optional(),
  guardian1PhoneExtension: z.string().optional(),
  guardian1HomeAddress: z.string().optional(),
  guardian1PersonalEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  guardian1HomePhone: z.string().min(1, 'Required'),
  guardian1Mobile: z.string().min(1, 'Required'),
  guardian1ReceiveSMS: z.enum(['yes', 'no']).optional(),
})

export const guardian2Schema = z.object({
  guardian2FullName: z.string().optional(),
  guardian2Relationship: z.string().optional(),
  guardian2Nationality: z.string().optional(),
  guardian2Occupation: z.string().optional(),
  guardian2Company: z.string().optional(),
  guardian2BusinessAddress: z.string().optional(),
  guardian2BusinessEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  guardian2BusinessPhone: z.string().optional(),
  guardian2PhoneExtension: z.string().optional(),
  guardian2HomeAddress: z.string().optional(),
  guardian2PersonalEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  guardian2HomePhone: z.string().optional(),
  guardian2Mobile: z.string().optional(),
})

const siblingSchema = z.object({
  name: z.string().optional(),
  grade: z.string().optional(),
  school: z.string().optional(),
  academicYear: z.string().optional(),
})

export const familySchema = z.object({
  selectGuardian: z.enum(['guardian1', 'guardian2']).optional(),
  familyStatus: z.enum(['married', 'separated', 'divorced', 'widowed']).optional(),
  custodyHolder: z.enum(['guardian1', 'guardian2', 'shared']).optional(),
  siblings: z.array(siblingSchema).optional(),
  hasSiblingsAtCadmous: z.enum(['yes', 'no']).optional(),
  siblingsAtCadmousYear: z.string().optional(),
  emergency1Name: z.string().min(1, 'Required'),
  emergency1Relationship: z.string().min(1, 'Required'),
  emergency1Phone: z.string().min(1, 'Required'),
  emergency2Name: z.string().min(1, 'Required'),
  emergency2Relationship: z.string().min(1, 'Required'),
  emergency2Phone: z.string().min(1, 'Required'),
})

export const confirmationSchema = z.object({
  confirmationAcknowledged: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm the information is accurate' }),
  }),
})

export const fullApplicationSchema = studentInfoSchema
  .merge(previousSchoolSchema)
  .merge(guardian1Schema)
  .merge(guardian2Schema)
  .merge(familySchema)
  .merge(confirmationSchema)

export type ApplicationFormData = z.infer<typeof fullApplicationSchema>

export const stepSchemas = [
  studentInfoSchema,
  previousSchoolSchema,
  guardian1Schema,
  guardian2Schema,
  familySchema,
  confirmationSchema,
] as const

export const DRAFT_STORAGE_KEY = 'cadmous-application-draft'
export const DRAFT_SCHEMA_VERSION = 1
