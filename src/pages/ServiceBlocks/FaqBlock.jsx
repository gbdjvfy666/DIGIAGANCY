// src/components/ServiceBlocks/FaqBlock.jsx

import React, { useState } from 'react';

// Иконка остается без изменений
const ChevronIcon = ({ isOpen }) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-[225deg] text-purple-600' : 'text-gray-500'}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);


const FaqBlock = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null); 

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  if (!data || !data.items) {
    return null;
  }

  return (
    // Внешняя секция по-прежнему отвечает за белый фон на всю ширину и вертикальные отступы
    <section className="bg-white text-black font-sans py-16 md:py-24">
      
      <div className="container max-w-8xl mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-12">
          {data.title || 'Частые вопросы'}
        </h2>
        <div className="border-t border-gray-200">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border-b border-gray-200 transition-colors duration-300 ${isOpen ? 'bg-purple-50/60' : ''}`}
              >
                <div 
                  className="flex justify-between items-start gap-4 cursor-pointer py-6"
                  onClick={() => handleItemClick(index)}
                >
                  <p className={`text-lg transition-colors duration-300 ${isOpen ? 'text-purple-800 font-semibold' : 'text-zinc-800'}`}>
                    {item.q}
                  </p>
                  <div className="flex-shrink-0 mt-1">
                    <ChevronIcon isOpen={isOpen} />
                  </div>
                </div>

                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-10">
                      <p className="text-gray-600 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default FaqBlock;