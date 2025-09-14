import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Иконки
const IconStrategy = () => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconArt = () => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconTech = () => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconCommunity = () => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconInteractive = () => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5"><path d="M13 3L11.5 6L13 9L15 8L17 9L15.5 12L17 15L14 15.5L12 18L10 15.5L7 15L8.5 12L7 9L9 8L11 9L13 6Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21L9 17" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 21L15 17" strokeLinecap="round" strokeLinejoin="round"/></svg>);

const ParallaxHero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY, currentTarget } = event;
            if(!currentTarget) return;
            const { left, top, width, height } = currentTarget.getBoundingClientRect();
            mouseX.set((clientX - left - width / 2) / (width / 2));
            mouseY.set((clientY - top - height / 2) / (height / 2));
        };
        const heroElement = document.getElementById('hero-section');
        if (heroElement) heroElement.addEventListener('mousemove', handleMouseMove);
        return () => { if (heroElement) heroElement.removeEventListener('mousemove', handleMouseMove); };
    }, [mouseX, mouseY]);
    
    const textAndButton = { x: useTransform(springX, v => v * 30), y: useTransform(springY, v => v * 30) };
    const core = { rotateY: useTransform(springX, v => v * 25), rotateX: useTransform(springY, v => -v * 25) };
    const shell1 = { rotateY: useTransform(springX, v => -v * 15), rotateX: useTransform(springY, v => v * 15) };
    const hud1 = { x: useTransform(springX, v => -v * 60), y: useTransform(springY, v => -v * 60) };
    const hud2 = { x: useTransform(springX, v => v * 50), y: useTransform(springY, v => v * 50) };
    const hud3 = { x: useTransform(springX, v => v * 20), y: useTransform(springY, v => v * 20) };
    const glow = { x: useTransform(springX, v => v * 100), y: useTransform(springY, v => v * 100) };

    return(
        <section id="hero-section" className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 md:px-12 text-center" style={{ perspective: '1200px' }}>
            <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-d' }}>
                <motion.div style={{...glow, transform: 'translateZ(-200px)'}} className="absolute w-1/2 h-1/2 bg-lime-500/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <motion.div style={{...hud1, transform: 'translateZ(-80px)'}} className="absolute top-0 left-0 w-1/4 h-1/4 border-l-2 border-t-2 border-lime-400/20" />
                <motion.div style={{...hud2, transform: 'translateZ(-50px)'}} className="absolute bottom-0 right-0 w-1/3 h-1/3 border-r-2 border-b-2 border-emerald-400/20" />
            </motion.div>

            <motion.div className="relative z-10 flex flex-col items-center" style={{ transformStyle: 'preserve-d' }}>
                 <motion.h1 style={{ ...textAndButton, transform: 'translateZ(60px)' }} className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter">
                    <span className="block">Строим Ваше</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                       Цифровое Наследие.
                    </span>
                </motion.h1>
                <motion.p style={{ ...textAndButton, transform: 'translateZ(30px)' }} className="text-lg text-zinc-300 max-w-3xl mt-6 mx-auto">
                    NFT-экосистемы корпоративного уровня с незабываемыми Parallax-эффектами. От гигантов индустрии до прорывных стартапов, наша студия предоставляет комплексные решения, объединяющие передовые технологии и культовое искусство.
                </motion.p>
                <motion.div 
                    style={{...textAndButton, transform: 'translateZ(40px)' }} 
                    className="mt-10"
                >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 25px -5px rgba(50, 255, 100, 0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-600 text-black font-bold rounded-full shadow-lg"
                    >
                      Запланировать консультацию
                    </motion.button>
                </motion.div>
                
                <motion.div
                    style={{...hud3, transform: 'translateZ(150px)' }}
                    className="absolute w-full h-full"
                >
                     <motion.div
                        style={core}
                        className="w-48 h-48 mx-auto mt-72 border-2 border-lime-400/30 rounded-2xl bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    >
                        <motion.div style={shell1} className="w-32 h-32 border-2 border-lime-400/50 rounded-2xl">
                           <motion.div className="w-16 h-16 m-auto mt-8 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl"
                                animate={{ rotateY: 360, rotateX: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: 'linear'}}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

const FeatureItem = ({ icon, title, description, index, colSpan }) => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    
    const handleMouseMove = e => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    return(
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            className={`feature-card relative p-8 rounded-2xl bg-zinc-900/50 border border-lime-400/10 overflow-hidden ${colSpan}`}
        >
            <div className="text-lime-400 mb-4 text-3xl w-8 h-8">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
};

const ProcessStep = ({ number, title, description, index }) => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    return(
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            className="relative pl-12 pb-12 border-l-2 border-lime-400/20"
        >
            <div className="absolute -left-5 top-0 w-10 h-10 bg-zinc-900 border-2 border-lime-400/50 rounded-full flex items-center justify-center font-mono font-bold text-lime-400">
                {number}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400">{description}</p>
        </motion.div>
    );
};

const CaseStudyCard = ({ title, description, tags, result, index }) => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
     return(
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="p-8 rounded-2xl bg-zinc-900/50 border border-lime-400/10 backdrop-blur-md space-y-4 flex flex-col"
        >
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-zinc-400 flex-grow">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => <span key={tag} className="text-xs font-mono bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full">{tag}</span>)}
            </div>
            <div className="pt-4 border-t border-lime-400/10">
                <p className="font-semibold text-white">Результат: <span className="font-normal text-lime-400">{result}</span></p>
            </div>
        </motion.div>
    );
};

const techCategories = {
  "Блокчейн": ["Solidity", "Hardhat", "ERC-721A", "The Graph"],
  "Фронтенд": ["React / Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  "3D и Анимация": ["Three.js", "WebGL", "GSAP", "Blender"],
  "Инфраструктура": ["IPFS", "Vercel", "Node.js", "AWS"],
};

export default function NFTShowcasePage() {
  const techStackRef = useRef(null);
  const [techStackInView, setTechStackInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setTechStackInView(entry.isIntersecting), { threshold: 0.1, triggerOnce: true });
    const currentRef = techStackRef.current;
    if(currentRef) observer.observe(currentRef);
    return () => { if(currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0A0D0B] text-white overflow-hidden relative font-sans">
        <style>{` .feature-card:before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px; background: radial-gradient(400px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), rgba(190, 242, 100, 0.4), transparent 40%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; } @keyframes scanline { 0% { background-position: 0% 0%; } 100% { background-position: 0% 100%; } } `}</style>
        <div className="absolute inset-0 z-0 bg-repeat" style={{ backgroundImage: "radial-gradient(rgba(190, 242, 100, 0.05) 1px, transparent 1px)", backgroundSize: '25px 25px' }} />
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(190, 242, 100, 0.03) 2px, rgba(190, 242, 100, 0.03) 4px)", animation: 'scanline 40s linear infinite', backgroundSize: '100% 8px' }} />
      
        <main className="relative z-10">
            <ParallaxHero />

            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">Наш подход: от Идеи до Экосистемы</h2>
                    <p className="text-zinc-400 max-w-3xl mx-auto">Мы превращаем амбициозные концепции в процветающие цифровые миры. Наш проверенный процесс гарантирует результат, превосходящий ожидания.</p>
                </motion.div>
                <div className="max-w-3xl mx-auto">
                    <ProcessStep number="01" title="Погружение и Стратегия" description="Глубокий анализ вашей идеи, целевой аудитории и рынка. Формируем дорожную карту, токеномику и ключевые метрики успеха (KPI)." index={0} />
                    <ProcessStep number="02" title="Визуальная Концепция и Арт-дирекшн" description="Разрабатываем уникальный визуальный язык вашего проекта. От мудбордов до генерации тысяч уникальных NFT — мы создаем искусство, которое запомнится." index={1} />
                    <ProcessStep number="03" title="Разработка и Инжиниринг" description="Пишем безупречные смарт-контракты (ERC-721A, 1155), создаем высокопроизводительные минтинг-сайты и кастомные платформы с интерактивными элементами." index={2} />
                    <ProcessStep number="04" title="Запуск и Развитие Сообщества" description="Продумываем маркетинговую стратегию, управляем запуском и помогаем в построении лояльного комьюнити в Discord, Twitter и других платформах." index={3} />
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-zinc-900/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter"><span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Кейсы:</span> Наши Проекты в Действии</h2>
                        <p className="text-zinc-400 max-w-3xl mx-auto">Мы решаем бизнес-задачи с помощью технологий и креатива. Вот несколько примеров:</p>
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <CaseStudyCard 
                            title="CyberRonin Chronicles" 
                            description="Генеративная PFP-коллекция в стиле киберпанк с фокусом на высококачественный арт и геймификацию."
                            tags={["ERC-721A", "Generative Art", "Minting Site"]}
                            result="Sold out за 15 минут, объем торгов на вторичном рынке 200 ETH."
                            index={0}
                        />
                        <CaseStudyCard 
                            title="Aetheria Orbs" 
                            description="Иммерсивная 3D-галерея для цифрового художника, представляющая коллекцию анимированных артефактов."
                            tags={["Three.js", "3D Art", "Custom Gallery"]}
                            result="Рекордная цена продажи одного из лотов в 25 ETH, привлечение коллекционеров."
                            index={1}
                        />
                        <CaseStudyCard 
                            title="Project Chimera" 
                            description="Утилитарные NFT для fashion-бренда, предоставляющие доступ к эксклюзивным товарам и мероприятиям."
                            tags={["Utility NFT", "Brand Integration", "DAO"]}
                            result="Повышение вовлеченности аудитории на 300%, полная интеграция с e-commerce платформой."
                            index={2}
                        />
                    </div>
                </div>
            </section>
            
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">Почему Ведущие Бренды Выбирают Нас</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <FeatureItem icon={<IconStrategy />} title="Стратегия" description="Мы не просто исполнители — мы ваши стратегические партнеры, от идеи до запуска и далее." index={0} colSpan="lg:col-span-1"/>
                    <FeatureItem icon={<IconArt />} title="Дизайн & Арт" description="Наша команда создает уникальный визуальный стиль, который выделяет вас на фоне конкурентов." index={1} colSpan="lg:col-span-1"/>
                    <FeatureItem icon={<IconTech />} title="Технологии" description="Разрабатываем надежные смарт-контракты и высокопроизводительные платформы." index={2} colSpan="lg:col-span-1"/>
                    <FeatureItem icon={<IconCommunity />} title="Сообщество" description="Помогаем построить и развить лояльное комьюнити, которое станет ядром вашего проекта." index={3} colSpan="lg:col-span-1"/>
                    <FeatureItem icon={<IconInteractive />} title="Интерактивность" description="Создаем 'вау-эффект' с помощью Parallax и 3D для сайтов, которые невозможно забыть." index={4} colSpan="lg:col-span-1"/>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-zinc-900/20" ref={techStackRef}>
                <div className="max-w-7xl mx-auto">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} animate={techStackInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">Наш Арсенал</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">Мы используем передовой, проверенный в бою стек технологий для достижения безупречного результата.</p>
                    </motion.div>
                    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                        {Object.entries(techCategories).map(([category, techs], i) => (
                            <motion.div key={category} initial={{ opacity: 0, y: 40 }} animate={techStackInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}>
                                <h3 className="text-xl font-bold text-lime-400 mb-4">{category}</h3>
                                <ul className="space-y-3">
                                    {techs.map(tech => <li key={tech} className="text-zinc-400 transition-colors hover:text-white">{tech}</li>)}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 px-6">
              <motion.div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-900/40 via-zinc-900/50 to-lime-900/20 border border-lime-400/30 p-12 text-center backdrop-blur-xl shadow-2xl shadow-lime-500/10" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">У вас есть видение? <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Давайте его построим.</span></h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Расскажите нам о своей идее. Мы проведем бесплатную стратегическую консультацию и предложим оптимальный план ее реализации.</p>
                <motion.button whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 25px -5px rgba(50, 255, 100, 0.2)' }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-600 text-black font-bold rounded-full shadow-lg">
                  Запланировать консультацию
                </motion.button>
              </motion.div>
            </section>

            <footer className="py-12 px-6 border-t border-lime-400/10">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="text-lg font-bold mb-4 md:mb-0">
                    © 2025 Architech.NFT
                </div>
                <div className="flex gap-6">
                  <a href="#" className="text-zinc-400 hover:text-white transition">Telegram</a>
                  <a href="#" className="text-zinc-400 hover:text-white transition">Behance</a>
                  <a href="#" className="text-zinc-400 hover:text-white transition">Twitter</a>
                </div>
              </div>
            </footer>
        </main>
    </div>
  );
}