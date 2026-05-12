import { eq } from 'drizzle-orm'

import { db } from '../src/db/client'
import {
  divisionTranslations,
  divisions,
  pageTranslations,
  pages,
  siteSettings,
} from '../src/db/schema/cms'
import type { Block } from '../src/lib/blocks/schema'

// ──────────────── divisions ────────────────

type DivisionSeed = {
  slug: string
  position: number
  imageUrl: string
  imageAlt: string
  translations: Record<
    'en' | 'ar' | 'fr',
    { title: string; lede: string; items: { title: string; body: string }[] }
  >
}

const DIVISIONS: DivisionSeed[] = [
  {
    slug: 'kindergarten',
    position: 1,
    imageUrl: 'https://images.unsplash.com/photo-1587653263995-422546a7a569?w=1200&q=80',
    imageAlt: 'Kindergarten',
    translations: {
      en: {
        title: 'Kindergarten',
        lede: 'KG1 – KG2 · Ages 3 – 5',
        items: [
          { title: 'A Day at KG', body: 'Circle, play, story, snack, outdoor, project — a familiar daily rhythm built for young learners.' },
          { title: 'Languages', body: 'Daily exposure to English, French, and Arabic through song, story, and play.' },
          { title: 'Specialists', body: 'Music, movement, and art delivered by dedicated specialist teachers.' },
          { title: 'Transition to Grade 1', body: 'A structured bridge year prepares KG2 children for primary school.' },
        ],
      },
      fr: {
        title: 'Maternelle',
        lede: 'Petite – Grande section · 3 – 5 ans',
        items: [
          { title: 'Une journée en maternelle', body: 'Regroupement, jeu, histoire, goûter, extérieur, projet — un rythme familier pour les jeunes apprenants.' },
          { title: 'Langues', body: 'Exposition quotidienne à l’anglais, au français et à l’arabe par la chanson, l’histoire et le jeu.' },
          { title: 'Spécialistes', body: 'Musique, motricité et arts assurés par des enseignants spécialisés.' },
          { title: 'Passage en CP', body: 'Une année passerelle structurée pour préparer le primaire.' },
        ],
      },
      ar: {
        title: 'الروضة',
        lede: 'الروضة الأولى والثانية · من 3 إلى 5 سنوات',
        items: [
          { title: 'يوم في الروضة', body: 'دائرة، لعب، قصة، استراحة، نشاط خارجي، مشروع — إيقاع يومي مألوف للمتعلّمين الصغار.' },
          { title: 'اللغات', body: 'تعرّض يومي للعربية والإنجليزية والفرنسية عبر الأغنية والقصة واللعب.' },
          { title: 'مختصّون', body: 'الموسيقى والحركة والفنّ بإشراف معلّمين مختصّين.' },
          { title: 'الانتقال إلى الصف الأول', body: 'سنة جسرية مدروسة تُهيّئ أطفال الروضة الثانية للابتدائي.' },
        ],
      },
    },
  },
  {
    slug: 'elementary',
    position: 2,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    imageAlt: 'Elementary',
    translations: {
      en: {
        title: 'Elementary',
        lede: 'Grades 1 – 5',
        items: [
          { title: 'Core subjects', body: 'Mathematics, sciences, languages, social studies, arts, and physical education.' },
          { title: 'Reading culture', body: 'A library-rich environment with weekly reading conferences and book fairs.' },
          { title: 'Project work', body: 'Inquiry projects each term — students learn to ask, investigate, and present.' },
          { title: 'Wellbeing', body: 'Pastoral support and a strong homeroom system anchor every child.' },
        ],
      },
      fr: {
        title: 'Primaire',
        lede: 'CP – CM2',
        items: [
          { title: 'Matières fondamentales', body: 'Mathématiques, sciences, langues, sciences humaines, arts et EPS.' },
          { title: 'Culture de la lecture', body: 'Une bibliothèque riche, des cercles de lecture hebdomadaires et des foires du livre.' },
          { title: 'Travail par projet', body: "Des projets d'investigation chaque trimestre — questionner, enquêter, présenter." },
          { title: 'Bien-être', body: 'Un encadrement pastoral et un système de titulaires solides ancrent chaque enfant.' },
        ],
      },
      ar: {
        title: 'الابتدائية',
        lede: 'الصفوف 1 – 5',
        items: [
          { title: 'المواد الأساسية', body: 'الرياضيات، العلوم، اللغات، الدراسات الاجتماعية، الفنون، والتربية الرياضية.' },
          { title: 'ثقافة القراءة', body: 'مكتبة غنية، حلقات قراءة أسبوعية، ومعارض كتب.' },
          { title: 'العمل بالمشاريع', body: 'مشاريع بحثية كل فصل — السؤال، الاستقصاء، والعرض.' },
          { title: 'الرعاية', body: 'دعم تربوي ونظام صفّي قوي يُحيطان بكل طفل.' },
        ],
      },
    },
  },
  {
    slug: 'intermediate',
    position: 3,
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80',
    imageAlt: 'Intermediate',
    translations: {
      en: {
        title: 'Intermediate',
        lede: 'Grades 6 – 9',
        items: [
          { title: 'Academic stretch', body: 'Subject specialists across sciences, mathematics, humanities, and languages.' },
          { title: 'Choices begin', body: 'Optional courses in computing, design, and second-language pathways.' },
          { title: 'Service learning', body: 'Students contribute to local community projects through advisory.' },
          { title: 'Pathways forward', body: 'Counselling supports the move into the Lebanese or international tracks.' },
        ],
      },
      fr: {
        title: 'Collège',
        lede: '6e – 3e',
        items: [
          { title: 'Exigence académique', body: 'Des spécialistes en sciences, mathématiques, sciences humaines et langues.' },
          { title: 'Premiers choix', body: 'Cours optionnels en informatique, design et parcours de deuxième langue.' },
          { title: 'Apprentissage par le service', body: 'Contribution à des projets locaux via le tutorat.' },
          { title: 'Pistes futures', body: "L'orientation accompagne le passage vers les filières libanaise ou internationale." },
        ],
      },
      ar: {
        title: 'المتوسّطة',
        lede: 'الصفوف 6 – 9',
        items: [
          { title: 'تعمّق أكاديمي', body: 'مختصّون في العلوم والرياضيات والإنسانيات واللغات.' },
          { title: 'بدء الخيارات', body: 'مواد اختيارية في الحوسبة والتصميم ومسارات اللغة الثانية.' },
          { title: 'تعلّم عبر الخدمة', body: 'يساهم الطلاب في مشاريع المجتمع المحلي ضمن نظام التوجيه.' },
          { title: 'مسارات لاحقة', body: 'يوجّه الإرشاد الطلاب نحو المسار اللبناني أو الدولي.' },
        ],
      },
    },
  },
  {
    slug: 'secondary-lebanese',
    position: 4,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
    imageAlt: 'Secondary Lebanese',
    translations: {
      en: {
        title: 'Secondary Lebanese',
        lede: 'Grades 10 – 12 · Lebanese Baccalauréat',
        items: [
          { title: 'Tracks', body: 'Sciences générales · Sciences de la vie · Sociology & economics · Lettres et humanités.' },
          { title: 'Languages of instruction', body: 'Arabic, French, and English used across the programme by subject.' },
          { title: 'Examination preparation', body: 'Mock examinations, revision clinics, and one-to-one tutoring.' },
          { title: 'University guidance', body: 'Counsellors support applications to Lebanese and regional universities.' },
        ],
      },
      fr: {
        title: 'Secondaire libanais',
        lede: '2nde – Terminale · Baccalauréat libanais',
        items: [
          { title: 'Séries', body: 'Sciences générales · Sciences de la vie · Sociologie & Économie · Lettres et humanités.' },
          { title: 'Langues d’enseignement', body: 'Arabe, français et anglais selon les matières.' },
          { title: 'Préparation aux examens', body: 'Examens blancs, séances de révision et tutorat individuel.' },
          { title: 'Orientation universitaire', body: 'Les conseillers accompagnent les candidatures vers les universités libanaises et régionales.' },
        ],
      },
      ar: {
        title: 'الثانوي اللبناني',
        lede: 'الصفوف 10 – 12 · البكالوريا اللبنانية',
        items: [
          { title: 'الفروع', body: 'علوم عامة · علوم حياة · علم الاجتماع والاقتصاد · الآداب والإنسانيات.' },
          { title: 'لغات التدريس', body: 'العربية والفرنسية والإنجليزية بحسب المواد.' },
          { title: 'التحضير للامتحانات', body: 'امتحانات تجريبية، حصص مراجعة، ودروس فردية.' },
          { title: 'الإرشاد الجامعي', body: 'يدعم المرشدون التقدّم للجامعات اللبنانية والإقليمية.' },
        ],
      },
    },
  },
  {
    slug: 'integrative',
    position: 5,
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80',
    imageAlt: 'Integrative Program',
    translations: {
      en: {
        title: 'Integrative Program',
        lede: 'Inclusive learning across grades',
        items: [
          { title: 'Individualised plans', body: 'Each student has a personalised plan reviewed termly with family and teachers.' },
          { title: 'In-class support', body: 'Specialist teachers work alongside the homeroom, not apart from it.' },
          { title: 'Multi-disciplinary team', body: 'Educational psychologists, speech and language, and occupational therapy.' },
          { title: 'Family partnership', body: 'Regular meetings, transparent reporting, shared goals.' },
        ],
      },
      fr: {
        title: 'Programme intégratif',
        lede: 'Apprentissage inclusif sur tous les niveaux',
        items: [
          { title: 'Plans individualisés', body: 'Chaque élève dispose d’un plan personnalisé revu chaque trimestre avec la famille et les enseignants.' },
          { title: 'Soutien en classe', body: 'Les spécialistes interviennent aux côtés du titulaire, dans la classe.' },
          { title: 'Équipe pluridisciplinaire', body: 'Psychologues scolaires, orthophonie et ergothérapie.' },
          { title: 'Partenariat familial', body: 'Réunions régulières, comptes-rendus transparents, objectifs partagés.' },
        ],
      },
      ar: {
        title: 'البرنامج التكاملي',
        lede: 'تعلّم شامل عبر جميع المراحل',
        items: [
          { title: 'خطط فردية', body: 'لكل طالب خطة شخصية تُراجع كل فصل مع العائلة والمعلّمين.' },
          { title: 'دعم داخل الصف', body: 'يعمل المختصّون إلى جانب معلّم الصف، لا بمعزل عنه.' },
          { title: 'فريق متعدّد التخصّصات', body: 'علم النفس التربوي، النطق واللغة، والعلاج الوظيفي.' },
          { title: 'شراكة مع العائلة', body: 'لقاءات منتظمة، تقارير شفّافة، وأهداف مشتركة.' },
        ],
      },
    },
  },
  {
    slug: 'international-programs',
    position: 6,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
    imageAlt: 'International Programs',
    translations: {
      en: {
        title: 'International Programs',
        lede: 'IB Diploma · IGCSE',
        items: [
          { title: 'IB Diploma Programme', body: 'Six subject groups, theory of knowledge, extended essay, and CAS.' },
          { title: 'IGCSE pathway', body: 'A bridge into IB and into UK and international university systems.' },
          { title: 'University outcomes', body: '[Placeholder — list past destinations only when verified.]' },
          { title: 'CAS programme', body: 'Creativity, Activity, Service — a structured way to grow beyond the classroom.' },
        ],
      },
      fr: {
        title: 'Programmes internationaux',
        lede: 'Diplôme IB · IGCSE',
        items: [
          { title: 'Diplôme IB', body: 'Six groupes de matières, théorie de la connaissance, mémoire et CAS.' },
          { title: 'Parcours IGCSE', body: "Une passerelle vers l'IB et les systèmes universitaires britanniques et internationaux." },
          { title: 'Destinations universitaires', body: '[Texte à confirmer — ne pas publier sans vérification.]' },
          { title: 'Programme CAS', body: 'Créativité, Activité, Service — un cadre structuré pour grandir hors classe.' },
        ],
      },
      ar: {
        title: 'البرامج الدولية',
        lede: 'دبلوم البكالوريا الدولية · IGCSE',
        items: [
          { title: 'دبلوم البكالوريا الدولية', body: 'ست مجموعات من المواد، نظرية المعرفة، البحث المعمّق، وCAS.' },
          { title: 'مسار IGCSE', body: 'جسر إلى البكالوريا الدولية والنظم الجامعية البريطانية والدولية.' },
          { title: 'المسارات الجامعية', body: '[نص بديل — لا تُنشر الوجهات إلا بعد التحقّق.]' },
          { title: 'برنامج CAS', body: 'الإبداع والنشاط والخدمة — إطار منظّم للنمو خارج الصف.' },
        ],
      },
    },
  },
]

// ──────────────── pages (block-based) ────────────────

type PageSeed = {
  slug: string
  imageUrl: string | null
  translations: Record<
    'en' | 'ar' | 'fr',
    { title: string; lede: string; blocks: Block[] }
  >
}

const PAGES: PageSeed[] = [
  {
    slug: 'vision-mission',
    imageUrl: null,
    translations: {
      en: {
        title: 'Vision & Mission',
        lede: '',
        blocks: [
          { type: 'heading', level: 2, text: 'Mission' },
          {
            type: 'paragraph',
            markdown:
              'Cadmous College teaches, challenges, and guides students to become knowledgeable, curious, confident, ethical, life-long learners and responsible global citizens, who aim for the betterment of their local community, country, and the world, by promoting cultural awareness and respect.',
          },
          { type: 'heading', level: 2, text: 'Vision' },
          {
            type: 'paragraph',
            markdown:
              'Cadmous College is committed to its vision of offering the best education for the region and to be a leading educational community for students of all nationalities and religions.',
          },
          {
            type: 'info-grid',
            items: [
              { title: 'Curiosity', body: 'We treat questions as the starting point of learning, not the end of it.' },
              { title: 'Respect', body: 'For every student, every family, every culture under our roof.' },
              { title: 'Rigour', body: 'High expectations met with the support to reach them.' },
              { title: 'Service', body: 'Education shapes citizens — at home and in the world.' },
            ],
          },
        ],
      },
      fr: {
        title: 'Vision & Mission',
        lede: '',
        blocks: [
          { type: 'heading', level: 2, text: 'Mission' },
          {
            type: 'paragraph',
            markdown:
              "Le Collège Cadmous enseigne, met au défi et guide les élèves pour devenir des apprenants tout au long de la vie — savants, curieux, confiants, éthiques — et des citoyens responsables œuvrant à l'amélioration de leur communauté, de leur pays et du monde.",
          },
          { type: 'heading', level: 2, text: 'Vision' },
          {
            type: 'paragraph',
            markdown:
              "Le Collège Cadmous s'engage à offrir la meilleure éducation pour la région et à être une communauté éducative de référence pour les élèves de toutes nationalités et religions.",
          },
          {
            type: 'info-grid',
            items: [
              { title: 'Curiosité', body: "Les questions sont le point de départ de l'apprentissage." },
              { title: 'Respect', body: 'Pour chaque élève, chaque famille, chaque culture sous notre toit.' },
              { title: 'Exigence', body: 'Des attentes élevées et le soutien pour les atteindre.' },
              { title: 'Service', body: "L'éducation forme des citoyens — chez nous et dans le monde." },
            ],
          },
        ],
      },
      ar: {
        title: 'الرؤية والرسالة',
        lede: '',
        blocks: [
          { type: 'heading', level: 2, text: 'الرسالة' },
          {
            type: 'paragraph',
            markdown:
              'تعلّم مدرسة قدموس طلابها وتتحدّاهم وترشدهم ليصبحوا متعلّمين مدى الحياة، فضوليّين، واثقين، مسؤولين عن مجتمعهم وبلدهم والعالم، عبر تعزيز الوعي الثقافي والاحترام.',
          },
          { type: 'heading', level: 2, text: 'الرؤية' },
          {
            type: 'paragraph',
            markdown:
              'تلتزم مدرسة قدموس برؤيتها في تقديم أفضل تعليم للمنطقة، وأن تكون مجتمعًا تعليميًا رائدًا لطلاب من كل الجنسيات والأديان.',
          },
          {
            type: 'info-grid',
            items: [
              { title: 'الفضول', body: 'نعتبر الأسئلة نقطة انطلاق التعلّم، لا نهايته.' },
              { title: 'الاحترام', body: 'لكل طالب وكل عائلة وكل ثقافة تحت سقفنا.' },
              { title: 'الصرامة', body: 'سقف عالٍ من التوقّعات يقابله دعم كافٍ.' },
              { title: 'الخدمة', body: 'التعليم يصوغ المواطنين — في الوطن وفي العالم.' },
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'history',
    imageUrl: null,
    translations: {
      en: {
        title: 'History',
        lede: 'Cadmous College has served families in Tyre and the south since 1976.',
        blocks: [
          {
            type: 'info-grid',
            cols: 3,
            items: [
              { eyebrow: '1976', title: 'Cadmous College founded', body: 'The school opens its doors to the families of Tyre and the south.' },
              { eyebrow: '1980s', title: 'Programme expansion', body: 'The curriculum broadens across the Lebanese national programme.' },
              { eyebrow: '1990s', title: 'New campus', body: 'Facilities expand to accommodate growing student numbers.' },
              { eyebrow: '2000s', title: 'International outlook', body: 'The school opens to international curricula.' },
              { eyebrow: '2010s', title: 'IB authorisation', body: 'Cadmous becomes an authorised IB World School.' },
              { eyebrow: 'Today', title: 'Continuing the work', body: 'Serving families from across nationalities and religions.' },
            ],
          },
        ],
      },
      fr: {
        title: 'Notre histoire',
        lede: 'Le Collège Cadmous sert les familles de Tyr et du Sud depuis 1976.',
        blocks: [
          {
            type: 'info-grid',
            cols: 3,
            items: [
              { eyebrow: '1976', title: 'Fondation du Collège Cadmous', body: 'L’école ouvre ses portes aux familles de Tyr et du sud du Liban.' },
              { eyebrow: 'Années 1980', title: 'Élargissement du programme', body: 'Le programme libanais s’étend à de nouveaux niveaux.' },
              { eyebrow: 'Années 1990', title: 'Nouveau campus', body: 'Les installations s’agrandissent pour accueillir plus d’élèves.' },
              { eyebrow: 'Années 2000', title: 'Ouverture internationale', body: 'L’école ouvre des cursus internationaux.' },
              { eyebrow: 'Années 2010', title: 'Autorisation IB', body: 'Cadmous devient une école du monde de l’IB.' },
              { eyebrow: "Aujourd'hui", title: 'Une mission qui se poursuit', body: 'Servir les familles de toutes nationalités et religions.' },
            ],
          },
        ],
      },
      ar: {
        title: 'تاريخنا',
        lede: 'تخدم مدرسة قدموس عائلات صور وجنوب لبنان منذ عام 1976.',
        blocks: [
          {
            type: 'info-grid',
            cols: 3,
            items: [
              { eyebrow: '1976', title: 'تأسيس مدرسة قدموس', body: 'فتحت المدرسة أبوابها لعائلات صور وجنوب لبنان.' },
              { eyebrow: 'الثمانينيات', title: 'توسّع البرنامج', body: 'اتّسع البرنامج اللبناني ليشمل مزيدًا من المراحل.' },
              { eyebrow: 'التسعينيات', title: 'حرم جديد', body: 'توسّعت المرافق لاستيعاب المزيد من الطلاب.' },
              { eyebrow: '2000+', title: 'انفتاح دولي', body: 'فتحت المدرسة مسارات دولية إلى جانب اللبنانية.' },
              { eyebrow: '2010+', title: 'اعتماد البكالوريا الدولية', body: 'أصبحت قدموس مدرسة معتمدة من البكالوريا الدولية.' },
              { eyebrow: 'اليوم', title: 'استمرار المسيرة', body: 'نخدم عائلات من مختلف الجنسيات والأديان.' },
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'director',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
    translations: {
      en: {
        title: 'A Word from the Director',
        lede: '',
        blocks: [
          {
            type: 'quote',
            markdown:
              'A school is, above all, a community. Ours is one in which curiosity is at home, languages live side by side, and every student is known.',
            attribution: 'The Director',
          },
          {
            type: 'paragraph',
            markdown:
              'A school is more than a building. It is the people who walk through its doors every morning — and the quiet promises we make to them. At Cadmous, those promises have stayed the same since 1976: that every child is known, that every language has a place, and that learning here is honest work — taken seriously, met with care.',
          },
        ],
      },
      fr: {
        title: 'Mot de la Direction',
        lede: '',
        blocks: [
          {
            type: 'quote',
            markdown:
              'Une école est avant tout une communauté. La nôtre est un lieu où la curiosité se sent chez elle, où les langues vivent côte à côte, et où chaque élève est connu.',
            attribution: 'La Direction',
          },
          {
            type: 'paragraph',
            markdown:
              'Une école, c’est bien plus qu’un bâtiment. Ce sont les personnes qui en franchissent les portes chaque matin — et les promesses discrètes que nous leur faisons. À Cadmous, ces promesses sont les mêmes depuis 1976 : que chaque enfant est connu, que chaque langue a sa place, et que l’apprentissage est un travail honnête — pris au sérieux, accompagné avec attention.',
          },
        ],
      },
      ar: {
        title: 'كلمة المدير',
        lede: '',
        blocks: [
          {
            type: 'quote',
            markdown: 'المدرسة، قبل كل شيء، مجتمع. مجتمعنا تجد فيه الفضول بيته، وتتعايش فيه اللغات جنبًا إلى جنب، ويُعرف كل طالب باسمه.',
            attribution: 'المدير',
          },
          {
            type: 'paragraph',
            markdown:
              'المدرسة أكبر من جدرانها. هي الأشخاص الذين يدخلون من بابها كل صباح، ووعودنا الهادئة لهم. وعودنا في قدموس لم تتغيّر منذ 1976: أن يُعرف كل طفل باسمه، أن يكون لكل لغة موقعها، وأن يكون التعلّم عندنا عملًا حقيقيًا — يؤخذ بجدّية، ويُحاط بعناية.',
          },
        ],
      },
    },
  },
  {
    slug: 'policies',
    imageUrl: null,
    translations: {
      en: {
        title: 'Policies',
        lede: 'Public policies that shape life and learning at Cadmous.',
        blocks: [
          {
            type: 'info-grid',
            cols: 3,
            items: [
              { title: 'Academic Integrity', body: 'Our standards on honesty in assessment, citation, and conduct.' },
              { title: 'Admissions Policy', body: 'How we evaluate applications fairly and consistently.' },
              { title: 'Assessment Policy', body: 'How we measure and report student learning.' },
              { title: 'Inclusion Policy', body: 'How we ensure every learner has access and support.' },
              { title: 'Language Policy', body: 'How English, French, and Arabic are taught and used.' },
              { title: 'Code of Conduct', body: 'Expectations for students, staff, and the wider community.' },
            ],
          },
          { type: 'paragraph', markdown: '_Full PDF copies are available on request — write to admissions._' },
        ],
      },
      fr: {
        title: 'Politiques',
        lede: "Les politiques publiques qui encadrent la vie et l'apprentissage à Cadmous.",
        blocks: [
          {
            type: 'info-grid',
            cols: 3,
            items: [
              { title: 'Intégrité académique', body: "Nos normes en matière d'honnêteté, de citation et de conduite." },
              { title: "Politique d'admission", body: 'Comment nous évaluons les candidatures avec équité.' },
              { title: "Politique d'évaluation", body: 'Comment nous mesurons et rapportons les apprentissages.' },
              { title: "Politique d'inclusion", body: 'Comment chaque apprenant a accès au soutien nécessaire.' },
              { title: 'Politique linguistique', body: "Comment l'anglais, le français et l'arabe sont enseignés et utilisés." },
              { title: 'Code de conduite', body: 'Attentes pour les élèves, le personnel et la communauté.' },
            ],
          },
          { type: 'paragraph', markdown: '_Copies PDF complètes disponibles sur demande — écrivez aux admissions._' },
        ],
      },
      ar: {
        title: 'السياسات',
        lede: 'سياسات عامة تُشكّل حياة المدرسة وتعلّمها.',
        blocks: [
          {
            type: 'info-grid',
            cols: 3,
            items: [
              { title: 'النزاهة الأكاديمية', body: 'معاييرنا في الأمانة في التقييم والتوثيق والسلوك.' },
              { title: 'سياسة القبول', body: 'كيف نقيّم الطلبات بإنصاف واتّساق.' },
              { title: 'سياسة التقييم', body: 'كيف نقيس تعلّم الطلاب ونُبلّغ عنه.' },
              { title: 'سياسة الدمج', body: 'كيف نضمن لكل متعلّم حقّ الوصول والدعم.' },
              { title: 'السياسة اللغوية', body: 'كيف تُدرَّس وتُستخدم الإنجليزية والفرنسية والعربية.' },
              { title: 'مدوّنة السلوك', body: 'توقّعاتنا من الطلاب والكادر والمجتمع.' },
            ],
          },
          { type: 'paragraph', markdown: '_نسخ PDF كاملة متوفّرة عند الطلب — تواصلوا مع قسم القبول._' },
        ],
      },
    },
  },
]

// ──────────────── site settings ────────────────

const SETTINGS: { key: string; locale: string; value: string }[] = [
  { key: 'contact.email', locale: '', value: 'info@cadmous.edu.lb' },
  { key: 'contact.phone', locale: '', value: '+961 7 380 391' },
  { key: 'contact.address', locale: 'en', value: 'Jwar Al-Nakhl, Tyre, Lebanon' },
  { key: 'contact.address', locale: 'fr', value: 'Jouar el-Nakhel, Tyr, Liban' },
  { key: 'contact.address', locale: 'ar', value: 'جوار النخل، صور، لبنان' },
  { key: 'social.facebook', locale: '', value: 'https://www.facebook.com/CadmousCollegeTyre/' },
]

async function clearAll() {
  await db.delete(divisions)
  await db.delete(pages)
  await db.delete(siteSettings)
}

async function seedDivisions() {
  for (const d of DIVISIONS) {
    const existing = await db.query.divisions.findFirst({ where: eq(divisions.slug, d.slug) })
    let divisionId: string
    if (existing) {
      divisionId = existing.id
      await db
        .update(divisions)
        .set({ position: d.position, imageUrl: d.imageUrl, imageAlt: d.imageAlt })
        .where(eq(divisions.id, divisionId))
    } else {
      const inserted = await db
        .insert(divisions)
        .values({
          slug: d.slug,
          position: d.position,
          imageUrl: d.imageUrl,
          imageAlt: d.imageAlt,
          status: 'published',
        })
        .returning({ id: divisions.id })
      divisionId = inserted[0].id
    }
    for (const locale of ['en', 'ar', 'fr'] as const) {
      const t = d.translations[locale]
      await db
        .insert(divisionTranslations)
        .values({
          divisionId,
          locale,
          title: t.title,
          lede: t.lede,
          items: JSON.stringify(t.items),
        })
        .onConflictDoUpdate({
          target: [divisionTranslations.divisionId, divisionTranslations.locale],
          set: {
            title: t.title,
            lede: t.lede,
            items: JSON.stringify(t.items),
          },
        })
    }
  }
  console.log(`Seeded ${DIVISIONS.length} divisions.`)
}

async function seedPages() {
  for (const p of PAGES) {
    const existing = await db.query.pages.findFirst({ where: eq(pages.slug, p.slug) })
    let pageId: string
    if (existing) {
      pageId = existing.id
      await db.update(pages).set({ imageUrl: p.imageUrl }).where(eq(pages.id, pageId))
    } else {
      const inserted = await db
        .insert(pages)
        .values({ slug: p.slug, imageUrl: p.imageUrl, status: 'published' })
        .returning({ id: pages.id })
      pageId = inserted[0].id
    }
    for (const locale of ['en', 'ar', 'fr'] as const) {
      const t = p.translations[locale]
      await db
        .insert(pageTranslations)
        .values({
          pageId,
          locale,
          title: t.title,
          lede: t.lede,
          blocks: JSON.stringify(t.blocks),
        })
        .onConflictDoUpdate({
          target: [pageTranslations.pageId, pageTranslations.locale],
          set: {
            title: t.title,
            lede: t.lede,
            blocks: JSON.stringify(t.blocks),
          },
        })
    }
  }
  console.log(`Seeded ${PAGES.length} block pages.`)
}

async function seedSettings() {
  for (const s of SETTINGS) {
    await db
      .insert(siteSettings)
      .values(s)
      .onConflictDoUpdate({
        target: [siteSettings.key, siteSettings.locale],
        set: { value: s.value },
      })
  }
  console.log(`Seeded ${SETTINGS.length} site_settings rows.`)
}

async function main() {
  const args = new Set(process.argv.slice(2))
  if (args.has('--reset')) await clearAll()
  await seedDivisions()
  await seedPages()
  await seedSettings()
  console.log('Done.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
