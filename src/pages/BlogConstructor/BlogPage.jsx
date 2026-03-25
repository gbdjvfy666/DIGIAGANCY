import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Удаляем импорт blogPostsData, теперь работаем с Firebase
import { db } from '../../firebase'; 
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

import BlogHeroBlock from './BlogBlocks/BlogHeroBlock';
import BlogContentBlock from './BlogBlocks/BlogContentBlock';
import BlogCommentsBlock from './BlogBlocks/BlogCommentsBlock';
import BlogRecommendedBlock from './BlogBlocks/BlogRecommendedBlock';
import TagsNavBlock from './BlogBlocks/TagsNavBlock'; 
import PostsGridBlock from './BlogBlocks/PostsGridBlock'; 

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
    
    const [pageData, setPageData] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { refreshScroll } = useSmoothScroll();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Загружаем данные текущей страницы
                const docRef = doc(db, 'posts', pageSlug);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPageData(docSnap.data());
                }

                // 2. Если это главная блога, подгружаем все посты для сетки
                if (pageSlug === 'blog-index') {
                    const querySnapshot = await getDocs(collection(db, 'posts'));
                    const posts = querySnapshot.docs
                        .map(d => ({ id: d.id, ...d.data() }))
                        .filter(p => !p.isIndexPage);
                    setAllPosts(posts);
                }
            } catch (error) {
                console.error("Ошибка загрузки блога:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageSlug]);

    // Обновление скролла при загрузке данных
    useEffect(() => {
        if (!loading && refreshScroll) {
            const timer = setTimeout(() => refreshScroll(), 150);
            return () => clearTimeout(timer);
        }
    }, [loading, pageData, refreshScroll]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-pulse text-xl">Загрузка контента...</div>
            </div>
        );
    }

    if (!pageData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-xl mt-4">Статья не найдена в базе данных.</p>
                <Link to="/blog" className="mt-8 px-6 py-3 bg-purple-600 rounded-lg">Вернуться в блог</Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${pageData.isIndexPage ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <main>
                {pageData.blocks.map((block, index) => {
                    const Component = blockComponents[block.type];
                    if (!Component) return null; 

                    const props = {
                        data: block.data,
                        key: `${pageSlug}-${index}`
                    };
                    
                    if (block.type === 'hero') {
                        props.pageContext = pageData;
                    } else if (block.type === 'posts-grid') {
                        props.allPosts = allPosts;
                    }

                    return <Component {...props} />;
                })}
            </main>
        </div>
    );
}