// src/pages/ServicePage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData, categoryData } from './serviceData'; 

// Импорты ваших компонентов-блоков
import HeroBlock from './ServiceBlocks/HeroBlock';
import ImageGalleryBlock from './ServiceBlocks/ImageGalleryBlock';
import FaqBlock from './ServiceBlocks/FaqBlock';
import TextBlock from './ServiceBlocks/TextBlock';
import WebsiteTypesGrid from './ServiceBlocks/WebsiteTypesGrid';
import PricingBlock from './ServiceBlocks/PricingBlock';
import ContactFormBlock from './ServiceBlocks/ContactFormBlock';

import Navbar from '@/Components/other/Navbar';
import Footer from '@/Components/other/Footer';

const blockComponents = {
  hero: HeroBlock,
  gallery: ImageGalleryBlock,
  faq: FaqBlock,
  text: TextBlock,
  link: WebsiteTypesGrid,
  price: PricingBlock,
  contact: ContactFormBlock,
};

export default function ServicePage() {
  let { category, slug } = useParams();

  if (!slug) {
    slug = category;
  }
  const currentCategoryInfo = categoryData[category];
  let service;
  if (category === 'websites' && servicesData.websites.themes[slug]) {
    service = servicesData.websites.themes[slug];
  } else {
    service = servicesData[category]?.[slug];
  }

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
      <Navbar />
      <main>
        
        <div className="container max-w-8xl mx-auto px-4 pt-24">
          <div className="mb-8 text-zinc-400">
            <Link to="/" className="hover:text-white">Главная</Link> /
            <Link to="/services" className="hover:text-white"> Услуги</Link> /

            {slug !== category && (
              <>
                <Link to={currentCategoryInfo.path} className="hover:text-white"> {currentCategoryInfo.title}</Link> /
              </>
            )}

            <span className="text-white"> {service.title}</span>
          </div>
        </div>
          
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
      
      <Footer />
    </div>
  );
}