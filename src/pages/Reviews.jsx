import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Components/other/Footer.jsx';
import '../index.css';

// --- ДАННЫЕ ПРОЕКТОВ (дополненные для разнообразия) ---
const projectsData = {
    development: [
        { id: 'dev-1', client: 'Quantum Leap Logistics', title: 'Портал с AI-оптимизацией маршрутов', category: 'Веб-разработка', heroImage: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1920&auto=format&fit=crop', task: 'Разработать B2B-платформу, способную в реальном времени анализировать тысячи точек доставки и строить оптимальные маршруты для 500+ грузовиков, сократив расходы на топливо и время в пути.', process: [ { step: '01. Аналитика и архитектура', description: 'Спроектировали микросервисную архитектуру на Node.js для высокой отказоустойчивости. Выбрали PostGIS для гео-запросов.' }, { step: '02. UX/UI и Frontend', description: 'Создали сложный, но интуитивный интерфейс на React с интерактивной картой на Mapbox, минимизируя количество кликов для диспетчера.' }, { step: '03. Backend и AI', description: 'Разработали ядро системы: генетический алгоритм для решения "задачи коммивояжера", интегрировали нейросеть для предсказания пробок.' }, { step: '04. Тестирование и запуск', description: 'Провели нагрузочное тестирование (2000 RPS). Интегрировали с 1С и GPS-трекерами. Запуск в 3 этапа по регионам.' } ], results: [ { value: '-18%', label: 'Сокращение расходов на ГСМ' }, { value: '+22%', label: 'Увеличено кол-во доставок в день' }, { value: '-40%', label: 'Время на планирование маршрутов' } ] },
        { id: 'dev-2', client: 'Artisan Verse', title: 'E-commerce платформа для NFT-художников', category: 'Веб-разработка', heroImage: 'https://images.unsplash.com/photo-1639754564914-ca0584288b39?q=80&w=1920&auto=format&fit=crop', task: 'Создать маркетплейс, где художники могут минтить и продавать свои NFT-работы. Ключевые требования: интеграция с MetaMask, низкие комиссии (lazy minting), социальный функционал.', process: [], results: [{value: "10k+", label: "Активных пользователей"}, {value: "2M+", label: "Объем торгов ($)"}] },
    ],
    targeting: [
        { id: 'tar-1', client: 'AURA Cosmetics', title: 'Запуск Vegan-косметики в ВК', category: 'VK Таргетинг', heroImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=1920&auto=format&fit=crop', task: 'Обеспечить взрывной старт продаж новой линейки косметики с нуля. KPI: ROMI > 350%, CAC < 450 руб.', process: [ { step: '01. Стратегия и сегментация', description: 'Выделили 5 ключевых сегментов ("эко-активисты", "бьюти-блогеры" и т.д.). Разработали уникальные офферы для каждого.' }, { step: '02. Креативная концепция', description: 'Создали 30+ видео и статичных креативов с фокусом на "clean beauty". Провели A/B тесты текстов с разными триггерами.' }, { step: '03. Многоуровневый ретаргетинг', description: 'Построили воронку от просмотра видео до "дожима" триггерными сообщениями в Senler для тех, кто бросил корзину.' } ], results: [ { value: '412%', label: 'ROMI за 3 месяца' }, { value: '415 руб', label: 'Средний CAC' }, { value: '1.2 млн ₽', label: 'Продаж из ВК' } ] },
        { id: 'tar-2', client: 'IQ Academy', title: 'Продвижение онлайн-курсов по Data Science', category: 'VK Таргетинг', heroImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop', task: 'Привлечь 1000+ регистраций на вебинар со стоимостью лида (CPL) не выше 250 руб.', process: [], results: [{value: "1350+", label: "Регистраций"}, {value: "217 руб", label: "CPL"}, {value: "18%", label: "Конверсия в оплату"}] },
    ],
    design: [
        { id: 'des-1', client: 'Metropolis Bank', title: 'Ребрендинг и дизайн-система для необанка', category: 'Брендинг и Дизайн', heroImage: 'https://images.unsplash.com/photo-1554224155-8d04421cd673?q=80&w=1920&auto=format&fit=crop', task: 'Полностью переосмыслить визуальный язык банка для привлечения аудитории 22-35 лет. Создать гибкую дизайн-систему для веба и мобильных приложений.', process: [ { step: '01. Исследование и позиционирование', description: 'Выработали платформу бренда: "Финансы без сложностей". В основе — прозрачность и простота.' }, { step: '02. Визуальная концепция', description: 'Разработали новый логотип, смелую палитру и современную типографику (шрифт MullerNextWide).' }, { step: '03. Разработка дизайн-системы', description: 'Создали в Figma библиотеку из 200+ компонентов, что ускорило разработку интерфейсов на 40%.' }, { step: '04. Гайдлайны и внедрение', description: 'Подготовили подробный брендбук и провели воркшопы для команды разработки.' } ], results: [ { value: '+75%', label: 'Рост узнаваемости бренда' }, { value: '-30%', label: 'Time-to-market для новых фич' }, { value: 'Top 5', label: 'В рейтинге банковских приложений' } ] },
        { id: 'des-2', client: 'Aeromax Drone', title: 'Промышленный дизайн и UX для дрона', category: 'Дизайн', heroImage: 'https://images.unsplash.com/photo-1506947442293-b3a58e73683a?q=80&w=1920&auto=format&fit=crop', task: 'Разработать дизайн корпуса и интерфейс пульта управления для агродрона. Цель — сделать его утилитарным, надежным и интуитивно понятным для фермеров.', process: [], results: [{value: "Red Dot Award", label: "Награда за дизайн"}, {value: "-50%", label: "Время обучения пилота"}] },
    ]
};

// --- Компонент карточки проекта ---
const ProjectCard = ({ project, isExpanded, onClick }) => (
    <motion.div
        layoutId={`card-${project.id}`}
        onClick={onClick}
        className={`relative rounded-2xl overflow-hidden cursor-pointer ${isExpanded ? 'col-span-12' : 'bg-zinc-900 border-zinc-800'}`}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
        {!isExpanded && (
             <div className="relative w-full h-full group">
                <motion.img
                    layoutId={`image-${project.id}`}
                    src={project.heroImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10"></div>
                <div className="absolute bottom-0 left-0 p-6 z-20">
                    <motion.p layoutId={`category-${project.id}`} className="font-muller text-sm text-blue-400 uppercase tracking-wider">{project.client}</motion.p>
                    <motion.h3 layoutId={`title-${project.id}`} className="font-bebas text-4xl text-white leading-none">{project.title}</motion.h3>
                </div>
            </div>
        )}

        {isExpanded && ( // --- РАСКРЫТЫЙ ВИД (ДЕТАЛИ) ---
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full h-auto bg-black p-8 md:p-12"
            >
                <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden mb-12">
                    <motion.img
                        layoutId={`image-${project.id}`}
                        src={project.heroImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                     <div className="absolute bottom-8 left-8 text-white z-10">
                        <motion.p layoutId={`category-${project.id}`} className="font-muller text-lg text-blue-400">{project.client}</motion.p>
                        <motion.h1 layoutId={`title-${project.id}`} className="font-bebas text-5xl md:text-7xl leading-none">{project.title}</motion.h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    <div className="lg:col-span-1">
                        <h2 className="font-bebas text-4xl text-white mb-4 border-b-2 border-zinc-800 pb-4">ЗАДАЧА</h2>
                        <p className="font-inter text-lg text-gray-400 leading-relaxed">{project.task}</p>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="font-bebas text-4xl text-white mb-4 border-b-2 border-zinc-800 pb-4">ПРОЦЕСС</h2>
                        <div className="space-y-6">
                             {project.process.length > 0 ? project.process.map(item => (
                                <div key={item.step}>
                                    <h3 className="font-ppneue text-2xl text-blue-400">{item.step}</h3>
                                    <p className="font-inter text-lg text-gray-400 mt-1">{item.description}</p>
                                </div>
                            )) : <p className="font-inter text-lg text-gray-400">Детальное описание процесса доступно по запросу.</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-24 py-16 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
                    <h2 className="font-bebas text-5xl text-white mb-8">РЕЗУЛЬТАТЫ</h2>
                    <div className="flex flex-wrap justify-center gap-8 px-4">
                        {project.results.map(item => (
                            <div key={item.label} className="flex-1 min-w-[200px] max-w-[300px] bg-black p-6 rounded-lg border border-zinc-700">
                                <p className="font-receipt text-6xl text-blue-400 mb-2">{item.value}</p>
                                <p className="font-muller text-gray-500 uppercase tracking-widest">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}
    </motion.div>
);

// --- Главный компонент страницы ---
export default function Reviews() {
    const [activeTab, setActiveTab] = useState('development');
    const [expandedId, setExpandedId] = useState(null);

    const tabs = [
        { id: 'development', label: 'Разработка' },
        { id: 'targeting', label: 'VK Таргетинг' },
        { id: 'design', label: 'Дизайн' }
    ];
    
    const currentProjects = projectsData[activeTab];

    return (
        <div className="min-h-screen bg-black text-white font-muller">
            {/* Оверлей, который появляется при раскрытии карточки */}
            <AnimatePresence>
                {expandedId && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedId(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
                     >
                         <div className="absolute top-8 right-8 text-zinc-500 font-muller uppercase">Закрыть [ESC]</div>
                     </motion.div>
                )}
            </AnimatePresence>
            
            
            <header className="py-24 md:py-32 px-8 text-center border-b-2 border-zinc-800">
                <h1 className="font-bebas text-6xl md:text-9xl uppercase tracking-wider">Кейсы</h1>
                <p className="text-xl md:text-2xl text-gray-500 mt-4 max-w-3xl mx-auto font-inter">
                    Мы проектируем системы для решения бизнес-задач. Это не просто работы — это архитектура результата.
                </p>
            </header>

            <div className="sticky top-0 bg-black z-30 border-b-2 border-zinc-800">
                 <div className="flex justify-center max-w-7xl mx-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setExpandedId(null) || setActiveTab(tab.id)}
                            className={`relative w-full text-center py-5 text-lg font-bold uppercase transition-colors ${activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>
                            {tab.label}
                            {activeTab === tab.id && <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" layoutId="underline" />}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-8 md:p-12 relative z-20">
                <AnimatePresence>
                    {expandedId === null && (
                         <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-12 gap-6"
                        >
                            <div className="col-span-12 md:col-span-7 row-span-2">
                                {currentProjects[0] && <ProjectCard project={currentProjects[0]} isExpanded={false} onClick={() => setExpandedId(currentProjects[0].id)} />}
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                {currentProjects[1] && <ProjectCard project={currentProjects[1]} isExpanded={false} onClick={() => setExpandedId(currentProjects[1].id)} />}
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                {currentProjects[2] && <ProjectCard project={currentProjects[2]} isExpanded={false} onClick={() => setExpandedId(currentProjects[2].id)} />}
                            </div>
                            
                            {currentProjects.slice(3).map(p => (
                                <div key={p.id} className="col-span-12 md:col-span-6">
                                    <ProjectCard project={p} isExpanded={false} onClick={() => setExpandedId(p.id)} />
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                 {currentProjects.map(project => 
                    project.id === expandedId && (
                        <ProjectCard 
                            key={`expanded-${project.id}`}
                            project={project}
                            isExpanded={true}
                            onClick={() => {}}
                        />
                    )
                )}

            </main>

            <Footer 
                topButtonText="О нашем агентстве" 
                topButtonLink="/about"
            />
        </div>
    );
}