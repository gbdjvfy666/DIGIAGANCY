import React, { useState } from 'react';

// --- 1. ИМПОРТЫ КОМПОНЕНТОВ ФОНА (ПРОВЕРЕННЫЕ ПУТИ) ---
import DarkVeil from '@/Components/other/background/DarkVeil.jsx';
import GlowingCard from '@/Components/other/background/GlowingCard.jsx';
import GradientBlinds from '@/Components/other/background/GradientBlinds.jsx';
import ParallaxBackground from '@/Components/other/background/ParallaxBackground.jsx';
import ParticleSphere from '@/Components/other/background/ParticleSphere.jsx';
import Silk from '@/Components/other/background/Silk.jsx';
import StarBackground from '@/Components/other/background/StarBackground.jsx';

// --- 2. ИМПОРТЫ АНИМИРОВАННЫХ БЛОКОВ ---
import CardSwap, { Card } from '../Components/Block/CardSwap.jsx';
import Carousel from '../Components/Block/Carousel.jsx';
import ParallaxCardSlider from '../Components/Block/ParallaxCardSlider.jsx';
import TiltedCard from '../Components/Block/TiltedCard.jsx';

// --- 3. НОВЫЕ ИМПОРТЫ: АНИМИРОВАННЫЙ ТЕКСТ ---
// Путь предполагается: '.. /Components/animatedtext/'
import BlurText from '../Components/other/animatedtext/BlurText.jsx';
import CircularText from '../Components/other/animatedtext/CircularText.jsx';
import CountUp from '../Components/other/animatedtext/Counter.jsx';
import RollingText from '../Components/other/animatedtext/RollingText.jsx';
import ScrollFloat from '../Components/other/animatedtext/ScrollFloat.jsx';
import ScrollVelocity, { velocity } from '../Components/other/animatedtext/ScrollVelocity.jsx';
import ShinyText from '../Components/other/animatedtext/ShinyText.jsx';
import SplitText from '../Components/other/animatedtext/SplitText.jsx';
import TextTrail from '../Components/other/animatedtext/TextTrail.jsx';
// --- КОНЕЦ НОВЫХ ИМПОРТОВ ---

// --- 4. ИМПОРТЫ ИКОНОК ---
import { 
    AydentikaIcon, BrendbukiIcon, BrendyngIcon, VebDizaynIcon, VideorolikiIcon, 
    DizaynIcon, KopiraytingIcon, LogotipyIcon, MarketingIcon, NeyrosetiIcon, 
    PoligraficheskiyDizaynIcon, PRIcon, PrezentatsiiIcon, ProdvizheniyeSaytovIcon, 
    ReklamaIcon, SEOIcon, SozdaniyeSaytovIcon 
} from '../Components/other/icons/Icons.jsx';

// --- 5. ДАННЫЕ ДЛЯ КОМПОНЕНТОВ ---

// Иконки
const serviceIcons = [
    { name: 'Айдентика', Component: AydentikaIcon },
    { name: 'Брендбуки', Component: BrendbukiIcon },
    { name: 'Брендинг', Component: BrendyngIcon },
    { name: 'Веб-Дизайн', Component: VebDizaynIcon },
    { name: 'Видеоролики', Component: VideorolikiIcon },
    { name: 'Дизайн', Component: DizaynIcon },
    { name: 'Копирайтинг', Component: KopiraytingIcon },
    { name: 'Логотипы', Component: LogotipyIcon },
    { name: 'Маркетинг', Component: MarketingIcon },
    { name: 'Нейросети', Component: NeyrosetiIcon },
    { name: 'Полиграф. Дизайн', Component: PoligraficheskiyDizaynIcon },
    { name: 'PR', Component: PRIcon },
    { name: 'Презентации', Component: PrezentatsiiIcon },
    { name: 'Продв. Сайтов', Component: ProdvizheniyeSaytovIcon },
    { name: 'Реклама', Component: ReklamaIcon },
    { name: 'SEO', Component: SEOIcon },
    { name: 'Создание Сайтов', Component: SozdaniyeSaytovIcon },
];

// Фоны (для демонстрации)
const backgroundComponents = [
    { name: 'Dark Veil', Component: DarkVeil, description: 'Полупрозрачная затемняющая вуаль.' },
    { name: 'Glowing Card', Component: GlowingCard, description: 'Карточка с эффектом свечения по контуру.' },
    { name: 'Gradient Blinds', Component: GradientBlinds, description: 'Анимированные градиентные полосы.' },
    { name: 'Parallax Background', Component: ParallaxBackground, description: 'Фон с эффектом параллакса.' },
    { name: 'Particle Sphere', Component: ParticleSphere, description: 'Анимированная сфера из частиц (может требовать React Three Fiber).' },
    { name: 'Silk', Component: Silk, description: 'Эффект струящегося шелка.' },
    { name: 'Star Background', Component: StarBackground, description: 'Анимированное звездное поле.' },
];

const sampleText = 'Съешь же ещё этих мягких французских булок, да выпей чаю. 12345';

// Шрифты (оставлены без изменений)
const googleFonts = [
  { name: 'Inter', className: 'font-sans' },
  { name: 'Anton', className: 'font-anton' },
  { name: 'Bebas Neue', className: 'font-bebas' },
  { name: 'Dela Gothic One', className: 'font-dela' },
  { name: 'Fredoka One', className: 'font-fredoka' },
  { name: 'Oswald', className: 'font-oswald' },
  { name: 'Poppins', className: 'font-poppins' },
  { name: 'Rubik Mono One', className: 'font-rubik' },
  { name: 'Tektur', className: 'font-tektur' },
  { name: 'Unbounded', className: 'font-unbounded' },
  { name: 'Noto Sans SC', className: 'font-noto' },
];

const localFonts = [
  { 
    name: 'Aradora Pro', 
    className: 'font-aradora font-light',
    variations: [
      { name: 'Light (300)', className: 'font-aradora font-light' },
      { name: 'Light Italic (300)', className: 'font-aradora font-light italic' }
    ]
  },
  { 
    name: 'Bounded', 
    className: 'font-bounded',
    variations: [
      { name: 'ExtraLight (200)', className: 'font-bounded font-extralight' },
      { name: 'Regular (400)', className: 'font-bounded font-normal' },
      { name: 'Black (900)', className: 'font-bounded font-black' }
    ]
  },
  { 
    name: 'Bubbler Graffiti', 
    className: 'font-bubbler',
    variations: [
      { name: 'Regular', className: 'font-bubbler font-normal' },
      { name: 'Italic', className: 'font-bubbler font-normal italic' }
    ]
  },
  { 
    name: 'Coves', 
    className: 'font-coves font-light', 
    variations: [
      { name: 'Light (300)', className: 'font-coves font-light' },
      { name: 'Bold (700)', className: 'font-coves font-bold' }
    ]
  },
  { name: 'Damn', className: 'font-damn' },
  { name: 'DaMiOne', className: 'font-damione' },
  { name: 'Deutsch Gothic', className: 'font-deutsch' },
  { name: 'Doloman Pavklenko', className: 'font-doloman' },
  { name: 'Frankinity', className: 'font-frankinity' },
  { 
    name: 'Garet', 
    className: 'font-garet',
    variations: [
      { name: 'Book (400)', className: 'font-garet font-normal' },
      { name: 'Heavy (800)', className: 'font-garet font-extrabold' }
    ]
  },
  { name: 'Gerhaus', className: 'font-gerhaus' },
  { 
    name: 'Helvetica Now Text', 
    className: 'font-helvetica-now font-bold',
    variations: [
      { name: 'Bold', className: 'font-helvetica-now font-bold' },
      { name: 'Bold Italic', className: 'font-helvetica-now font-bold italic' },
      { name: 'Black (900)', className: 'font-helvetica-now font-black' },
      { name: 'Black Italic (900)', className: 'font-helvetica-now font-black italic' }
    ]
  },
  { name: 'IndiKazka', className: 'font-indikazka' },
  { name: 'Jost', className: 'font-jost' },
  { name: 'Kankin', className: 'font-kankin' },
  { name: 'Lena', className: 'font-lena' },
  { name: 'Maler', className: 'font-maler' },
  { 
    name: 'MullerNextWide', 
    className: 'font-muller',
    variations: [
      { name: 'Thin (100)', className: 'font-muller font-thin' },
      { name: 'Thin Italic (100)', className: 'font-muller font-thin italic' },
      { name: 'Regular (400)', className: 'font-muller font-normal' },
      { name: 'Regular Italic (400)', className: 'font-muller font-normal italic' },
      { name: 'Heavy (800)', className: 'font-muller font-extrabold' },
      { name: 'Heavy Italic (800)', className: 'font-muller font-extrabold italic' },
      { name: 'ExtraBold (900)', className: 'font-muller font-black' },
      { name: 'ExtraBold Italic (900)', className: 'font-muller font-black italic' },
    ]
  },
  { name: 'Nauryzredkeds', className: 'font-nauryz' },
  { name: 'Neopixel', className: 'font-neopixel' },
  { name: 'Orpheus', className: 'font-orpheus' },
  { 
    name: 'Playfair Display', 
    className: 'font-playfair',
    variations: [
        { name: 'Regular (400)', className: 'font-playfair font-normal' },
        { name: 'Bold (700)', className: 'font-playfair font-bold' },
        { name: 'Black (900)', className: 'font-playfair font-black' },
        { name: 'Regular Italic', className: 'font-playfair font-normal italic' },
        { name: 'Bold Italic', className: 'font-playfair font-bold italic' },
    ]
  },
  { name: 'PPNeueMachina', className: 'font-ppneue' },
  { name: 'Receipt', className: 'font-receipt' },
  { name: 'Saytag', className: 'font-saytag' },
  { name: 'SK Coisa', className: 'font-sk-coisa' },
  { name: 'Soledago', className: 'font-soledago' },
  { name: 'Sorcerer', className: 'font-sorcerer' },
  { name: 'Zvezda NHZDN', className: 'font-zvezda font-bold italic' },
];


// --- Компонент для секции Шрифтов ---
const FontSection = ({ title, fonts, expandedFonts, onToggleFont }) => {
    return (
        <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-400 border-b-2 border-gray-700 pb-3 mb-8">
                {title}
            </h2>
            <div className="space-y-10">
                {fonts.map(font => {
                    const isExpanded = expandedFonts[font.name];
                    if (font.variations) {
                        return (
                            <div key={font.name}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 font-mono text-sm">
                                            {font.name} <span className="text-gray-600">(класс: .{font.className.split(' ')[0]})</span>
                                        </p>
                                        <p className={`${font.className} text-4xl mt-1`}>
                                            {sampleText}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onToggleFont(font.name)}
                                        className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex-shrink-0 px-3 py-1 text-sm border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                                    >
                                        {isExpanded ? 'Скрыть варианты ▲' : 'Показать варианты ▼'}
                                    </button>
                                </div>
                                
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] mt-6' : 'max-h-0'}`}>
                                    <div className="pl-6 border-l-2 border-gray-800 space-y-6">
                                        {font.variations.map(variation => (
                                            <div key={variation.name}>
                                                <p className="text-gray-500 font-mono text-sm">
                                                    {variation.name} <span className="text-gray-600">(классы: .{variation.className.split(' ').join(' .')})</span>
                                                </p>
                                                <p className={`${variation.className} text-3xl mt-1`}>
                                                    {sampleText}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={font.name}>
                            <p className="text-gray-500 font-mono text-sm">
                                {font.name} <span className="text-gray-600">(класс: .{font.className})</span>
                            </p>
                            <p className={`${font.className} text-4xl mt-1`}>
                                {sampleText}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// --- КОМПОНЕНТ ДЛЯ СЕКЦИИ ФОНОВ (ИСПРАВЛЕНО для видимости) ---
const BackgroundSection = ({ backgrounds }) => (
    <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-400 border-b-2 border-gray-700 pb-3 mb-8">
            Фоновые Компоненты (Backgrounds)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backgrounds.map(bg => (
                <div 
                    key={bg.name} 
                    // Убираем явный черный фон, добавляем границу для выделения карточки
                    className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.01] border border-gray-800"
                    // Явно указываем, что фон контейнера прозрачен
                    style={{ height: '300px', backgroundColor: 'transparent' }} 
                >
                    {/* Компонент фона занимает всю карточку. Z-index 0 */}
                    <div className="absolute inset-0 z-0">
                        <bg.Component /> 
                    </div>

                    {/* Наложение для текста. Z-index 10.
                        Используем градиент снизу вверх, чтобы текст был читаемым, 
                        но сам фон оставался виден. */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 
                        bg-gradient-to-t from-black/80 to-transparent 
                        transition-opacity duration-300">
                        <h3 className="text-2xl font-bold text-white">{bg.name}</h3>
                        <p className="text-gray-300 text-sm mt-1">{bg.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

// --- КОМПОНЕНТ ДЛЯ СЕКЦИИ АНИМИРОВАННОГО ТЕКСТА ---
const AnimatedTextSection = () => (
    <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-400 border-b-2 border-gray-700 pb-3 mb-8">
            Анимированный Текст
        </h2>

        <div className="space-y-12">
            
            <div className="p-4 border border-gray-800 rounded-lg">
                <p className="text-gray-500 mb-2">BlurText.jsx (Fade In)</p>
                <h3 className="text-4xl font-bold text-center">
                    <BlurText text="Наш дизайн меняет взгляд на обыденность" />
                </h3>
            </div>
            
            <div className="p-4 border border-gray-800 rounded-lg flex justify-center items-center h-48">
                <p className="text-gray-500 absolute top-0 left-0 p-4">CircularText.jsx</p>
                <CircularText text="РАЗРАБОТКА ● ДИЗАЙН ● МАРКЕТИНГ ● " size={200} />
            </div>

            <div className="p-4 border border-gray-800 rounded-lg">
                <p className="text-gray-500 mb-2">Counter.jsx (Dynamic Number)</p>
                <h3 className="text-6xl font-extrabold text-center font-muller">
                    <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                </h3>
            </div>

            <div className="p-4 border border-gray-800 rounded-lg">
                <p className="text-gray-500 mb-2">RollingText.jsx (Word Roll)</p>
                <h3 className="text-5xl font-bold text-center">
                    Проектируем <RollingText words={['Будущее', 'Бренды', 'Интерфейсы']} /> с нами.
                </h3>
            </div>

            <div className="p-4 border border-gray-800 rounded-lg h-32 flex items-center">
                <p className="text-gray-500 absolute top-0 left-0 p-4">ScrollFloat.jsx (Requires Scroll)</p>
                <h3 className="text-4xl font-semibold w-full text-center">
                    <ScrollFloat
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=50%'
                scrollEnd='bottom bottom-=40%'
                stagger={0.03}
              >
                React Bits
              </ScrollFloat>
                </h3>
            </div>
            
            {/* Для ScrollVelocity часто нужен контейнер с большой высотой, здесь просто заглушка */}
            <div className="p-4 border border-gray-800 rounded-lg h-32 flex items-center">
                <p className="text-gray-500 absolute top-0 left-0 p-4">ScrollVelocity.jsx (Horizontal Parallax on Scroll)</p>
                <h3 className="text-4xl font-bold w-full text-center text-gray-600">
                    <ScrollVelocity
                    texts={['React Bits', 'Scroll Down']} 
                    velocity={velocity} 
                    className="custom-scroll-text"
                  />
                </h3>
            </div>

            <div className="p-4 border border-gray-800 rounded-lg">
                <p className="text-gray-500 mb-2">ShinyText.jsx (Mouse-Interactive)</p>
                <h3 className="text-5xl font-extrabold text-center">
                    <ShinyText text="Мерцающий Градиент" />
                </h3>
            </div>

            <div className="p-4 border border-gray-800 rounded-lg">
                <p className="text-gray-500 mb-2">SplitText.jsx (Letter/Word Animation)</p>
                <h3 className="text-5xl font-bold text-center">
                    <SplitText text="Каждое слово имеет значение" />
                </h3>
            </div>


        <div className="p-4 border border-gray-800 rounded-lg">
            <p className="text-gray-500 mb-2">TextTrail.jsx (Typed Effect)</p>
            {/* 
              Задаем контейнеру явную высоту. 
              Например, 150px. Вы можете выбрать любую подходящую высоту.
            */}
            <div style={{ height: '150px' }} className="text-center">
                <TextTrail text="Мы создаем веб-шедевры." />
            </div>
        </div>
            
        </div>
    </section>
);


// --- Основной компонент страницы Test ---
export default function Test() {
  const [expandedFonts, setExpandedFonts] = useState({});

  const handleToggleFont = (fontName) => {
    setExpandedFonts(prev => ({
      ...prev,
      [fontName]: !prev[fontName]
    }));
  };

  return (
    <div className="bg-black text-white p-8 md:p-16 w-full min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-bold">Каталог Тестов</h1>
        <p className="text-gray-400 mt-2">Демонстрация всех компонентов, ассетов и стилей</p>
      </header>

      <main>
        {/* --- СЕКЦИЯ АНИМИРОВАННЫХ БЛОКОВ --- */}
        <h2 className="text-4xl font-bold text-gray-400 border-b-2 border-gray-700 pb-3 mb-8">
            Анимированные Блоки
        </h2>
        {/* CardSwap */}
        <div style={{ height: '600px', position: 'relative' }} className="mb-16">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card><h3>Card 1</h3><p>Your content here</p></Card>
            <Card><h3>Card 2</h3><p>Your content here</p></Card>
            <Card><h3>Card 3</h3><p>Your content here</p></Card>
          </CardSwap>
        </div> 
        
        {/* Carousel */}
        <div style={{ height: '600px', position: 'relative' }} className="mb-16">
          <Carousel
            baseWidth={300}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div> 
        
        {/* ParallaxCardSlider */}
        <div className="mb-16">
            <ParallaxCardSlider />
        </div>

        {/* TiltedCard */}
        <div className="mb-16">
            <TiltedCard
              imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">
                  Kendrick Lamar - GNX
                </p>
              }
            /> 
        </div>
        
        {/* --- НОВАЯ СЕКЦИЯ: АНИМИРОВАННЫЙ ТЕКСТ --- */}
        <AnimatedTextSection />
        {/* ------------------------------------------- */}


        {/* --- СЕКЦИЯ ФОНОВ (С ИСПРАВЛЕНИЯМИ) --- */}
        <BackgroundSection backgrounds={backgroundComponents} />
        
        {/* --- СЕКЦИЯ ИКОНОК --- */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-400 border-b-2 border-gray-700 pb-3 mb-8">
            Иконки услуг (Gradient Icons)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {serviceIcons.map(item => (
              <div 
                key={item.name} 
                className="flex flex-col items-center p-4 bg-gray-900 rounded-lg"
              >
                <item.Component className="w-16 h-16" />
                <p className="mt-3 text-sm text-center text-gray-300">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- СЕКЦИЯ ШРИФТОВ --- */}
        <FontSection 
            title="Шрифты из Google Fonts" 
            fonts={googleFonts}
            expandedFonts={expandedFonts}
            onToggleFont={handleToggleFont}
        />
        <FontSection
            title="Локальные и Кастомные Шрифты"
            fonts={localFonts}
            expandedFonts={expandedFonts}
            onToggleFont={handleToggleFont}
        />
      </main>
    </div>
  );
}