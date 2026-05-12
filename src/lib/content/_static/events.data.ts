import type { LocalizedContent, SchoolEvent } from '../types'

export const EVENTS_BY_LOCALE: LocalizedContent<SchoolEvent> = {
  en: [
    {
      slug: 'open-day-nov',
      title: 'Open Day · Campus Tour',
      startDate: '2025-11-14T09:00:00',
      endDate: '2025-11-14T12:00:00',
      location: 'Cadmous Main Campus',
      description: 'Guided tours of the campus every 30 minutes, with admissions team on hand.',
      image:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80',
    },
    {
      slug: 'senior-ptc',
      title: 'Senior Parent–Teacher Conferences',
      startDate: '2025-11-22T16:00:00',
      endDate: '2025-11-22T19:00:00',
      location: 'Secondary Building',
      description: 'Term-one progress meetings for senior school families.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80',
    },
    {
      slug: 'winter-concert',
      title: 'Winter Concert · Music Department',
      startDate: '2025-12-06T18:00:00',
      endDate: '2025-12-06T20:00:00',
      location: 'School Auditorium',
      description: 'The annual winter concert from the Cadmous music department.',
      image:
        'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=900&q=80',
    },
    {
      slug: 'term-one-close',
      title: 'End of Term · Term I closes',
      startDate: '2025-12-18T12:00:00',
      location: 'All divisions',
      description: 'Half-day dismissal; term reports follow.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    },
  ],
  fr: [
    {
      slug: 'open-day-nov',
      title: 'Journée portes ouvertes · Visite du campus',
      startDate: '2025-11-14T09:00:00',
      endDate: '2025-11-14T12:00:00',
      location: 'Campus principal de Cadmous',
      description: 'Visites guidées toutes les 30 minutes ; équipe des admissions présente.',
      image:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80',
    },
    {
      slug: 'senior-ptc',
      title: 'Réunions parents-professeurs · Secondaire',
      startDate: '2025-11-22T16:00:00',
      endDate: '2025-11-22T19:00:00',
      location: 'Bâtiment secondaire',
      description: "Points de fin de trimestre pour les familles du secondaire.",
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80',
    },
    {
      slug: 'winter-concert',
      title: "Concert d'hiver · Département musique",
      startDate: '2025-12-06T18:00:00',
      endDate: '2025-12-06T20:00:00',
      location: 'Auditorium',
      description: "Le concert d'hiver annuel du département musique.",
      image:
        'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=900&q=80',
    },
    {
      slug: 'term-one-close',
      title: 'Fin du 1er trimestre',
      startDate: '2025-12-18T12:00:00',
      location: 'Toutes les divisions',
      description: 'Demi-journée ; bulletins de trimestre à suivre.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    },
  ],
  ar: [
    {
      slug: 'open-day-nov',
      title: 'يوم مفتوح · جولة في الحرم',
      startDate: '2025-11-14T09:00:00',
      endDate: '2025-11-14T12:00:00',
      location: 'حرم قدموس الرئيسي',
      description: 'جولات إرشاديّة كل نصف ساعة وحضور لفريق القبول.',
      image:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80',
    },
    {
      slug: 'senior-ptc',
      title: 'لقاءات أولياء الأمور والمعلّمين · الثانوية',
      startDate: '2025-11-22T16:00:00',
      endDate: '2025-11-22T19:00:00',
      location: 'المبنى الثانوي',
      description: 'لقاءات نهاية الفصل الأول لعائلات الثانوية.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80',
    },
    {
      slug: 'winter-concert',
      title: 'حفل الشتاء · قسم الموسيقى',
      startDate: '2025-12-06T18:00:00',
      endDate: '2025-12-06T20:00:00',
      location: 'قاعة المدرسة',
      description: 'الحفل السنوي لقسم الموسيقى في قدموس.',
      image:
        'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=900&q=80',
    },
    {
      slug: 'term-one-close',
      title: 'نهاية الفصل الأول',
      startDate: '2025-12-18T12:00:00',
      location: 'كل الأقسام',
      description: 'دوام نصفي؛ تتبعه تقارير الفصل.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    },
  ],
}
