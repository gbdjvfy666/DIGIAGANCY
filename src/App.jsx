import { useSmoothScroll } from './hooks/useSmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useLayoutEffect } from 'react';
// ===================================================================================
import Home from './pages/Home';
import Design from './pages/Design';
import Target from './pages/Target';
import Works from './pages/Works';
import Test from './pages/Test';
import Reviews from './pages/Reviews';
import WebDevelopment from './pages/WebDevelopment';
import About from './pages/About';
import Brief from './pages/Brief';
import Services from './pages/Services';
import ServicePage from './pages/ServiecesConstructor/ServicePage';
// ===================================================================================
import BlogPage from './pages/BlogConstructor/BlogPage'; 
import CustomCursor from './Components/other/CustomCursor';
// ===================================================================================

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  // Вызываем хук здесь и получаем ref и функцию
  const { containerRef, refreshScroll } = useSmoothScroll();

  useLayoutEffect(() => {
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? window.scrollTo(0, value) : window.scrollY;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
    });
    
    ScrollTrigger.defaults({ scroller: document.body });
    refreshScroll();

    return () => {
      ScrollTrigger.killAll();
    }
  }, [refreshScroll]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      refreshScroll();
    }, 100);
  }, [location.pathname, location.search, refreshScroll]);

  // ===================================================================================
  return (
    <div className="fixed top-0 left-0 w-full will-change-transform" ref={containerRef}>
      <Routes>
        {/* --- Основные страницы --- */}
        <Route path="/" element={<Home />} />
        <Route path="/target" element={<Target />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/works" element={<Works />} />
        <Route path="/About" element={<About />} />
        <Route path="/Brief" element={<Brief />} />

        {/* --- Маршруты для Услуг --- */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/:category" element={<ServicePage />} />
        <Route path="/services/:category/:slug" element={<ServicePage />} />
        <Route path="/services/websites/themes/:slug" element={<ServicePage />} />
        
        {/* --- Маршруты для Блога --- */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />

      </Routes>
    </div>
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