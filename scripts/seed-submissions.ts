import { db } from '../src/db/client'
import { applications, contactSubmissions } from '../src/db/schema/submissions'

async function main() {
  await db.insert(contactSubmissions).values([
    {
      name: 'Parent A',
      email: 'parent.a@example.com',
      message: 'How do I apply for KG2 admission next year?',
      locale: 'en',
    },
    {
      name: 'Parent B',
      email: 'parent.b@example.com',
      phone: '+961 70 000 000',
      message: 'مرحبا، أود التسجيل لابني في الصف الأول الابتدائي.',
      locale: 'ar',
    },
  ])

  await db.insert(applications).values([
    {
      payload: JSON.stringify({
        studentFirstName: 'Hala',
        studentMiddleName: '',
        studentFamilyName: 'Saad',
        studentGender: 'female',
        studentDOB: '2020-04-15',
        studentNationality: 'Lebanese',
        gradeApplying: 'KG2',
        previousGradeLevel: 'KG1',
        languagesSpokenAtHome: 'Arabic, English',
        hasSkippedOrRepeated: 'no',
        hasSpecialNeeds: 'no',
        guardian1FullName: 'Ali Saad',
        guardian1Relationship: 'Father',
        guardian1Nationality: 'Lebanese',
        guardian1PersonalEmail: 'saad@example.com',
        guardian1HomePhone: '+961 7 000 000',
        guardian1Mobile: '+961 71 111 111',
        emergency1Name: 'Maya Saad',
        emergency1Relationship: 'Mother',
        emergency1Phone: '+961 71 222 222',
        emergency2Name: 'Ahmed Saad',
        emergency2Relationship: 'Uncle',
        emergency2Phone: '+961 71 333 333',
      }),
      studentName: 'Hala Saad',
      studentGrade: 'KG2',
      guardianEmail: 'saad@example.com',
      guardianPhone: '+961 71 111 111',
      applicantLocale: 'en',
      appLang: 'en',
    },
  ])

  console.log('Seeded 2 contact submissions + 1 application.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
