import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ApplicationSubmissions: CollectionConfig = {
  slug: 'application-submissions',
  labels: {
    singular: 'Application',
    plural: 'Applications',
  },
  access: {
    // Public can submit applications
    create: anyone,
    // Only authenticated admins can read/update/delete (PII protection)
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['studentFirstName', 'studentFamilyName', 'gradeApplying', 'status', 'createdAt'],
    useAsTitle: 'studentFirstName',
    group: 'Admissions',
  },
  fields: [
    // ── Status Pipeline ──
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Interview', value: 'interview' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Waitlisted', value: 'waitlisted' },
        { label: 'Declined', value: 'declined' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'submissionLocale',
      type: 'select',
      options: [
        { label: 'العربية', value: 'ar' },
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },

    // ── Student Information ──
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Student Information',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'studentFirstName',
                  label: 'First Name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'studentMiddleName',
                  label: "Father's Name / Middle Name",
                  type: 'text',
                  required: true,
                },
                {
                  name: 'studentFamilyName',
                  label: 'Family Name',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'studentGender',
                  label: 'Gender',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                  ],
                },
                {
                  name: 'studentDOB',
                  label: 'Date of Birth',
                  type: 'date',
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                      displayFormat: 'dd/MM/yyyy',
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'studentPlaceOfBirth',
                  label: 'Place of Birth',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'studentNationality',
                  label: 'Nationality',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'studentSecondNationality',
                  label: 'Second Nationality',
                  type: 'text',
                },
              ],
            },
            {
              name: 'requiresTransportation',
              label: 'Does your child require transportation?',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'gradeApplying',
              label: 'Grade Applying For',
              type: 'text',
              required: true,
            },
          ],
        },

        // ── Previous School Information ──
        {
          label: 'Previous School',
          fields: [
            {
              name: 'previousSchool',
              label: 'Previous School',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'previousSchoolCountry',
                  label: 'Country of Previous School',
                  type: 'text',
                },
                {
                  name: 'previousGradeLevel',
                  label: 'Previous Grade/Level Attended',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'languagesSpokenAtHome',
              label: 'Languages Spoken at Home',
              type: 'text',
              required: true,
            },
            {
              name: 'hasSkippedOrRepeated',
              label: 'Has your child ever skipped or been asked to repeat a year?',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'skippedOrRepeatedDetails',
              label: 'If yes, please specify',
              type: 'textarea',
              admin: {
                condition: (data) => data?.hasSkippedOrRepeated === 'yes',
              },
            },
            {
              name: 'hasSpecialNeeds',
              label: 'Has your child been involved in any advanced, gifted, or special needs program?',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'specialNeedsDetails',
              label: 'If yes, kindly specify',
              type: 'textarea',
              admin: {
                condition: (data) => data?.hasSpecialNeeds === 'yes',
              },
            },
          ],
        },

        // ── Guardian 1 ──
        {
          label: 'Guardian 1',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian1FullName',
                  label: 'Full Name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'guardian1Relationship',
                  label: 'Relationship to Student',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian1Nationality',
                  label: 'Nationality',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'guardian1Occupation',
                  label: 'Occupation / Job Title',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian1Company',
                  label: 'Company Name',
                  type: 'text',
                },
                {
                  name: 'guardian1BusinessAddress',
                  label: 'Business Address',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian1BusinessEmail',
                  label: 'Business Email',
                  type: 'email',
                },
                {
                  name: 'guardian1BusinessPhone',
                  label: 'Business Phone',
                  type: 'text',
                },
                {
                  name: 'guardian1PhoneExtension',
                  label: 'Phone Extension',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian1HomeAddress',
                  label: 'Home Address',
                  type: 'text',
                },
                {
                  name: 'guardian1PersonalEmail',
                  label: 'Personal Email',
                  type: 'email',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian1HomePhone',
                  label: 'Home Phone',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'guardian1Mobile',
                  label: 'Mobile',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'guardian1ReceiveSMS',
              label: 'Receive school-related SMS/WhatsApp on mobile?',
              type: 'select',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
          ],
        },

        // ── Guardian 2 ──
        {
          label: 'Guardian 2',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian2FullName',
                  label: 'Full Name',
                  type: 'text',
                },
                {
                  name: 'guardian2Relationship',
                  label: 'Relationship to Student',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian2Nationality',
                  label: 'Nationality',
                  type: 'text',
                },
                {
                  name: 'guardian2Occupation',
                  label: 'Occupation / Job Title',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian2Company',
                  label: 'Company Name',
                  type: 'text',
                },
                {
                  name: 'guardian2BusinessAddress',
                  label: 'Business Address',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian2BusinessEmail',
                  label: 'Business Email',
                  type: 'email',
                },
                {
                  name: 'guardian2BusinessPhone',
                  label: 'Business Phone',
                  type: 'text',
                },
                {
                  name: 'guardian2PhoneExtension',
                  label: 'Phone Extension',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian2HomeAddress',
                  label: 'Home Address',
                  type: 'text',
                },
                {
                  name: 'guardian2PersonalEmail',
                  label: 'Personal Email',
                  type: 'email',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'guardian2HomePhone',
                  label: 'Home Phone',
                  type: 'text',
                },
                {
                  name: 'guardian2Mobile',
                  label: 'Mobile',
                  type: 'text',
                },
              ],
            },
          ],
        },

        // ── Family Details ──
        {
          label: 'Family Details',
          fields: [
            {
              name: 'selectGuardian',
              label: 'Select guardian to whom school reports and correspondence will be addressed',
              type: 'select',
              options: [
                { label: 'Guardian 1', value: 'guardian1' },
                { label: 'Guardian 2', value: 'guardian2' },
              ],
            },
            {
              name: 'familyStatus',
              label: 'Family Status',
              type: 'select',
              options: [
                { label: 'Married', value: 'married' },
                { label: 'Separated', value: 'separated' },
                { label: 'Divorced', value: 'divorced' },
                { label: 'Widowed', value: 'widowed' },
              ],
            },
            {
              name: 'custodyHolder',
              label: 'If separated, who has custody of the child?',
              type: 'select',
              options: [
                { label: 'Guardian 1', value: 'guardian1' },
                { label: 'Guardian 2', value: 'guardian2' },
                { label: 'Shared', value: 'shared' },
              ],
              admin: {
                condition: (data) => data?.familyStatus === 'separated' || data?.familyStatus === 'divorced',
              },
            },

            // Siblings
            {
              name: 'siblings',
              label: 'Other Children',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      label: 'Name',
                      type: 'text',
                    },
                    {
                      name: 'grade',
                      label: 'Grade',
                      type: 'text',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'school',
                      label: 'School',
                      type: 'text',
                    },
                    {
                      name: 'academicYear',
                      label: 'Academic Year',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'hasSiblingsAtCadmous',
              label: 'Have any siblings graduated from or attended Cadmous College?',
              type: 'select',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'siblingsAtCadmousYear',
              label: 'If yes, what year?',
              type: 'text',
              admin: {
                condition: (data) => data?.hasSiblingsAtCadmous === 'yes',
              },
            },
          ],
        },

        // ── Emergency Contacts ──
        {
          label: 'Emergency Contacts',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'emergency1Name',
                  label: 'Contact 1 Name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'emergency1Relationship',
                  label: 'Relationship',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'emergency1Phone',
                  label: 'Phone',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'emergency2Name',
                  label: 'Contact 2 Name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'emergency2Relationship',
                  label: 'Relationship',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'emergency2Phone',
                  label: 'Phone',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Documents ──
        {
          label: 'Documents',
          fields: [
            {
              name: 'documents',
              label: 'Uploaded Documents',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  name: 'file',
                  label: 'Document',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'documentType',
                  label: 'Document Type',
                  type: 'select',
                  options: [
                    { label: 'Passport Copy', value: 'passport' },
                    { label: 'Passport Photo', value: 'photo' },
                    { label: 'School Report Card', value: 'report-card' },
                    { label: 'Medical/Vaccination Report', value: 'medical' },
                    { label: 'Passing Certificate', value: 'passing-certificate' },
                    { label: 'Brevet Certificate', value: 'brevet' },
                    { label: 'Other', value: 'other' },
                  ],
                },
              ],
            },
            {
              name: 'confirmationAcknowledged',
              label: 'I confirm that all information in this application is true',
              type: 'checkbox',
            },
          ],
        },
      ],
    },

    // ── Admin Notes ──
    {
      name: 'adminNotes',
      label: 'Admin Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes about this application',
      },
    },
  ],
  timestamps: true,
}
