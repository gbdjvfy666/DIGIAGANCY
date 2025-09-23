import React from 'react';
import '../index.css';
import VideoGrid from '../Components/animatedblock/ServicesGrid.jsx';
import FractalOrbComponent from '../Components/animatedblock/ProfileCard/FractalOrbComponent.jsx';
import StarBackground from '../Components/background/StarBackground.jsx';
import SpacePage from '../Components/animatedblock/Spaceswiper/SpacePage.jsx';
import NoiseBackgroundBig from '../Components/background/NoiseBacgroundBig/NoiseBacgroundBig.jsx'; 
import Divider from '../Components/other/Divider.jsx';
import Slider from '../Components/components/Slider.jsx';
import ServicesSection from '../Components/components/ServicesComponent.jsx';

// 1. Убедитесь, что DashboardCard импортирован
import DashboardCard from '../Components/DashboardCard.jsx'; // <-- Проверьте путь

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white">
      <FractalOrbComponent />
      <Divider />
      <ServicesSection />

      <NoiseBackgroundBig>
        {/* Главный контейнер без flex-свойств, чтобы дочерние блоки сами управляли своей высотой */}
        <div>

          {/* --- ЭКРАН 1: Существующий контент --- */}
          {/* Этот блок занимает высоту как минимум одного экрана (min-h-screen) 
              и центрирует контент по вертикали (items-center) */}
          <div className="min-h-screen w-full flex items-center p-4 lg:p-24">
            <div className="w-full flex flex-col md:flex-row items-start justify-between">
              {/* Левая часть: Текст */}
              <div className="w-full md:w-1/3 text-left mb-8 md:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">DIGITAL</h1>
                <p className="text-base sm:text-lg md:text-xl">Мы специализируемся на трех китах современного digital-маркетинга: креативном дизайне, функциональных сайтах и точном таргетинге. Это основа, которая гарантирует результат для вашего бизнеса.</p>
              </div>
              {/* Правая часть: Слайдер */}
              <div className="w-full md:w-1/2">
                <Slider />
              </div>
            </div>
          </div>

          <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
            <DashboardCard />
          </div>

        </div>
      </NoiseBackgroundBig>

      <Divider />
      {/* Остальные компоненты */}
      <div className="flex-grow bg-white dark:bg-zinc-900 px-0">
        <VideoGrid />
      </div>
      <StarBackground />
      <SpacePage />
    </div>
  );
}