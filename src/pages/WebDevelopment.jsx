import React from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Divider from '@/Components/other/Divider';
// --- ИСПРАВЛЕНИЕ ЗДЕСЬ: Добавлены все недостающие импорты ---
import Navbar from '../Components/other/Navbar';
import LandingMain from '../Components/section/LandingMain';
import OnlineShopMain from '../Components/section/OnlineShopMain';
import CorporateMain from '../Components/section/CorporateMain';
import MultipageSiteMain from '../Components/section/MultipageSiteMain';
import RestaurantSiteMain from '../Components/section/RestaurantSiteMain';
import NewsBlogMain from '../Components/section/NewsBlogMain';
import DesignerSiteMain from '../Components/section/DesignerSiteMain';
import CryptoProjectMain from '../Components/section/CryptoProjectMain';
import ResponsiveDemo from '../Components/components/ResponsiveDemo'; // <-- Вот он, виновник ошибки
import FractalOrbComponentSecond from '../Components/animatedblock/ProfileCard/FractalOrbComponentSecond';

// Регистрируем плагин GSAP
gsap.registerPlugin(ScrollToPlugin);

export default function WebDevelopment() {
  
  const scrollToComponent = (targetId) => {
    console.log("Попытка GSAP скролла к элементу с ID:", targetId);

    gsap.to(window, {
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTo: `#${targetId}`,
      // Если у вас есть фиксированная шапка (Navbar), раскомментируйте и настройте отступ
      // offsetY: 100 
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 dark:text-white overflow-x-hidden">
      <Navbar />
      <FractalOrbComponentSecond scrollToComponent={scrollToComponent} />

      {/* Используем ID как "якоря" для GSAP. Эта часть верна. */}
      <Divider/>
      <div id="ResponsiveDemo">
        <ResponsiveDemo />
      </div>
      <Divider/>
      <div id="DesignerSiteMain">
        <DesignerSiteMain />
      </div>
      <Divider/>
      <div id="LandingMain">
        <LandingMain />
      </div>
      <Divider/>
      <div id="OnlineShopMain">
        <OnlineShopMain />
      </div>
      <Divider/>
      <div id="CorporateMain">
        <CorporateMain />
      </div>
      <Divider/>
      <div id="MultipageSiteMain">
        <MultipageSiteMain />
      </div>
      <Divider/>
      <div id="RestaurantSiteMain">
        <RestaurantSiteMain />
      </div>
      <Divider/>
      <div id="NewsBlogMain">
        <NewsBlogMain />
      </div>
      <Divider/>
      <div id="CryptoProjectMain">
        <CryptoProjectMain />
      </div>
    </div>
  );
}