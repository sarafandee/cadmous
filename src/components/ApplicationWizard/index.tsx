'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import {
  stepSchemas,
  fullApplicationSchema,
  type ApplicationFormData,
  DRAFT_STORAGE_KEY,
  DRAFT_SCHEMA_VERSION,
} from './schema'
import { submitApplication, type SubmitResult } from './actions'
import { StepStudentInfo } from './steps/StepStudentInfo'
import { StepPreviousSchool } from './steps/StepPreviousSchool'
import { StepGuardian1 } from './steps/StepGuardian1'
import { StepGuardian2 } from './steps/StepGuardian2'
import { StepFamily } from './steps/StepFamily'
import { StepConfirmation } from './steps/StepConfirmation'
import { ProgressBar } from './ProgressBar'

const STEP_COMPONENTS = [
  StepStudentInfo,
  StepPreviousSchool,
  StepGuardian1,
  StepGuardian2,
  StepFamily,
  StepConfirmation,
]

type DraftData = {
  version: number
  step: number
  data: Partial<ApplicationFormData>
}

function loadDraft(): DraftData | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version !== DRAFT_SCHEMA_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function saveDraft(step: number, data: Partial<ApplicationFormData>) {
  try {
    const draft: DraftData = { version: DRAFT_SCHEMA_VERSION, step, data }
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // sessionStorage unavailable (Safari private browsing) - degrade silently
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY)
  } catch {
    // ignore
  }
}

type Props = {
  locale: string
}

export function ApplicationWizard({ locale }: Props) {
  const t = useTranslations('admissions')
  const tc = useTranslations('common')
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(fullApplicationSchema),
    mode: 'onTouched',
    defaultValues: {
      siblings: [],
    },
  })

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft()
    if (draft) {
      methods.reset(draft.data as ApplicationFormData)
      setCurrentStep(draft.step)
    }
  }, [methods])

  // Save draft on data change
  const watchedData = methods.watch()
  useEffect(() => {
    if (currentStep < STEP_COMPONENTS.length - 1) {
      saveDraft(currentStep, watchedData)
    }
  }, [watchedData, currentStep])

  const stepLabels = [
    t('studentInfo'),
    t('previousSchool'),
    t('guardian1'),
    t('guardian2'),
    t('siblingsEmergency'),
    t('review'),
  ]

  const handleNext = useCallback(async () => {
    const schema = stepSchemas[currentStep]
    if (!schema) return

    const values = methods.getValues()
    const result = schema.safeParse(values)

    if (!result.success) {
      // Trigger validation on current step's fields
      const fieldNames = Object.keys(schema.shape) as (keyof ApplicationFormData)[]
      for (const field of fieldNames) {
        await methods.trigger(field)
      }
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEP_COMPONENTS.length - 1))
  }, [currentStep, methods])

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const handleSubmit = useCallback(async () => {
    const values = methods.getValues()

    // Validate confirmation checkbox
    const confirmResult = stepSchemas[5]!.safeParse(values)
    if (!confirmResult.success) {
      await methods.trigger('confirmationAcknowledged')
      return
    }

    // Validate full form
    const fullResult = fullApplicationSchema.safeParse(values)
    if (!fullResult.success) {
      const firstErrorField = fullResult.error.issues[0]?.path[0] as string
      // Find which step this field belongs to
      for (let i = 0; i < stepSchemas.length; i++) {
        if (firstErrorField in stepSchemas[i]!.shape) {
          setCurrentStep(i)
          break
        }
      }
      methods.trigger()
      return
    }

    setIsSubmitting(true)
    const result = await submitApplication(fullResult.data, locale)
    setSubmitResult(result)
    setIsSubmitting(false)

    if (result.success) {
      clearDraft()
    }
  }, [methods, locale])

  // Success state
  if (submitResult?.success) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <div className="mb-6 text-5xl">✓</div>
        <h2 className="mb-4 text-3xl font-bold">{t('confirmationTitle')}</h2>
        <p className="text-lg text-gray-600">{t('confirmationMessage')}</p>
        <p className="mt-4 text-sm text-gray-500">
          Application ID: #{submitResult.id}
        </p>
      </div>
    )
  }

  const StepComponent = STEP_COMPONENTS[currentStep]!
  const isLastStep = currentStep === STEP_COMPONENTS.length - 1

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={STEP_COMPONENTS.length}
        labels={stepLabels}
      />

      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8">
          <StepComponent />

          {/* Form-level error */}
          {submitResult && !submitResult.success && submitResult.errors._form && (
            <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
              {submitResult.errors._form}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="rounded-md border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {tc('previous')}
            </button>

            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-md bg-blue-900 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {isSubmitting ? '...' : t('applyNow')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-md bg-blue-900 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                {tc('next')}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
