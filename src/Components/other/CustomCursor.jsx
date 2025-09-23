import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

// --- НОВЫЙ КОД: Единая иконка для слайдера ---
const SliderArrowsIcon = () => (
  <svg className="cursor-arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6L3 12L8 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 6L21 12L16 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const CustomCursor = () => {
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);
  const bigBallCircleRef = useRef(null); 
  // --- НОВЫЙ КОД: Ref для контейнера новой иконки ---
  const arrowContainerRef = useRef(null);

  const requestRef = useRef();
  const previousTimeRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const bigBall = bigBallRef.current;
    const smallBall = smallBallRef.current;
    const bigBallCircle = bigBallCircleRef.current;
    // --- НОВЫЙ КОД: Доступ к контейнеру иконки ---
    const arrowContainer = arrowContainerRef.current;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        gsap.to(bigBall, {
          duration: 0.4,
          x: mousePos.current.x - gsap.getProperty(bigBall, "width") / 2,
          y: mousePos.current.y - gsap.getProperty(bigBall, "height") / 2,
        });
        gsap.to(smallBall, {
          duration: 0.1,
          x: mousePos.current.x - 5,
          y: mousePos.current.y - 7,
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    // ВАШ ОРИГИНАЛЬНЫЙ КОД ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ
    const onMouseHover = () => {
      gsap.to(bigBall, { duration: 0.3, width: 80, height: 80 });
      gsap.to(bigBall.querySelector('svg'), { duration: 0.3, attr: { width: 80, height: 80 } });
      gsap.to(bigBallCircle, { duration: 0.3, attr: { r: 38, cx: 40, cy: 40 } });
    };

    const onMouseHoverOut = () => {
      gsap.to(bigBall, { duration: 0.3, width: 30, height: 30 });
      gsap.to(bigBall.querySelector('svg'), { duration: 0.3, attr: { width: 30, height: 30 } });
      gsap.to(bigBallCircle, { duration: 0.3, attr: { r: 12, cx: 15, cy: 15 } });
    };
    
    const onHoverHideDot = () => {
      gsap.to(smallBall, { duration: 0.3, scale: 0 });
    };

    const onHoverShowDot = () => {
      gsap.to(smallBall, { duration: 0.3, scale: 1 });
    };
    
    // --- НОВЫЙ КОД: Упрощенная логика для слайдера ---
    const onSliderEnter = () => {
      gsap.to([smallBall, bigBall.querySelector('svg')], { duration: 0.3, autoAlpha: 0 }); // Прячем точку и круг
      gsap.to(arrowContainer, { duration: 0.3, autoAlpha: 1 }); // Показываем иконку < >
      gsap.to(bigBall, { duration: 0.3, width: 80, height: 80 }); // Увеличиваем шар
    };
    
    const onSliderLeave = () => {
      gsap.to([smallBall, bigBall.querySelector('svg')], { duration: 0.3, autoAlpha: 1 }); // Возвращаем точку и круг
      gsap.to(arrowContainer, { duration: 0.3, autoAlpha: 0 }); // Прячем иконку < >
      gsap.to(bigBall, { duration: 0.3, width: 30, height: 30 }); // Уменьшаем шар
    };

    document.body.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          // ВАШ ОРИГИНАЛЬНЫЙ КОД
          document.querySelectorAll('.hoverable').forEach(el => {
            if (!el.dataset.hoverAttached) {
              el.addEventListener('mouseenter', onMouseHover);
              el.addEventListener('mouseleave', onMouseHoverOut);
              el.dataset.hoverAttached = 'true';
            }
          });
          document.querySelectorAll('.cursor-hide-dot').forEach(el => {
            if (!el.dataset.hideDotAttached) {
              el.addEventListener('mouseenter', onHoverHideDot);
              el.addEventListener('mouseleave', onHoverShowDot);
              el.dataset.hideDotAttached = 'true';
            }
          });

          // НОВЫЙ ПОИСК ДЛЯ СЛАЙДЕРА
          document.querySelectorAll('.cursor-slider-area').forEach(el => {
            if (!el.dataset.sliderAttached) {
              el.addEventListener('mouseenter', onSliderEnter);
              el.addEventListener('mouseleave', onSliderLeave);
              el.dataset.sliderAttached = 'true';
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
      // ВАШ ОРИГИНАЛЬНЫЙ КОД ОЧИСТКИ
      document.querySelectorAll('.hoverable').forEach(el => { /* ... */ });
      document.querySelectorAll('.cursor-hide-dot').forEach(el => { /* ... */ });
      // НОВАЯ ОЧИСТКА
      document.querySelectorAll('.cursor-slider-area').forEach(el => {
        el.removeEventListener('mouseenter', onSliderEnter);
        el.removeEventListener('mouseleave', onSliderLeave);
      });
    };
  }, []);

  return (
    <>
      {/* ВАШ ОРИГИНАЛЬНЫЙ JSX БЕЗ ИЗМЕНЕНИЙ */}
      <div ref={bigBallRef} className="cursor__ball cursor__ball--big">
        <svg height="30" width="30">
          <circle ref={bigBallCircleRef} cx="15" cy="15" r="12" strokeWidth="0"></circle>
        </svg>

        {/* --- НОВЫЙ КОД: Контейнер для единой иконки, изначально скрыт --- */}
        <div ref={arrowContainerRef} className="cursor-arrows-container">
            <SliderArrowsIcon />
        </div>
      </div>
      <div ref={smallBallRef} className="cursor__ball cursor__ball--small">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;