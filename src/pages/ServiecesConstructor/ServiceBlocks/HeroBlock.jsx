// src/pages/ServiceBlocks/HeroBlock.jsx (Финальная широкая версия)

import React from 'react';

const FeatureIcon = ({ path }) => (
  <svg className="w-8 h-8 mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function HeroBlock({ data }) {
  
  if (!data) {
    return null;
  }
  
  return (
    <section className="bg-black text-white text-left py-20 md:py-28">
      
      {/* ================================================================== */}
      {/* ГЛАВНОЕ ИЗМЕНЕНИЕ ЗДЕСЬ:                                          */}
      {/* Устанавливаем очень большую, но фиксированную максимальную ширину */}
      {/* ================================================================== */}
      <div className="container max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 text-white">
            {data.title}
          </h1>
          <p className="text-xl text-zinc-300 max-w-4xl">
            {data.description}
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800 mb-16"></div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8">
            
            {data.price && (
              <div>
                <FeatureIcon path="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9A2.25 2.25 0 0018.75 6.75h-1.5a2.25 2.25 0 00-2.25 2.25v3.51" />
                <h3 className="font-garet uppercase tracking-widest text-zinc-400 text-sm mb-1">Стоимость</h3>
                <p className="text-2xl font-semibold text-white">{data.price}</p>
              </div>
            )}

            {data.timeline && (
              <div>
                <FeatureIcon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
                <h3 className="font-garet uppercase tracking-widest text-zinc-400 text-sm mb-1">Сроки</h3>
                <p className="text-2xl font-semibold text-white">{data.timeline}</p>
              </div>
            )}

            {data.result && (
               <div>
                <FeatureIcon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <h3 className="font-garet uppercase tracking-widest text-zinc-400 text-sm mb-1">Результат</h3>
                <p className="text-2xl font-semibold text-white">{data.result}</p>
              </div>
            )}

          </div>

          {data.buttonText && (
            <a 
              href="#form" 
              className="inline-block px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {data.buttonText}
            </a>
          )}

        </div>

      </div>
    </section>
  );
}