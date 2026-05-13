// Form labels keyed by the chosen application language. This is distinct
// from the UI locale (next-intl) — the wizard intentionally follows the
// form's appLang so an Arabic-speaking family applying via /application/ar
// sees Arabic field labels even if their browser is set to English.

export type AppLang = 'en' | 'fr' | 'ar'

export type FormLabels = {
  // Chrome
  stepStudent: string
  stepPreviousSchool: string
  stepGuardian1: string
  stepGuardian2: string
  stepFamily: string
  stepDocuments: string
  stepReview: string
  next: string
  previous: string
  submit: string
  selectPlaceholder: string

  // Success
  successTitle: string
  successMessage: string
  applicationId: string

  // Student step
  studentTitle: string
  firstName: string
  middleName: string
  familyName: string
  gender: string
  male: string
  female: string
  dob: string
  placeOfBirth: string
  nationality: string
  secondNationality: string
  transportation: string
  yes: string
  no: string
  gradeApplying: string

  // Previous school step
  prevSchoolTitle: string
  previousSchool: string
  previousSchoolCountry: string
  previousGradeLevel: string
  languagesAtHome: string
  skippedOrRepeated: string
  pleaseSpecify: string
  specialNeeds: string

  // Guardian steps
  guardian1Title: string
  guardian1Helper: string
  guardian2Title: string
  guardian2Helper: string
  fullName: string
  relationship: string
  occupation: string
  company: string
  businessAddress: string
  businessEmail: string
  businessPhone: string
  extension: string
  homeAddress: string
  personalEmail: string
  homePhone: string
  mobile: string
  receiveSMS: string

  // Family step
  familyTitle: string
  guardianForCorrespondence: string
  guardian1Option: string
  guardian2Option: string
  familyStatus: string
  married: string
  separated: string
  divorced: string
  widowed: string
  custodyHolder: string
  shared: string
  otherChildren: string
  addChild: string
  remove: string
  child: string
  name: string
  grade: string
  school: string
  academicYear: string
  siblingsAtCadmous: string
  siblingsAtCadmousYear: string
  emergencyContacts: string
  emergencyHelper: string
  contact: string
  phone: string

  // Documents step
  documentsTitle: string
  documentsHelper: string
  noFileUploaded: string
  upload: string
  uploading: string
  addAnother: string
  fileTooLarge: string
  networkError: string

  // Document kinds
  kindPassport: string
  kindPassportPhotos: string
  kindReportCard: string
  kindMedical: string
  kindPassingCert: string
  kindBrevet: string
  kindOther: string

  // Review step
  reviewTitle: string
  reviewHelper: string
  documentsAttached: string
  noDocuments: string
  acknowledgement: string

  // Review section titles
  sectionStudent: string
  sectionPrevSchool: string
  sectionGuardian1: string
  sectionGuardian2: string
  sectionEmergency: string

  // Review row labels
  labelName: string
  labelGender: string
  labelDOB: string
  labelPlaceOfBirth: string
  labelNationality: string
  labelSecondNationality: string
  labelGradeApplying: string
  labelTransportation: string
  labelPrevSchool: string
  labelPrevGrade: string
  labelLanguagesHome: string
  labelRelationship: string
  labelMobile: string
  labelHomePhone: string
  labelContact1: string
  labelContact2: string
}

const en: FormLabels = {
  stepStudent: 'Student Information',
  stepPreviousSchool: 'Previous School',
  stepGuardian1: 'Guardian 1',
  stepGuardian2: 'Guardian 2',
  stepFamily: 'Siblings & Emergency',
  stepDocuments: 'Documents',
  stepReview: 'Review & Submit',
  next: 'Next',
  previous: 'Previous',
  submit: 'Submit application',
  selectPlaceholder: 'Select…',

  successTitle: 'Application Submitted',
  successMessage: 'Thank you for your application. We will contact you soon.',
  applicationId: 'Application ID',

  studentTitle: 'Student Information',
  firstName: 'First Name',
  middleName: "Father's Name / Middle Name",
  familyName: 'Family Name',
  gender: 'Gender',
  male: 'Male',
  female: 'Female',
  dob: 'Date of Birth',
  placeOfBirth: 'Place of Birth',
  nationality: 'Nationality',
  secondNationality: 'Second Nationality',
  transportation: 'Does your child require transportation?',
  yes: 'Yes',
  no: 'No',
  gradeApplying: 'Grade Applying For',

  prevSchoolTitle: 'Previous School Information',
  previousSchool: 'Previous School',
  previousSchoolCountry: 'Country of Previous School',
  previousGradeLevel: 'Previous Grade/Level Attended',
  languagesAtHome: 'Languages Spoken at Home',
  skippedOrRepeated: 'Has your child ever skipped or been asked to repeat a year?',
  pleaseSpecify: 'Please specify',
  specialNeeds:
    'Has your child been involved in any advanced, gifted, or special needs program?',

  guardian1Title: 'Guardian 1',
  guardian1Helper:
    'The first guardian to whom school reports and correspondence will be addressed.',
  guardian2Title: 'Guardian 2',
  guardian2Helper: 'Optional. Fill in if applicable.',
  fullName: 'Full Name',
  relationship: 'Relationship to Student',
  occupation: 'Occupation / Job Title',
  company: 'Company Name',
  businessAddress: 'Business Address',
  businessEmail: 'Business Email',
  businessPhone: 'Business Phone',
  extension: 'Extension',
  homeAddress: 'Home Address',
  personalEmail: 'Personal Email',
  homePhone: 'Home Phone',
  mobile: 'Mobile',
  receiveSMS: 'Receive school-related SMS/WhatsApp on mobile?',

  familyTitle: 'Family Details',
  guardianForCorrespondence: 'Guardian for school correspondence',
  guardian1Option: 'Guardian 1',
  guardian2Option: 'Guardian 2',
  familyStatus: 'Family Status',
  married: 'Married',
  separated: 'Separated',
  divorced: 'Divorced',
  widowed: 'Widowed',
  custodyHolder: 'Who has custody of the child?',
  shared: 'Shared',
  otherChildren: 'Other Children',
  addChild: '+ Add Child',
  remove: 'Remove',
  child: 'Child',
  name: 'Name',
  grade: 'Grade',
  school: 'School',
  academicYear: 'Academic Year',
  siblingsAtCadmous: 'Have any siblings graduated from or attended Cadmous College?',
  siblingsAtCadmousYear: 'If yes, what year?',
  emergencyContacts: 'Emergency Contacts',
  emergencyHelper: 'Please provide two people who can be contacted in case of emergency.',
  contact: 'Contact',
  phone: 'Phone',

  documentsTitle: 'Required Documents',
  documentsHelper:
    'Please upload PDF or image files (JPG / PNG / WebP), max 8 MB each. Brevet certificate is required only for Grade 11 applicants.',
  noFileUploaded: 'No file uploaded',
  upload: '+ Upload',
  uploading: 'Uploading…',
  addAnother: '+ Add another',
  fileTooLarge: 'File too large (max 8 MB)',
  networkError: 'Network error — please try again',

  kindPassport: 'Passport copy',
  kindPassportPhotos: 'Two passport photographs',
  kindReportCard: 'Previous school report card',
  kindMedical: 'Medical & vaccination report',
  kindPassingCert: 'Passing certificate (Ministry of Education)',
  kindBrevet: 'Brevet certificate (Grade 11 applicants)',
  kindOther: 'Other supporting document',

  reviewTitle: 'Review & Submit',
  reviewHelper: 'Please review your application before submitting.',
  documentsAttached: 'Documents Attached',
  noDocuments:
    'No documents uploaded yet. You may proceed and submit them later, but providing them now will speed up your application.',
  acknowledgement:
    'I hereby confirm that all the information contained in this application form is true and accurate to the best of my knowledge.',

  sectionStudent: 'Student Information',
  sectionPrevSchool: 'Previous School',
  sectionGuardian1: 'Guardian 1',
  sectionGuardian2: 'Guardian 2',
  sectionEmergency: 'Emergency Contacts',

  labelName: 'Name',
  labelGender: 'Gender',
  labelDOB: 'Date of Birth',
  labelPlaceOfBirth: 'Place of Birth',
  labelNationality: 'Nationality',
  labelSecondNationality: 'Second Nationality',
  labelGradeApplying: 'Grade Applying For',
  labelTransportation: 'Transportation',
  labelPrevSchool: 'School',
  labelPrevGrade: 'Previous Grade',
  labelLanguagesHome: 'Languages at Home',
  labelRelationship: 'Relationship',
  labelMobile: 'Mobile',
  labelHomePhone: 'Home Phone',
  labelContact1: 'Contact 1',
  labelContact2: 'Contact 2',
}

const fr: FormLabels = {
  stepStudent: 'Informations sur l’élève',
  stepPreviousSchool: 'École précédente',
  stepGuardian1: 'Tuteur 1',
  stepGuardian2: 'Tuteur 2',
  stepFamily: 'Famille & urgence',
  stepDocuments: 'Documents',
  stepReview: 'Vérifier & envoyer',
  next: 'Suivant',
  previous: 'Précédent',
  submit: 'Envoyer la demande',
  selectPlaceholder: 'Choisir…',

  successTitle: 'Demande envoyée',
  successMessage:
    "Merci pour votre demande. Notre équipe d'admission vous contactera prochainement.",
  applicationId: 'N° de demande',

  studentTitle: 'Informations sur l’élève',
  firstName: 'Prénom',
  middleName: 'Nom du père / deuxième prénom',
  familyName: 'Nom de famille',
  gender: 'Sexe',
  male: 'Masculin',
  female: 'Féminin',
  dob: 'Date de naissance',
  placeOfBirth: 'Lieu de naissance',
  nationality: 'Nationalité',
  secondNationality: 'Deuxième nationalité',
  transportation: 'Votre enfant a-t-il besoin du transport scolaire ?',
  yes: 'Oui',
  no: 'Non',
  gradeApplying: 'Classe demandée',

  prevSchoolTitle: 'École précédente',
  previousSchool: 'École précédente',
  previousSchoolCountry: 'Pays de l’école précédente',
  previousGradeLevel: 'Dernière classe / niveau suivi',
  languagesAtHome: 'Langues parlées à la maison',
  skippedOrRepeated:
    'Votre enfant a-t-il déjà sauté ou redoublé une classe ?',
  pleaseSpecify: 'Veuillez préciser',
  specialNeeds:
    'Votre enfant a-t-il suivi un programme avancé, surdoué, ou à besoins spécifiques ?',

  guardian1Title: 'Tuteur 1',
  guardian1Helper:
    'Le premier tuteur à qui seront adressés les bulletins et la correspondance scolaire.',
  guardian2Title: 'Tuteur 2',
  guardian2Helper: 'Optionnel. À remplir le cas échéant.',
  fullName: 'Nom complet',
  relationship: 'Lien avec l’élève',
  occupation: 'Profession',
  company: 'Entreprise',
  businessAddress: 'Adresse professionnelle',
  businessEmail: 'E-mail professionnel',
  businessPhone: 'Téléphone professionnel',
  extension: 'Poste',
  homeAddress: 'Adresse personnelle',
  personalEmail: 'E-mail personnel',
  homePhone: 'Téléphone fixe',
  mobile: 'Mobile',
  receiveSMS: 'Recevoir les SMS/WhatsApp scolaires sur ce mobile ?',

  familyTitle: 'Détails familiaux',
  guardianForCorrespondence: 'Tuteur pour la correspondance scolaire',
  guardian1Option: 'Tuteur 1',
  guardian2Option: 'Tuteur 2',
  familyStatus: 'Situation familiale',
  married: 'Marié(e)',
  separated: 'Séparé(e)',
  divorced: 'Divorcé(e)',
  widowed: 'Veuf / Veuve',
  custodyHolder: 'Qui a la garde de l’enfant ?',
  shared: 'Partagée',
  otherChildren: 'Autres enfants',
  addChild: '+ Ajouter un enfant',
  remove: 'Supprimer',
  child: 'Enfant',
  name: 'Nom',
  grade: 'Classe',
  school: 'École',
  academicYear: 'Année scolaire',
  siblingsAtCadmous:
    'Des frères ou sœurs ont-ils déjà fréquenté ou été diplômés du Collège Cadmous ?',
  siblingsAtCadmousYear: 'Si oui, quelle année ?',
  emergencyContacts: 'Personnes à contacter en cas d’urgence',
  emergencyHelper:
    'Veuillez indiquer deux personnes joignables en cas d’urgence.',
  contact: 'Contact',
  phone: 'Téléphone',

  documentsTitle: 'Documents requis',
  documentsHelper:
    'Veuillez téléverser des fichiers PDF ou image (JPG / PNG / WebP), 8 Mo max chacun. Le certificat de Brevet n’est exigé que pour les candidats en 1re.',
  noFileUploaded: 'Aucun fichier',
  upload: '+ Téléverser',
  uploading: 'Téléversement…',
  addAnother: '+ Ajouter un autre',
  fileTooLarge: 'Fichier trop volumineux (8 Mo max)',
  networkError: 'Erreur réseau — veuillez réessayer',

  kindPassport: 'Copie du passeport',
  kindPassportPhotos: 'Deux photos d’identité',
  kindReportCard: 'Bulletin scolaire précédent',
  kindMedical: 'Carnet médical et de vaccination',
  kindPassingCert: 'Certificat de passage (ministère de l’Éducation)',
  kindBrevet: 'Certificat du Brevet (candidats en 1re)',
  kindOther: 'Autre document justificatif',

  reviewTitle: 'Vérifier & envoyer',
  reviewHelper: 'Veuillez vérifier votre demande avant de l’envoyer.',
  documentsAttached: 'Documents joints',
  noDocuments:
    'Aucun document n’a encore été téléversé. Vous pouvez les fournir plus tard, mais cela accélérera l’étude de votre dossier.',
  acknowledgement:
    'Je confirme par la présente que toutes les informations fournies dans ce formulaire sont exactes au mieux de ma connaissance.',

  sectionStudent: 'Informations sur l’élève',
  sectionPrevSchool: 'École précédente',
  sectionGuardian1: 'Tuteur 1',
  sectionGuardian2: 'Tuteur 2',
  sectionEmergency: 'Personnes à contacter en cas d’urgence',

  labelName: 'Nom',
  labelGender: 'Sexe',
  labelDOB: 'Date de naissance',
  labelPlaceOfBirth: 'Lieu de naissance',
  labelNationality: 'Nationalité',
  labelSecondNationality: 'Deuxième nationalité',
  labelGradeApplying: 'Classe demandée',
  labelTransportation: 'Transport',
  labelPrevSchool: 'École',
  labelPrevGrade: 'Dernière classe',
  labelLanguagesHome: 'Langues à la maison',
  labelRelationship: 'Lien',
  labelMobile: 'Mobile',
  labelHomePhone: 'Téléphone fixe',
  labelContact1: 'Contact 1',
  labelContact2: 'Contact 2',
}

const ar: FormLabels = {
  stepStudent: 'معلومات الطالب',
  stepPreviousSchool: 'المدرسة السابقة',
  stepGuardian1: 'ولي الأمر 1',
  stepGuardian2: 'ولي الأمر 2',
  stepFamily: 'العائلة والطوارئ',
  stepDocuments: 'المستندات',
  stepReview: 'المراجعة والإرسال',
  next: 'التالي',
  previous: 'السابق',
  submit: 'إرسال الطلب',
  selectPlaceholder: 'اختر…',

  successTitle: 'تم إرسال الطلب',
  successMessage: 'شكرًا على تقدّمكم. سيتواصل معكم فريق القبول قريبًا.',
  applicationId: 'رقم الطلب',

  studentTitle: 'معلومات الطالب',
  firstName: 'الاسم الأول',
  middleName: 'اسم الأب',
  familyName: 'اسم العائلة',
  gender: 'الجنس',
  male: 'ذكر',
  female: 'أنثى',
  dob: 'تاريخ الولادة',
  placeOfBirth: 'مكان الولادة',
  nationality: 'الجنسية',
  secondNationality: 'الجنسية الثانية',
  transportation: 'هل يحتاج طفلكم إلى النقل المدرسي؟',
  yes: 'نعم',
  no: 'لا',
  gradeApplying: 'الصفّ المطلوب',

  prevSchoolTitle: 'معلومات المدرسة السابقة',
  previousSchool: 'المدرسة السابقة',
  previousSchoolCountry: 'بلد المدرسة السابقة',
  previousGradeLevel: 'آخر صفّ / مستوى تابعه الطالب',
  languagesAtHome: 'اللغات المستخدمة في المنزل',
  skippedOrRepeated: 'هل تخطّى الطالب صفًا أو طُلب منه إعادة سنة؟',
  pleaseSpecify: 'يُرجى التوضيح',
  specialNeeds: 'هل التحق الطالب ببرنامج متقدّم، للموهوبين، أو للاحتياجات الخاصّة؟',

  guardian1Title: 'ولي الأمر 1',
  guardian1Helper: 'ولي الأمر الأوّل الذي ستُرسَل إليه التقارير المدرسيّة والمراسلات.',
  guardian2Title: 'ولي الأمر 2',
  guardian2Helper: 'اختياري. يُملأ عند الاقتضاء.',
  fullName: 'الاسم الكامل',
  relationship: 'صلة القرابة بالطالب',
  occupation: 'المهنة / الوظيفة',
  company: 'اسم الشركة',
  businessAddress: 'عنوان العمل',
  businessEmail: 'البريد الإلكتروني للعمل',
  businessPhone: 'هاتف العمل',
  extension: 'الفرعي',
  homeAddress: 'عنوان السكن',
  personalEmail: 'البريد الإلكتروني الشخصي',
  homePhone: 'هاتف المنزل',
  mobile: 'الجوّال',
  receiveSMS: 'استلام رسائل SMS/WhatsApp المدرسيّة على هذا الجوّال؟',

  familyTitle: 'تفاصيل العائلة',
  guardianForCorrespondence: 'ولي الأمر المسؤول عن المراسلات',
  guardian1Option: 'ولي الأمر 1',
  guardian2Option: 'ولي الأمر 2',
  familyStatus: 'الحالة العائليّة',
  married: 'متزوّج(ة)',
  separated: 'منفصل(ة)',
  divorced: 'مطلَّق(ة)',
  widowed: 'أرمل(ة)',
  custodyHolder: 'مَن له حضانة الطفل؟',
  shared: 'مشتركة',
  otherChildren: 'أطفال آخرون',
  addChild: '+ إضافة طفل',
  remove: 'إزالة',
  child: 'الطفل',
  name: 'الاسم',
  grade: 'الصفّ',
  school: 'المدرسة',
  academicYear: 'السنة الدراسيّة',
  siblingsAtCadmous: 'هل تخرّج أو درس أحد الأشقّاء في مدرسة قدموس؟',
  siblingsAtCadmousYear: 'إذا نعم، في أيّ سنة؟',
  emergencyContacts: 'جهات الاتصال في حالات الطوارئ',
  emergencyHelper: 'يُرجى تقديم اسمَي شخصَين يمكن الاتصال بهما في حالات الطوارئ.',
  contact: 'جهة الاتصال',
  phone: 'الهاتف',

  documentsTitle: 'المستندات المطلوبة',
  documentsHelper:
    'يُرجى رفع ملفّات PDF أو صور (JPG / PNG / WebP)، بحدّ أقصى 8 ميغابايت لكلٍّ منها. شهادة الشهادة المتوسّطة مطلوبة فقط لمتقدّمي الصفّ الحادي عشر.',
  noFileUploaded: 'لم يُرفَع أيّ ملفّ',
  upload: '+ رفع',
  uploading: 'جارٍ الرفع…',
  addAnother: '+ إضافة آخر',
  fileTooLarge: 'الملفّ كبير جدًا (الحدّ الأقصى 8 ميغابايت)',
  networkError: 'خطأ في الشبكة — يُرجى المحاولة مجدّدًا',

  kindPassport: 'نسخة جواز السفر',
  kindPassportPhotos: 'صورتان شخصيّتان',
  kindReportCard: 'بطاقة العلامات من المدرسة السابقة',
  kindMedical: 'التقرير الطبّي ودفتر اللقاحات',
  kindPassingCert: 'إفادة الانتقال (مصدَّقة من وزارة التربية)',
  kindBrevet: 'شهادة الشهادة المتوسّطة (لمتقدّمي الصفّ الحادي عشر)',
  kindOther: 'مستند داعم آخر',

  reviewTitle: 'المراجعة والإرسال',
  reviewHelper: 'يُرجى مراجعة الطلب قبل إرساله.',
  documentsAttached: 'المستندات المرفقة',
  noDocuments:
    'لم يُرفَع أيّ مستند بعد. يمكنكم المتابعة وإرسالها لاحقًا، لكنّ تقديمها الآن يُسرّع دراسة الطلب.',
  acknowledgement:
    'أُقرّ بأنّ جميع المعلومات الواردة في هذا الطلب صحيحة وكاملة وفق علمي.',

  sectionStudent: 'معلومات الطالب',
  sectionPrevSchool: 'المدرسة السابقة',
  sectionGuardian1: 'ولي الأمر 1',
  sectionGuardian2: 'ولي الأمر 2',
  sectionEmergency: 'جهات الاتصال في حالات الطوارئ',

  labelName: 'الاسم',
  labelGender: 'الجنس',
  labelDOB: 'تاريخ الولادة',
  labelPlaceOfBirth: 'مكان الولادة',
  labelNationality: 'الجنسية',
  labelSecondNationality: 'الجنسية الثانية',
  labelGradeApplying: 'الصفّ المطلوب',
  labelTransportation: 'النقل',
  labelPrevSchool: 'المدرسة',
  labelPrevGrade: 'آخر صفّ',
  labelLanguagesHome: 'لغات المنزل',
  labelRelationship: 'صلة القرابة',
  labelMobile: 'الجوّال',
  labelHomePhone: 'هاتف المنزل',
  labelContact1: 'جهة الاتصال 1',
  labelContact2: 'جهة الاتصال 2',
}

export const FORM_LABELS: Record<AppLang, FormLabels> = { en, fr, ar }

export function isAppLang(value: string): value is AppLang {
  return value === 'en' || value === 'fr' || value === 'ar'
}
