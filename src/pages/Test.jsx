import React, { useState } from 'react';
import CardSwap, { Card } from '../Components/animatedblock/CardSwap.jsx';
import Carousel from '../Components/animatedblock/Carousel.jsx';
import ParallaxCardSlider from '../Components/animatedblock/ParallaxCardSlider.jsx';
import ShaderCard from '../Components/animatedblock/ShaderCard.jsx';
import ThreeCubeAnimation from '../Components/animatedblock/ThreeCubeAnimation.jsx';
import TiltedCard from '../Components/animatedblock/TiltedCard.jsx';

// Фраза-панграмма, идеально подходит для демонстрации шрифтов.
const sampleText = 'Съешь же ещё этих мягких французских булок, да выпей чаю. 12345';

// --- Шрифты из Google Fonts (без изменений) ---
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

// --- Локальные и кастомные шрифты ---
// ОБНОВЛЕНО: Добавлены `variations` для всех семейств, где их больше одного.
const localFonts = [
  { 
    name: 'Aradora Pro', 
    className: 'font-aradora font-light', // Показываем Light по умолчанию
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
    className: 'font-coves font-light', // Показываем Light по умолчанию
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
  { name: 'Zvezda NHZDN', className: 'font-zvezda font-bold italic' }, // У этого шрифта только один стиль в CSS
];


// --- Компонент для секции ---
const FontSection = ({ title, fonts, expandedFonts, onToggleFont }) => {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold text-gray-400 border-b-2 border-gray-700 pb-3 mb-8">
        {title}
      </h2>
      <div className="space-y-10">
        {fonts.map(font => {
          const isExpanded = expandedFonts[font.name];

          // Если у шрифта есть вариации, делаем его интерактивным
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
                
                {/* Выпадающий блок с вариациями */}
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
          
          // Рендерим обычный шрифт
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


// --- Основной компонент страницы ---
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
        <h1 className="text-6xl font-bold">Каталог Шрифтов</h1>
        <p className="text-gray-400 mt-2">Демонстрация всех подключенных шрифтов</p>

      </header>
      <div style={{ height: '600px', position: 'relative' }}>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={5000}
    pauseOnHover={false}
  >
    <Card>
      <h3>Card 1</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 2</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 3</h3>
      <p>Your content here</p>
    </Card>
  </CardSwap>
</div> 
<div style={{ height: '600px', position: 'relative' }}>
  <Carousel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div> 
<ParallaxCardSlider />
<ShaderCard/>
<ThreeCubeAnimation/>
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

      <main>
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