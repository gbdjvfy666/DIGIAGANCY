import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/other/Navbar";
import Footer from "../Components/other/Footer";
export default function PremiumVkTarget() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      {/* Hero Section */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-blue-900/20 z-0"></div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
              ПРЕМИУМ ТАРГЕТИНГ ВКОНТАКТЕ
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Увеличим продажи
              </span>{" "}
              вашего бизнеса через ВК
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Профессиональная настройка рекламы с оплатой за результат. Гарантируем рост выручки или вернем деньги.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center"
              >
                Получить консультацию
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
              <a
                href="#cases"
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-700 flex items-center justify-center"
              >
                Наши кейсы
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Более 150 клиентов", "ROI от 300%", "Средний CTR 5.8%", "Оплата за результат"].map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-lg font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша стратегия таргетинга</h2>
            <p className="text-xl text-gray-300">
              Комплексный подход к настройке рекламы, который приносит реальные продажи
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Глубинный анализ аудитории",
                description: "Используем 27 параметров таргетинга, включая поведенческие факторы и покупательскую способность"
              },
              {
                icon: "🎯",
                title: "Гиперсегментация",
                description: "Делим аудиторию на 10+ сегментов и тестируем разные подходы к каждому"
              },
              {
                icon: "📊",
                title: "AI-оптимизация",
                description: "Автоматическая корректировка ставок и распределения бюджета в реальном времени"
              },
              {
                icon: "🔄",
                title: "Ретаргетинг",
                description: "7 уровней вовлеченности для максимальной конверсии"
              },
              {
                icon: "🧪",
                title: "A/B тестирование",
                description: "Проверяем 50+ вариантов креативов и текстов"
              },
              {
                icon: "📈",
                title: "Постоянный мониторинг",
                description: "Ежедневная аналитика и корректировка кампаний"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Реальные кейсы</h2>
            <p className="text-xl text-gray-300">
              Посмотрите, каких результатов добились наши клиенты
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Интернет-магазин косметики",
                image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                metrics: [
                  { value: "+340%", label: "ROI" },
                  { value: "₽0.72", label: "Цена лида" },
                  { value: "5.8%", label: "CTR" }
                ]
              },
              {
                title: "Онлайн-курсы",
                image: "https://images.unsplash.com/photo-1542621334-a254cf47733d",
                metrics: [
                  { value: "+420%", label: "Конверсия" },
                  { value: "-58%", label: "Стоимость лида" },
                  { value: "8.2%", label: "CTR" }
                ]
              },
              {
                title: "Фитнес-клуб",
                image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
                metrics: [
                  { value: "230+", label: "Новых клиентов" },
                  { value: "5.2x", label: "ROI" },
                  { value: "4.5%", label: "CTR" }
                ]
              }
            ].map((caseItem, index) => (
              <div key={index} className="bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="h-48 relative">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold">{caseItem.title}</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {caseItem.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Тарифы на настройку рекламы</h2>
            <p className="text-xl text-gray-300">
              Выберите подходящий вариант для вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Старт",
                price: "15 000₽",
                description: "Для тестирования гипотез",
                features: [
                  "1 рекламная кампания",
                  "Базовый таргетинг",
                  "5 креативов",
                  "Отчет по завершению",
                  "Поддержка 5 дней"
                ],
                cta: "Начать тестирование"
              },
              {
                name: "Оптимальный",
                price: "35 000₽",
                description: "Для стабильного потока клиентов",
                popular: true,
                features: [
                  "3 рекламные кампании",
                  "Расширенный таргетинг",
                  "15 креативов",
                  "Ретаргетинг",
                  "Еженедельные отчеты",
                  "Оптимизация в процессе"
                ],
                cta: "Выбрать тариф"
              },
              {
                name: "Премиум",
                price: "75 000₽",
                description: "Для максимальных результатов",
                features: [
                  "Неограниченное число кампаний",
                  "Глубокий анализ аудитории",
                  "30+ креативов",
                  "Индивидуальная стратегия",
                  "Ежедневный мониторинг",
                  "Гарантия результата"
                ],
                cta: "Обсудить проект"
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`relative rounded-xl overflow-hidden border ${plan.popular ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-gray-700"}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <div className="p-8 bg-gray-800">
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <div className="text-4xl font-bold mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
<section className="w-full bg-black text-gray-100 py-24 px-6 md:px-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-bold text-blue-400 mb-10">Что вы получаете с нами</h2>
    <div className="grid md:grid-cols-3 gap-10">
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-blue-500 transition">
        <h3 className="text-xl font-semibold text-white mb-3">🎯 Анализ ЦА и стратегии</h3>
        <p className="text-gray-400">
          Мы изучаем вашу нишу, конкурентов и поведение клиентов. Строим стратегию, которая даёт результат, а не просто охваты.
        </p>
      </div>
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-blue-500 transition">
        <h3 className="text-xl font-semibold text-white mb-3">🧠 Креативы, которые цепляют</h3>
        <p className="text-gray-400">
          Создаём статичные и анимированные баннеры, видео, сторис. Всё A/B тестируется и настраивается под нужную цель.
        </p>
      </div>
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-blue-500 transition">
        <h3 className="text-xl font-semibold text-white mb-3">📊 Сквозная аналитика</h3>
        <p className="text-gray-400">
          Подключим пиксель, метки, CRM. Покажем, сколько стоил каждый лид и какая реклама реально работает.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="w-full bg-gradient-to-br from-black via-zinc-900 to-blue-950 text-gray-100 py-24 px-6 md:px-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-14">Пошаговая работа с нами</h2>
    <ol className="space-y-10 text-gray-300 list-decimal list-inside text-lg leading-relaxed">
      <li>
        <span className="text-blue-400 font-semibold">Бриф и цели:</span> вы рассказываете, кого хотите привлечь и какие задачи стоят.
      </li>
      <li>
        <span className="text-blue-400 font-semibold">Аудит и гипотезы:</span> мы анализируем ваш продукт, ЦА, офферы. Строим гипотезы.
      </li>
      <li>
        <span className="text-blue-400 font-semibold">Настройка и запуск:</span> мы создаём кампании, подбираем интересы, креативы, тексты.
      </li>
      <li>
        <span className="text-blue-400 font-semibold">Тест и масштабирование:</span> тестируем, отсеиваем слабые связки, усиливаем лучшие.
      </li>
      <li>
        <span className="text-blue-400 font-semibold">Аналитика и отчёт:</span> прозрачные цифры, доступ к метрике, отчёт по лидам.
      </li>
    </ol>
  </div>
</section>


      {/* FAQ */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-gray-300">
              Всё, что вы хотели знать о нашей работе
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Как быстро вы сможете запустить рекламу?",
                answer: "Стандартный срок запуска - 1-2 рабочих дня после получения всех необходимых материалов. Для срочных запусков доступна услуга 'Экспресс-настройка' (запуск в течение 4 часов)."
              },
              {
                question: "Какие гарантии вы предоставляете?",
                answer: "Для тарифов Оптимальный и Премиум мы фиксируем KPI в договоре. Если не достигаем согласованных показателей - дорабатываем кампанию бесплатно или возвращаем часть средств."
              },
              {
                question: "Как часто вы предоставляете отчеты?",
                answer: "Частота отчетности зависит от тарифа: для Старт - итоговый отчет, для Оптимальный - еженедельно, для Премиум - ежедневно + еженедельные аналитические отчеты."
              },
              {
                question: "С какими нишами вы работаете?",
                answer: "Мы имеем успешный опыт работы с e-commerce, образовательными проектами, услугами, b2b и другими направлениями. Перед началом работы проводим бесплатный аудит вашей ниши."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Enhanced Contrast VK Section */}
<section className="relative w-full min-h-screen bg-gradient-to-r from-black to-blue-950 text-gray-100 flex items-stretch overflow-hidden">

  {/* Параллакс VK фон */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
    <motion.h1
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="text-[25rem] font-extrabold text-white/5 tracking-tight leading-none"
    >
      VK
    </motion.h1>
  </div>

  {/* Левый блок */}
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full md:w-1/3 p-10 flex flex-col justify-center text-left space-y-6 z-10"
  >
    <h2 className="text-4xl font-extrabold text-blue-400">
      Ваша реклама — в сердце VK
    </h2>
    <p className="text-lg text-gray-300 leading-relaxed">
      Мы превращаем клики в заявки, а внимание — в действия. Всё — через алгоритмы ВКонтакте, креатив и аналитику.
    </p>
    <ul className="space-y-4">
      <li className="flex items-start gap-3">
        <span className="text-blue-500 text-xl">★</span>
        <span><span className="font-semibold text-white">Гиперточный таргет</span> на вашу аудиторию по интересам и поведению</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-blue-500 text-xl">★</span>
        <span><span className="font-semibold text-white">Креативы</span> с нативным вовлечением — в ленте, в историях, в сообществах</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-blue-500 text-xl">★</span>
        <span><span className="font-semibold text-white">Интеграции</span> с чат-ботами, CRM, аналитикой</span>
      </li>
    </ul>
  </motion.div>

  {/* Центр — просто прозрачная зона */}
  <div className="hidden md:flex w-1/3 items-center justify-center z-10" />

  {/* Правый блок */}
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full md:w-1/3 p-10 flex flex-col justify-center text-white space-y-6 z-10"
  >
    <h2 className="text-4xl font-extrabold text-blue-300">
      Результат — не обещание, а процесс
    </h2>
    <p className="text-lg text-blue-200">
      Наша реклама растет из цифр, а не из фантазий. Вы получаете прогноз, аналитику, отчеты — и заявки.
    </p>
    <ul className="space-y-4">
      <li className="flex items-start gap-3">
        <span className="text-white text-xl">★</span>
        <span><span className="font-semibold text-blue-100">200+ успешных запусков</span> — от малого бизнеса до брендов</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-white text-xl">★</span>
        <span><span className="font-semibold text-blue-100">A/B тестирование</span> каждой гипотезы</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-white text-xl">★</span>
        <span><span className="font-semibold text-blue-100">Работа без договора</span> или с полным сопровождением под ключ</span>
      </li>
    </ul>
  </motion.div>

  {/* CTA внизу */}
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.2 }}
    viewport={{ once: true }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
  >
    <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-blue-500 transition">
      Запустить рекламу
    </button>
  </motion.div>
</section>



      {/* CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы увеличить продажи через ВКонтакте?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Оставьте заявку и получите бесплатный аудит вашей текущей рекламной кампании
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <a
                href="https://t.me/yourusername"
                className="bg-white text-blue-700 hover:bg-gray-100 transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                Написать в Telegram
              </a>
              <a
                href="tel:+79991234567"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Позвонить нам
              </a>
            </div>
          </div>
        </div>
      </section>
      
    <Footer/>
    </div>
  );
}