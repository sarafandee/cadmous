'use client'

import React from 'react'

import { FormInput, FormSelect, FormRow } from '../FormField'
import { useFormLabels } from '../labels-context'

export function StepGuardian1() {
  const l = useFormLabels()
  return (
    <div className="space-y-4">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        {l.guardian1Title}
      </h3>
      <p className="text-[13px] text-white/60">{l.guardian1Helper}</p>

      <FormRow>
        <FormInput name="guardian1FullName" label={l.fullName} required />
        <FormInput name="guardian1Relationship" label={l.relationship} required />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1Nationality" label={l.nationality} required />
        <FormInput name="guardian1Occupation" label={l.occupation} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1Company" label={l.company} />
        <FormInput name="guardian1BusinessAddress" label={l.businessAddress} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1BusinessEmail" label={l.businessEmail} type="email" />
        <FormInput name="guardian1BusinessPhone" label={l.businessPhone} />
        <FormInput name="guardian1PhoneExtension" label={l.extension} />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1HomeAddress" label={l.homeAddress} />
        <FormInput name="guardian1PersonalEmail" label={l.personalEmail} type="email" />
      </FormRow>

      <FormRow>
        <FormInput name="guardian1HomePhone" label={l.homePhone} required />
        <FormInput name="guardian1Mobile" label={l.mobile} required />
      </FormRow>

      <FormSelect
        name="guardian1ReceiveSMS"
        label={l.receiveSMS}
        options={[
          { label: l.yes, value: 'yes' },
          { label: l.no, value: 'no' },
        ]}
      />
    </div>
  )
}
