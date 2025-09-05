import React from 'react';
import Slider from '../components/Slider.jsx';
import SliderSecond from '../components/SliderSecond.jsx';

import f010 from '../../assets/flowers/010.png';
import f012 from '../../assets/flowers/012.png';
import f032 from '../../assets/flowers/032.png';
import f037 from '../../assets/flowers/037.png';
import f042 from '../../assets/flowers/042.png';
import f043 from '../../assets/flowers/043.png';
import f059 from '../../assets/flowers/059.png';
import f062 from '../../assets/flowers/062.png';
import f083 from '../../assets/flowers/083.png';
import f098 from '../../assets/flowers/098.png';
import f128 from '../../assets/flowers/128.png';
import f301 from '../../assets/flowers/301.png';
import f304 from '../../assets/flowers/304.png';
import f317 from '../../assets/flowers/317.png';
import f388 from '../../assets/flowers/388.png';
import f395 from '../../assets/flowers/395.png';
import f401 from '../../assets/flowers/401.png';
import f423 from '../../assets/flowers/423.png';
import f435 from '../../assets/flowers/435.png';
import f439 from '../../assets/flowers/439.png';
import f440 from '../../assets/flowers/440.png';
import f444 from '../../assets/flowers/444.png';
import f455 from '../../assets/flowers/455.png';
import f463 from '../../assets/flowers/463.png';


const SliderAndNoiseSection = ({ text, noiseBackground, sliderOnRight = true }) => {
    const content = sliderOnRight ? (
        <>
            <div className="w-full md:w-1/3 text-left mb-8 md:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    {text.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl">
                    {text.description}
                </p>
            </div>
            <div className="w-full md:w-1/2">
                <Slider />
            </div>
        </>
    ) : (
        <>
            <div className="w-full md:w-1/2">
                <SliderSecond />
            </div>
            <div className="w-full md:w-1/3 text-left mb-8 md:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    {text.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl">
                    {text.description}
                </p>
            </div>
        </>
    );

    return (
        <div className="relative flex-shrink-0 flex items-center justify-center w-full min-h-[150vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                {noiseBackground}
            </div>

            {!sliderOnRight && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Первый слой: задний план (z-index: 10) */}
                    <img src={f435} alt="flower" className="absolute bottom-[-6%] left-[-8%] w-[500px] h-auto filter brightness-75 contrast-125 rotate-5 opacity-90 z-10" />
                    <img src={f463} alt="flower" className="absolute bottom-[-12%] left-[10%] w-[450px] h-auto filter brightness-75 contrast-125 -rotate-15 opacity-85 z-10" />
                    <img src={f012} alt="flower" className="absolute bottom-[-10%] left-[40%] w-[550px] h-auto filter brightness-75 contrast-125 rotate-30 opacity-95 z-10" />
                    <img src={f032} alt="flower" className="absolute bottom-[-1%] left-[60%] w-[520px] h-auto filter brightness-75 contrast-125 rotate-20 opacity-90 z-10" />
                    <img src={f423} alt="flower" className="absolute bottom-[-6%] right-[0%] w-[450px] h-auto filter brightness-75 contrast-125 -rotate-5 opacity-75 z-10" />
                    <img src={f098} alt="flower" className="absolute bottom-[-7%] left-[-6%] w-[450px] h-auto filter brightness-75 contrast-125 rotate-15 z-50" />
                    <img src={f098} alt="flower" className="absolute bottom-[2%] right-[-15%] w-[550px] h-auto filter brightness-75 contrast-100 z-0" />
                    <img src={f388} alt="flower" className="absolute bottom-[-4%] left-[15%] w-[130px] h-auto filter brightness-75 contrast-125 -rotate-25 opacity-75 z-10" />
                    <img src={f037} alt="flower" className="absolute bottom-[-5%] right-[55%] w-[300px] h-auto filter brightness-75 contrast-125 rotate-30 opacity-80 z-30" />
                    <img src={f059} alt="flower" className="absolute bottom-[-1%] right-[60%] w-[400px] h-auto filter brightness-75 contrast-125 rotate-25 opacity-85 z-10" />
                    <img src={f043} alt="flower" className="absolute bottom-[-1%] right-[20%] w-[350px] h-auto filter brightness-75 contrast-125 -rotate-5 opacity-80 z-10" />
                    <img src={f010} alt="flower" className="absolute bottom-[-1%] left-[45%] w-[380px] h-auto filter brightness-75 contrast-125 rotate-20 opacity-75 z-10" />
                    {/* Второй слой: средний план (z-index: 20) */}
                    <img src={f444} alt="flower" className="absolute bottom-[10%] left-[-2%] w-[350px] h-auto filter brightness-75 contrast-125 -rotate-25 opacity-100 z-0" />
                    <img src={f439} alt="flower" className="absolute bottom-[-2%] right-[-4%] w-[400px] h-auto filter brightness-75 contrast-125 -rotate-50 opacity-60 z-5" />
                    <img src={f395} alt="flower" className="absolute bottom-[-10%] right-[20%] w-[330px] h-auto filter brightness-75 contrast-125 rotate-10 opacity-65 z-20" />
                    <img src={f301} alt="flower" className="absolute bottom-[-4%] left-[78%] w-[250px] h-auto filter brightness-75 contrast-125 -rotate-20 opacity-65 z-20" />
                    <img src={f401} alt="flower" className="absolute bottom-[-9%] right-[33%] w-[350px] h-auto filter brightness-75 contrast-125 rotate-0 opacity-70 z-20" />
                    {/* Третий слой: передний план (z-index: 30) */}
                    <img src={f440} alt="flower" className="absolute bottom-[-4%] right-[-9%] w-[400px] h-auto filter brightness-75 contrast-125 -rotate-15 opacity-90 z-30" />
                    <img src={f455} alt="flower" className="absolute bottom-[15%] right-[25%] w-[330px] h-auto filter brightness-75 contrast-125 -rotate-5 opacity-40 z-0" />
                    <img src={f304} alt="flower" className="absolute bottom-[-4%] left-[55%] w-[250px] h-auto filter brightness-75 contrast-125 rotate-50 opacity-50 z-20" />
                    <img src={f317} alt="flower" className="absolute bottom-[0%] left-[80%] w-[220px] h-auto filter brightness-75 contrast-125 rotate-25 opacity-45 z-20" />
                    <img src={f083} alt="flower" className="absolute bottom-[15%] left-[40%] w-[450px] h-auto filter brightness-75 contrast-125 -rotate-15 opacity-60 z-0" />
                    <img src={f128} alt="flower" className="absolute bottom-[-2%] right-[-5%] w-[380px] h-auto filter brightness-75 contrast-125 -rotate-10 opacity-75 z-20" />
                    <img src={f042} alt="flower" className="absolute bottom-[-1%] left-[30%] w-[420px] h-auto filter brightness-75 contrast-125 rotate-10 opacity-80 z-10" />
                    <img src={f062} alt="flower" className="absolute bottom-[-1%] left-[80%] w-[280px] h-auto filter brightness-75 contrast-125 -rotate-20 opacity-55 z-10" />
                    
                </div>
            )}
            
            <div className="z-20 w-full flex flex-col md:flex-row items-center justify-between h-full p-4 lg:p-24">
                {content}
            </div>
        </div>
    );
};

export default SliderAndNoiseSection;