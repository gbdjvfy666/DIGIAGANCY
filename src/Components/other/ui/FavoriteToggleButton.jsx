import React from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { useFavorites } from '../../hooks/favorites/useFavorites';

/**
 * Кнопка для добавления или удаления автомобиля из избранного.
 * 
 * @param {object} props
 * @param {string | number} props.carId - Уникальный идентификатор автомобиля.
 * @param {object} [props.customStyles={}] - Дополнительные стили для кастомизации кнопки.
 * @returns {JSX.Element | null} Компонент кнопки или null, если carId не предоставлен.
 */
const FavoriteToggleButton = ({ carId, customStyles = {} }) => {
    // 1. Проверка: если ID автомобиля не передан, компонент не будет отображаться.
    if (!carId || carId === 'N/A') {
        return null;
    }

    // 2. Получаем функции и состояние из Redux.
    const { currentUser } = useAuth();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    
    // 3. Проверяем, находится ли текущий автомобиль в избранном.
    const isCurrentlyFavorite = isFavorite(carId);

    // 4. Обработчик клика по кнопке.
    const handleClick = (e) => {
        // Предотвращаем срабатывание родительских событий (например, переход по ссылке карточки).
        e.stopPropagation();
        e.preventDefault();
        
        // 5. Проверка авторизации: только вошедшие в систему пользователи могут управлять избранным.
        if (!currentUser) {
            alert("Пожалуйста, войдите в систему, чтобы добавлять автомобили в избранное.");
            return;
        }

        // 6. В зависимости от текущего состояния, добавляем или удаляем из избранного.
        if (isCurrentlyFavorite) {
            removeFromFavorites(carId);
        } else {
            addToFavorites(carId);
        }
    };

    // 7. Базовые стили для кнопки.
    const baseStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: isCurrentlyFavorite ? '#FFD700' : '#FFFFFF', // Золотой цвет для активной, белый для неактивной
        transition: 'all 0.2s ease',
        zIndex: 3,
    };

    // 8. Объединяем базовые стили с кастомными, переданными через props.
    const finalStyle = { ...baseStyle, ...customStyles };

    // 9. Иконка "звезды" в формате SVG.
    // `fill` меняется в зависимости от того, в избранном ли автомобиль.
    const svgIcon = (
        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isCurrentlyFavorite ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );

    // 10. Рендеринг самой кнопки.
    return (
        <button 
            style={finalStyle} 
            onClick={handleClick} 
            title={isCurrentlyFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            aria-label={isCurrentlyFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
            {svgIcon}
        </button>
    );
};

export default FavoriteToggleButton;