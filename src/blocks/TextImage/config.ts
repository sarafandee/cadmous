import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TextImage: Block = {
  slug: 'textImage',
  interfaceName: 'TextImageBlock',
  labels: {
    singular: 'Text + Image',
    plural: 'Text + Image Blocks',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image on Right', value: 'right' },
        { label: 'Image on Left', value: 'left' },
      ],
    },
  ],
}
