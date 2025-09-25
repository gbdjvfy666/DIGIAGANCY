import React, { useState, useEffect, useRef } from 'react';
import './ThemeToggleCard.css'; // Импортируем стили

// === 1. Компонент для SVG-анимации (без изменений) ===
const WeatherDisplay = () => {
    const cloudsRef = useRef([]);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const animate = (time) => {
            cloudsRef.current.forEach((cloud, index) => {
                if (cloud) {
                    const speed = 0.0001 + (index * 0.00005);
                    const amplitude = 5 + (index * 2);
                    const sway = Math.sin(time * speed) * amplitude;
                    cloud.style.transform = `translateX(${sway}px)`;
                }
            });
            animationFrameId.current = requestAnimationFrame(animate);
        };
        animationFrameId.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <div className="weather-svg-container">
            <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
                <g className="sun-group" transform="translate(150, 200)">
                    <circle id="sun" cx="0" cy="0" r="50"/>
                </g>
                <g className="cloud-group">
                    <path ref={el => cloudsRef.current[2] = el} id="cloud3" transform="translate(150, 140)" d="M-75,0 H75 Q112.5,12.5 75,25 Q56.25,40 37.5,25 Q18.75,40 -0,25 Q-37.5,40 -75,25 Q-112.5,12.5 -75,0 Z" />
                    <path ref={el => cloudsRef.current[1] = el} id="cloud2" transform="translate(150, 160)" d="M-90,0 H90 Q135,15 90,30 Q67.5,50 45,30 Q22.5,50 0,30 Q-45,50 -90,30 Q-135,15 -90,0 Z" />
                    <path ref={el => cloudsRef.current[0] = el} id="cloud1" transform="translate(150, 180)" d="M-75,0 H75 Q112.5,12.5 75,25 Q56.25,40 37.5,25 Q18.75,40 -0,25 Q-37.5,40 -75,25 Q-112.5,12.5 -75,0 Z" />
                </g>
            </svg>
        </div>
    );
};


// === 2. Компонент переключателя (без изменений) ===
const ThemeSwitcher = ({ selectedTheme, onThemeChange }) => {
    const themeIndex = { system: 0, light: 1, dark: 2 }[selectedTheme];
    return (
        <div className="relative inline-grid grid-cols-3 rounded-full bg-black/20 p-1 text-white" style={{ width: '150px', height: '50px' }}>
            <div className="absolute top-0 left-0 z-0 w-1/3 h-full transition-transform duration-300 flex items-center justify-center p-1" style={{ transform: `translateX(${themeIndex * 100}%)` }}>
                <div className="w-11 h-11 rounded-full bg-white/50 backdrop-blur-md border border-white/40 shadow-inner shadow-white/20 pointer-events-none" />
            </div>
            <button onClick={() => onThemeChange('system')} className="z-10 rounded-full flex items-center justify-center" aria-label="System theme"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" /></svg></button>
            <button onClick={() => onThemeChange('light')} className="z-10 rounded-full flex items-center justify-center" aria-label="Light theme"><svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg></button>
            <button onClick={() => onThemeChange('dark')} className="z-10 rounded-full flex items-center justify-center" aria-label="Dark theme"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg></button>
        </div>
    );
};

// === 3. Основной экспортируемый компонент С НОВЫМ ТЕКСТОМ ===
export default function ThemeToggleCard() {
    const [selectedTheme, setSelectedTheme] = useState('system');
    const themeLabels = { system: 'Система', light: 'Свет', dark: 'Тьма' };
    const isSunny = selectedTheme === 'light';

    return (
        <div className="max-w-6xl mx-auto p-0 bg-white rounded-3xl shadow-xl border border-zinc-300/80 flex flex-col md:flex-row overflow-hidden group">
            
            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center space-y-4 bg-gradient-to-br from-zinc-100 to-zinc-200">
                {/* --- НОВЫЙ ТЕКСТ ЗДЕСЬ --- */}
                <span className="text-sm font-medium text-rose-600">
                  Адаптивный Интерфейс
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight">
                  Две стороны одной эстетики
                </h2>
                <p className="text-zinc-700 text-base leading-relaxed">
                  Современный веб-сайт — это не просто статичная картинка. Это живой интерфейс, который заботится о своем пользователе. Мы создаем проекты с двумя полноценными визуальными режимами. Светлая тема дарит ощущение чистоты и легкости днём, а тёмная — снижает нагрузку на глаза и создаёт уютную атмосферу в вечернее время. Это больше, чем просто переключатель. Это знак уважения к комфорту вашей аудитории.
                </p>
                <div className="mt-4 flex items-center space-x-2 text-sm text-zinc-600">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>Визуальный комфорт 24/7</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-zinc-600">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>Повышение лояльности аудитории</span>
                </div>
                {/* --- КОНЕЦ НОВОГО ТЕКСТА --- */}
            </div>

            <div className={`weather-panel md:w-2/5 ${isSunny ? 'is-sunny' : ''}`}>
                <WeatherDisplay />
                <div className="switcher-container">
                    <div className="relative z-10 p-6 bg-black/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-lg">
                        <ThemeSwitcher selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
                        <div className="mt-4 text-center text-sm text-white/90 font-semibold tracking-wider">{themeLabels[selectedTheme]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}