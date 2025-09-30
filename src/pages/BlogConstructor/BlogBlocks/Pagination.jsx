// Файл: Pagination.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- Иконки для навигации ---
const ChevronLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

// --- Основной компонент с финальным дизайном и логикой ---
export default function Pagination({ currentPage, totalPages, baseUrl = '/blog' }) {
    if (totalPages <= 1) return null;

    const location = useLocation();

    // Функция для создания URL, сохраняющая query-параметры (например, ?tag=...)
    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(location.search);
        params.set('page', pageNumber);
        return `${baseUrl}?${params.toString()}`;
    };

    /**
     * Создает массив номеров страниц для отображения.
     * Показывает первую, последнюю и несколько страниц вокруг текущей.
     * @returns {(number|string)[]} Массив номеров и/или троеточий.
     */
    const generatePageNumbers = () => {
        const pages = new Set();
        const pagesToShow = 6; // Максимальное количество видимых номеров
        const half = Math.floor(pagesToShow / 2);

        // Всегда добавляем первую страницу
        pages.add(1);

        // Определяем диапазон страниц вокруг текущей
        let start = Math.max(2, currentPage - half + 1);
        let end = Math.min(totalPages - 1, currentPage + half);

        // Корректируем диапазон, если мы у краев
        if (currentPage <= half) {
            start = 2;
            end = Math.min(totalPages - 1, pagesToShow);
        }
        if (currentPage > totalPages - half) {
            start = Math.max(2, totalPages - pagesToShow + 1);
            end = totalPages - 1;
        }

        // Добавляем левое троеточие, если нужно
        if (start > 2) {
            pages.add('...');
        }

        // Добавляем страницы из диапазона
        for (let i = start; i <= end; i++) {
            pages.add(i);
        }

        // Добавляем правое троеточие, если нужно
        if (end < totalPages - 1) {
            pages.add('...');
        }

        // Всегда добавляем последнюю страницу
        pages.add(totalPages);

        return Array.from(pages);
    };

    const pageLinks = totalPages > 6 ? generatePageNumbers() : Array.from({ length: totalPages }, (_, i) => i + 1);

    const baseButtonClass = "flex items-center justify-center w-10 h-10 border text-sm font-semibold transition-colors duration-200 rounded-none";
    const inactiveButtonClass = "bg-transparent text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white";
    const activeButtonClass = "bg-white text-black border-white cursor-default";

    return (
        <nav className="flex justify-center items-center gap-x-2 mt-16 sm:mt-24">
            {/* Кнопка "Назад" */}
            <Link
                to={createPageUrl(currentPage - 1)}
                className={`${baseButtonClass} ${inactiveButtonClass} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => currentPage === 1 && e.preventDefault()}
                aria-disabled={currentPage === 1}
            >
                <ChevronLeftIcon />
            </Link>

            {/* Номера страниц */}
            {pageLinks.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10 text-zinc-500">
                            ...
                        </span>
                    );
                }
                
                return (
                    <Link
                        key={page}
                        to={createPageUrl(page)}
                        className={`${baseButtonClass} ${currentPage === page ? activeButtonClass : inactiveButtonClass}`}
                    >
                        {page}
                    </Link>
                );
            })}

            {/* Кнопка "Вперед" */}
            <Link
                to={createPageUrl(currentPage + 1)}
                className={`${baseButtonClass} ${inactiveButtonClass} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => currentPage === totalPages && e.preventDefault()}
                aria-disabled={currentPage === totalPages}
            >
                <ChevronRightIcon />
            </Link>
        </nav>
    );
}