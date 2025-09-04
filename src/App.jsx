import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Design from './pages/Design';
import Target from './pages/Target';
import Works from './pages/Works';
import Test from './pages/test';
import WebDevelopment from './pages/WebDevelopment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 👈 1. ИМПОРТИРУЕМ ScrollTrigger
import CustomCursor from './Components/other/CustomCursor';
import About from './pages/About';
// 👈 2. РЕГИСТРИРУЕМ ПЛАГИН
gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const containerRef = useRef(null);
  const scrollPos = useRef(0);
  const targetPos = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;

    // 🟢 3. НАСТРАИВАЕМ ПРОКСИ ДЛЯ SCROLLTRIGGER
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          // Устанавливаем целевую позицию для нашего плавного скролла
          targetPos.current = value;
          // Также устанавливаем нативную позицию для обратной совместимости
          window.scrollTo(0, value);
        }
        // Возвращаем текущую позицию нашего плавного скролла
        return targetPos.current;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // Указываем, что скролл происходит на body
      pinType: "transform"
    });

    const setBodyHeight = () => {
      document.body.style.height = container.scrollHeight + 'px';
      ScrollTrigger.refresh(); // 👈 4. ОБНОВЛЯЕМ ScrollTrigger при ресайзе
    };
    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);

    const update = () => {
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.08;
      const roundedScroll = Math.round(scrollPos.current * 100) / 100;
      
      gsap.set(container, { y: -roundedScroll });

      // 🟢 5. ГЛАВНОЕ ИЗМЕНЕНИЕ: ОБНОВЛЯЕМ SCROLLTRIGGER НА КАЖДОМ КАДРЕ
      ScrollTrigger.update();

      animationFrameId = requestAnimationFrame(update);
    };

    const onScroll = () => {
      targetPos.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    update();

    // Говорим ScrollTrigger использовать наш scrollerProxy
    ScrollTrigger.defaults({ scroller: document.body });

    return () => {
      window.removeEventListener('resize', setBodyHeight);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      // Очистка
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    targetPos.current = 0;
    scrollPos.current = 0;
    window.scrollTo(0, 0);
    setTimeout(() => {
        if (containerRef.current) {
            document.body.style.height = containerRef.current.scrollHeight + 'px';
            ScrollTrigger.refresh();
        }
    }, 100);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full will-change-transform" ref={containerRef}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/target" element={<Target />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/works" element={<Works />} />
        <Route path="/About" element={<About />} />
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