import React from 'react';

// Этот компонент рисует галерею с картинками.
export default function ImageGalleryBlock({ data }) {
  return (
    <section className="mb-20 md:mb-28">
      <h2 className="text-4xl font-bold text-center mb-12">{data.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.images.map((image, index) => (
          <div key={index} className="bg-zinc-900 p-2 rounded-lg shadow-lg">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-auto object-cover rounded-md" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}