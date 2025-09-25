import React, { Suspense, lazy, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';
import LOGO_WHITE from '../assets/LOGO_WHITE.png';
import { FaPaintBrush, FaGlobe, FaPrint, FaChalkboardTeacher, FaBullhorn, FaCogs } from 'react-icons/fa';

const PrismaticBurst = lazy(() => import('../Components/PrismaticBurst'));

// --- НОВЫЙ УЛУЧШЕННЫЙ КОМПОНЕНТ: Бегущая строка ---
const InfiniteScroller = ({ items, direction = 'left', type = 'outline' }) => {
  const allItems = [...items, ...items]; // Дублируем для бесшовности
  const typeClasses = type === 'filled'
    ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
    : 'border border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-white hover:border-zinc-700';

  return (
    <div className="infinite-scroller w-full overflow-hidden" data-direction={direction}>
      <div className="scroller-inner">
        {allItems.map((item, index) => (
          <div key={index} className={`tag font-medium ${typeClasses}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Design() {
  // --- Все ваши услуги, сгруппированные для удобства ---
  const allServices = useMemo(() => ({
    branding: { title: "Брендинг", items: ["Логотипы", "Нейминг", "Брендбук", "Дизайн упаковки", "Айдентика", "Фирменный стиль", "Гайдбук", "Разработка слогана", "Логобук", "Ребрендинг", "Гайдлайн", "Монограмма", "Дизайн пакетов", "Разработка личного бренда", "Создание бренд-портфеля", "Создание бренда продукта", "Дизайн выставочных стендов", "Разработка дизайна меню", "Дизайн анимации, видео-рекламы"] },
    websites: { title: "Веб-сайты", items: ["Landing page", "Промо-сайт", "Визитка", "Портал", "Интернет-магазин", "Маркетплейс", "Доска объявлений", "Сайт-портфолио", "Блог", "Форум", "Каталог", "Сайты услуг", "Продающие", "Корпоративные", "Личные", "Сложные", "Многостраничные", "Нестандартные", "Простые", "Информационные", "Адаптивные", "Мобильная версия", "Доработка сайта", "Дизайн сайта", "CDN"] },
    presentations: { title: "Презентации", items: ["Для логистики", "Интерактивные", "На английском", "Инвестиционные", "Коммерческие предложения", "Для ТЦ", "Для выступлений", "Для тендеров", "Оформление"] },
    promotion: { title: "Продвижение", items: ["SEO", "PR-услуги", "Государственный PR"] },
    integrations: { title: "Интеграции", items: ["Настройка amoCRM", "Автоматизация бизнеса"] }
  }), []);

  const [activeTab, setActiveTab] = useState(Object.keys(allServices)[0]);

  // --- Основные услуги (остаются без изменений) ---
  const mainServices = useMemo(() => [
    { title: "Дизайн для маркетплейсов", subtitle: "Wildberries • Ozon • Яндекс.Маркет", description: "Создаем продающие карточки товаров, которые выделяют ваш продукт среди конкурентов и увеличивают конверсию. Полный цикл: от анализа до готовых файлов.", icon: "✠", features: ["Глубокий анализ ниши и конкурентов", "Несколько вариантов дизайна на выбор", "Подготовка файлов по тех. требованиям"], animationColors: ['#FF007A', '#5F00D8', '#00F0FF'] },
    { title: "Брендинг и логотипы", subtitle: "Узнаваемость • Ассоциации • Стиль", description: "Разрабатываем уникальные логотипы и комплексный фирменный стиль, который создает сильные ассоциации с вашим брендом. Включает гайдлайны и шаблоны.", icon: "☩", features: ["3-5 концепций логотипа на выбор", "Создание полного брендбука", "Разработка анимации логотипа"], animationColors: ['#FFD700', '#FF8C00', '#FFF8E7'] },
    { title: "Соцсети и контент", subtitle: "Единый стиль • Вовлечение • Узнаваемость", description: "Комплексное оформление социальных сетей с единой стилистикой: от аватарок до шаблонов постов и сторис. Создаем узнаваемый визуальный язык.", icon: "☨", features: ["Оформление VK, Telegram, Instagram", "Набор шаблонов для постов и историй", "Создание контент-плана"], animationColors: ['#00FF7F', '#4169E1', '#E0FFF0'] }
  ], []);

  const allServiceItemsForScroller = useMemo(() => Object.values(allServices).flatMap(cat => cat.items), [allServices]);
  
  // Разделим все услуги на две части для двух скроллеров
  const scrollerPart1 = allServiceItemsForScroller.slice(0, Math.ceil(allServiceItemsForScroller.length / 2));
  const scrollerPart2 = allServiceItemsForScroller.slice(Math.ceil(allServiceItemsForScroller.length / 2));

  return (
    <div className="bg-black text-gray-200 min-h-screen font-garet relative overflow-x-hidden">
      <div className="relative z-10">

        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
          <motion.div initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <span className="text-[40rem] font-damione text-zinc-900 leading-none" aria-hidden="true">D</span>
          </motion.div>
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1 className="text-5xl md:text-8xl font-damione font-extrabold leading-tight uppercase tracking-wider text-white" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } }, hidden: {} }}>
              <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="inline-block">ДИЗАЙН,</motion.span>{' '}
              <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="inline-block">КОТОРЫЙ</motion.span>{' '}
              <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="inline-block text-zinc-400">РАБОТАЕТ</motion.span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} className="text-lg font-garet text-gray-400 max-w-2xl mx-auto mt-6">
              Мы создаем не просто красивые картинки, а визуальные системы, которые решают задачи вашего бизнеса, привлекают клиентов и повышают продажи.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} className="flex flex-col sm:flex-row items-center gap-6 mt-12">
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-none font-bold text-lg hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto transform hover:scale-105">
                <span>Обсудить проект</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <button className="px-8 py-4 border border-zinc-700 font-garet text-white rounded-none font-bold hover:bg-zinc-900 transition-colors duration-300 w-full sm:w-auto">
                Смотреть портфолио
              </button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-700 to-zinc-900"></div>
          </motion.div>
        </section>

        {/* --- НОВЫЙ МАКСИМАЛЬНО УЛУЧШЕННЫЙ БЛОК С БЕГУЩЕЙ СТРОКОЙ --- */}
        <section className="py-24 bg-black border-y border-zinc-800 overflow-hidden">
          <div className="text-center mb-16 px-6">
            <h2 className="text-4xl md:text-6xl font-damione font-rubik tracking-wide">
              Наша экспертиза в деталях
            </h2>
            <p className="text-lg text-gray-400 font-garet max-w-3xl mx-auto mt-4">
              От брендинга до сложных интеграций — мы покрываем весь спектр диджитал-дизайна.
            </p>
          </div>
          <div className="space-y-6 transform -rotate-2 scale-110">
            <InfiniteScroller items={scrollerPart1} direction="left" />
            <InfiniteScroller items={scrollerPart2} direction="right" type="filled" />
          </div>
        </section>
        
        {/* --- Секция Ключевые направления --- */}
        <section className="w-full px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-damione font-rubik tracking-wide">Ключевые направления</h2>
            <p className="text-lg text-gray-400 font-garet max-w-3xl mx-auto mt-4">
              Три столпа нашей дизайн-экспертизы, которые приносят клиентам измеримый результат.
            </p>
          </div>
          <div className="max-w-7xl mx-auto space-y-12">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-zinc-900 rounded-none overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col md:flex-row">
                <div className="md:w-2/5 h-64 md:h-auto relative bg-zinc-950">
                   <div className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none"><div className="text-center text-gray-400"><span className="text-8xl font-thin">{service.icon}</span><h3 className="text-3xl font-bold mt-4 font-deutsch tracking-wider">{service.title}</h3><p className="text-zinc-500 mt-2">{service.subtitle}</p></div></div>
                   <div className="absolute inset-0 z-10"><Suspense fallback={<div className="w-full h-full bg-zinc-900" />}><PrismaticBurst colors={service.animationColors} animationType="rotate3d" intensity={1.5} speed={0.4} distort={0.8} rayCount={14} /></Suspense></div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col"><div className="flex-1"><p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p><ul className="space-y-3 mb-8">{service.features.map((feature, i) => (<li key={i} className="flex items-start"><span className="text-gray-500 mr-3 mt-1">•</span><span>{feature}</span></li>))}</ul></div><div className="flex flex-col sm:flex-row gap-4"><button className="px-6 py-3 bg-gray-200 text-black rounded-none font-bold hover:bg-white transition flex-1">Заказать услугу</button><button className="px-6 py-3 border border-zinc-700 rounded-none font-bold hover:bg-zinc-800 transition flex-1">Примеры работ</button></div></div>
              </div>
            ))}
          </div>
        </section>
        
        {/* --- Все услуги --- */}
        <section className="px-6 py-24 bg-zinc-950 border-y border-zinc-900">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-6xl font-damione font-rubik tracking-wide">Все грани дизайна</h2><p className="text-lg text-gray-400 font-garet max-w-3xl mx-auto mt-4">Наш опыт охватывает все ключевые направления. Выберите категорию, чтобы исследовать возможности.</p></div>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 mb-12">{Object.keys(allServices).map(key => {const icons = { branding: <FaPaintBrush className="mr-2" />, websites: <FaGlobe className="mr-2" />, polygraphy: <FaPrint className="mr-2" />, presentations: <FaChalkboardTeacher className="mr-2" />, promotion: <FaBullhorn className="mr-2" />, integrations: <FaCogs className="mr-2" /> }; return (<button key={key} onClick={() => setActiveTab(key)} className={`relative flex items-center px-5 py-2 text-base font-medium rounded-full transition-colors duration-300 ${activeTab === key ? 'text-white' : 'text-gray-500 hover:text-white'}`}>{icons[key]}{allServices[key].title}{activeTab === key && (<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" layoutId="underline" />)}</button>);})}</div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial="hidden" animate="visible" exit="hidden" variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }}} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allServices[activeTab].items.map((item, i) => {const descriptions = { "Логотипы": "Создаем уникальные знаки, которые запоминаются.", "Нейминг": "Разрабатываем звучные имена для вашего бренда.", "Брендбук": "Полное руководство по использованию фирменного стиля.", "Landing page": "Конверсионные страницы для запуска продуктов.", "Интернет-магазин": "Надежные E-commerce решения для продаж.", "Верстка": "Профессиональная верстка любой сложности." }; return (<motion.div key={item} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 },}} transition={{ duration: 0.4 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-none group h-full flex flex-col hover:border-white hover:-translate-y-1 transition-all duration-300"><h3 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-300">{item}</h3><p className="text-sm text-gray-500 mt-2 flex-grow">{descriptions[item] || "Комплексные решения для вашего бизнеса."}</p></motion.div>);})}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* --- Процесс Работы --- */}
        <section className="py-24 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20"><h2 className="text-4xl md:text-6xl font-damione font-rubik tracking-wide">Прозрачный процесс, гарантирующий результат</h2><p className="text-lg text-gray-400 font-garet max-w-3xl mx-auto mt-6">Мы разбили создание дизайна на понятные этапы. Вы всегда знаете, на какой стадии находится проект и что будет дальше.</p></div>
            <div className="relative"><div className="absolute left-6 md:left-8 top-8 h-[calc(100%-2rem)] w-px bg-zinc-800" aria-hidden="true"></div>
              <div className="space-y-16">{[{ step: "01", title: "Погружение и Анализ", description: "Мы не просто слушаем, мы слышим. Глубоко изучаем ваш бизнес, цели и конкурентов, чтобы создать дизайн, который решает конкретные задачи.", details: ["Заполнение развернутого брифа", "Анализ конкурентной среды", "Формирование технического задания"] }, { step: "02", title: "Визуальная Концепция", description: "Это этап творчества, подкрепленного аналитикой. Разрабатываем 2-3 уникальные дизайн-концепции, которые мы представляем и защищаем.", details: ["Создание мудбордов", "Разработка концепций дизайна", "Согласование ключевого стиля"] }, { step: "03", title: "Детальный Дизайн", description: "После утверждения концепции мы прорабатываем все страницы, состояния и элементы интерфейса, создавая целостную и удобную визуальную систему.", details: ["Дизайн всех страниц и экранов", "Проработка UI/UX элементов", "Создание адаптивных версий"] }, { step: "04", title: "Итерации и Согласование", description: "Ваша обратная связь — ключ к идеальному результату. Мы вносим необходимые правки, доводя каждый пиксель до совершенства.", details: ["Презентация готовых макетов", "Внесение правок (2-3 раунда)", "Финальное утверждение"] }, { step: "05", title: "Финализация и Передача", description: "Проект готов! Мы аккуратно организуем все исходные файлы, подготавливаем гайдлайны и передаем вам полный пакет материалов.", details: ["Подготовка всех исходников (Figma)", "Создание UI-кита и гайдлайнов", "Консультация для разработчиков"] }].map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="relative flex items-start"><div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-zinc-700 bg-black z-10"><span className="text-xl md:text-2xl font-semibold text-white">{item.step}</span></div><div className="ml-6 md:ml-10"><h3 className="text-2xl md:text-3xl font-bold text-white font-deutsch tracking-wider">{item.title}</h3><p className="mt-2 text-gray-400 leading-relaxed">{item.description}</p><ul className="mt-4 space-y-2">{item.details.map((detail, j) => (<li key={j} className="flex items-center text-gray-500"><svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>{detail}</li>))}</ul></div></motion.div>))}</div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="relative bg-black border-y border-zinc-800 py-24 sm:py-32 overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 112, 115, 0.4) 0%, rgba(0, 31, 84, 0.2) 30%, transparent 65%)' }}>
          <div className="relative z-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div><h2 className="text-4xl md:text-6xl font-damione font-extrabold tracking-wide text-white">Воплотим вашу идею в реальность</h2><p className="text-gray-400 mt-6 text-lg leading-relaxed">Оставьте заявку, и мы свяжемся с вами в течение часа, чтобы обсудить ваш проект и предложить первые идеи. Никакого спама, только продуктивный диалог.</p><ul className="space-y-4 mt-8"><li className="flex items-center text-gray-300"><svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Бесплатная консультация и аудит</li><li className="flex items-center text-gray-300"><svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Гарантия сроков по договору</li><li className="flex items-center text-gray-300"><svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Команда из 10+ профильных экспертов</li></ul></div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-none">
              <form action="#" method="POST" className="space-y-6">
                <div><label htmlFor="name" className="sr-only">Имя</label><input type="text" name="name" id="name" placeholder="Ваше имя" className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" /></div>
                <div><label htmlFor="contact" className="sr-only">Телефон или Email</label><input type="text" name="contact" id="contact" placeholder="Телефон или Email" className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" /></div>
                <div><label htmlFor="message" className="sr-only">Кратко о задаче</label><textarea name="message" id="message" rows={4} placeholder="Кратко о задаче (необязательно)" className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none"></textarea></div>
                <div><button type="submit" className="w-full bg-white text-black px-10 py-4 rounded-none font-bold text-lg hover:scale-105 transition-transform duration-300">Отправить заявку</button></div>
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}