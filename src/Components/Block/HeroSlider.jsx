// src/Components/Block/HeroSlider.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// --- Порядок импорта стилей КРИТИЧЕСКИ ВАЖЕН! ---
// 1. Сначала стили библиотеки
import 'swiper/css';
import 'swiper/css/effect-fade';

// 2. Потом наши кастомные стили
import './HeroSlider.css';
import './ProgressNavigation.css'; // Можно оставить здесь или перенести в HeroSlider.css

import FractalOrbComponent from './ProfileCard/FractalOrbComponent.jsx';
import NoiseBackgroundBig from '../other/background/NoiseBacgroundBig/NoiseBacgroundBig.jsx';
import Slider from './Slider.jsx';
import DashboardCard from './DashboardCard.jsx';
import DigitalInfo from './DigitalInfo';
import ProgressNavigation from './ProgressNavigation.jsx';

// Данные и константы остаются без изменений
const SLIDES_DATA = [
    // ... (содержимое массива не меняется)
    { id: 'fractal', Component: FractalOrbComponent },
    {
        id: 'digital',
        Component: () => (
        <NoiseBackgroundBig height="100vh">
            <div className="min-h-screen w-full flex items-center justify-center px-8 lg:px-24">
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
                <div className="w-full lg:w-5/12">
                <DigitalInfo />
                </div>
                <div className="w-full lg:w-6/12">
                <Slider />
                </div>
            </div>
            </div>
        </NoiseBackgroundBig>
        ),
    },
    {
        id: 'dashboard',
        Component: () => (
        <NoiseBackgroundBig height="100vh">
            <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
            <DashboardCard />
            </div>
        </NoiseBackgroundBig>
        ),
    },
];
const AUTOPLAY_DELAY = 7000;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNavigate = (index) => {
    swiperRef.current?.swiper.slideToLoop(index); // Используем slideToLoop для бесконечного слайдера
  };

  return (
    // 1. ИЗМЕНЕНИЕ ЗДЕСЬ: Добавляем наш новый класс-обертку
    <div className="hero-container">
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        speed={1200}
        allowTouchMove={false}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, EffectFade]}
        // 2. ИЗМЕНЕНИЕ ЗДЕСЬ: Применяем класс, описанный в CSS
        className="hero-swiper"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {SLIDES_DATA.map(({ id, Component }) => (
          <SwiperSlide key={id}>
            <Component />
          </SwiperSlide>
        ))}
      </Swiper>

      <ProgressNavigation
        key={activeIndex}
        slideCount={SLIDES_DATA.length}
        activeIndex={activeIndex}
        onNavigate={handleNavigate}
        autoplayDelay={AUTOPLAY_DELAY}
      />
    </div>
  );
}