// src/pages/Services.jsx (Финальная версия без хлебных крошек)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ===================================================================================
// --- ИКОНКИ ДЛЯ УПРАВЛЕНИЯ ---
// ===================================================================================
const ChevronDownIcon = ({ isOpen }) => (<motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" initial={false} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></motion.svg>);
const ArrowRightIcon = () => (<motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></motion.svg>);

// ===================================================================================
// --- СТРУКТУРА ДАННЫХ ---
// ===================================================================================

const slugify = (text) => {
    const rusToLat = { 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-', ',': '' };
    return text.toLowerCase().split('').map(char => rusToLat[char] || char).join('').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};

const servicesData = [
    { type: 'collapsible', title: "Презентации", categorySlug: "presentations", services: ["Презентации для логистических компаний", "Интерактивные презентации", "Презентация на английском языке", "Инвестиционная презентация", "Коммерческое предложение", "Презентации для торговых центров", "Презентации для выступления", "Презентации для тендеров", "Оформление презентаций"] },
    { type: 'collapsible', title: "Сайты", categorySlug: "websites", sections: [
        { title: "Типы сайтов", slug: "types", services: ["Landing page", "Промо-сайт", "Визитка", "Портал", "Интернет-магазин", "Маркетплейс", "Доска объявлений", "Сайт-портфолио", "Блог", "Форум", "Каталог", "Сайты услуг", "Продающие", "Корпоративные", "Личные", "Сложные", "Многостраничные", "Нестандартные", "Простые", "Информационные", "Адаптивные", "Мобильная версия", "Доработка сайта", "Дизайн сайта", "Дизайн для маркетплейсов", "Модульная сетка", "CDN"] },
        { title: "Тематика", slug: "themes", services: ["Авто", "Логистика", "Строительство", "Агентства недвижимости", "Ремонт", "Образование", "СМИ", "Медицина", "Туризм", "Юристы", "Рестораны и кафе", "Доставка еды", "Знакомства", "Свадьба"] }
    ]},
    { type: 'collapsible', title: "Продвижение", categorySlug: "promotion", services: ["SEO продвижение", "Услуги PR", "Государственный PR"] },
    { type: 'collapsible', title: "Брендинг", categorySlug: "branding", services: ["Брендинг", "Логотипы", "Нейминг", "Брендбук", "Дизайн упаковки", "Айдентика", "Фирменный стиль", "Гайдбук", "Разработка слогана", "Логобук", "Ребрендинг", "Гайдлайн", "Монограмма", "Дизайн пакетов", "Разработка личного бренда", "Создание бренд-портфеля", "Создание бренда продукта", "Дизайн выставочных стендов", "Разработка дизайна меню", "Дизайн анимации, видео-рекламы"] },
    { type: 'collapsible', title: "Полиграфический дизайн", categorySlug: "polygraphy", services: ["Верстка полиграфии", "Годовые отчеты", "Брошюры", "Буклеты", "Флаеры", "Плакаты и постеры", "Блокноты", "Визитки", "Баннеры", "Каталоги", "Пластиковые карты", "Папки", "Листовки", "Roll Up", "Лифлеты", "Пресс-волл", "Иллюстрации", "Конверты", "Бланки", "Открытки", "Иконки", "Фирменные персонажи", "Календари", "Книги"] },
    { type: 'direct', title: "Инфографика", categorySlug: "branding" },
    { type: 'direct', title: "Копирайтинг", categorySlug: "branding" },
    { type: 'collapsible', title: "Интеграции", categorySlug: "integrations", services: ["Настройка amoCRM", "Автоматизация бизнеса"] },
    { type: 'direct', title: "Маркетинг-кит", categorySlug: "presentations" },
    { type: 'direct', title: "Видеоролик", categorySlug: "branding" },
];

// ===================================================================================
// --- КОМПОНЕНТЫ-БЛОКИ ---
// ===================================================================================

const CollapsibleSection = ({ category }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl transition-all duration-300 hover:border-purple-500/50">
            <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center p-8 cursor-pointer group">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                    {category.title}
                </h2>
                <div className="text-zinc-400 group-hover:text-white transition-colors"><ChevronDownIcon isOpen={isOpen} /></div>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div key="content" initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }} transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} className="overflow-hidden border-t border-zinc-800">
                        {category.services && (
                            <div className="p-8"><div className="flex flex-wrap gap-3">
                                {category.services.map((item, index) => (<Link key={index} to={`/services/${category.categorySlug}/${slugify(item)}`} className="block bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors duration-200 py-2 px-4 rounded-full text-base">{item}</Link>))}
                            </div></div>
                        )}
                        {category.sections && category.sections.map((section, secIndex) => (
                            <div key={secIndex} className="p-8 border-t border-zinc-800/50 first:border-t-0">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">{section.title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {section.services.map((item, index) => (<Link key={index} to={`/services/${category.categorySlug}/${section.slug}/${slugify(item)}`} className="block bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors duration-200 py-2 px-4 rounded-full text-base">{item}</Link>))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const DirectServiceCard = ({ category }) => {
    const link = `/services/${category.categorySlug}/${slugify(category.title)}`;
    return (
        <Link to={link} className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-900">
            <div className="flex justify-between items-center p-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                    {category.title}
                </h2>
                <div className="text-zinc-400 group-hover:text-white transition-colors"><ArrowRightIcon /></div>
            </div>
        </Link>
    );
};

// ===================================================================================
// --- ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ ---
// ===================================================================================

export default function Services() {
    const bgStyles = {
        backgroundImage: `radial-gradient(circle at 10% 10%, rgba(168, 85, 247, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
    };

    return (
        <div className="min-h-screen bg-black text-white" style={bgStyles}>
            <main className="container mx-auto px-4 py-12 lg:py-24 max-w-8xl">
                <div className="text-center mb-16 lg:mb-24">
                    {/* --- ИЗМЕНЕНИЕ: Блок с хлебными крошками удален --- */}
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 leading-tight tracking-tighter">
                        Наши Услуги
                    </h1>
                    <p className="mt-6 text-xl text-zinc-400 max-w-3xl mx-auto">
                        Откройте для себя полный спектр наших возможностей для роста вашего бизнеса — от создания бренда до продвижения в цифровом мире.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    {servicesData.map((category, index) => {
                        if (category.type === 'collapsible') {
                            return <CollapsibleSection key={index} category={category} />;
                        }
                        if (category.type === 'direct') {
                            return <DirectServiceCard key={index} category={category} />;
                        }
                        return null;
                    })}
                </div>
            </main>
        </div>
    );
}