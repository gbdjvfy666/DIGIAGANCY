// Footer.jsx
import React from "react";
import '../../index.css';

const Footer = ({ actionText = "ПРОЕКТЫ", actionLink = "/works" }) => {
  return (
    <div className="bg-black w-full">
      {/* Верхняя кнопка */}
      <a
        href={actionLink}
        className="w-full block py-10 px-1 border-t border-b border-zinc-800 group relative transition-colors duration-300 hover:bg-gray-100"
      >
        <div className="w-full flex justify-between items-center relative z-10">
          <span className="font-maler text-white group-hover:text-black text-2xl transition-colors duration-300 ml-4">
            ДАЛЬШЕ
          </span>
          <span className="font-indikazka text-red-500 group-hover:text-black text-2xl transition-colors duration-300 mr-4">
            {actionText} →
          </span>
        </div>
      </a>

      {/* Основной футер */}
      <footer className="w-full py-7 bg-black">
        {/* Верхняя строка: Меню, Соцсети, Рассылка */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Меню + Политики */}
          <div>
            <h3 className="font-maler mb-3 bg-white text-black py-1 px-42 shadow-md">
              МЕНЮ
            </h3>
            <div className="grid grid-cols-2 gap-x-8 px-8">
              {/* Левая колонка */}
              <div className="flex flex-col gap-0">
                <a
                  href="/works"
                  className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Работы</span>
                </a>
                <a
                  href="/stories"
                  className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Истории</span>
                </a>
                <a
                  href="/about"
                  className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">О нас</span>
                </a>
              </div>
              {/* Правая колонка (политики) */}
              <div className="flex flex-col gap-0">
                <a
                  href="/cookies"
                  className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300 "
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Cookies</span>
                </a>
                <a
                  href="/privacy"
                  className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Privacy</span>
                </a>
              </div>
            </div>
          </div>

          {/* Соцсети */}
          <div className="md:ml-auto">
            <h3 className="font-maler bg-white text-black py-1 px-30 shadow-md">
              СОЦСЕТИ
            </h3>
            <div className="flex flex-col gap-0 px-8">
              <a
                href="https://www.instagram.com/nsbusinesshub/"
                className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
              >
                <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Instagram</span>
              </a>
              <a
                href="https://t.me/NSBusinessHub"
                className="relative font-jost text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
              >
                <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Telegram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Средняя строка: NSBH */}
        <div className="w-full mt-8 flex justify-center items-center relative">
          <span className="font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-neutral-800 select-none font-deutsch">
            NSBH
          </span>
        </div>

        {/* Нижняя строка: Копирайт */}
        <div className="w-full mt-12 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-gray-400 mb-4 md:mb-0 text-sm"></div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;