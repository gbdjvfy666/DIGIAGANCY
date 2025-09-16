import React from 'react';
import Navbar from '../Components/other/Navbar.jsx';
import '../index.css';
import VideoGrid from '../Components/animatedblock/ServicesGrid.jsx';
import ParallaxCardSlider from '../Components/animatedblock/ParallaxCardSlider.jsx';
import FractalOrbComponent from '../Components/animatedblock/ProfileCard/FractalOrbComponent.jsx';
import Footer from '../Components/other/Footer.jsx';
import StarBackground from '../Components/background/StarBackground.jsx';
import SpacePage from '../Components/animatedblock/Spaceswiper/SpacePage.jsx';
import NoiseBackground from '../Components/background/NoiseBackground/NoiseBackground.jsx';
import NoiseBackgroundsecond from '../Components/background/NoiseBackgroundsecond/NoiseBackgroundsecond.jsx';
import Divider from '../Components/other/Divider.jsx';
import SliderAndNoiseSection from '../Components/section/SliderAndNoiseSection.jsx';

export default function Home() {
    const section1Text = {
        title: 'DIGITAL',
        description: 'Мы специализируемся на трех китах современного digital-маркетинга: креотивном дизайне, функциональных сайтах и точном таргетинге. Это основа, которая гарантирует результат для вашего бизнеса.'
    };

    const section2Text = {
        title: 'НАШ ПОДХОД',
        description: 'Мы верим в системный подход. Каждый проект проходит через три ключевых этапа, которые гарантируют предсказуемый и качественный результат.'
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
            <StarBackground/>

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