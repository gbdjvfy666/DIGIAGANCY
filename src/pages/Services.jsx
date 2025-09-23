// src/pages/Services.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Components/other/Footer';

// ===================================================================================
// --- КОМПОНЕНТЫ ДЛЯ СТРАНИЦЫ ---
// ===================================================================================

const ArrowIcon = () => (
    <svg className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const DirectServiceLink = ({ title, category }) => (
    <Link
        to={`/services/${category}/${slugify(title)}`}
        className="group flex justify-between items-center py-8 px-4 md:px-6 border-b border-neutral-800 hover:bg-white/5 transition-colors duration-200"
    >
        <h2 className="text-4xl md:text-5xl font-light text-white">{title}</h2>
        <ArrowIcon />
    </Link>
);


const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true); 

    return (
        <div className="border-b border-neutral-800">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center py-8 px-4 md:px-6 cursor-pointer group"
            >
                <h2 className={`text-4xl md:text-5xl font-light transition-colors ${isOpen ? 'text-blue-300' : 'text-white'}`}>
                    {title}
                </h2>
                <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <motion.div initial={false} animate={{ rotate: isOpen ? 0 : -135 }} transition={{ duration: 0.3 }}>
                        {isOpen ? (
                            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        )}
                    </motion.div>
                </div>
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
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-8 pt-0 bg-gradient-to-r from-[#1E192F]/50 via-black to-black">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ===================================================================================
// --- ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ ---
// ===================================================================================

export default function Services() {
    const presentations = ["Презентации для логистических компаний", "Интерактивные презентации", "Презентация на английском языке", "Инвестиционная презентация", "Коммерческое предложение", "Презентации для торговых центров", "Презентации для выступления", "Презентации для тендеров", "Оформление презентаций"];
    const websitesType = ["Landing page", "Промо-сайт", "Визитка", "Портал", "Интернет-магазин", "Маркетплейс", "Доска объявлений", "Сайт-портфолио", "Блог", "Форум", "Каталог", "Сайты услуг", "Продающие", "Корпоративные", "Личные", "Сложные", "Многостраничные", "Нестандартные", "Простые", "Информационные", "Адаптивные", "Мобильная версия", "Доработка сайта", "Дизайн сайта", "Дизайн для маркетплейсов", "Модульная сетка", "CDN"];
    const webThemes = ["Авто", "Логистика", "Строительство", "Агентства недвижимости", "Ремонт", "Образование", "СМИ", "Медицина", "Туризм", "Юристы", "Рестораны и кафе", "Доставка еды", "Знакомства", "Свадьба"];
    const promotion = ["SEO продвижение", "Услуги PR", "Государственный PR"];
    const branding = ["Брендинг", "Логотипы", "Нейминг", "Брендбук", "Дизайн упаковки", "Айдентика", "Фирменный стиль", "Гайдбук", "Разработка слогана", "Логобук", "Ребрендинг", "Гайдлайн", "Монограмма", "Дизайн пакетов", "Разработка личного бренда", "Создание бренд-портфеля", "Создание бренда продукта", "Дизайн выставочных стендов", "Разработка дизайна меню", "Дизайн анимации, видео-рекламы"];
    const polygraphy = ["Верстка полиграфии", "Годовые отчеты", "Брошюры", "Буклеты", "Флаеры", "Плакаты и постеры", "Блокноты", "Визитки", "Баннеры", "Каталоги", "Пластиковые карты", "Папки", "Листовки", "Roll Up", "Лифлеты", "Пресс-волл", "Иллюстрации", "Конверты", "Бланки", "Открытки", "Иконки", "Фирменные персонажи", "Календари", "Книги"];
    const integrations = ["Настройка amoCRM", "Автоматизация бизнеса"];

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">

            <main className="container mx-auto px-4 py-12 lg:py-24 max-w-8xl">
                <div className="mb-8 text-zinc-400">
                    <Link to="/" className="hover:text-white">Главная</Link> /
                    <span className="text-white"> Услуги</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 lg:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Услуги
                </h1>

                {/* --- ИЗМЕНЕНИЕ №2 --- (применяется ко всем ссылкам ниже) */}
                <div className="border-t border-neutral-800">
                    <CollapsibleSection title="Презентации">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                            {presentations.map((item, index) => (
                                <Link key={index} to={`/services/presentations/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Сайты">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                            {websitesType.map((item, index) => (
                                <Link key={index} to={`/services/websites/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                        <h3 className="text-xl font-semibold mt-8 mb-4 text-neutral-300">Тематика</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                            {webThemes.map((item, index) => (
                                <Link key={index} to={`/services/websites/themes/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Продвижение">
                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                            {promotion.map((item, index) => (
                                <Link key={index} to={`/services/promotion/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                    </CollapsibleSection>
                    
                    <CollapsibleSection title="Брендинг">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                            {branding.map((item, index) => (
                                <Link key={index} to={`/services/branding/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                    </CollapsibleSection>
                    
                    <CollapsibleSection title="Полиграфический дизайн">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                             {polygraphy.map((item, index) => (
                                <Link key={index} to={`/services/polygraphy/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Прямые ссылки также исправлены (см. компонент DirectServiceLink выше) */}
                    <DirectServiceLink title="Инфографика" category="branding" />
                    <DirectServiceLink title="Копирайтинг" category="branding" />

                    <CollapsibleSection title="Интеграции">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                            {integrations.map((item, index) => (
                                <Link key={index} to={`/services/integrations/${slugify(item)}`} className="text-neutral-400 hover:text-white transition-colors duration-200 py-2 text-base md:text-lg">{item}</Link>
                            ))}
                        </div>
                    </CollapsibleSection>
                    
                    <DirectServiceLink title="Маркетинг-кит" category="presentations" />
                    <DirectServiceLink title="Видеоролик" category="branding" />
                </div>
            </main>
            <Footer/>
        </div>
    );
}


const slugify = (text) => {
    const rusToLat = { 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-', ',': '' };
    return text.toLowerCase().split('').map(char => rusToLat[char] || char).join('').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};