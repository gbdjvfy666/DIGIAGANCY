// Home.jsx (Финальная версия с улучшенным расположением)

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
import DashboardCard from '../Components/DashboardCard.jsx'; 
import DigitalInfo from '@/Components/DigitalInfo';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white">
      <FractalOrbComponent />
      <Divider />
      <ServicesSection />
      <NoiseBackgroundBig>
        <div>
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