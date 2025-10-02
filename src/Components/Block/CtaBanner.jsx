import React from 'react';
import './CtaBanner.css'; 

import ctaImage from '/images/Logog.jpg'; 

const CtaBanner = () => {
  return (
    <div className="w-full py-6 md:py-10 lg:py-12 overflow-hidden relative cta-banner-bg">
      <div className="cta-narrow-container mx-auto px-4 sm:px-6 lg:px-8 
                      flex flex-col md:flex-row items-center justify-between relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center text-white z-10">
          <div className="hidden sm:block mr-6 md:mr-8 text-6xl md:text-8xl transform rotate-90 md:rotate-0 text-white font-bold">
            <span className="inline-block transform -scale-y-100">
                &uarr; {/* Юникод стрелки вверх */}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight uppercase">
              ЗАИНТЕРЕСОВАЛИ <br className="sm:hidden"/> НАШИ УСЛУГИ?
            </h2>
            <p className="text-sm md:text-base font-medium max-w-sm">
              Потрать 30 секунд своего времени и заполни краткую форму заявку.
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 cta-rounded-image">
          <img 
            src={ctaImage} 
            alt="Call to Action" 
            // !!! ИЗМЕНЕНО: Убраны все классы, чтобы стилизировать через CSS !!!
            className="" 
          />
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;