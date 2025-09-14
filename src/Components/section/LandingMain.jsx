import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import image2 from '../../assets/285.png'; // Убедитесь, что путь к вашему изображению верный

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ И ИКОНКИ ---

const AnimatedBackground = () => (
    <div className="absolute inset-0 z-0 bg-[#111111] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:30px_30px]" />
        <motion.div 
            className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full"
            style={{ filter: 'blur(100px)' }}
            animate={{ scale: [1, 1.3, 1], x: [-100, 100, -100] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full"
            style={{ filter: 'blur(100px)' }}
            animate={{ scale: [1, 1.3, 1], y: [100, -100, 100] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
    </div>
);

const SectionTitle = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    return (
        <motion.h2 ref={ref} className="text-4xl md:text-5xl font-bold font-unbounded text-zinc-100 text-center mb-16 tracking-tight" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.h2>
    );
};

const CheckIcon = () => <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const ChevronDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

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
        return () => { if (currentRef) currentRef.removeEventListener('mousemove', handleMouseMove) };
    }, [mouseX, mouseY]);

    return (
        <section ref={ref} className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-tight tracking-tighter font-unbounded font-bold text-white">
                    Лендинг как <span className="italic">произведение</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
                        цифрового искусства.
                    </span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mx-auto mt-8 font-inter">
                    Мы — студия, которая специализируется на создании высококонверсионных лендингов с незабываемыми Parallax-эффектами. Ваш продукт заслуживает презентации, которая станет легендой.
                </p>
                <div className="mt-10">
                    <motion.button whileHover={{ scale: 1.05, y:-2 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-lg shadow-white/10 transition-shadow">
                        Начать проект
                    </motion.button>
                </div>
            </motion.div>
            
            <motion.div style={{ perspective: 1500, x: springX, y: springY }} className="absolute w-[clamp(300px,80vw,600px)] aspect-video">
                <motion.img src={image2} alt="Пример лендинга" className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-zinc-800"
                    style={{
                        rotateX: useTransform(springY, [-300, 300], [10, -10]),
                        rotateY: useTransform(springX, [-300, 300], [-10, 10]),
                    }}
                />
            </motion.div>
        </section>
    );
};

const TrustBar = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const logos = ["QuantumLeap", "Stratos", "Zenith", "Apex", "Nova"];
    return (
        <section ref={ref} className="max-w-5xl mx-auto py-12 text-center">
            <motion.p initial={{ opacity:0 }} animate={isInView ? {opacity: 0.6} : {}} transition={{duration: 0.8}} className="text-zinc-500 font-semibold mb-8 text-sm tracking-widest uppercase">НАМ ДОВЕРЯЮТ ВЕДУЩИЕ БРЕНДЫ И СТАРТАПЫ</motion.p>
            <motion.div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                {logos.map(logo => <motion.div key={logo} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 0.4, y: 0 } }} className="text-2xl font-bold text-zinc-600 font-unbounded grayscale transition hover:grayscale-0 hover:text-zinc-200">{logo}</motion.div>)}
            </motion.div>
        </section>
    );
};

const FeaturesSection = () => { /* ... реализация будет здесь ... */ };

const ProcessSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
    const stages = [ { title: "Анализ и Стратегия", description: "Глубокий анализ вашей ЦА и конкурентов. Формирование УТП и KPI." }, { title: "Прототип и Дизайн", description: "Создание wireframe и визуального стиля, который работает на конверсию." }, { title: "Разработка", description: "Чистый код, адаптивная верстка и интеграция с CRM, аналитикой." }, { title: "Запуск и поддержка", description: "Перенос на хостинг, A/B тестирование и передача проекта с инструкциями." }, ];
    return ( <section ref={ref} className="max-w-3xl mx-auto relative py-16"> <SectionTitle>Наш процесс: прозрачность и результат</SectionTitle> <motion.div className="absolute left-4 top-0 w-1 bg-zinc-700 h-full origin-top" style={{ scaleY: lineHeight }}/> <div className="space-y-24"> {stages.map((stage, index) => { const itemRef = useRef(null); const isInView = useInView(itemRef, { once: true, amount: 0.5 }); return ( <motion.div ref={itemRef} key={index} className="relative pl-16"> <motion.div className={`absolute -left-4 top-1 w-8 h-8 rounded-full border-4 ${isInView ? 'bg-white border-white' : 'bg-zinc-800 border-zinc-700'} transition-colors duration-500`} /> <motion.div initial={{ opacity: 0.5, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}> <h3 className="text-2xl font-bold mb-2 text-white font-unbounded">{`0${index + 1}. ${stage.title}`}</h3> <p className="text-zinc-400 font-inter">{stage.description}</p> </motion.div> </motion.div> ); })} </div> </section> );
};

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const plans = [ { title: "Старт", price: "49k", popular: false, features: ["Дизайн по шаблону", "До 6 блоков", "Адаптивная верстка", "Форма обратной связи"] }, { title: "Про", price: "89k", popular: true, features: ["Уникальный дизайн", "До 10 блоков", "Микро-анимации", "Интеграция с CRM", "SEO-оптимизация"] }, { title: "Энтерпрайз", price: "149k+", popular: false, features: ["Эксклюзивный дизайн", "Неограниченные блоки", "3D/параллакс эффекты", "Полный маркетинг-кит"] } ];
    return ( <section ref={ref} className="max-w-6xl mx-auto"> <SectionTitle>Прозрачные тарифы для вашего роста</SectionTitle> <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{visible: {transition:{staggerChildren: 0.15}}}} > {plans.map(p => ( <motion.div key={p.title} variants={{hidden: {y:50, opacity:0}, visible: {y:0, opacity:1}}} className={`relative p-8 rounded-3xl border ${p.popular ? 'border-zinc-600 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50'}`}> {p.popular && <div className="absolute -top-3 left-8 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase">Популярный</div>} <h3 className="text-2xl font-bold mb-2 text-white font-unbounded">{p.title}</h3> <div className="text-5xl font-extrabold mb-6 text-white">{p.price}<span className="text-zinc-400 text-lg ml-1">₽</span></div> <ul className="space-y-4 mb-8"> {p.features.map(f => (<li key={f} className="flex items-center gap-3"><CheckIcon /><span className="text-zinc-300 font-inter">{f}</span></li>))} </ul> <button className={`w-full py-3 mt-auto rounded-full font-semibold ${p.popular ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-white'} transition-colors`}>Выбрать тариф</button> </motion.div> ))} </motion.div> </section> );
};

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const faqs = [ { q: "Сколько времени занимает разработка лендинга?", a: "В среднем, процесс от первого звонка до запуска занимает от 2 до 4 недель для тарифа 'Про'. Сроки для 'Энтерпрайз' проектов обсуждаются индивидуально, так как зависят от сложности 3D и интерактивных элементов." }, { q: "Что входит в стоимость поддержки?", a: "Мы предлагаем пакеты поддержки, которые включают хостинг, регулярное обновление контента, мониторинг производительности и консультации по дальнейшему развитию и A/B-тестированию." }, { q: "Вы работаете по договору?", a: "Безусловно. Мы работаем как с юридическими, так и с физическими лицами и заключаем официальный договор, в котором прописаны все этапы, сроки и стоимость работ." } ];
    return(
        <section className="max-w-3xl mx-auto py-16">
            <SectionTitle>Ответы на частые вопросы</SectionTitle>
            <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                    <button onClick={() => setActiveIndex(activeIndex === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center">
                        <span className="text-lg font-semibold text-white font-inter">{faq.q}</span>
                        <motion.div animate={{ rotate: activeIndex === i ? 180 : 0}} className="text-white ml-4 flex-shrink-0"><ChevronDown /></motion.div>
                    </button>
                    <AnimatePresence>
                        {activeIndex === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                                <p className="p-6 pt-0 text-zinc-400 font-inter">{faq.a}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
            </div>
        </section>
    );
}

// === ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ ===
export default function LandingMain() {
  return (
    <div className="w-full text-white bg-[#111] font-sans overflow-x-hidden relative">
      <AnimatedBackground />
      <main className="relative z-10 space-y-32 pb-24">
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <ProcessSection />
        <PricingSection />
        <FaqSection />
      </main>
    </div>
  );
}