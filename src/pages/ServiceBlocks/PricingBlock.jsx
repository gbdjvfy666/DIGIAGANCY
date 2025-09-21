// src/components/ServiceBlocks/PricingBlock.jsx

import React from 'react';

// Иконка-галочка для списка преимуществ
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PricingBlock = ({ data }) => {
  if (!data) {
    return null;
  }

  const { title, price, features, button } = data;

  return (
    // Внешняя секция остается с чисто белым фоном
    <section className="font-sans bg-white text-black py-16 md:py-24">
      
      {/* Внутренний контейнер, который центрирует контент */}
      <div className="container max-w-8xl mx-auto px-4">

        {/* --- ОСНОВНАЯ КАРТОЧКА ТАРИФА --- */}
        {/*
          ИЗМЕНЕНИЕ: Добавлен "очень мягкий" фон (bg-gray-50).
          Карточка теперь визуально отделена от фона страницы.
          Тонкая граница border-gray-200 добавляет четкости.
        */}
        <div className="bg-neutral-50 border border-gray-200 rounded-2xl max-w-6xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* --- Левая часть: Цена и Описание --- */}
            {/* Эта часть наследует мягкий фон bg-gray-50 от родительской карточки */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 mb-4">
                {title}
              </h2>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-xl text-zinc-500">{price.prefix || 'от'}</span>
                <span className="text-5xl sm:text-6xl font-extrabold text-zinc-900 leading-none">{price.value}</span>
                <span className="text-xl text-zinc-500">{price.suffix || '₽'}</span>
              </div>
              <p className="text-zinc-600 mb-8">
                Полный комплекс работ для запуска вашего проекта под ключ.
              </p>
              {button && (
                <a href={button.link || '#form'} className="w-full text-center px-8 py-4 bg-purple-600 rounded-lg text-lg font-bold text-white hover:bg-purple-700 transition-colors">
                  {button.text || 'Заказать разработку'}
                </a>
              )}
            </div>

            <div className="bg-neutral-100 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-zinc-800">{features.title}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {features.list.map((feature, index) => (
                  <li key={index} className="flex items-start text-zinc-700 gap-3">
                    <CheckIcon />
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