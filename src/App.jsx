import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Ваши основные компоненты страниц (остаются без изменений)
import Home from './pages/Home';
import Design from './pages/Design';
import Target from './pages/Target';
import Works from './pages/Works';
import Test from './pages/Test';
import Reviews from './pages/Reviews';
import WebDevelopment from './pages/WebDevelopment';
import About from './pages/About';
import Brief from './pages/Brief';
import Services from './pages/Services/Services';

// Вспомогательные компоненты (остаются без изменений)
import CustomCursor from './Components/other/CustomCursor';
import SmoothScrollContainer from './Components/other/SmoothScrollContainer';

// Ваши статичные страницы услуг (веб-разработка, остаются без изменений)
import CorporateMain from './pages/Services/WebPages/CorporateMain';
import CryptoProjectMain from './pages/Services/WebPages/CryptoProjectMain';
import DesignerSiteMain from './pages/Services/WebPages/DesignerSiteMain';
import LandingMain from './pages/Services/WebPages/LandingMain';
import MultipageSiteMain from './pages/Services/WebPages/MultipageSiteMain';
import NewsBlogMain from './pages/Services/WebPages/NewsBlogMain';
import OnlineShopMain from './pages/Services/WebPages/OnlineShopMain';
import RestaurantSiteMain from './pages/Services/WebPages/RestaurantSiteMain';

// ===================================================================================
// НАЧАЛО ИЗМЕНЕНИЙ
// ===================================================================================

// 1. УДАЛЯЕМ ВСЕ 100+ ИМПОРТОВ для каждой услуги.
// Вместо них добавляем ОДИН импорт для нашего будущего универсального шаблона.
import ServicePage from './pages/ServicePage'; // Убедитесь, что такой файл будет создан

// ===================================================================================
// КОНЕЦ ИЗМЕНЕНИЙ
// ===================================================================================

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SmoothScrollContainer>
      <Routes>
        {/* Ваши основные маршруты (остаются без изменений) */}
        <Route path="/" element={<Home />} />
        <Route path="/target" element={<Target />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/works" element={<Works />} />
        <Route path="/About" element={<About />} />
        <Route path="/Brief" element={<Brief />} />
        <Route path="/Services" element={<Services />} />

        {/* Ваши статичные маршруты (остаются без изменений) */}
        <Route path="/web-development/corporate-site" element={<CorporateMain />} />
        <Route path="/web-development/crypto-project" element={<CryptoProjectMain />} />
        <Route path="/web-development/designer-site" element={<DesignerSiteMain />} />
        <Route path="/web-development/landing" element={<LandingMain />} />
        <Route path="/web-development/multipage-site" element={<MultipageSiteMain />} />
        <Route path="/web-development/news-blog" element={<NewsBlogMain />} />
        <Route path="/web-development/online-shop" element={<OnlineShopMain />} />
        <Route path="/web-development/restaurant-site" element={<RestaurantSiteMain />} />

        {/* =================================================================================== */}
        {/* НАЧАЛО ИЗМЕНЕНИЙ                                                                   */}
        {/* =================================================================================== */}

        {/* 2. УДАЛЯЕМ ВСЕ 100+ СТАТИЧНЫХ РОУТОВ. */}
        {/* Вместо них добавляем ДВА динамических роута, которые "ловят" все возможные услуги. */}

        {/* Этот роут будет работать для URL вида /branding/logotipy */}
        <Route path="/:category/:slug" element={<ServicePage />} />

        {/* Этот роут для вложенных категорий, как /websites/themes/avto */}
        <Route path="/:category/themes/:slug" element={<ServicePage />} />

        {/* =================================================================================== */}
        {/* КОНЕЦ ИЗМЕНЕНИЙ                                                                     */}
        {/* =================================================================================== */}
      </Routes>
    </SmoothScrollContainer>
  );
}

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <AppContent />
    </Router>
  );
}