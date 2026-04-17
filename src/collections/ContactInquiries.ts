import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  labels: {
    singular: 'Contact Inquiry',
    plural: 'Contact Inquiries',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'createdAt'],
    useAsTitle: 'name',
    group: 'Admissions',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    // Honeypot field for anti-spam
    {
      name: 'website',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Honeypot field - should always be empty',
      },
    },
  ],
  timestamps: true,
}
