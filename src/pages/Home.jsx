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
import NoiseBackgroundsecond from '../Components/background/NoiseBackgroundsecond/NoiseBackgroundsecond.jsx';
import Divider from '../Components/other/Divider.jsx';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white">
      <FractalOrbComponent />
      <Divider />
      {/* Первый раздел: текст и слайдер (как на фото) */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-full min-h-[150vh]">
        <div className="absolute inset-0 z-0">
          <NoiseBackground height="100%" /> 
        </div>
 
        <div className="z-20 w-full flex flex-col md:flex-row items-center justify-between h-full p-4 lg:p-24"> 
          
          {/* Контейнер для текста */}
          <div className="w-full md:w-1/3 text-left mb-8 md:mb-0"> 
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              DIGITAL
            </h1>
            <p className="text-base sm:text-lg md:text-xl">
              Здесь вы можете добавить любой текст, который вам нужен. 
              Например, описание проекта, слоган или любую другую информацию, 
              которая будет дополнять ваш слайдер.
            </p>
          </div>
          
          {/* Контейнер для слайдера */}
          <div className="w-full md:w-1/2"> 
            <Slider />
          </div>
        </div>
      </div>

      {/* Второй раздел: Текст и слайдер со вторым фоном */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-full min-h-[150vh]">
        <div className="absolute inset-0 z-0">
          <NoiseBackgroundsecond height="100%" /> 
        </div>
 
        <div className="z-20 w-full flex flex-col md:flex-row items-center justify-between h-full p-4 lg:p-24"> 
          
          {/* Контейнер для слайдера - теперь он первым */}
          <div className="w-full md:w-1/2"> 
            <Slider />
          </div>
          
          {/* Контейнер для текста - теперь он вторым */}
          <div className="w-full md:w-1/3 text-left mb-8 md:mb-0"> 
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              SECOND SECTION
            </h1>
            <p className="text-base sm:text-lg md:text-xl">
              Это второй раздел с другим фоном.
            </p>
          </div>
        </div>
      </div>
      
      {/* Остальные компоненты */}
      <div className="flex-grow bg-white dark:bg-zinc-900 px-0">
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