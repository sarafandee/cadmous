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
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Family Details</h3>

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

      {/* Siblings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Other Children</h4>
          {fields.length < 5 && (
            <button
              type="button"
              onClick={() => append({ name: '', grade: '', school: '', academicYear: '' })}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              + Add Child
            </button>
          )}
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="rounded-md border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Child {index + 1}</span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-500 hover:text-red-700"
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

      {/* Emergency Contacts */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">Emergency Contacts</h4>
        <p className="text-sm text-gray-500">
          Please provide 2 people who can be contacted in case of emergency.
        </p>

        <div className="rounded-md border border-gray-200 p-4">
          <span className="mb-3 block text-sm font-medium text-gray-600">Contact 1</span>
          <FormRow>
            <FormInput name="emergency1Name" label="Name" required />
            <FormInput name="emergency1Relationship" label="Relationship" required />
            <FormInput name="emergency1Phone" label="Phone" required />
          </FormRow>
        </div>

        <div className="rounded-md border border-gray-200 p-4">
          <span className="mb-3 block text-sm font-medium text-gray-600">Contact 2</span>
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
