import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getActiveAnnouncements } from '@/lib/content/announcements'
import { getAllNews } from '@/lib/content/news'
import { getAllEvents } from '@/lib/content/events'

type Args = {
  params: Promise<{ locale: string }>
}

const HERO_IMG = '/images/seed/header.jpeg'
const SLAB_IMG =
  'https://images.unsplash.com/photo-1568667256549-094345857637?w=1400&q=80'
const DREAMS_IMG =
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=2000&q=80'

const SCHOLARSHIP_IMGS = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80',
]
const VOICE_IMGS = [
  'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=300&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
]
const EVENT_FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80',
  'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=900&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
]
const NEWS_FEATURE_FALLBACK =
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80'

type TKey =
  | 'eyebrowWelcome'
  | 'heroTitle'
  | 'heroLede'
  | 'ctaApply'
  | 'factAges'
  | 'factAgesV'
  | 'factProgramme'
  | 'factProgrammeV'
  | 'factLanguages'
  | 'factLanguagesV'
  | 'factLocation'
  | 'factLocationV'
  | 'announceLabel'
  | 'campusNewsEyebrow'
  | 'campusNewsTitle'
  | 'allNews'
  | 'newsFeatureTag'
  | 'newsFeatureTitle'
  | 'newsFeatureBody'
  | 'newsFeatureMeta'
  | 'academicsEyebrow'
  | 'academicsTitle'
  | 'allDivisions'
  | 'slabEyebrow'
  | 'slabTitle'
  | 'slabP1'
  | 'slabP2'
  | 'statYears'
  | 'statYearsV'
  | 'statStudents'
  | 'statStudentsV'
  | 'statFaculty'
  | 'statFacultyV'
  | 'whyEyebrow'
  | 'whyTitle'
  | 'eventsEyebrow'
  | 'eventsTitle'
  | 'fullCalendar'
  | 'readDetails'
  | 'scholEyebrow'
  | 'scholTitle'
  | 'scholDisclaimer'
  | 'learnMore'
  | 'voicesEyebrow'
  | 'voicesTitle'
  | 'voicesDisclaimer'
  | 'dreamsEyebrow'
  | 'dreamsTitle'
  | 'dreamsBody'
  | 'dreamsApply'
  | 'faqEyebrow'
  | 'faqTitle'
  | 'faqBody'
  | 'faqContact'

const T: Record<string, Record<TKey, string>> = {
  en: {
    eyebrowWelcome: 'Welcome to Cadmous College',
    heroTitle: 'Bridging tradition with a curious, modern education.',
    heroLede:
      'From Kindergarten to Grade 12, we teach in English, French, and Arabic — and prepare every student to thrive at university and in the world beyond it.',
    ctaApply: 'Apply to Cadmous',
    factAges: 'Ages',
    factAgesV: '3 – 18',
    factProgramme: 'Programme',
    factProgrammeV: 'IB World School',
    factLanguages: 'Languages',
    factLanguagesV: 'EN · FR · AR',
    factLocation: 'Location',
    factLocationV: 'Tyre, Lebanon',
    announceLabel: 'Announcements',
    campusNewsEyebrow: 'Campus News',
    campusNewsTitle: 'Stories from across the school.',
    allNews: 'All news',
    newsFeatureTag: 'Innovation',
    newsFeatureTitle:
      'Cadmous opens new STEAM lab to support inquiry-based science teaching',
    newsFeatureBody:
      'The new facility brings robotics kits, a maker bench, and dedicated design space to students from Grade 6 onward — built around the IB approach to inquiry.',
    newsFeatureMeta: '8 Aug 2025 · 3 min read',
    academicsEyebrow: 'Academics',
    academicsTitle: 'Six divisions. One school.',
    allDivisions: 'All divisions',
    slabEyebrow: 'A school rooted in Tyre',
    slabTitle:
      'Almost half a century of educating the next generation of Lebanon.',
    slabP1:
      'Founded in 1976, Cadmous College has educated thousands of students across the south of Lebanon. Our classrooms move fluidly between three languages, our curriculum is shaped by the IB philosophy, and our community brings together families from across faiths, backgrounds, and nationalities.',
    slabP2:
      '[Placeholder paragraph — replace with verified copy from the school.]',
    statYears: 'Years educating',
    statYearsV: '[XX]+',
    statStudents: 'Students enrolled',
    statStudentsV: '[XXX]',
    statFaculty: 'Faculty members',
    statFacultyV: '[XX]',
    whyEyebrow: 'Why Cadmous',
    whyTitle: 'Five things that shape the way we teach.',
    eventsEyebrow: 'Upcoming Events',
    eventsTitle: "What's on at Cadmous.",
    fullCalendar: 'Full calendar',
    readDetails: 'Read details →',
    scholEyebrow: 'Financial Aid',
    scholTitle: 'Cadmous for every family who belongs here.',
    scholDisclaimer:
      '[Sample financial-aid programmes — confirm with the admissions office before publishing.]',
    learnMore: 'Learn More →',
    voicesEyebrow: 'Voices',
    voicesTitle: 'From students, families, and faculty.',
    voicesDisclaimer: '[Sample voices — replace with quotes captured with consent.]',
    dreamsEyebrow: 'Big dreams begin here',
    dreamsTitle: 'A vibrant, inclusive place to learn, grow, and connect.',
    dreamsBody:
      'At Cadmous, school life goes beyond the classroom — friendships, performances, sports days, and service projects shape the kind of person each student becomes. Come and see it for yourself.',
    dreamsApply: 'Apply to Cadmous',
    faqEyebrow: 'Frequently Asked',
    faqTitle: 'Answers to the questions families ask most.',
    faqBody:
      "If you don't find your answer here, our admissions team is one phone call or email away.",
    faqContact: 'Contact Admissions',
  },
  fr: {
    eyebrowWelcome: 'Bienvenue au Collège Cadmous',
    heroTitle: "Une tradition vivante, une éducation moderne et curieuse.",
    heroLede:
      "De la maternelle à la Terminale, nous enseignons en anglais, français et arabe — et préparons chaque élève à réussir à l'université et au-delà.",
    ctaApply: 'Postuler à Cadmous',
    factAges: 'Âges',
    factAgesV: '3 – 18',
    factProgramme: 'Programme',
    factProgrammeV: 'École du monde de l’IB',
    factLanguages: 'Langues',
    factLanguagesV: 'EN · FR · AR',
    factLocation: 'Lieu',
    factLocationV: 'Tyr, Liban',
    announceLabel: 'Annonces',
    campusNewsEyebrow: 'Actualités du campus',
    campusNewsTitle: "Des histoires venues de toute l'école.",
    allNews: 'Toutes les actualités',
    newsFeatureTag: 'Innovation',
    newsFeatureTitle:
      "Cadmous ouvre un nouveau laboratoire STEAM pour l'enseignement par l'enquête",
    newsFeatureBody:
      "Le nouveau laboratoire offre des kits de robotique, un atelier maker et un espace de design dédié aux élèves dès la 6e — pensé autour de l'approche IB.",
    newsFeatureMeta: '8 août 2025 · 3 min de lecture',
    academicsEyebrow: 'Académique',
    academicsTitle: 'Six divisions. Une seule école.',
    allDivisions: 'Toutes les divisions',
    slabEyebrow: 'Une école enracinée à Tyr',
    slabTitle:
      'Près d’un demi-siècle au service de l’éducation au Liban.',
    slabP1:
      "Fondé en 1976, le Collège Cadmous a formé des milliers d'élèves dans le sud du Liban. Nos salles de classe naviguent entre trois langues, notre programme est façonné par la philosophie de l'IB, et notre communauté rassemble des familles de toutes confessions et origines.",
    slabP2:
      '[Paragraphe à remplacer par le contenu vérifié de l’école.]',
    statYears: 'Années d’éducation',
    statYearsV: '[XX]+',
    statStudents: 'Élèves inscrits',
    statStudentsV: '[XXX]',
    statFaculty: 'Membres du corps enseignant',
    statFacultyV: '[XX]',
    whyEyebrow: 'Pourquoi Cadmous',
    whyTitle: 'Cinq choses qui façonnent notre enseignement.',
    eventsEyebrow: 'Événements à venir',
    eventsTitle: "Ce qui se passe à Cadmous.",
    fullCalendar: 'Calendrier complet',
    readDetails: 'Voir les détails →',
    scholEyebrow: 'Aide financière',
    scholTitle: "Cadmous pour chaque famille qui s'y reconnaît.",
    scholDisclaimer:
      "[Programmes d'aide financière à confirmer avec le service des admissions.]",
    learnMore: 'En savoir plus →',
    voicesEyebrow: 'Voix',
    voicesTitle: 'Élèves, familles, enseignants.',
    voicesDisclaimer:
      '[Citations à remplacer par des témoignages recueillis avec consentement.]',
    dreamsEyebrow: 'Les grands rêves commencent ici',
    dreamsTitle: 'Un lieu vivant et inclusif pour apprendre, grandir, se rencontrer.',
    dreamsBody:
      "À Cadmous, la vie scolaire dépasse la salle de classe — amitiés, spectacles, journées sportives et projets de service forgent la personnalité de chaque élève. Venez le constater par vous-même.",
    dreamsApply: 'Postuler à Cadmous',
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'Les réponses aux questions des familles.',
    faqBody:
      "Si vous ne trouvez pas votre réponse ici, notre équipe d'admission est à un appel ou un e-mail.",
    faqContact: 'Contacter les admissions',
  },
  ar: {
    eyebrowWelcome: 'مرحبًا بكم في مدرسة قدموس',
    heroTitle: 'تعليم يصل التقليد بالفضول الحديث.',
    heroLede:
      'من رياض الأطفال إلى الصف الثاني عشر، ندرّس بالعربية والإنجليزية والفرنسية — ونعدّ كل طالب للتفوق في الجامعة وما بعدها.',
    ctaApply: 'قدّم إلى قدموس',
    factAges: 'الأعمار',
    factAgesV: '3 – 18',
    factProgramme: 'البرنامج',
    factProgrammeV: 'مدرسة عالمية للبكالوريا',
    factLanguages: 'اللغات',
    factLanguagesV: 'عربي · إنجليزي · فرنسي',
    factLocation: 'الموقع',
    factLocationV: 'صور، لبنان',
    announceLabel: 'إعلانات',
    campusNewsEyebrow: 'أخبار الحرم',
    campusNewsTitle: 'قصص من كل أقسام المدرسة.',
    allNews: 'كل الأخبار',
    newsFeatureTag: 'ابتكار',
    newsFeatureTitle:
      'قدموس تفتتح مختبر STEAM جديدًا لدعم التعليم القائم على البحث',
    newsFeatureBody:
      'يضم المختبر الجديد أدوات الروبوتات وورشة تصميم مخصصة للطلاب من الصف السادس وما فوق، وفق منهج البكالوريا الدولية.',
    newsFeatureMeta: '8 آب 2025 · قراءة 3 دقائق',
    academicsEyebrow: 'الأكاديميات',
    academicsTitle: 'ست أقسام. مدرسة واحدة.',
    allDivisions: 'كل الأقسام',
    slabEyebrow: 'مدرسة متجذّرة في صور',
    slabTitle: 'قرابة نصف قرن في تعليم أجيال لبنان.',
    slabP1:
      'تأسست مدرسة قدموس عام 1976، وعلّمت آلاف الطلاب في جنوب لبنان. صفوفنا تنتقل بين ثلاث لغات، ومنهجنا تشكّله فلسفة البكالوريا الدولية، ومجتمعنا يجمع عائلات من خلفيات وأديان متنوعة.',
    slabP2: '[نص بديل — سيتم استبداله بمحتوى موثّق من المدرسة.]',
    statYears: 'سنوات من التعليم',
    statYearsV: '[XX]+',
    statStudents: 'الطلاب المسجّلون',
    statStudentsV: '[XXX]',
    statFaculty: 'الهيئة التعليمية',
    statFacultyV: '[XX]',
    whyEyebrow: 'لماذا قدموس',
    whyTitle: 'خمس ركائز تشكّل طريقتنا في التعليم.',
    eventsEyebrow: 'الفعاليات القادمة',
    eventsTitle: 'ما الجديد في قدموس.',
    fullCalendar: 'كامل التقويم',
    readDetails: 'التفاصيل ←',
    scholEyebrow: 'المساعدات المالية',
    scholTitle: 'قدموس لكل عائلة تنتمي إلى هنا.',
    scholDisclaimer:
      '[برامج للمساعدات المالية — يُرجى تأكيدها مع قسم القبول قبل النشر.]',
    learnMore: 'اعرف المزيد ←',
    voicesEyebrow: 'أصوات',
    voicesTitle: 'من الطلاب والعائلات وأعضاء الهيئة.',
    voicesDisclaimer:
      '[شهادات للعرض — ستُستبدل بشهادات حقيقية بموافقة أصحابها.]',
    dreamsEyebrow: 'الأحلام الكبيرة تبدأ هنا',
    dreamsTitle: 'مكان نابض وشامل للتعلّم والنموّ والتواصل.',
    dreamsBody:
      'الحياة المدرسية في قدموس تتجاوز الصفوف — الصداقات، العروض، الأيام الرياضية، ومشاريع الخدمة كلها تصقل شخصية الطالب.',
    dreamsApply: 'قدّم إلى قدموس',
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'إجابات عن أكثر ما تسأل عنه العائلات.',
    faqBody:
      'إن لم تجد إجابتك هنا، فإن فريق القبول لدينا على بعد مكالمة أو بريد إلكتروني.',
    faqContact: 'تواصل مع قسم القبول',
  },
}

const ANNOUNCEMENTS: Record<string, { t: string; b: string }[]> = {
  en: [
    { t: 'New Innovation Lab', b: 'Our new STEAM lab opens this term — student-built robotics, design, and biology projects on display.' },
    { t: 'Open Day · 14 Nov', b: 'Tour the campus, meet our teachers, and see lessons in action across every division.' },
    { t: 'IB Authorisation', b: 'Cadmous is now an authorised IB World School delivering the Diploma Programme in Grades 11 – 12.' },
    { t: 'Community Service', b: 'Grade 10 students completed a coastal clean-up across three Tyre beaches as part of CAS.' },
  ],
  fr: [
    { t: 'Nouveau laboratoire', b: 'Notre nouveau labo STEAM ouvre ce trimestre — projets de robotique, design et biologie réalisés par les élèves.' },
    { t: 'Journée portes ouvertes · 14 nov.', b: "Visitez le campus, rencontrez les enseignants et observez des cours dans chaque division." },
    { t: 'Autorisation IB', b: "Cadmous est désormais une École du monde de l'IB autorisée pour le Diplôme en 1re et Terminale." },
    { t: 'Service communautaire', b: "Les élèves de 2nde ont nettoyé trois plages de Tyr dans le cadre du CAS." },
  ],
  ar: [
    { t: 'مختبر الابتكار الجديد', b: 'يفتتح مختبر STEAM الجديد هذا الفصل — مشاريع روبوتات وتصميم وبيولوجيا من إنجاز الطلاب.' },
    { t: 'يوم مفتوح · 14 تشرين الثاني', b: 'جولة في الحرم ولقاء مع المعلّمين ومشاهدة الدروس في كل المراحل.' },
    { t: 'اعتماد البكالوريا الدولية', b: 'قدموس مدرسة معتمدة لدبلوم البكالوريا الدولية في الصفّين 11 و12.' },
    { t: 'خدمة المجتمع', b: 'طلاب الصف العاشر يشاركون في حملة تنظيف ثلاث شواطئ في صور ضمن برنامج CAS.' },
  ],
}

const NEWS_STACK: Record<string, { date: string; title: string; body: string }[]> = {
  en: [
    { date: '5 Jul 2025 · Academics', title: 'How Our IB Cohort Is Changing the Way We Teach Science', body: 'A note from the Head of Sciences on what we have learned this year.' },
    { date: '7 Jun 2025 · Community', title: 'Grade 12 Coastal Clean-up Brings Together Three Schools', body: 'Students from across Tyre joined for an annual CAS day.' },
    { date: '12 May 2025 · Arts', title: 'Spring Concert Returns to a Full House at Cadmous', body: 'Three nights, two languages, one ensemble — and a packed auditorium.' },
  ],
  fr: [
    { date: '5 juil. 2025 · Académique', title: "Comment notre cohorte IB transforme l'enseignement des sciences", body: 'Un mot du responsable des sciences sur les apprentissages de cette année.' },
    { date: '7 juin 2025 · Communauté', title: 'Le nettoyage côtier de Terminale réunit trois écoles', body: 'Les élèves de Tyr se sont retrouvés pour la journée CAS annuelle.' },
    { date: '12 mai 2025 · Arts', title: 'Le concert de printemps fait salle comble à Cadmous', body: 'Trois soirées, deux langues, un ensemble — et une salle pleine.' },
  ],
  ar: [
    { date: '5 تموز 2025 · أكاديمي', title: 'كيف تُعيد دفعة البكالوريا الدولية تشكيل تعليم العلوم', body: 'كلمة من رئيس قسم العلوم حول تعلّمنا هذا العام.' },
    { date: '7 حزيران 2025 · مجتمع', title: 'الصف الثاني عشر يجمع ثلاث مدارس في تنظيف الشاطئ', body: 'طلاب من صور التقوا في يوم CAS السنوي.' },
    { date: '12 أيار 2025 · فنون', title: 'حفل الربيع يعود إلى قاعة مكتظّة في قدموس', body: 'ثلاث أمسيات ولغتان وفرقة واحدة — وقاعة ممتلئة.' },
  ],
}

const DIVISIONS: Record<string, { l: string; b: string; h: string }[]> = {
  en: [
    { l: 'Kindergarten', b: 'From age 3 through Grade 1, in a nurturing environment built on play, curiosity, and creativity.', h: '/kindergarten' },
    { l: 'Elementary', b: 'Foundational years from Grade 2 onward — literacy, numeracy, and the love of learning in three languages.', h: '/elementary' },
    { l: 'Intermediate', b: 'Through Grade 9 and the Brevet — a stage of deeper inquiry and academic identity.', h: '/intermediate' },
    { l: 'Secondary Lebanese', b: 'Grades 10–12 on the Lebanese curriculum, with General Sciences, Life Sciences, and Sociology & Economics streams.', h: '/secondary-lebanese' },
    { l: 'Integrative Program', b: 'An inclusive learning track for students who benefit from individualised support, woven into mainstream school life.', h: '/integrative' },
    { l: 'International Programmes', b: 'The IB Diploma (Y11–Y12), the International Programme (Y9–Y10), and SAT preparation.', h: '/international-programs' },
  ],
  fr: [
    { l: 'Maternelle', b: "Dès 3 ans et jusqu'à la 1re année, dans un cadre bienveillant fondé sur le jeu, la curiosité et la créativité.", h: '/kindergarten' },
    { l: 'Primaire', b: "Les années fondatrices à partir de la 2e année — lecture, calcul et goût d'apprendre en trois langues.", h: '/elementary' },
    { l: 'Collège', b: "Jusqu'à la 9e et au Brevet — une étape de questionnement et d'affirmation scolaire.", h: '/intermediate' },
    { l: 'Secondaire libanais', b: 'De la 10e à la 12e sur le programme libanais, avec les sections Sciences générales, Sciences de la vie et Sociologie & Économie.', h: '/secondary-lebanese' },
    { l: 'Programme intégratif', b: "Un parcours inclusif pour les élèves qui bénéficient d'un soutien personnalisé, intégré à la vie scolaire.", h: '/integrative' },
    { l: 'Programmes internationaux', b: 'Le Diplôme IB (Y11–Y12), le Programme international (Y9–Y10) et la préparation au SAT.', h: '/international-programs' },
  ],
  ar: [
    { l: 'الروضة', b: 'من عمر الثلاث سنوات حتى الصفّ الأوّل، في بيئة حاضنة قائمة على اللعب والفضول والإبداع.', h: '/kindergarten' },
    { l: 'الابتدائيّة', b: 'السنوات التأسيسيّة من الصفّ الثاني فصاعدًا — القراءة والحساب وحبّ التعلّم بثلاث لغات.', h: '/elementary' },
    { l: 'المتوسّطة', b: 'حتى الصفّ التاسع والشهادة المتوسّطة — مرحلة تعمّق وبناء هويّة أكاديميّة.', h: '/intermediate' },
    { l: 'الثانوي اللبناني', b: 'من الصفّ العاشر حتى الثاني عشر على المنهج اللبنانيّ، بفروع العلوم العامّة، علوم الحياة، الاجتماع والاقتصاد.', h: '/secondary-lebanese' },
    { l: 'البرنامج التكاملي', b: 'مسار تعلّم شامل للطلّاب الذين يستفيدون من دعم فرديّ، ضمن الحياة المدرسيّة العامّة.', h: '/integrative' },
    { l: 'البرامج الدوليّة', b: 'دبلوم البكالوريا الدوليّة (الصفّان 11 و12)، البرنامج الدوليّ (الصفّان 9 و10)، وتحضير SAT.', h: '/international-programs' },
  ],
}

const WHY_ITEMS: Record<string, { n: string; h: string; b: string }[]> = {
  en: [
    { n: '01', h: 'A trilingual classroom', b: 'English, French, and Arabic move through every grade, taught by native speakers.' },
    { n: '02', h: 'An IB World School', b: 'Authorised to deliver the Diploma — internationally recognised, university-ready.' },
    { n: '03', h: 'Inclusive by design', b: 'Our Integrative Program supports diverse learners across every division.' },
    { n: '04', h: 'Athletics, arts, service', b: 'What happens after the bell shapes a student as much as the lesson before it.' },
    { n: '05', h: 'Counselling for university', b: 'Personalised guidance through Lebanese, French, North American, and UK applications.' },
  ],
  fr: [
    { n: '01', h: 'Une classe trilingue', b: 'Anglais, français et arabe à tous les niveaux, enseignés par des locuteurs natifs.' },
    { n: '02', h: "École du monde de l'IB", b: 'Autorisée pour le Diplôme — reconnu internationalement, prêt pour l’université.' },
    { n: '03', h: 'Inclusive par construction', b: 'Notre programme intégratif accompagne tous les profils dans chaque division.' },
    { n: '04', h: 'Sports, arts et service', b: 'Ce qui se passe après la cloche compte autant que le cours qui précède.' },
    { n: '05', h: 'Orientation universitaire', b: 'Accompagnement personnalisé pour les filières libanaise, française, nord-américaine et britannique.' },
  ],
  ar: [
    { n: '01', h: 'صف ثلاثي اللغات', b: 'العربية والإنجليزية والفرنسية في كل المراحل، يدرّسها معلّمون أصليّون.' },
    { n: '02', h: 'مدرسة عالمية للبكالوريا', b: 'مرخّصة لتقديم الدبلوم — معترف به دوليًا، مهيّئ للجامعة.' },
    { n: '03', h: 'شاملة بحكم التصميم', b: 'برنامجنا التكاملي يدعم الطلاب من مختلف القدرات في كل قسم.' },
    { n: '04', h: 'رياضة وفنون وخدمة', b: 'ما يحدث بعد الجرس يصقل الطالب بقدر ما يفعله الدرس قبلها.' },
    { n: '05', h: 'إرشاد جامعي', b: 'دعم مخصّص للالتحاق بالجامعات اللبنانية والفرنسية والأمريكية والبريطانية.' },
  ],
}

const SCHOLARSHIPS: Record<string, { title: string; body: string }[]> = {
  en: [
    { title: "Founders' Scholarship", body: 'For exceptional academic achievement at entry to Grade 9 and Grade 11. Covers up to 50% of tuition.' },
    { title: 'Need-Based Financial Aid', body: 'Confidential support for families whose circumstances change. Reviewed annually by the Aid Committee.' },
    { title: 'Sibling & Faculty Discount', body: 'Tuition reductions for families enrolling multiple children, and for children of Cadmous faculty.' },
  ],
  fr: [
    { title: 'Bourse des fondateurs', body: "Pour l'excellence académique à l'entrée en 3e et en 1re. Couvre jusqu'à 50 % des frais." },
    { title: 'Aide financière sur dossier', body: "Soutien confidentiel pour les familles dont la situation change. Examen annuel." },
    { title: 'Réduction fratrie & personnel', body: 'Réductions pour les familles avec plusieurs enfants et pour le personnel de Cadmous.' },
  ],
  ar: [
    { title: 'منحة المؤسسين', body: 'لتميّز أكاديمي استثنائي عند الالتحاق بالصف التاسع والحادي عشر. تغطّي حتى 50% من الرسوم.' },
    { title: 'مساعدة مبنية على الحاجة', body: 'دعم سرّي للعائلات التي تتغيّر ظروفها. تُراجَع سنويًا من قبل لجنة المساعدات.' },
    { title: 'خصم الأشقاء والكادر', body: 'تخفيضات للعائلات التي تسجّل عدة أبناء، ولأبناء كادر قدموس.' },
  ],
}

const VOICES: Record<string, { quote: string; name: string; role: string }[]> = {
  en: [
    { quote: "I came in speaking only French. Three years later I'm doing my IB Extended Essay in English and I still write best in Arabic.", name: 'Lina H.', role: 'Grade 12 · IB Diploma' },
    { quote: "What I love about Cadmous is that the same teacher who pushed me in physics also showed up to my football match on Saturday.", name: 'Karim D.', role: 'Grade 11' },
    { quote: "The school took the time to understand my daughter — not just her grades, but how she learns and what makes her light up.", name: 'Mrs. R. Saadeh', role: 'Parent · Elementary' },
  ],
  fr: [
    { quote: "Je suis arrivée en ne parlant que français. Trois ans plus tard, je rédige mon mémoire IB en anglais — et j'écris toujours mieux en arabe.", name: 'Lina H.', role: 'Terminale · Diplôme IB' },
    { quote: "Ce que j'aime à Cadmous : le même professeur qui m'a poussé en physique est venu à mon match de foot samedi.", name: 'Karim D.', role: '1re' },
    { quote: "L'école a pris le temps de comprendre ma fille — pas seulement ses notes, mais sa façon d'apprendre.", name: 'Mme R. Saadeh', role: 'Parent · Primaire' },
  ],
  ar: [
    { quote: 'دخلت المدرسة لا أتكلّم سوى الفرنسية، وبعد ثلاث سنوات أكتب بحث البكالوريا الدولية بالإنجليزية — وما زلت أُجيد العربية أكثر.', name: 'لينا ح.', role: 'الصف 12 · دبلوم البكالوريا' },
    { quote: 'ما أحبّه في قدموس أن المعلّم نفسه الذي شجّعني في الفيزياء حضر مباراتي يوم السبت.', name: 'كريم د.', role: 'الصف 11' },
    { quote: 'أخذت المدرسة الوقت لتفهم ابنتي — ليس فقط علاماتها، بل كيف تتعلّم وما يُلهمها.', name: 'السيدة ر. سعادة', role: 'وليّة أمر · ابتدائي' },
  ],
}

const FAQS: Record<string, { q: string; a: string }[]> = {
  en: [
    { q: 'How do I apply to Cadmous College?', a: 'You can begin an application online in English, French, or Arabic. Our admissions team will review the documents and invite you for a meeting and an age-appropriate assessment.' },
    { q: 'What are the admissions requirements?', a: "We require a completed application, two recent school reports, the student's birth certificate, vaccination record, and two passport-size photographs." },
    { q: 'Can my child apply mid-year?', a: "Yes. Mid-year placements are considered case by case, depending on grade-level availability and the student's previous school records." },
    { q: 'What languages will my child be taught in?', a: 'All three — English, French, and Arabic. The balance shifts by grade and track, with the IB Diploma delivered primarily in English.' },
    { q: 'Is financial aid available?', a: 'Cadmous offers a small number of merit and need-based programmes. Financial aid is reviewed annually and treated in confidence.' },
  ],
  fr: [
    { q: 'Comment postuler à Cadmous ?', a: "Vous pouvez démarrer la candidature en ligne en anglais, français ou arabe. L'équipe d'admission examine le dossier puis vous invite à un entretien et une évaluation." },
    { q: "Quels sont les documents requis ?", a: 'Le dossier comprend le formulaire, deux bulletins récents, l’acte de naissance, le carnet de vaccination et deux photos d’identité.' },
    { q: 'Est-il possible de postuler en cours d’année ?', a: "Oui. Les admissions en cours d'année sont étudiées au cas par cas selon les places disponibles." },
    { q: "Dans quelles langues sera enseigné mon enfant ?", a: 'Anglais, français et arabe. L’équilibre varie selon le niveau, avec un Diplôme IB principalement en anglais.' },
    { q: 'Existe-t-il une aide financière ?', a: "Oui — quelques programmes au mérite et sur dossier. Examen annuel et confidentiel." },
  ],
  ar: [
    { q: 'كيف أقدّم طلبًا إلى قدموس؟', a: 'يمكنك بدء الطلب إلكترونيًا بالعربية أو الإنجليزية أو الفرنسية. سيراجع فريق القبول الوثائق ويدعوك لمقابلة وتقييم مناسب للعمر.' },
    { q: 'ما متطلّبات القبول؟', a: 'تتطلّب نموذج الطلب وآخر علامتَين دراسيّتَين وشهادة الميلاد ودفتر اللقاحات وصورتَين شخصيّتَين.' },
    { q: 'هل يمكن التقدّم منتصف العام؟', a: 'نعم، تُدرَس حالات منتصف العام تبعًا للشواغر وسجل الطالب السابق.' },
    { q: 'بأي اللغات سيتلقّى ابني التعليم؟', a: 'الثلاث — العربية والإنجليزية والفرنسية. يختلف التوازن بحسب الصف، ويُقدَّم دبلوم البكالوريا أساسًا بالإنجليزية.' },
    { q: 'هل تتوفّر مساعدات مالية؟', a: 'نعم، عدد محدود من البرامج الاستحقاقية والقائمة على الحاجة، تُراجَع سنويًا وبسريّة.' },
  ],
}

const NEWS_FALLBACK_DATE: Record<string, string> = {
  en: 'Coming soon',
  fr: 'Bientôt',
  ar: 'قريبًا',
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const l = T[locale] || T.en

  const posts = (await getAllNews(locale)).slice(0, 4)
  const events = (await getAllEvents(locale)).slice(0, 4)
  const liveAnnouncements = await getActiveAnnouncements(locale)

  const featuredPost = posts[0]
  const stackPosts = posts.slice(1, 4)
  const stackFallback = NEWS_STACK[locale] || NEWS_STACK.en
  const announcementsFallback = ANNOUNCEMENTS[locale] || ANNOUNCEMENTS.en
  const announcements = liveAnnouncements.length > 0
    ? liveAnnouncements.slice(0, 4).map((a) => ({ t: a.title, b: a.body || '' }))
    : announcementsFallback
  const divisions = DIVISIONS[locale] || DIVISIONS.en
  const whyItems = WHY_ITEMS[locale] || WHY_ITEMS.en
  const scholarships = SCHOLARSHIPS[locale] || SCHOLARSHIPS.en
  const voices = VOICES[locale] || VOICES.en
  const faqs = FAQS[locale] || FAQS.en

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  return (
    <div className="bg-navy-900 text-[#f4f5f8]">
      {/* ANNOUNCE */}
      <section className="border-b border-white/10 bg-navy-800 px-[clamp(20px,4vw,48px)] py-6">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-[180px_1fr_1fr_1fr_1fr]">
          <div className="pt-[6px] text-[11px] font-bold uppercase tracking-[0.18em] text-crimson-400">
            <span className="me-3 inline-block h-[1.5px] w-6 bg-crimson-400 align-middle" />
            {l.announceLabel}
          </div>
          {announcements.map((it, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-2 h-[6px] w-[6px] flex-shrink-0 rounded-full bg-crimson-500" />
              <p className="m-0 text-[13px] leading-[1.5] text-white/70">
                <strong className="mb-1 block text-[13.5px] font-semibold text-white">
                  {it.t}
                </strong>
                {it.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HERO */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-white/10 px-[clamp(20px,4vw,48px)] pt-20 pb-24">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Campus" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(14,26,48,0.96)] via-[rgba(22,36,63,0.85)] to-[rgba(22,36,63,0.55)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1240px]">
          <p className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
            {l.eyebrowWelcome}
          </p>
          <h1 className="max-w-[16ch] text-[clamp(48px,6.8vw,84px)] font-bold leading-[1.05] tracking-[-0.025em]">
            {l.heroTitle}
          </h1>
          <p className="mt-7 mb-8 max-w-[56ch] text-lg leading-[1.55] text-[#f4f5f8]">
            {l.heroLede}
          </p>
          <div className="flex flex-wrap items-center gap-[18px]">
            <Link
              href={'/admissions'}
              className="inline-flex items-center gap-2 rounded-[4px] border border-crimson-500 bg-crimson-500 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400"
            >
              {l.ctaApply}
            </Link>
          </div>
          <div className="mt-8 flex max-w-[760px] flex-wrap overflow-hidden rounded-[6px] border border-white/20 bg-[rgba(14,26,48,0.45)] backdrop-blur-sm">
            {[
              [l.factAges, l.factAgesV],
              [l.factProgramme, l.factProgrammeV],
              [l.factLanguages, l.factLanguagesV],
              [l.factLocation, l.factLocationV],
            ].map(([label, value], i, arr) => (
              <div
                key={i}
                className={`min-w-[140px] flex-auto px-[22px] py-[14px] ${
                  i < arr.length - 1 ? 'border-r border-white/10' : ''
                }`}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {label}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS NEWS */}
      <section className="px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            eyebrow={l.campusNewsEyebrow}
            title={l.campusNewsTitle}
            link={{ href: '/news', label: l.allNews }}
          />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Link
              href={featuredPost ? `/news/${featuredPost.slug}` : '/news'}
              className="group flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-navy-800 transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="aspect-[16/10] overflow-hidden bg-navy-700">
                <img
                  src={featuredPost?.image || NEWS_FEATURE_FALLBACK}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-7 pt-7 pb-8">
                <span className="mb-[14px] inline-block rounded-[3px] border border-crimson-400 px-[10px] py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-crimson-400">
                  {featuredPost?.category || l.newsFeatureTag}
                </span>
                <h3 className="mb-[10px] text-[24px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
                  {featuredPost?.title || l.newsFeatureTitle}
                </h3>
                <p className="mb-4 text-[14.5px] text-white/70">
                  {featuredPost?.summary || l.newsFeatureBody}
                </p>
                <div className="text-[12px] tracking-[0.04em] text-white/40">
                  {featuredPost?.publishedAt
                    ? dateFmt(featuredPost.publishedAt)
                    : l.newsFeatureMeta}
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10">
              {(stackPosts.length > 0
                ? stackPosts.map((p) => ({
                    href: `/news/${p.slug}`,
                    date: p.publishedAt
                      ? dateFmt(p.publishedAt)
                      : NEWS_FALLBACK_DATE[locale] || NEWS_FALLBACK_DATE.en,
                    title: p.title,
                    body: p.summary,
                  }))
                : stackFallback.map((s) => ({
                    href: '/news',
                    date: s.date,
                    title: s.title,
                    body: s.body,
                  }))
              ).map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="bg-navy-800 px-6 py-[22px] transition hover:bg-navy-700"
                >
                  <div className="mb-1.5 text-[11px] uppercase tracking-[0.06em] text-white/40">
                    {s.date}
                  </div>
                  <h4 className="mb-1.5 text-base font-semibold leading-[1.35] text-white">
                    {s.title}
                  </h4>
                  <p className="m-0 text-[13px] leading-[1.5] text-white/70">{s.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section className="bg-navy-800 px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            eyebrow={l.academicsEyebrow}
            title={l.academicsTitle}
            link={{ href: '/divisions', label: l.allDivisions }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <Link
                key={d.h}
                href={d.h}
                className="group flex flex-col rounded-[6px] border border-white/10 bg-navy-900 p-7 transition hover:-translate-y-0.5 hover:border-white/20"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-crimson-400 bg-crimson-500/10 font-bold tracking-[-0.02em] text-crimson-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mb-2 text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
                  {d.l}
                </h3>
                <p className="mb-5 flex-1 text-[14px] leading-[1.5] text-white/70">
                  {d.b}
                </p>
                <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-crimson-400 transition group-hover:text-crimson-500">
                  {l.learnMore}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SLAB */}
      <section className="px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-stretch overflow-hidden rounded-lg border border-white/10 lg:grid-cols-2">
            <div className="min-h-[280px] bg-navy-700 lg:min-h-[480px]">
              <img src={SLAB_IMG} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center bg-navy-800 p-9 lg:p-14">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
                {l.slabEyebrow}
              </div>
              <h2 className="mb-5 max-w-[18ch] text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
                {l.slabTitle}
              </h2>
              <p className="mb-3 text-white/70">{l.slabP1}</p>
              <p className="mb-0 text-white/70">{l.slabP2}</p>
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-7 sm:grid-cols-3">
                {[
                  [l.statYearsV, l.statYears],
                  [l.statStudentsV, l.statStudents],
                  [l.statFacultyV, l.statFaculty],
                ].map(([v, label], i) => (
                  <div key={i}>
                    <div className="text-[36px] font-bold leading-none tracking-[-0.02em] text-white">
                      {v}
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-white/40">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MATTERS */}
      <section className="bg-navy-800 px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead eyebrow={l.whyEyebrow} title={l.whyTitle} />
          <div className="flex flex-col">
            {whyItems.map((it, i, arr) => (
              <Link
                key={it.n}
                href={'/vision-mission'}
                className={`group grid items-center gap-4 py-7 lg:grid-cols-[80px_1fr_1fr_auto] lg:gap-8 ${
                  i < arr.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="text-[36px] font-bold leading-none tracking-[-0.03em] text-crimson-400">
                  {it.n}
                </div>
                <h3 className="m-0 text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-white">
                  {it.h}
                </h3>
                <p className="col-span-2 m-0 max-w-[50ch] text-[14.5px] text-white/70 lg:col-span-1">
                  {it.b}
                </p>
                <div className="col-span-2 text-lg text-white/40 transition group-hover:translate-x-1 group-hover:text-crimson-400 lg:col-span-1">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            eyebrow={l.eventsEyebrow}
            title={l.eventsTitle}
            link={{ href: '/events', label: l.fullCalendar }}
          />
          <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
            {events.map((e, i) => {
              const d = new Date(e.startDate)
              return (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-navy-800 transition hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-700">
                    <img
                      src={e.image || EVENT_FALLBACK_IMGS[i % EVENT_FALLBACK_IMGS.length]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-[14px] top-[14px] min-w-[56px] rounded-[4px] bg-crimson-500 px-3 py-2 text-center text-white">
                      <div className="text-[22px] font-bold leading-none tracking-[-0.02em]">
                        {String(d.getDate()).padStart(2, '0')}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                        {d.toLocaleDateString(locale, { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-[22px] pt-5 pb-6">
                    <h4 className="mb-[14px] text-[17px] font-semibold leading-[1.3] text-white">
                      {e.title}
                    </h4>
                    <div className="mb-4 flex flex-1 flex-col gap-2">
                      {e.location && (
                        <div className="flex items-center gap-2 text-[12.5px] text-white/70">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-[13px] w-[13px] flex-shrink-0 opacity-60"
                          >
                            <path d="M12 21s-7-7-7-12a7 7 0 1114 0c0 5-7 12-7 12z" />
                            <circle cx="12" cy="9" r="2.5" />
                          </svg>
                          {e.location}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[12.5px] text-white/70">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-[13px] w-[13px] flex-shrink-0 opacity-60"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        {d.toLocaleTimeString(locale, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-[14px] text-[13px] font-semibold text-crimson-400">
                      {l.readDetails}
                    </div>
                  </div>
                </Link>
              )
            })}
            {events.length === 0 &&
              EVENT_FALLBACK_IMGS.map((img, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-[6px] border border-white/10 bg-navy-800 opacity-80"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-700">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="px-[22px] pt-5 pb-6">
                    <h4 className="text-[17px] font-semibold text-white/80">
                      {locale === 'ar'
                        ? 'فعالية قادمة'
                        : locale === 'fr'
                          ? 'Événement à venir'
                          : 'Upcoming event'}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="bg-navy-800 px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead eyebrow={l.scholEyebrow} title={l.scholTitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {scholarships.map((s, i) => (
              <Link
                key={i}
                href={'/requirements'}
                className="group overflow-hidden rounded-[6px] border border-white/10 bg-navy-900 transition hover:-translate-y-0.5 hover:border-white/20"
              >
                <div className="aspect-[16/10] overflow-hidden bg-navy-700">
                  <img
                    src={SCHOLARSHIP_IMGS[i % SCHOLARSHIP_IMGS.length]}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-[26px] pt-[26px] pb-7">
                  <h3 className="mb-[10px] text-[19px] font-bold leading-[1.25] text-white">
                    {s.title}
                  </h3>
                  <p className="mb-4 text-[14px] text-white/70">{s.body}</p>
                  <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-crimson-400">
                    {l.learnMore}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-[18px] text-[12px] text-white/40">{l.scholDisclaimer}</p>
        </div>
      </section>

      {/* VOICES */}
      <section className="px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead eyebrow={l.voicesEyebrow} title={l.voicesTitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {voices.map((v, i) => (
              <div
                key={i}
                className="flex flex-col gap-[18px] rounded-[6px] border border-white/10 bg-navy-800 p-7"
              >
                <p className="flex-1 text-[17px] leading-[1.5] tracking-[-0.005em] text-white">
                  <span className="me-1 align-[-8px] font-serif text-[32px] leading-none text-crimson-400">
                    “
                  </span>
                  {v.quote}
                </p>
                <div className="flex items-center gap-[14px] border-t border-white/10 pt-4">
                  <img
                    src={VOICE_IMGS[i % VOICE_IMGS.length]}
                    alt=""
                    className="h-12 w-12 rounded-full border-[1.5px] border-crimson-400 object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{v.name}</div>
                    <div className="mt-0.5 text-xs tracking-[0.04em] text-white/40">
                      {v.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-[18px] text-[12px] text-white/40">{l.voicesDisclaimer}</p>
        </div>
      </section>

      {/* DREAMS CTA */}
      <section className="relative overflow-hidden border-t border-b border-white/10 px-[clamp(20px,4vw,48px)] py-24">
        <div className="absolute inset-0 z-0">
          <img src={DREAMS_IMG} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(14,26,48,0.92)] via-[rgba(22,36,63,0.78)] to-[rgba(22,36,63,0.45)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
            {l.dreamsEyebrow}
          </div>
          <h2 className="mb-5 max-w-[22ch] text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {l.dreamsTitle}
          </h2>
          <p className="mb-8 max-w-[56ch] text-[17px] text-white">{l.dreamsBody}</p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href={'/admissions'}
              className="inline-flex items-center gap-2 rounded-[4px] border border-crimson-500 bg-crimson-500 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-crimson-400 hover:bg-crimson-400"
            >
              {l.dreamsApply}
            </Link>
            <Link
              href={'/contact'}
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {l.faqContact}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-800 px-[clamp(20px,4vw,48px)] py-20">
        <div className="mx-auto grid max-w-[1240px] items-start gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
              {l.faqEyebrow}
            </div>
            <h2 className="mb-[18px] text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {l.faqTitle}
            </h2>
            <p className="mb-6 text-white/70">{l.faqBody}</p>
            <Link
              href={'/contact'}
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-[18px] py-[10px] text-[13px] font-semibold tracking-[0.02em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {l.faqContact}
            </Link>
          </div>
          <FAQList items={faqs} />
        </div>
      </section>
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  link,
}: {
  eyebrow?: string
  title?: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson-400">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="max-w-[22ch] text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
            {title}
          </h2>
        )}
      </div>
      {link && (
        <a
          href={link.href}
          className="text-[13px] font-semibold text-crimson-400 hover:text-crimson-500"
        >
          {link.label} →
        </a>
      )}
    </div>
  )
}

function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10">
      {items.map((it, i) => (
        <details
          key={i}
          className="group bg-navy-900 open:bg-navy-800"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-[22px] text-base font-semibold text-white">
            <span>{it.q}</span>
            <span className="text-[22px] leading-none text-crimson-400 transition group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="max-w-[72ch] px-6 pb-[22px] text-[14.5px] leading-[1.65] text-white/70">
            {it.a}
          </div>
        </details>
      ))}
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    ar: 'مدرسة قدموس | مدرسة البكالوريا الدولية',
    en: 'Cadmous College | IB World School',
    fr: "Collège Cadmous | École du monde de l'IB",
  }
  return {
    title: titles[locale] || titles.en,
    description:
      locale === 'ar'
        ? 'مدرسة قدموس - مدرسة البكالوريا الدولية في صور، لبنان'
        : 'Cadmous College — IB World School in Tyre, Lebanon',
  }
}
