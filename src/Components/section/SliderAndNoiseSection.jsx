import React from 'react';
import Slider from '../components/Slider.jsx';
import SliderSecond from '../components/SliderSecond.jsx';

// ВОТ ЭТА ЧАСТЬ БЫЛА ПРОПУЩЕНА: массив с данными о цветах
const flowers = [
  // Z-index 0-10 (Дальний план)
  { src: "/assets/flowers/435.png", className: "bottom-[-6%] left-[-8%] w-[500px] rotate-5 z-10 opacity-90" },
  { src: "/assets/flowers/463.png", className: "bottom-[-12%] left-[10%] w-[450px] -rotate-15 z-10 opacity-85" },
  { src: "/assets/flowers/012.png", className: "bottom-[-10%] left-[40%] w-[550px] rotate-30 z-10 opacity-95" },
  { src: "/assets/flowers/032.png", className: "bottom-[-1%] left-[60%] w-[520px] rotate-20 z-10 opacity-90" },
  { src: "/assets/flowers/423.png", className: "bottom-[-6%] right-[0%] w-[450px] -rotate-5 z-10 opacity-75" },
  { src: "/assets/flowers/388.png", className: "bottom-[-4%] left-[15%] w-[130px] -rotate-25 z-10 opacity-75" },
  { src: "/assets/flowers/059.png", className: "bottom-[-1%] right-[60%] w-[400px] rotate-25 z-10 opacity-85" },
  { src: "/assets/flowers/043.png", className: "bottom-[-1%] right-[20%] w-[350px] -rotate-5 z-10 opacity-90" },
  { src: "/assets/flowers/010.png", className: "bottom-[-1%] left-[45%] w-[380px] rotate-20 z-10 opacity-75" },
  { src: "/assets/flowers/042.png", className: "bottom-[-1%] left-[30%] w-[420px] rotate-10 z-10 opacity-90" },
  { src: "/assets/flowers/062.png", className: "bottom-[-1%] left-[80%] w-[280px] -rotate-20 z-10 opacity-80" },
  { src: "/assets/flowers/455.png", className: "bottom-[15%] right-[25%] w-[330px] -rotate-5 z-0 opacity-40" },
  { src: "/assets/flowers/083.png", className: "bottom-[15%] left-[40%] w-[450px] -rotate-15 z-0 opacity-60" },
  
  // Z-index 20 (Средний план)
  { src: "/assets/flowers/395.png", className: "bottom-[-13%] right-[10%] w-[330px] rotate-[350deg] z-20" },
  { src: "/assets/flowers/128.png", className: "bottom-[-2%] right-[-5%] w-[380px] -rotate-10 z-20 opacity-75" },

  // Z-index 30+ (Ближний план)
  { src: "/assets/flowers/037.png", className: "bottom-[-5%] right-[55%] w-[300px] rotate-30 z-30 opacity-80" },
  { src: "/assets/flowers/395.png", className: "bottom-[-10%] right-[23%] w-[330px] rotate-[340deg] z-30" },
  { src: "/assets/flowers/440.png", className: "bottom-[-4%] right-[-9%] w-[400px] -rotate-15 z-30 opacity-90" },
  { src: "/assets/flowers/098.png", className: "absolute bottom-[-7%] left-[-6%] w-[450px] rotate-15 z-50" },
];

const FlowerCollage = React.memo(() => (
    <div className="absolute inset-0 z-10 pointer-events-none">
        {flowers.map((flower, index) => (
            <img 
                key={index}
                src={flower.src}
                alt="flower decoration"
                loading="lazy"
                decoding="async"
                className={`absolute h-auto filter brightness-75 contrast-125 flower-layer ${flower.className}`}
            />
        ))}
    </div>
));

const SliderAndNoiseSection = ({ text, noiseBackground, sliderOnRight = true }) => {
    const TextBlock = (
        <div className="w-full md:w-1/3 text-left mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{text.title}</h1>
            <p className="text-base sm:text-lg md:text-xl">{text.description}</p>
        </div>
    );

    const SliderBlock = (
        <div className="w-full md:w-1/2">
            {sliderOnRight ? <Slider /> : <SliderSecond />}
        </div>
    );

    return (
        <div className="relative flex-shrink-0 flex items-center justify-center w-full min-h-[150vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                {noiseBackground}
            </div>

            {!sliderOnRight && <FlowerCollage />}
            
            <div className="z-20 w-full flex flex-col md:flex-row items-center justify-between h-full p-4 lg:p-24">
                {sliderOnRight ? (
                    <>
                        {TextBlock}
                        {SliderBlock}
                    </>
                ) : (
                    <>
                        {SliderBlock}
                        {TextBlock}
                    </>
                )}
            </div>
        </div>
    );
};

export default SliderAndNoiseSection;