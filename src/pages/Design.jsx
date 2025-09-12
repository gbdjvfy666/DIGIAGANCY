import Navbar from "../Components/other/Navbar";
import Footer from "../Components/other/Footer";
import FractalPyramidComponent from "../Components/animatedblock/ProfileCard/FractalPyramidComponent.jsx";
import '../index.css'

export default function Design() {
  return (
    // Добавлен font-serif для основного текста
    <div className="bg-black text-gray-200 min-h-screen font-serif relative overflow-x-hidden">
      {/* 1. Эффект шума - наложение поверх всего */}
      <div 
        className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-50">
      </div>
      
      <Navbar />
      <FractalPyramidComponent />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight font-deutsch uppercase tracking-wider">
          Дизайн, что несет результат
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Создаём аскетичный и функциональный визуал, который выделяет, продаёт и врезается в память.
        </p>
        <div className="flex justify-center gap-4 mt-8">
            <button className="px-8 py-4 bg-gray-200 text-black rounded-none font-bold hover:bg-white transition-colors duration-300">
                Обсудить проект
            </button>
            <button className="px-8 py-4 border border-gray-600 text-gray-300 rounded-none font-bold hover:bg-zinc-900 transition-colors duration-300">
                Заказать дизайн
            </button>
        </div>
      </section>

      {/* Услуги */}
      <section className="w-full px-6 py-24"> 
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-deutsch tracking-wide mb-4">Наши Услуги</h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Комплексные дизайн-решения для бизнеса. Без компромиссов.
          </p>
        </div>
      
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Каждая карточка услуги - в монохромном стиле */}
          {[
            {
              title: "Дизайн для маркетплейсов",
              subtitle: "Wildberries • Ozon • Яндекс.Маркет",
              description: "Создаем продающие карточки товаров, которые выделяют ваш продукт среди конкурентов и увеличивают конверсию. Полный цикл: от анализа до готовых файлов.",
              icon: "✠",
              features: [
                "Глубокий анализ ниши и конкурентов",
                "Несколько вариантов дизайна на выбор",
                "Подготовка файлов по тех. требованиям"
              ]
            },
            {
              title: "Брендинг и логотипы",
              subtitle: "Узнаваемость • Ассоциации • Стиль",
              description: "Разрабатываем уникальные логотипы и комплексный фирменный стиль, который создает сильные ассоциации с вашим брендом. Включает гайдлайны и шаблоны.",
              icon: "☩",
              features: [
                "3-5 концепций логотипа на выбор",
                "Создание полного брендбука",
                "Разработка анимации логотипа"
              ]
            },
            {
              title: "Соцсети и контент",
              subtitle: "Единый стиль • Вовлечение • Узнаваемость",
              description: "Комплексное оформление социальных сетей с единой стилистикой: от аватарок до шаблонов постов и сторис. Создаем узнаваемый визуальный язык.",
              icon: "☨",
              features: [
                "Оформление VK, Telegram, Instagram",
                "Набор шаблонов для постов и историй",
                "Создание контент-плана"
              ]
            }
          ].map((service, index) => (
            <div key={index} className="bg-zinc-900 rounded-none overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col md:flex-row">
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <div className="absolute inset-0 bg-black flex items-center justify-center p-8 border-r border-zinc-800">
                  <div className="text-center text-gray-400">
                    <span className="text-8xl font-thin">{service.icon}</span>
                    <h3 className="text-3xl font-bold mt-4 font-deutsch tracking-wider">{service.title}</h3>
                    <p className="text-zinc-500 mt-2">{service.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col">
                <div className="flex-1">
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                        <span className="text-gray-500 mr-3 mt-1"> • </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-gray-200 text-black rounded-none font-bold hover:bg-white transition flex-1">
                    Заказать услугу
                  </button>
                  <button className="px-6 py-3 border border-zinc-700 rounded-none font-bold hover:bg-zinc-800 transition flex-1">
                    Примеры работ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Процесс работы */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center font-deutsch">Процесс Работы</h2>
          <div className="grid md:grid-cols-4 gap-0 text-center">
              {[
                  { step: "01", title: "Бриф и Анализ"},
                  { step: "02", title: "Разработка"},
                  { step: "03", title: "Правки"},
                  { step: "04", title: "Результат"}
              ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center border-t-2 border-zinc-800 p-8">
                      <span className="text-5xl font-thin text-zinc-600 mb-4">{item.step}</span>
                      <h3 className="text-lg font-bold uppercase tracking-widest">{item.title}</h3>
                  </div>
              ))}
          </div>
        </div>
      </section>


      {/* Цены */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold mb-10 text-center font-deutsch">Прайс-лист</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Карточки для маркетплейса", price: "от 1500 ₽", desc: "за 1 товар (6–10 карточек)"},
            { title: "Оформление соц. сетей", price: "от 3000 ₽", desc: "аватар, обложка, баннеры"},
            { title: "Логотип и фирстиль", price: "от 7000 ₽", desc: "логотип, шрифт, цвет, шаблоны"}
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-none border border-zinc-800 text-center flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-4xl font-extrabold text-white mb-2">{item.price}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button className="mt-8 w-full py-3 rounded-none font-bold bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300">
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (Призыв к действию) */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold font-deutsch tracking-wide mb-4">Готовы к трансформации?</h2>
        <p className="text-gray-400 mb-6 text-lg">Свяжитесь с нами, чтобы получить первые концепты уже завтра.</p>
        <button className="bg-white text-black px-10 py-4 rounded-none font-bold hover:scale-105 transition-transform duration-300">
          Начать проект
        </button>
      </section>

      <Footer />
    </div>
  );
}