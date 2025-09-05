import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const ease = [0.4, 0, 0.2, 0.8];

// Анимация текста по словам (как на втором слайде исходного кода)
const wordAnimation = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Анимация для подзаголовка и основного текста (fadeUp)
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Удалены все ссылки на изображения, фон будет черным
const slides = [
  {
    id: 1,
    title: 'Побеждай в конкуренции с эффективным сайтом и рекламой.',
    subtitle: 'Весь мир — в интернете. Почему твой бизнес ещё нет?',
    text: 'Сайты под ключ · Таргет в ВКонтакте · Дизайн и брендинг',
    link: '/web-development',
    centered: false,
  },
  {
    id: 2,
    title: 'САЙТ',
    subtitle: 'Один сайт — тысячи решений',
    text: 'Создаем ваш бренд, дизайн и веб-приложения',
    link: '/web-development',
    centered: true,
  },
  {
    id: 3,
    title: 'Fear Nothing',
    subtitle: 'Nike National Team-Kollektionen 2025',
    text: 'Wenn es um alles geht.',
    link: '/target',
    centered: true,
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

  // Варианты для контейнера текста, чтобы он выезжал и исчезал
  const containerVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: direction > 0 ? 100 : -100, // Анимация по оси Y для контейнера
      transition: { duration: 0.8, ease: ease },
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: ease },
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction > 0 ? -100 : 100, // Анимация по оси Y для контейнера
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
        className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-black" // Фон Swiper черный
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.link} className="relative block w-full h-full cursor-pointer">
              {/* Удалена логика для фонового изображения, фон будет черным из Swiper */}
              <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Затемнение, если нужно */}
              
              <AnimatePresence initial={false} custom={direction}>
                {slide.id === slides[activeIndex]?.id && (
                  <motion.div
                    key={slide.id}
                    className={`absolute inset-0 flex flex-col justify-center text-white z-20 p-8 ${slide.centered ? 'items-center text-center' : 'items-start px-8 md:px-16 lg:px-24'}`}
                    custom={direction}
                    variants={containerVariants} // Применяем анимацию выезда/заезда к контейнеру
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
                      {slide.title.split(' ').map((word, i) => ( // Разбиваем заголовок на слова для анимации
                        <motion.span
                          key={i}
                          className="inline-block mr-2" // Добавьте mr-2 для небольшого отступа между словами
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

        {/* Custom navigation buttons at the bottom right */}
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