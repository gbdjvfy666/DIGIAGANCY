import React from "react";
import '../../index.css';

const Footer = () => {
  // Общий стиль для всех кнопок-ссылок в футере
  const buttonClasses = "px-4 py-2 bg-zinc-800 text-sm text-zinc-300 rounded-full hover:bg-zinc-700 hover:text-white transition-colors duration-200 hoverable";

  return (
    <footer className="bg-black text-white w-full overflow-hidden mt-20 border-t border-zinc-800 font-garet">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-12">
        
        {/* --- БЛОК С КНОПКАМИ --- */}
        <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center items-start text-center sm:text-left gap-10 sm:gap-16">
          
          {/* Категория 1: МЕНЮ */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-zinc-500 text-xs uppercase tracking-widest">Меню</h3>
            <div className="w-full h-px bg-zinc-800"></div>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <a href="/works" className={buttonClasses}>Работы</a>
              <a href="/stories" className={buttonClasses}>Истории</a>
              <a href="/about" className={buttonClasses}>О нас</a>
              <a href="/blog" className={buttonClasses}>Блог</a>
              <a href="/brief" className={buttonClasses}>Бриф</a>
            </div>
          </div>
          
          {/* Категория 2: УСЛУГИ */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-zinc-500 text-xs uppercase tracking-widest">Услуги</h3>
            <div className="w-full h-px bg-zinc-800"></div>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <a href="/services/websites" className={buttonClasses}>Сайты</a>
              <a href="/services/design" className={buttonClasses}>Дизайн</a>
              <a href="/services/targeting" className={buttonClasses}>Таргет</a>
            </div>
          </div>

          {/* Категория 3: СОЦСЕТИ И ПОЛИТИКИ */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-zinc-500 text-xs uppercase tracking-widest">Соцсети и Политики</h3>
            <div className="w-full h-px bg-zinc-800"></div>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <a href="https://www.instagram.com/nsbusinesshub/" className={buttonClasses} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://t.me/NSBusinessHub" className={buttonClasses} target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="/cookies" className={buttonClasses}>Cookies</a>
              <a href="/privacy" className={buttonClasses}>Privacy</a>
            </div>
          </div>

        </div>

        {/* --- НИЖНИЙ БЛОК: ЛОГО И КОПИРАЙТ --- */}
        <div className="w-full max-w-2xl pt-12 mt-8 border-t border-zinc-800 flex flex-col items-center gap-6">
          <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl text-white select-none font-deutsch pb-3">
            NSBH
          </h1>
          
          {/* --- ВОТ НОВАЯ ЛИНИЯ --- */}
          <div className="w-full h-px bg-zinc-800"></div>
          
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} NSBH. Все права защищены.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;