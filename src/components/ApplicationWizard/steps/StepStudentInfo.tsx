'use client'

import React from 'react'
import { FormInput, FormSelect, FormRow } from '../FormField'

export function StepStudentInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Student Information</h3>

      <FormRow>
        <FormInput name="studentFirstName" label="First Name" required />
        <FormInput name="studentMiddleName" label="Father's Name / Middle Name" required />
        <FormInput name="studentFamilyName" label="Family Name" required />
      </FormRow>

      <FormRow>
        <FormSelect
          name="studentGender"
          label="Gender"
          required
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <FormInput name="studentDOB" label="Date of Birth" type="date" required />
      </FormRow>

      <FormRow>
        <FormInput name="studentPlaceOfBirth" label="Place of Birth" required />
        <FormInput name="studentNationality" label="Nationality" required />
        <FormInput name="studentSecondNationality" label="Second Nationality" />
      </FormRow>

      <FormRow>
        <FormSelect
          name="requiresTransportation"
          label="Does your child require transportation?"
          required
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
        />
        <FormInput name="gradeApplying" label="Grade Applying For" required />
      </FormRow>
    </div>
  )
}
