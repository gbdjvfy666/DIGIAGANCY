import React, { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import Silk from "../Components/background/Silk";
import '../index.css';

// --- Иконки (без изменений) ---
const strategyIcons = [
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21h4v-9h7V8h-7V2h-4v6H3v4h7v9z" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13V5a2 2 0 012-2h6l4 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m5-4h4" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h5M5 19v-5h5m10-4v5h-5M19 5v5h-5" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v4" /></svg>
];

// Ленивая загрузка WebGL-компонента
const PrismaticBurst = lazy(() => import('../Components/PrismaticBurst'));

export default function PremiumVkTarget() {

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const SectionHeader = ({ title, subtitle }) => (
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}>{title}</h2>
            <p className="text-xl text-gray-400">{subtitle}</p>
        </div>
    );
    
    const cardClasses = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20 hover:scale-[1.02] hover:bg-white/10";
    
    const workProcessData = [
        { number: '01', title: 'Бриф и стратегия', description: 'Погружаемся в ваш бизнес, анализируем цели и ЦА, чтобы разработать выигрышную стратегию.' },
        { number: '02', title: 'Анализ и подготовка', description: 'Собираем креативы, пишем тексты, настраиваем аудитории и пиксели ретаргетинга.' },
        { number: '03', title: 'Запуск и тесты', description: 'Запускаем первые кампании. Тестируем гипотезы, креативы и аудитории для поиска лучших связок.' },
        { number: '04', title: 'Оптимизация', description: 'Анализируем результаты и перераспределяем бюджет на самые эффективные объявления.' },
        { number: '05', title: 'Масштабирование', description: 'Увеличиваем рекламный бюджет на проверенные связки, чтобы получить максимум прибыли.' },
    ];
    
    const faqData = [
        { question: "Как быстро вы сможете запустить рекламу?", answer: "Стандартный срок запуска — 2-3 рабочих дня после брифинга, сбора всей необходимой информации и материалов. В сложных проектах подготовка может занять до 5 дней." }, 
        { question: "Какие гарантии вы предоставляете?", answer: "Для тарифов 'Оптимальный' и 'Премиум' мы фиксируем ключевые показатели эффективности (KPI) в договоре. В случае недостижения целей, мы продолжаем работу за свой счет до их выполнения." }, 
        { question: "Какой рекламный бюджет мне нужен?", answer: "Мы рекомендуем начинать с бюджета от 30 000 ₽ в месяц для эффективного тестирования гипотез. Оптимальный бюджет зависит от вашей ниши, целей и конкуренции, и мы поможем его рассчитать." }, 
        { question: "С какими нишами вы не работаете?", answer: "Мы не работаем с тематиками, запрещенными законодательством РФ и правилами ВКонтакте, включая азартные игры, финансовые пирамиды, табачную и алкогольную продукцию, и т.д." } 
    ];

    // Состояния для первой кнопки
    const [isHovered, setIsHovered] = useState(false);
    const defaultColors = ["#a855f7", "#ec4899"]; // Исходный 
    const hoverColors = ["#d8b4fe", "#fda4af"]; 

    // Состояния для второй кнопки
    const [isHovered2, setIsHovered2] = useState(false);
    const defaultColors2 = ["#4f8cff", "#00c6ff"]; // Исходный 
    const hoverColors2 = ["#bfdbfe", "#93c5fd"]; 

    return (
        <div className="bg-[#0c0c14] text-gray-300 min-h-screen font-sans">
            
            <div className="fixed inset-0 z-0 opacity-70">
                <Silk speed={5} scale={3} noiseIntensity={1.5} rotation={240} />
            </div>
            <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(20,22,38,0)_0%,_rgba(12,12,20,1)_90%)]"></div>

            <div className="relative z-20">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col md:flex-row items-center px-6 py-20">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    
                    {/* Левая часть - Заголовок и текст */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h1 
                            className="font-unbounded font-bold text-5xl md:text-7xl leading-tight text-white mb-8 md:mb-12 whitespace-nowrap" 
                            style={{ textShadow: '0 0 25px rgba(255, 255, 255, 0.1)' }}
                        >
                            ТАРГЕТ РЕКЛАМА
                        </h1>

                        <p className="text-xl md:text-2xl font-garet text-gray-300 mb-8 leading-relaxed">
                            Профессиональная настройка рекламы с гарантией результата. <br className="hidden md:inline"/> Приводим клиентов, а не просто клики.
                        </p>

                        {/* КАРТОЧКА */}
                        <div
                            className="bg-white/10 backdrop-blur-md border border-blue-200/20 rounded-xl p-4 flex items-center gap-4 mb-8"
                        >
                            <div>
                                {React.createElement(strategyIcons[2], { className: "w-8 h-8 text-blue-300 shrink-0" })}
                            </div>
                            <p className="text-sm text-blue-100/80">
                                Используем **AI-алгоритмы** для гиперсегментации аудитории и достижения максимального ROI.
                            </p>
                        </div>
                        
                        {/* Кнопки */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <a 
                                href="#contact" 
                                className="relative group w-full sm:w-90 overflow-hidden rounded-lg"
                                onMouseEnter={() => setIsHovered(true)} 
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="absolute inset-0 z-10">
                                    <Suspense fallback={<div className="w-full h-full bg-blue-900/50 rounded-lg" />}>
                                        <PrismaticBurst 
                                            colors={isHovered ? hoverColors : defaultColors} 
                                            animationType="rotate3d" 
                                            intensity={1.5} 
                                            speed={0.4} 
                                            distort={0.8} 
                                            rayCount={14} 
                                        />
                                    </Suspense>
                                </div>
                                <span className="absolute inset-0 z-10 rounded-lg border-2 border-white/50 group-hover:border-white transition-colors duration-300"></span>
                                <div className="relative z-20 flex items-center justify-center px-8 py-4 font-bold text-lg text-white">
                                    Получить консультацию
                                </div>
                            </a>

                            {/* КНОПКА С ФОНОМ */}
                            <a 
                                href="#cases" 
                                className="relative group w-full sm:w-90 overflow-hidden rounded-lg"
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                            >
                                <div className="absolute inset-0 z-10">
                                    <Suspense fallback={<div className="w-full h-full bg-blue-900/50 rounded-lg" />}>
                                        <PrismaticBurst 
                                            colors={isHovered2 ? hoverColors2 : defaultColors2} 
                                            animationType="rotate3d" 
                                            intensity={1.5} 
                                            speed={0.4} 
                                            distort={0.8} 
                                            rayCount={14} 
                                        />
                                    </Suspense>
                                </div>
                                <span className="absolute inset-0 z-10 rounded-lg border-2 border-white/50 group-hover:border-white transition-colors duration-300"></span>
                                <div className="relative z-20 flex items-center justify-center px-8 py-4 font-bold text-lg text-white">
                                    кейсы
                                </div>
                            </a>
                        </div>
                    </div>
                    
                    <div
                        className="hidden md:block w-full md:w-1/2 flex items-center justify-center relative aspect-square max-w-2xl shrink-0"
                    >
                        <span 
                            className="font-black font-monoton text-[29rem] text-white opacity-80 select-none" 
                            style={{ textShadow: '0 0 25px rgba(0,0,0,0.5)' }}
                        >
                            VK
                        </span>
                    </div>
                </div>
            </section>

                {/* --- Trust Badges --- */}
                <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                            {["Более 150+ проектов", "Гарантия ROI от 300%", "Средний CTR 5.8%", "Оплата за результат по KPI"].map((text) => (
                                <div key={text} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.7)]"></div>
                                    <span className="font-medium text-lg tracking-wider">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- Our Approach --- */}
                <motion.section className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                        <SectionHeader title="Наш подход к таргетингу" subtitle="Комплексная стратегия, нацеленная на реальные продажи." />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[ { title: "Глубинный анализ", description: "Изучаем 27 параметров аудитории, включая поведенческие факторы и покупательскую способность." }, { title: "Гиперсегментация", description: "Делим аудиторию на 10+ сегментов, тестируя уникальные креативы для каждого." }, { title: "AI-оптимизация", description: "ИИ корректирует ставки и распределение бюджета для максимальной эффективности." }, { title: "Многоуровневый ретаргетинг", description: "Создаем 7-уровневую воронку для возврата пользователей и увеличения конверсии." }, { title: "Сплит-тестирование", description: "Непрерывно проверяем более 50 вариантов креативов и текстов для выявления лучших." }, { title: "Ежедневный мониторинг", description: "Постоянная аналитика и корректировка кампаний для достижения поставленных KPI." } ].map((item, index) => (
                                <div key={index} className={cardClasses}>
                                    {React.createElement(strategyIcons[index], { className: "w-8 h-8 mb-5 text-blue-400" })}
                                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- Work Process --- */}
                <motion.section className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                        <SectionHeader title="Процесс работы"/>
                        <div className="grid md:grid-cols-5 gap-8">
                            {workProcessData.map((step) => (
                                <div key={step.number} className="text-center relative p-6">
                                    <div className="text-7xl font-bold text-white/10 mb-4">{step.number}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                
                {/* --- FAQ Section --- */}

                <motion.section id="contact" className="py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                       <div className={`${cardClasses} max-w-4xl mx-auto py-16 text-center`}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Готовы увеличить продажи?</h2>
                            <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto">
                                Оставьте заявку и получите бесплатный аудит вашей ниши и прогноз результатов.
                            </p>
                            <a href="#" className="relative group w-full sm:w-auto overflow-hidden inline-block">
                                <span className="absolute inset-0 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors duration-300"></span>
                                <span className="absolute inset-0 z-10 rounded-lg border border-blue-400/50 group-hover:border-blue-300/80 transition-colors duration-300"></span>
                                <div className="relative z-20 flex items-center justify-center px-8 py-4 font-bold text-lg text-white">
                                    Начать работу
                                </div>
                            </a>
                       </div>
                    </div>
                </motion.section>
                
            </div>
        </div>
    );
}