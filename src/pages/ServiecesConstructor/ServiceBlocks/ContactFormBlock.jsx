// src/components/ServiceBlocks/ContactFormBlock.jsx

import React, { useState } from 'react';

// ... (вспомогательные компоненты StarIcon и ButtonBorder остаются без изменений) ...
const StarIcon = () => (
  <svg className="inline-block w-8 h-8 ml-2 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ButtonBorder = () => (
  <svg className="absolute top-1/2 left-1/2 w-full h-auto -translate-x-1/2 -translate-y-1/2" viewBox="0 0 282 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="contact-btn-gradient" x1="72.5" y1="89" x2="225.5" y2="-7.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7E20BE" /><stop offset="0.45" stopColor="#2357C9" /><stop offset="1" stopColor="#1C73C2" />
      </linearGradient>
    </defs>
    <path d="M78.5 15C18.1 27.6 -19.4 40.1 13.5 63.7C46.4 87.3 309.3 71.9 277.8 26.6C252.5 -9.7 98.4 1.2 24.5 11.1" stroke="url(#contact-btn-gradient)" strokeWidth="2" />
  </svg>
);


const ContactFormBlock = ({ data }) => {
  if (!data) return null; 

  const { serviceName, serviceOptions, defaultService } = data;
  const [selectedService, setSelectedService] = useState(defaultService || (serviceOptions && serviceOptions[0]));

  return (
    <section id="form" className="font-sans bg-gray-900 text-white py-16 md:py-24">
      <div className="container max-w-8xl mx-auto px-4">
        
        <h2 className="text-5xl md:text-7xl font-bold leading-tight text-left">
          СОЗДАДИМ ВАШ<br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ИДЕАЛЬНЫЙ
          </span>
          {' '}{serviceName}
          <StarIcon />
        </h2>

        {/* --- ГЛАВНОЕ ИЗМЕНЕНИЕ МАКЕТА --- */}
        <form className="mt-16">
          
          {/* БЛОК 1: Выбор услуги (теперь идет первым и на всю ширину) */}
          <div className="mb-12">
            <h3 className="text-xl text-gray-300 mb-5">Какая услуга вас интересует?</h3>
            <div className="flex flex-wrap items-start gap-y-2 gap-x-3">
              {serviceOptions && serviceOptions.map((option) => (
                <label key={option} className="cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    value={option}
                    checked={selectedService === option}
                    onChange={() => setSelectedService(option)}
                    className="sr-only"
                  />
                  <span className={`
                    block px-5 py-2.5 rounded-full text-base font-medium transition-colors duration-200
                    ${selectedService === option
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#1e2029] text-gray-300 hover:bg-[#2a2c38] hover:text-white'
                    }
                  `}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <input type="text" name="name" placeholder="Имя" required className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
            <input type="tel" name="phone" placeholder="Телефон" required className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
            <input type="email" name="email" placeholder="Почта" className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
          </div>

          <div className="mt-12">
            <button type="submit" className="relative inline-flex items-center justify-center px-12 py-4 text-lg font-medium tracking-wider">
              <ButtonBorder />
              <span className="relative">Обсудить задачу</span>
            </button>
            <p className="mt-4 text-xs text-gray-500">
              *Нажимая на кнопку, вы даете согласие <a href="/politika/" target="_blank" className="underline hover:text-white">на обработку персональных данных</a>
            </p>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ContactFormBlock;