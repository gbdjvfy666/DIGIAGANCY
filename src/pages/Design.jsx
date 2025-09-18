// Файл: src/pages/Design.jsx

import React, { Suspense, lazy, useMemo } from 'react';

import Navbar from "../Components/other/Navbar";
import Footer from "../Components/other/Footer";
import '../index.css';
import LOGO_WHITE from '../assets/LOGO_WHITE.png';

// Оптимизация: Загружаем "тяжелые" WebGL-компоненты лениво.
// Их код будет загружен браузером только тогда, когда React попытается их отрендерить.
const PrismaticBurst = lazy(() => import('../Components/PrismaticBurst'));
const FractalPyramidComponent = lazy(() => import('../Components/animatedblock/ProfileCard/FractalPyramidComponent'));

export default function Design() {
  // Данные по услугам. Оборачиваем в useMemo, чтобы массив не создавался заново при каждом рендере.
  const services = useMemo(() => [
    { 
      title: "Дизайн для маркетплейсов", 
      subtitle: "Wildberries • Ozon • Яндекс.Маркет", 
      description: "Создаем продающие карточки товаров, которые выделяют ваш продукт среди конкурентов и увеличивают конверсию. Полный цикл: от анализа до готовых файлов.", 
      icon: "✠", 
      features: [ "Глубокий анализ ниши и конкурентов", "Несколько вариантов дизайна на выбор", "Подготовка файлов по тех. требованиям" ],
      animationColors: ['#FF007A', '#5F00D8', '#00F0FF'] // Палитра: Яркий Пурпурный / Фиолетовый / Голубой
    },
    { 
      title: "Брендинг и логотипы", 
      subtitle: "Узнаваемость • Ассоциации • Стиль", 
      description: "Разрабатываем уникальные логотипы и комплексный фирменный стиль, который создает сильные ассоциации с вашим брендом. Включает гайдлайны и шаблоны.", 
      icon: "☩", 
      features: [ "3-5 концепций логотипа на выбор", "Создание полного брендбука", "Разработка анимации логотипа" ],
      animationColors: ['#FFD700', '#FF8C00', '#FFF8E7'] // Палитра: Золотой / Оранжевый / Кремовый
    },
    { 
      title: "Соцсети и контент", 
      subtitle: "Единый стиль • Вовлечение • Узнаваемость", 
      description: "Комплексное оформление социальных сетей с единой стилистикой: от аватарок до шаблонов постов и сторис. Создаем узнаваемый визуальный язык.", 
      icon: "☨", 
      features: [ "Оформление VK, Telegram, Instagram", "Набор шаблонов для постов и историй", "Создание контент-плана" ],
      animationColors: ['#00FF7F', '#4169E1', '#E0FFF0'] // Палитра: Весенний Зеленый / Королевский Синий / Мятный
    }
  ], []);

  return (
    <div className="bg-black text-gray-200 min-h-screen font-garet relative overflow-x-hidden">
      
      {/* Фоновая анимация */}
      <div className="absolute inset-0 z-0">

        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <FractalPyramidComponent />
        </Suspense>
      </div>
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-30 text-center space-y-6">
          <h1 className="text-5xl md:text-8xl font-damione font-extrabold leading-tight uppercase tracking-wider">
            ДИЗАЙН
          </h1>
          <p className="text-lg font-garet text-gray-400 max-w-2xl mx-auto">
            Находим форму для вашего смысла.
          </p>
          <div className="relative flex justify-center items-center gap-40 mt-12">
              <button className="px-12 py-3 bg-gray-300 font-garet text-black rounded-none font-bold hover:bg-gray-200 transition-colors duration-300">
                  Обсудить проект
              </button>
              <img 
                src={LOGO_WHITE} 
                alt="Logo" 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-26 w-20 pointer-events-none" 
              />
              <button className="px-10 py-3 bg-gray-300 font-garet text-black rounded-none font-bold hover:bg-gray-200 transition-colors duration-300">
                  Заказать дизайн
              </button>
          </div>
        </section>

        {/* Секция Услуги */}
        <section className="w-full px-6 py-20"> 
          <div className="text-center mb-16">
            <h2 className="text-6xl text-gray-950 md:text-8xl font-damione font-rubik tracking-wide ">УСЛУГИ</h2>
            <p className="text-xl text-gray-900 font-garet max-w-3xl mx-auto">
              Комплексные дизайн-решения для бизнеса.
            </p>
          </div>
        
          <div className="max-w-7xl mx-auto space-y-12">
            {services.map((service, index) => (
              <div key={index} className="bg-zinc-900 rounded-none overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col md:flex-row">
                
                <div className="md:w-2/5 h-64 md:h-auto relative bg-zinc-950">
                  {/* Контент (иконка, текст) находится на слое выше */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none">
                    <div className="text-center text-gray-400">
                      <span className="text-8xl font-thin">{service.icon}</span>
                      <h3 className="text-3xl font-bold mt-4 font-deutsch tracking-wider">{service.title}</h3>
                      <p className="text-zinc-500 mt-2">{service.subtitle}</p>
                    </div>
                  </div>

                  {/* Слой с WebGL-анимацией (ниже контента) */}
                  <div className="absolute inset-0 z-10">
                    <Suspense fallback={<div className="w-full h-full bg-zinc-900" />}>
                      <PrismaticBurst
                        colors={service.animationColors}
                        animationType="rotate3d"
                        intensity={1.5}
                        speed={0.4}
                        distort={0.8}
                        rayCount={14}
                      />
                    </Suspense>
                  </div>
                </div>

                {/* Правая часть карточки */}
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col">
                  <div className="flex-1">
                    <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                          <span className="text-gray-500 mr-3 mt-1"> • </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 bg-gray-200 text-black rounded-none font-bold hover:bg-white transition flex-1">
                      Заказать услугу
                    </button>
                    <button className="px-6 py-3 border border-zinc-700 rounded-none font-bold hover:bg-zinc-800 transition flex-1">
                      Примеры работ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Процесс работы */}
        <section className="py-20 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center font-deutsch">Процесс Работы</h2>
            <div className="grid md:grid-cols-4 gap-0 text-center">
                {[ { step: "01", title: "Бриф и Анализ"}, { step: "02", title: "Разработка"}, { step: "03", title: "Правки"}, { step: "04", title: "Результат"} ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center border-t-2 border-zinc-800 p-8">
                        <span className="text-5xl font-thin text-zinc-600 mb-4">{item.step}</span>
                        <h3 className="text-lg font-bold uppercase tracking-widest">{item.title}</h3>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Цены */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-10 text-center font-deutsch">Прайс-лист</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { title: "Карточки для маркетплейса", price: "от 1500 ₽", desc: "за 1 товар (6–10 карточек)"}, { title: "Оформление соц. сетей", price: "от 3000 ₽", desc: "аватар, обложка, баннеры"}, { title: "Логотип и фирстиль", price: "от 7000 ₽", desc: "логотип, шрифт, цвет, шаблоны"} ].map((item, i) => (
              <div key={i} className="bg-zinc-900 p-8 rounded-none border border-zinc-800 text-center flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-4xl font-extrabold text-white mb-2">{item.price}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button className="mt-8 w-full py-3 rounded-none font-bold bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300">
                  Выбрать
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA (Призыв к действию) */}
        <section className="bg-zinc-900 border-y border-zinc-800 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-deutsch tracking-wide mb-4">Готовы к трансформации?</h2>
          <p className="text-gray-400 mb-6 text-lg">Свяжитесь с нами, чтобы получить первые концепты уже завтра.</p>
          <button className="bg-white text-black px-10 py-4 rounded-none font-bold hover:scale-105 transition-transform duration-300">
            Начать проект
          </button>
        </section>
        
        <Footer />
      </div>
    </div>
  );
}