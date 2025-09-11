import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const ease = [0.4, 0, 0.2, 0.8];

// Анимация текста по словам
const wordAnimation = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Анимация для подзаголовка и основного текста
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Измененный массив слайдов
const slides = [
  {
    id: 1,
    title: 'Стратегия',
    subtitle: 'Анализ и планирование',
    text: 'Глубокое погружение в ваш бизнес для создания выигрышной digital-стратегии.',
    link: '/strategy',
    centered: false, // Выравнивание по левому краю, как в оригинале
  },
  {
    id: 2,
    title: 'Реализация',
    subtitle: 'Воплощение идей в жизнь',
    text: 'Разработка сайтов, настройка рекламы и создание уникального дизайна.',
    link: '/implementation',
    centered: true, // Выравнивание по центру
  },
  {
    id: 3,
    title: 'Развитие',
    subtitle: 'Поддержка и рост',
    text: 'Постоянное улучшение и масштабирование вашего проекта для достижения новых высот.',
    link: '/growth',
    centered: true, // Выравнивание по центру
  },
];

export default function SliderSecond() {
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

  const containerVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: direction > 0 ? 100 : -100,
      transition: { duration: 0.8, ease: ease },
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: ease },
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction > 0 ? -100 : 100,
      transition: { duration: 0.8, ease: ease },
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
        autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{
          clickable: false,
          renderBullet: (index, className) =>
            `<span class="${className} w-2.5 h-2.5 rounded-full mx-1 transition-all bg-neutral-400 opacity-60"></span>`,
        }}
        parallax={true}
        speed={900}
        onSlideChange={handleSlideChange}
        className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-black"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.link} className="relative block w-full h-full cursor-pointer">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              
              <AnimatePresence initial={false} custom={direction}>
                {slide.id === slides[activeIndex]?.id && (
                  <motion.div
                    key={slide.id}
                    className={`absolute inset-0 flex flex-col justify-center text-white z-20 p-8 ${slide.centered ? 'items-center text-center' : 'items-start px-8 md:px-16 lg:px-24'}`}
                    custom={direction}
                    variants={containerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <motion.p
                      className="text-lg md:text-2xl text-white/80 mb-2"
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.2}
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h1
                      className={`text-5xl md:text-7xl font-bold tracking-tight mb-4 overflow-hidden`}
                    >
                      {slide.title.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block mr-2"
                          variants={wordAnimation}
                          custom={i}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h1>
                    <motion.p
                      className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl"
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.6}
                    >
                      {slide.text}
                    </motion.p>
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
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
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
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </Swiper>
    </div>
  );
}