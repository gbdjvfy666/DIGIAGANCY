// Файл: src/pages/Blog/BlogBlocks/BlogContentBlock.jsx

import React from 'react';
// import CtaCard from './CtaCard';
// import QuoteCard from './QuoteCard';

// ===================================================================================
// КОМПОНЕНТЫ ДЛЯ ДИЗАЙНА (без изменений)
// ===================================================================================

// Компонент градиентной звезды
const GradientStarIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="url(#star-gradient)" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" /> {/* purple-400 */}
                <stop offset="100%" stopColor="#22d3ee" /> {/* cyan-400 */}
            </linearGradient>
        </defs>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
    </svg>
);

// Компонент Содержания
const TableOfContentsList = ({ items, level = 0 }) => {
    return (
        <ol className="list-none pl-0 space-y-4">
            {items.map((item, index) => (
                <li key={index}>
                    <a href={item.link} className="flex items-start gap-x-4 text-zinc-400 hover:text-white transition-colors group">
                        <div className="flex-shrink-0 mt-1">
                            {level === 0 ? (
                                <GradientStarIcon className="w-5 h-5" />
                            ) : (
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>
                                </div>
                            )}
                        </div>
                        <span className={`flex-grow ${level === 0 ? 'text-lg font-medium text-zinc-200 group-hover:text-white' : 'text-base'}`}>
                            {item.title}
                        </span>
                    </a>
                    {item.children && item.children.length > 0 && (
                        <div className="pl-9 mt-3">
                            <TableOfContentsList items={item.children} level={level + 1} />
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
};

// ===================================================================================
// ОСНОВНОЙ КОМПОНЕНТ БЛОКА (упрощенный, без логики скролла)
// ===================================================================================
export default function BlogContentBlock({ data }) {
    if (!data || !data.htmlContent) return null;

    return (
        <>
            <style jsx global>{`
                .custom-prose-styles {
                    counter-reset: h2-counter;
                }
                .custom-prose-styles h2 {
                    position: relative;
                    padding-left: 5.5rem; /* 88px */
                    margin-top: 4rem; /* 64px */
                    margin-bottom: 2rem; /* 32px */
                    padding-bottom: 1rem; /* 16px */
                    border-bottom: 1px solid #27272a; /* zinc-800 */
                }
                .custom-prose-styles h2::before {
                    counter-increment: h2-counter;
                    content: "0" counter(h2-counter);
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 4.5rem; /* 72px */
                    font-weight: 900;
                    line-height: 1;
                    color: rgba(255, 255, 255, 0.05);
                }
                 .custom-prose-styles h3 {
                    font-size: 1.875rem; /* 30px */
                    margin-top: 3rem;
                 }
                .custom-prose-styles a {
                    color: #c084fc; /* purple-400 */
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .custom-prose-styles a:hover {
                    color: #ffffff;
                    text-decoration: underline;
                }
                .custom-prose-styles img {
                    border-radius: 0; /* rounded-none */
                    border: 1px solid #27272a; /* zinc-800 */
                }
            `}</style>

            <section className="bg-black py-16 sm:py-24">
                <div className="container max-w-8xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                        
                        {/* Левая колонка: Содержание (теперь статичное) */}
                        <aside className="lg:col-span-4 mb-16 lg:mb-0">
                            <div className="w-full lg:max-w-sm p-4">
                                <h3 className="text-3xl font-bold mb-8 text-white">
                                    Содержание статьи
                                </h3>
                                <nav>
                                    <TableOfContentsList items={data.tableOfContents || []} />
                                </nav>
                            </div>
                        </aside>
                        
                        {/* Разделитель */}
                        <div className="hidden lg:block lg:col-span-1">
                             <div className="h-full w-px bg-gradient-to-b from-zinc-800 via-purple-500/30 to-zinc-800 mx-auto"></div>
                        </div>

                        {/* Правая колонка: Контент статьи */}
                        <article className="lg:col-span-7">
                            <div
                                className="prose prose-xl prose-invert max-w-none custom-prose-styles"
                                dangerouslySetInnerHTML={{ __html: data.htmlContent }}
                            />
                            {/* 
                            <div className="mt-16 space-y-8">
                                <CtaCard />
                                <QuoteCard />
                            </div> 
                            */}
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}