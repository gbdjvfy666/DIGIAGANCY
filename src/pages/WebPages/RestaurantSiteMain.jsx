import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import restaurantImage from '../../assets/1.png'; // Убедитесь, что путь к вашему изображению верный

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ И ИКОНКИ ---

const AnimatedBackground = () => (
    // ИСПРАВЛЕНИЕ: position: absolute, чтобы фон оставался внутри родительского контейнера
    <div className="absolute inset-0 z-0 bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[length:30px_30px]" />
        <motion.div 
            className="absolute top-0 left-0 w-1/2 h-1/2 bg-amber-400/10 rounded-full"
            style={{ filter: 'blur(120px)' }}
            animate={{ scale: [1, 1.3, 1], x: [-150, 150, -150], y: [-50, 50, -50] }}
            transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div 
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-amber-400/10 rounded-full"
            style={{ filter: 'blur(120px)' }}
            animate={{ scale: [1, 1.3, 1], x: [150, -150, 150], y: [50, -50, 50] }}
            transition={{ duration: 35, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
    </div>
);

const SectionTitle = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    return (
        <motion.h2 ref={ref} className="text-4xl md:text-5xl font-bold font-serif text-zinc-100 text-center mb-16 tracking-tight" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.h2>
    );
};

const MenuIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const CartIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>;
const PlaceholderDish = () => ( <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center"><svg className="w-16 h-16 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>);


// --- ГЛАВНЫЕ СЕКЦИИ СТРАНИЦЫ ---

const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative w-full min-h-screen flex flex-col justify-center px-6 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 z-0 h-full w-full">
                <motion.img src={restaurantImage} alt="Интерьер ресторана" className="object-cover w-full h-full" style={{ scale: imageScale, opacity: imageOpacity }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"/>
            </motion.div>
            <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-tight tracking-tighter font-serif font-bold text-white uppercase">
                    Цифровое Искусство <br/> <span className="italic font-light text-amber-400">Гостеприимства.</span>
                </h1>
                <p className="text-xl text-zinc-300 max-w-3xl leading-relaxed mx-auto">
                    Мы создаем элегантные цифровые витрины, которые отражают душу вашего ресторана, привлекают новых гостей и повышают их лояльность через безупречный дизайн и интуитивную функциональность.
                </p>
                <div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-lg shadow-white/10 transition-shadow">
                        Получить предложение
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

const WhatWeDoSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const features = [
        { icon: <MenuIcon />, title: "Изысканные Меню", description: "Интерактивные меню с профессиональными фото, описаниями, фильтрами и рекомендациями от шефа." },
        { icon: <ClockIcon />, title: "Бронирование без усилий", description: "Интеграция систем онлайн-бронирования, которые упрощают процесс для гостя и вашего персонала." },
        { icon: <CartIcon />, title: "Онлайн-заказы", description: "Эффективные E-commerce системы для доставки и самовывоза с онлайн-оплатой и трекингом." }
    ];
    return (
        <section ref={ref} className="max-w-7xl mx-auto px-6">
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
                {features.map((item) => (
                    <motion.div key={item.title} className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-white/5 hover:border-zinc-700 transition-all duration-300" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10 }}>
                        <div className="text-amber-400 w-12 h-12 mb-6">{item.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-zinc-100 font-serif">{item.title}</h3>
                        <p className="text-zinc-400">{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const MenuShowcaseSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    return (
        <section ref={ref} className="max-w-7xl mx-auto px-6">
            <SectionTitle>Меню для любого стиля</SectionTitle>
            <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                <motion.div variants={{hidden: {opacity:0, y:50}, visible: {opacity:1, y:0}}} className="space-y-4">
                    <h3 className="text-2xl font-serif text-zinc-300">Стиль <span className="italic">"Классика"</span></h3>
                    <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 flex justify-between items-center"><h4 className="text-lg font-bold text-white">Филе-миньон</h4><span className="text-lg font-mono text-amber-400">3200₽</span></div>
                    <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 flex justify-between items-center"><h4 className="text-lg font-bold text-white">Дорадо в соли</h4><span className="text-lg font-mono text-amber-400">2800₽</span></div>
                </motion.div>
                <motion.div variants={{hidden: {opacity:0, y:50}, visible: {opacity:1, y:0}}} className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 flex gap-6 overflow-hidden lg:col-span-2">
                    <div className="w-40 h-40 rounded-md flex-shrink-0"><PlaceholderDish /></div>
                    <div className="flex-grow flex flex-col">
                        <h3 className="text-2xl font-serif text-zinc-300">Стиль <span className="italic">"Модерн"</span></h3>
                        <h4 className="text-lg font-bold text-white mt-4">Деконструированный тартар из тунца</h4>
                        <p className="text-sm text-zinc-400 mt-1 flex-grow">Тунец, авокадо, васаби, соево-цитрусовый соус</p>
                        <span className="text-lg font-mono text-amber-400 mt-2 inline-block">1800₽</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

const OrderAnatomySection = ({ cartItems, setCartItems }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, amount: 0.2});
    const [orderStep, setOrderStep] = useState(1);
    const pizzaDemo = { name: 'Пицца Маргарита', price: 950 };
    const addToCart = (item) => { if(!cartItems.some(i => i.name === item.name)) setCartItems(prev => [...prev, item]); setOrderStep(2); };

    return(
        <section ref={ref} className="max-w-7xl mx-auto px-6">
            <SectionTitle>Анатомия Заказа</SectionTitle>
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{visible:{transition:{staggerChildren: 0.1}}}} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div variants={{hidden:{opacity:0, y:50}, visible:{opacity:1, y:0}}} className="lg:pr-8">
                    <h3 className="text-3xl font-bold font-serif mb-4"><span className="text-amber-400">{`0${orderStep}. `}</span>
                      {orderStep === 1 && "Клиент выбирает блюдо"}
                      {orderStep === 2 && "Корзина и онлайн-оплата"}
                      {orderStep === 3 && "Уведомление в ресторан"}
                      {orderStep === 4 && "Подтверждение клиенту"}
                    </h3>
                    <p className="text-zinc-400">
                      {orderStep === 1 && "Гость изучает ваше визуальное, интерактивное меню и одним кликом добавляет блюдо в корзину."}
                      {orderStep === 2 && "Прозрачная корзина показывает заказ. Мы интегрируем безопасные платежные шлюзы, такие как Stripe, для быстрой онлайн-оплаты."}
                      {orderStep === 3 && "Как только платеж подтвержден, ваша команда получает мгновенное уведомление: на кухонный планшет, в вашу POS-систему или через Telegram/Email."}
                      {orderStep === 4 && "Клиент получает автоматическое подтверждение заказа и примерное время доставки или готовности, завершая идеальный цикл обслуживания."}
                    </p>
                </motion.div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {orderStep === 1 && <motion.div key="step1" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="text-center"><h4 className="text-xl font-bold font-serif mb-4">Пицца Маргарита</h4><div className="w-48 h-48 mx-auto rounded-full border-2 border-dashed border-zinc-700 mb-6"><PlaceholderDish/></div><button onClick={() => addToCart(pizzaDemo)} className="px-6 py-2 bg-amber-500 text-black font-bold rounded-full">Добавить за 950₽</button></motion.div>}
                      {orderStep === 2 && <motion.div key="step2" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="w-full"><h4 className="font-bold mb-4">Ваш Заказ</h4>{cartItems.map(item => (<div key={item.name} className="flex justify-between items-center py-2 border-b border-zinc-800"><span>{item.name}</span><span>{item.price}₽</span></div>))}<div className="flex justify-between font-bold mt-2"><span>Итого</span><span>{cartItems.reduce((acc, i) => acc + i.price, 0)}₽</span></div><button onClick={() => setOrderStep(3)} className="mt-6 w-full py-2 bg-white text-black font-bold rounded-full">Оплатить</button></motion.div>}
                      {orderStep === 3 && <motion.div key="step3" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="text-center"><div className="text-5xl mb-4">📲</div><h4 className="font-bold">Новый заказ!</h4><p className="text-zinc-400">Заказ #1203 поступил на кухню.</p><button onClick={() => setOrderStep(4)} className="mt-6 px-6 py-2 border border-zinc-700 rounded-full">Далее</button></motion.div>}
                      {orderStep === 4 && <motion.div key="step4" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="text-center"><div className="text-5xl mb-4">✅</div><h4 className="font-bold">Заказ Подтвержден</h4><p className="text-zinc-400">Ваша пицца будет готова через 25 минут.</p><button onClick={() => {setOrderStep(1); setCartItems([])}} className="mt-6 px-6 py-2 border border-zinc-700 rounded-full">Сбросить</button></motion.div>}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
};

export default function RestaurantSiteMain() {
  const [cartItems, setCartItems] = useState([]);
  
  return (
    // Этот div теперь является оберткой для всей страницы и содержит фон
    <div className="w-full text-zinc-100 bg-[#1a1a1a] font-inter overflow-x-hidden relative isolate">
      <AnimatedBackground />
      {/* Весь контент теперь в main, который лежит поверх фона */}
      <main className="relative z-10 space-y-32 py-10">
        <HeroSection />
        <WhatWeDoSection />
        <MenuShowcaseSection />
        <OrderAnatomySection cartItems={cartItems} setCartItems={setCartItems} />
      </main>
    </div>
  );
}