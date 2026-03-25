import React from 'react';

// ======================= КОМПОНЕНТ-ОБЁРТКА ДЛЯ ФОНА =======================
const LuminousBackground = ({ children }) => {
    // Стили для обертки всего контента
    const wrapperStyle = {
        position: 'relative',
        background: '#000000',
        overflow: 'hidden',
        // 👇 ВОТ ИСПРАВЛЕНИЕ 👇
        minHeight: '100vh', // Гарантирует, что черный фон покроет весь экран по высоте
    };

    // Стили для самого фона в виде сетки
    const backgroundGridStyle = {
        '--size': '45px',
        '--line': 'rgba(255, 255, 255, 0.08)',
        content: '""',
        height: '100vh',
        width: '100vw',
        position: 'fixed', 
        background: `
            linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) calc(var(--size) * 0.36) 50% / var(--size) var(--size), 
            linear-gradient(var(--line) 1px, transparent 1px var(--size)) 0% calc(var(--size) * 0.32) / var(--size) var(--size)
        `,
        mask: 'linear-gradient(-20deg, transparent 50%, white)',
        WebkitMask: 'linear-gradient(-20deg, transparent 50%, white)',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
    };

    // Стили для контейнера с контентом
    const contentStyle = {
        position: 'relative',
        zIndex: 1,
    };
    
    return (
        <div style={wrapperStyle}>
            <div style={backgroundGridStyle} />
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

export default LuminousBackground;