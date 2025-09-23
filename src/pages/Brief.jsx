import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';


// Компонент для анимированного контейнера
const AnimatedSection = ({ children, delay = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay }}
      className="p-8 md:p-12 bg-zinc-100 dark:bg-zinc-800 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-700"
    >
      {children}
    </motion.div>
  );
};

// Компонент-разделитель с шестиконечной звездой
const FancyDivider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="w-20 h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
    <span className="mx-6 text-zinc-400 dark:text-zinc-600">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.25L15.09 8.65L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.65L12 2.25Z" />
      </svg>
    </span>
    <div className="w-20 h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
  </div>
);

export default function Brief() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 dark:text-white overflow-x-hidden">
      {/* {хлебные крошки} */}
      <div className="w-full relative">
        <div className="absolute top-20 left-20 pl-5 z-50 text-sm md:text-base text-zinc-500 dark:text-zinc-400">
          <Link to="/" className="hover:underline hover:text-blue-500 transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Бриф</span>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 lg:py-24 relative">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-dela text-center mb-12 lg:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Бриф на разработку дизайна
        </motion.h1>

        <form className="space-y-16 lg:px-24">

          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-zinc-900 dark:text-zinc-50">
              Что нужно разработать?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Сайт', 'Презентация', 'Маркетинг-кит', 'Коммерческое предложение', 'Логотип', 'Бренд-бук', 'Видеоролик', 'Каталог', 'Другое'].map((item) => (
                <label key={item} className="flex items-center space-x-4 cursor-pointer p-5 bg-zinc-200 dark:bg-zinc-700 rounded-xl shadow-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all duration-200">
                  <input type="checkbox" name="development_type" value={item} className="form-checkbox text-blue-500 rounded-full w-6 h-6 focus:ring-blue-500 dark:bg-zinc-800 dark:checked:bg-blue-500" />
                  <span className="text-lg text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                </label>
              ))}
            </div>
          </AnimatedSection>

          <FancyDivider />

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.2}>
              <h2 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
                Есть ли логотип?
              </h2>
              <div className="flex flex-col space-y-4">
                {['Да', 'Нет', 'Хочу заказать'].map((item) => (
                  <label key={item} className="flex items-center space-x-3 cursor-pointer p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg shadow-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all duration-200">
                    <input type="radio" name="logo_status" value={item} className="form-radio text-blue-500 dark:bg-zinc-800 w-5 h-5" />
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </label>
                ))}
            </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <h2 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
                Есть ли брендбук?
              </h2>
              <div className="flex flex-col space-y-4">
                {['Да', 'Нет', 'Хочу заказать'].map((item) => (
                  <label key={item} className="flex items-center space-x-3 cursor-pointer p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg shadow-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all duration-200">
                    <input type="radio" name="brandbook_status" value={item} className="form-radio text-blue-500 dark:bg-zinc-800 w-5 h-5" />
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </label>
                ))}
            </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <h2 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
                Нужна ли разработка текстов?
              </h2>
              <div className="flex flex-col space-y-4">
                {['Да', 'Нет'].map((item) => (
                  <label key={item} className="flex items-center space-x-3 cursor-pointer p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg shadow-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all duration-200">
                    <input type="radio" name="text_needed" value={item} className="form-radio text-blue-500 dark:bg-zinc-800 w-5 h-5" />
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </label>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <FancyDivider />

          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
              Добавьте материалы
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              (бренд-бук, логотип, фотографии, тексты и пр.), либо отправьте дополнительно на почту info@veonix.ru
            </p>
            <div className="relative border-2 border-dashed border-zinc-400 dark:border-zinc-600 rounded-xl p-12 text-center transition-colors hover:border-blue-500 dark:hover:border-blue-500 group">
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" id="file-upload" />
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-blue-500 mb-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.36 4 11.41 4 7.64 4 4.54 6.59 4 10.04 1.62 10.25 0 12.19 0 14.5c0 2.5 2 4.5 4.5 4.5h14.5c2.76 0 5-2.24 5-5 0-2.64-2.07-4.83-4.73-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                </svg>
                <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Перетащите файлы, для отправки
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">(max 100 mb)</p>
              </div>
            </div>
          </AnimatedSection>
          
          <FancyDivider />

          <div className="space-y-10">
            <AnimatedSection>
              <label htmlFor="company-description" className="block text-2xl md:text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                Чем занимается ваша компания?
              </label>
              <textarea id="company-description" rows="5" placeholder="Пример: производим электронное измерительное оборудование" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </AnimatedSection>

            <AnimatedSection>
              <label htmlFor="clients" className="block text-2xl md:text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                Кто ваши клиенты?
              </label>
              <textarea id="clients" rows="5" placeholder="Пример: инженеры, промышленные предприятия, научно-исследовательские центры" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </AnimatedSection>
            
            <AnimatedSection>
              <label htmlFor="style-description" className="block text-2xl md:text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                Опишите желаемый стиль
              </label>
              <textarea id="style-description" rows="5" placeholder="Пример: минималистичный, современный, с преобладанием синих и серых оттенков" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </AnimatedSection>

            <AnimatedSection>
              <label htmlFor="inspiration-links" className="block text-2xl md:text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                Приложите ссылки на работы, которые Вам нравятся
              </label>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                Можно выбрать из нашего портфолио
              </p>
              <textarea id="inspiration-links" rows="5" placeholder="Пример: https://www.behance.net/gallery/1234567, https://dribbble.com/shots/9876543" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </AnimatedSection>

            <AnimatedSection>
              <label htmlFor="your-ideas" className="block text-2xl md:text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                Есть ли у вас идеи, которые Вы хотите воплотить в дизайне?
              </label>
              <textarea id="your-ideas" rows="5" placeholder="Пример: мне бы хотелось добавить 3D-графику на главную страницу, чтобы показать наш продукт со всех сторон" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </AnimatedSection>
            
            <AnimatedSection>
              <label htmlFor="unwanted-elements" className="block text-2xl md:text-3xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
                Что Вы категорически не хотите видеть в дизайне?
              </label>
              <textarea id="unwanted-elements" rows="5" placeholder="Пример: не хотим использовать желтый цвет и футуристичные шрифты" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </AnimatedSection>
          </div>

          <FancyDivider />

          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
              Введите свои данные
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              <input type="text" placeholder="Ваше имя" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Email" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="tel" placeholder="Телефон" className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </AnimatedSection>

          <motion.button
            type="submit"
            className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-xl tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Отправить
          </motion.button>
        </form>
      </main>
    </div>
  );
}