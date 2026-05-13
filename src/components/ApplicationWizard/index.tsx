'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormLabelsProvider } from './labels-context'
import { FORM_LABELS, isAppLang, type AppLang } from './labels'
import {
  stepSchemas,
  fullApplicationSchema,
  type ApplicationFormData,
  DRAFT_STORAGE_KEY,
  DRAFT_SCHEMA_VERSION,
  DRAFT_ID_STORAGE_KEY,
} from './schema'
import { submitApplication, type SubmitResult } from './actions'
import { StepStudentInfo } from './steps/StepStudentInfo'
import { StepPreviousSchool } from './steps/StepPreviousSchool'
import { StepGuardian1 } from './steps/StepGuardian1'
import { StepGuardian2 } from './steps/StepGuardian2'
import { StepFamily } from './steps/StepFamily'
import { StepDocuments, type UploadedDoc } from './steps/StepDocuments'
import { StepConfirmation } from './steps/StepConfirmation'
import { ProgressBar } from './ProgressBar'

type DraftData = {
  version: number
  step: number
  data: Partial<ApplicationFormData>
  uploads?: UploadedDoc[]
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

function saveDraft(
  step: number,
  data: Partial<ApplicationFormData>,
  uploads: UploadedDoc[],
) {
  try {
    const draft: DraftData = { version: DRAFT_SCHEMA_VERSION, step, data, uploads }
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // sessionStorage unavailable (Safari private browsing) - degrade silently
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY)
    sessionStorage.removeItem(DRAFT_ID_STORAGE_KEY)
  } catch {
    // ignore
  }
}

function getOrCreateDraftId(): string {
  try {
    const existing = sessionStorage.getItem(DRAFT_ID_STORAGE_KEY)
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing
  } catch {
    // sessionStorage unavailable
  }
  const id = crypto.randomUUID()
  try {
    sessionStorage.setItem(DRAFT_ID_STORAGE_KEY, id)
  } catch {
    // ignore
  }
  return id
}

type Props = {
  locale: string
  appLang?: string
}

export function ApplicationWizard({ locale, appLang }: Props) {
  const resolvedAppLang: AppLang = isAppLang(appLang ?? '') ? (appLang as AppLang) : 'en'
  const labels = FORM_LABELS[resolvedAppLang]
  const dir = resolvedAppLang === 'ar' ? 'rtl' : 'ltr'
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)
  const [draftId, setDraftId] = useState<string>('')
  const [uploads, setUploads] = useState<UploadedDoc[]>([])

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(fullApplicationSchema),
    mode: 'onTouched',
    defaultValues: {
      siblings: [],
    },
  })

  // Initialise draftId and load draft on mount.
  useEffect(() => {
    setDraftId(getOrCreateDraftId())
    const draft = loadDraft()
    if (draft) {
      methods.reset(draft.data as ApplicationFormData)
      setCurrentStep(draft.step)
      if (draft.uploads) setUploads(draft.uploads)
    }
  }, [methods])

  const watchedData = methods.watch()
  useEffect(() => {
    saveDraft(currentStep, watchedData, uploads)
  }, [watchedData, currentStep, uploads])

  const stepLabels = [
    labels.stepStudent,
    labels.stepPreviousSchool,
    labels.stepGuardian1,
    labels.stepGuardian2,
    labels.stepFamily,
    labels.stepDocuments,
    labels.stepReview,
  ]
  const totalSteps = stepLabels.length

  const handleNext = useCallback(async () => {
    const schema = stepSchemas[currentStep]
    if (!schema) return

    const values = methods.getValues()
    const result = schema.safeParse(values)

    if (!result.success) {
      const fieldNames = Object.keys(schema.shape) as (keyof ApplicationFormData)[]
      for (const field of fieldNames) {
        await methods.trigger(field)
      }
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
  }, [currentStep, methods, totalSteps])

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const handleSubmit = useCallback(async () => {
    const values = methods.getValues()

    const confirmIndex = totalSteps - 1
    const confirmResult = stepSchemas[confirmIndex]!.safeParse(values)
    if (!confirmResult.success) {
      await methods.trigger('confirmationAcknowledged')
      return
    }

    const fullResult = fullApplicationSchema.safeParse(values)
    if (!fullResult.success) {
      const firstErrorField = fullResult.error.issues[0]?.path[0] as string
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
    const result = await submitApplication(
      fullResult.data,
      locale,
      appLang ?? locale,
      draftId,
    )
    setSubmitResult(result)
    setIsSubmitting(false)

    if (result.success) {
      clearDraft()
    }
  }, [methods, locale, appLang, draftId, totalSteps])

  const handleDocAdded = useCallback((doc: UploadedDoc) => {
    setUploads((prev) => [...prev, doc])
  }, [])

  const handleDocRemoved = useCallback(
    async (id: string) => {
      if (!draftId) return
      try {
        await fetch(`/api/applications/upload/${id}?draftId=${encodeURIComponent(draftId)}`, {
          method: 'DELETE',
        })
      } catch {
        // network failure — still drop from UI so user can re-upload
      }
      setUploads((prev) => prev.filter((u) => u.id !== id))
    },
    [draftId],
  )

  if (submitResult?.success) {
    return (
      <div
        dir={dir}
        className="rounded-[6px] border border-crimson-400 bg-crimson-500/10 p-8 text-white"
      >
        <div className="mb-4 text-3xl">✓</div>
        <h2 className="mb-2 text-2xl font-bold leading-tight tracking-[-0.015em]">
          {labels.successTitle}
        </h2>
        <p className="text-[15px] text-white/80">{labels.successMessage}</p>
        <p className="mt-4 text-[12px] uppercase tracking-[0.06em] text-white/40">
          {labels.applicationId}: #{submitResult.id}
        </p>
      </div>
    )
  }

  const isDocsStep = currentStep === totalSteps - 2
  const isLastStep = currentStep === totalSteps - 1

  return (
    <FormLabelsProvider appLang={resolvedAppLang}>
      <div dir={dir} className="w-full">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          labels={stepLabels}
        />

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10">
            {currentStep === 0 && <StepStudentInfo />}
            {currentStep === 1 && <StepPreviousSchool />}
            {currentStep === 2 && <StepGuardian1 />}
            {currentStep === 3 && <StepGuardian2 />}
            {currentStep === 4 && <StepFamily />}
            {isDocsStep && draftId && (
              <StepDocuments
                draftId={draftId}
                uploads={uploads}
                onAdded={handleDocAdded}
                onRemoved={handleDocRemoved}
              />
            )}
            {isLastStep && <StepConfirmation uploads={uploads} />}

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
                {labels.previous}
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-[4px] border border-crimson-500 bg-crimson-500 px-[22px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400 disabled:opacity-50"
                >
                  {isSubmitting ? '…' : labels.submit}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-[4px] border border-crimson-500 bg-crimson-500 px-[22px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400"
                >
                  {labels.next}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </FormLabelsProvider>
  )
}
