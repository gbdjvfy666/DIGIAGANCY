// src/pages/ServiceBlocks/EnhancedTextBlock.jsx

import React from 'react';
// import '../../index.css'; // Если index.css импортируется глобально в главном файле приложения, эту строку можно удалить

// Этот компонент отрисовывает широкий текстовый блок с выравниванием по левому краю.
export default function EnhancedTextBlock({ data }) {
    
    // Защита от отсутствия данных
    if (!data || !data.content) {
        return null;
    }

    return (
        <section className="py-16 md:py-20">
            <div className="container max-w-8xl mx-auto px-4">
            
                {/* Главный заголовок секции */}
                {data.title && (
                    <h2 className="text-5xl md:text-6xl font-bold mb-5 text-white">
                        {data.title}
                    </h2>
                )}

                {/* Вступительный параграф */}
                {data.intro && (
                    <p className="text-2xl text-zinc-400 leading-relaxed mb-12 md:mb-20">
                        {data.intro}
                    </p>
                )}

                {/* Подзаголовок */}
                {data.subtitle && (
                    <h3 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                        {data.subtitle}
                    </h3>
                )}
                
                <div className="space-y-6 text-xl text-zinc-300">
                    {data.content.map((item, index) => {
                        switch (item.type) {
                            case 'paragraph':
                                return <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />;
                            case 'list':
                                return (
                                    <div key={index} className="pt-4">
                                        {item.items.map((listItem, i) => (
                                            <p key={i} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: listItem }} />
                                        ))}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>

                {data.cta && (
                    <div className="mt-16 md:mt-20">
                        <p className="text-2xl text-zinc-300 mb-4">{data.cta.text}</p>
                        <p className="text-3xl md:text-4xl font-bold text-white mb-8">
                            <a href={`tel:${data.cta.phone.replace(/\s/g, '')}`} className="hover:text-purple-400 transition-colors">
                                {data.cta.phone}
                            </a>
                        </p>
                        <a 
                            href={data.cta.buttonLink}
                            className="inline-block bg-purple-600 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105"
                        >
                            {data.cta.buttonText}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}