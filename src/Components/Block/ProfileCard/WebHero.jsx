import React, { lazy, Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResponsiveDemo from '@/Components/Block/ResponsiveDemoHouse';
import { FaLaptopCode, FaShoppingCart, FaBuilding, FaSitemap, FaUtensils, FaGraduationCap } from 'react-icons/fa';
import ThemeToggleCard from '@/Components/Block/Theme/ThemeToggleCard';
const PrismaticBurst = lazy(() => import('@/Components/Block/PrismaticBurst'));

// Компонент PrismaticButton теперь используется только для главной кнопки
const PrismaticButton = ({ onClick, children, colors, hoverColors, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            className={`relative group overflow-hidden rounded-lg ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 z-10">
                {/* Анимация рендерится всегда для этой кнопки */}
                <Suspense fallback={<div className="w-full h-full bg-blue-900/50 rounded-lg" />}>
                    <PrismaticBurst
                        colors={isHovered ? hoverColors : colors}
                        animationType="rotate3d"
                        intensity={1.5}
                        speed={0.4}
                        distort={0.8}
                        rayCount={14}
                    />
                </Suspense>
            </div>
            <span className="absolute inset-0 z-10 rounded-lg border-2 border-white/50 group-hover:border-white transition-colors duration-300"></span>
            <div className="relative z-20 flex items-center justify-center py-2.5 px-4 font-medium text-white">
                {children}
            </div>
        </button>
    );
};

// === НОВЫЙ КОМПОНЕНТ: Простая кнопка без анимации для карточек ===
const SimpleButton = ({ onClick, children, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`group relative overflow-hidden rounded-lg border-2 border-white/50 bg-transparent hover:border-white hover:bg-white/10 transition-colors duration-300 ${className}`}
        >
            <div className="relative z-20 flex items-center justify-center py-2.5 px-4 font-medium text-white">
                {children}
            </div>
        </button>
    );
};


const WebHero = ({ width = '100%', height = 'auto' }) => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);

    const cardsData = [
      { id: 'landing', title: 'Лендинг "под ключ"', icon: <FaLaptopCode />, description: 'Одностраничный сайт с выверенной структурой и дизайном для достижения максимальной конверсии. Идеален для запуска продукта или услуги.', path: '/web-development/landing' },
      { id: 'shop', title: 'Интернет-магазин', icon: <FaShoppingCart />, description: 'Надежное e-commerce решение с каталогом, корзиной, оплатой и системой управления. Готово к масштабированию и высоким нагрузкам.', path: '/web-development/online-shop' },
      { id: 'corporate', title: 'Корпоративный сайт', icon: <FaBuilding />, description: 'Профессиональное онлайн-представительство вашей компании. Повышает доверие, привлекает клиентов и партнеров.', path: '/web-development/corporate-site' },
      { id: 'multi', title: 'Многостраничный сайт', icon: <FaSitemap />, description: 'Сайт с полноценной информационной архитектурой: услуги, блог, о компании. Оптимальное решение для малого и среднего бизнеса.', path: '/web-development/multipage-site' },
      { id: 'restaurant', title: 'Сайт для ресторана', icon: <FaUtensils />, description: 'Элегантный сайт с меню, системой бронирования и фотогалереей. Создает правильную атмосферу и привлекает новых гостей.', path: '/web-development/restaurant-site' },
      { id: 'courses', title: 'Платформа онлайн-курсов', icon: <FaGraduationCap />, description: 'Система для продажи образовательных продуктов: личные кабинеты, уроки, тесты и сертификаты. Монетизируйте свою экспертизу.', path: '/web-development/designer-site' },
    ];

    const handleLearnMore = (path) => {
        navigate(path);
    };

    useEffect(() => {
        const container = containerRef.current;
        const sceneRefCurrent = sceneRef.current;
        if (!container || !sceneRefCurrent) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(container.clientWidth, container.clientHeight);
        sceneRefCurrent.appendChild(renderer.domElement);

        const grainStrength = 0.05;
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
                
                #define BACKGROUND_COLOR vec3(0.07, 0.07, 0.08)
                #define GLOW_SPREAD 0.15
                #define GLOW_INTENSITY 1.5
                
                float hash(vec2 p) {
                    p = fract(p * vec2(123.34, 456.21));
                    p += dot(p, p + 45.32);
                    return fract(p.x * p.y);
                }
                
                vec2 distToSegment(vec2 p, vec2 a, vec2 b) {
                    vec2 pa = p - a; 
                    vec2 ba = b - a;
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
                    
                    float glow_mask = smoothstep(GLOW_SPREAD, 0.0, perp_dist);
                    float end_factor = pow(abs(along_dist - 0.5) * 2.0, 2.0);
                    
                    vec3 glow_color = getMonochromeGlow(time, uv);
                    glow_color *= glow_mask * end_factor * GLOW_INTENSITY;
                    
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
            if (sceneRefCurrent && renderer.domElement && sceneRefCurrent.contains(renderer.domElement)) {
                sceneRefCurrent.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width }}
            className="relative isolate overflow-hidden bg-[#0a0a0b]"
        >
            <div ref={sceneRef} className="absolute inset-0 z-[1] h-full w-full pointer-events-none" />

            <div className="relative z-20 flex flex-col h-full w-full">
                
                <div className="flex h-screen w-full items-center justify-center p-8 transition-all duration-500 ease-in-out">
                    <div className="max-w-5xl text-center lg:text-left">
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
                        <p className="font-sans mt-8 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
                            {`Мы — студия digital-дизайна и разработки. Наша задача — превратить ваши бизнес-цели в эффективные и эстетически выверенные веб-решения.`}
                        </p>
                        
                        <PrismaticButton
                            onClick={() => navigate('/services')}
                            className="mt-10 w-full sm:w-auto"
                            colors={['#f3f4f6', '#d1d5db', '#6b7280']}
                            hoverColors={['#e5e7eb', '#d1d5db', '#9ca3af']}
                        >
                            Наши Услуги
                            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                        </PrismaticButton>
                    </div>
                </div>

                <div className="w-full text-center py-16 sm:py-24 px-4 sm:p-8">
                    <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-4"
                    >
                        Ключевые направления разработки
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                        className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
                    >
                        Выберите интересующее решение, чтобы ознакомиться подробнее.
                    </motion.p>
                    
                    <motion.div 
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {},
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
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
                                <div className="group/card relative flex flex-col text-left bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] hover:-translate-y-1.5 h-full">
                                    <div className="w-full h-32 mb-5 flex items-center justify-center rounded-lg bg-white/10 text-sky-400">
                                        <div className="text-5xl transition-transform duration-500 group-hover/card:scale-110">
                                            {card.icon}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6 font-sans">{card.description}</p>
                                    <div className="mt-auto">
                                        <SimpleButton 
                                            onClick={() => handleLearnMore(card.path)} 
                                            className="w-full"
                                        >
                                            Подробнее
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                            </svg>
                                        </SimpleButton>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                
                <div className="w-full text-center pt-16 sm:pt-24 px-4 sm:p-8">
                     <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-4xl sm:text-5xl font-bold text-white"
                    >
                        Адаптивность
                    </motion.h2>
                </div>

                <div className="flex h-screen w-full items-center justify-center p-4">
                    <ResponsiveDemo />
                </div>

                <div className="w-full py-16 sm:py-24 px-4 sm:px-8 flex flex-col items-center">
                    <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center"
                    >
                        Интерактивный Компонент
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                        className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto text-center"
                    >
                        Пример изолированного компонента с собственной логикой. Переключите тему, чтобы увидеть, как меняется только правая часть карточки.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className="w-full"
                    >
                        <ThemeToggleCard />
                    </motion.div>
                </div>
            </div>

        </div>
    );
};
  
export default WebHero;