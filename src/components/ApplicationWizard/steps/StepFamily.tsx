'use client'

import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

import { FormInput, FormSelect, FormRow } from '../FormField'
import { useFormLabels } from '../labels-context'
import type { ApplicationFormData } from '../schema'

export function StepFamily() {
  const l = useFormLabels()
  const { watch, control } = useFormContext<ApplicationFormData>()
  const familyStatus = watch('familyStatus')
  const hasSiblingsAtCadmous = watch('hasSiblingsAtCadmous')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'siblings',
  })

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
          {l.familyTitle}
        </h3>

        <FormRow>
          <FormSelect
            name="selectGuardian"
            label={l.guardianForCorrespondence}
            options={[
              { label: l.guardian1Option, value: 'guardian1' },
              { label: l.guardian2Option, value: 'guardian2' },
            ]}
          />
          <FormSelect
            name="familyStatus"
            label={l.familyStatus}
            options={[
              { label: l.married, value: 'married' },
              { label: l.separated, value: 'separated' },
              { label: l.divorced, value: 'divorced' },
              { label: l.widowed, value: 'widowed' },
            ]}
          />
        </FormRow>

        {(familyStatus === 'separated' || familyStatus === 'divorced') && (
          <FormSelect
            name="custodyHolder"
            label={l.custodyHolder}
            options={[
              { label: l.guardian1Option, value: 'guardian1' },
              { label: l.guardian2Option, value: 'guardian2' },
              { label: l.shared, value: 'shared' },
            ]}
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-white">
            {l.otherChildren}
          </h4>
          {fields.length < 5 && (
            <button
              type="button"
              onClick={() => append({ name: '', grade: '', school: '', academicYear: '' })}
              className="rounded-[4px] border border-white/20 px-[14px] py-[8px] text-[12px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {l.addChild}
            </button>
          )}
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
                {l.child} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-[12px] font-semibold text-crimson-400 transition hover:text-crimson-500"
              >
                {l.remove}
              </button>
            </div>
            <FormRow>
              <FormInput name={`siblings.${index}.name`} label={l.name} />
              <FormInput name={`siblings.${index}.grade`} label={l.grade} />
            </FormRow>
            <div className="mt-3">
              <FormRow>
                <FormInput name={`siblings.${index}.school`} label={l.school} />
                <FormInput name={`siblings.${index}.academicYear`} label={l.academicYear} />
              </FormRow>
            </div>
          </div>
        ))}

        <FormRow>
          <FormSelect
            name="hasSiblingsAtCadmous"
            label={l.siblingsAtCadmous}
            options={[
              { label: l.yes, value: 'yes' },
              { label: l.no, value: 'no' },
            ]}
          />
        </FormRow>
        {hasSiblingsAtCadmous === 'yes' && (
          <FormInput name="siblingsAtCadmousYear" label={l.siblingsAtCadmousYear} />
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-white">
          {l.emergencyContacts}
        </h4>
        <p className="text-[13px] text-white/60">{l.emergencyHelper}</p>

        <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
            {l.contact} 1
          </span>
          <FormRow>
            <FormInput name="emergency1Name" label={l.name} required />
            <FormInput name="emergency1Relationship" label={l.relationship} required />
            <FormInput name="emergency1Phone" label={l.phone} required />
          </FormRow>
        </div>

        <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
            {l.contact} 2
          </span>
          <FormRow>
            <FormInput name="emergency2Name" label={l.name} required />
            <FormInput name="emergency2Relationship" label={l.relationship} required />
            <FormInput name="emergency2Phone" label={l.phone} required />
          </FormRow>
        </div>
      </div>
    </div>
  )
}
