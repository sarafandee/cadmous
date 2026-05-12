import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { PageHeader, ProseTwoCol, Section } from '@/components/CadmousUI'

type Args = { params: Promise<{ locale: string }> }

const T: Record<
  string,
  {
    title: string
    breadcrumb: string
    lede: string
    body: string[]
    signoff: string
    signature: string
  }
> = {
  en: {
    title: "Director's Message",
    breadcrumb: 'About Us',
    lede: 'Father Dr. Jean Younes (M.L.) — Director, Cadmous College.',
    body: [
      'It is my great pleasure to welcome you to Cadmous College. We are an IB world school in Southern Lebanon and a leading education provider in the region.',
      'For the past 10 years I have had the privilege and honor to serve you in the capacity of Cadmous College Superior supported by an excellent Senior Leadership Team of highly qualified and talented people. During this time, Cadmous College has grown and evolved and so did its needs. I am sure that they will continue the same journey we started ten years back earning Cadmous College even more feats.',
      'We are a truly international school with highly qualified and experienced staff welcoming students of many nationalities. We pride ourselves on delivering world-class international and national education. Since its foundation in 1966, Cadmous College aims to be recognized as one of the leading schools in Lebanon offering students quality education. The school aims to create a society of students dedicated to the love of learning and maintaining this throughout their lives.',
      'Relationships are the base of our success, and we encourage students, parents and staff to play an active role in our community. We aim to inspire all students to dream big, understanding that hard work is key to outstanding academic achievement. Equally important is the sense of belonging and students are offered many opportunities to participate and compete in activities to support their social, emotional, and physical wellbeing.',
      "We place a huge emphasis on developing students' mindsets to encourage them to be positive, aspirational and resilient. They must develop self-belief and confidence. The concept of international-mindedness and the benefits of being a global lifelong learner are key attributes to achievement in an ever-changing world.",
      'Our students benefit from a safe, nurturing environment where they are challenged to reach their potential and step out of their comfort zone, preparing them for the rigors of life ahead. Our core values permeate everyday life and lead many to describe us as "a happy school". These embedded values allow students to become role models to each other and positive, well-grounded citizens who develop as future leaders capable of positively impacting our world.',
      'The outstanding facilities, well-resourced and technologically advanced learning environments allow students and staff to explore learning in a variety of ways, personalizing learning to maximize the student experience.',
      'Your confidence was the major factor that drove the school to where it is now. Your continued support and trust will ensure the continuous advancement and evolution of Cadmous College.',
      "I encourage you to visit and experience Cadmous College for yourself to feel our culture. I am confident that you'll be impressed by the students, staff and facilities. Our students are the leaders of the future and everything that we do is centered on their development in what are the most important years of their life.",
      'I look forward to you joining our community!',
    ],
    signoff: 'God bless you all and Cadmous College!',
    signature: 'Father Dr. Jean Younes (M.L.)',
  },
  fr: {
    title: 'Mot du Directeur',
    breadcrumb: 'À propos',
    lede: 'Père Dr Jean Younes (M.L.) — Directeur, Cadmous College.',
    body: [
      "C'est avec un immense plaisir que je vous souhaite la bienvenue à Cadmous College. Nous sommes une école IB World au Sud du Liban et un acteur éducatif de référence dans la région.",
      "Depuis dix ans, j'ai le privilège et l'honneur de vous servir en tant que Supérieur de Cadmous College, entouré d'une équipe de direction de haut niveau, hautement qualifiée et talentueuse. Au cours de cette période, Cadmous College a grandi et évolué, tout comme ses besoins. Je suis convaincu qu'elle poursuivra ce chemin entamé il y a dix ans et continuera à accumuler les réussites.",
      "Nous sommes une école véritablement internationale, avec un corps enseignant qualifié et expérimenté qui accueille des élèves de nombreuses nationalités. Nous sommes fiers d'offrir une éducation nationale et internationale de classe mondiale. Depuis sa fondation en 1966, Cadmous College aspire à figurer parmi les écoles de référence au Liban en offrant à ses élèves une éducation de qualité. L'école cherche à former une communauté d'élèves attachés à l'amour d'apprendre tout au long de leur vie.",
      "Les relations sont à la base de notre succès, et nous encourageons élèves, parents et personnel à jouer un rôle actif dans notre communauté. Nous voulons inspirer nos élèves à voir grand, en sachant que le travail est la clé de la réussite. La capacité d'appartenance est tout aussi importante, et nos élèves bénéficient de nombreuses occasions de participer et concourir à des activités favorisant leur bien-être social, émotionnel et physique.",
      "Nous mettons l'accent sur le développement de la mentalité des élèves pour qu'ils soient positifs, ambitieux et résilients. Ils doivent développer la confiance en soi. L'ouverture internationale et l'apprentissage tout au long de la vie sont des atouts clés dans un monde en évolution constante.",
      "Nos élèves bénéficient d'un environnement sûr et bienveillant où ils sont mis au défi d'atteindre leur potentiel et de sortir de leur zone de confort, ce qui les prépare aux exigences de la vie. Nos valeurs imprègnent la vie quotidienne et conduisent beaucoup à décrire Cadmous comme « une école heureuse ». Ces valeurs permettent à nos élèves de devenir des modèles les uns pour les autres, et des citoyens posés capables d'avoir un impact positif sur le monde.",
      "Nos installations exceptionnelles, nos environnements d'apprentissage bien équipés et technologiquement avancés permettent à chacun d'explorer l'apprentissage de multiples manières et de personnaliser le parcours de l'élève.",
      "Votre confiance a été le moteur principal du développement de l'école. Votre soutien continu garantira l'évolution permanente de Cadmous College.",
      "Je vous invite à visiter Cadmous College pour ressentir notre culture par vous-même. Je suis sûr que vous serez impressionné par nos élèves, notre personnel et nos installations. Nos élèves sont les dirigeants de demain et tout ce que nous faisons est centré sur leur développement.",
      'Au plaisir de vous accueillir au sein de notre communauté !',
    ],
    signoff: 'Que Dieu vous bénisse, vous et Cadmous College !',
    signature: 'Père Dr Jean Younes (M.L.)',
  },
  ar: {
    title: 'كلمة المدير',
    breadcrumb: 'من نحن',
    lede: 'الأب د. جان يونس (م.ل.) — مدير مدرسة قدموس.',
    body: [
      'يسعدني أن أرحّب بكم في مدرسة قدموس. نحن مدرسة معتمدة في برنامج البكالوريا الدولية في جنوب لبنان، ومن المؤسسات التربوية الرائدة في المنطقة.',
      'على مدى السنوات العشر الماضية، تشرّفت بخدمتكم بصفتي رئيسًا لمدرسة قدموس، يعاونني فريق قيادة عليا متميّز من الكفاءات والمواهب. خلال هذه المدة نمت مدرسة قدموس وتطوّرت، وكذلك احتياجاتها. وأنا واثق من أنّها ستواصل المسيرة التي بدأناها قبل عشر سنوات لتحقّق المزيد من الإنجازات.',
      'نحن مدرسة دوليّة حقيقيّة بطاقم مؤهَّل وخبير يستقبل طلابًا من جنسيّات عدّة. نفخر بتقديم تعليم وطنيّ ودولي على مستوى عالميّ. منذ تأسيسها عام 1966 تطمح مدرسة قدموس إلى أن تكون من أبرز المدارس في لبنان في تقديم تعليم نوعيّ، وإلى بناء مجتمع طلّابي مرتبط بحبّ التعلّم مدى الحياة.',
      'العلاقات هي أساس نجاحنا، ونشجّع الطلاب والأهل والطاقم على الانخراط الفاعل في مجتمعنا. نسعى إلى إلهام طلابنا ليحلموا بمستقبل واسع، مدركين أنّ العمل الجادّ هو مفتاح الإنجاز الأكاديمي. ولا يقلّ الإحساس بالانتماء أهميةً، إذ تُتاح لطلابنا فرص متعدّدة للمشاركة والمنافسة في أنشطة تدعم سلامتهم الاجتماعيّة والعاطفيّة والجسديّة.',
      'نولي اهتمامًا كبيرًا لتنشئة عقليّة الطلاب على التفاؤل والطموح والمرونة. عليهم أن يبنوا الثقة بأنفسهم. ومفهوم العقلية الدولية وفوائد التعلّم العالميّ مدى الحياة من المقوّمات الأساسيّة للنجاح في عالم متغيّر.',
      'يستفيد طلابنا من بيئة آمنة وراعية، يُتحدَّون فيها لبلوغ كامل طاقاتهم والخروج من منطقة الراحة، استعدادًا لمتطلّبات الحياة. تتجلّى قيمنا في الحياة اليوميّة، ولهذا يصفنا كثيرون بأنّنا «مدرسة سعيدة». هذه القيم تتيح للطلاب أن يكونوا قدوات لبعضهم وأن يصبحوا مواطنين فاعلين وقادة مستقبل قادرين على إحداث الأثر الإيجابيّ.',
      'تُمكّن مرافقنا المتميّزة وبيئات التعلّم المجهّزة تقنيًّا الطلابَ والطاقم من استكشاف التعلّم بطرق متنوّعة، مع تخصيص التجربة لكلّ متعلّم.',
      'كانت ثقتكم العامل الأبرز في مسيرة المدرسة. ودعمكم المتواصل وثقتكم يضمنان تطوّر مدرسة قدموس واستمرار تقدّمها.',
      'أدعوكم لزيارة مدرسة قدموس واختبار ثقافتنا عن قرب. أثق بأنّكم ستُعجبون بطلابنا وطاقمنا ومرافقنا. طلابنا هم قادة الغد، وكلّ ما نفعله محوره تطوّرهم في أهمّ سنوات حياتهم.',
      'بانتظار انضمامكم إلى مجتمعنا!',
    ],
    signoff: 'بارك الله فيكم وفي مدرسة قدموس!',
    signature: 'الأب د. جان يونس (م.ل.)',
  },
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = T[locale] || T.en
  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        breadcrumb={[{ label: t.breadcrumb }, { label: t.title }]}
        lede={t.lede}
      />
      <Section>
        <ProseTwoCol
          image="/images/seed/jean.jpg"
          imageAlt={t.signature}
          body={
            <>
              {t.body.map((p, i) => (
                <p key={i} className="mb-4 text-white/70">
                  {p}
                </p>
              ))}
              <p className="mt-8 mb-2 text-[15px] text-white/80">{t.signoff}</p>
              <p className="text-[15px] font-semibold text-white">{t.signature}</p>
            </>
          }
        />
      </Section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = T[locale] || T.en
  return { title: `${t.title} | Cadmous College` }
}
