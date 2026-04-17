'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import type { ApplicationFormData } from '../schema'

export function StepConfirmation() {
  const { watch, register, formState: { errors } } = useFormContext<ApplicationFormData>()
  const data = watch()

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Review & Submit</h3>
      <p className="text-sm text-gray-500">
        Please review your application before submitting.
      </p>

      {/* Student Summary */}
      <Section title="Student Information">
        <Row label="Name" value={`${data.studentFirstName} ${data.studentMiddleName} ${data.studentFamilyName}`} />
        <Row label="Gender" value={data.studentGender} />
        <Row label="Date of Birth" value={data.studentDOB} />
        <Row label="Place of Birth" value={data.studentPlaceOfBirth} />
        <Row label="Nationality" value={data.studentNationality} />
        {data.studentSecondNationality && <Row label="Second Nationality" value={data.studentSecondNationality} />}
        <Row label="Grade Applying For" value={data.gradeApplying} />
        <Row label="Transportation" value={data.requiresTransportation} />
      </Section>

      {/* Previous School Summary */}
      <Section title="Previous School">
        {data.previousSchool && <Row label="School" value={data.previousSchool} />}
        <Row label="Previous Grade" value={data.previousGradeLevel} />
        <Row label="Languages at Home" value={data.languagesSpokenAtHome} />
      </Section>

      {/* Guardian 1 Summary */}
      <Section title="Guardian 1">
        <Row label="Name" value={data.guardian1FullName} />
        <Row label="Relationship" value={data.guardian1Relationship} />
        <Row label="Mobile" value={data.guardian1Mobile} />
        <Row label="Home Phone" value={data.guardian1HomePhone} />
      </Section>

      {/* Guardian 2 Summary */}
      {data.guardian2FullName && (
        <Section title="Guardian 2">
          <Row label="Name" value={data.guardian2FullName} />
          {data.guardian2Relationship && <Row label="Relationship" value={data.guardian2Relationship} />}
          {data.guardian2Mobile && <Row label="Mobile" value={data.guardian2Mobile} />}
        </Section>
      )}

      {/* Emergency Contacts */}
      <Section title="Emergency Contacts">
        <Row label="Contact 1" value={`${data.emergency1Name} (${data.emergency1Relationship}) - ${data.emergency1Phone}`} />
        <Row label="Contact 2" value={`${data.emergency2Name} (${data.emergency2Relationship}) - ${data.emergency2Phone}`} />
      </Section>

      {/* Required Documents Note */}
      <div className="rounded-md bg-amber-50 p-4">
        <h4 className="font-medium text-amber-800">Required Documents</h4>
        <p className="mt-1 text-sm text-amber-700">
          Please ensure you provide the following documents to the school:
        </p>
        <ul className="mt-2 list-inside list-disc text-sm text-amber-700">
          <li>Passport Copy</li>
          <li>Two Passport Photographs</li>
          <li>Previous School Report Card</li>
          <li>Medical and Vaccination Report</li>
          <li>Passing Certificate (certified by Ministry of Education)</li>
        </ul>
      </div>

      {/* Confirmation Checkbox */}
      <div className="rounded-md border border-gray-200 p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('confirmationAcknowledged')}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">
            I hereby confirm that all the information contained in this application form is true
            and accurate to the best of my knowledge.
          </span>
        </label>
        {errors.confirmationAcknowledged && (
          <p className="mt-2 text-xs text-red-500">{errors.confirmationAcknowledged.message}</p>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-gray-200 p-4">
      <h4 className="mb-3 font-medium text-gray-800">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex text-sm">
      <span className="w-40 shrink-0 text-gray-500">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  )
}
