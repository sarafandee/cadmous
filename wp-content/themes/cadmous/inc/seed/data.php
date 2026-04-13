<?php
/**
 * Seed data — pages, news, staff, programs.
 *
 * All content is plain arrays of strings. The seeder in inc/seed.php
 * walks these and creates posts/pages via wp_insert_post(). Content is
 * translated from the April 10 Payload attempt at
 * /tmp/cadmous-keep/seed-content.ts, which was itself extracted from
 * the live cadmous.edu.lb site in April 2026.
 *
 * To re-seed after editing this file, run:
 *   docker compose exec -u www-data WordPress wp cadmous seed --force
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Static pages.
 *
 * @return array<int,array<string,string>>
 */
function cadmous_seed_pages() {
	return array(
		array(
			'slug'    => 'directors-message',
			'title'   => "Director's Message",
			'content' => "It is my great pleasure to welcome you to Cadmous College. We are an IB world school in Southern Lebanon and a leading education provider in the region.\n\nFor the past 10 years I have had the privilege and honor to serve you in the capacity of Cadmous College Superior supported by an excellent Senior Leadership Team of highly qualified and talented people. During this time, Cadmous College has grown and evolved and so did its needs. I am sure that they will continue the same journey we started ten years back earning Cadmous College even more feats.\n\nWe are a truly international school with highly qualified and experienced staff welcoming students of many nationalities. We pride ourselves on delivering world-class international and national education. Since its foundation in 1966, Cadmous College aims to be recognized as one of the leading schools in Lebanon offering students quality education.\n\nRelationships are the base of our success, and we encourage students, parents and staff to play an active role in our community. We aim to inspire all students to dream big, understanding that hard work is key to outstanding academic achievement.\n\nOur students benefit from a safe, nurturing environment where they are challenged to reach their potential and step out of their comfort zone, preparing them for the rigors of life ahead.\n\nI look forward to you joining our community!\n\nGod bless you all and Cadmous College!\n\nFather Dr. Jean Younes (M.L.)",
		),
		array(
			'slug'    => 'vision-mission',
			'title'   => 'Vision & Mission',
			'content' => "**Mission**\n\nCadmous College guides students to become knowledgeable, curious, confident, ethical, life-long learners and responsible global citizens, who aim for the betterment of their local community, country, and the world, by promoting cultural awareness and respect.\n\n**Vision**\n\nCadmous College has a vision of offering the best education for the region and to be a leading educational community for students of all nationalities and religions.",
		),
		array(
			'slug'    => 'history',
			'title'   => 'History',
			'content' => "There is a history of education and civilization between \"Cadmous\" the legend and Cadmous the school.\n\n\"Cadmous\", the Tyronian son of the south, rode the seas carrying with him the Phoenician alphabet torch to enlighten the way wherever he went while searching for his sister Europe. \"Cadmous\" spread education around the world and became the first alphabet teacher.\n\nCadmous College follows in his footsteps by spreading his cultural message to this very day. Cadmous College has been leading and lightening the path in this area for almost half a century.",
		),
		array(
			'slug'    => 'policies',
			'title'   => 'Policies',
			'content' => "**Academic Honesty Policy**\n\nAcademic honesty is an essential aspect of teaching and learning in any environment. We at Cadmous College believe that academic honesty is the responsibility of all members of the school community including teachers, parents, and students. We inspirit our students to be honest and understand others.\n\nDishonestly claiming authorship is plagiarism, which is a form of cheating.\n\nCadmous College accepts its students to uphold the highest standards of academic integrity.\n\n**Academic Dishonesty**\n\nCadmous College considers a student to be academically dishonest if the student gains unfair help to complete a task.\n\nAcademic honesty requires that all students and teachers respect the integrity of one another's work and recognize the importance of acknowledging and safeguarding intellectual property.",
		),
		array(
			'slug'    => 'contact',
			'title'   => 'Contact Us',
			'content' => "**Address**\nJwar al Nakhel, Tyre, Lebanon\n\n**Phone**\n+961 7 349 038\n\n**Email**\ninfo@cadmous.edu.lb\n\nadmissions@cadmous.edu.lb\n\n**Hours**\nMonday – Friday, 08:00 – 15:30",
		),
	);
}

/**
 * Programs (academic divisions).
 *
 * @return array<int,array<string,string>>
 */
function cadmous_seed_programs() {
	return array(
		array(
			'slug'    => 'kindergarten',
			'title'   => 'Kindergarten',
			'years'   => 'KG1 – Year 1',
			'head'    => 'Mrs. Samar Costantine',
			'content' => "This department admits children as young as three years old. At this age, children are not used to being in unfamiliar places except for their homes. For these children, school is a whole new world, and we must recognize the significance of our mission and the need for accurate attention to every educational task we undertake.\n\nThe department's administration and teachers are committed to providing a nurturing environment and guidance for the healthy growth of children. They aim to explore the child's abilities and talents, allowing them to develop and shine. They provide the child with the skills and knowledge they need in a comfortable atmosphere that is free of pressure and exhaustion.\n\nAt the kindergarten and grade one departments, children receive academic education following the curriculum provided by the Educational Center for Research and Development. Students learn through the use of advanced technology and modern teaching methods under the guidance of specialized teachers.",
		),
		array(
			'slug'    => 'elementary',
			'title'   => 'Elementary',
			'years'   => 'Year 2 – Year 6',
			'head'    => 'Mrs. Hayfa Mozaya',
			'content' => "Students in this program follow the National Curriculum for Lebanon, which continues to build on the foundations established in Kindergarten and Year 1.\n\nProviding the required skills to tackle the ever-changing world is fundamental to the Primary School's approach. We are committed to developing our children to become lifelong learners who understand their individual learning needs.\n\nThe curriculum is based on the Lebanese National Curriculum, providing the required guidance and support children need to succeed both academically and socially. This is a rich blend of academic, social, physical, cultural, and artistic learning opportunities.\n\nBy the end of Year 6, our aim is that all students will have gained a well-rounded education. They will have matured through understanding and character development, developed articulate expression and confidence, and will be well prepared for their secondary education.",
		),
		array(
			'slug'    => 'intermediate',
			'title'   => 'Intermediate',
			'years'   => 'Year 7 – Year 9',
			'head'    => 'Father Jean Pierre Karam (M.L.)',
			'content' => "The Intermediate years are an important time for students to not only learn fundamental concepts and mechanics but also develop learning skills and approaches that will set the stage for a lifetime of success. Cadmous College Intermediate focuses on children's natural curiosity and encourages them to dig deep into topics and subject areas.\n\nWe include a variety of learning approaches, along with multi-sensory and hands-on activities that appeal to a variety of learning styles.\n\nOur intermediate school curriculum focuses on the various subject areas: English, Math, Science, Arabic, French, P.E, History, and Civics. Students will develop strong reading comprehension skills, write original composition pieces, develop critical thinking skills, learn fundamental math concepts, explore a variety of science topics, and learn about the world around them while maintaining a strong connection with the rich Arabic language.",
		),
		array(
			'slug'    => 'integrative-program',
			'title'   => 'Integrative Program',
			'years'   => 'All years',
			'head'    => 'Mrs. Lucie Tannous El hajj',
			'content' => "Many students, especially in the primary and intermediate stages, face learning difficulties. These difficulties take multiple forms centered on the inability to read and write, or read with great difficulty, or the inability to memorize, or to do arithmetic work, and also developmental difficulties related to brain functions and the mental and cognitive processes that the child needs in academic achievement.\n\nFrom here, the Department of Inclusion came to include these students to help them overcome their difficulties according to the degree of their appearance and severity, which affects the individual on self-esteem, education, professional matters, and social adaptation in all activities of daily life.\n\nThe Integration Department provides multiple services, including creating new ways to teach basic skills such as reading, writing, and arithmetic by working on developing long and short-term memory according to an individual educational plan.\n\nThe integration department aims to educate parents about the reality of the conditions of their children, to help them draw a clear picture of their future, and stimulate their abilities to follow their daily lives normally.",
		),
		array(
			'slug'    => 'secondary-lebanese',
			'title'   => 'Secondary Lebanese',
			'years'   => 'Year 10 – Year 12',
			'head'    => 'Father Dr. Jean Younes (M.L.)',
			'content' => "The Lebanese Program (LP) offers an official unified curriculum with basic content established and approved by the Lebanese government.\n\nThe objectives of the Lebanese Curriculum are set by the Ministry of Education and Higher Education. As of Grade 1, the English Language & Literature course is fulfilled in all grade levels through American Textbooks that enrich the learning process.\n\nThe Lebanese Curriculum aims to form a solid, knowledgeable, and productive individual identity that prepares students to transition successfully into college/university life.\n\nAt the Secondary 2nd level, two streams are offered: Scientific and Sociology-Economics. At this level, students have the option to follow the International Baccalaureate Diploma Program.\n\nAt the Secondary 3rd level, three streams are offered: General Science, Life Sciences, and Sociology-Economics.",
		),
		array(
			'slug'    => 'international-programs',
			'title'   => 'International Programs',
			'years'   => 'Year 10 – Year 12',
			'head'    => 'Mr. Ossama Salem',
			'content' => "Cadmous College is an authorized school for the International Baccalaureate (IB) Diploma Program, the only IB World School in the Tyre area. The school has been implementing the International Program curriculum since September 2016, and was authorized for the Diploma Program on June 23, 2020.\n\nThe IB program is open to all students, regardless of previous educational experience. The language of instruction in the IB Program is English. Students aiming for admission to Cadmous College's International IB branch whose first language is not English are expected to demonstrate grade-level mastery of the English Language.\n\nAny Lebanese student currently enrolled in the Lebanese Program (with or without a foreign passport) can switch to the IB Program after acquiring the Lebanese Brevet Official Certificate.\n\nCadmous College also offers the Advanced Placement (AP) Program and is the only SAT test center in the South Lebanon governorate.",
		),
		array(
			'slug'    => 'admissions-requirements',
			'title'   => 'Admissions Requirements',
			'years'   => '',
			'head'    => '',
			'content' => "Cadmous College provides an enriched education through both the National Curriculum for Lebanon and International Curriculum, empowering young minds to think creatively and exceed expectations.\n\n**Kindergarten**\n\nAdmission into Foundation Stage (KG1–KG3) is based on student assessments to determine school readiness. The school accepts students who are at the required age. Students will be evaluated based on a verbal interview. During the interview, the teacher observes the child's pencil grip and recognition of colors and shapes. All students must be fully toilet trained before starting school.\n\n**Primary, Elementary and Secondary School (Lebanese Program)**\n\nCadmous College is a learning community bound together by the principles of respect, responsibility, and honesty. As such, Cadmous College accepts only students whose record demonstrates a clear commitment to these principles.\n\n**The Admissions Interview**\n\nInterviews are scheduled either after or before the assessment exams between the family and the Head of the School and/or the relevant division director, depending on the grade level.\n\n**English or French Language Assessment**\n\nAll students of grades (1–12) enrolling in the school are required to sit for an entrance exam in English or French. Applicants must obtain a minimum score based on the grade to which they are applying.\n\n**Other Assessments**\n\nStudents in grades 1 to 12 will sit for placement tests in Mathematics and Arabic. Students requesting admission to grades 7–12 will sit for a proficiency exam in scientific subjects.\n\n**International Programs**\n\nCadmous College admits International and local students. The school has a set of fundamental prerequisites for candidates applying to the Pre-IB and IB Diploma Program. If the entrance requirements cannot be met, applicants can enroll in Pre-IB courses during the summer preceding the academic year.\n\nPre-IB students must have completed year eight and demonstrate a positive attitude and a willingness to work consistently and effectively.",
		),
	);
}

/**
 * News articles (extracted from the live site, April 2026).
 *
 * @return array<int,array<string,string>>
 */
function cadmous_seed_news() {
	return array(
		array(
			'slug'         => 'ib-historic-achievement-2025',
			'title'        => 'A Historic Achievement for Our IB Students',
			'lang'         => 'en',
			'published_at' => '2025-07-05 16:51:00',
			'content'      => "On behalf of our esteemed school superior, Father Jean Younes, and the Director of the International Program Department, Mr. Ossama Salem, we are honored to announce that all 16 of our IB students have successfully conquered their official exams.\n\nThese young scholars have faced unimaginable challenges, enduring the trials of war and loss of classroom time. Yet, they stood firm, united with their dedicated teachers, to demonstrate unwavering resolve and extraordinary strength. They have shown that adversity only fuels their determination to succeed.\n\nThis remarkable accomplishment is not just a reflection of their hard work but a powerful statement to our entire community: we can rise above any obstacle. Their success is a beacon of hope and an inspiration to all. Let us celebrate their resilience and commitment to excellence.\n\nTogether, we have proven that nothing can extinguish the fire of ambition. This achievement is a powerful testament to the indomitable spirit of the Southern Lebanon community. In the face of destruction and hardship, we stand united, proving that hope and determination can prevail.\n\nCongratulations, IB students — the future is yours to conquer.",
		),
		array(
			'slug'         => 'congratulations-official-exams-2025',
			'title'        => 'تهنئة من إدارة مدرسة قدموس',
			'lang'         => 'ar',
			'published_at' => '2025-08-02 13:12:00',
			'content'      => "إدارة مدرسة قدموس، بشخص رئيسها الأب جان يونس وأفراد الهيئتين التعليمية والإدارية، تفتخر بتلامذتها الأحبّة في صفوف علوم الحياة، العلوم العامة، والاقتصاد والاجتماع، في قسميهما الإنكليزي والفرنسي، وتبارك لهم نجاحهم وتميّزهم في الامتحانات الرسمية لهذا العام.\n\nوقد تقدّم إلى هذه الامتحانات 52 تلميذًا وتلميذة، فجاءت النتائج على النحو التالي:\n\n50 تلميذًا نجحوا بنسبة نجاح بلغت 100% بين الناجحين.\n\n2 تلميذ لم يوفَّقوا في الدورة الأولى، على أمل أن يحققوا النجاح في الدورة الثانية.",
		),
		array(
			'slug'         => 'school-year-2025-2026-dates',
			'title'        => 'School Year 2025 – 2026 Start Dates',
			'lang'         => 'en',
			'published_at' => '2025-06-07 04:29:00',
			'content'      => "The school year 2025 – 2026 begins on the following dates for each division:\n\n**Kindergarten (KG1 – Year 1):** Monday, 8 September 2025\n\n**Elementary (Year 2 – Year 6):** Monday, 8 September 2025\n\n**Intermediate (Year 7 – Year 9):** Tuesday, 9 September 2025\n\n**Secondary Lebanese (Year 10 – Year 12):** Tuesday, 9 September 2025\n\n**International Programs (IB / AP):** Wednesday, 10 September 2025\n\nPlease make sure all registration paperwork is completed before the start date. Contact the admissions office at admissions@cadmous.edu.lb with any questions.",
		),
		array(
			'slug'         => 'registration-reminder-2025-2026',
			'title'        => 'تذكير بالتسجيل للعام الدراسي 2025 - 2026',
			'lang'         => 'ar',
			'published_at' => '2025-06-07 03:47:00',
			'content'      => "أهلنا الأعزاء،\n\nنذكّركم بضرورة التوجّه إلى مكتب المحاسبة لدفع ما تبقى من القسط لهذا العام، وتأمين مقاعد أولادكم للعام الدراسي القادم 2025-2026 من خلال دفع رسم التسجيل قبل 15 حزيران.\n\nيُعتبر رسم التسجيل غير قابل للاسترداد.",
		),
	);
}

/**
 * Staff / heads of department.
 *
 * @return array<int,array<string,string>>
 */
function cadmous_seed_staff() {
	return array(
		array(
			'slug'  => 'samar-costantine',
			'name'  => 'Mrs. Samar Costantine',
			'role'  => 'Head of Kindergarten and Year 1',
			'email' => '',
			'bio'   => 'Mrs. Costantine leads the Kindergarten department and brings many years of early-years teaching experience to Cadmous College.',
		),
		array(
			'slug'  => 'hayfa-mozaya',
			'name'  => 'Mrs. Hayfa Mozaya',
			'role'  => 'Head of Years 2 to 6 (Elementary)',
			'email' => '',
			'bio'   => 'Mrs. Mozaya oversees the Elementary department and guides teachers in delivering the Lebanese National Curriculum.',
		),
		array(
			'slug'  => 'jean-pierre-karam',
			'name'  => 'Father Jean Pierre Karam (M.L.)',
			'role'  => 'Head of Years 7 to 9 (Intermediate)',
			'email' => '',
			'bio'   => 'Father Karam oversees the Intermediate division and is a member of the Maronite Lebanese Missionaries congregation.',
		),
		array(
			'slug'  => 'lucie-tannous-el-hajj',
			'name'  => 'Mrs. Lucie Tannous El hajj',
			'role'  => 'Head of Integrative Program',
			'email' => '',
			'bio'   => 'Mrs. El hajj leads the Integrative Program, supporting students with diverse learning needs across all divisions.',
		),
		array(
			'slug'  => 'jean-younes',
			'name'  => 'Father Dr. Jean Younes (M.L.)',
			'role'  => 'School Superior & Head of Lebanese Secondary',
			'email' => 'info@cadmous.edu.lb',
			'bio'   => 'Father Dr. Younes has served as Superior of Cadmous College for over ten years and leads the Secondary Lebanese division.',
		),
		array(
			'slug'  => 'ossama-salem',
			'name'  => 'Mr. Ossama Salem',
			'role'  => 'Director of International Programs',
			'email' => '',
			'bio'   => 'Mr. Salem directs the International Baccalaureate and Advanced Placement programs at Cadmous College.',
		),
	);
}
