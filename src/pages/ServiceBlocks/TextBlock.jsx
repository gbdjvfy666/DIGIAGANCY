import React from 'react';
import '../../index.css';
// Этот компонент отрисовывает широкий текстовый блок с выравниванием по левому краю.
export default function EnhancedTextBlock({ data }) {
    return (
        // Увеличили максимальную ширину до max-w-6xl
        <section className="mb-20 md:mb-28 max-w-7xl-custom mx-auto px-4">
            
            {/* Главный заголовок секции */}
            {data.title && (
                // Убрали text-center, увеличили шрифт и изменили отступы
                <h2 className="text-5xl md:text-6xl font-bold mb-5 text-white">
                    {data.title}
                </h2>
            )}

            {/* Вступительный параграф */}
            {data.intro && (
                // Убрали text-center, увеличили шрифт и отступ
                <p className="text-2xl text-zinc-400 leading-relaxed mb-20">
                    {data.intro}
                </p>
            )}

            {/* Подзаголовок */}
            {data.subtitle && (
                // Убрали text-center, увеличили шрифт и изменили отступы
                <h3 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                    {data.subtitle}
                </h3>
            )}
            
            {/* Блок с основным контентом */}
            <div className="space-y-6 text-xl text-zinc-300">
                {data.content.map((item, index) => {
                    switch (item.type) {
                        case 'paragraph':
                            return <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />;
                        case 'list':
                            return (
                                // Увеличили отступ сверху для этого блока
                                <div key={index} className="pt-4">
                                    {/* Убрали <ul> и маркеры, используем параграфы для каждого элемента */}
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

            {/* Блок с призывом к действию (CTA) */}
            {data.cta && (
                 // Убрали text-center, чтобы текст был слева
                 <div className="mt-20">
                    <p className="text-2xl text-zinc-300 mb-4">{data.cta.text}</p>
                    <p className="text-3xl md:text-4xl font-bold text-white mb-8">
                        <a href={`tel:${data.cta.phone.replace(/\s/g, '')}`} className="hover:text-blue-400 transition-colors">
                            {data.cta.phone}
                        </a>
                    </p>
                    <a 
                        href={data.cta.buttonLink}
                        // Кнопка осталась такой же, но она больше не центрируется родительским блоком
                        className="inline-block bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        {data.cta.buttonText}
                    </a>
                </div>
            )}
        </section>
    );
}