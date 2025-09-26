// src/Components/components/DigitalInfo.jsx

import React from 'react';

// Небольшой вспомогательный компонент для иконок, чтобы не дублировать код
const FeatureIcon = ({ path }) => (
  <div className="flex-shrink-0">
    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  </div>
);

// Основной компонент с информацией
const DigitalInfo = () => {
  return (
    <div className="w-full max-w-xl text-left">
      {/* Главный заголовок */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-white">
        DIGITAL
      </h1>
      
      {/* Контейнер для "трех китов" */}
      <div className="flex flex-col gap-8">

        {/* Элемент 1: Дизайн */}
        <div className="flex items-start gap-4">
          <FeatureIcon path="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.092c0-.537.436-.97.97-.97h.515c.245 0 .443-.198.443-.442V13.5a1.125 1.125 0 011.125-1.125h2.252c.577 0 1.042.465 1.042 1.042v3.282c0 .097-.059.185-.148.22l-2.443 1.162a.25.25 0 00-.076.365l3.513 4.925a.25.25 0 00.41-.161l.175-1.05a.25.25 0 00-.076-.288l-1.52-1.298a.25.25 0 01-.076-.288l.545-1.21a.25.25 0 01.385-.121l1.472 1.01a.25.25 0 00.364-.231l.243-1.458a.25.25 0 00-.364-.231l-1.472 1.01a.25.25 0 01-.385-.121l-.545-1.21a.25.25 0 01.076-.288l1.52-1.298a.25.25 0 00.076-.288l-.175-1.05a.25.25 0 00-.41-.161l-3.513 4.925a.25.25 0 00.076.365l2.443 1.162a.25.25 0 00.148.22z" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Креативный Дизайн</h3>
            <p className="text-zinc-400">Создаем уникальную визуальную идентичность, которая выделяет ваш бренд и привлекает внимание.</p>
          </div>
        </div>

        {/* Элемент 2: Сайты */}
        <div className="flex items-start gap-4">
          <FeatureIcon path="M17.25 6.75h-10.5a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25z" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Функциональные Сайты</h3>
            <p className="text-zinc-400">Разрабатываем быстрые, адаптивные и интуитивно понятные сайты, которые решают задачи вашего бизнеса.</p>
          </div>
        </div>

        {/* Элемент 3: Таргетинг */}
        <div className="flex items-start gap-4">
          <FeatureIcon path="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 00-5.84-2.56m-2.56-5.84a14.98 14.98 0 00-2.56-5.84m-2.56 5.84a6 6 0 017.38-5.84m-4.82 5.84a14.983 14.983 0 00-5.84 2.56m5.84 2.56a8.983 8.983 0 01-5.84 2.56m5.84-2.56a8.983 8.983 0 012.56 5.84m-2.56-5.84a6 6 0 015.84-7.38m0 12.22a6 6 0 01-7.38 5.84m7.38-5.84a14.983 14.983 0 002.56-5.84m-2.56 5.84a8.983 8.983 0 012.56-5.84" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Точный Таргетинг</h3>
            <p className="text-zinc-400">Настраиваем рекламные кампании, которые приводят целевых клиентов и гарантируют результат.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DigitalInfo;