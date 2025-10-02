// src/components/ServiceBlocks/ContactFormBlock.jsx (Финальная версия с тематическими иконками)

import React, { useState } from 'react';

// --- Вспомогательные компоненты ---

// Новые тематические иконки для списка преимуществ
const ChatBubbleIcon = () => (
    <svg className="flex-shrink-0 w-6 h-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
);
const ClipboardIcon = () => (
    <svg className="flex-shrink-0 w-6 h-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-1.125 0-2.062.938-1.976 2.062a48.424 48.424 0 002.123 5.578c1.06.858 2.518 1.54 4.114 1.865a48.503 48.503 0 005.743 0c1.596-.326 3.054-1.007 4.114-1.865a48.428 48.428 0 002.123-5.578c.086-1.124-.85-2.062-1.976-2.062H12m0 0V5.25" />
    </svg>
);
const ClockIcon = () => (
    <svg className="flex-shrink-0 w-6 h-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// SVG-граница для кнопки
const ButtonBorder = () => (
  <svg className="absolute top-1/2 left-1/2 w-[110%] h-auto -translate-x-1/2 -translate-y-1/2" viewBox="0 0 282 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="contact-btn-gradient" x1="0" y1="0" x2="282" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a855f7" /> {/* purple-500 */}
        <stop offset="1" stopColor="#22d3ee" /> {/* cyan-400 */}
      </linearGradient>
    </defs>
    <path d="M78.5 15C18.1 27.6 -19.4 40.1 13.5 63.7C46.4 87.3 309.3 71.9 277.8 26.6C252.5 -9.7 98.4 1.2 24.5 11.1" stroke="url(#contact-btn-gradient)" strokeWidth="2" />
  </svg>
);


const ContactFormBlock = ({ data }) => {
  if (!data) return null; 

  const { serviceOptions, defaultService } = data;
  const [selectedService, setSelectedService] = useState(defaultService || (serviceOptions && serviceOptions[0]));

  const bgStyles = {
    backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: '30px 30px',
  };

  return (
    <section id="form" className="relative font-sans bg-black text-white py-24 md:py-32 overflow-hidden" style={bgStyles}>
        {/* Декоративный фоновый градиент */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-600/20 to-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="container max-w-8xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Левая колонка: Призыв к действию */}
                <div className="text-center lg:text-left">
                    <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 leading-none tracking-tighter">
                        Обсудим ваш проект?
                    </h2>
                    <p className="mt-6 text-xl text-zinc-400 max-w-lg mx-auto lg:mx-0">
                        Заполните форму, и мы свяжемся с вами, чтобы предложить лучшее решение для вашей задачи.
                    </p>
                    <ul className="mt-8 space-y-4 inline-block text-left">
                        <li className="flex items-center gap-x-3 text-lg">
                            <ChatBubbleIcon />
                            <span>Бесплатная консультация</span>
                        </li>
                        <li className="flex items-center gap-x-3 text-lg">
                            <ClipboardIcon />
                            <span>Предварительный расчет стоимости</span>
                        </li>
                        <li className="flex items-center gap-x-3 text-lg">
                            <ClockIcon />
                            <span>Ответ в течение рабочего дня</span>
                        </li>
                    </ul>
                </div>

                {/* Правая колонка: Форма */}
                <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm rounded-2xl p-8 md:p-10">
                    <form>
                        <fieldset className="mb-8">
                            <legend className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
                                Какая услуга вас интересует?
                            </legend>
                            <div className="flex flex-wrap items-start gap-3">
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
                                        <span className={`block px-5 py-2.5 rounded-full text-base transition-all duration-300 ${
                                            selectedService === option
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg shadow-purple-500/20'
                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                        }`}>
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Ваше имя" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            <input type="tel" name="phone" placeholder="Телефон" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all" />
                            <textarea name="message" placeholder="Кратко опишите задачу (необязательно)" rows="4" className="sm:col-span-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"></textarea>
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="relative inline-flex items-center justify-center px-12 py-4 text-lg font-medium tracking-wider transition-transform duration-300 hover:scale-105">
                                <ButtonBorder />
                                <span className="relative">Обсудить задачу</span>
                            </button>
                            <p className="mt-4 text-xs text-zinc-500 max-w-sm">
                                Нажимая на кнопку, вы даете согласие <a href="/politika/" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-300">на обработку персональных данных</a>.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ContactFormBlock;