// src/pages/ServiceBlocks/HeroBlock.jsx

import React from 'react';

// Этот компонент отвечает за отрисовку "главного экрана" страницы.
export default function HeroBlock({ data }) {
  
  if (!data) {
    return null; // Защита на случай отсутствия данных
  }
  
  return (
    // Внешняя секция теперь отвечает за вертикальные отступы (сверху и снизу).
    // bg-black можно оставить, хотя он и наследуется от родителя. text-white здесь важен.
    <section className="bg-black text-white text-left py-16 md:py-20">
      
      {/* 
        ГЛАВНОЕ ИЗМЕНЕНИЕ:
        Все содержимое обернуто в контейнер. 
        Он задает максимальную ширину (max-w-8xl), центрирует блок (mx-auto) 
        и добавляет безопасные отступы по бокам (px-4).
      */}
      <div className="container max-w-8xl mx-auto px-4">
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
          {data.title}
        </h1>
        
        {/*
          Этот max-w-3xl здесь очень к месту. Он делает описание более узким и читаемым,
          даже если вся секция широкая. Это хороший пример внутреннего ограничения.
        */}
        <p className="text-xl text-zinc-300 max-w-3xl mb-8">
          {data.description}
        </p>

        {data.price && (
          <div className="text-3xl font-bold text-white mb-12">
            Стоимость: {data.price}
          </div>
        )}

        {data.buttonText && (
          // Можно добавить `Link` из 'react-router-dom', если кнопка должна куда-то вести
          <a href="#form" className="inline-block px-8 py-4 bg-purple-600 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors">
            {data.buttonText}
          </a>
        )}

      </div>
    </section>
  );
}