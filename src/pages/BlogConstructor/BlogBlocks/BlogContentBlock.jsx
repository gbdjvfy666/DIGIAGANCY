import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import CtaCard from './CtaCard';
import QuoteCard from './QuoteCard';

// Компонент для рендеринга содержания (без изменений)
const TableOfContentsList = ({ items, level = 0, parentIndex = '' }) => {
    const olClasses = level === 0 ? "space-y-3" : "space-y-2 mt-2";
    const linkClasses = level === 0 ? "text-lg font-medium" : "text-base font-normal";
    
    return (
        <ol className={`list-none pl-0 ${olClasses}`}>
            {items.map((item, index) => {
                const itemIndex = level === 0 ? `${index + 1}` : `${parentIndex}.${index + 1}`;
                return (
                    <li key={index}>
                        <a href={item.link} className={`flex items-start gap-x-3 text-zinc-300 hover:text-white transition-colors ${linkClasses}`}>
                            <span className={`flex-shrink-0 w-8 text-right font-semibold ${level === 0 ? 'bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent' : 'text-zinc-500'}`}>
                                {itemIndex}
                            </span>
                            <span className="flex-grow">{item.title}</span>
                        </a>
                        {item.children && item.children.length > 0 && (
                            <div className="pl-11 mt-1">
                                <TableOfContentsList items={item.children} level={level + 1} parentIndex={itemIndex} />
                            </div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
};

// ===================================================================================
// ОСНОВНОЙ КОМПОНЕНТ БЛОКА С АДАПТИВНОЙ ЛОГИКОЙ
// ===================================================================================
export default function BlogContentBlock({ data }) {
    if (!data || !data.htmlContent) return null;

    const containerRef = useRef(null);
    const navRef = useRef(null);
    const [navTransformY, setNavTransformY] = useState(0);

    // --- ИЗМЕНЕНИЕ №1: Отслеживаем, является ли экран большим ---
    // (lg в Tailwind по умолчанию 1024px)
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', checkScreenSize);
        // Очистка при размонтировании
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);


    useLayoutEffect(() => {
        // --- ИЗМЕНЕНИЕ №2: Вся логика скролла работает ТОЛЬКО на больших экранах ---
        if (isLargeScreen) {
            const handleScroll = () => {
                if (!containerRef.current || !navRef.current) return;

                const TOP_OFFSET = 96;
                const containerRect = containerRef.current.getBoundingClientRect();
                const navHeight = navRef.current.offsetHeight;
                const containerHeight = containerRef.current.offsetHeight;

                if (containerRect.top > TOP_OFFSET) {
                    setNavTransformY(0); return;
                }
                if (containerRect.bottom < navHeight + TOP_OFFSET) {
                    setNavTransformY(containerHeight - navHeight); return;
                }
                setNavTransformY(TOP_OFFSET - containerRect.top);
            };

            let animationFrameId;
            const animationLoop = () => {
                handleScroll();
                animationFrameId = requestAnimationFrame(animationLoop);
            };

            animationLoop();
            return () => cancelAnimationFrame(animationFrameId);
        } else {
            // На маленьких экранах просто сбрасываем сдвиг
            setNavTransformY(0);
        }
    }, [data, isLargeScreen]); // Добавляем isLargeScreen в зависимости

    return (
        <section className="bg-black text-white py-16">
            <div className="container max-w-8xl mx-auto px-4">
                <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-4 lg:gap-16">
                    
                    <aside className="lg:col-span-1 mb-12 lg:mb-0">
                        {/* 
                          --- ИЗМЕНЕНИЕ №3: Позиционирование становится абсолютным ТОЛЬКО на больших экранах ---
                          На маленьких экранах оно будет 'static' по умолчанию.
                        */}
                        <div 
                            ref={navRef} 
                            className="w-full lg:max-w-xs lg:absolute"
                            style={{ transform: `translateY(${navTransformY}px)` }}
                        > 
                            <div className="relative pr-6 before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-cyan-400">
                                <h3 className="text-2xl font-bold mb-6">Содержание:</h3>
                                <nav>
                                    <TableOfContentsList items={data.tableOfContents || []} />
                                </nav>
                            </div>
                        </div>
                    </aside>

                    <article className="lg:col-span-3">
                        <div
                            className="prose prose-lg prose-invert max-w-none prose-h2:text-3xl prose-h3:text-2xl prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-img:rounded-lg"
                            dangerouslySetInnerHTML={{ __html: data.htmlContent }}
                        />
                        <CtaCard />
                        <QuoteCard />
                    </article>
                </div>
            </div>
        </section>
    );
}