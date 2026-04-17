'use client'

import React, { useState } from 'react'
import RichText from '@/components/RichText'

import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ heading, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="container my-16">
      {heading && <h3 className="mb-6 text-2xl font-bold">{heading}</h3>}
      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {items?.map((item, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4 text-start font-medium hover:bg-gray-50"
            >
              <span>{item.title}</span>
              <span className="ms-4 shrink-0 text-gray-400">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && item.content && (
              <div className="px-6 pb-4">
                <RichText data={item.content} enableGutter={false} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
