import React, { useRef, useEffect } from 'react';

// Функция для генерации случайных цветов
function randomColors(count) {
    return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
}

const TubesBackground = ({ colors, lightsColors }) => {
    const canvasRef = useRef(null);
    const appRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        let isMounted = true; // Флаг, чтобы избежать выполнения кода после размонтирования

        // Создаем асинхронную функцию для загрузки и инициализации
        const loadAndInit = async () => {
            try {
                // ИСПОЛЬЗУЕМ СОВРЕМЕННЫЙ ДИНАМИЧЕСКИЙ import()
                const module = await import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
                const TubesCursor = module.default; // Получаем экспорт по умолчанию

                if (isMounted && canvas) {
                    appRef.current = TubesCursor(canvas, {
                        tubes: {
                            colors: colors,
                            lights: {
                                intensity: 200,
                                colors: lightsColors
                            }
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to load TubesCursor script:", error);
            }
        };

        loadAndInit();

        const handleClick = () => {
            if (appRef.current) {
                appRef.current.tubes.setColors(randomColors(3));
                appRef.current.tubes.setLightsColors(randomColors(4));
            }
        };

        canvas.addEventListener('click', handleClick);

        // Функция очистки
        return () => {
            isMounted = false;
            canvas.removeEventListener('click', handleClick);
            if (appRef.current && typeof appRef.current.destroy === 'function') {
                appRef.current.destroy();
            }
            appRef.current = null;
        };
    }, [colors, lightsColors]); // Зависимости остаются

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-10 w-full h-full"
        />
    );
};

export default TubesBackground;