import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/other/Navbar";
import Footer from "../Components/other/Footer";

// Иконки для секции "Наша стратегия" для стилистического единства
const strategyIcons = [
  (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21h4v-9h7V8h-7V2h-4v6H3v4h7v9z" /></svg>,
  (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13V5a2 2 0 012-2h6l4 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m5-4h4" /></svg>,
  (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h5M5 19v-5h5m10-4v5h-5M19 5v5h-5" /></svg>,
  (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2" /></svg>,
  (props) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v4" /></svg>,
];

export default function PremiumVkTarget() {
  return (
    // Базовый фон - черный. Добавлен font-sans для консистентности.
    <div className="bg-black text-gray-300 min-h-screen font-sans relative">
      {/* ЭФФЕКТ ШУМА: едва заметный слой поверх всего для текстуры */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden z-10">
        <div className="container mx-auto px-6 py-32 md:py-48 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">
            <span className="text-blue-400">Премиум-таргетинг </span>
            для вашего бизнеса в ВК
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Профессиональная настройка рекламы с гарантией результата. Приводим клиентов, а не просто клики.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-8 py-4 rounded-lg font-bold text-lg text-white">
              Получить консультацию
            </a>
            <a href="#cases" className="border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-colors duration-300 px-8 py-4 rounded-lg font-bold text-lg">
              Смотреть кейсы
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Более 150+ проектов", "Гарантия ROI от 300%", "Средний CTR 5.8%", "Оплата за результат по KPI"].map((text, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                <span className="font-medium text-lg">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наш подход к таргетингу</h2>
            <p className="text-xl text-gray-500">
              Комплексная стратегия, нацеленная на реальные продажи.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Глубинный анализ", description: "Изучаем 27 параметров аудитории, включая поведенческие факторы и покупательскую способность." },
              { title: "Гиперсегментация", description: "Делим аудиторию на 10+ сегментов, тестируя уникальные креативы для каждого." },
              { title: "AI-оптимизация", description: "ИИ корректирует ставки и распределение бюджета для максимальной эффективности." },
              { title: "Многоуровневый ретаргетинг", description: "Создаем 7-уровневую воронку для возврата пользователей и увеличения конверсии." },
              { title: "Сплит-тестирование", description: "Непрерывно проверяем более 50 вариантов креативов и текстов для выявления лучших." },
              { title: "Ежедневный мониторинг", description: "Постоянная аналитика и корректировка кампаний для достижения поставленных KPI." }
            ].map((item, index) => (
              <div key={index} className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-colors duration-300">
                {React.createElement(strategyIcons[index], { className: "w-8 h-8 mb-4 text-blue-400" })}
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-24 bg-zinc-900/80 border-y border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Реальные кейсы</h2>
            <p className="text-xl text-gray-500">Результаты, выраженные в цифрах.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "E-commerce: Магазин косметики", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9", metrics: [{ value: "+340%", label: "ROI" }, { value: "72 ₽", label: "Цена лида" }, { value: "5.8%", label: "CTR" }] },
              { title: "EdTech: Онлайн-курсы", image: "https://images.unsplash.com/photo-1542621334-a254cf47733d", metrics: [{ value: "+420%", label: "Конверсия в продажу" }, { value: "-58%", label: "Стоимость лида" }, { value: "8.2%", label: "CTR" }] },
              { title: "Офлайн: Фитнес-клуб", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f", metrics: [{ value: "230+", label: "Новых абонементов" }, { value: "5.2x", label: "Окупаемость" }, { value: "4.5%", label: "CTR" }] }
            ].map((caseItem) => (
              <div key={caseItem.title} className="bg-black rounded-xl overflow-hidden border border-zinc-800 group">
                <div className="h-56 relative">
                  <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">{caseItem.title}</h3>
                </div>
                <div className="p-6 bg-zinc-900">
                  <div className="grid grid-cols-3 gap-4">
                    {caseItem.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-3xl font-bold text-blue-400">{metric.value}</div>
                        <div className="text-sm text-gray-500">{metric.label}</div>
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
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифы</h2>
            <p className="text-xl text-gray-500">Прозрачные условия для любых задач.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
             {/* Тарифы с унифицированными иконками-звездами */}
            {[
              { name: "Старт", price: "15 000 ₽", description: "Для тестирования ниши", features: ["1 рекламная кампания", "Анализ 2 сегментов ЦА", "5 креативов", "Итоговый отчет"], popular: false, cta: "Начать" },
              { name: "Оптимальный", price: "35 000 ₽", description: "Стабильный поток клиентов", features: ["3 рекламные кампании", "Полный анализ ЦА", "15 креативов + A/B тесты", "Ретаргетинг", "Еженедельные отчеты", "Оптимизация в процессе"], popular: true, cta: "Выбрать Оптимальный" },
              { name: "Премиум", price: "75 000 ₽", description: "Максимальный результат", features: ["∞ рекламных кампаний", "Индивидуальная стратегия", "30+ креативов и видео", "Полная аналитика", "Ежедневный мониторинг", "Гарантия результата по KPI"], popular: false, cta: "Обсудить проект" }
            ].map((plan) => (
              <div key={plan.name} className={`bg-zinc-900 rounded-xl border ${plan.popular ? "border-blue-500/80 scale-105" : "border-zinc-800"} p-8`}>
                 <h3 className="text-2xl font-bold mb-1 text-white">{plan.name}</h3>
                 <p className="text-gray-400 mb-6">{plan.description}</p>
                 <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>
                 <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1 shrink-0">★</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                 </ul>
                 <a href="#contact" className={`block text-center w-full py-3 px-6 rounded-lg font-bold transition-colors ${plan.popular ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`}>
                   {plan.cta}
                 </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Пошаговая работа */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-14">Процесс работы</h2>
          <ol className="space-y-12 relative border-l-2 border-zinc-700 ml-4">
            {['Бриф и стратегия', 'Анализ и подготовка', 'Запуск и тесты', 'Оптимизация', 'Масштабирование'].map((step, index) => (
                <li key={step} className="ml-8">
                    <div className="absolute -left-[1.35rem] mt-2 w-10 h-10 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center font-bold text-blue-400">0{index + 1}</div>
                    <h3 className="text-2xl font-bold text-blue-400">{step}</h3>
                </li>
            ))}
          </ol>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Вопросы и ответы</h2>
            <p className="text-xl text-gray-500">Всё, что вы хотели знать.</p>
          </div>
          <div className="space-y-4">
             {/* FAQ в виде аккордеона */}
            {[
              { question: "Как быстро вы сможете запустить рекламу?", answer: "Стандартный срок запуска — 2-3 рабочих дня после брифинга. Это время необходимо для глубокого анализа и подготовки качественных креативов." },
              { question: "Какие гарантии вы предоставляете?", answer: "Для тарифов 'Оптимальный' и 'Премиум' мы фиксируем ключевые показатели эффективности (KPI) в договоре. Если мы не достигаем согласованных целей, мы продолжаем работать бесплатно до их достижения." },
              { question: "Какой рекламный бюджет мне нужен?", answer: "Мы рекомендуем начинать с бюджета от 30 000 ₽ в месяц для эффективного тестирования гипотез. Однако, мы можем работать с любыми бюджетами, адаптируя под них стратегию." },
              { question: "С какими нишами вы не работаете?", answer: "Мы не работаем с тематиками, запрещенными законодательством и правилами ВКонтакте, а также с проектами, которые не разделяют наши ценности честности и качества." }
            ].map((item) => (
                <details key={item.question} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 cursor-pointer transition-colors hover:border-zinc-700">
                    <summary className="font-bold text-lg text-white list-none flex justify-between items-center">
                        {item.question}
                        <span className="text-gray-500 transform transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="text-gray-400 mt-4 pt-4 border-t border-zinc-800">{item.answer}</p>
                </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 bg-gradient-to-t from-blue-900/40 to-black">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы увеличить продажи?</h2>
          <p className="text-xl text-blue-200/80 mb-10">
            Оставьте заявку и получите бесплатный аудит вашей ниши и прогноз результатов.
          </p>
          <a href="#" className="bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-10 py-5 rounded-lg font-bold text-lg inline-block">
            Начать работу
          </a>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}