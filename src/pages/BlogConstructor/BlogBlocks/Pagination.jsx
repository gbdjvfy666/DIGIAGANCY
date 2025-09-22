import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Pagination({ currentPage, totalPages, baseUrl = '/blog' }) {
    if (totalPages <= 1) return null;

    // 1. Получаем доступ к текущим параметрам URL
    const location = useLocation();

    // 2. Функция для создания правильной ссылки, сохраняющей все параметры
    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(location.search);
        params.set('page', pageNumber);
        return `${baseUrl}?${params.toString()}`;
    };

    const createPageLinks = () => {
        let pages = [];
        // В будущем здесь можно добавить логику для "..."
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Link
                    key={i}
                    to={createPageUrl(i)} // Используем новую функцию
                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === i ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-200'}`}
                >
                    {String(i).padStart(2, '0')}
                </Link>
            );
        }
        return pages;
    };

    return (
        <nav className="flex justify-center items-center gap-4 mt-16 text-zinc-600">
            {currentPage > 1 && (
                <Link to={createPageUrl(currentPage - 1)} className="hover:text-black">&lt; Назад</Link>
            )}
            
            <div className="flex items-center gap-2">
                {createPageLinks()}
            </div>

            {currentPage < totalPages && (
                <Link to={createPageUrl(currentPage + 1)} className="hover:text-black">Вперед &gt;</Link>
            )}
        </nav>
    );
}