// страница с услгами, с возможностью сворачивания секций и навигацией по услугам

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../Components/other/Navbar';
import Footer from '../../Components/other/Footer';

// Функция slugify остается без изменений
const slugify = (text) => {
  const rusToLat = { 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-', ',': '' };
  return text.toLowerCase().split('').map(char => rusToLat[char] || char).join('').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};

// Компонент ServiceLink остается без изменений
const ServiceLink = ({ category, item }) => (
  <Link 
    to={`/${category}/${slugify(item)}`}
    className="w-full text-left p-4 rounded-md transition-colors duration-200 relative overflow-hidden group"
  >
    <span className="relative z-10 text-zinc-300 group-hover:text-white transition-colors">{item}</span>
    <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
  </Link>
);

// Компонент CollapsibleSection остается без изменений
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-t border-zinc-700 first:border-t-0">
      <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center py-6 px-4 cursor-pointer bg-gradient-to-r from-zinc-800 to-zinc-900 transition-colors duration-300 hover:from-zinc-700 hover:to-zinc-800">
        <h2 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{title}</h2>
        <motion.div initial={false} animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="w-8 h-8 rounded-full border border-zinc-400 flex items-center justify-center">
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="content" initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }} transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div className="p-6 md:p-8 bg-zinc-900 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Services() {
  const websitesType = ["Landing page", "Промо-сайт", "Визитка", "Портал", "Интернет-магазин", "Маркетплейс", "Доска объявлений", "Сайт-портфолио", "Блог", "Форум", "Каталог", "Сайты услуг", "Продающие", "Корпоративные", "Личные", "Сложные", "Многостраничные", "Нестандартные", "Простые", "Информационные", "Адаптивные", "Мобильная версия", "Доработка сайта", "Дизайн сайта", "Дизайн для маркетплейсов", "Модульная сетка", "CDN"];
  const webThemes = ["Авто", "Логистика", "Строительство", "Агентства недвижимости", "Ремонт", "Образование", "СМИ", "Медицина", "Туризм", "Юристы", "Рестораны и кафе", "Доставка еды", "Знакомства", "Свадьба"];
  const promotion = ["SEO продвижение", "Услуги PR", "Государственный PR"];
  const branding = ["Брендинг", "Логотипы", "Нейминг", "Брендбук", "Дизайн упаковки", "Айдентика", "Фирменный стиль", "Гайдбук", "Разработка слогана", "Логобук", "Ребрендинг", "Гайдлайн", "Монограмма", "Дизайн пакетов", "Разработка личного бренда", "Создание бренд-портфеля", "Создание бренда продукта", "Дизайн выставочных стендов", "Разработка дизайна меню", "Дизайн анимации, видео-рекламы", "Инфографика", "Копирайтинг"];
  const polygraphy = ["Полиграфический дизайн", "Верстка полиграфии", "Годовые отчеты", "Брошюры", "Буклеты", "Флаеры", "Плакаты и постеры", "Блокноты", "Визитки", "Баннеры", "Каталоги", "Пластиковые карты", "Папки", "Листовки", "Roll Up", "Лифлеты", "Пресс-волл", "Иллюстрации", "Конверты", "Бланки", "Открытки", "Иконки", "Фирменные персонажи", "Календари", "Книги"];
  const presentations = ["Презентации для логистических компаний", "Интерактивные презентации", "Презентация на английском языке", "Инвестиционная презентация", "Коммерческое предложение", "Презентации для торговых центров", "Презентации для выступления", "Презентации для тендеров", "Оформление презентаций"];
  const integrations = ["Настройка amoCRM", "Автоматизация бизнеса"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 py-12 lg:py-24 max-w-8xl">
        {/* =================================================================================== */}
        {/* ВОТ ИЗМЕНЕНИЕ: Навигация теперь здесь, внутри основного контейнера */}
        {/* Она всегда будет на одном и том же месте относительно заголовка H1 */}
        <div className="mb-8 text-sm md:text-base text-zinc-500">
          <Link to="/" className="hover:underline hover:text-blue-500 transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-white font-semibold">Услуги</span>
        </div>
        {/* =================================================================================== */}
      
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 lg:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Услуги
        </h1>

        <div className="space-y-6">
          <CollapsibleSection title="Презентации">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {presentations.map((item, index) => (
                <ServiceLink key={index} category="presentations" item={item} />
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Сайты">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {websitesType.map((item, index) => (
                <ServiceLink key={index} category="websites" item={item} />
              ))}
            </div>
            <h3 className="text-lg font-semibold mt-8 mb-4">Тематика</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {webThemes.map((item, index) => (
                <ServiceLink key={index} category="websites/themes" item={item} />
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Продвижение">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {promotion.map((item, index) => (
                <ServiceLink key={index} category="promotion" item={item} />
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Брендинг">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {branding.map((item, index) => (
                <ServiceLink key={index} category="branding" item={item} />
              ))}
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="Полиграфический дизайн">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {polygraphy.map((item, index) => (
                 <ServiceLink key={index} category="polygraphy" item={item} />
              ))}
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="Интеграции">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {integrations.map((item, index) => (
                <ServiceLink key={index} category="integrations" item={item} />
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </main>

      <Footer/>
    </div>
  );
}