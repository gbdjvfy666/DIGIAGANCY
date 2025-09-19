import React from 'react';

// Этот компонент рисует секцию "Вопрос-Ответ".
export default function FaqBlock({ data }) {
  return (
    <section className="mb-20 md:mb-28 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">{data.title}</h2>
      <div className="space-y-4">
        {data.items.map((item, index) => (
          <details key={index} className="bg-zinc-900 p-6 rounded-lg cursor-pointer group">
            <summary className="font-semibold text-lg list-none flex justify-between items-center">
              {item.q}
              <span className="text-purple-400 transform transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-zinc-300 border-t border-zinc-700 pt-4">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}