import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { setRequestLocale } from 'next-intl/server'
import { getPayloadLocale } from '@/i18n/payload-locale'
import { Media } from '@/components/Media'

type Args = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

const categoryLabels: Record<string, Record<string, string>> = {
  campus: { ar: 'الحرم الجامعي', en: 'Campus', fr: 'Campus' },
  'student-life': { ar: 'حياة الطلاب', en: 'Student Life', fr: 'Vie étudiante' },
  events: { ar: 'فعاليات', en: 'Events', fr: 'Événements' },
  academics: { ar: 'الأكاديمية', en: 'Academics', fr: 'Académique' },
  sports: { ar: 'الرياضة', en: 'Sports', fr: 'Sports' },
}

export default async function GalleryPage({ params, searchParams }: Args) {
  const { locale } = await params
  const { category } = await searchParams
  setRequestLocale(locale)

  const payload = await getPayload({ config: configPromise })
  const payloadLocale = getPayloadLocale(locale)

  const where: any = {}
  if (category) {
    where.category = { equals: category }
  }

  const albums = await payload.find({
    collection: 'gallery',
    locale: payloadLocale as any,
    limit: 50,
    sort: '-date',
    where,
  })

  const titles: Record<string, string> = {
    ar: 'معرض الصور',
    en: 'Gallery',
    fr: 'Galerie',
  }

  const allLabel: Record<string, string> = {
    ar: 'الكل',
    en: 'All',
    fr: 'Tout',
  }

  const categories = ['campus', 'student-life', 'events', 'academics', 'sports']

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">{titles[locale] || titles.en}</h1>

      {/* Category filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href={`/${locale}/gallery`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !category ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {allLabel[locale] || allLabel.en}
        </a>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/${locale}/gallery?category=${cat}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === cat ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[cat]?.[locale] || categoryLabels[cat]?.en || cat}
          </a>
        ))}
      </div>

      {albums.docs.length === 0 ? (
        <p className="text-gray-500">
          {locale === 'ar' ? 'لا توجد صور حالياً' : locale === 'fr' ? 'Aucune photo pour le moment' : 'No photos yet'}
        </p>
      ) : (
        <div className="space-y-12">
          {albums.docs.map((album) => (
            <div key={album.id}>
              <h2 className="mb-4 text-2xl font-semibold">{album.title}</h2>
              {album.description && (
                <p className="mb-4 text-gray-600">{album.description}</p>
              )}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {album.images?.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    {item.image && typeof item.image === 'object' && (
                      <Media
                        resource={item.image}
                        className="aspect-square w-full object-cover transition-transform hover:scale-105"
                      />
                    )}
                    {item.caption && (
                      <p className="mt-1 text-xs text-gray-500">{item.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    ar: 'معرض الصور | مدرسة قدموس',
    en: 'Gallery | Cadmous College',
    fr: 'Galerie | Collège Cadmous',
  }
  return { title: titles[locale] || titles.en }
}
