import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../Components/other/Navbar.jsx';
import Footer from '../Components/other/Footer.jsx';
import '../index.css';

// --- Вспомогательные компоненты и хуки ---
import { useState, useEffect, useRef } from 'react';

// Хук для отслеживания видимости элемента на экране
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

// Варианты анимаций для Framer Motion
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

// Компонент для стилизованного выделения текста
const Highlight = ({ children }) => (
    <span className="text-blue-300 bg-blue-500/10 px-2 py-1 rounded-md font-bold">
        {children}
    </span>
);


// --- Главный компонент страницы ---
export default function About() {
    const manifestoRef = useRef(null);
    const { scrollYProgress: manifestoScroll } = useScroll({
        target: manifestoRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(manifestoScroll, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(manifestoScroll, [0, 1], ["0%", "-25%"]);
    const x = useTransform(manifestoScroll, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-x-hidden">
        <div className="fixed inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-50"></div>
        <Navbar />

        <header className="relative w-full min-h-screen flex flex-col justify-between p-8 md:p-12">
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
        </header>

        <section ref={manifestoRef} className="relative w-full bg-zinc-900 border-y-2 border-zinc-800 py-24 md:py-32 overflow-hidden">
             <div className="absolute top-8 left-0 w-full flex overflow-hidden whitespace-nowrap font-ppneue text-6xl md:text-8xl uppercase text-zinc-800 select-none z-0">
                <motion.div className="flex" animate={{ x: ['0%', '-100%'] }} transition={{ ease: 'linear', duration: 30, repeat: Infinity }}>
                    {[...Array(5)].map((_, i) => <span key={i} className="mx-8">DECONSTRUCT · REBUILD ·</span>)}
                </motion.div>
                <motion.div className="flex" animate={{ x: ['0%', '-100%'] }} transition={{ ease: 'linear', duration: 30, repeat: Infinity }}>
                    {[...Array(5)].map((_, i) => <span key={i} className="mx-8">DECONSTRUCT · REBUILD ·</span>)}
                </motion.div>
             </div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-8 md:px-12 mt-20">
                 <div className="relative aspect-square flex items-center justify-center h-[400px] lg:h-auto">
                    <motion.h2 
                        style={{ y: y1 }}
                        className="font-bebas text-[15rem] md:text-[20rem] xl:text-[25rem] absolute text-zinc-900 leading-none select-none"
                    >
                        ШАБЛОН
                    </motion.h2>
                    {/* ===== ИСПРАВЛЕННЫЙ БЛОК ===== */}
                    <motion.h2 
                        style={{ 
                            y: y2, 
                            x: x,
                            WebkitTextStroke: '2px var(--tw-color-zinc-700)' 
                        }}
                        className="font-bebas text-[15rem] md:text-[20rem] xl:text-[25rem] absolute text-transparent leading-none select-none"
                    >
                        ШАБЛОН
                    </motion.h2>
                    {/* ===== КОНЕЦ ИСПРАВЛЕННОГО БЛОКА ===== */}
                 </div>
                 <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="font-muller text-xl md:text-2xl text-gray-300 space-y-8 leading-loose"
                >
                    <p>
                        Цифровой мир <Highlight>перенасыщен</Highlight>. Он устал от безликих лендингов, сделанных под копирку. От рекламы, которая кричит в пустоту, игнорируя контекст.
                    </p>
                    <p>
                        Путь клиента сегодня — это не прямая линия, а сложный лабиринт. Каждое касание с вашим брендом должно быть не просто <Highlight>функциональным</Highlight>, оно должно быть <Highlight>осмысленным</Highlight>. Оно должно вызывать отклик.
                    </p>
                    <p className="font-deutsch text-4xl md:text-5xl text-white pt-8 border-t-2 border-zinc-700">
                        Мы проектируем ясность.
                    </p>
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

        <section className="w-full bg-zinc-900 py-24 px-8 md:px-12 border-y-2 border-zinc-800">
             <h2 className="font-bebas text-6xl md:text-9xl text-white text-center mb-16">Команда — это ДНК компании.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                    {name: "Алексей В.", role: "CEO, Главный стратег"},
                    {name: "Елена С.", role: "CTO, Архитектор систем"},
                    {name:- "Дмитрий П.", role: "Head of Marketing"},
                    {name: "Анна К.", role: "Art Director, UX Lead"},
                 ].map((member, index) => (
                    <div key={index} className="relative aspect-[3/4] group">
                        <div className="absolute inset-0 bg-black border-2 border-zinc-700 transition-colors duration-300 group-hover:border-blue-500">
                        </div>
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
    </div>
  );
}