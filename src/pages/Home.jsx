import React from 'react';
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
import SliderAndNoiseSection from '../Components/section/SliderAndNoiseSection.jsx';

export default function Home() {
    const section1Text = {
        title: 'DIGITAL',
        description: 'Здесь вы можете добавить любой текст, который вам нужен. Например, описание проекта, слоган или любую другую информацию, которая будет дополнять ваш слайдер.'
    };

    const section2Text = {
        title: 'SECOND SECTION',
        description: 'Это второй раздел с другим фоном.'
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white">
            <FractalOrbComponent />
            <Divider />

            {/* Первый раздел: текст и слайдер с первым фоном */}
            <SliderAndNoiseSection
                text={section1Text}
                noiseBackground={<NoiseBackground height="100%" />}
                sliderOnRight={true}
            />

            {/* Второй раздел: текст и слайдер со вторым фоном */}
            <SliderAndNoiseSection
                text={section2Text}
                noiseBackground={<NoiseBackgroundsecond height="100%" />}
                sliderOnRight={false}
            />

            <Divider />
            {/* Остальные компоненты */}
            <div className="flex-grow bg-white dark:bg-zinc-900 px-0">
                <Navbar />
                <VideoGrid />
            </div>
            <div className="relative z-50">
                <TextEffect />
            </div>
            <StarBackground>
                <div className="text-white p-8">
                    <h1 className="text-4xl font-bold">Ваш контент</h1>
                    <p>Этот текст будет поверх звездного фона</p>
                </div>
            </StarBackground>
            <SpacePage />

            <ParallaxCardSlider />
            <ParallaxCardSlider />
            <ParallaxCardSlider />
            <Footer
                topButtonText="Дальше проекты"
                topButtonLink="/projects"
            />
        </div>
    );
}