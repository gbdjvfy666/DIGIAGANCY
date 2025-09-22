// src/Components/icons/icoItems.jsx

import React from 'react';

// Общий компонент-обертка для применения градиента ко всем иконкам
const GradientIcon = ({ children, className }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={className} stroke="url(#tag-icon-gradient)">
        <defs>
            <linearGradient id="tag-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" /> 
                <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
        </defs>
        {children}
    </svg>
);

// Экспортируем каждую иконку как именованный компонент
export const AydentikaIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" /></GradientIcon>;
export const BrendbukiIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></GradientIcon>;
export const BrendyngIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></GradientIcon>;
export const VebDizaynIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m3.75-3.75v3.75m-7.5-3.75L3 16.5m18 0l-3.75-3.75M3 12l3.75 3.75m12-3.75L21 12m-9 8.25h.008v.008H12v-.008z" /></GradientIcon>;
export const VideorolikiIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.357-.466.557-.327l5.603 3.112z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6A2.25 2.25 0 002.25 8.25v7.5A2.25 2.25 0 004.5 18h15a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0019.5 6h-15z" /></GradientIcon>;
export const DizaynIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L12 5.25l2.846.813a4.5 4.5 0 013.09 3.09L21.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM12 12V2.25" /></GradientIcon>;
export const KopiraytingIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></GradientIcon>;
export const LogotipyIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.528-1.036.246-2.59-.4-3.43l-4.286-4.286a.75.75 0 00-1.06 0l-4.286 4.286c-1.136.94-1.37 2.394-.4 3.43l3.03 2.496m0 0l2.496 3.03m0 0l-3.03-2.496" /></GradientIcon>;
export const MarketingIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></GradientIcon>;
export const NeyrosetiIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></GradientIcon>;
export const PoligraficheskiyDizaynIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></GradientIcon>;
export const PRIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5h-6a6 6 0 016-6v-1.5m6 7.5v-1.5a6 6 0 00-6-6m-6 2.25v-1.5a6 6 0 016-6v1.5m0 0V5.625M12 12.75v-1.5m0 0V5.625" /></GradientIcon>;
export const PrezentatsiiIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V5.25A2.25 2.25 0 0018 3H6A2.25 2.25 0 003.75 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5v15m-4.5-4.5l4.5-4.5 4.5 4.5" /></GradientIcon>;
export const ProdvizheniyeSaytovIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 013.375-3.375H5.25m17.25 9.75v-1.875a3.375 3.375 0 01-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H5.25m9 3.75a3.375 3.375 0 000-6.75M9 12.75h6" /></GradientIcon>;
export const ReklamaIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.25l-.75-.75-1.5 1.5-1.5-1.5L12 8.25v4.5l.75.75 1.5-1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM6 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm10.5-3.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" /></GradientIcon>;
export const SEOIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 11.25a3.75 3.75 0 00-7.5 0" /></GradientIcon>;
export const SozdaniyeSaytovIcon = ({ className }) => <GradientIcon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></GradientIcon>;
