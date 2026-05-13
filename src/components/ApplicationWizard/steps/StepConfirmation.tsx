'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import type { ApplicationFormData } from '../schema'

export function StepConfirmation() {
  const { watch, register, formState: { errors } } = useFormContext<ApplicationFormData>()
  const data = watch()

  return (
    <div className="space-y-6">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        Review & Submit
      </h3>
      <p className="text-[13px] text-white/60">
        Please review your application before submitting.
      </p>

      <Section title="Student Information">
        <Row label="Name" value={`${data.studentFirstName} ${data.studentMiddleName} ${data.studentFamilyName}`} />
        <Row label="Gender" value={data.studentGender} />
        <Row label="Date of Birth" value={data.studentDOB} />
        <Row label="Place of Birth" value={data.studentPlaceOfBirth} />
        <Row label="Nationality" value={data.studentNationality} />
        {data.studentSecondNationality && (
          <Row label="Second Nationality" value={data.studentSecondNationality} />
        )}
        <Row label="Grade Applying For" value={data.gradeApplying} />
        <Row label="Transportation" value={data.requiresTransportation} />
      </Section>

      <Section title="Previous School">
        {data.previousSchool && <Row label="School" value={data.previousSchool} />}
        <Row label="Previous Grade" value={data.previousGradeLevel} />
        <Row label="Languages at Home" value={data.languagesSpokenAtHome} />
      </Section>

      <Section title="Guardian 1">
        <Row label="Name" value={data.guardian1FullName} />
        <Row label="Relationship" value={data.guardian1Relationship} />
        <Row label="Mobile" value={data.guardian1Mobile} />
        <Row label="Home Phone" value={data.guardian1HomePhone} />
      </Section>

      {data.guardian2FullName && (
        <Section title="Guardian 2">
          <Row label="Name" value={data.guardian2FullName} />
          {data.guardian2Relationship && (
            <Row label="Relationship" value={data.guardian2Relationship} />
          )}
          {data.guardian2Mobile && <Row label="Mobile" value={data.guardian2Mobile} />}
        </Section>
      )}

      <Section title="Emergency Contacts">
        <Row
          label="Contact 1"
          value={`${data.emergency1Name} (${data.emergency1Relationship}) — ${data.emergency1Phone}`}
        />
        <Row
          label="Contact 2"
          value={`${data.emergency2Name} (${data.emergency2Relationship}) — ${data.emergency2Phone}`}
        />
      </Section>

      <div className="rounded-[6px] border border-crimson-400/40 bg-crimson-500/10 p-5">
        <h4 className="mb-2 text-[14px] font-bold tracking-[-0.005em] text-white">
          Required Documents
        </h4>
        <p className="mb-3 text-[13px] text-white/70">
          Please ensure you provide the following documents to the school:
        </p>
        <ul className="list-inside list-disc space-y-1 text-[13px] text-white/70">
          <li>Passport Copy</li>
          <li>Two Passport Photographs</li>
          <li>Previous School Report Card</li>
          <li>Medical and Vaccination Report</li>
          <li>Passing Certificate (certified by Ministry of Education)</li>
        </ul>
      </div>

      <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...register('confirmationAcknowledged')}
            className="mt-[3px] h-4 w-4 cursor-pointer accent-crimson-500"
          />
          <span className="text-[13.5px] leading-[1.55] text-white/80">
            I hereby confirm that all the information contained in this application form is true
            and accurate to the best of my knowledge.
          </span>
        </label>
        {errors.confirmationAcknowledged && (
          <p className="mt-2 text-[11px] text-crimson-400">
            {errors.confirmationAcknowledged.message}
          </p>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
      <h4 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40">
        {title}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-wrap text-[13.5px]">
      <span className="w-44 shrink-0 text-white/50">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}
