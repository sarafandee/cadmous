import type { Block } from 'payload'

export const EmbedMap: Block = {
  slug: 'embedMap',
  interfaceName: 'EmbedMapBlock',
  labels: {
    singular: 'Map Embed',
    plural: 'Map Embeds',
  },
  fields: [
    {
      name: 'embedUrl',
      label: 'Google Maps Embed URL',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste the Google Maps embed URL (from "Share > Embed a map")',
      },
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 400,
      admin: {
        description: 'Map height in pixels',
      },
    },
  ],
}
