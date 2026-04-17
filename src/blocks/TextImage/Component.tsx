import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

import type { TextImageBlock as TextImageBlockProps } from '@/payload-types'

export const TextImageBlock: React.FC<TextImageBlockProps> = ({ richText, image, imagePosition }) => {
  const isLeft = imagePosition === 'left'

  return (
    <div className="container my-16">
      <div className={cn('grid grid-cols-1 items-center gap-8 lg:grid-cols-2', {
        'lg:grid-flow-dense': isLeft,
      })}>
        <div className={cn({ 'lg:col-start-2': isLeft })}>
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>
        <div className={cn('overflow-hidden rounded-lg', { 'lg:col-start-1': isLeft })}>
          {image && typeof image === 'object' && <Media resource={image} />}
        </div>
      </div>
    </div>
  )
}
