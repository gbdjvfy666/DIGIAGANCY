// src/pages/ServiceBlocks/EnhancedTextBlock.jsx (Адаптированная версия)

import React from 'react';

const FeatureIcon = ({ path }) => (
    <div className="flex-shrink-0 w-8 h-8 mr-4">
        <svg className="w-full h-full text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
    </div>
);

// Иконки для автоматического назначения
const iconPaths = [
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", // Молния
    "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75", // Настройки
    "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Галочка
    "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" // Замок
];


export default function EnhancedTextBlock({ data }) {
    
    if (!data) return null;

    // --- ЛОГИКА АДАПТАЦИИ ДАННЫХ ---
    let keyFeatures = data.keyFeatures || [];
    let mainContent = [...(data.content || [])];

    // Если keyFeatures не заданы, автоматически создаем их из первого списка в content
    if (keyFeatures.length === 0) {
        const listIndex = mainContent.findIndex(item => item.type === 'list');
        if (listIndex !== -1) {
            const listItems = mainContent[listIndex].items;
            // Берем первые 3-4 пункта для правой колонки
            const featuresCount = Math.min(listItems.length, 3);
            
            for (let i = 0; i < featuresCount; i++) {
                // Разделяем '<b>Заголовок.</b> Описание' на две части
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
            // Удаляем эти пункты из основного списка, чтобы не дублировать
            mainContent[listIndex].items = listItems.slice(featuresCount);
        }
    }

    return (
        <section className="py-24 md:py-32 bg-black text-white">
            <div className="container max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
            
                {data.title && (
                    <div className="mb-16 text-center lg:text-left">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                            {data.title}
                        </h2>
                        {data.intro && (
                            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto lg:mx-0">
                                {data.intro}
                            </p>
                        )}
                    </div>
                )}
                
                <div className="w-full h-px bg-zinc-800 mb-16"></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

                    <div className="lg:col-span-2 space-y-6 text-lg text-zinc-300">
                        {mainContent.map((item, index) => {
                            switch (item.type) {
                                case 'paragraph':
                                    return <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />;
                                case 'list':
                                    // Рендерим только оставшиеся элементы списка
                                    if(item.items.length === 0) return null;
                                    return (
                                        <ul key={index} className="space-y-4 list-disc list-inside pl-2 pt-4">
                                            {item.items.map((listItem, i) => (
                                                <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: listItem }} />
                                            ))}
                                        </ul>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        {keyFeatures.length > 0 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-12">
                                <h3 className="font-garet uppercase tracking-widest text-zinc-400 text-sm mb-6">
                                    Ключевые особенности
                                </h3>
                                <div className="space-y-6">
                                    {keyFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-start">
                                            <FeatureIcon path={feature.icon} />
                                            <div>
                                                <h4 className="font-semibold text-white text-lg">{feature.title}</h4>
                                                <p className="text-zinc-400 text-base">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.cta && (
                            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-center">
                                <p className="text-xl text-white mb-4">{data.cta.text}</p>
                                <p className="text-4xl font-bold text-white mb-6">
                                    <a href={`tel:${data.cta.phone.replace(/\s/g, '')}`} className="hover:opacity-80 transition-opacity">
                                        {data.cta.phone}
                                    </a>
                                </p>
                                <a 
                                    href={data.cta.buttonLink}
                                    className="inline-block bg-white text-black font-bold text-lg px-10 py-4 rounded-full transition-transform transform hover:scale-105"
                                >
                                    {data.cta.buttonText}
                                </a>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}