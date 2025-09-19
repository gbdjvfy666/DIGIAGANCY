import React, { lazy, Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResponsiveDemo from '@/Components/components/ResponsiveDemo';

const PrismaticBurst = lazy(() => import('@/Components/PrismaticBurst'));

const PrismaticButton = ({ onClick, children, colors, hoverColors, className = "" }) => {
    // ... (код этого компонента не меняется)
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            className={`relative group overflow-hidden rounded-lg ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 z-10">
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

const WorkCard = ({ title, image, description, onLearnMore }) => {
    // ... (код этого компонента не меняется)
    const defaultColors = ['#1d4ed8', '#0ea5e9', '#6366f1'];
    const hoverColors = ['#93c5fd', '#bfdbfe', '#a5b4fc'];
    
    return (
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
                <PrismaticButton 
                    onClick={onLearnMore} 
                    colors={defaultColors} 
                    hoverColors={hoverColors} 
                    className="w-full"
                >
                    Подробнее
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transition-transform duration-200 group-hover/card:translate-x-1">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                </PrismaticButton>
            </div>
        </div>
    );
};


const LineBackgroundComponent = ({ width = '100%', height = '300vh' }) => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    // ... (остальной код до return не меняется)
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);
    
    const cardsData = [
      { id: 'landing', title: 'Лендинг "под ключ"', image: 'https://images.unsplash.com/photo-1559028006-448665bd7c22?q=80&w=1920', description: 'Одностраничный сайт с выверенной структурой и дизайном для достижения максимальной конверсии. Идеален для запуска продукта или услуги.', path: '/web-development/landing' },
      { id: 'shop', title: 'Интернет-магазин', image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e-3d54?q=80&w=1920', description: 'Надежное e-commerce решение с каталогом, корзиной, оплатой и системой управления. Готово к масштабированию и высоким нагрузкам.', path: '/web-development/online-shop' },
      { id: 'corporate', title: 'Корпоративный сайт', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920', description: 'Профессиональное онлайн-представительство вашей компании. Повышает доверие, привлекает клиентов и партнеров.', path: '/web-development/corporate-site' },
      { id: 'multi', title: 'Многостраничный сайт', image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1920', description: 'Сайт с полноценной информационной архитектурой: услуги, блог, о компании. Оптимальное решение для малого и среднего бизнеса.', path: '/web-development/multipage-site' },
      { id: 'restaurant', title: 'Сайт для ресторана', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920', description: 'Элегантный сайт с меню, системой бронирования и фотогалереей. Создает правильную атмосферу и привлекает новых гостей.', path: '/web-development/restaurant-site' },
      { id: 'courses', title: 'Платформа онлайн-курсов', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1920', description: 'Система для продажи образовательных продуктов: личные кабинеты, уроки, тесты и сертификаты. Монетизируйте свою экспертизу.', path: '/web-development/designer-site' },
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
            style={{ width, height }}
            className="relative isolate overflow-hidden bg-[#0a0a0b]"
        >
            <div ref={sceneRef} className="absolute inset-0 z-[1] h-full w-full pointer-events-none" />

            <div className="relative z-20 flex flex-col h-full w-full">
                
                <div className="flex h-screen w-full items-center justify-center p-8 transition-all duration-500 ease-in-out">
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
                        
                        {/* =================================================================================== */}
                        {/* --- НАЧАЛО ИЗМЕНЕНИЙ --- */}
                        {/* Меняем пустую функцию на вызов navigate */}
                        <PrismaticButton
                            onClick={() => navigate('/Services')}
                            className="mt-10 w-full inline-flex items-center"
                            colors={['#f3f4f6', '#d1d5db', '#6b7280']}
                            hoverColors={['#e5e7eb', '#d1d5db', '#9ca3af']}
                        >
                            Наши Услуги
                            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                        </PrismaticButton>
                        {/* --- КОНЕЦ ИЗМЕНЕНИЙ --- */}
                        {/* =================================================================================== */}

                    </div>
                </div>

                <div className="w-full text-center py-10 px-4 sm:p-8">
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
                                <WorkCard {...card} onLearnMore={() => handleLearnMore(card.path)} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                
                <div className="flex h-screen w-full items-center justify-center">
                    <ResponsiveDemo />
                </div>
            </div>
        </div>
    );
};
  
export default LineBackgroundComponent;