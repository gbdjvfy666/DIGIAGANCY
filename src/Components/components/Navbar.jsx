import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const buttonClasses = "relative px-2 py-1 flex items-center justify-center rounded-full transition-all duration-300 sm:px-4 sm:py-2";

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative w-full">
        <div className="flex justify-between items-center py-2 px-4 md:px-16 lg:px-24">
          {/* Логотип NSBH слева */}
          <a
            href="/"
            aria-label="Home"
            className="relative shrink-0 text-lg sm:text-xl font-deutsch text-black dark:text-white transition-opacity hover:opacity-80 z-10 group"
          >
            NSBH
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>

          {/* Контейнер для кнопок, центрированный */}
          <div className="hidden sm:flex justify-center items-center absolute inset-x-0 pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-4 bg-black/10 backdrop-blur-sm rounded-b-full py-1 px-2 sm:py-2 sm:px-4 border-x border-b border-black/20">
              <a 
                className={`${buttonClasses} hover:bg-black/20 hover:text-black hoverable pointer-events-auto`}
                href="/web-development"
              >
                Сайты
              </a>
              <a 
                className={`${buttonClasses} hover:bg-black/20 hover:text-black hoverable pointer-events-auto`}
                href="/design"
              >
                Дизайн
              </a>
              <a 
                className={`${buttonClasses} hover:bg-black/20 hover:text-black hoverable pointer-events-auto`}
                href="/target"
              >
                Таргет
              </a>
            </div>
          </div>
          
          {/* Кнопка "О нас" справа */}
          <div className="flex items-center">
            <a
              className="relative text-sm sm:text-base text-white transition-colors duration-300 hover:text-amber-500 hoverable z-10"
              href="/about"
            >
              О нас
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}