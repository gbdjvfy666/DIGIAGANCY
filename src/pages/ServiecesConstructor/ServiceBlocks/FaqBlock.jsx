// src/components/ServiceBlocks/FaqBlock.jsx (Темная тема)

import React, { useState } from 'react';

// Иконка "плюс", превращающаяся в "крестик". Цвета адаптированы под темную тему.
const PlusMinusIcon = ({ isOpen }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={`w-7 h-7 transition-all duration-300 ease-in-out flex-shrink-0 ${
            isOpen ? 'rotate-45 text-purple-400' : 'rotate-0 text-zinc-500'
        }`}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const FaqBlock = ({ data }) => {
    const [openIndex, setOpenIndex] = useState(null); 

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
  
    if (!data || !data.items || data.items.length === 0) {
        return null;
    }
    
    // --- ИЗМЕНЕНИЕ: Фоновый паттерн для консистентности с другими блоками ---
    const bgStyles = {
        backgroundImage: `radial-gradient(circle at top, rgba(168, 85, 247, 0.1) 0%, transparent 40%)`,
    };

    return (
        <section className="relative bg-black text-white font-sans py-24 md:py-32 overflow-hidden" style={bgStyles}>
            <div className="container max-w-8xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16">

                    {/* Левая колонка: Заголовок и подзаголовок */}
                    <div className="lg:col-span-4 mb-12 lg:mb-0 text-center lg:text-left">
                        <div className="lg:sticky lg:top-24">
                            {/* --- ИЗМЕНЕНИЕ: Заголовок с градиентным текстом --- */}
                            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 leading-none tracking-tighter">
                                {data.title || 'Вопросы'}
                            </h2>
                            {data.subtitle && (
                                <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                                    {data.subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Правая колонка: Список вопросов */}
                    <div className="lg:col-span-8">
                        <div className="border-t border-zinc-800">
                            {data.items.map((item, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div key={index} className="border-b border-zinc-800">
                                        <div 
                                            className="flex justify-between items-start gap-6 cursor-pointer py-8"
                                            onClick={() => handleItemClick(index)}
                                            aria-expanded={isOpen}
                                        >
                                            <p className={`text-xl font-medium transition-colors duration-300 ${
                                                // --- ИЗМЕНЕНИЕ: Цвета текста для лучшего контраста ---
                                                isOpen ? 'text-white' : 'text-zinc-300'
                                            }`}>
                                                {item.q}
                                            </p>
                                            <PlusMinusIcon isOpen={isOpen} />
                                        </div>

                                        <div 
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                {/* --- ИЗМЕНЕНИЕ: Стили ответа адаптированы под темную тему --- */}
                                                <div className="pb-8 pr-12 prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:leading-relaxed">
                                                    <p>{item.a}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqBlock;