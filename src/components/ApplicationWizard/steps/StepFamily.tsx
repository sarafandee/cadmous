'use client'

import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FormInput, FormSelect, FormRow } from '../FormField'
import type { ApplicationFormData } from '../schema'

export function StepFamily() {
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
          Family Details
        </h3>

        <FormRow>
          <FormSelect
            name="selectGuardian"
            label="Guardian for school correspondence"
            options={[
              { label: 'Guardian 1', value: 'guardian1' },
              { label: 'Guardian 2', value: 'guardian2' },
            ]}
          />
          <FormSelect
            name="familyStatus"
            label="Family Status"
            options={[
              { label: 'Married', value: 'married' },
              { label: 'Separated', value: 'separated' },
              { label: 'Divorced', value: 'divorced' },
              { label: 'Widowed', value: 'widowed' },
            ]}
          />
        </FormRow>

        {(familyStatus === 'separated' || familyStatus === 'divorced') && (
          <FormSelect
            name="custodyHolder"
            label="Who has custody of the child?"
            options={[
              { label: 'Guardian 1', value: 'guardian1' },
              { label: 'Guardian 2', value: 'guardian2' },
              { label: 'Shared', value: 'shared' },
            ]}
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-white">
            Other Children
          </h4>
          {fields.length < 5 && (
            <button
              type="button"
              onClick={() => append({ name: '', grade: '', school: '', academicYear: '' })}
              className="rounded-[4px] border border-white/20 px-[14px] py-[8px] text-[12px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              + Add Child
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
                Child {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-[12px] font-semibold text-crimson-400 transition hover:text-crimson-500"
              >
                Remove
              </button>
            </div>
            <FormRow>
              <FormInput name={`siblings.${index}.name`} label="Name" />
              <FormInput name={`siblings.${index}.grade`} label="Grade" />
            </FormRow>
            <div className="mt-3">
              <FormRow>
                <FormInput name={`siblings.${index}.school`} label="School" />
                <FormInput name={`siblings.${index}.academicYear`} label="Academic Year" />
              </FormRow>
            </div>
          </div>
        ))}

        <FormRow>
          <FormSelect
            name="hasSiblingsAtCadmous"
            label="Have any siblings graduated from or attended Cadmous College?"
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
        </FormRow>
        {hasSiblingsAtCadmous === 'yes' && (
          <FormInput name="siblingsAtCadmousYear" label="If yes, what year?" />
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-white">
          Emergency Contacts
        </h4>
        <p className="text-[13px] text-white/60">
          Please provide two people who can be contacted in case of emergency.
        </p>

        <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
            Contact 1
          </span>
          <FormRow>
            <FormInput name="emergency1Name" label="Name" required />
            <FormInput name="emergency1Relationship" label="Relationship" required />
            <FormInput name="emergency1Phone" label="Phone" required />
          </FormRow>
        </div>

        <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
            Contact 2
          </span>
          <FormRow>
            <FormInput name="emergency2Name" label="Name" required />
            <FormInput name="emergency2Relationship" label="Relationship" required />
            <FormInput name="emergency2Phone" label="Phone" required />
          </FormRow>
        </div>
      </div>
    </div>
  )
}
