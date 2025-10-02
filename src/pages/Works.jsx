// src/pages/Works.jsx (Финальная версия с улучшенным дизайном)

import React from 'react';
import '../index.css'; 
import * as Icons from '../Components/other/icons/Icons';

// ... (данные projectsData остаются без изменений)
const projectsData = [
    { 
        id: 'case-jewelry', 
        layout: 'standard', 
        client: 'Aurumé Jewelry', 
        title: 'Запуск E-commerce бренда и рост продаж на 300%', 
        heroImage: 'https://images.unsplash.com/photo-1611652032935-a6ce9b461af3?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "E-commerce", icon: <Icons.SozdaniyeSaytovIcon /> }, { name: "Брендинг", icon: <Icons.BrendyngIcon /> }, { name: "UX/UI", icon: <Icons.DizaynIcon /> }],
        task: 'Разработать с нуля интернет-магазин для нового ювелирного бренда. Цель — создать премиальный образ, обеспечить удобный процесс покупки и достичь окупаемости в первые 6 месяцев.',
        process: [
            { title: 'Разработка бренд-платформы', description: 'Создали позиционирование, айдентику и гайдлайны, отражающие утонченность и современность бренда.' },
            { title: 'UX/UI проектирование в Figma', description: 'Спроектировали интуитивно понятный интерфейс с акцентом на визуальную составляющую и мобильные устройства.' },
            { title: 'Разработка на Shopify', description: 'Реализовали кастомную тему, настроили интеграции с платежными системами и службами доставки.' },
        ],
        results: [
            { value: '3.2x', label: 'Рост продаж (за 6 мес.)' }, 
            { value: '+45%', label: 'Средний чек' },
            { value: '6 мес.', label: 'Срок окупаемости проекта' },
        ] 
    },
     { 
        id: 'case-beauty', 
        layout: 'inverted', 
        client: 'L\'éclat Studio', 
        title: 'Привлечение клиентов в студию красоты через таргет ВКонтакте', 
        heroImage: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "Таргет ВК", icon: <Icons.ReklamaIcon /> }, { name: "SMM", icon: <Icons.MarketingIcon /> }],
        task: 'Загрузить работой новых мастеров студии красоты. Необходимо было получать не менее 150 целевых заявок в месяц по цене не выше 500 рублей за лид (CPL).',
        process: [
            { title: 'Анализ ЦА и конкурентов', description: 'Сегментировали аудиторию по интересам, геолокации (в радиусе 5 км от студии) и поведению.' },
            { title: 'Создание креативов и офферов', description: 'Разработали акцию "Знакомство с мастером" и подготовили серию видео- и фото-креативов для тестов.' },
            { title: 'Запуск и оптимизация кампаний', description: 'Провели A/B-тестирование, нашли самые эффективные связки "аудитория-креатив" и масштабировали их.' },
        ],
        results: [
            { value: '430 ₽', label: 'Средняя стоимость заявки (CPL)' }, 
            { value: '188', label: 'Заявок получено (за 1-й мес.)' },
            { value: '380%', label: 'ROMI (возврат на маркетинговые инвестиции)' },
        ] 
    },
];

// --- КОМПОНЕНТЫ С ИЗМЕНЕНИЯМИ ---

const ButtonBorder = () => (
  // ИЗМЕНЕНО: Градиент кнопки теперь более сдержанный и темный, 
  // что лучше соответствует премиальной темной теме
  <svg className="absolute top-1/2 left-1/2 w-[110%] h-auto -translate-x-1/2 -translate-y-1/2" viewBox="0 0 282 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="case-btn-gradient" x1="0" y1="0" x2="282" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" /> {/* Синий (sky-500) */}
            <stop offset="1" stopColor="#1e3a8a" /> {/* Темно-синий (blue-900) */}
        </linearGradient>
    </defs>
    <path d="M78.5 15C18.1 27.6 -19.4 40.1 13.5 63.7C46.4 87.3 309.3 71.9 277.8 26.6C252.5 -9.7 98.4 1.2 24.5 11.1" stroke="url(#case-btn-gradient)" strokeWidth="2" />
  </svg>
);

const CaseCard = ({ project }) => (
    // ИЗМЕНЕНО: Добавлена общая обертка с градиентной рамкой и увеличен блюр (blur-lg)
    <div className="p-px rounded-3xl relative overflow-hidden bg-gradient-to-br from-zinc-700/50 via-zinc-900 to-zinc-700/50 hover:from-sky-500/50 transition duration-500">
        <section className="bg-zinc-900/90 backdrop-blur-lg rounded-[calc(1.5rem-1px)] h-full">
            
            <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center">
                    <div className={`flex flex-col h-full ${project.layout === 'inverted' ? 'lg:order-last' : ''}`}>
                        <div>
                            <p className="font-semibold text-sky-400 uppercase tracking-widest text-sm">{project.client}</p>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-200 mt-2">{project.title}</h2>
                            
                            {/* ИЗМЕНЕНО: Теги стали более контрастными и акцентными */}
                            <div className="flex flex-wrap gap-3 mt-6">
                                {project.tags.map(tag => (
                                    <div key={tag.name} className="flex items-center bg-zinc-800/70 border border-sky-400/20 text-sky-300 text-sm font-medium px-4 py-2 rounded-full">
                                        <div className="w-4 h-4 mr-2">{tag.icon}</div>
                                        <span>{tag.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* ИЗМЕНЕНО: Контрастная кнопка */}
                        <div className="mt-auto pt-8">
                            <a href={`/cases/${project.id}`} className="relative inline-flex items-center justify-center px-10 py-3.5 text-base font-medium tracking-wider text-sky-400 transition-transform duration-300 hover:scale-105 group">
                                <ButtonBorder />
                                <span className="relative">Смотреть кейс &rarr;</span>
                            </a>
                        </div>
                    </div>
                    {/* ИЗМЕНЕНО: Более толстая рамка для изображения */}
                    <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border-2 border-zinc-700/50 shadow-2xl">
                        <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover"/>
                    </div>
            </div>
            </div>
            {/* ИЗМЕНЕНО: Разделитель стал более заметным (border-zinc-700) */}
            <div className="bg-black/10 border-t border-zinc-700/70 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400 mb-4">Задача</h3>
                        {/* ИЗМЕНЕНО: Более контрастный вертикальный разделитель */}
                        <p className="text-zinc-300 border-l-2 border-sky-400 pl-4">{project.task}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400 mb-4">Процесс</h3>
                        <ul className="space-y-4">
                            {project.process.map(item => (
                                <li key={item.title}>
                                    <p className="font-bold text-white">{item.title}</p>
                                    <p className="text-zinc-400 text-sm">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400 mb-4">Результаты</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {project.results.map(item => (

                                <div key={item.label} className="bg-zinc-900 border border-sky-500/30 p-4 rounded-lg shadow-md hover:bg-zinc-800 transition duration-300">
                                    <p className="text-3xl font-extrabold text-sky-400 tracking-tight">{item.value}</p>
                                    <p className="text-zinc-400 text-sm font-medium">{item.label}</p>
                                </div>
                            ))}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);


// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function Works() {
    // --- ИЗМЕНЕНИЕ: Усилен фон для лучшего контраста ---
    const bgStyles = {
        backgroundColor: '#050308', // Базовый очень темный цвет
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.2) 0%, transparent 30%), 
            radial-gradient(circle at bottom right, rgba(244, 63, 94, 0.2) 0%, transparent 30%),
            linear-gradient(to bottom right, #050308, #111827)
        `,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%, 100% 100%',
    };

    return (
        <div className="min-h-screen text-white" style={bgStyles}>
            <header className="py-24 md:py-32 px-4 text-center">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 leading-tight tracking-tighter">
                    Наши <span className="text-sky-400">Кейсы</span>
                </h1>
                <p className="text-xl text-zinc-400 mt-6 max-w-3xl mx-auto">
                    Мы не просто создаем сайты и запускаем рекламу. Мы решаем конкретные бизнес-задачи, погружаясь в каждый проект и добиваясь **измеримых результатов**.
                </p>
            </header>
            
            <main className="px-4 pb-24 md:pb-32">
                <div className="container max-w-8xl mx-auto space-y-20">
                    {projectsData.map(project => (
                        <CaseCard key={project.id} project={project} />
                    ))}
                </div>
            </main>
        </div>
    );
}