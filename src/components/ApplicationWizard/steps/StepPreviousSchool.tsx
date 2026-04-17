'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormInput, FormSelect, FormRow } from '../FormField'
import type { ApplicationFormData } from '../schema'

export function StepPreviousSchool() {
  const { watch } = useFormContext<ApplicationFormData>()
  const hasSkipped = watch('hasSkippedOrRepeated')
  const hasSpecialNeeds = watch('hasSpecialNeeds')

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Previous School Information</h3>

      <FormInput name="previousSchool" label="Previous School" />

      <FormRow>
        <FormInput name="previousSchoolCountry" label="Country of Previous School" />
        <FormInput name="previousGradeLevel" label="Previous Grade/Level Attended" required />
      </FormRow>

      <FormInput name="languagesSpokenAtHome" label="Languages Spoken at Home" required />

      <FormSelect
        name="hasSkippedOrRepeated"
        label="Has your child ever skipped or been asked to repeat a year?"
        required
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
      />
      {hasSkipped === 'yes' && (
        <FormInput name="skippedOrRepeatedDetails" label="Please specify" type="textarea" />
      )}

      <FormSelect
        name="hasSpecialNeeds"
        label="Has your child been involved in any advanced, gifted, or special needs program?"
        required
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
      />
      {hasSpecialNeeds === 'yes' && (
        <FormInput name="specialNeedsDetails" label="Please specify" type="textarea" />
      )}
    </div>
  )
}
