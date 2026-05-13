'use client'

import React from 'react'

import { FormInput, FormSelect, FormRow } from '../FormField'
import { useFormLabels } from '../labels-context'

export function StepStudentInfo() {
  const l = useFormLabels()
  return (
    <div className="space-y-4">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        {l.studentTitle}
      </h3>

      <FormRow>
        <FormInput name="studentFirstName" label={l.firstName} required />
        <FormInput name="studentMiddleName" label={l.middleName} required />
        <FormInput name="studentFamilyName" label={l.familyName} required />
      </FormRow>

      <FormRow>
        <FormSelect
          name="studentGender"
          label={l.gender}
          required
          options={[
            { label: l.male, value: 'male' },
            { label: l.female, value: 'female' },
          ]}
        />
        <FormInput name="studentDOB" label={l.dob} type="date" required />
      </FormRow>

      <FormRow>
        <FormInput name="studentPlaceOfBirth" label={l.placeOfBirth} required />
        <FormInput name="studentNationality" label={l.nationality} required />
        <FormInput name="studentSecondNationality" label={l.secondNationality} />
      </FormRow>

      <FormRow>
        <FormSelect
          name="requiresTransportation"
          label={l.transportation}
          required
          options={[
            { label: l.yes, value: 'yes' },
            { label: l.no, value: 'no' },
          ]}
        />
        <FormInput name="gradeApplying" label={l.gradeApplying} required />
      </FormRow>
    </div>
  )
}
