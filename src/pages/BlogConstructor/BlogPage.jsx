// Ваш файл: BlogPage.jsx

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from './BlogData'; 
import BlogHeroBlock from './BlogBlocks/BlogHeroBlock';
import BlogContentBlock from './BlogBlocks/BlogContentBlock';
import BlogCommentsBlock from './BlogBlocks/BlogCommentsBlock';
import BlogRecommendedBlock from './BlogBlocks/BlogRecommendedBlock';
import TagsNavBlock from './BlogBlocks/TagsNavBlock'; 
import PostsGridBlock from './BlogBlocks/PostsGridBlock'; 

// ✅ ВАЖНО: Убедитесь, что этот хук импортирован правильно
import { useSmoothScroll } from '../../Components/other/hooks/useSmoothScroll';

const blockComponents = {
  hero: BlogHeroBlock,
  content: BlogContentBlock,
  comments: BlogCommentsBlock,
  recommended: BlogRecommendedBlock,
  'tags-nav': TagsNavBlock,
  'posts-grid': PostsGridBlock,
};

export default function BlogPage() {
    const { slug } = useParams();
    const pageSlug = slug || 'blog-index';
    const pageData = blogPostsData[pageSlug];
    const allPosts = Object.values(blogPostsData).filter(p => !p.isIndexPage);

    // ✅ ВАЖНО: Получаем функцию refreshScroll из вашего хука
    const { refreshScroll } = useSmoothScroll();

    // ✅ ВАЖНО: Этот useEffect отвечает за обновление скролла при смене страницы
    useEffect(() => {
        // Небольшая задержка, чтобы React успел отрендерить новый контент
        const timer = setTimeout(() => {
            if (refreshScroll) {
                refreshScroll();
            }
        }, 100);

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }, [pageData, refreshScroll]); // Зависимость от pageData - ключ к работе!

    if (!pageData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-xl mt-4">Упс! Страница или статья, которую вы ищете, не найдена.</p>
                <Link to="/blog" className="mt-8 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                    Вернуться в блог
                </Link>
            </div>
        );
    }

    return (
        // Убраны статические "хлебные крошки"
        <div className={`min-h-screen ${pageData.isIndexPage ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <main className="">
                  
                {pageData.blocks.map((block, index) => {
                    const Component = blockComponents[block.type];
                    if (!Component) return null; 

                    const props = {};
                    
                    if (block.type === 'hero') {
                        // Для hero-блока передаем и его личные данные, и данные всей страницы
                        props.data = block.data;
                        props.pageContext = pageData; // pageContext содержит title, tags и т.д.
                    } else if (block.type === 'posts-grid') {
                        // Для других блоков логика остается прежней
                        props.data = block.data;
                        props.allPosts = allPosts;
                    } else {
                        props.data = block.data;
                    }

                    return <Component key={index} {...props} />;
                })}
            </main>
        </div>
    );
}