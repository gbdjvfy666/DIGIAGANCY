import React from 'react';
// import { Link } from 'react-router-dom';

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

// ===================================================================================
// --- НАЧАЛО ИЗМЕНЕНИЙ ---
// Список всех типов сайтов. Теперь он ПОЛНЫЙ.
const websiteItems = [
    { name: "Landing page", slug: "landing-page" },
    { name: "Промо-сайт", slug: "promo-sayt" },
    { name: "Визитка", slug: "vizitka" },
    { name: "Портал", slug: "portal" },
    { name: "Интернет-магазин", slug: "internet-magazin" },
    { name: "Маркетплейс", slug: "marketpleys" },
    { name: "Доска объявлений", slug: "doska-obyavleniy" },
    { name: "Сайт-портфолио", slug: "sayt-portfolio" },
    { name: "Блог", slug: "blog" },
    { name: "Форум", slug: "forum" },
    { name: "Каталог", slug: "katalog" },
    { name: "Сайты услуг", slug: "sayty-uslug" },
    { name: "Продающие", slug: "prodayushchie" },
    { name: "Корпоративные", slug: "korporativnye" },
    { name: "Личные", slug: "lichnye" },
    { name: "Сложные", slug: "slozhnye" },
    { name: "Многостраничные", slug: "mnogostranichnye" },
    { name: "Нестандартные", slug: "nestandartnye" },
    { name: "Простые", slug: "prostye" },
    { name: "Информационные", slug: "informatsionnye" },
    { name: "Адаптивные", slug: "adaptivnye" },
    { name: "Мобильная версия", slug: "mobilnaya-versiya" },
    { name: "Доработка сайта", slug: "dorabotka-sayta" },
    { name: "Дизайн сайта", slug: "dizayn-sayta" },
    { name: "Дизайн для маркетплейсов", slug: "dizayn-dlya-marketpleysov" },
    { name: "Модульная сетка", slug: "modulnaya-setka" },
    { name: "CDN", slug: "cdn" }
];
// --- КОНЕЦ ИЗМЕНЕНИЙ ---
// ===================================================================================


// Компонент принимает ТОЛЬКО currentSlug
export default function WebsiteTypesGrid({ currentSlug }) {
    return (
        <section className="mb-20 md:mb-28 max-w-7xl mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-white">
                Разработаем любой тип сайта
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {websiteItems.map((item, index) => {
                    const isActive = item.slug === currentSlug;
                    const link = `/services/websites/${item.slug}`;

                    const itemClasses = `
                        group relative flex justify-between items-center w-full p-6 
                        rounded-xl transition-all duration-300 overflow-hidden
                        ${isActive
                            ? 'bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 text-white'
                            : 'bg-neutral-100/5 hover:bg-neutral-100/10 text-neutral-300 hover:text-white'
                        }
                    `;

                    const activeGlow = isActive ? (
                        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-2xl opacity-50"></div>
                    ) : null;

                    return (
                        <a key={index} href={link} className={itemClasses}>
                            {activeGlow}
                            <span className="relative z-10 text-lg">{item.name}</span>
                            <div className="relative z-10"><ArrowIcon /></div>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}