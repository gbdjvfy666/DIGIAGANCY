import React from 'react';

import '../index.css';

// Импортируем наши иконки для тегов. Убедитесь, что путь верный.
import * as Icons from '../Components/other/icons/Icons.jsx';

// --- ИКОНКИ ДЛЯ СЕКЦИЙ ---
const TaskIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ProcessIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a8.967 8.967 0 011.332 6.645A8.967 8.967 0 0112 2.25z" /></svg>;
const ResultIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;

// --- ПОЛНЫЙ СПИСОК ПРОЕКТОВ ---
const projectsData = [
    { 
        id: 'case-1', 
        layout: 'standard', 
        client: 'AeroFlow Dynamics', 
        title: 'B2B-портал для авиационной промышленности', 
        heroImage: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "Веб-разработка", icon: <Icons.SozdaniyeSaytovIcon /> }, { name: "UX/UI", icon: <Icons.DizaynIcon /> }],
        task: 'Разработать защищенный B2B-портал для инженеров, позволяющий заказывать кастомные аэродинамические компоненты и отслеживать производство.',
        process: [
            { title: 'Глубинные интервью с инженерами', description: 'Провели 20+ интервью с целевой аудиторией для выявления ключевых сценариев.' },
            { title: 'Прототипирование в Figma', description: 'Создали интерактивный прототип для тестирования пользовательских путей.' },
            { title: 'Backend на NestJS и Frontend на React', description: 'Выбрали надежный и масштабируемый стек для обеспечения безопасности.' },
        ],
        results: [
            { value: '-60%', label: 'Время на оформление заказа' }, 
            { value: '+35%', label: 'Повторные заказы' },
            { value: '98%', label: 'Удовлетворенность клиентов' },
        ] 
    },
    { 
        id: 'case-2', 
        layout: 'inverted', 
        client: 'Ritual Coffee Roasters', 
        title: 'Ребрендинг и запуск E-commerce платформы', 
        heroImage: 'https://images.unsplash.com/photo-1511920183359-5b1b5dd0a1e5?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "Брендинг", icon: <Icons.BrendyngIcon /> }, { name: "E-commerce", icon: <Icons.SozdaniyeSaytovIcon /> }],
        task: 'Провести полный ребрендинг кофейной компании, чтобы отразить ее премиальное качество и крафтовый подход, и запустить интернет-магазин.',
        process: [
            { title: 'Разработка платформы бренда', description: 'Сформулировали ключевое сообщение: "Ваш личный кофейный ритуал".' },
            { title: 'Создание айдентики', description: 'Разработали новый логотип, фирменные иллюстрации и дизайн упаковки.' },
            { title: 'Разработка на Shopify Plus', description: 'Создали кастомную тему, интегрировали систему подписок и лояльности.' },
        ],
        results: [
            { value: '2.5x', label: 'Рост онлайн-продаж за 6 мес.' }, 
            { value: '+40%', label: 'Средний чек' },
            { value: 'Top Brand', label: 'Награда Awwwards' },
        ] 
    },
    { 
        id: 'case-5',
        layout: 'centered', 
        client: 'Starlight Studios', 
        title: 'Промо-сайт для анимационного фильма "Хроники Ориона"', 
        heroImage: 'https://images.unsplash.com/photo-1534447677768-64483a0a4a89?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "Промо-сайт", icon: <Icons.ReklamaIcon /> }, { name: "Видео", icon: <Icons.VideorolikiIcon /> }],
        task: 'Создать захватывающий и интерактивный промо-сайт для нового анимационного фильма, который бы передавал атмосферу вселенной и вовлекал аудиторию до премьеры.',
        process: [
            { title: 'Интерактивная карта мира', description: 'Разработали карту с кликабельными зонами, раскрывающими лор и персонажей.' },
            { title: 'WebGL и анимации', description: 'Использовали GSAP и WebGL для создания плавных анимаций и эффекта погружения.' },
            { title: 'Система предзаказа билетов', description: 'Интегрировали API киносетей для удобного предзаказа билетов прямо с сайта.' },
        ],
        results: [
            { value: '500k+', label: 'Уникальных посетителей' }, 
            { value: '5 мин', label: 'Среднее время на сайте' },
            { value: '25k', label: 'Предзаказов билетов' },
        ] 
    },
    { 
        id: 'case-3', 
        layout: 'standard',
        client: 'Terra Futura', 
        title: 'PR-кампания для запуска эко-стартапа', 
        heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "PR", icon: <Icons.PRIcon /> }, { name: "Копирайтинг", icon: <Icons.KopiraytingIcon /> }],
        task: 'Обеспечить максимальный медийный охват для нового стартапа по переработке пластика. Цель — привлечь внимание инвесторов и первых B2B-клиентов.',
        process: [
            { title: 'Формирование PR-стратегии', description: 'Определили 3 ключевых инфоповода: технология, экология и команда.' },
            { title: 'Написание и дистрибуция материалов', description: 'Подготовили серию экспертных статей, пресс-релизов и колонок для основателей.' },
            { title: 'Организация пресс-завтрака', description: 'Провели мероприятие для 20+ журналистов и блогеров для волны публикаций.' },
        ],
        results: [
            { value: '50+', label: 'Публикаций в СМИ' }, 
            { value: '3 млн+', label: 'Медийный охват' },
            { value: '4', label: 'Приглашения на конференции' },
        ] 
    },
    { 
        id: 'case-4', // НОВЫЙ ЗАМЕНЕННЫЙ КЕЙС
        layout: 'inverted',
        client: 'Renova Clinic', 
        title: 'Редизайн и SEO для клиники эстетической медицины', 
        heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "Веб-дизайн", icon: <Icons.VebDizaynIcon /> }, { name: "SEO", icon: <Icons.SEOIcon /> }, { name: "Копирайтинг", icon: <Icons.KopiraytingIcon /> }],
        task: 'Увеличить количество онлайн-заявок на дорогостоящие процедуры. Старый сайт не вызывал доверия, имел низкие позиции в поисковой выдаче и плохую конверсию.',
        process: [
            { title: 'Анализ конкурентов и ЦА', description: 'Изучили сайты ведущих клиник, выявили сильные и слабые стороны. Определили ключевые факторы принятия решений для пациентов.' },
            { title: 'Новый дизайн и контент', description: 'Создали светлый, премиальный дизайн. Написали экспертные тексты об услугах, добавили фото "до/после" и видео-отзывы врачей.' },
            { title: 'Техническое SEO и семантика', description: 'Собрали семантическое ядро по коммерческим запросам. Провели полную техническую оптимизацию сайта для быстрой загрузки.' },
        ],
        results: [
            { value: '+400%', label: 'Рост трафика из Google/Яндекс' }, 
            { value: '3x', label: 'Увеличение онлайн-записей' },
            { value: 'Топ-5', label: 'По ключевым услугам' },
        ] 
    },
];

// --- КОМПОНЕНТ КАРТОЧКИ КЕЙСА ---
const CaseCard = ({ project }) => (
    <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-zinc-200/80">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start ${project.layout === 'centered' ? 'lg:grid-cols-1' : ''}`}>
            <div className={`lg:col-span-1 flex flex-col h-full ${project.layout === 'inverted' ? 'lg:order-last' : ''} ${project.layout === 'centered' ? 'lg:order-none lg:text-center lg:items-center' : ''}`}>
                <div>
                    <p className="font-semibold text-zinc-500">{project.client}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-black mt-1">{project.title}</h2>
                    <div className={`flex flex-wrap gap-2 mt-4 ${project.layout === 'centered' ? 'justify-center' : ''}`}>
                        {project.tags.map(tag => (
                            <div key={tag.name} className="flex items-center bg-zinc-100 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full">
                                <span className="w-4 h-4 mr-1.5">{React.cloneElement(tag.icon, { className: 'w-full h-full' })}</span>
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`mt-auto pt-8 ${project.layout === 'centered' ? 'mt-8' : ''}`}>
                     <a href="#" className="inline-block bg-zinc-900 text-white font-bold py-3 px-6 rounded-full transition-transform hover:scale-105">
                        Смотреть кейс
                    </a>
                </div>
            </div>
            
            <div className={`lg:col-span-2 ${project.layout === 'centered' ? 'lg:col-span-1 w-full' : ''}`}>
                <div className="aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                    <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover"/>
                </div>
            </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
            <div>
                <div className="flex items-center gap-3 text-purple-600 font-bold">
                    <TaskIcon />
                    <h3 className="text-xl">Задача</h3>
                </div>
                <p className="mt-2 text-zinc-600 border-l-2 border-zinc-200 pl-4">{project.task}</p>
            </div>
            <div>
                <div className="flex items-center gap-3 text-purple-600 font-bold">
                    <ProcessIcon />
                    <h3 className="text-xl">Процесс</h3>
                </div>
                <ul className="mt-2 space-y-2">
                    {project.process.map(item => (
                        <li key={item.title}>
                            <p className="font-semibold text-zinc-800">{item.title}</p>
                            <p className="text-zinc-500 text-sm">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                 <div className="flex items-center gap-3 text-purple-600 font-bold">
                    <ResultIcon />
                    <h3 className="text-xl">Результаты</h3>
                </div>
                <div className="mt-2 space-y-2">
                    {project.results.map(item => (
                        <div key={item.label} className="flex items-baseline gap-3">
                            <p className="text-3xl font-bold text-black">{item.value}</p>
                            <p className="text-zinc-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);


// --- ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ ---
export default function Works() {
    return (
        <div className="min-h-screen bg-zinc-50 text-black">

            
            <header className="py-24 md:py-32 px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-black text-zinc-900">Наши кейсы</h1>
                <p className="text-lg text-zinc-600 mt-4 max-w-3xl mx-auto">
                    Мы не просто создаем сайты и запускаем рекламу. Мы решаем конкретные бизнес-задачи, погружаясь в каждый проект.
                </p>
            </header>
            
            <main className="px-4 pb-16 md:pb-24 space-y-16">
                <div className="container max-w-7xl mx-auto space-y-16">
                    {projectsData.map(project => (
                        <CaseCard key={project.id} project={project} />
                    ))}
                </div>
            </main>

        </div>
    );
}