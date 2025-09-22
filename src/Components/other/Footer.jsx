// Footer.jsx
import React from "react";
import '../../index.css';

const Footer = () => {
  return (
    <div className="bg-black w-full overflow-hidden">
      <footer className="w-full py-7 bg-black relative overflow-hidden mt-10 border-t border-zinc-800">
        {/* Верхняя строка: Меню, Соцсети */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Меню + Политики */}
          <div>
            <h3 className="font-dela mb-3 bg-white text-black py-1 px-42 shadow-md">
              МЕНЮ
            </h3>
            <div className="grid grid-cols-2 gap-x-8 px-8 ">
              {/* Левая колонка */}
              <div className="flex flex-col gap-0">
                <a
                  href="/works"
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Работы</span>
                </a>
                <a
                  href="/stories"
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Истории</span>
                </a>
                <a
                  href="/about"
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">О нас</span>
                </a>
                {/* --- НОВЫЕ ССЫЛКИ НАЧАЛО --- */}
                <a
                  href="/blog" // Укажите правильный адрес для блога
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Блог</span>
                </a>
                <a
                  href="/services/websites" // Укажите правильный адрес
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Сайты</span>
                </a>
                <a
                  href="/services/design" // Укажите правильный адрес
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Дизайн</span>
                </a>
                <a
                  href="/services/targeting" // Укажите правильный адрес
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Таргет</span>
                </a>
                {/* --- НОВЫЕ ССЫЛКИ КОНЕЦ --- */}
              </div>
              {/* Правая колонка (политики) */}
              <div className="flex flex-col gap-0">
                <a
                  href="/cookies"
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 "
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Cookies</span>
                </a>
                <a
                  href="/privacy"
                  className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300"
                >
                  <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Privacy</span>
                </a>
              </div>
            </div>
          </div>

          {/* Соцсети */}
          <div className="md:ml-auto">
            <h3 className="font-dela bg-white text-black py-1 px-30 shadow-md">
              СОЦСЕТИ
            </h3>
            <div className="flex flex-col gap-0 px-8">
              <a
                href="https://www.instagram.com/nsbusinesshub/"
                className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
              >
                <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Instagram</span>
              </a>
              <a
                href="https://t.me/NSBusinessHub"
                className="relative font-garet text-white group text-base md:text-lg leading-none transition-colors duration-300 hover:text-gray-300"
              >
                <span className="relative group-hover:after:scale-x-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300">Telegram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Средняя строка: NSBH */}
        <div className="w-full mt-8 flex justify-center items-center relative">
          <span className="relative z-10 font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-neutral-800 select-none font-deutsch">
            NSBH
          </span>
        </div>

        <div className="w-full mt-12 pt-6 border-t border-zinc-800 flex justify-center items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NSBH. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;