import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from './BlogData'; // Убрали blogCategoryData, так как он больше не нужен здесь
import BlogHeroBlock from './BlogBlocks/BlogHeroBlock';
import BlogContentBlock from './BlogBlocks/BlogContentBlock';
import BlogCommentsBlock from './BlogBlocks/BlogCommentsBlock';
import BlogRecommendedBlock from './BlogBlocks/BlogRecommendedBlock';
import TagsNavBlock from './BlogBlocks/TagsNavBlock'; 
import PostsGridBlock from './BlogBlocks/PostsGridBlock'; 
import Footer from '@/Components/other/Footer';

const blockComponents = {
  hero: BlogHeroBlock,
  content: BlogContentBlock,
  comments: BlogCommentsBlock,
  recommended: BlogRecommendedBlock,
  'tags-nav': TagsNavBlock,
  'posts-grid': PostsGridBlock,
  // 'breadcrumbs': BreadcrumbsBlock, // <--- 2. УДАЛИТЕ ЭТУ СТРОКУ
};

export default function BlogPage() {
    const { slug } = useParams();
    const pageSlug = slug || 'blog-index';
    const pageData = blogPostsData[pageSlug];
    const allPosts = Object.values(blogPostsData).filter(p => !p.isIndexPage);

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

    const isIndexPage = pageData.isIndexPage;

    return (
        <div className={`min-h-screen ${isIndexPage ? 'bg-white text-black' : 'bg-black text-white'}`}>

            <main className="pt-24">
                
                <div className={`container max-w-8xl mx-auto px-4 mb-8 ${isIndexPage ? 'text-black' : 'text-zinc-400'}`}>
                    <Link to="/" className={`${isIndexPage ? 'text-zinc-500 hover:text-black' : 'hover:text-white'}`}>Главная</Link>
                    <span className="mx-2">/</span>
                    
                    {isIndexPage ? (
                        <span className="font-medium">Блог</span>
                    ) : (
                        <>
                            <Link to="/blog" className="hover:text-white">Блог</Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">{pageData.title}</span>
                        </>
                    )}
                </div>
                  
                {pageData.blocks.map((block, index) => {
                    const Component = blockComponents[block.type];
                    if (!Component) return null; 

                    const props = {
                        ...(block.data && { data: block.data }),
                    };
                    
                    if (block.type === 'posts-grid') {
                        props.allPosts = allPosts;
                    }

                    return <Component key={index} {...props} />;
                })}
            </main>
            
            <Footer />
        </div>
    );
}