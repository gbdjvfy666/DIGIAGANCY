import React from "react";

export default function Navbar() {
  const buttonClasses = "relative px-2 py-1 flex items-center justify-center rounded-full transition-all duration-300 sm:px-4 sm:py-2";
  const dropdownLinkClasses = "block w-full text-left px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-black/10";

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="relative w-full font-garet">
        {/* --- ИЗМЕНЕНИЕ 1: Теперь главный контейнер просто центрирует содержимое --- */}
        <div className="flex justify-center items-center py-2 px-4 md:px-16 lg:px-24">
          
          {/* --- ИЗМЕНЕНИЕ 2: Создан ЕДИНЫЙ блок для ВСЕХ ссылок --- */}
          <div className="flex items-center gap-2 sm:gap-4 bg-white rounded-full py-1 px-2 sm:py-2 sm:px-4 border border-black/20 shadow-sm">
            
            {/* NSBH теперь стилизован как кнопка */}
            <a
              href="/"
              aria-label="Home"
              className={`${buttonClasses} text-lg sm:text-xl font-deutsch text-black hover:bg-black/20 hoverable pointer-events-auto`}
            >
              NSBH
            </a>
            
            {/* Центральные ссылки остались без изменений */}
            <a 
              className={`${buttonClasses} text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/works"
            >
              Работы
            </a>
            
            <div className="relative group pointer-events-auto">
              <button 
                className={`${buttonClasses} text-black hover:bg-black/20 flex items-center gap-1 hoverable`}
              >
                Услуги
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg border border-black/10
                              opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                              transition-all duration-300 origin-top">
                <a href="/web-development" className={`${dropdownLinkClasses} rounded-t-lg`}>Сайты</a>
                <a href="/design" className={dropdownLinkClasses}>Дизайн</a>
                <a href="/target" className={`${dropdownLinkClasses} rounded-b-lg`}>Таргет</a>
              </div>
            </div>
            
            <a 
              className={`${buttonClasses} text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/reviews"
            >
              Отзывы
            </a>

            {/* --- ИЗМЕНЕНИЕ 3: Ссылки "Блог" и "О нас" перенесены сюда и стилизованы как кнопки --- */}
            <a
              className={`${buttonClasses} text-sm sm:text-base text-black hover:bg-black/20 hoverable pointer-events-auto`}
              href="/blog"
            >
              Блог
            </a>

            <a
              className={`${buttonClasses} text-sm sm:text-base text-black hover:bg-black/20 hoverable pointer-events-auto`}
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