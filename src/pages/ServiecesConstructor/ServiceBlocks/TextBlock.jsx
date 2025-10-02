// src/pages/ServiceBlocks/EnhancedTextBlock.jsx (Новый дизайн)

import React from 'react';

// --- КОМПОНЕНТЫ ИКОНОК (переработанный дизайн) ---

// Иконка для пунктов списка в основном контенте
const CheckmarkIcon = () => (
    <svg className="flex-shrink-0 w-6 h-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Иконка для ключевых преимуществ в сайдбаре (с собственным фоном)
const FeatureIcon = ({ path }) => (
    <div className="flex-shrink-0 w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-xl mr-5">
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
    </div>
);

// Иконка-стрелка для кнопки CTA
const ArrowIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
);


// Иконки для автоматического назначения (без изменений)
const iconPaths = [
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.695v-2.695A8.25 8.25 0 005.68 9.348v2.695z",
    "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
];


export default function EnhancedTextBlock({ data }) {
    
    if (!data) return null;

    // --- ЛОГИКА АДАПТАЦИИ ДАННЫХ (остается без изменений) ---
    let keyFeatures = data.keyFeatures || [];
    let mainContent = [...(data.content || [])];

    if (keyFeatures.length === 0) {
        const listIndex = mainContent.findIndex(item => item.type === 'list');
        if (listIndex !== -1) {
            const listItems = mainContent[listIndex].items;
            const featuresCount = Math.min(listItems.length, 3);
            
            for (let i = 0; i < featuresCount; i++) {
                const itemHtml = listItems[i];
                const titleMatch = itemHtml.match(/<b>(.*?)<\/b>/);
                const title = titleMatch ? titleMatch[1].replace(/\./g, '') : `Преимущество ${i+1}`;
                const description = itemHtml.replace(/<b>.*?<\/b>\s*/, '');

                keyFeatures.push({
                    icon: iconPaths[i % iconPaths.length],
                    title,
                    description,
                });
            }
            mainContent[listIndex].items = listItems.slice(featuresCount);
        }
    }
    
    // --- ИЗМЕНЕНИЕ: Добавлен фоновый паттерн-сетка для более "технического" вида ---
    const bgStyles = {
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            radial-gradient(circle at top right, rgba(168, 85, 247, 0.15) 0%, transparent 40%), 
            radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
        `,
        backgroundSize: '30px 30px, 30px 30px, 100% 100%, 100% 100%',
    };

    return (
        <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden" style={bgStyles}>
            <div className="container max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
                {data.title && (
                    <div className="mb-16 text-center lg:text-left">
                        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 leading-none tracking-tighter mb-6">
                            {data.title}
                        </h2>
                        {data.intro && (
                            <p className="text-xl md:text-2xl text-zinc-400 max-w-5xl mx-auto lg:mx-0">
                                {data.intro}
                            </p>
                        )}
                    </div>
                )}
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-16"></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
                    
                    {/* --- ИЗМЕНЕНИЕ: Добавлена левая граница для структурирования контента --- */}
                    <div className="lg:col-span-2 border-l border-zinc-800/50 pl-12 prose prose-lg prose-invert max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-h3:text-4xl prose-h3:font-bold prose-h3:text-white prose-h3:mb-4 prose-h3:mt-12 first:prose-h3:mt-0 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline">
                        {mainContent.map((item, index) => {
                            switch (item.type) {
                                case 'heading':
                                    return <h3 key={index}>{item.text}</h3>;
                                case 'paragraph':
                                    return <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} />;
                                case 'list':
                                    if(item.items.length === 0) return null;
                                    return (
                                        <ul key={index} className="space-y-5 list-none p-0 my-8">
                                            {item.items.map((listItem, i) => (
                                                <li key={i} className="flex items-start">
                                                    <CheckmarkIcon />
                                                    <span className="ml-4 text-zinc-300" dangerouslySetInnerHTML={{ __html: listItem }} />
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                    
                    <aside className="lg:col-span-1 space-y-12">
                        {/* --- ИЗМЕНЕНИЕ: Карточка преимуществ полностью переработана --- */}
                        {keyFeatures.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-6">
                                    Ключевые преимущества
                                </h3>
                                <div className="space-y-6">
                                    {keyFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <FeatureIcon path={feature.icon} />
                                            <div>
                                                <h4 className="font-semibold text-white text-lg leading-tight">{feature.title}</h4>
                                                <p className="text-zinc-400 text-base mt-1">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- ИЗМЕНЕНИЕ: Карточка CTA переработана --- */}
                        {data.cta && (
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-center sticky top-24">
                                <p className="text-xl font-medium text-white/90 mb-4">{data.cta.text}</p>
                                <p className="text-4xl font-bold text-white mb-6 tracking-tight">
                                    <a href={`tel:${data.cta.phone.replace(/\s/g, '')}`} className="hover:opacity-90 transition-opacity">
                                        {data.cta.phone}
                                    </a>
                                </p>
                                <a 
                                    href={data.cta.buttonLink}
                                    className="group inline-flex items-center justify-center gap-x-2 w-full bg-white text-black font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                                >
                                    <span>{data.cta.buttonText}</span>
                                    <ArrowIcon />
                                </a>
                            </div>
                        )}
                    </aside>

                </div>
            </div>
        </section>
    );
}