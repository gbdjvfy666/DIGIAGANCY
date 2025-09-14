import React from 'react';
import Navbar from '../Components/other/Navbar.jsx';
import Footer from '../Components/other/Footer.jsx';
import '../index.css';

// --- ДАННЫЕ ПРОЕКТОВ (с замененным последним проектом) ---
const allProjects = [
    // Проекты 1-3 остаются без изменений
    { id: 'dev-1', client: 'Quantum Leap Logistics', title: 'Портал с AI-оптимизацией маршрутов', category: 'Веб-разработка', heroImage: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1920&auto=format&fit=crop', task: 'Разработать B2B-платформу, способную в реальном времени анализировать тысячи точек доставки и строить оптимальные маршруты для 500+ грузовиков.', process: [ { step: '01. Аналитика и архитектура', description: 'Спроектировали микросервисную архитектуру на Node.js.' }, { step: '02. UX/UI и Frontend', description: 'Создали сложный, но интуитивный интерфейс на React с картой на Mapbox.' }, { step: '03. Backend и AI', description: 'Разработали ядро системы: генетический алгоритм и нейросеть для предсказания пробок.' }], results: [ { value: '-18%', label: 'Сокращение расходов на ГСМ' }, { value: '+22%', label: 'Увеличено доставок в день' }, { value: '-40%', label: 'Время на планирование' } ] },
    { id: 'des-1', client: 'Metropolis Bank', title: 'Ребрендинг и дизайн-система для необанка', category: 'Брендинг и Дизайн', heroImage: 'https://images.unsplash.com/photo-1554224155-8d04421cd673?q=80&w=1920&auto=format&fit=crop', task: 'Полностью переосмыслить визуальный язык банка для привлечения аудитории 22-35 лет. Создать гибкую дизайн-систему для веба и мобильных приложений.', process: [ { step: '01. Исследование и позиционирование', description: 'Выработали платформу бренда: "Финансы без сложностей".' }, { step: '02. Визуальная концепция', description: 'Разработали новый логотип, смелую палитру и типографику.' }, { step: '03. Разработка дизайн-системы', description: 'Создали в Figma библиотеку из 200+ компонентов, ускорив разработку на 40%.' }], results: [ { value: '+75%', label: 'Рост узнаваемости' }, { value: '-30%', label: 'Time-to-market для фич' }, { value: 'Top 5', label: 'Рейтинг приложений' } ] },
    { id: 'tar-1', client: 'AURA Cosmetics', title: 'Запуск Vegan-косметики в ВК', category: 'VK Таргетинг', heroImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=1920&auto=format&fit=crop', task: 'Обеспечить взрывной старт продаж новой линейки косметики с нуля. KPI: ROMI > 350%, CAC < 450 руб.', process: [ { step: '01. Стратегия и сегментация', description: 'Выделили 5 ключевых сегментов. Разработали уникальные офферы для каждого.' }, { step: '02. Креативная концепция', description: 'Создали 30+ видео и статичных креативов. Провели A/B тесты.' }], results: [ { value: '412%', label: 'ROMI за 3 месяца' }, { value: '415 руб', label: 'Средний CAC' }, { value: '1.2 млн ₽', label: 'Продаж из ВК' } ] },
    
    // --- ЗАМЕНЕННЫЙ ПРОЕКТ ---
    { 
        id: 'des-2', 
        client: 'NEON GHOST', 
        title: 'Айдентика и SMM-дизайн для стритвир-бренда', 
        category: 'Брендинг и Графический Дизайн', 
        heroImage: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1920&auto=format&fit=crop', 
        task: 'Разработать с нуля дерзкую айдентику для нового стритвир-бренда, ориентированного на молодежную аудиторию. Создать полный пакет для SMM, включая шаблоны постов, оформление группы VK и карточки товаров для Wildberries.',
        process: [
            { step: '01. Мудборд и Концепция', description: 'Сформулировали визуальную метафору бунтарства и киберпанка. Определили ключевые элементы стиля.' },
            { step: '02. Дизайн Логотипа и Фирстиля', description: 'Создали динамичный логотип, подобрали шрифтовую пару (Gerhaus + Inter) и разработали паттерны.'},
            { step: '03. SMM & Web Kit', description: 'Разработали сетку постов для VK, анимированные сторис и продающий дизайн карточек товаров.'},
        ],
        results: [
            { value: "+250%", label: "Рост вовлеченности" }, 
            { value: "1.5x", label: "Конверсия карточек" },
            { value: "New Look", label: "Оценка 'The Dieline'" },
        ] 
    },
];

// --- Вспомогательный компонент для РЕЗУЛЬТАТОВ ---
const ResultsSection = ({ results, titleClassName = "text-zinc-300", valueColor = "text-white" }) => (
    <div className="mt-12 md:mt-16 text-center">
        <h3 className={`font-dela text-4xl ${titleClassName} tracking-wider`}>Ключевые результаты</h3>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
            {results.map(item => (
                <div key={item.label} className="flex-1 min-w-[180px] max-w-[250px] bg-black/30 p-6 rounded-lg border border-zinc-800 shadow-lg shadow-black/20">
                    <p className={`font-receipt text-5xl ${valueColor} mb-2`}>{item.value}</p>
                    <p className="font-jost text-zinc-500 uppercase tracking-widest text-sm">{item.label}</p>
                </div>
            ))}
        </div>
    </div>
);


// --- ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ ---
export default function Works() {

    const [projectDev, projectDesign, projectTarget, projectNeonGhost] = allProjects;

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-muller noisy-bg">
            <Navbar />
            
            <header className="py-24 md:py-32 px-8 text-center border-b-2 border-zinc-800/50">
                <h1 className="font-dela text-6xl md:text-9xl uppercase tracking-tighter text-zinc-100">Наши <br/> работы</h1>
                <p className="font-inter text-xl text-zinc-400 mt-6 max-w-4xl mx-auto">
                    Мы проектируем системы для решения бизнес-задач. Это не просто проекты — это <span className="font-ppneue text-zinc-200">архитектура результата.</span>
                </p>
            </header>
            
            <main className="p-8 md:p-16 space-y-24 md:space-y-32">

                {/* --- ПРОЕКТЫ 1, 2, 3 (без изменений) --- */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="w-full h-full min-h-[400px]">
                         <img src={projectDev.heroImage} alt={projectDev.title} className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/30 grayscale"/>
                    </div>
                    <div>
                        <p className="font-jost text-zinc-500 uppercase tracking-widest text-sm">{projectDev.category}</p>
                        <h2 className="font-ppneue text-5xl md:text-7xl text-white leading-tight mt-2">{projectDev.title}</h2>
                        <h3 className="font-aradora text-2xl text-zinc-300 font-light italic mt-1">{projectDev.client}</h3>
                        <p className="font-muller text-lg text-zinc-400 mt-6 leading-relaxed border-l-2 border-zinc-700 pl-6">{projectDev.task}</p>
                        <ResultsSection results={projectDev.results} />
                    </div>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:order-last w-full h-full min-h-[400px]">
                         <img src={projectDesign.heroImage} alt={projectDesign.title} className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/30 grayscale"/>
                    </div>
                    <div className="lg:order-first">
                        <p className="font-jost text-zinc-500 uppercase tracking-widest text-sm">{projectDesign.category}</p>
                        <h2 className="font-playfair text-5xl md:text-7xl italic text-white leading-tight mt-2">{projectDesign.title}</h2>
                        <h3 className="font-aradora text-2xl text-zinc-300 font-light italic mt-1">{projectDesign.client}</h3>
                        <p className="font-muller text-lg text-zinc-400 mt-6 leading-relaxed">{projectDesign.task}</p>
                        <ResultsSection results={projectDesign.results} />
                    </div>
                </section>
                <section className="flex flex-col items-center text-center">
                     <p className="font-jost text-zinc-500 uppercase tracking-widest text-sm">{projectTarget.category}</p>
                     <h2 className="font-dela text-5xl md:text-7xl text-white leading-tight mt-2">{projectTarget.title}</h2>
                     <h3 className="font-aradora text-2xl text-zinc-300 font-light italic mt-1">{projectTarget.client}</h3>
                     <div className="w-full h-[50vh] mt-8 overflow-hidden rounded-2xl shadow-2xl shadow-black/30 border border-zinc-800">
                         <img src={projectTarget.heroImage} alt={projectTarget.title} className="w-full h-full object-cover grayscale"/>
                     </div>
                     <p className="font-muller text-lg text-zinc-400 mt-8 max-w-3xl mx-auto leading-relaxed">{projectTarget.task}</p>
                     <ResultsSection results={projectTarget.results} />
                </section>

                {/* --- НОВЫЙ ПРОЕКТ 4: Макет "Текст слева, изображение справа" --- */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="font-jost text-zinc-500 uppercase tracking-widest text-sm">{projectNeonGhost.category}</p>
                        <h2 className="font-gerhaus text-5xl md:text-7xl text-white leading-tight mt-2">{projectNeonGhost.title}</h2>
                        <h3 className="font-aradora text-2xl text-zinc-300 font-light italic mt-1">{projectNeonGhost.client}</h3>
                        <p className="font-muller text-lg text-zinc-400 mt-6 leading-relaxed border-l-2 border-zinc-700 pl-6">{projectNeonGhost.task}</p>
                         
                         <div className="mt-8 space-y-4">
                            {projectNeonGhost.process.map(item => (
                                <div key={item.step} className="p-4 border border-zinc-800 rounded-lg bg-black/20 shadow-inner shadow-black/10">
                                    <h4 className="font-jost text-xl text-zinc-200">{item.step}</h4>
                                    <p className="font-muller text-base text-zinc-500 mt-1">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="w-full h-full min-h-[500px] lg:order-last">
                         <img src={projectNeonGhost.heroImage} alt={projectNeonGhost.title} className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/30 grayscale"/>
                     </div>
                     {/* Результаты вынесены за сетку для акцента */}
                     <div className="lg:col-span-2">
                        <ResultsSection results={projectNeonGhost.results} />
                     </div>
                </section>
                

            </main>

            <Footer 
                topButtonText="О нашем агентстве" 
                topButtonLink="/about"
            />
        </div>
    );
}