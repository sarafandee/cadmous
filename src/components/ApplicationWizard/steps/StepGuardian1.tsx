'use client'

import React from 'react'
import { FormInput, FormSelect, FormRow } from '../FormField'

export function StepGuardian1() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Guardian 1</h3>
      <p className="text-sm text-gray-500">
        The first guardian to whom school reports and correspondence will be addressed.
      </p>

      <FormRow>
        <FormInput name="guardian1FullName" label="Full Name" required />
        <FormInput name="guardian1Relationship" label="Relationship to Student" required />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1Nationality" label="Nationality" required />
        <FormInput name="guardian1Occupation" label="Occupation / Job Title" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1Company" label="Company Name" />
        <FormInput name="guardian1BusinessAddress" label="Business Address" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1BusinessEmail" label="Business Email" type="email" />
        <FormInput name="guardian1BusinessPhone" label="Business Phone" />
        <FormInput name="guardian1PhoneExtension" label="Extension" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1HomeAddress" label="Home Address" />
        <FormInput name="guardian1PersonalEmail" label="Personal Email" type="email" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1HomePhone" label="Home Phone" required />
        <FormInput name="guardian1Mobile" label="Mobile" required />
      </FormRow>

      <FormSelect
        name="guardian1ReceiveSMS"
        label="Receive school-related SMS/WhatsApp on mobile?"
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
      />
    </div>
  )
}
