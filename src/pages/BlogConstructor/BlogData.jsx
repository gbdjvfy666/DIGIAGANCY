/**
 * =============================================================================
 * КАТЕГОРИИ, ТЕГИ И ДАННЫЕ СТАТЕЙ БЛОГА
 * =============================================================================
 */

export const blogCategoryData = {
  marketing: {
    title: 'Маркетинг',
    path: '/blog/marketing'
  },
  design: {
    title: 'Дизайн',
    path: '/blog/design'
  },
  technology: {
    title: 'Технологии',
    path: '/blog/technology'
  },
};

export const blogTagsData = [
    { id: 'all', name: 'Все статьи', slug: '' },
    { id: 'aydentika', name: 'Айдентика', slug: 'aydentika' },
    { id: 'brendbuki', name: 'Брендбуки', slug: 'brendbuki' },
    { id: 'brendyng', name: 'Брендинг', slug: 'brendyng' },
    { id: 'veb-dizayn', name: 'Веб-дизайн', slug: 'web-design' },
    { id: 'videoroliki', name: 'Видеоролики', slug: 'videoroliki' },
    { id: 'dizayn', name: 'Дизайн', slug: 'dizayn' },
    { id: 'kopirayting', name: 'Копирайтинг', slug: 'kopirayting' },
    { id: 'logotipy', name: 'Логотипы', slug: 'logotipy' },
    { id: 'marketing', name: 'Маркетинг', slug: 'marketing' },
    { id: 'neyroseti', name: 'Нейросети', slug: 'neyroseti' },
    { id: 'poligraficheskiy-dizayn', name: 'Полиграфический дизайн', slug: 'poligraficheskiy-dizayn' },
    { id: 'pr', name: 'PR', slug: 'pr' },
    { id: 'prezentatsii', name: 'Презентации', slug: 'prezentatsii' },
    { id: 'prodvizheniye-saytov', name: 'Продвижение сайтов', slug: 'prodvizheniye-saytov' },
    { id: 'reklama', name: 'Реклама', slug: 'reklama' },
    { id: 'seo', name: 'SEO', slug: 'seo' },
    { id: 'sozdaniye-saytov', name: 'Создание сайтов', slug: 'sozdaniye-saytov' },
];

const recommendedPostsData = [
  { slug: "pyat-red-flagov-kotorye-ubivayut-biznes-prezentatsiyu", imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/255/800_9999_0/gyet3x0h6olotjxqbjteb1y18atso5jb.webp", title: "Пять ред-флагов, которые убивают бизнес-презентацию", likes: 73 },
  { slug: "10-neyroinstrumentov-kotorye-realno-pomogayut-v-veb-dizayne", imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/6ec/800_9999_0/d7duoxi6914fkrdonu0m0cywdqakif17.webp", title: "10 нейроинструментов, которые реально помогают в веб-дизайне", likes: 86 },
  { slug: "neyroseti-dlya-sozdaniya-prezentaciy-protiv-dizaynerov", imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/d67/800_9999_0/wgeqg4maocx19n7w3y3xy7mbn2affj9b.webp", title: "Нейросети для презентаций против графических дизайнеров", likes: 98 }
];

const genericAuthor = { name: "Команда Veonix", position: "Эксперты в digital", imageUrl: "https://via.placeholder.com/150", link: "/about" };

export const blogPostsData = {
  // --- СТАТЬЯ 1 (Ваша оригинальная) ---
  'how-to-make-a-landing-page': {
    category: 'marketing',
    title: "Как сделать лендинг и поднять продажи до небес",
    slug: 'how-to-make-a-landing-page',
    imageUrl: "https://images.unsplash.com/photo-1559028006-44d08154314c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    readingTime: "5 минут",
    date: "01.10.2024",
    excerpt: "Откройте секреты создания эффективного лендинга! Узнайте, как привлечь больше клиентов и значительно увеличить продажи с помощью нашего пошагового руководства.",
    stats: { likes: 105, comments: 2, views: 8102 },
    tags: [
        { name: 'Создание сайтов', slug: 'sozdaniye-saytov', id: 'sozdaniye-saytov' },
        { name: 'Маркетинг', slug: 'marketing', id: 'marketing' }
    ],
    blocks: [
      {
        type: 'hero',
        data: {
          title: "Как сделать лендинг и поднять продажи до небес",
          description: "Откройте секреты создания эффективного лендинга! Узнайте, как привлечь больше клиентов и значительно увеличить продажи с помощью нашего пошагового руководства.",
          author: { name: "Виктор Некрасов", position: "Креативный директор", imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/iblock/698/54r4qipi8ssn5hlp18pzo2w96wlfzf6c.webp", link: "/nasha-komanda/viktor-nekrasov/" },
          readingTime: "5 минут",
          stats: { likes: 105, comments: 2, views: 8102 },
          tags: [{ name: "Создание сайтов", link: "/blog/?tag=sozdaniye-saytov" }, { name: "Продвижение сайтов", link: "/blog/?tag=prodvizheniye-saytov" }]
        }
      },
      {
        type: 'content',
        data: {
          tableOfContents: [ { title: "Что такое лендинг", link: "#block1" }, { title: "Чем лендинг отличается от многостраничного сайта", link: "#block2" }, { title: "Как сделать продающий лэндинг?", link: "#block3", children: [ { title: "Где заказать создание одностраничного сайта?", link: "#block4" }, { title: "Преимущества Landing Page", link: "#block5" }, { title: "Структура одностраничника", link: "#block6" }, ] }, { title: "Этапы создания лендинга", link: "#block7", children: [ { title: "Как изучить конкурентов", link: "#block8" }, { title: "Как определить целевую аудиторию", link: "#block9" }, { title: "Как написать текст", link: "#block10" }, { title: "Как нарисовать прототип", link: "#block11" }, { title: "Как сделать дизайн", link: "#block12" }, ] }, ],
          htmlContent: `<p>Один в поле не воин. Это заявление опровергает грамотно составленный лендинг...</p>` // Здесь ваш полный HTML
        }
      },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  
  // --- ДАЛЕЕ ИДУТ ЗАПОЛНЕННЫЕ СТАТЬИ-ЗАГЛУШКИ ---
  'kak-prodvinut-sayt': {
    category: 'marketing',
    title: 'Как продвинуть сайт: инструкция для тех, кто хочет быть в топе',
    slug: 'kak-prodvinut-sayt',
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    readingTime: "3 минуты",
    date: "24.09.2024",
    excerpt: "Ответственные владельцы веб-ресурсов задумываются, как продвинуть сайт в поисковых системах. Если его не найти на первой странице в выдаче поисков...",
    stats: { likes: 161, comments: 0, views: 6373 },
    tags: [{ name: "Продвижение сайтов", slug: "prodvizheniye-saytov", id: 'prodvizheniye-saytov' }, { name: "SEO", slug: "seo", id: 'seo' }],
    blocks: [
      { type: 'hero', data: { title: 'Как продвинуть сайт: инструкция для тех, кто хочет быть в топе', description: "Ответственные владельцы веб-ресурсов задумываются, как продвинуть сайт в поисковых системах...", author: genericAuthor, readingTime: "3 минуты", stats: { likes: 161, comments: 0, views: 6373 }, tags: [{ name: "Продвижение сайтов", slug: "prodvizheniye-saytov" }, { name: "SEO", slug: "seo" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'chto-takoe-seo-kopirayting': {
    category: 'marketing',
    title: 'Что такое SEO-копирайтинг',
    slug: 'chto-takoe-seo-kopirayting',
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    readingTime: "3 минуты",
    date: "17.09.2024",
    excerpt: "Если вы собираетесь продвигать сайт, то необходимо знать, что такое SEO-копирайтинг. Этот инструмент помогает ресурсам выбиться в топ поисковых си...",
    stats: { likes: 153, comments: 0, views: 2746 },
    tags: [{ name: "Копирайтинг", slug: "kopirayting", id: 'kopirayting' }, { name: "SEO", slug: "seo", id: 'seo' }],
    blocks: [
      { type: 'hero', data: { title: 'Что такое SEO-копирайтинг', description: "Если вы собираетесь продвигать сайт, то необходимо знать, что такое SEO-копирайтинг...", author: genericAuthor, readingTime: "3 минуты", stats: { likes: 153, comments: 0, views: 2746 }, tags: [{ name: "Копирайтинг", slug: "kopirayting" }, { name: "SEO", slug: "seo" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'konstruktory-saytov': {
    category: 'technology',
    title: 'Конструкторы сайтов: преимущества и недостатки',
    slug: 'konstruktory-saytov',
    imageUrl: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    readingTime: "2 минуты",
    date: "09.09.2024",
    excerpt: "Человек склонен выбирать путь наименьшего сопротивления. Так удобнее, ведь не нужно тратить много ресурсов: денег, времени, фантазии. Если говорит...",
    stats: { likes: 135, comments: 0, views: 7023 },
    tags: [{ name: "Создание сайтов", slug: "sozdaniye-saytov", id: 'sozdaniye-saytov' }],
    blocks: [
      { type: 'hero', data: { title: 'Конструкторы сайтов: преимущества и недостатки', description: "Человек склонен выбирать путь наименьшего сопротивления...", author: genericAuthor, readingTime: "2 минуты", stats: { likes: 135, comments: 0, views: 7023 }, tags: [{ name: "Создание сайтов", slug: "sozdaniye-saytov" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'pyat-red-flagov-kotorye-ubivayut-biznes-prezentatsiyu': {
    category: 'design',
    title: "Пять ред-флагов, которые убивают бизнес-презентацию",
    slug: 'pyat-red-flagov-kotorye-ubivayut-biznes-prezentatsiyu',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/255/800_9999_0/gyet3x0h6olotjxqbjteb1y18atso5jb.webp",
    readingTime: "4 минуты",
    date: "01.09.2024",
    excerpt: "Плохой дизайн, перегруженность текстом, отсутствие структуры – разбираем главные ошибки, которые мешают вашей презентации достигать цели и убеждать.",
    stats: { likes: 73, comments: 5, views: 4100 },
    tags: [ { name: 'Дизайн', slug: 'dizayn', id: 'dizayn' }, { name: 'Презентации', slug: 'prezentatsii', id: 'prezentatsii' } ],
    blocks: [
      { type: 'hero', data: { title: "Пять ред-флагов, которые убивают бизнес-презентацию", description: "Плохой дизайн, перегруженность текстом, отсутствие структуры...", author: genericAuthor, readingTime: "4 минуты", stats: { likes: 73, comments: 5, views: 4100 }, tags: [{ name: "Дизайн", slug: "dizayn" }, { name: 'Презентации', slug: 'prezentatsii' }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  '10-neyroinstrumentov-kotorye-realno-pomogayut-v-veb-dizayne': {
    category: 'technology',
    title: "10 нейроинструментов, которые реально помогают в веб-дизайне",
    slug: '10-neyroinstrumentov-kotorye-realno-pomogayut-v-veb-dizayne',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/6ec/800_9999_0/d7duoxi6914fkrdonu0m0cywdqakif17.webp",
    readingTime: "6 минут",
    date: "25.08.2024",
    excerpt: "От генерации идей до создания уникальных изображений и цветовых палитр. Обзор лучших ИИ-сервисов, которые ускорят вашу работу и поднимут креативность.",
    stats: { likes: 86, comments: 1, views: 5234 },
    tags: [ { name: 'Нейросети', slug: 'neyroseti', id: 'neyroseti' }, { name: 'Веб-дизайн', slug: 'web-design', id: 'veb-dizayn' } ],
    blocks: [
      { type: 'hero', data: { title: "10 нейроинструментов, которые реально помогают в веб-дизайне", description: "От генерации идей до создания уникальных изображений...", author: genericAuthor, readingTime: "6 минут", stats: { likes: 86, comments: 1, views: 5234 }, tags: [{ name: 'Нейросети', slug: 'neyroseti' }, { name: 'Веб-дизайн', slug: 'web-design' }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'neyroseti-dlya-sozdaniya-prezentaciy-protiv-dizaynerov': {
    category: 'technology',
    title: "Нейросети для презентаций против графических дизайнеров",
    slug: 'neyroseti-dlya-sozdaniya-prezentaciy-protiv-dizaynerov',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/d67/800_9999_0/wgeqg4maocx19n7w3y3xy7mbn2affj9b.webp",
    readingTime: "5 минут",
    date: "18.08.2024",
    excerpt: "Сможет ли искусственный интеллект полностью заменить человека в создании визуальных материалов? Сравниваем возможности, плюсы и минусы обоих подходов.",
    stats: { likes: 98, comments: 12, views: 6890 },
    tags: [ { name: 'Нейросети', slug: 'neyroseti', id: 'neyroseti' }, { name: 'Презентации', slug: 'prezentatsii', id: 'prezentatsii' } ],
    blocks: [
      { type: 'hero', data: { title: "Нейросети для презентаций против графических дизайнеров", description: "Сможет ли искусственный интеллект полностью заменить человека...", author: genericAuthor, readingTime: "5 минут", stats: { likes: 98, comments: 12, views: 6890 }, tags: [{ name: 'Нейросети', slug: 'neyroseti' }, { name: 'Презентации', slug: 'prezentatsii' }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'osnovnye-printsipy-yuzabiliti-sayta': {
    category: 'design',
    title: 'Основные принципы юзабилити сайта',
    slug: 'osnovnye-printsipy-yuzabiliti-sayta',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/iblock/1e7/lvzietb1mv1qucbz9q9lu1qr9pq8lb9c.webp",
    readingTime: "2 минуты",
    date: "15.01.2025",
    excerpt: "Основные принципы юзабилити сайта играют важную роль в создании удобного ресурса. Юзабилити (usability) переводится как «удобство использования» и...",
    stats: { likes: 142, comments: 0, views: 1859 },
    tags: [{ name: "Создание сайтов", slug: "sozdaniye-saytov", id: 'sozdaniye-saytov' }],
    blocks: [
      { type: 'hero', data: { title: 'Основные принципы юзабилити сайта', description: "Основные принципы юзабилити сайта играют важную роль...", author: genericAuthor, readingTime: "2 минуты", stats: { likes: 142, comments: 0, views: 1859 }, tags: [{ name: "Создание сайтов", slug: "sozdaniye-saytov" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'instrumenty-pr': {
    category: 'marketing',
    title: 'Инструменты PR',
    slug: 'instrumenty-pr',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/767/800_800_0/abvfn1672zzcu3m0gdou3z0o5wasc280.webp",
    readingTime: "4 минуты",
    date: "24.10.2024",
    excerpt: "Инструменты PR — основа общения компании с обществом. Они помогают выстраивать связь с целевой аудиторией, укреплять репутацию бренда, достигать б...",
    stats: { likes: 120, comments: 0, views: 3700 },
    tags: [ { name: "PR", slug: "pr", id: 'pr' }, { name: "Реклама", slug: "reklama", id: 'reklama' } ],
    blocks: [
      { type: 'hero', data: { title: 'Инструменты PR', description: "Инструменты PR — основа общения компании с обществом...", author: genericAuthor, readingTime: "4 минуты", stats: { likes: 120, comments: 0, views: 3700 }, tags: [{ name: "PR", slug: "pr" }, { name: "Реклама", slug: "reklama" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'chto-takoe-pr': {
    category: 'marketing',
    title: 'Что такое PR',
    slug: 'chto-takoe-pr',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/iblock/a0b/3d7hne1t2qj3ok2p8fmix9bbbaa2xvvk.webp",
    readingTime: "4 минуты",
    date: "03.10.2024",
    excerpt: "Если вы планируете развивать бизнес или выстраивать отношения с клиентами, то необходимо знать, что такое пиар. Этот инструмент помогает улучшить ...",
    stats: { likes: 152, comments: 0, views: 3382 },
    tags: [ { name: "PR", slug: "pr", id: 'pr' }, { name: "Реклама", slug: "reklama", id: 'reklama' } ],
    blocks: [
      { type: 'hero', data: { title: 'Что такое PR', description: "Если вы планируете развивать бизнес или выстраивать отношения с клиентами...", author: genericAuthor, readingTime: "4 минуты", stats: { likes: 152, comments: 0, views: 3382 }, tags: [{ name: "PR", slug: "pr" }, { name: "Реклама", slug: "reklama" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'chto-luchshe-prilozhenie-ili-sayt': {
    category: 'technology',
    title: 'Что лучше: приложение или сайт',
    slug: 'chto-luchshe-prilozhenie-ili-sayt',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/0d7/800_9999_0/72sxpogbdhwwki2svyawndnd03ykfoc3.webp",
    readingTime: "3 минуты",
    date: "20.07.2024",
    excerpt: "Вечный спор маркетологов и разработчиков. Разбираемся в плюсах и минусах каждого подхода, чтобы помочь вам сделать правильный выбор для вашего бизнеса.",
    stats: { likes: 122, comments: 8, views: 4501 },
    tags: [{ name: "Создание сайтов", slug: "sozdaniye-saytov", id: 'sozdaniye-saytov' }],
    blocks: [
      { type: 'hero', data: { title: 'Что лучше: приложение или сайт', description: "Вечный спор маркетологов и разработчиков...", author: genericAuthor, readingTime: "3 минуты", stats: { likes: 122, comments: 8, views: 4501 }, tags: [{ name: "Создание сайтов", slug: "sozdaniye-saytov" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },
  'kak-adaptirovat-sayt-pod-mobilnye-ustroystva': {
    category: 'design',
    title: 'Как адаптировать сайт под мобильные устройства',
    slug: 'kak-adaptirovat-sayt-pod-mobilnye-ustroystva',
    imageUrl: "https://cdn.veonix.ru/upload/cssinliner_webp/resize_cache/iblock/2fc/800_9999_0/dg36aq173dbdrsu2slc9biajcrdgnfbi.webp",
    readingTime: "4 минуты",
    date: "15.07.2024",
    excerpt: "Более 60% трафика приходит с мобильных устройств. Убедитесь, что ваш сайт готов к этому. Пошаговая инструкция по адаптивной верстке и дизайну.",
    stats: { likes: 132, comments: 3, views: 5050 },
    tags: [ { name: "Веб-дизайн", slug: "web-design", id: 'veb-dizayn' }, { name: "Создание сайтов", slug: "sozdaniye-saytov", id: 'sozdaniye-saytov' } ],
    blocks: [
      { type: 'hero', data: { title: 'Как адаптировать сайт под мобильные устройства', description: "Более 60% трафика приходит с мобильных устройств...", author: genericAuthor, readingTime: "4 минуты", stats: { likes: 132, comments: 3, views: 5050 }, tags: [{ name: "Веб-дизайн", slug: "web-design" }, { name: "Создание сайтов", slug: "sozdaniye-saytov" }] } },
      { type: 'content', data: { tableOfContents: [{title: 'Введение', link: '#intro'}], htmlContent: '<h2 id="intro">Введение</h2><p>Содержимое этой статьи находится в разработке.</p>' } },
      { type: 'comments', data: { comments: [] } },
      { type: 'recommended', data: { title: "Рекомендуем", posts: recommendedPostsData } }
    ]
  },

  // === СПЕЦИАЛЬНЫЙ ОБЪЕКТ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ БЛОГА ===
  'blog-index': {
    title: "Блог",
    isIndexPage: true, 
    blocks: [
        { type: 'tags-nav', data: { tags: blogTagsData } },
        { type: 'posts-grid', data: {} }
    ]
  }
};