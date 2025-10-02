import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';


// Компонент для анимированного контейнера (Карточки)
const AnimatedSection = ({ children, delay = 0.1, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay }}
      // Улучшено: более глубокие тени и плавные границы для премиум-вида
      className={`p-8 md:p-12 bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl dark:shadow-zinc-900/50 border border-zinc-200 dark:border-zinc-700/70 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Компонент-разделитель с шестиконечной звездой
const FancyDivider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="w-20 h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
    <span className="mx-6 text-blue-500 dark:text-purple-400 transform rotate-12">
      {/* Улучшено: Замена SVG на более современный иконку с акцентным цветом */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.53 2.05a1.25 1.25 0 0 1 .94 0c.27.09.52.28.69.53l2.84 4.31 5.25.42a1.25 1.25 0 0 1 .84 2.15l-3.9 3.5.94 5.37a1.25 1.25 0 0 1-1.81 1.34l-4.57-2.38-4.57 2.38a1.25 1.25 0 0 1-1.81-1.34l.94-5.37-3.9-3.5a1.25 1.25 0 0 1 .84-2.15l5.25-.42 2.84-4.31a1.25 1.25 0 0 1 .69-.53z" />
      </svg>
    </span>
    <div className="w-20 h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
  </div>
);

// Инпут/Текстареа с улучшенным стилем
const FormInput = ({ type = 'text', placeholder, rows, id, children }) => (
    <div className="relative">
        <label htmlFor={id} className="block text-lg font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            {children}
        </label>
        {type === 'textarea' ? (
            <textarea 
                id={id} 
                rows={rows} 
                placeholder={placeholder} 
                // Улучшено: Инпуты стали контрастнее, с золотистым фокусом
                className="w-full p-4 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500"
            ></textarea>
        ) : (
            <input 
                type={type} 
                id={id}
                placeholder={placeholder} 
                // Улучшено: Инпуты стали контрастнее, с золотистым фокусом
                className="w-full p-4 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500"
            />
        )}
    </div>
);


export default function Brief() {
  return (
    // Улучшено: добавлен сложный фон для премиум-эффекта
    <div className="min-h-screen text-black dark:text-white overflow-x-hidden" 
         style={{
            backgroundColor: '#0c0d13', // Глубокий темно-синий
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(200, 200, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(100, 100, 150, 0.05) 0%, transparent 50%)'
        }}>
      
      {/* {хлебные крошки} */}
      <div className="w-full relative py-8 pt-20">
        <div className="container mx-auto px-6 text-sm md:text-base text-zinc-500 dark:text-zinc-400">
          <Link to="/" className="hover:underline hover:text-blue-500 transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white font-bold">Бриф</span>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 lg:py-16 relative">
        {/* Улучшено: Сделан более выразительный заголовок */}
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-10 lg:mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-400 to-purple-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Заполните Бриф
        </motion.h1>
        <p className="text-xl text-center text-zinc-500 dark:text-zinc-400 mb-16 max-w-3xl mx-auto">
            Ваши ответы — это основа для создания идеального дизайна. Чем подробнее вы заполните форму, тем точнее будет результат.
        </p>

        <form className="space-y-20 lg:px-10">

          {/* 1. Что нужно разработать? (Улучшены кнопки) */}
          <AnimatedSection>
                <div className="mb-8">
                    <span className="text-sm font-bold uppercase text-blue-500 dark:text-purple-400">Шаг 1 из 5</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-1 text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Услуги и Продукты
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Выберите все пункты, над которыми нам предстоит работать.
                    </p>
                </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Сайт', 'Презентация', 'Маркетинг-кит', 'Коммерческое предложение', 'Логотип', 'Бренд-бук', 'Видеоролик', 'Каталог', 'Другое'].map((item, index) => (
                <label key={index} className="flex items-center space-x-4 cursor-pointer p-4 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-xl shadow-inner shadow-zinc-300/50 dark:shadow-zinc-900/50 transition-all duration-200 has-checked:bg-blue-100 dark:has-checked:bg-blue-900/50 has-checked:border-blue-500 border-2 border-transparent">
                  <input type="checkbox" name="development_type" value={item} 
                    // Улучшено: более стильный чекбокс
                    className="form-checkbox appearance-none text-blue-500 rounded-lg w-6 h-6 border-2 border-zinc-400 dark:border-zinc-500 checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 transition duration-150" 
                  />
                  <span className="text-base text-zinc-700 dark:text-zinc-200 font-medium">{item}</span>
                </label>
              ))}
            </div>
          </AnimatedSection>

          <FancyDivider />

          {/* 2. Дополнительные требования (Улучшена сетка и стили) */}
            <div className="mb-8 text-center">
                <span className="text-sm font-bold uppercase text-blue-500 dark:text-purple-400">Шаг 2 из 5</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1 text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Бренд и Контент
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                    Пожалуйста, укажите, какие материалы у вас уже есть.
                </p>
            </div>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.2} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
                Есть ли логотип?
              </h3>
              <div className="flex flex-col space-y-4">
                {['Да', 'Нет', 'Хочу заказать'].map((item, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer p-4 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-lg shadow-sm transition-all duration-200 has-checked:bg-blue-100 dark:has-checked:bg-blue-900/50 border-2 border-transparent has-checked:border-blue-500">
                    <input type="radio" name="logo_status" value={item} className="form-radio appearance-none text-blue-500 dark:bg-zinc-800 w-5 h-5 border-2 border-zinc-400 dark:border-zinc-500 checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-150 rounded-full" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
                Есть ли брендбук?
              </h3>
              <div className="flex flex-col space-y-4">
                {['Да', 'Нет', 'Хочу заказать'].map((item, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer p-4 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-lg shadow-sm transition-all duration-200 has-checked:bg-blue-100 dark:has-checked:bg-blue-900/50 border-2 border-transparent has-checked:border-blue-500">
                    <input type="radio" name="brandbook_status" value={item} className="form-radio appearance-none text-blue-500 dark:bg-zinc-800 w-5 h-5 border-2 border-zinc-400 dark:border-zinc-500 checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-150 rounded-full" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
                Нужна ли разработка текстов?
              </h3>
              <div className="flex flex-col space-y-4">
                {['Да', 'Нет'].map((item, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer p-4 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-lg shadow-sm transition-all duration-200 has-checked:bg-blue-100 dark:has-checked:bg-blue-900/50 border-2 border-transparent has-checked:border-blue-500">
                    <input type="radio" name="text_needed" value={item} className="form-radio appearance-none text-blue-500 dark:bg-zinc-800 w-5 h-5 border-2 border-zinc-400 dark:border-zinc-500 checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-150 rounded-full" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <FancyDivider />
            
          {/* 3. Загрузка материалов (Улучшен UI загрузки) */}
          <AnimatedSection delay={0.2}>
                <div className="mb-8">
                    <span className="text-sm font-bold uppercase text-blue-500 dark:text-purple-400">Шаг 3 из 5</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-1 text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Загрузка Материалов
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Прикрепите все готовые ресурсы (брендбук, лого, фото) или отправьте их на почту.
                    </p>
                </div>
            <div className="relative border-4 border-dashed border-blue-400/50 dark:border-purple-500/50 rounded-2xl p-12 text-center bg-zinc-100/50 dark:bg-zinc-700/50 transition-colors hover:border-blue-500 dark:hover:border-purple-500 group">
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" id="file-upload" />
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-blue-500 dark:text-purple-400 mb-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.36 4 11.41 4 7.64 4 4.54 6.59 4 10.04 1.62 10.25 0 12.19 0 14.5c0 2.5 2 4.5 4.5 4.5h14.5c2.76 0 5-2.24 5-5 0-2.64-2.07-4.83-4.73-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                </svg>
                <p className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                  Перетащите файлы сюда или нажмите для выбора
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    (Максимальный размер: 100 MB. Поддерживаемые форматы: ZIP, PDF, JPG, PNG)
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          <FancyDivider />

          {/* 4. Описание (Улучшены заголовки и использован новый FormInput) */}
            <div className="mb-8 text-center">
                <span className="text-sm font-bold uppercase text-blue-500 dark:text-purple-400">Шаг 4 из 5</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1 text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Концепция и Видение
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                    Помогите нам понять ваш бренд и ваши эстетические предпочтения.
                </p>
            </div>
          <div className="space-y-10">
            <AnimatedSection>
              <FormInput id="company-description" rows="5" placeholder="Пример: производим электронное измерительное оборудование" type="textarea">
                Чем занимается ваша компания?
              </FormInput>
            </AnimatedSection>

            <AnimatedSection>
              <FormInput id="clients" rows="5" placeholder="Пример: инженеры, промышленные предприятия, научно-исследовательские центры" type="textarea">
                Кто ваши клиенты?
              </FormInput>
            </AnimatedSection>
            
            <AnimatedSection>
              <FormInput id="style-description" rows="5" placeholder="Пример: минималистичный, современный, с преобладанием синих и серых оттенков" type="textarea">
                Опишите желаемый стиль
              </FormInput>
            </AnimatedSection>

            <AnimatedSection>
              <FormInput id="inspiration-links" rows="5" placeholder="Пример: https://www.behance.net/gallery/1234567, https://dribbble.com/shots/9876543" type="textarea">
                Приложите ссылки на работы, которые Вам нравятся
              </FormInput>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Можно выбрать из нашего портфолио
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <FormInput id="unwanted-elements" rows="5" placeholder="Пример: не хотим использовать желтый цвет и футуристичные шрифты" type="textarea">
                Что Вы категорически не хотите видеть в дизайне?
              </FormInput>
            </AnimatedSection>
          </div>

          <FancyDivider />

          {/* 5. Контакты (Использован новый FormInput) */}
          <AnimatedSection delay={0.2}>
                <div className="mb-8">
                    <span className="text-sm font-bold uppercase text-blue-500 dark:text-purple-400">Шаг 5 из 5</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-1 text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Ваши Контакты
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Оставьте данные для обратной связи.
                    </p>
                </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput id="name" placeholder="Ваше имя" type="text">Имя</FormInput>
              <FormInput id="email" placeholder="Email" type="email">Email</FormInput>
              <FormInput id="phone" placeholder="Телефон" type="tel">Телефон</FormInput>
            </div>
          </AnimatedSection>

          <motion.button
            type="submit"
            // Улучшено: более агрессивный градиент и тень для кнопки
            className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-xl tracking-wide shadow-[0_10px_30px_-10px_rgba(66,153,225,0.7)] hover:shadow-[0_15px_40px_-15px_rgba(147,51,234,0.9)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            ОТПРАВИТЬ БРИФ И НАЧАТЬ РАБОТУ &rarr;
          </motion.button>

            <div className="pt-8 text-center text-zinc-500 dark:text-zinc-600 text-sm">
                Нажимая "Отправить", вы соглашаетесь с нашей <Link to="/privacy" className="underline hover:text-blue-500">политикой конфиденциальности</Link>.
            </div>

        </form>
      </main>
    </div>
  );
}