// Файл: src/pages/Blog/BlogBlocks/TagsNavBlock.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// ===================================================================================
// УЛУЧШЕННЫЙ НАБОР ИКОНОК
// ===================================================================================

const AydentikaIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />;
const BrendbukiIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />;
const BrendyngIcon = ({ className }) => <><path className={className} strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path className={className} strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></>;
const VebDizaynIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H5.25A2.25 2.25 0 003 3.75v16.5A2.25 2.25 0 005.25 22.5h13.5A2.25 2.25 0 0021 20.25V13.5m-9 0V3.75m0 9.75h5.25m-5.25 0l-2.25-4.5" />;
const VideorolikiIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.357-.466.557-.327l5.603 3.112zM4.5 6A2.25 2.25 0 002.25 8.25v7.5A2.25 2.25 0 004.5 18h15a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0019.5 6h-15z" />;
const DizaynIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L12 5.25l2.846.813a4.5 4.5 0 013.09 3.09L21.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a2.625 2.625 0 01-1.933-1.933L12.5 18.25l1.178-.648a2.625 2.625 0 011.933-1.933L16.25 14.5l.648 1.178a2.625 2.625 0 011.933 1.933L20 18.25l-1.178.648a2.625 2.625 0 01-1.933 1.933z" />;
const KopiraytingIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />;
const LogotipyIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0-2.25l2.25 1.313M12 12.75l-2.25 1.313M3.28 8.437l6.091 3.516m0 0l6.091-3.516M15.31 8.437l-3.091 1.792M9.219 8.437l3.091 1.792m0 0V3.75m-6.091 4.687L9.219 3.75m2.871 4.687l6.091-3.516M15.31 8.437L9.219 11.953" />;
const MarketingIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />;
const NeyrosetiIcon = ({ className }) => <><path className={className} strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path className={className} strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></>;
const PoligraficheskiyDizaynIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a8.504 8.504 0 01-2.228-2.228M6.72 13.829L3 16.5M16.5 3.75l-.165.165M16.5 3.75a.403.403 0 01.165.165m0 0C16.16 4.456 15.72 5.25 15 6l-1.803.801a5.94 5.94 0 01-4.04 4.041L3.75 16.5m12.75-12.75l-2.55 2.55" />;
const PRIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688 0-1.25-.563-1.25-1.25 0-.688.563-1.25 1.25-1.25h1.5c.688 0 1.25.563 1.25 1.25 0 .688-.563 1.25-1.25 1.25h-1.5zM4.75 3.75a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H4.75z" />;
const PrezentatsiiIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5v.154c0 .621.504 1.125 1.125 1.125h12c.621 0 1.125-.504 1.125-1.125V19.5h1.5m-17.25 0l-1.423-1.423m1.423 1.423l1.423-1.423m0 0l1.423-1.423m-1.423 1.423l-1.423 1.423M8.25 21v-4.5m8.25 4.5v-4.5m-8.25 0h8.25M3.75 16.5h16.5c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.75c-.621 0-1.125.504-1.125 1.125v8.995c0 .621.504 1.125 1.125 1.125z" />;
const ProdvizheniyeSaytovIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />;
const ReklamaIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6zM10.5 13.5L3 13.5m0 0l3.5-3.5M3 13.5l3.5 3.5" />;
const SEOIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048M15.362 5.214A3.375 3.375 0 0012 3.75c-1.18 0-2.239.52-2.962 1.342m5.924 0a3.375 3.375 0 01-5.924 0m5.924 0L12 10.5M12 3.75v.008v.008" />;
const SozdaniyeSaytovIcon = ({ className }) => <path className={className} strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />;

export { AydentikaIcon, BrendbukiIcon, BrendyngIcon, VebDizaynIcon, VideorolikiIcon, DizaynIcon, KopiraytingIcon, LogotipyIcon, MarketingIcon, NeyrosetiIcon, PoligraficheskiyDizaynIcon, PRIcon, PrezentatsiiIcon, ProdvizheniyeSaytovIcon, ReklamaIcon, SEOIcon, SozdaniyeSaytovIcon };

export const ICON_MAP = {
    aydentika: AydentikaIcon, brendbuki: BrendbukiIcon, brendyng: BrendyngIcon, dizayn: DizaynIcon, kopirayting: KopiraytingIcon, logotipy: LogotipyIcon, marketing: MarketingIcon, neyroseti: NeyrosetiIcon, 'poligraficheskiy-dizayn': PoligraficheskiyDizaynIcon, pr: PRIcon, prezentatsii: PrezentatsiiIcon, 'prodvizheniye-saytov': ProdvizheniyeSaytovIcon, reklama: ReklamaIcon, seo: SEOIcon, 'sozdaniye-saytov': SozdaniyeSaytovIcon, videoroliki: VideorolikiIcon, 'veb-dizayn': VebDizaynIcon,
};

// ===================================================================================
// ОСНОВНОЙ КОМПОНЕНТ
// ===================================================================================
export default function TagsNavBlock({ data }) {
    if (!data || !data.tags) return null;
    
    const location = useLocation();
    const activeTag = new URLSearchParams(location.search).get('tag');

    // Стили для фона
    const bgStyles = {
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px',
    };

    return (
        <section className="bg-black py-12 sm:py-16 border-t border-zinc-800" style={bgStyles}>
            <div className="container max-w-8xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                    Категории статей
                </h2>
                <nav className="flex flex-wrap gap-4">
                    {data.tags.map((tag) => {
                        const IconComponent = ICON_MAP[tag.id];
                        const isActive = (!activeTag && tag.id === 'all') || activeTag === tag.slug;
                        
                        return (
                            <div 
                                key={tag.id}
                                className={`
                                    rounded-none p-px relative transition-all duration-300
                                    ${isActive ? 'bg-gradient-to-br from-purple-500 to-cyan-400' : 'bg-transparent'}
                                `}
                            >
                                <Link 
                                    to={`/blog${tag.slug ? `?tag=${tag.slug}` : ''}`}
                                    className="group flex items-center h-full w-full px-5 py-3 rounded-none bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:bg-zinc-800/70 transition-colors duration-300"
                                >
                                    {IconComponent && (
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 mr-3 transition-all duration-300">
                                            <defs>
                                                <linearGradient id="tag-icon-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#c084fc" /> {/* purple-400 */}
                                                    <stop offset="100%" stopColor="#22d3ee" /> {/* cyan-400 */}
                                                </linearGradient>
                                            </defs>
                                            <IconComponent className={`
                                                stroke-2 transition-all duration-300
                                                ${isActive 
                                                    ? 'stroke-[url(#tag-icon-gradient-active)]' 
                                                    : 'stroke-zinc-500 group-hover:stroke-[url(#tag-icon-gradient-active)]'
                                                }`} 
                                            />
                                        </svg>
                                    )}
                                    <span className={`
                                        font-medium text-sm transition-colors duration-300
                                        ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}
                                    `}>
                                        {tag.name}
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </section>
    );
}