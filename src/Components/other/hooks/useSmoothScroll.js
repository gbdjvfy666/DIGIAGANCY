// src/hooks/useSmoothScroll.js

import { useRef, useEffect, useCallback } from 'react'; // <-- Добавляем useCallback
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  const containerRef = useRef(null);
  const scrollPos = useRef(0);
  const targetPos = useRef(0);

  // --- ГЛАВНОЕ ИЗМЕНЕНИЕ №1 ---
  // Создаем функцию для пересчета высоты и оборачиваем ее в useCallback,
  // чтобы она не создавалась заново при каждом рендере.
  const refreshScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      document.body.style.height = container.scrollHeight + 'px';
      ScrollTrigger.refresh();
    }
  }, []); // Пустой массив зависимостей

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;

    if (!container) return;
    
    // --- ИЗМЕНЕНИЕ №2 ---
    // Убираем ScrollTrigger.scrollerProxy отсюда, чтобы избежать
    // многократной регистрации при быстрых переходах.
    // Мы зарегистрируем его один раз в App.jsx

    // Вызываем refreshScroll при инициализации и ресайзе
    refreshScroll();
    window.addEventListener('resize', refreshScroll);

    const update = () => {
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.08;
      const roundedScroll = Math.round(scrollPos.current * 100) / 100;
      
      gsap.set(container, { y: -roundedScroll });
      // ScrollTrigger.update() здесь не обязателен, т.к. onScroll его вызывает
      animationFrameId = requestAnimationFrame(update);
    };

    const onScroll = () => {
      targetPos.current = window.scrollY;
      ScrollTrigger.update(); // Обновляем ScrollTrigger при нативном скролле
    };

    window.addEventListener('scroll', onScroll);
    update();

    return () => {
      window.removeEventListener('resize', refreshScroll);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [refreshScroll]);


  return { containerRef, refreshScroll };
};