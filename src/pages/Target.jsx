import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/other/Navbar";
import Footer from "../Components/other/Footer";
import Silk from "../Components/background/Silk";
import '../index.css';

// --- Иконки (без изменений) ---
const strategyIcons = [
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21h4v-9h7V8h-7V2h-4v6H3v4h7v9z" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13V5a2 2 0 012-2h6l4 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m5-4h4" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h5M5 19v-5h5m10-4v5h-5M19 5v5h-5" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2" /></svg>,
    (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v4" /></svg>,
];

// --- Главный компонент страницы ---
export default function PremiumVkTarget() {

    // --- ОБЩИЕ КОМПОНЕНТЫ ДЛЯ СТИЛИЗАЦИИ ---

    // Анимация для плавного появления секций
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Общий компонент для заголовков секций
    const SectionHeader = ({ title, subtitle }) => (
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}>{title}</h2>
            <p className="text-xl text-gray-400">{subtitle}</p>
        </div>
    );
    
    // Унифицированный стиль для всех карточек
    const cardClasses = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20 hover:scale-[1.02] hover:bg-white/10";


    return (
        <div className="bg-[#0c0c14] text-gray-300 min-h-screen font-sans">
            
            {/* Глобальный фон Silk и эффект "прожектора" */}
            <div className="fixed inset-0 z-0 opacity-70">
                <Silk
                  speed={5}
                  scale={3}
                  noiseIntensity={1.5}
                  rotation={240}
                />
            </div>
            <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(20,22,38,0)_0%,_rgba(12,12,20,1)_90%)]"></div>

            {/* Контент страницы */}
            <div className="relative z-20">
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
                    <div className="container mx-auto px-6 py-20">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white" style={{ textShadow: '0 0 25px rgba(255, 255, 255, 0.1)' }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Премиум-таргетинг</span><br /> для вашего бизнеса в ВК
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                        >
                            Профессиональная настройка рекламы с гарантией результата. Приводим клиентов, а не просто клики.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row justify-center items-center gap-6"
                        >
                            <a href="#contact" className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-8 py-4 rounded-lg font-bold text-lg text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105">
                                Получить консультацию
                            </a>
                            <a href="#cases" className="bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 px-8 py-4 rounded-lg font-bold hover:scale-105">
                                Смотреть кейсы
                            </a>
                        </motion.div>
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

                {/* --- Case Studies --- */}
                <motion.section id="cases" className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                        <SectionHeader title="Реальные кейсы" subtitle="Результаты, выраженные в цифрах." />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[ { title: "E-commerce: Магазин косметики", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9", metrics: [{ value: "+340%", label: "ROI" }, { value: "72 ₽", label: "Цена лида" }, { value: "5.8%", label: "CTR" }] }, { title: "EdTech: Онлайн-курсы", image: "https://images.unsplash.com/photo-1542621334-a254cf47733d", metrics: [{ value: "+420%", label: "Конверсия" }, { value: "-58%", label: "CPL" }, { value: "8.2%", label: "CTR" }] }, { title: "Офлайн: Фитнес-клуб", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f", metrics: [{ value: "230+", label: "Абонементов" }, { value: "5.2x", label: "Окупаемость" }, { value: "4.5%", label: "CTR" }] } ].map((caseItem) => (
                                <div key={caseItem.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-white/20 hover:scale-[1.02] hover:bg-white/10">
                                    <div className="h-56 relative overflow-hidden">
                                        <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <h3 className="absolute bottom-5 left-5 text-xl font-bold text-white">{caseItem.title}</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            {caseItem.metrics.map((metric) => (
                                                <div key={metric.label} className="text-center">
                                                    <div className="text-3xl font-bold text-blue-400">{metric.value}</div>
                                                    <div className="text-sm text-gray-500 uppercase tracking-wider">{metric.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- Pricing --- */}
                <motion.section className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                        <SectionHeader title="Тарифы" subtitle="Прозрачные условия для любых задач."/>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                            {[ { name: "Старт", price: "15 000 ₽", description: "Для тестирования ниши", features: ["1 рекламная кампания", "Анализ 2 сегментов ЦА", "5 креативов", "Итоговый отчет"], popular: false, cta: "Начать" }, { name: "Оптимальный", price: "35 000 ₽", description: "Стабильный поток клиентов", features: ["3 рекламные кампании", "Полный анализ ЦА", "15 креативов + A/B тесты", "Ретаргетинг", "Еженедельные отчеты", "Оптимизация в процессе"], popular: true, cta: "Выбрать Оптимальный" }, { name: "Премиум", price: "75 000 ₽", description: "Максимальный результат", features: ["∞ рекламных кампаний", "Индивидуальная стратегия", "30+ креативов и видео", "Полная аналитика", "Ежедневный мониторинг", "Гарантия результата по KPI"], popular: false, cta: "Обсудить проект" } ].map((plan) => (
                                <div key={plan.name} className={`bg-white/5 backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 relative ${plan.popular ? "border-2 border-blue-500/80 scale-105 shadow-2xl shadow-blue-500/10" : "border border-white/10"}`}>
                                    {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Популярный</div>}
                                    <h3 className="text-2xl font-bold mb-1 text-white">{plan.name}</h3>
                                    <p className="text-gray-400 mb-6 min-h-[40px]">{plan.description}</p>
                                    <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <svg className="w-5 h-5 mr-3 mt-1 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="#contact" className={`block text-center w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 hover:scale-105 ${plan.popular ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20" : "bg-white/10 text-white hover:bg-white/20"}`}>
                                        {plan.cta}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- Work Process --- */}
                <motion.section className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                    <div className="max-w-4xl mx-auto px-6">
                        <SectionHeader title="Процесс работы"/>
                        <div className="relative">
                            {/* Градиентная линия таймлайна */}
                            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-400/50 to-transparent"></div>
                            <ol className="space-y-16">
                                {['Бриф и стратегия', 'Анализ и подготовка', 'Запуск и тесты', 'Оптимизация', 'Масштабирование'].map((step, index) => (
                                    <li key={step} className="ml-12 relative">
                                        <div className="absolute -left-[2.1rem] w-10 h-10 bg-gray-900 border-2 border-blue-500 rounded-full flex items-center justify-center font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                            0{index + 1}
                                        </div>
                                        <h3 className="text-2xl font-bold text-blue-300">{step}</h3>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </motion.section>
                
                {/* --- FAQ --- */}
                <motion.section className="py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6 max-w-4xl">
                        <SectionHeader title="Вопросы и ответы" subtitle="Всё, что вы хотели знать."/>
                        <div className="space-y-4">
                            {[ { question: "Как быстро вы сможете запустить рекламу?", answer: "Стандартный срок запуска — 2-3 рабочих дня после брифинга, сбора всей необходимой информации и материалов. В сложных проектах подготовка может занять до 5 дней." }, { question: "Какие гарантии вы предоставляете?", answer: "Для тарифов 'Оптимальный' и 'Премиум' мы фиксируем ключевые показатели эффективности (KPI) в договоре. В случае недостижения целей, мы продолжаем работу за свой счет до их выполнения." }, { question: "Какой рекламный бюджет мне нужен?", answer: "Мы рекомендуем начинать с бюджета от 30 000 ₽ в месяц для эффективного тестирования гипотез. Оптимальный бюджет зависит от вашей ниши, целей и конкуренции, и мы поможем его рассчитать." }, { question: "С какими нишами вы не работаете?", answer: "Мы не работаем с тематиками, запрещенными законодательством РФ и правилами ВКонтакте, включая азартные игры, финансовые пирамиды, табачную и алкогольную продукцию, и т.д." } ].map((item) => (
                                <details key={item.question} className={`${cardClasses} p-6 cursor-pointer group`}>
                                    <summary className="font-bold text-lg text-white list-none flex justify-between items-center">
                                        {item.question}
                                        <span className="text-gray-400 transform transition-transform duration-300 group-open:rotate-45 text-2xl font-light">+</span>
                                    </summary>
                                    <p className="text-gray-400 mt-4 pt-4 border-t border-white/10">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* --- CTA --- */}
                <motion.section id="contact" className="py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
                    <div className="container mx-auto px-6">
                       <div className={`${cardClasses} max-w-4xl mx-auto py-16 text-center`}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Готовы увеличить продажи?</h2>
                            <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto">
                                Оставьте заявку и получите бесплатный аудит вашей ниши и прогноз результатов.
                            </p>
                            <a href="#" className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 px-10 py-5 rounded-lg font-bold text-lg inline-block shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105">
                                Начать работу
                            </a>
                       </div>
                    </div>
                </motion.section>
                
                <Footer />
            </div>
        </div>
    );
}