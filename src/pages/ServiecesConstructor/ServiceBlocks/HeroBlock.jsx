// src/pages/ServiceBlocks/HeroBlock.jsx (Исправленная версия с отступами)

import React from 'react';
import { Link } from 'react-router-dom';

// --- Вспомогательные компоненты ---

// Иконка для ключевых метрик
const FeatureIcon = ({ path }) => (
    <svg className="w-6 h-6 mb-2 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

// Компонент "Хлебные крошки"
const Breadcrumbs = ({ items }) => (
    <nav aria-label="Breadcrumb">
        <ol className="flex items-center text-sm text-zinc-500">
            {items.map((item, index) => (
                <li key={index} className="flex items-center">
                    {index < items.length - 1 ? (
                        <Link to={item.link} className="hover:text-zinc-300 transition-colors">{item.name}</Link>
                    ) : (
                        <span className="text-zinc-300 font-medium" aria-current="page">{item.name}</span>
                    )}
                    {index < items.length - 1 && (
                        <span className="mx-3 text-zinc-700" aria-hidden="true">/</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);


// --- Основной компонент ---

export default function HeroBlock({ data }) {
    if (!data) return null;

    const { title, description, price, timeline, result, buttonText } = data;
    
    const breadcrumbs = [
        { name: 'Главная', link: '/' },
        { name: 'Услуги', link: '/services' } 
    ];
    breadcrumbs.push({ name: title, link: '#' });

    const bgStyles = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px), radial-gradient(circle at top left, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%)`,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
    };

    // --- ИЗМЕНЕНИЕ 1: Увеличены верхние отступы (pt) ---
    // pt-32 -> pt-48 (для мобильных)
    // sm:pt-40 -> sm:pt-64 (для больших экранов)
    return (
        <section className="relative bg-black text-white pt-48 pb-24 sm:pt-64 sm:pb-28 border-b border-zinc-800 overflow-hidden" style={bgStyles}>
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* --- ИЗМЕНЕНИЕ 2: Смещена позиция бара с крошками (top) --- */}
            {/* top-0 -> top-24 (96px отступ сверху) */}
            <div className="absolute top-15 left-0 w-full z-20 bg-black/20 backdrop-blur-sm border-b border-zinc-800/50">
                <div className="max-w-8xl mx-auto px-6 lg:px-8 h-16 flex items-center">
                    {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
                </div>
            </div>
            
            {/* Основной контент */}
            <div className="relative z-10 w-full max-w-8xl mx-auto px-6 lg:px-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Левая колонка: Заголовок и описание */}
                    <div className="lg:col-span-8">
                        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 leading-tight tracking-tighter mb-8">
                            {title}
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-4xl leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Правая колонка: Карточка с данными */}
                    <div className="lg:col-span-4">
                        <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-none">
                            {/* Блок с ключевыми метриками */}
                            <div className="grid grid-cols-3 text-center">
                                {price && (
                                    <div className="p-4 border-r border-zinc-800 flex flex-col items-center justify-center">
                                        <FeatureIcon path="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9A2.25 2.25 0 0018.75 6.75h-1.5a2.25 2.25 0 00-2.25 2.25v3.51" />
                                        <p className="font-bold text-xl text-white mt-1">{price}</p>
                                        <p className="text-xs text-zinc-500">Стоимость</p>
                                    </div>
                                )}
                                {timeline && (
                                    <div className="p-4 border-r border-zinc-800 flex flex-col items-center justify-center">
                                        <FeatureIcon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
                                        <p className="font-bold text-xl text-white mt-1">{timeline}</p>
                                        <p className="text-xs text-zinc-500">Сроки</p>
                                    </div>
                                )}
                                {result && (
                                    <div className="p-4 flex flex-col items-center justify-center">
                                        <FeatureIcon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <p className="font-bold text-xl text-white mt-1">{result}</p>
                                        <p className="text-xs text-zinc-500">Результат</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Кнопка */}
                            {buttonText && (
                                <div className="p-3 border-t border-zinc-800">
                                    <a href="#form" className="block w-full text-center bg-zinc-800 border border-zinc-700 text-white px-6 py-3 rounded-none font-semibold hover:bg-white hover:text-black transition-colors duration-300">
                                        {buttonText}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}