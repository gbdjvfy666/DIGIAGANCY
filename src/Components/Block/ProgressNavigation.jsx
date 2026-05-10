// src/Components/Block/ProgressNavigation.jsx

import React from 'react';
import './ProgressNavigation.css'; // Стили мы создадим в следующем шаге

const ProgressNavigation = ({ slideCount, activeIndex, onNavigate, autoplayDelay }) => {
  return (
    <div className="progress-nav">
      {/* Создаем массив нужной длины и рендерим для него полосы */}
      {Array.from({ length: slideCount }).map((_, index) => (
        <div
          key={index}
          className={`progress-bar-container ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onNavigate(index)} // Навигация по клику
        >
          {/* Внутренняя полоса, которая будет анимироваться */}
          <div
            className="progress-bar-fill"
            style={{
              // Устанавливаем длительность анимации равной задержке автопрокрутки
              animationDuration: `${autoplayDelay}ms`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ProgressNavigation;