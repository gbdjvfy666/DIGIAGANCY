import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import corporateImage from '../../assets/chrome51.png'; // Убедитесь, что путь верный

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ И ИКОНКИ ---

const AnimatedBackground = () => (
    // ИСПРАВЛЕНИЕ: position: absolute, а не fixed, чтобы не ломать поток документа
    <div className="absolute inset-0 z-0 bg-[#111111] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:30px_30px]" />
    </div>
);

const SectionTitle = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    return (
        <motion.h2 ref={ref} className="text-4xl md:text-5xl font-bold font-unbounded text-zinc-100 text-center mb-20 tracking-tight" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.h2>
    );
};

const ReputationIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const TechIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>;
const UXIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h-4M6 12H2M12 6V2M12 22v-4"/></svg>;

// --- ГЛАВНЫЕ СЕКЦИИ СТРАНИЦЫ ---

const HeroSection = () => {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = ref.current?.getBoundingClientRect();
            if (rect) {
                mouseX.set(e.clientX - rect.left - rect.width / 2);
                mouseY.set(e.clientY - rect.top - rect.height / 2);
            }
        };
        const currentRef = ref.current;
        if (currentRef) currentRef.addEventListener('mousemove', handleMouseMove);
        return () => { if (currentRef) currentRef.removeEventListener('mousemove', handleMouseMove); };
    }, [mouseX, mouseY]);

    return (
        <section ref={ref} className="relative w-full min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-16 px-6 text-left overflow-hidden">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 md:w-1/2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tighter font-unbounded font-bold text-white">
                    Корпоративный сайт — Ваш <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">цифровой актив.</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-xl leading-relaxed mt-8 font-inter">
                    Мы создаем не просто веб-сайты, а элитные цифровые представительства, которые укрепляют репутацию, привлекают инвестиции и становятся ключевым активом вашего бренда.
                </p>
                <div className="mt-10">
                    <motion.button whileHover={{ scale: 1.05, y:-2 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-lg shadow-white/10 transition-shadow">
                        Обсудить ваш проект
                    </motion.button>
                </div>
            </motion.div>
            <div className="relative md:w-1/2 flex justify-center items-center" style={{ perspective: 1200 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1]}} style={{ transformStyle: 'preserve-3d', x: springX, y: springY }}>
                    <motion.div className="absolute -inset-8 bg-zinc-800/20 rounded-3xl" style={{ transform: 'translateZ(-50px)' }} />
                    <motion.img src={corporateImage} alt="Премиальный корпоративный сайт" className="relative rounded-2xl shadow-2xl border-2 border-zinc-800"
                        style={{
                           rotateX: useTransform(springY, [-300, 300], [10, -10]),
                           rotateY: useTransform(springX, [-300, 300], [-10, 10]),
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

const ProblemSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const problems = [ "Не отражает текущий статус и амбиции компании.", "Устаревший дизайн, который отпугивает партнеров.", "Медленная работа и плохая адаптивность.", "Отсутствие четкой структуры для инвесторов и клиентов." ];
    return (
        <section ref={ref} className="max-w-7xl mx-auto px-6">
             <SectionTitle>Ваш текущий сайт — <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">пассив, а не актив?</span></SectionTitle>
             <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ visible: {transition: {staggerChildren: 0.1}} }}>
                {problems.map(problem => (
                    <motion.div key={problem} variants={{ hidden: {opacity:0, y:30}, visible: {opacity:1, y:0} }} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 text-center">
                        <p className="text-zinc-300 font-inter">{problem}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const FeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const features = [ { icon: <ReputationIcon />, title: "Безупречная Репутация", description: "Сайт становится вашим главным PR-инструментом, формируя образ лидера индустрии." }, { icon: <UXIcon />, title: "Пользовательский Опыт (UX)", description: "Продуманная до мелочей структура и навигация, которые предвосхищают ожидания пользователей." }, { icon: <TechIcon />, title: "Технологическое Превосходство", description: "Используем передовой стек, чтобы гарантировать безопасность, скорость и масштабируемость." } ];
    return (
        <section ref={ref} className="max-w-7xl mx-auto px-6">
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
                {features.map((item) => (
                    <motion.div key={item.title} className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-white/5 hover:border-zinc-700 transition-all duration-300" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10 }}>
                        <div className="text-white w-12 h-12 mb-6">{item.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-zinc-100 font-unbounded">{item.title}</h3>
                        <p className="text-zinc-400 font-inter">{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const ProcessSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const stages = [ { title: "Стратегическая сессия", description: "Определяем бизнес-цели, KPI, анализируем рынок и ЦА." }, { title: "Архитектура и Дизайн", description: "Проектируем структуру и создаем эксклюзивный визуальный стиль." }, { title: "Разработка", description: "Реализуем проект на enterprise-уровне с интеграцией систем." }, { title: "Запуск", description: "Развертываем сайт на надежной инфраструктуре и предоставляем поддержку." } ];
    
    return (
        <section ref={ref} className="max-w-7xl mx-auto py-24 px-6">
            <SectionTitle>Архитектурный План Проекта</SectionTitle>
            <motion.div className="relative" initial="hidden" animate={isInView ? "visible" : "hidden"}>
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[12.5%] w-3/4 h-px bg-zinc-800" />
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 left-[12.5%] w-3/4 h-px bg-white"
                    style={{ originX: 0 }}
                    variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.5, delay: 0.5, ease: 'easeInOut' }}}}
                />
                <motion.div
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                >
                    {stages.map((stage, index) => (
                        <motion.div
                            key={index}
                            className="relative flex flex-col items-center text-center"
                            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 rounded-full font-unbounded text-3xl font-bold">
                                0{index + 1}
                            </div>
                            <h3 className="text-2xl font-bold font-unbounded text-white mt-6 mb-3">{stage.title}</h3>
                            <p className="text-zinc-400 font-inter">{stage.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default function CorporateMain() {
  return (
    // Этот div теперь является оберткой для всей страницы и содержит фон
    <div className="w-full text-white bg-[#111] font-inter overflow-x-hidden relative">
      <AnimatedBackground />
      {/* Весь контент теперь в main, который лежит поверх фона */}
      <main className="relative z-10">
        <HeroSection />
        <div className="space-y-32 py-24">
            <ProblemSection />
            <FeaturesSection />
            <ProcessSection />
        </div>
      </main>
    </div>
  );
}