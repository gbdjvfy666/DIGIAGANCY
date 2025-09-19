import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../Components/other/Navbar';
import Footer from '../../Components/other/Footer';

// Компонент сворачивающейся секции
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-zinc-700 first:border-t-0">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center py-6 px-4 cursor-pointer bg-gradient-to-r from-zinc-800 to-zinc-900 transition-colors duration-300 hover:from-zinc-700 hover:to-zinc-800"
      >
        <h2 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          {title}
        </h2>
        <motion.div 
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-zinc-400 flex items-center justify-center"
        >
          <span className="text-zinc-400 text-xl font-light">{isOpen ? '−' : '+'}</span>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-6 md:p-8 bg-zinc-900 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Services() {
  const websitesType = [
    "Landing page", "Промо-сайт", "Визитка", "Портал", "Интернет-магазин", "Маркетплейс",
    "Доска объявлений", "Сайт-портфолио", "Блог", "Форум", "Каталог", "Сайты услуг",
    "Продающие", "Корпоративные", "Личные", "Сложные", "Многостраничные", "Нестандартные",
    "Простые", "Информационные", "Адаптивные", "Мобильная версия", "Доработка сайта",
    "Дизайн сайта", "Дизайн для маркетплейсов", "Модульная сетка", "CDN",
  ];
  const webThemes = [
    "Авто", "Логистика", "Строительство", "Агентства недвижимости", "Ремонт", "Образование",
    "СМИ", "Медицина", "Туризм", "Юристы", "Рестораны и кафе", "Доставка еды",
    "Знакомства", "Свадьба",
  ];
  const promotion = [
    "SEO продвижение", "Услуги PR", "Государственный PR",
  ];
  const branding = [
    "Брендинг", "Логотипы", "Нейминг", "Брендбук", "Дизайн упаковки", "Айдентика", "Фирменный стиль",
    "Гайдбук", "Разработка слогана", "Логобук", "Ребрендинг", "Гайдлайн", "Монограмма",
    "Дизайн пакетов", "Разработка личного бренда", "Создание бренд-портфеля", "Создание бренда продукта",
    "Дизайн выставочных стендов", "Разработка дизайна меню", "Дизайн анимации, видео-рекламы",
    "Инфографика", "Копирайтинг",
  ];
  const polygraphy = [
    "Полиграфический дизайн", "Верстка полиграфии", "Годовые отчеты", "Брошюры", "Буклеты", 
    "Флаеры", "Плакаты и постеры", "Блокноты", "Визитки", "Баннеры", "Каталоги", 
    "Пластиковые карты", "Папки", "Листовки", "Roll Up", "Лифлеты", "Пресс-волл", 
    "Иллюстрации", "Конверты", "Бланки", "Открытки", "Иконки", "Фирменные персонажи", 
    "Календари", "Книги",
  ];
  const presentations = [
    "Презентации для логистических компаний",
    "Интерактивные презентации",
    "Презентация на английском языке",
    "Инвестиционная презентация",
    "Коммерческое предложение",
    "Презентации для торговых центров",
    "Презентации для выступления",
    "Презентации для тендеров",
    "Оформление презентаций",
  ];
  const integrations = [
    "Настройка amoCRM", "Автоматизация бизнеса",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="w-full relative">
        <div className="absolute top-12 left-0 pl-8 z-50 text-sm md:text-base text-zinc-500">
          <Link to="/" className="hover:underline hover:text-blue-500 transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-white font-semibold">Услуги</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 lg:py-24 max-w-7xl relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 lg:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Услуги
        </h1>

        <div className="space-y-6">
          <CollapsibleSection title="Презентации">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {presentations.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Сайты">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {websitesType.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
            <h3 className="text-lg font-semibold mt-8 mb-4">Тематика</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {webThemes.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Продвижение">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {promotion.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Брендинг">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {branding.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="Полиграфический дизайн">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {polygraphy.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection title="Интеграции">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {integrations.map((item, index) => (
                <button key={index} className="w-full text-left p-4 rounded-md transition-colors duration-200 
                  relative overflow-hidden group">
                  <span className="relative z-10 text-zinc-300">{item}</span>
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                </button>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </main>

      <Footer/>
    </div>
  );
}