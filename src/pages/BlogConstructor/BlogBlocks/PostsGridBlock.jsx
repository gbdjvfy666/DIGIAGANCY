// Файл: src/pages/Blog/BlogBlocks/PostsGridBlock.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ICON_MAP } from './TagsNavBlock'; 
// import Pagination from './Pagination'; // Убедитесь, что ваш компонент пагинации подключен

// --- КОМПОНЕНТЫ (пример пагинации и иконки) ---

// Примерный стилизованный компонент пагинации. Адаптируйте под ваш реальный компонент.
const Pagination = ({ currentPage, totalPages, baseUrl }) => {
    if (totalPages <= 1) return null;
    const params = new URLSearchParams(window.location.search);
    const activeTag = params.get('tag');

    const createPageLink = (page) => {
        let link = `${baseUrl}?page=${page}`;
        if (activeTag) {
            link += `&tag=${activeTag}`;
        }
        return link;
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center gap-x-2 mt-16 sm:mt-24">
            {pages.map(page => (
                <Link
                    key={page}
                    to={createPageLink(page)}
                    className={`
                        flex items-center justify-center w-10 h-10 border text-sm font-semibold transition-colors
                        ${currentPage === page
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white'
                        }
                    `}
                >
                    {page}
                </Link>
            ))}
        </nav>
    );
};


const ClockIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.6"><path d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"></path><path d="M12 6V12.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg> );
const HeartIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0001 21.35L10.5501 20.03C5.40009 15.36 2.00009 12.28 2.00009 8.5C2.00009 5.42 4.42009 3 7.50009 3C9.24009 3 10.9101 3.81 12.0001 5.09C13.0901 3.81 14.7601 3 16.5001 3C19.5801 3 22.0001 5.42 22.0001 8.5C22.0001 12.28 18.6001 15.36 13.4501 20.04L12.0001 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path></svg>);
const CommentIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C10.5366 21 9.60134 20.849 8.72051 20.5631L3 22L4.43695 16.2795C4.151 15.3987 4 14.4634 4 13.5C4 8.25329 8.25329 4 13.5 4C15.8354 4 17.9354 4.88998 19.4853 6.43981C21.0351 7.98964 22 10.0896 22 12.425C21.9992 12.1182 21.8741 11.8213 21.6489 11.6033C21.4237 11.3852 21.1189 11.2656 21 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path></svg>);
const EyeIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></path></svg>);

// --- ОСНОВНОЙ КОМПОНЕНТ ---

export default function PostsGridBlock({ allPosts }) {
    if (!allPosts) return null;
    
    const location = useLocation();
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    const POSTS_PER_PAGE = 9;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const activeTag = params.get('tag');
        const page = parseInt(params.get('page') || '1', 10);
        
        const filtered = activeTag 
            ? allPosts.filter(post => post.tags?.some(t => t.slug === activeTag))
            : allPosts;

        setPageCount(Math.ceil(filtered.length / POSTS_PER_PAGE));
        setCurrentPage(page);

        const offset = (page - 1) * POSTS_PER_PAGE;
        setPaginatedPosts(filtered.slice(offset, offset + POSTS_PER_PAGE));
        
    }, [location.search, allPosts]);
    
    const bgStyles = {
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(0, 112, 115, 0.1) 0%, rgba(0, 31, 84, 0.05) 35%, transparent 70%)
        `,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
    };

    return (
        <section className="bg-black text-white py-16 sm:py-24 border-t border-zinc-800" style={bgStyles}>
            <div className="container max-w-8xl mx-auto px-4">
                <h2 className="text-5xl md:text-6xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                    Все статьи
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post) => (
                        <article key={post.slug} className="group relative flex flex-col bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm rounded-none transition-all duration-300 hover:border-zinc-700">
                            <div className="relative overflow-hidden">
                                <Link to={`/blog/${post.slug}`} className="block">
                                    <img src={post.imageUrl} alt={post.title} className="w-full aspect-[1.6] object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity opacity-0 group-hover:opacity-100"></div>
                                </Link>
                            </div>

                            <div className="flex flex-col flex-grow p-6">
                                <div className="flex justify-between items-center text-zinc-500 text-xs border-b border-zinc-800 pb-3 mb-4">
                                    <div className="flex flex-wrap gap-x-2">
                                        {post.tags?.slice(0, 1).map(tag => (
                                            <Link key={tag.slug} to={`/blog?tag=${tag.slug}`} className="font-semibold text-zinc-400 hover:text-white">
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <ClockIcon />
                                        <span>{post.readingTime}</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    <Link to={`/blog/${post.slug}`} className="hover:text-purple-400 transition-colors">
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                        {post.title}
                                    </Link>
                                </h3>
                                
                                <p className="text-zinc-400 text-base mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                
                                <div className="flex items-center gap-x-6 text-zinc-500 text-sm border-t border-zinc-800 pt-4 mt-auto">
                                    <div className="flex items-center gap-1.5" title="Лайки"><HeartIcon /> <span>{post.stats?.likes ?? 0}</span></div>
                                    <div className="flex items-center gap-1.5" title="Комментарии"><CommentIcon /> <span>{post.stats?.comments ?? 0}</span></div>
                                    <div className="flex items-center gap-1.5" title="Просмотры"><EyeIcon /> <span>{post.stats?.views ?? 0}</span></div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={pageCount} 
                    baseUrl={location.pathname}
                />
            </div>
        </section>
    );
}