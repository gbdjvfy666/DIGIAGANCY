import React from 'react';
import { Link } from 'react-router-dom';

const MOCKUP_IMAGE_URL = "https://cdn.veonix.ru/upload/cssinliner_webp/bitrix/templates/veonix/assets/img/blog/bg/blog-form-photo.webp";

export default function CtaCard() {
    return (
        <aside className="relative bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 my-16 overflow-hidden">
            <div className="relative z-10 lg:w-1/2">
                <h3 className="text-3xl font-bold text-white mb-4">Оставьте заявку</h3>
                <p className="text-zinc-300 mb-8">
                    И получите индивидуальную стратегию продвижения Вашего сайта
                </p>
                <Link to="/brief" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
                    Подробнее
                </Link>
            </div>
            {/* Декоративные изображения */}
            <div className="absolute z-0 right-0 top-0 bottom-0 lg:w-1/2 hidden lg:block">
                 <img src={MOCKUP_IMAGE_URL} alt="Примеры работ" className="absolute right-0 bottom-0 w-full h-auto object-contain" />
            </div>
        </aside>
    );
}