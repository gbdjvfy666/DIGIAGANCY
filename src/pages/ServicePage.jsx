// src/pages/ServicePage.jsx
// ИСПРАВЛЕННАЯ ВЕРСИЯ ДЛЯ ПОДДЕРЖКИ ВЛОЖЕННОСТИ

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from './serviceData';
import HeroBlock from './ServiceBlocks/HeroBlock';
import ImageGalleryBlock from './ServiceBlocks/ImageGalleryBlock';
import FaqBlock from './ServiceBlocks/FaqBlock';
import TextBlock from './ServiceBlocks/TextBlock';
import Navbar from '@/Components/other/Navbar';
import Footer from '@/Components/other/Footer';

const blockComponents = {
  hero: HeroBlock,
  gallery: ImageGalleryBlock,
  faq: FaqBlock,
  text: TextBlock,
};

export default function ServicePage() {
  const { category, slug } = useParams();

  // ===================================================================================
  // --- НАЧАЛО ИЗМЕНЕНИЙ ---
  // Добавляем логику для обработки вложенных путей типа "websites/themes"
  let service;
  if (category === 'websites' && servicesData.websites.themes[slug]) {
    // Это особый случай для тематик сайтов
    service = servicesData.websites.themes[slug];
  } else {
    // Стандартный поиск для всех остальных категорий
    service = servicesData[category]?.[slug];
  }
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---
  // ===================================================================================

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4">Упс! Услуга не найдена.</p>
        <Link to="/services" className="mt-8 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
          Вернуться к списку услуг
        </Link>
      </div>
    );
  }
  
  // Дальнейший код остается без изменений
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8 text-zinc-400">
          <Link to="/" className="hover:text-white">Главная</Link> /
          <Link to="/services" className="hover:text-white"> Услуги</Link> /
          <span className="text-white"> {service.title}</span>
        </div>
        
        {service.blocks.map((block, index) => {
          const Component = blockComponents[block.type];
          if (Component) {
            return <Component key={index} data={block.data} />;
          }
          return null;
        })}
      </main>
      <Footer />
    </div>
  );
}