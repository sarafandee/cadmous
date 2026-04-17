import React from 'react'

import type { EmbedMapBlock as EmbedMapBlockProps } from '@/payload-types'

export const EmbedMapBlock: React.FC<EmbedMapBlockProps> = ({ embedUrl, address, height }) => {
  return (
    <div className="container my-16">
      {address && <p className="mb-4 text-gray-600">{address}</p>}
      <div className="overflow-hidden rounded-lg">
        <iframe
          src={embedUrl}
          width="100%"
          height={height || 400}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>
    </div>
  )
}
