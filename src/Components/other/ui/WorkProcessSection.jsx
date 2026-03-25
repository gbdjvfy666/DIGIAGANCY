import React from 'react';
import { motion } from 'framer-motion';
// global styles are imported at the root (main.jsx), no need to re-import here

// Данные, адаптированные под процесс покупки авто
const processSteps = [
  {
    step: "01",
    title: "Консультация и подбор",
    description: "Мы внимательно выслушаем ваши пожелания, проанализируем рынок и подберем несколько лучших вариантов автомобилей, которые им полностью соответствуют.",
    details: ["Обсуждение ваших потребностей и бюджета", "Подбор моделей и комплектаций", "Предварительный расчет итоговой стоимости"]
  },
  {
    step: "02",
    title: "Договор и оплата",
    description: "Заключаем официальный договор, в котором четко прописаны все условия, сроки и стоимость. Полная юридическая прозрачность на каждом этапе.",
    details: ["Подписание прозрачного договора", "Помощь в проведении оплаты", "Фиксация всех обязательств с нашей стороны"]
  },
  {
    step: "03",
    title: "Выкуп и проверка авто",
    description: "Наш специалист в Китае проводит полную техническую и юридическую проверку выбранного автомобиля перед покупкой, предоставляя вам детальный отчет.",
    details: ["Экспертная проверка состояния авто", "Полный фото- и видеоотчет для вас", "Оформление экспортных документов"]
  },
  {
    step: "04",
    title: "Доставка и таможня",
    description: "Мы берем на себя всю логистику и сложное таможенное оформление. Вы просто ожидаете, пока ваш новый автомобиль прибудет в ваш город.",
    details: ["Организация безопасной доставки", "Полное таможенное сопровождение", "Отслеживание местоположения авто онлайн"]
  },
  {
    step: "05",
    title: "Получение автомобиля",
    description: "Поздравляем! Ваш автомобиль готов к эксплуатации. Мы передаем вам ключи и полный пакет документов, необходимых для постановки на учет.",
    details: ["Выдача автомобиля в вашем городе", "Передача всех необходимых документов", "Консультация по дальнейшей эксплуатации"]
  }
];

const WorkProcessSection = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-damione tracking-wide text-white">
            Процесс покупки вашего нового авто
          </h2>
          <p className="text-lg text-gray-400 font-garet max-w-3xl mx-auto mt-6">
            Мы разбили весь процесс на 5 простых и понятных этапов. Вы всегда будете в курсе, на какой стадии находится ваш заказ.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-8 h-[calc(100%-2rem)] w-px bg-zinc-800" aria-hidden="true"></div>
          <div className="space-y-16">
            {processSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex items-start"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-zinc-700 bg-black z-10">
                  <span className="text-xl md:text-2xl font-semibold text-white">{item.step}</span>
                </div>
                <div className="ml-6 md:ml-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-deutsch tracking-wider">{item.title}</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">{item.description}</p>
                  <ul className="mt-4 space-y-2">
                    {item.details.map((detail, j) => (
                      <li key={j} className="flex items-center text-gray-500">
                        <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;