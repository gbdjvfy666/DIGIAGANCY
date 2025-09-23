import React, { useState } from 'react';

// --- Вспомогательные компоненты для контента ---

// Иконка
const Icon = ({ path }) => (
  <svg className="w-8 h-8 flex-shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// Контент для вкладки "Гарантии" (без изменений)
const GuaranteesContent = () => (
  <>
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Процесс и Гарантии: Наш подход к работе</h2>
      <p className="text-lg text-zinc-300 max-w-4xl mb-4">
        Мы высоко ценим доверие клиентов и подходим к каждому заказу серьезно и с высоким уровнем ответственности, подключаем все силы и профессиональные навыки специалистов.
      </p>
    </div>
    <div className="w-full h-px bg-zinc-700 mb-12"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-white border-l-2 border-cyan-400 pl-4">Официальный договор</h3>
        <div className="flex items-start gap-4">
          <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <div><h4 className="font-medium text-white">Заключаем договор</h4><p className="text-zinc-400 text-sm">В начале сотрудничества все обязательства фиксируем официально.</p></div>
        </div>
        <div className="flex items-start gap-4">
          <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          <div><h4 className="font-medium text-white">Конфиденциальность</h4><p className="text-zinc-400 text-sm">Не распространяем данные. Подписываем соглашение NDA.</p></div>
        </div>
        <div className="flex items-start gap-4">
          <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          <div><h4 className="font-medium text-white">Compliance</h4><p className="text-zinc-400 text-sm">Соблюдаем законодательство и внутренние правила вашей компании.</p></div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-white border-l-2 border-amber-400 pl-4">Бессрочное постобслуживание</h3>
        <div className="flex items-start gap-4">
          <Icon path="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
          <div><h4 className="font-medium text-white">Правки без ограничений</h4><p className="text-zinc-400 text-sm">Вносим неограниченное количество правок в проект даже после оплаты.</p></div>
        </div>
        <div className="flex items-start gap-4">
          <Icon path="M16 8l2-2m-2 2l-2-2m2 2l2 2m-2-2l-2 2M3 18v-2a4 4 0 014-4h4a4 4 0 014 4v2m-11 4h8" />
          <div><h4 className="font-medium text-white">Бесплатно исправляем ошибки</h4><p className="text-zinc-400 text-sm">Все ошибки, допущенные по нашей вине, исправим бесплатно в любое время.</p></div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-white border-l-2 border-violet-400 pl-4">Уникальный проект</h3>
        <div className="flex items-start gap-4">
          <Icon path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          <div><h4 className="font-medium text-white">Без шаблонов</h4><p className="text-zinc-400 text-sm">Разрабатываем каждый проект с нуля, не используем заготовки.</p></div>
        </div>
        <div className="flex items-start gap-4">
          <Icon path="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          <div><h4 className="font-medium text-white">Защита от плагиата</h4><p className="text-zinc-400 text-sm">Создаем полностью оригинальные проекты — 100% уникальность.</p></div>
        </div>
      </div>
    </div>
  </>
);

// КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Полностью переработанный контент "О нас"
const AboutContent = () => (
    <>
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Наша Философия: Простота и Уникальность</h2>
        <p className="text-lg text-zinc-300 max-w-4xl">Мы создаем не просто дизайн, а партнерские отношения, основанные на доверии и общем видении. Наш подход — максимальный результат при минимуме ваших усилий.</p>
      </div>

      <div className="w-full h-px bg-zinc-700 mb-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Колонка 1: Легкий старт */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Icon path="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.241c-.56.035-1.12.308-1.53.742L12 21.75l-2.02-2.721c-.41-.434-.97-.707-1.53-.742l-3.72-.241A2.062 2.062 0 013 14.894V10.608c0-.97.616-1.813 1.5-2.097L8.25 6.75l3.75-1.5 3.75 1.5 2.25 1.761zM10.5 10.5h3M10.5 13.5h3" />
            <h3 className="text-2xl font-semibold text-white">Легкий старт без бюрократии</h3>
          </div>
          <p className="text-zinc-300">
            Мы понимаем, что у вас много рутинных задач. Поэтому у нас правило – никаких нудных ТЗ и бесконечных емейлов. С нас – приятное дружеское интервью, где мы максимально вникнем в вашу задачу. С вас – час времени и готовность открыто рассказать о целях проекта.
          </p>
        </div>

        {/* Колонка 2: Уникальный дизайн */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Icon path="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.092c0-.537.436-.97.97-.97h.515c.245 0 .443-.198.443-.442V13.5a1.125 1.125 0 011.125-1.125h2.252c.577 0 1.042.465 1.042 1.042v3.282c0 .097-.059.185-.148.22l-2.443 1.162a.25.25 0 00-.076.365l3.513 4.925a.25.25 0 00.41-.161l.175-1.05a.25.25 0 00-.076-.288l-1.52-1.298a.25.25 0 01-.076-.288l.545-1.21a.25.25 0 01.385-.121l1.472 1.01a.25.25 0 00.364-.231l.243-1.458a.25.25 0 00-.364-.231l-1.472 1.01a.25.25 0 01-.385-.121l-.545-1.21a.25.25 0 01.076-.288l1.52-1.298a.25.25 0 00.076-.288l-.175-1.05a.25.25 0 00-.41-.161l-3.513 4.925a.25.25 0 00.076.365l2.443 1.162a.25.25 0 00.148.22z" />
            <h3 className="text-2xl font-semibold text-white">Дизайн с "магией"</h3>
          </div>
          <p className="text-zinc-300">
            Не любите шаблонный дизайн как у каждого второго? Круто, мы тоже. Поэтому никаких шаблонов и конструкторов: только свежий взгляд, комплексный подход и разработка проекта с нуля. И немного магии.
          </p>
        </div>
      </div>
    </>
);

// Контент для вкладки "Старт" (без изменений)
const StartContent = () => (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Начнем Работу над Вашим Проектом</h2>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto">Процесс начала работы с нами прост и прозрачен. Всего несколько шагов отделяют вас от проекта, который превзойдет ваши ожидания.</p>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 text-center">
          <div className="flex items-center gap-4"><span className="text-4xl font-bold text-cyan-400">1</span><p className="text-zinc-300">Обсуждение и <br/> Консультация</p></div>
          <div className="h-px w-16 bg-zinc-700 hidden md:block"></div>
          <div className="flex items-center gap-4"><span className="text-4xl font-bold text-amber-400">2</span><p className="text-zinc-300">Составление <br/> Предложения</p></div>
          <div className="h-px w-16 bg-zinc-700 hidden md:block"></div>
          <div className="flex items-center gap-4"><span className="text-4xl font-bold text-violet-400">3</span><p className="text-zinc-300">Заключение <br/> Договора</p></div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-16">
          <button className="bg-white text-zinc-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-zinc-200 transition-transform hover:scale-105">Связаться с нами</button>
          <button className="bg-white/10 text-zinc-200 font-bold py-4 px-10 rounded-full text-lg hover:bg-white/20 transition-transform hover:scale-105">Заполнить бриф</button>
      </div>
    </>
);


// --- Основной компонент карточки ---
const DashboardCard = () => {
  const [activeTab, setActiveTab] = useState('guarantees');
  const activeButtonClasses = "px-6 py-3 bg-white text-zinc-900 font-medium rounded-full transition-colors duration-200";
  const inactiveButtonClasses = "px-6 py-3 bg-white/10 text-zinc-200 rounded-full hover:bg-white/20 transition-colors duration-200";

  return (
    <div className="w-full h-auto min-h-[700px] bg-zinc-900/50 border border-zinc-800 rounded-3xl backdrop-blur-sm overflow-hidden">
      <div className="w-full flex flex-col p-4 md:p-8">
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <div className="w-24"><span className="font-deutsch text-2xl text-white">NSBH</span></div>
            <div className="flex-grow flex justify-center">
              <div className="flex items-center gap-4">
                <button className={activeTab === 'guarantees' ? activeButtonClasses : inactiveButtonClasses} onClick={() => setActiveTab('guarantees')}>Гарантии</button>
                <button className={activeTab === 'about' ? activeButtonClasses : inactiveButtonClasses} onClick={() => setActiveTab('about')}>О нас</button>
                <button className={activeTab === 'start' ? activeButtonClasses : inactiveButtonClasses} onClick={() => setActiveTab('start')}>Старт</button>
              </div>
            </div>
            <div className="w-24"></div>
          </div>
          <div className="w-full h-px bg-zinc-700 mt-6"></div>
        </div>
        <div className="w-full mt-12 text-left">
          {activeTab === 'guarantees' && <GuaranteesContent />}
          {activeTab === 'about' && <AboutContent />}
          {activeTab === 'start' && <StartContent />}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;