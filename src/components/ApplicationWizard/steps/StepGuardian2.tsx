'use client'

import React from 'react'
import { FormInput, FormRow } from '../FormField'

export function StepGuardian2() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Guardian 2</h3>
      <p className="text-sm text-gray-500">Optional. Fill in if applicable.</p>

      <FormRow>
        <FormInput name="guardian2FullName" label="Full Name" />
        <FormInput name="guardian2Relationship" label="Relationship to Student" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2Nationality" label="Nationality" />
        <FormInput name="guardian2Occupation" label="Occupation / Job Title" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2Company" label="Company Name" />
        <FormInput name="guardian2BusinessAddress" label="Business Address" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2BusinessEmail" label="Business Email" type="email" />
        <FormInput name="guardian2BusinessPhone" label="Business Phone" />
        <FormInput name="guardian2PhoneExtension" label="Extension" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2HomeAddress" label="Home Address" />
        <FormInput name="guardian2PersonalEmail" label="Personal Email" type="email" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2HomePhone" label="Home Phone" />
        <FormInput name="guardian2Mobile" label="Mobile" />
      </FormRow>
    </div>
  )
}
