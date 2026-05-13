'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import type { DocumentKind } from '@/lib/applications/documents'

import { useFormLabels } from '../labels-context'
import type { FormLabels } from '../labels'
import type { ApplicationFormData } from '../schema'
import type { UploadedDoc } from './StepDocuments'

const KIND_LABEL_KEYS: Record<DocumentKind, keyof FormLabels> = {
  passport: 'kindPassport',
  passport_photos: 'kindPassportPhotos',
  report_card: 'kindReportCard',
  medical: 'kindMedical',
  passing_cert: 'kindPassingCert',
  brevet: 'kindBrevet',
  other: 'kindOther',
}

export function StepConfirmation({ uploads = [] }: { uploads?: UploadedDoc[] }) {
  const l = useFormLabels()
  const { watch, register, formState: { errors } } = useFormContext<ApplicationFormData>()
  const data = watch()

  return (
    <div className="space-y-6">
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
        {l.reviewTitle}
      </h3>
      <p className="text-[13px] text-white/60">{l.reviewHelper}</p>

      <Section title={l.sectionStudent}>
        <Row
          label={l.labelName}
          value={`${data.studentFirstName ?? ''} ${data.studentMiddleName ?? ''} ${data.studentFamilyName ?? ''}`.trim()}
        />
        <Row label={l.labelGender} value={data.studentGender} />
        <Row label={l.labelDOB} value={data.studentDOB} />
        <Row label={l.labelPlaceOfBirth} value={data.studentPlaceOfBirth} />
        <Row label={l.labelNationality} value={data.studentNationality} />
        {data.studentSecondNationality && (
          <Row label={l.labelSecondNationality} value={data.studentSecondNationality} />
        )}
        <Row label={l.labelGradeApplying} value={data.gradeApplying} />
        <Row label={l.labelTransportation} value={data.requiresTransportation} />
      </Section>

      <Section title={l.sectionPrevSchool}>
        {data.previousSchool && (
          <Row label={l.labelPrevSchool} value={data.previousSchool} />
        )}
        <Row label={l.labelPrevGrade} value={data.previousGradeLevel} />
        <Row label={l.labelLanguagesHome} value={data.languagesSpokenAtHome} />
      </Section>

      <Section title={l.sectionGuardian1}>
        <Row label={l.labelName} value={data.guardian1FullName} />
        <Row label={l.labelRelationship} value={data.guardian1Relationship} />
        <Row label={l.labelMobile} value={data.guardian1Mobile} />
        <Row label={l.labelHomePhone} value={data.guardian1HomePhone} />
      </Section>

      {data.guardian2FullName && (
        <Section title={l.sectionGuardian2}>
          <Row label={l.labelName} value={data.guardian2FullName} />
          {data.guardian2Relationship && (
            <Row label={l.labelRelationship} value={data.guardian2Relationship} />
          )}
          {data.guardian2Mobile && (
            <Row label={l.labelMobile} value={data.guardian2Mobile} />
          )}
        </Section>
      )}

      <Section title={l.sectionEmergency}>
        <Row
          label={l.labelContact1}
          value={`${data.emergency1Name ?? ''} (${data.emergency1Relationship ?? ''}) — ${data.emergency1Phone ?? ''}`}
        />
        <Row
          label={l.labelContact2}
          value={`${data.emergency2Name ?? ''} (${data.emergency2Relationship ?? ''}) — ${data.emergency2Phone ?? ''}`}
        />
      </Section>

      <Section title={l.documentsAttached}>
        {uploads.length === 0 ? (
          <p className="text-[13px] text-white/60">{l.noDocuments}</p>
        ) : (
          <ul className="space-y-1.5">
            {uploads.map((u) => (
              <li key={u.id} className="flex flex-wrap text-[13.5px]">
                <span className="w-44 shrink-0 text-white/50">
                  {l[KIND_LABEL_KEYS[u.kind]]}
                </span>
                <span className="text-white">{u.originalName}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <div className="rounded-[6px] border border-white/10 bg-navy-900/40 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...register('confirmationAcknowledged')}
            className="mt-[3px] h-4 w-4 cursor-pointer accent-crimson-500"
          />
          <span className="text-[13.5px] leading-[1.55] text-white/80">
            {l.acknowledgement}
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
