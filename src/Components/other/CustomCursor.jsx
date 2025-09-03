import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);
  const bigBallCircleRef = useRef(null); 
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const bigBall = bigBallRef.current;
    const smallBall = smallBallRef.current;
    const bigBallCircle = bigBallCircleRef.current;

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

    // 🟢 НОВЫЕ ОБРАБОТЧИКИ для скрытия точки
    const onHoverHideDot = () => {
      gsap.to(smallBall, { duration: 0.3, scale: 0 });
    };

    const onHoverShowDot = () => {
      gsap.to(smallBall, { duration: 0.3, scale: 1 });
    };

    document.body.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          // Старый поиск для .hoverable
          const hoverables = document.querySelectorAll('.hoverable');
          hoverables.forEach(el => {
            if (!el.dataset.hoverAttached) {
              el.addEventListener('mouseenter', onMouseHover);
              el.addEventListener('mouseleave', onMouseHoverOut);
              el.dataset.hoverAttached = 'true';
            }
          });

          // 🟢 НОВЫЙ ПОИСК для .cursor-hide-dot
          const hideDotHoverables = document.querySelectorAll('.cursor-hide-dot');
          hideDotHoverables.forEach(el => {
            if (!el.dataset.hideDotAttached) {
              el.addEventListener('mouseenter', onHoverHideDot);
              el.addEventListener('mouseleave', onHoverShowDot);
              el.dataset.hideDotAttached = 'true';
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
      // Очистка старых слушателей
      document.querySelectorAll('.hoverable').forEach(el => {
        el.removeEventListener('mouseenter', onMouseHover);
        el.removeEventListener('mouseleave', onMouseHoverOut);
      });
      // 🟢 ОЧИСТКА НОВЫХ СЛУШАТЕЛЕЙ
      document.querySelectorAll('.cursor-hide-dot').forEach(el => {
        el.removeEventListener('mouseenter', onHoverHideDot);
        el.removeEventListener('mouseleave', onHoverShowDot);
      });
    };
  }, []);

  return (
    <>
      <div ref={bigBallRef} className="cursor__ball cursor__ball--big">
        <svg height="30" width="30">
          <circle ref={bigBallCircleRef} cx="15" cy="15" r="12" strokeWidth="0"></circle>
        </svg>
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