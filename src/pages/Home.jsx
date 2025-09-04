// Home.jsx
import React from 'react';
import Slider from '../Components/components/Slider.jsx';
import Navbar from '../Components/components/Navbar.jsx';
import '../index.css';
import TextEffect from '../Components/components/TextEffect.jsx';
import VideoGrid from '../Components/animatedblock/ServicesGrid.jsx';
import ParallaxCardSlider from '../Components/animatedblock/ParallaxCardSlider.jsx';
import FractalOrbComponent from '../Components/animatedblock/ProfileCard/FractalOrbComponent.jsx';
import Footer from '../Components/components/Footer.jsx';
import StarBackground from '../Components/background/StarBackground.jsx';
import SpacePage from '../Components/animatedblock/Spaceswiper/SpacePage.jsx';
import NoiseBackground from '../Components/background/NoiseBackground/NoiseBackground.jsx';


export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      <FractalOrbComponent />

      {/* Контейнер для слайдера */}
      <div className="relative w-full min-h-screen flex items-center justify-center z-30 bg-transparent">
        <NoiseBackground />
        
        {/* Явная разделительная линия сверху */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 z-40" />
        
        {/* Контейнер для слайдера */}
        <div className="relative z-20 w-full">
          <Slider />
        </div>
      </div>
      
      {/* Остальные компоненты */}
      <div className="bg-white dark:bg-zinc-900 px-0">
        <Navbar />
        <VideoGrid />
      </div>
      <div className="relative z-50">
        <TextEffect/>
      </div>
      <StarBackground>
        <div className="text-white p-8">
          <h1 className="text-4xl font-bold">Ваш контент</h1>
          <p>Этот текст будет поверх звездного фона</p>
        </div>
      </StarBackground>
      <SpacePage />

      <ParallaxCardSlider/> 
      <ParallaxCardSlider/> 
      <ParallaxCardSlider/> 
      
      <Footer 
        topButtonText="Дальше проекты" 
        topButtonLink="/projects"
      />
    </div>
  );
}