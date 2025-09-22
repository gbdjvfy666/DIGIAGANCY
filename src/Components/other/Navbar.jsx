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
  const dropdownLinkClasses = "block w-full text-left px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-black/10";

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative w-full font-garet">
        <div className="flex justify-between items-center py-2 px-4 md:px-16 lg:px-24">
          <a
            href="/"
            aria-label="Home"
            className="relative shrink-0 text-lg sm:text-xl font-deutsch text-black dark:text-white transition-opacity hover:opacity-80 z-10 group"
          >
            NSBH
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>

          <div className="hidden sm:flex justify-center items-center absolute inset-x-0 pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-4 bg-black/10 backdrop-blur-sm rounded-b-full py-1 px-2 sm:py-2 sm:px-4 border-x border-b border-black/20">
              
              <a 
                className={`${buttonClasses} hover:bg-black/20 hover:text-black hoverable pointer-events-auto`}
                href="/works"
              >
                Работы
              </a>
              
              <div className="relative group pointer-events-auto">
                <button className={`${buttonClasses} hover:bg-black/20 hover:text-black flex items-center gap-1`}>
                  Услуги
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ: УДАЛЕН КЛАСС mt-2 --- */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-black/10
                                opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                                transition-all duration-300 origin-top">
                  <a href="/web-development" className={`${dropdownLinkClasses} rounded-t-lg`}>Сайты</a>
                  <a href="/design" className={dropdownLinkClasses}>Дизайн</a>
                  <a href="/target" className={`${dropdownLinkClasses} rounded-b-lg`}>Таргет</a>
                </div>
              </div>
              
              <a 
                className={`${buttonClasses} hover:bg-black/20 hover:text-black hoverable pointer-events-auto`}
                href="/reviews"
              >
                Отзывы
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              className="relative text-sm sm:text-base text-black dark:text-white transition-colors duration-300 hoverable z-10 group"
              href="/about"
            >
              О нас
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}