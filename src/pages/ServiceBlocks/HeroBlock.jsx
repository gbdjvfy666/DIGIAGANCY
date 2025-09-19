import React from 'react';

// Этот компонент отвечает за отрисовку "главного экрана" страницы.
// Он получает все свои данные (title, description и т.д.) из объекта 'data'.
export default function HeroBlock({ data }) {
  return (
    <section className="text-left mb-20 md:mb-28">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        {data.title}
      </h1>
      <p className="text-xl text-zinc-300 max-w-3xl mb-8">
        {data.description}
      </p>
      {data.price && (
        <div className="text-3xl font-bold text-white mb-12">
          Стоимость: {data.price}
        </div>
      )}
      {data.buttonText && (
        <button className="px-8 py-4 bg-purple-600 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors">
          {data.buttonText}
        </button>
      )}
    </section>
  );
}