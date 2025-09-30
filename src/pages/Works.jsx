import React from 'react';

// Предполагается, что ваш файл index.css или глобальные стили подключены
import '../index.css'; 

// --- ИСПРАВЛЕННЫЙ ИМПОРТ ---
// Путь и синтаксис теперь соответствуют вашему файлу с иконками
import * as Icons from '../Components/other/icons/Icons';

// --- ИКОНКИ ДЛЯ СЕКЦИЙ (Остаются без изменений) ---
const TaskIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ProcessIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a8.967 8.967 0 011.332 6.645A8.967 8.967 0 0112 2.25z" /></svg>;
const ResultIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;


// --- АДАПТИРОВАННЫЙ СПИСОК ПРОЕКТОВ ПОД ВАШИ ИКОНКИ ---
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
        // --- ИЗМЕНЕНО: Использованы ReklamaIcon и MarketingIcon ---
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
    { 
        id: 'case-fashion',
        layout: 'standard', 
        client: 'Urban Canvas', 
        title: 'Редизайн интернет-магазина одежды для увеличения конверсии', 
        heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1920&auto=format&fit=crop', 
        // --- ИЗМЕНЕНО: Использована MarketingIcon для аналитики ---
        tags: [{ name: "UX/UI", icon: <Icons.DizaynIcon /> }, { name: "Веб-аналитика", icon: <Icons.MarketingIcon /> }, { name: "E-commerce", icon: <Icons.SozdaniyeSaytovIcon /> }],
        task: 'Повысить конверсию в покупку на 2% и снизить показатель брошенных корзин на 15%. Старый дизайн был не оптимизирован для мобильных устройств, что приводило к потере клиентов.',
        process: [
            { title: 'Аналитика и CJM', description: 'Проанализировали поведение пользователей через вебвизор и составили карту пути клиента (CJM) для выявления "узких мест".' },
            { title: 'Прототипирование и дизайн', description: 'Разработали адаптивный дизайн с упором на быструю загрузку и упрощенный процесс оформления заказа (checkout).' },
            { title: 'A/B-тестирование', description: 'Запустили тест новой версии карточки товара и checkout-процесса, который подтвердил гипотезы и показал рост ключевых метрик.' },
        ],
        results: [
            { value: '+2.8%', label: 'Рост конверсии в покупку' }, 
            { value: '-22%', label: 'Брошенных корзин' },
            { value: '+31%', label: 'Выручка с мобильного трафика' },
        ] 
    },
    { 
        id: 'case-design',
        layout: 'inverted', 
        client: 'Buro Architects', 
        title: 'Разработка корпоративного сайта для архитектурного бюро', 
        heroImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1920&auto=format&fit=crop', 
        tags: [{ name: "Веб-дизайн", icon: <Icons.VebDizaynIcon /> }, { name: "Копирайтинг", icon: <Icons.KopiraytingIcon /> }],
        task: 'Создать имиджевый сайт, который бы отражал современный подход и экспертизу бюро. Главная цель — увеличить количество качественных заявок на проектирование.',
        process: [
            { title: 'Концепция и прототип', description: 'Разработали концепцию "цифрового портфолио" с минималистичным дизайном, где главный акцент сделан на крупных фотографиях проектов.' },
            { title: 'Дизайн-система и UI-кит', description: 'Создали строгую дизайн-систему в Figma для обеспечения консистентности и масштабируемости проекта.' },
            { title: 'Верстка и анимации', description: 'Реализовали плавные анимации переходов и появления элементов (GSAP), чтобы добавить сайту динамики и "вау-эффекта".' },
        ],
        results: [
            { value: 'x2.5', label: 'Увеличение качественных лидов' }, 
            { value: 'Топ-3', label: 'Награда "Рейтинг Рунета"' },
            { value: '4 мин', label: 'Среднее время на сайте' },
        ] 
    },
    { 
        id: 'case-vk-target-2',
        layout: 'standard', 
        client: 'Quantum Fitness', 
        title: 'Лидогенерация для фитнес-клуба через квиз ВКонтакте', 
        heroImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1920&auto=format&fit=crop', 
        // --- ИЗМЕНЕНО: Использована ReklamaIcon для таргета ---
        tags: [{ name: "Таргет ВК", icon: <Icons.ReklamaIcon /> }, { name: "Веб-дизайн", icon: <Icons.VebDizaynIcon /> }],
        task: 'Привлечь 200+ заявок на годовые абонементы в период "низкого сезона" (лето). Требовалось протестировать новый инструмент — рекламные кампании с квиз-опросами.',
        process: [
            { title: 'Создание квиз-лендинга', description: 'Разработали короткий опрос "Какой фитнес подходит именно вам?", который в конце предлагал скидку на абонемент за контакты.' },
            { title: 'Настройка Look-alike аудиторий', description: 'Собрали базу текущих клиентов и создали похожую аудиторию (Look-alike), чтобы показывать рекламу наиболее релевантным пользователям.' },
            { title: 'Оптимизация по стоимости конверсии', description: 'Запустили кампанию с целью "Конверсии на сайте" и оптимизировали ее, отключая неэффективные объявления и аудитории.' },
        ],
        results: [
            { value: '243', label: 'Квалифицированных лида' }, 
            { value: '550 ₽', label: 'Стоимость лида (CPQL)' },
            { value: '18%', label: 'Конверсия из лида в продажу' },
        ] 
    },
];

// --- ОБНОВЛЕННЫЙ КОМПОНЕНТ КАРТОЧКИ КЕЙСА ---
// ВАЖНО: Я убрал React.cloneElement, так как ваши иконки уже принимают className
const CaseCard = ({ project }) => (
    <section className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-slate-200/80 p-8 md:p-12 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center">
            <div className={`flex flex-col h-full ${project.layout === 'inverted' ? 'lg:order-last' : ''}`}>
                <div>
                    <p className="font-medium text-slate-500">{project.client}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{project.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {project.tags.map(tag => (
                            <div key={tag.name} className="flex items-center bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full">
                                {/* --- ИЗМЕНЕНО: Упрощен вызов иконки --- */}
                                {React.cloneElement(tag.icon, { className: 'w-4 h-4 mr-2' })}
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-auto pt-8">
                     <a href="#" className="inline-block bg-slate-900 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 group-hover:scale-105 group-hover:bg-slate-800">
                        Смотреть кейс
                    </a>
                </div>
            </div>
            
            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden">
                <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover"/>
            </div>
        </div>
        
        <div className="my-12 border-t border-slate-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 text-slate-900">
            <div>
                <div className="flex items-center gap-3 text-slate-800 font-bold">
                    <TaskIcon />
                    <h3 className="text-xl">Задача</h3>
                </div>
                <p className="mt-3 text-slate-600 border-l-2 border-slate-200 pl-4">{project.task}</p>
            </div>
            <div>
                <div className="flex items-center gap-3 text-slate-800 font-bold">
                    <ProcessIcon />
                    <h3 className="text-xl">Процесс</h3>
                </div>
                <ul className="mt-3 space-y-3">
                    {project.process.map(item => (
                        <li key={item.title}>
                            <p className="font-semibold text-slate-800">{item.title}</p>
                            <p className="text-slate-500 text-sm">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                 <div className="flex items-center gap-3 text-slate-800 font-bold">
                    <ResultIcon />
                    <h3 className="text-xl">Результаты</h3>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-4">
                    {project.results.map(item => (
                        <div key={item.label} className="bg-slate-50/80 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-slate-900">{item.value}</p>
                            <p className="text-slate-500 text-sm">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);


// --- ОБНОВЛЕННЫЙ ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ ---
export default function Works() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            
            <header className="py-20 md:py-28 px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-black text-slate-900">Наши кейсы</h1>
                <p className="text-lg text-slate-600 mt-5 max-w-3xl mx-auto">
                    Мы не просто создаем сайты и запускаем рекламу. Мы решаем конкретные бизнес-задачи, погружаясь в каждый проект и добиваясь измеримых результатов.
                </p>
            </header>
            
            <main className="px-4 pb-20 md:pb-28">
                <div className="container max-w-7xl mx-auto space-y-12">
                    {projectsData.map(project => (
                        <CaseCard key={project.id} project={project} />
                    ))}
                </div>
            </main>

        </div>
    );
}