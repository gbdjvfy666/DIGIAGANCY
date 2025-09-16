import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'framer-motion';
import ResponsiveDemo from '@/Components/components/ResponsiveDemo';

// Компонент карточки (без изменений)
const WorkCard = ({ title, image, description, onLearnMore }) => (
    <div className="group/card relative flex flex-col text-left bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] hover:-translate-y-1.5 h-full">
        <div className="aspect-video mb-5 rounded-lg overflow-hidden">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" 
                loading="lazy" 
            />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6 font-sans">{description}</p>
        <div className="mt-auto">
            <button onClick={onLearnMore} className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-transparent text-white border border-white/40 rounded-lg transition-colors duration-200 hover:bg-white hover:text-black font-medium">
                Подробнее
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transition-transform duration-200 group-hover/card:translate-x-1">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
);


const LineBackgroundComponent = ({ width = '100%', height = '250vh', scrollToComponent }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const cardsData = [
    { id: 'landing', title: 'Лендинг "под ключ"', image: 'https://images.unsplash.com/photo-1559028006-448665bd7c22?q=80&w=1920', description: 'Одностраничный сайт с выверенной структурой и дизайном для достижения максимальной конверсии. Идеален для запуска продукта или услуги.' },
    { id: 'shop', title: 'Интернет-магазин', image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e-3d54?q=80&w=1920', description: 'Надежное e-commerce решение с каталогом, корзиной, оплатой и системой управления. Готово к масштабированию и высоким нагрузкам.' },
    { id: 'corporate', title: 'Корпоративный сайт', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920', description: 'Профессиональное онлайн-представительство вашей компании. Повышает доверие, привлекает клиентов и партнеров.' },
    { id: 'multi', title: 'Многостраничный сайт', image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1920', description: 'Сайт с полноценной информационной архитектурой: услуги, блог, о компании. Оптимальное решение для малого и среднего бизнеса.' },
    { id: 'restaurant', title: 'Сайт для ресторана', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920', description: 'Элегантный сайт с меню, системой бронирования и фотогалереей. Создает правильную атмосферу и привлекает новых гостей.' },
    { id: 'courses', title: 'Платформа онлайн-курсов', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1920', description: 'Система для продажи образовательных продуктов: личные кабинеты, уроки, тесты и сертификаты. Монетизируйте свою экспертизу.' },
  ];
  
  const idToRefKey = {
      landing: 'LandingMain', shop: 'OnlineShopMain', corporate: 'CorporateMain',
      multi: 'MultipageSiteMain', restaurant: 'RestaurantSiteMain', blog: 'NewsBlogMain',
      designer: 'DesignerSiteMain', media: 'ResponsiveDemo', courses: 'CryptoProjectMain',
  };
  
  const handleLearnMore = (cardId) => {
      const refKey = idToRefKey[cardId];
      if (!scrollToComponent || !refKey) return;
      setDetailsOpen(false);
      setTimeout(() => {
          document.body.style.overflow = 'auto';
          scrollToComponent(refKey); 
      }, 500);
  };

  useEffect(() => { 
      if (detailsOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          setTimeout(() => { document.body.style.overflow = 'auto'; }, 500);
      }
  }, [detailsOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setDetailsOpen(false);
        }
    };

    if (detailsOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailsOpen]);


  useEffect(() => {
    const container = containerRef.current;
    const sceneElement = sceneRef.current;
    if (!container || !sceneElement) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    sceneElement.appendChild(renderer.domElement);

    const grainStrength = 0.15;
    const grainSize = 3.5;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        iTime: { value: 0.0 },
        grainStrength: { value: grainStrength },
        grainSize: { value: grainSize },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform float grainStrength;
        uniform float grainSize;
        
        #define BACKGROUND_COLOR      vec3(0.07, 0.07, 0.08)
        #define GLOW_SPREAD           0.15
        #define GLOW_INTENSITY        1.5
        
        float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }
        
        vec2 distToSegment(vec2 p, vec2 a, vec2 b) {
            vec2 pa = p - a; vec2 ba = b - a;
            float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
            return vec2(length(pa - ba * h), h);
        }
        
        vec3 getMonochromeGlow(float time, vec2 uv) {
            return vec3(1.0);
        }

        vec3 drawLineAndGlow(vec2 uv, vec2 start, vec2 end, float time) {
            vec2 distData = distToSegment(uv, start, end);
            float perp_dist = distData.x;
            float along_dist = distData.y;
            
            // --- Удалена часть, отвечающая за отрисовку центральной линии ---
            // float core_glow = smoothstep(LINE_CORE_WIDTH * 1.5, 0.0, perp_dist);
            // vec3 core_color = LINE_CORE_COLOR * core_glow;
            
            float glow_mask = smoothstep(GLOW_SPREAD, 0.0, perp_dist);
            float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0);
            
            vec3 glow_color = getMonochromeGlow(time, uv);
            glow_color *= glow_mask * end_factor * GLOW_INTENSITY;
            
            // --- Теперь возвращаем только свечение ---
            return glow_color;
        }

        void main() {
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
            vec2 start_point = vec2(-2.0, 0.3);
            vec2 end_point = vec2(2.0, 0.3);
            vec3 light_effect = drawLineAndGlow(uv, start_point, end_point, iTime);
            vec3 final_color = BACKGROUND_COLOR;
            final_color += light_effect;
            float bg_noise = hash(vUv * grainSize + iTime * 0.1) * grainStrength;
            final_color += bg_noise - grainStrength * 0.5;
            gl_FragColor = vec4(final_color, 1.0);
        }
      `
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);
    
    const updateSize = () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        shaderMaterial.uniforms.iResolution.value.set(width, height);
      };
      updateSize();
  
      function animate() {
        animationIdRef.current = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        shaderMaterial.uniforms.iTime.value = time;
        renderer.render(scene, camera);
      }
  
      const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) { if (!animationIdRef.current) animate(); } 
          else { if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }}
      });
      observer.observe(container);
  
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(container);
  
      return () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        observer.disconnect();
        resizeObserver.disconnect();
        if (sceneElement && renderer.domElement && sceneElement.contains(renderer.domElement)) {
          sceneElement.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className="relative isolate overflow-hidden bg-[#0a0a0b]"
    >
        <div ref={sceneRef} className="absolute inset-0 z-[1] h-full w-full pointer-events-none" />

        <div className="relative z-20 flex flex-col h-full w-full">
            
            <div 
                className={`flex h-screen w-full items-center justify-center p-8 transition-all duration-500 ease-in-out ${detailsOpen ? 'blur-md scale-95 opacity-50' : 'blur-0 scale-100 opacity-100'}`}
            >
                <div className="max-w-3xl text-center lg:text-left">
                    <h1 style={{ fontFamily: 'var(--primary-font, sans-serif)' }} className="text-[clamp(2.8rem,10vw,4.5rem)] font-extrabold leading-tight tracking-[-0.05em] uppercase text-white lg:text-[clamp(4rem,6vw,7rem)] lg:leading-[0.95]">
                        <span className="block font-unbounded">Цифровые</span>
                        <span className="block lg:relative font-unbounded">Решения</span>
                    </h1>
                    <p 
                        style={{ fontFamily: 'var(--secondary-font, serif)' }} 
                        className="mt-4 text-lg italic text-transparent md:text-xl select-none"
                        aria-hidden="true"
                    >
                        {'\u00A0'}
                    </p>
                    <p className="font-sans mt-8 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                        {`Мы — студия digital-дизайна и разработки. Наша задача — превратить ваши бизнес-цели в эффективные и эстетически выверенные веб-решения.`}
                    </p>
                    <button onClick={() => setDetailsOpen(true)} className="group mt-10 inline-flex items-center py-3 px-6 border border-white/70 rounded-full text-white bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-0.5 hover:shadow-2xl">
                        Наши Услуги
                        <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                    </button>
                </div>
            </div>

            <div className="flex h-screen w-full items-center justify-center">
                <ResponsiveDemo />
            </div>

        </div>

        <AnimatePresence>
            {detailsOpen && (
              <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 z-30 bg-black/60"
                />

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 z-40 flex flex-col items-center justify-start p-4 sm:p-8 overflow-y-auto"
                    onClick={() => setDetailsOpen(false)}
                >
                    <div 
                        className="w-full text-center py-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                            className="text-4xl sm:text-5xl font-bold text-white mb-4"
                        >
                            Ключевые направления разработки
                        </motion.h2>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
                        >
                            Выберите интересующее решение, чтобы ознакомиться подробнее.
                        </motion.p>
                        
                        <motion.div 
                            variants={{
                                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
                                hidden: {},
                            }}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
                        >
                            {cardsData.map((card) => (
                                <motion.div 
                                    key={card.id}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 },
                                    }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    <WorkCard {...card} onLearnMore={() => handleLearnMore(card.id)} />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
                            className="mt-16"
                        >
                            <button onClick={() => setDetailsOpen(false)} className="py-3 px-8 bg-white text-black rounded-full font-medium transition-transform hover:scale-105">
                                Назад
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
              </>
            )}
        </AnimatePresence>
    </div>
  );
};

export default LineBackgroundComponent;