import React, { useState, useMemo } from 'react';

// --- ДАННЫЕ ДЛЯ ИНТЕРАКТИВНОЙ СЕТКИ (в деловом и дружелюбном тоне) ---
const serviceOptions = [
  { id: 'web_landing', title: 'Лендинг', description: 'Эффективная страница для продукта или услуги' },
  { id: 'web_corp', title: 'Корпоративный сайт', description: 'Представительство вашей компании в сети' },
  { id: 'web_shop', title: 'Интернет-магазин', description: 'Профессиональная платформа для продаж' },
  { id: 'design_logo', title: 'Разработка логотипа', description: 'Уникальный знак для вашего бренда' },
  { id: 'design_branding', title: 'Брендинг / Фирменный стиль', description: 'Полный комплект визуальных материалов' },
  { id: 'design_uiux', title: 'Дизайн интерфейса (UI/UX)', description: 'Продуманный и удобный дизайн' },
  { id: 'target_vk', title: 'Таргетированная реклама в VK', description: 'Привлечение клиентов из соцсетей' },
  { id: 'smm_strategy', title: 'Ведение соцсетей (SMM)', description: 'Стратегия, контент и аналитика' },
  { id: 'seo_optimization', title: 'SEO-оптимизация', description: 'Улучшение позиций сайта в поиске' },
  { id: 'motion_design', title: 'Моушн-дизайн', description: 'Анимация и видео-графика' },
  { id: 'copywriting', title: 'Копирайтинг', description: 'Продающие и информативные тексты' },
  { id: 'custom_project', title: 'Нестандартная задача', description: 'Обсудим вашу уникальную идею' }
];


const StarBackground = () => {
  const [selectedServices, setSelectedServices] = useState({});
  const [formData, setFormData] = useState({ phone: '', name: '', query: '' });

  const generateStars = (count) => {
    let stars = '';
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2000;
      const y = Math.random() * 2000;
      stars += `${x}px ${y}px #FFF${i < count - 1 ? ',' : ''}`;
    }
    return stars;
  };

  const stars = useMemo(() => ({
    small: generateStars(700),
    medium: generateStars(200),
    large: generateStars(100)
  }), []);

  const handleServiceToggle = (id) => {
    setSelectedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeServices = Object.keys(selectedServices).filter(key => selectedServices[key]);
    
    if (activeServices.length === 0) {
      alert('Пожалуйста, выберите хотя бы одну услугу.');
      return;
    }
    if (!formData.phone) {
      alert('Пожалуйста, укажите ваш номер телефона для связи.');
      return;
    }

    const submissionData = {
      contact: formData,
      selectedServices: activeServices
    };
    
    console.log('--- Новая заявка ---');
    console.log(submissionData);
    alert(`Спасибо за вашу заявку! Мы скоро с вами свяжемся по номеру: ${formData.phone}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0f1f] to-[#100f1d]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/gray-900/80">
          <div 
            className="absolute w-[1px] h-[1px] bg-transparent"
            style={{ boxShadow: stars.small, animation: 'animStar 50s linear infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute w-[1px] h-[1px] bg-transparent"
            style={{ top: '2000px', boxShadow: stars.small, animation: 'animStar 50s linear infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute w-[2px] h-[2px] bg-transparent"
            style={{ boxShadow: stars.medium, animation: 'animStar 100s linear infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute w-[2px] h-[2px] bg-transparent"
            style={{ top: '2000px', boxShadow: stars.medium, animation: 'animStar 100s linear infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute w-[3px] h-[3px] bg-transparent"
            style={{ boxShadow: stars.large, animation: 'animStar 150s linear infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute w-[3px] h-[3px] bg-transparent"
            style={{ top: '2000px', boxShadow: stars.large, animation: 'animStar 150s linear infinite', willChange: 'transform' }}
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen container mx-auto px-4 py-16 text-white">
        <article
          className="max-w-4xl mx-auto rounded-xl p-6 md:p-8 shadow-2xl w-full"
          style={{
            backgroundColor: 'rgba(23, 27, 46, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
              Расскажите о вашей задаче
            </h1>
            <p className="text-lg text-white/70">
              Выберите интересующие услуги, и мы свяжемся с вами для обсуждения деталей.
            </p>
          </header>

          <main>
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-medium mb-6 text-white text-center">
                Что вас интересует?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {serviceOptions.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 rounded-lg text-left transition-all duration-300 cursor-pointer border-2
                      ${selectedServices[service.id] 
                        ? 'bg-blue-600/30 border-blue-500' 
                        : 'bg-white/5 border-transparent hover:border-white/30'
                      }`}
                  >
                    <h3 className="font-semibold text-white text-md">{service.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{service.description}</p>
                  </button>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-medium mb-6 text-white text-center">
                Как с вами связаться?
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя"
                    className="w-full bg-black/30 border border-white/30 rounded-md p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Контактный телефон*"
                    required
                    className="w-full bg-black/30 border border-white/30 rounded-md p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleInputChange}
                  placeholder="Кратко опишите задачу или задайте вопрос (необязательно)"
                  rows="3"
                  className="w-full bg-black/30 border border-white/30 rounded-md p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900/50 focus:ring-blue-500"
                >
                  Отправить заявку
                </button>
              </form>
            </section>
          </main>
          
          <footer className="mt-8 text-center text-white/50 text-sm">
            <p>
              <span className="font-deutsch text-base tracking-wider text-white/70">NSBH</span>
            </p>
          </footer>
        </article>
      </div>

      {/* ИСПРАВЛЕНИЕ: Убран атрибут `jsx` */}
      <style>{`
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}</style>
    </div>
  );
};

export default StarBackground;