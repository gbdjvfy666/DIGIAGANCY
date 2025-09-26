// ServicesSection.jsx (Финальная версия со смещением вправо)

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LOGO_EXAMPLE_IMG = 'https://i.imgur.com/8Q1ZzV5.png'; 
const OTHER_IMG = 'https://i.imgur.com/g8G2hL6.png'; 

const services = [
  { title: 'Презентации', price: '200 000 ₽', url: '/presentations/oformlenie-prezentatsiy', img: OTHER_IMG },
  { title: 'Лендинги', price: '500 000 ₽', url: '/websites/landing-page', img: LOGO_EXAMPLE_IMG },
  { title: 'Дизайн упаковки', price: '200 000 ₽', url: '/branding/dizayn-upakovki', img: LOGO_EXAMPLE_IMG },
  { title: 'Многостраничные сайты', price: '1 500 000 ₽', url: '/websites/mnogostranichnye-sayty', img: LOGO_EXAMPLE_IMG },
  { title: 'Логотипы', price: '300 000 ₽', url: '/branding/logotipy', img: LOGO_EXAMPLE_IMG },
  { title: 'Брендбуки', price: '500 000 ₽', url: '/branding/brendbuk', img: LOGO_EXAMPLE_IMG },
  { title: 'Коммерческие предложения', price: '100 000 ₽', url: '/presentations/kommercheskoe-predlozhenie', img: LOGO_EXAMPLE_IMG },
  { title: 'Видеоролики', price: '100 000 ₽', url: '/branding/dizayn-animatsii-video-reklamy', img: LOGO_EXAMPLE_IMG },
  { title: 'Маркетинг-киты', price: '200 000 ₽', url: '/presentations/marketing-kity', img: LOGO_EXAMPLE_IMG },
];

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-20 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <div className='text-center'>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 font-dela">
            Что мы делаем
            </h2>
            <p className="text-xl md:text-2xl mb-16 text-zinc-300">
            Помогаем компаниям любых размеров расти, <br />
            зарабатывать больше и завоевывать любовь <br />
            при помощи дизайна
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.url}>
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer h-64 bg-black px-4 py-6 flex flex-col justify-between"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute w-[350px] h-[350px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full z-0"
                  initial={{ y: '110%', x: '55%' }}
                  animate={{
                    y: hoveredCard === index ? '15%' : '110%',
                    x: hoveredCard === index ? '55%' : '55%',
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                  <motion.div
                    className="rounded-full py-3 px-6 text-xl font-bold self-start bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
                    animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {service.price} →
                  </motion.div>
                </div>
                <motion.div 
                  className="absolute inset-0 flex justify-center items-center z-0"
                  initial={false}
                  animate={{
                      scale: hoveredCard === index ? 0.95 : 1,
                      x: hoveredCard === index ? 70 : 50,
                  }}
                  transition={{ duration: 0.3 }}
                >
                    <img
                        src={service.img}
                        alt={service.title}
                        className="w-48 h-auto object-contain"
                    />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
            <Link to="/Services">
            <motion.button
                className="mt-16 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-lg font-bold shadow-lg hover-shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Все услуги
            </motion.button>
            </Link>
        </div>
      </div>
    </section>
  );
}