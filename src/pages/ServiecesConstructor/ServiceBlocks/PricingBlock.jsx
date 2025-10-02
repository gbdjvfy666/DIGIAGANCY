// src/components/ServiceBlocks/PricingBlock.jsx (Новый дизайн)

import React from 'react';

// --- Вспомогательные компоненты ---

// Иконка-галочка, адаптированная под новый дизайн
const CheckmarkIcon = () => (
    <svg className="flex-shrink-0 w-6 h-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// SVG-граница для кнопки (аналогично блоку с формой)
const ButtonBorder = () => (
  <svg className="absolute top-1/2 left-1/2 w-[110%] h-auto -translate-x-1/2 -translate-y-1/2" viewBox="0 0 282 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pricing-btn-gradient" x1="0" y1="0" x2="282" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a855f7" /> {/* purple-500 */}
        <stop offset="1" stopColor="#22d3ee" /> {/* cyan-400 */}
      </linearGradient>
    </defs>
    <path d="M78.5 15C18.1 27.6 -19.4 40.1 13.5 63.7C46.4 87.3 309.3 71.9 277.8 26.6C252.5 -9.7 98.4 1.2 24.5 11.1" stroke="url(#pricing-btn-gradient)" strokeWidth="2" />
  </svg>
);


const PricingBlock = ({ data }) => {
  if (!data) return null;

  const { title, price, features, button, sectionTitle, sectionSubtitle } = data;

  const bgStyles = {
    backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)
    `,
    backgroundSize: '30px 30px, 30px 30px, 100% 100%',
  };

  return (
    <section className="font-sans bg-black text-white py-24 md:py-32" style={bgStyles}>
      <div className="container max-w-8xl mx-auto px-4">
        
        {/* --- ИЗМЕНЕНИЕ: Добавлен общий заголовок секции --- */}
        <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 leading-none tracking-tighter">
                {sectionTitle || 'Стоимость'}
            </h2>
            {sectionSubtitle && (
                <p className="mt-6 text-xl text-zinc-400">
                    {sectionSubtitle}
                </p>
            )}
        </div>

        {/* --- ОСНОВНАЯ КАРТОЧКА ТАРИФА (полностью переработана) --- */}
        <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm rounded-2xl max-w-6xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* --- Левая часть: Цена и Описание --- */}
            <div className="p-8 md:p-12 flex flex-col justify-center text-center lg:text-left">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                {title}
              </h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-6">
                <span className="text-xl text-zinc-400">{price.prefix || 'от'}</span>
                <span className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent leading-none tracking-tight">{price.value}</span>
                <span className="text-xl text-zinc-400">{price.suffix || '₽'}</span>
              </div>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto lg:mx-0">
                Полный комплекс работ для запуска вашего проекта под ключ.
              </p>
              {button && (
                <div className="mt-4">
                    <a href={button.link || '#form'} className="relative inline-flex items-center justify-center px-12 py-4 text-lg font-medium tracking-wider transition-transform duration-300 hover:scale-105 group">
                        <ButtonBorder />
                        <span className="relative">{button.text || 'Заказать разработку'}</span>
                    </a>
                </div>
              )}
            </div>

            {/* --- Правая часть: Что включено --- */}
            <div className="bg-black/20 lg:border-l border-zinc-800 p-8 md:p-12">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-6">
                {features.title || 'Что включено в стоимость'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {features.list.map((feature, index) => (
                  <li key={index} className="flex items-start text-zinc-300 gap-3">
                    <CheckmarkIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingBlock;