import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { StaffProfileBlock as StaffProfileBlockProps } from '@/payload-types'

export const StaffProfileBlock: React.FC<StaffProfileBlockProps> = ({ name, title, photo, bio }) => {
  return (
    <div className="container my-16">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        {photo && typeof photo === 'object' && (
          <div className="w-48 shrink-0 overflow-hidden rounded-lg">
            <Media resource={photo} />
          </div>
        )}
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          {title && <p className="mt-1 text-lg text-gray-600">{title}</p>}
          {bio && (
            <div className="mt-4">
              <RichText data={bio} enableGutter={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
