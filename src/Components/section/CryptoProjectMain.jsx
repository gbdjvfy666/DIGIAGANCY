import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import nftParticles from '../../assets/Crypto/crypto-card.png';
import nftCard1 from '../../assets/1.png';
import nftCard2 from '../../assets/2.svg';
import nftCard3 from '../../assets/1.png';

export default function NFTUltimateMain() {
  const containerRef = useRef();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // 3D Card Component
  const NFTCard = ({ image, index }) => (
    <motion.div
      initial={{ rotateY: 0 }}
      whileHover={{
        rotateY: 10,
        rotateX: -5,
        translateZ: 20,
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.3)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black shadow-lg"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <img 
        src={image} 
        alt={`NFT ${index}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <span className="text-xs bg-purple-600/80 text-white px-2 py-1 rounded-full">#{index}</span>
      </div>
    </motion.div>
  );

  // Animated Feature Item
  const FeatureItem = ({ icon, title, description, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-500/10 border border-purple-500/20 backdrop-blur-sm"
      whileHover={{ 
        y: -5,
        borderColor: "#a855f7",
        boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.2)'
      }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-purple-100 text-sm">{description}</p>
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-black text-white overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <img 
          src={nftParticles} 
          alt="particles" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-16 items-center"
        >
          <div className="lg:w-1/2 space-y-8">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                NFT
              </span>{' '}
              <span className="text-white">Коллекция</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
                нового поколения
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-purple-100 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Эксклюзивные цифровые активы с уникальной механикой и ультрасовременным дизайном.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-purple-500/30"
              >
                Присоединиться
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-purple-500 text-purple-400 font-medium rounded-full hover:bg-purple-900/30 transition"
              >
                Whitepaper
              </motion.button>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 4 
              }}
              className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
            />
            
            <div className="grid grid-cols-2 gap-6 relative">
              {[nftCard1, nftCard2, nftCard3].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`${index === 1 ? 'mt-10' : ''}`}
                >
                  <NFTCard image={card} index={index + 1} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Уникальные
            </span>{' '}
            возможности
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Наша платформа предлагает инновационные решения для создания, торговли и взаимодействия с NFT
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🔄',
              title: 'Мультичейн',
              description: 'Поддержка Ethereum, Solana, Polygon и других сетей'
            },
            {
              icon: '🎨',
              title: '3D Галерея',
              description: 'Иммерсивное представление вашей коллекции'
            },
            {
              icon: '💰',
              title: 'Маркетплейс',
              description: 'Встроенная площадка для торговли NFT'
            },
            {
              icon: '🤖',
              title: 'AI Генерация',
              description: 'Создание уникальных NFT с помощью ИИ'
            },
            {
              icon: '👥',
              title: 'DAO Управление',
              description: 'Сообщество принимает ключевые решения'
            },
            {
              icon: '🕶️',
              title: 'AR/VR Режим',
              description: 'Просмотр NFT в дополненной реальности'
            }
          ].map((feature, index) => (
            <FeatureItem key={index} index={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
              Дорожная карта
            </span>
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Наши планы по развитию проекта и экосистемы
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500/30 to-transparent hidden md:block" />
          
          {[
            {
              phase: 'Q1 2023',
              title: 'Запуск коллекции',
              description: 'Релиз первой серии NFT и маркетплейса'
            },
            {
              phase: 'Q2 2023',
              title: 'Мобильное приложение',
              description: 'Доступ к коллекции с любых устройств'
            },
            {
              phase: 'Q3 2023',
              title: '3D Галерея',
              description: 'Иммерсивное представление активов'
            },
            {
              phase: 'Q4 2023',
              title: 'AR/VR Интеграция',
              description: 'Просмотр NFT в виртуальной реальности'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-6 md:mb-0`}>
                <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-2">
                  {item.phase}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-purple-100">{item.description}</p>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-48 rounded-xl overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-20">{index + 1}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-500/20 border-2 border-purple-500/30 p-12 text-center backdrop-blur-lg shadow-2xl shadow-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы создать свою{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              NFT-коллекцию
            </span>?
          </h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Оставьте заявку и получите бесплатную консультацию по запуску вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-purple-500/30"
            >
              Начать сейчас
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-purple-500 text-purple-400 font-medium rounded-full hover:bg-purple-900/30 transition"
            >
              Связаться с экспертом
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 md:px-12 lg:px-24 border-t border-purple-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 md:mb-0">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              NFT
            </span>{' '}
            Studio
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-purple-300 hover:text-white transition">Twitter</a>
            <a href="#" className="text-purple-300 hover:text-white transition">Discord</a>
            <a href="#" className="text-purple-300 hover:text-white transition">OpenSea</a>
          </div>
        </div>
      </footer>
    </div>
  );
}