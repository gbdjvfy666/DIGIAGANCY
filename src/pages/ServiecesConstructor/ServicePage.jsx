// src/pages/ServiecesConstructor/ServicePage.jsx (Исправленная версия)

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData, categoryData } from './serviceData'; 

// Импорты ваших компонентов-блоков
import HeroBlock from './ServiceBlocks/HeroBlock';
import FaqBlock from './ServiceBlocks/FaqBlock';
import TextBlock from './ServiceBlocks/TextBlock';
import WebsiteTypesGrid from './ServiceBlocks/WebsiteTypesGrid';
import PricingBlock from './ServiceBlocks/PricingBlock';
import ContactFormBlock from './ServiceBlocks/ContactFormBlock';

const blockComponents = {
  hero: HeroBlock,
  faq: FaqBlock,
  text: TextBlock,
  link: WebsiteTypesGrid,
  price: PricingBlock,
  contact: ContactFormBlock,
};

export default function ServicePage() {
  let { category, slug } = useParams();

  // Если slug отсутствует (например, для /services/websites), используем category как slug
  if (!slug) {
    slug = category;
  }

  // ==================================================================
  // ИСПРАВЛЕННАЯ ЛОГИКА ПОИСКА ДАННЫХ
  // ==================================================================
  let service;
  
  // 1. Сначала проверяем, не является ли slug одной из "тематик".
  //    Это самый специфичный случай.
  if (servicesData.websites?.themes?.[slug]) {
    service = servicesData.websites.themes[slug];
    // Если нашли, принудительно устанавливаем category, чтобы "хлебные крошки" работали
    category = 'websites'; 
  } else {
    // 2. Если это не "тематика", ищем как обычно.
    service = servicesData[category]?.[slug];
  }

  const currentCategoryInfo = categoryData[category];
  // ==================================================================

  if (!service || !currentCategoryInfo) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4">Упс! Страница, которую вы ищете, не найдена.</p>
        <Link to="/services" className="mt-8 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
          Вернуться ко всем услугам
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
          
        {service.blocks.map((block, index) => {
          const Component = blockComponents[block.type];
          if (!Component) return null; 

          const props = {
            ...(block.data && { data: block.data }),
            ...(block.type === 'link' && { currentSlug: slug }),
          };

          return <Component key={index} {...props} />;
        })}
      </main>
    </div>
  );
}