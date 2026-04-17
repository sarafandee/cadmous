import React from 'react'

import type { StatsCounterBlock as StatsCounterBlockProps } from '@/payload-types'

export const StatsCounterBlock: React.FC<StatsCounterBlockProps> = ({ stats }) => {
  return (
    <div className="container my-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold text-blue-900">
              {stat.value}
              {stat.suffix && <span>{stat.suffix}</span>}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
