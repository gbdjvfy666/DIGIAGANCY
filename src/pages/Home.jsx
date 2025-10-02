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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white ">
      <FractalOrbComponent />
      <Divider />

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
            <ServicesSection />
            <CtaBanner />
    </div>
  );
}