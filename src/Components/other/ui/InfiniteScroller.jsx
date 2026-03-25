import React from 'react';

/**
 * Компонент для создания бесконечной бегущей строки с текстом.
 * 
 * @param {object} props - Свойства компонента.
 * @param {string[]} props.items - Массив строк для отображения.
 * @param {'left' | 'right'} [props.direction='left'] - Направление движения.
 * @param {'outline' | 'filled'} [props.type='outline'] - Стиль тегов.
 * @returns {JSX.Element}
 */
const InfiniteScroller = ({ items, direction = 'left', type = 'outline' }) => {
  // Определяем классы для тегов в зависимости от типа (outline или filled)
  const typeClasses = type === 'filled'
    ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
    : 'border border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-white hover:border-zinc-700';

  return (
    // Этот div является контейнером, который скрывает все, что выходит за его пределы.
    // Атрибут data-direction используется в CSS для смены направления анимации.
    <div className="infinite-scroller w-full overflow-hidden" data-direction={direction}>
      
      {/* Этот div является внутренней дорожкой, которая и анимируется */}
      <div className="scroller-inner">
        
        {/* 
          Мы дублируем массив элементов, чтобы создать бесшовный переход,
          когда первая половина строки уходит за пределы экрана.
        */}
        {[...items, ...items].map((item, index) => (
          <div 
            key={index} 
            // ВАЖНО: Мы добавляем класс 'font-garet', чтобы применить нужный шрифт.
            // Этот класс должен быть определен в вашем глобальном index.css
            className={`tag font-garet font-medium ${typeClasses}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroller;