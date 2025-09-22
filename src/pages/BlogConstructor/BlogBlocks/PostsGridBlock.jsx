import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ICON_MAP } from './TagsNavBlock'; 
import Pagination from './Pagination';

// ... (код для иконок ClockIcon, HeartIcon и т.д. остается без изменений) ...
const ClockIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"></path><path d="M12 6V12.75H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg> );
const HeartIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.667l1.318-1.349a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" stroke="currentColor" strokeWidth="1.5" /></svg> );
const CommentIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12c0 4.97-4.03 9-9 9-2.03 0-3.92-.67-5.48-1.81L3 21l1.19-3.56A9.01 9.01 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" stroke="currentColor" strokeWidth="1.5" /></svg> );
const EyeIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" stroke="currentColor" strokeWidth="1.5" /><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" /></svg> );


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

    return (
        <section className="bg-white text-black py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Все статьи</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {paginatedPosts.map((post) => (
                        <article key={post.slug} className="flex flex-col">
                            <Link to={`/blog/${post.slug}`} className="block mb-4">
                                <img src={post.imageUrl} alt={post.title} className="w-full aspect-[1.48] object-cover rounded-lg" loading="lazy" />
                            </Link>
                            <div className="flex justify-between items-center text-zinc-500 text-sm mb-3">
                                <div className="flex items-center gap-2">
                                    <ClockIcon />
                                    <span>{post.readingTime}</span>
                                </div>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                <Link to={`/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">{post.title}</Link>
                            </h3>
                            <p className="text-zinc-600 text-base mb-4 line-clamp-3">{post.excerpt}</p>
                            <div className="flex justify-between items-center border-t border-b border-zinc-200 py-3 mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags?.slice(0, 2).map(tag => {
                                        const IconComponent = ICON_MAP[tag.id];
                                        return (
                                            <Link key={tag.slug} to={`/blog?tag=${tag.slug}`} className="flex items-center bg-zinc-100 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-zinc-200">
                                                {IconComponent && <IconComponent className="w-4 h-4 mr-1.5" />}
                                                <span>{tag.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4 text-zinc-500 text-sm mt-3">
                                <div className="flex items-center gap-1.5"><HeartIcon /> {post.stats?.likes ?? 0}</div>
                                <div className="flex items-center gap-1.5"><CommentIcon /> {post.stats?.comments ?? 0}</div>
                                <div className="flex items-center gap-1.5"><EyeIcon /> {post.stats?.views ?? 0}</div>
                            </div>
                        </article>
                    ))}
                </div>
                
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={pageCount} 
                    baseUrl={location.pathname} // Передаем базовый URL без параметров
                />
            </div>
        </section>
    );
}