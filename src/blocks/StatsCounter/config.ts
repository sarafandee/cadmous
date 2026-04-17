import type { Block } from 'payload'

export const StatsCounter: Block = {
  slug: 'statsCounter',
  interfaceName: 'StatsCounterBlock',
  labels: {
    singular: 'Stats Counter',
    plural: 'Stats Counters',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          label: 'Number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'suffix',
          label: 'Suffix (e.g., +, %)',
          type: 'text',
        },
      ],
    },
  ],
}
