// src/pages/BlogBlocks/BlogRecommendedBlock.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// ИЗМЕНЕНИЕ: Цвет иконки изменен на более темный для контраста на белом фоне
const HeartIcon = () => (
    <svg className="w-4 h-4 ml-1 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.667l1.318-1.349a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
    </svg>
);


export default function BlogRecommendedBlock({ data }) {
    if (!data || !data.posts || data.posts.length === 0) {
        return null;
    }

    const { title = "Рекомендуем", posts } = data;

    return (
        // ИЗМЕНЕНИЕ: Фон изменен на белый, текст - на черный
        <section className="bg-white text-black py-16">
            <div className="container max-w-8xl mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">{title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.slug}>
                            <Link to={`/blog/${post.slug}`} className="block group">
                                {/* ИЗМЕНЕНИЕ: Фон-заглушка для картинки стал светло-серым */}
                                <div className="overflow-hidden rounded-lg aspect-[4/3] bg-zinc-200">
                                    <img 
                                        src={post.imageUrl} 
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                            <div className="flex justify-between items-start mt-4">
                                <Link to={`/blog/${post.slug}`}>
                                    <h3 className="text-lg font-semibold hover:text-purple-600 transition-colors">
                                        {post.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center flex-shrink-0 ml-4 pt-1">
                                    {/* ИЗМЕНЕНИЕ: Цвет текста лайков стал темнее */}
                                    <span className="text-zinc-500 font-medium text-sm">{post.likes}</span>
                                    <HeartIcon />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}