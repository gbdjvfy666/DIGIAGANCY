// Файл: src/pages/Blog/BlogBlocks/BlogHeroBlock.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// --- Вспомогательные компоненты (Иконки) ---

const ClockIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.6"><path d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"></path><path d="M12 6V12.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>);
const HeartIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0001 21.35L10.5501 20.03C5.40009 15.36 2.00009 12.28 2.00009 8.5C2.00009 5.42 4.42009 3 7.50009 3C9.24009 3 10.9101 3.81 12.0001 5.09C13.0901 3.81 14.7601 3 16.5001 3C19.5801 3 22.0001 5.42 22.0001 8.5C22.0001 12.28 18.6001 15.36 13.4501 20.04L12.0001 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path></svg>);
const CommentIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C10.5366 21 9.60134 20.849 8.72051 20.5631L3 22L4.43695 16.2795C4.151 15.3987 4 14.4634 4 13.5C4 8.25329 8.25329 4 13.5 4C15.8354 4 17.9354 4.88998 19.4853 6.43981C21.0351 7.98964 22 10.0896 22 12.425C21.9992 12.1182 21.8741 11.8213 21.6489 11.6033C21.4237 11.3852 21.1189 11.2656 21 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path></svg>);
const EyeIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path></svg>);


// --- Основной компонент ---

export default function BlogHeroBlock({ data, pageContext }) {
    if (!data || !pageContext) return null;

    const { title, description, author, readingTime, stats } = data;

    const breadcrumbs = [
        { name: 'Главная', link: '/' },
        { name: 'Блог', link: '/blog' }
    ];
    breadcrumbs.push({ name: pageContext.title, link: '#' });

    const bgStyles = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px), radial-gradient(circle at 50% 50%, rgba(0, 112, 115, 0.25) 0%, rgba(0, 31, 84, 0.15) 35%, transparent 70%)`,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
    };

    return (
        <section className="relative bg-black text-white border-y border-zinc-800 pt-32 pb-24 sm:pt-40 sm:pb-28 overflow-hidden" style={bgStyles}>
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* ИЗМЕНЕНИЕ: Единый хедер с хлебными крошками */}
            <div className="absolute top-0 left-0 w-full z-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-4 text-sm text-zinc-400 h-16">
                        <nav aria-label="Breadcrumb">
                            <ol className="flex items-center">
                                {breadcrumbs.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        {index < breadcrumbs.length - 1 ? (
                                            <Link to={item.link} className="hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <span className="text-white font-medium" aria-current="page">
                                                {item.name}
                                            </span>
                                        )}
                                        {index < breadcrumbs.length - 1 && (
                                            <span className="mx-3 text-zinc-700" aria-hidden="true">/</span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        <div className="flex-grow h-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent ml-4"></div>
                        <div className="flex items-center gap-2" title="Время чтения">
                            <ClockIcon />
                            <span>{readingTime}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Основной контент */}
            <div className="relative z-10 w-full max-w-8xl mx-auto px-6 lg:px-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Левая колонка */}
                    <div className="lg:col-span-8">
                        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 leading-none tracking-tighter mb-8">
                            {title}
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-4xl leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Правая колонка */}
                    <div className="lg:col-span-4">
                        <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-none">
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={author?.imageUrl} 
                                        alt={author?.name || 'Автор'} 
                                        className="w-16 h-16 rounded-none object-cover border-2 border-zinc-700" 
                                    />
                                    <div>
                                        <p className="text-sm text-zinc-400">Автор</p>
                                        <h3 className="font-bold text-lg text-white">
                                            {author?.name}
                                        </h3>
                                        <p className="text-zinc-500 text-sm">{author?.position}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-zinc-800 grid grid-cols-3 text-center">
                                {[
                                    {icon: <HeartIcon />, value: stats?.likes, label: 'Лайки'}, 
                                    {icon: <CommentIcon />, value: stats?.comments, label: 'Отзывы'}, 
                                    {icon: <EyeIcon />, value: stats?.views, label: 'Просмотры'}
                                ].map((stat, i) => (
                                    <div className="p-4 border-r border-zinc-800 last:border-r-0" key={i}>
                                        <div className="w-fit mx-auto text-zinc-500">{stat.icon}</div>
                                        <p className="font-bold text-lg text-white mt-1">{stat.value ?? 0}</p>
                                        <p className="text-xs text-zinc-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-3 border-t border-zinc-800">
                                <Link to={author?.link || '#'} target="_blank" className="block w-full text-center bg-zinc-800 border border-zinc-700 text-white px-6 py-2.5 rounded-none font-semibold hover:bg-white hover:text-black transition-colors duration-300">
                                    Профиль автора
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}