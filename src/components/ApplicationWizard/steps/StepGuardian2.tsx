'use client'

import React from 'react'

import { FormInput, FormRow } from '../FormField'
import { useFormLabels } from '../labels-context'

export function StepGuardian2() {
  const l = useFormLabels()
  return (
    <div className="space-y-4">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        {l.guardian2Title}
      </h3>
      <p className="text-[13px] text-white/60">{l.guardian2Helper}</p>

      <FormRow>
        <FormInput name="guardian2FullName" label={l.fullName} />
        <FormInput name="guardian2Relationship" label={l.relationship} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2Nationality" label={l.nationality} />
        <FormInput name="guardian2Occupation" label={l.occupation} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2Company" label={l.company} />
        <FormInput name="guardian2BusinessAddress" label={l.businessAddress} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2BusinessEmail" label={l.businessEmail} type="email" />
        <FormInput name="guardian2BusinessPhone" label={l.businessPhone} />
        <FormInput name="guardian2PhoneExtension" label={l.extension} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2HomeAddress" label={l.homeAddress} />
        <FormInput name="guardian2PersonalEmail" label={l.personalEmail} type="email" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian2HomePhone" label={l.homePhone} />
        <FormInput name="guardian2Mobile" label={l.mobile} />
      </FormRow>
    </div>
  )
}
