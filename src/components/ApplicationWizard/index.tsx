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
  appLang?: string
}

export function ApplicationWizard({ locale, appLang }: Props) {
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
    const result = await submitApplication(fullResult.data, locale, appLang ?? locale)
    setSubmitResult(result)
    setIsSubmitting(false)

    if (result.success) {
      clearDraft()
    }
  }, [methods, locale, appLang])

  // Success state
  if (submitResult?.success) {
    return (
      <div className="rounded-[6px] border border-crimson-400 bg-crimson-500/10 p-8 text-white">
        <div className="mb-4 text-3xl">✓</div>
        <h2 className="mb-2 text-2xl font-bold leading-tight tracking-[-0.015em]">
          {t('confirmationTitle')}
        </h2>
        <p className="text-[15px] text-white/80">{t('confirmationMessage')}</p>
        <p className="mt-4 text-[12px] uppercase tracking-[0.06em] text-white/40">
          Application ID: #{submitResult.id}
        </p>
      </div>
    )
  }

  const StepComponent = STEP_COMPONENTS[currentStep]!
  const isLastStep = currentStep === STEP_COMPONENTS.length - 1

  return (
    <div className="w-full">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={STEP_COMPONENTS.length}
        labels={stepLabels}
      />

      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} className="mt-10">
          <StepComponent />

          {submitResult && !submitResult.success && submitResult.errors._form && (
            <div className="mt-4 rounded-[4px] border border-crimson-500 bg-crimson-500/10 p-4 text-[13px] text-crimson-400">
              {submitResult.errors._form}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="rounded-[4px] border border-white/20 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              {tc('previous')}
            </button>

            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-[4px] border border-crimson-500 bg-crimson-500 px-[22px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400 disabled:opacity-50"
              >
                {isSubmitting ? '…' : t('applyNow')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-[4px] border border-crimson-500 bg-crimson-500 px-[22px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400"
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
