import React from 'react';
import { Link } from 'react-router-dom';

// Для простоты, иконки вставлены как компоненты. 
// Их можно вынести в отдельную библиотеку иконок.

const CodeIcon = () => (
    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
);
const RocketIcon = () => (
    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

// Иконки из вашего HTML
const ClockIcon = () => (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"></path><path d="M12 6V12.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>);
const HeartIcon = () => (<svg className="w-6 h-6" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.823 4.13688L14.6667 5.46263L15.5103 4.13688C16.7258 2.2268 18.8735 1 21.3333 1C25.181 1 28.3333 4.15229 28.3333 8C28.3333 9.69912 27.5492 11.4919 26.2353 13.2836C24.9289 15.065 23.1653 16.7545 21.3668 18.226C19.5731 19.6936 17.7744 20.9203 16.4215 21.7813C15.7459 22.2112 15.1839 22.5484 14.7923 22.7773C14.7489 22.8026 14.7077 22.8266 14.6686 22.8493C14.6291 22.8263 14.5875 22.8019 14.5437 22.7761C14.152 22.5455 13.5898 22.2059 12.9141 21.7734C11.5608 20.9071 9.76175 19.6739 7.96762 18.2019C6.16855 16.7258 4.40438 15.0339 3.0976 13.2549C1.78263 11.4647 1 9.68082 1 8C1 4.15229 4.15229 1 8 1C10.4599 1 12.6075 2.2268 13.823 4.13688Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2"></path></svg>);
const CommentIcon = () => (<svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M16.5439 5H16.9971C22.4937 5 26.9998 9.59918 27 15.3369C27 16.6808 26.7749 18.0129 26.3369 19.2744L26.1367 19.8105C25.6382 21.0504 24.9371 22.1897 24.0664 23.1797L23.6826 23.5947C22.7641 24.5411 21.6961 25.3151 20.5273 25.8848L20.0205 26.1172C18.8237 26.6279 17.5523 26.9211 16.2627 26.9863L15.71 27H5.48145L7.67676 25.1846C7.92635 24.9782 8.11022 24.7071 8.21191 24.4053L8.25098 24.2734C8.3287 23.9639 8.32009 23.6389 8.22656 23.335L8.18066 23.2061L6.86816 19.8887C4.04268 12.7398 9.16029 5.00006 16.5439 5Z" stroke="currentColor" strokeWidth="2"></path></g></svg>);
const EyeIcon = () => (<svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M16 5C23.2 5 29 10.8 31 16C29 21.2 23.2 27 16 27C8.8 27 3 21.2 1 16C3 10.8 8.8 5 16 5ZM16 12C13.8 12 12 13.8 12 16C12 18.2 13.8 20 16 20C18.2 20 20 18.2 20 16C20 13.8 18.2 12 16 12Z" fill="currentColor"></path></g></svg>);

// Сопоставление названий тегов с иконками
const ICONS = {
    'Создание сайтов': <CodeIcon />,
    'Продвижение сайтов': <RocketIcon />,
};

export default function BlogHeroBlock({ data }) {
    if (!data) return null;

    const { title, description, author, readingTime, stats, tags } = data;

    return (
        // Блок использует светлую тему, как на скриншоте
        <section className="text-black bg-white pt-10 pb-16">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Верхняя панель */}
                <div className="flex flex-wrap justify-between items-center border-b border-zinc-200 pb-4 mb-10 gap-4">
                    {/* Теги и время чтения */}
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-2 text-zinc-800">
                        {tags?.map((tag, index) => (
                            <Link to={tag.link} key={index} className="flex items-center bg-zinc-100 hover:bg-zinc-200 rounded-full px-4 py-2 text-sm font-medium transition-colors">
                                {ICONS[tag.name] || <CodeIcon />}
                                <span>{tag.name}</span>
                            </Link>
                        ))}
                         <div className="flex items-center text-zinc-500 ml-4">
                            <ClockIcon />
                            <span className="ml-2 text-sm">{readingTime}</span>
                        </div>
                    </div>
                    {/* Статистика */}
                    <div className="flex items-center gap-x-6 text-zinc-500">
                        <div className="flex items-center" title="Лайки">
                            <HeartIcon />
                            <span className="ml-2 font-medium text-sm">{stats?.likes ?? 0}</span>
                        </div>
                        <div className="flex items-center" title="Комментарии">
                            <CommentIcon />
                            <span className="ml-2 font-medium text-sm">{stats?.comments ?? 0}</span>
                        </div>
                        <div className="flex items-center" title="Просмотры">
                            <EyeIcon />
                            <span className="ml-2 font-medium text-sm">{stats?.views ?? 0}</span>
                        </div>
                    </div>
                </div>

                {/* Основной контент */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Левая часть: Заголовок и описание */}
                    <div className="lg:col-span-2">
                        <h1 className="text-5xl md:text-6xl font-black text-zinc-900 leading-tight mb-6">
                            {title}
                        </h1>
                        <p className="text-lg text-zinc-600 max-w-3xl">
                            {description}
                        </p>
                    </div>

                    {/* Правая часть: Информация об авторе */}
                    <div className="flex lg:justify-center">
                        <div>
                            <p className="font-semibold mb-3">Автор:</p>
                            <div className="flex items-center">
                                <Link to={author?.link || '#'} target="_blank" className="flex-shrink-0">
                                    <img 
                                        src={author?.imageUrl} 
                                        alt={author?.name || 'Автор'} 
                                        className="w-16 h-16 rounded-full object-cover mr-4 hover:opacity-90 transition-opacity" 
                                    />
                                </Link>
                                <div>
                                    <Link to={author?.link || '#'} target="_blank" className="font-bold text-lg text-zinc-900 hover:underline">
                                        {author?.name}
                                    </Link>
                                    <p className="text-zinc-500">{author?.position}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}