// Home.jsx (Финальная версия с улучшенным расположением)

import React from 'react';
import '../index.css';
import VideoGrid from '../Components/Block/ServicesGrid.jsx';
import FractalOrbComponent from '../Components/Block/ProfileCard/FractalOrbComponent.jsx';
import CtaBanner from '../Components/Block/CtaBanner.jsx';  
import NoiseBackgroundBig from '../Components/other/background/NoiseBacgroundBig/NoiseBacgroundBig.jsx'; 
import Divider from '../Components/other/Divider.jsx';
import Slider from '../Components/Block/Slider.jsx';
import ServicesSection from '../Components/Block/ServicesComponent.jsx';
import DashboardCard from '../Components/Block/DashboardCard.jsx'; 
import DigitalInfo from '@/Components/Block/DigitalInfo';
import HeroSlider from '../Components/Block/HeroSlider.jsx';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white ">
      <HeroSlider />
      <Divider />
      {/* Остальные компоненты */}
      <div className="flex-grow bg-white dark:bg-zinc-900 px-0">
        <VideoGrid />
      </div>
            <ServicesSection />
            <CtaBanner />
    </div>
  );
}