'use client'

import React from 'react'

type Props = {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function ProgressBar({ currentStep, totalSteps, labels }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        {labels.map((label, index) => {
          const done = index < currentStep
          const active = index === currentStep
          return (
            <div key={index} className="flex flex-1 flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                  done
                    ? 'bg-crimson-500 text-white'
                    : active
                      ? 'border-[1.5px] border-crimson-400 bg-crimson-500/15 text-crimson-400'
                      : 'border border-white/15 bg-navy-900 text-white/40'
                }`}
              >
                {done ? '✓' : index + 1}
              </div>
              <span
                className={`mt-2 text-center text-[11px] leading-tight tracking-[0.02em] ${
                  active ? 'font-semibold text-white' : 'text-white/50'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-crimson-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}
