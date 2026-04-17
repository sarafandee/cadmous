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
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {labels.map((label, index) => (
          <div key={index} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                index < currentStep
                  ? 'bg-green-600 text-white'
                  : index === currentStep
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span
              className={`mt-1.5 text-xs text-center leading-tight ${
                index === currentStep ? 'font-medium text-blue-900' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-blue-900 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}
