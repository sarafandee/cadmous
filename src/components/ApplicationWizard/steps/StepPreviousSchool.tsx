'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormInput, FormSelect, FormRow } from '../FormField'
import { useFormLabels } from '../labels-context'
import type { ApplicationFormData } from '../schema'

export function StepPreviousSchool() {
  const l = useFormLabels()
  const { watch } = useFormContext<ApplicationFormData>()
  const hasSkipped = watch('hasSkippedOrRepeated')
  const hasSpecialNeeds = watch('hasSpecialNeeds')

  return (
    <div className="space-y-4">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        {l.prevSchoolTitle}
      </h3>

      <FormInput name="previousSchool" label={l.previousSchool} />

      <FormRow>
        <FormInput name="previousSchoolCountry" label={l.previousSchoolCountry} />
        <FormInput name="previousGradeLevel" label={l.previousGradeLevel} required />
      </FormRow>

      <FormInput name="languagesSpokenAtHome" label={l.languagesAtHome} required />

      <FormSelect
        name="hasSkippedOrRepeated"
        label={l.skippedOrRepeated}
        required
        options={[
          { label: l.yes, value: 'yes' },
          { label: l.no, value: 'no' },
        ]}
      />
      {hasSkipped === 'yes' && (
        <FormInput
          name="skippedOrRepeatedDetails"
          label={l.pleaseSpecify}
          type="textarea"
        />
      )}

      <FormSelect
        name="hasSpecialNeeds"
        label={l.specialNeeds}
        required
        options={[
          { label: l.yes, value: 'yes' },
          { label: l.no, value: 'no' },
        ]}
      />
      {hasSpecialNeeds === 'yes' && (
        <FormInput name="specialNeedsDetails" label={l.pleaseSpecify} type="textarea" />
      )}
    </div>
  )
}
