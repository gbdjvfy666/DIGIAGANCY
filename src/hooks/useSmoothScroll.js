import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  const containerRef = useRef(null);
  const scrollPos = useRef(0);
  const targetPos = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;

    if (!container) return;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          targetPos.current = value;
          window.scrollTo(0, value);
        }
        return targetPos.current;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: "transform"
    });

    const setBodyHeight = () => {
      document.body.style.height = container.scrollHeight + 'px';
      ScrollTrigger.refresh();
    };

    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);

    const update = () => {
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.08;
      const roundedScroll = Math.round(scrollPos.current * 100) / 100;
      
      gsap.set(container, { y: -roundedScroll });
      ScrollTrigger.update();

      animationFrameId = requestAnimationFrame(update);
    };

    const onScroll = () => {
      targetPos.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    update();

    ScrollTrigger.defaults({ scroller: document.body });

    return () => {
      window.removeEventListener('resize', setBodyHeight);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.killAll();
    };
  }, []);

  return containerRef;
};