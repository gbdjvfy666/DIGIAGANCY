import React from 'react';
import { Link } from 'react-router-dom';

// Данные для этой карточки можно передавать через props, если они будут меняться
const AUTHOR_IMAGE_URL = "https://cdn.veonix.ru/upload/cssinliner_webp/bitrix/templates/veonix/assets/img/blog/bg/big-victor.webp";
const AUTHOR_NAME = "Виктор Некрасов";
const AUTHOR_POSITION = "Креативный директор Veonix";

export default function QuoteCard() {
    return (
        <aside className="relative bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 my-16">
             {/* Большая иконка кавычек на фоне */}
            <svg className="absolute top-4 right-8 w-32 h-32 text-zinc-700/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
            </svg>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <img src={AUTHOR_IMAGE_URL} alt={AUTHOR_NAME} className="w-40 h-40 rounded-full object-cover flex-shrink-0 border-4 border-zinc-700" />
                <div>
                    <blockquote className="text-xl italic text-white mb-4">
                        Делать дизайн, который помогает решать коммерческие задачи, а не только радует глаз — ключевой принцип дизайнеров Veonix.
                    </blockquote>
                    <Link to="/nasha-komanda/viktor-nekrasov/" target="_blank" className="font-bold text-white hover:underline">
                        {AUTHOR_NAME}
                    </Link>
                    <p className="text-zinc-400">{AUTHOR_POSITION}</p>
                </div>
            </div>
        </aside>
    );
}