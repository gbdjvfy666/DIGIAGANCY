import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

// Компоненты для других слайдов и фона
import MacbookWrapper from '../other/MacbookWrapper';
import GradientBlinds from '../other/background/GradientBlinds';
import Prism from './Prism';
import logPng from '../../assets/LOG.png';

const ease = [0.4, 0, 0.2, 0.8];

const slides = [
  {
    id: 1,
    title: 'ДИЗАЙН',
    subtitle: 'Искусство превращать идею в реальность.',
    text: null,
    link: '/design',
    titleClass: 'text-5xl font-dela md:text-7xl font-bold text-white tracking-tight',
    containerClass: 'absolute inset-0 flex flex-col-reverse justify-start items-center pb-16 md:pb-24',
    centered: true,
    component: () => (
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={2.1}
        hueShift={0}
        colorFrequency={1}
        noise={0.5}
        glow={1}
      />
    ),
    imageSrc: logPng,
  },
  {
    id: 2,
    title: 'САЙТ',
    subtitle: null,
    text: 'Один сайт — тысячи решений',
    link: '/web-development',
    titleClass: 'text-7xl font-dela tracking-tight',
    containerClass: 'absolute bottom-32 left-1/2 transform -translate-x-1/2',
    centered: true,
    component: ({ isActive, isExiting, direction }) => (
      <div className="w-full h-full bg-black">
        <MacbookWrapper isActive={isActive} isExiting={isExiting} direction={direction} />
      </div>
    ),
    imageSrc: null,
  },
  {
    id: 3,
    title: 'ТАРГЕТ ВК',
    subtitle: 'Искусство показывать нужное нужным.',
    text: null,
    link: '/target',
    titleClass: 'text-6xl font-black tracking-tight',
    containerClass: 'absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4',
    centered: true,
    component: () => (
      <GradientBlinds
        gradientColors={['#96C0C0', '#5227FF']}
        angle={0}
        noise={0.3}
        blindCount={12}
        blindMinWidth={50}
        spotlightRadius={0.5}
        spotlightSoftness={1}
        spotlightOpacity={1}
        mouseDampening={0.15}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
    ),
    imageSrc: null,
  },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const prevIndex = useRef(0);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                console.log('Компонент стал видимым!');
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }
    );

    if (containerRef.current) {
        observer.observe(containerRef.current);
    }

    return () => {
        if (containerRef.current) {
            observer.unobserve(containerRef.current);
        }
    };
}, []);

  const handleSlideChange = (swiper) => {
    prevIndex.current = activeIndex;
    setActiveIndex(swiper.realIndex);
  };

  const direction = (() => {
    const totalSlides = slides.length;
    if (prevIndex.current === totalSlides - 1 && activeIndex === 0) return 1;
    if (prevIndex.current === 0 && activeIndex === totalSlides - 1) return -1;
    return activeIndex > prevIndex.current ? 1 : -1;
  })();

  const textVariants = {
    enter: (direction) => ({ y: direction > 0 ? 50 : -50, opacity: 0, transition: { duration: 1, ease } }),
    center: { y: 0, opacity: 1, transition: { duration: 1, ease } },
    exit: (direction) => ({ y: direction > 0 ? -50 : 50, opacity: 0, transition: { duration: 1, ease } }),
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 0.8, transition: { duration: 0.8, ease } },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.8, ease } },
  };

  const activeSlideLink = slides[activeIndex]?.link || '/';

  return (
    <div
      ref={containerRef}
      className="rounded-3xl overflow-hidden shadow-2xl border-y-2 border-gray-200 dark:border-gray-700"
    >
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        allowTouchMove={false}
        modules={[Autoplay, Navigation, Parallax]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        parallax={true}
        speed={900}
        onSlideChange={handleSlideChange}
        className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-black"
        autoplay={
          isVisible
            ? {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative block w-full h-full">
              {slide.component && (
                <div className="absolute inset-0 w-full h-full z-10">
                  {slide.component({
                    isActive: slide.id === slides[activeIndex]?.id,
                    isExiting: slide.id === slides[prevIndex.current]?.id && slide.id !== slides[activeIndex]?.id,
                    direction,
                  })}
                </div>
              )}

              <AnimatePresence>
                {slide.id === slides[activeIndex]?.id && slide.imageSrc && (
                  <motion.div
                    key={`${slide.id}-image`}
                    // ===== ИЗМЕНЕНИЕ ЗДЕСЬ =====
                    className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-w-[16rem] md:max-w-xs lg:max-w-sm z-20 pointer-events-none"
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <img src={slide.imageSrc} alt="Логотип" className="w-full h-auto" />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false} custom={direction}>
                {slide.id === slides[activeIndex]?.id && (
                  <motion.div
                    key={slide.id}
                    className={`${slide.containerClass} text-white space-y-4 z-30`}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ textDecoration: 'none', textAlign: slide.centered ? 'center' : 'left' }}
                  >
                    {slide.subtitle && (
                      <motion.p className="text-white/80 font-body text-lg md:text-2xl">
                        {slide.subtitle}
                      </motion.p>
                    )}
                    <motion.h2 className={slide.titleClass}>{slide.title}</motion.h2>
                    {slide.text && <motion.p className="text-lg">{slide.text}</motion.p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}

        {/* Элементы управления */}
        <div className="absolute bottom-6 left-6 z-50">
          <Link
            to={activeSlideLink}
            className="group inline-flex items-center text-lg font-semibold text-white cursor-pointer hover:text-gray-200 transition-colors"
          >
            Подробнее
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5m0 0h-6.75M19 5v6.75" />
            </svg>
          </Link>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current.swiper.slideToLoop(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                activeIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
        <div className="absolute bottom-6 right-6 flex gap-2 z-50">
          <button
            className="custom-prev w-9 h-9 bg-neutral-200/80 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="custom-next w-9 h-9 bg-neutral-200/80 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </Swiper>
    </div>
  );
}