import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../Components/other/Footer.jsx';
import '../index.css';

// --- ИМПОРТЫ ДЛЯ ФОНА ---
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';


// --- Вспомогательные компоненты и хуки ---

const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isIntersecting];
};

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Highlight = ({ children }) => (
    <span className="text-blue-300 bg-blue-500/10 px-2 py-1 rounded-md font-bold">
        {children}
    </span>
);


// --- Главный компонент страницы ---
export default function About() {
    
    // --- НАЧАЛО ЛОГИКИ ДЛЯ ФОНА ---
    const backgroundContainerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        const container = backgroundContainerRef.current;
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
                
                #define BACKGROUND_COLOR      vec3(0.0, 0.0, 0.0)
                #define GLOW_SPREAD           0.10
                #define GLOW_INTENSITY        1.0
                
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

                vec3 drawGlow(vec2 uv, vec2 start, vec2 end, float time) {
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

                    // 👇 ИЗМЕНЕНИЕ ЗДЕСЬ: Растягиваем отрезок за пределы экрана
                    vec2 start_point = vec2(-3.0, 0.0); 
                    vec2 end_point = vec2(3.0, 0.0);

                    vec3 light_effect = drawGlow(uv, start_point, end_point, iTime);
                    
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
          if (!rendererRef.current || !container) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          rendererRef.current.setSize(width, height);
          shaderMaterial.uniforms.iResolution.value.set(width, height);
        };
        updateSize();

        function animate() {
          animationIdRef.current = requestAnimationFrame(animate);
          const time = performance.now() * 0.001;
          shaderMaterial.uniforms.iTime.value = time;
          rendererRef.current.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', updateSize);

        return () => {
          window.removeEventListener('resize', updateSize);
          if(animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
          if (sceneElement && rendererRef.current && rendererRef.current.domElement && sceneElement.contains(rendererRef.current.domElement)) {
            sceneElement.removeChild(rendererRef.current.domElement);
          }
          if(rendererRef.current) rendererRef.current.dispose();
        };
    }, []);
    // --- КОНЕЦ ЛОГИКИ ДЛЯ ФОНА ---

    return (
        <div className="min-h-screen bg-transparent text-gray-200 overflow-x-hidden">
            <div
                ref={backgroundContainerRef}
                className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
            >
                <div ref={sceneRef} className="absolute inset-0" />
            </div>

            <div className="relative z-10">
                <header className="relative w-full">

                    <div className="min-h-screen flex flex-col justify-between p-8 md:p-12">
                        <div className="w-full flex justify-between items-start font-receipt text-sm uppercase text-gray-500">
                            <span>NSBH / О НАС</span>
                            <span>ЦИФРОВАЯ АРХИТЕКТУРА</span>
                            <span>(EST. 2021)</span>
                        </div>
                        <div className="my-auto w-full text-center">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="font-unbounded font-black text-6xl md:text-9xl xl:text-[12rem] uppercase text-white leading-none tracking-tighter"
                            >
                                NSBH_
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="font-muller text-xl md:text-3xl text-blue-400 mt-4 tracking-wider"
                            >
                                _NOT STANDARD, BUT HONEST
                            </motion.p>
                        </div>
                        <div className="w-full text-center font-muller text-gray-400">
                            <p>Мы не создаем сайты. Мы проектируем опыт.</p>
                        </div>
                    </div>

                    <section className="relative w-full py-24 md:py-32 overflow-hidden">
                        <div className="absolute top-8 left-0 w-full flex overflow-hidden whitespace-nowrap font-ppneue text-6xl md:text-8xl uppercase text-zinc-800 select-none z-0">

                        </div>
                        <div className="relative z-10 flex justify-center px-8 md:px-12 mt-20">
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.8}}
                                className="font-muller text-xl md:text-2xl text-gray-300 space-y-8 leading-loose max-w-4xl text-center lg:text-left"
                            >
                                <p>Цифровой мир <Highlight>перенасыщен</Highlight>. Он устал от безликих лендингов, сделанных под копирку. От рекламы, которая кричит в пустоту, игнорируя контекст.</p>
                                <p>Путь клиента сегодня — это не прямая линия, а сложный лабиринт. Каждое касание с вашим брендом должно быть не просто <Highlight>функциональным</Highlight>, оно должно быть <Highlight>осмысленным</Highlight>. Оно должно вызывать отклик.</p>
                                <p className="font-deutsch text-4xl md:text-5xl text-white pt-8 border-t-2 border-zinc-700">Мы проектируем ясность.</p>
                            </motion.div>
                        </div>
                    </section>

                    <section id="laboratory" className="relative w-full min-h-screen py-24 md:py-32 px-8 md:px-12 overflow-hidden">
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.zinc.900)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.900)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
                        </div>
                        <motion.div 
                            className="relative z-10 w-full max-w-7xl mx-auto space-y-32 md:space-y-48"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center" variants={fadeInUp}>
                                <div className="absolute -top-16 left-0 z-0 select-none pointer-events-none">
                                    <span className="font-receipt text-[20rem] lg:text-[28rem] text-zinc-800/50 leading-none">01</span>
                                </div>
                                <div className="md:col-span-7 z-10">
                                    <h2 className="font-deutsch text-7xl md:text-9xl text-white uppercase tracking-wider mb-6">ГЕНЕЗИС</h2>
                                    <div className="font-muller text-lg md:text-xl text-gray-300 space-y-6 max-w-2xl leading-relaxed">
                                        <p>NSBH — это ответ на <b className="text-white">профессиональный голод</b>. Каждый из нас прошёл путь, где стандартные методы перестали давать результат. Мы видели, как бюджеты испаряются впустую, а блестящие идеи умирают на этапе слабой реализации.</p>
                                        <p>Мы создали лабораторию, где <b className="text-blue-400">глубина аналитики, точность инжиниринга и эмпатия дизайна</b> сливаются в единый, работающий механизм. Это место, где мы хотели бы работать сами.</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center" variants={fadeInUp}>
                                <div className="absolute -top-16 right-0 z-0 select-none pointer-events-none text-right">
                                    <span className="font-receipt text-[20rem] lg:text-[28rem] text-zinc-800/50 leading-none">02</span>
                                </div>
                                <div className="md:col-start-6 md:col-span-7 z-10 text-left md:text-right">
                                    <h2 className="font-deutsch text-7xl md:text-9xl text-white uppercase tracking-wider mb-6">МЕТОД</h2>
                                    <div className="font-muller text-lg md:text-xl text-gray-300 space-y-6 max-w-2xl leading-relaxed ml-auto">
                                        <p>Мы называем наш подход <b className="text-white">"Системный дизайн бренда"</b> (SBD). Он базируется на трёх ключевых принципах:</p>
                                        <ul className="list-none space-y-4 text-left border-r-2 md:border-l-2 md:border-r-0 border-blue-500 pr-4 md:pl-4 md:pr-0">
                                            <li>
                                                <h4 className="font-bold text-white text-xl">Data-Driven Empathy:</h4>
                                                <p>Данные — это не просто цифры. Это цифровые следы живых людей. Мы ищем в них инсайты, чтобы понять человека по ту сторону экрана.</p>
                                            </li>
                                            <li>
                                                <h4 className="font-bold text-white text-xl">Iterative Architecture:</h4>
                                                <p>Мы не строим месяцами за закрытыми дверями. Мы работаем итерациями, быстро тестируя гипотезы на реальной аудитории, чтобы вовремя корректировать курс.</p>
                                            </li>
                                            <li>
                                                <h4 className="font-bold text-white text-xl">Holistic Experience:</h4>
                                                <p>Рекламный баннер, интерфейс сайта и пост-продажный сервис — части единого опыта. Наша задача — спроектировать этот опыт целиком, без швов.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </section>
                    
                    <section className="w-full py-24 px-8 md:px-12">
                        <h2 className="font-bebas text-6xl md:text-9xl text-white text-center mb-16">Команда — это ДНК компании.</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                {name: "Алексей В.", role: "CEO, Главный стратег"},
                                {name: "Елена С.", role: "CTO, Архитектор систем"},
                                {name: "Дмитрий П.", role: "Head of Marketing"},
                                {name: "Анна К.", role: "Art Director, UX Lead"},
                            ].map((member, index) => (
                                <div key={index} className="relative aspect-[3/4] group">
                                    <div className="absolute inset-0 bg-black border-2 border-zinc-700 transition-colors duration-300 group-hover:border-blue-500"></div>
                                    <div className="absolute -bottom-8 -right-8 bg-zinc-800 p-4 font-muller w-full group-hover:bg-blue-500 transition-colors duration-300">
                                        <h4 className="font-bold text-lg md:text-2xl text-white">{member.name}</h4>
                                        <p className="text-sm md:text-base text-gray-400 group-hover:text-white">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <Footer 
                        topButtonText="Наши Услуги" 
                        topButtonLink="/services"
                    />

                </header>
            </div>
        </div>
    );
}