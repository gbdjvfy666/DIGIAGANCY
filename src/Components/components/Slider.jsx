import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import MacbookWrapper from '../other/MacbookWrapper';

const ease = [0.4, 0, 0.2, 0.8];

const slides = [
  {
    id: 1,
    title: 'Дизайн',
    subtitle: 'Искусство превращать идею в реальность.',
    text: null,
    link: '/design',
    titleClass: 'text-5xl md:text-7xl font-bold text-white tracking-tight',
    // ИЗМЕНЕНИЕ ЗДЕСЬ: Заменил 'top-1/2 -translate-y-1/2' на 'bottom-24'
    containerClass: 'absolute bottom-24 left-8 md:left-16 lg:left-24 max-w-5xl',
    centered: false,
    component: null,
  },
  {
    id: 2,
    title: 'САЙТ',
    subtitle: null,
    text: 'Один сайт — тысячи решений',
    link: '/web-development',
    titleClass: 'text-7xl font-dela tracking-tight',
    containerClass: 'absolute bottom-32 left-1/2 transform -translate-x-1/2',
    buttonText: null,
    centered: true,
    component: ({ isActive, isExiting, direction }) => (
      <MacbookWrapper isActive={isActive} isExiting={isExiting} direction={direction} />
    ),
  },
  {
    id: 3,
    title: 'ТАРГЕТ ВК',
    subtitle: 'Искусство показывать нужное нужным.',
    text: null,
    link: '/target',
    titleClass: 'text-6xl font-black tracking-tight',
    containerClass: 'absolute bottom-16 left-1/2 transform -translate-x-1/2',
    buttonText: null,
    centered: true,
  },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndex = useRef(0);

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

  const variants = {
    enter: (direction) => ({
      x: direction === 1 ? 600 : -600,
      opacity: 0,
      transition: { duration: 1, ease },
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease },
    },
    exit: (direction) => ({
      x: direction === 1 ? -600 : 600,
      opacity: 0,
      transition: { duration: 1, ease },
    }),
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl border-y-2 border-gray-200 dark:border-gray-700">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        allowTouchMove={false}
        modules={[Autoplay, Navigation, Parallax, Pagination]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{
          clickable: false,
          renderBullet: (index, className) =>
            `<span class="${className} w-2.5 h-2.5 rounded-full mx-1 transition-all bg-gray-400"></span>`,
        }}
        parallax={true}
        speed={900}
        onSlideChange={handleSlideChange}
        className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-black"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.link} className="relative block w-full h-full cursor-pointer">
              {slide.component && (
                <div className="absolute inset-0 w-full h-full z-20">
                  {slide.component({
                    isActive: slide.id === slides[activeIndex]?.id,
                    isExiting: slide.id === slides[prevIndex.current]?.id && slide.id !== slides[activeIndex]?.id,
                    direction,
                  })}
                </div>
              )}

              <AnimatePresence initial={false} custom={direction}>
                {slide.id === slides[activeIndex]?.id && (
                  <motion.div
                    key={slide.id}
                    className={`${slide.containerClass} text-white space-y-4 z-30`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{
                      textDecoration: 'none',
                      textAlign: slide.centered ? 'center' : 'left',
                    }}
                  >
                    {slide.subtitle && (
                      <motion.p className="text-white/80 font-body text-lg md:text-2xl">
                        {slide.subtitle}
                      </motion.p>
                    )}

                    <motion.h2 className={slide.titleClass}>
                      {slide.title}
                    </motion.h2>

                    {slide.text && (
                      <motion.p className="text-lg">
                        {slide.text}
                      </motion.p>
                    )}

                    {slide.buttonText && (
                      <div className="inline-block bg-white text-black px-6 py-3 font-semibold uppercase hover:bg-gray-100 transition cursor-pointer">
                        {slide.buttonText}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </SwiperSlide>
        ))}

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

        <div className="custom-pagination absolute bottom-6 left-6 flex gap-2 z-50"></div>
      </Swiper>
    </div>
  );
}