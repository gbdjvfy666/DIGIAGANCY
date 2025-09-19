import React from 'react';

// Этот компонент рисует простой заголовок с текстом.
export default function TextBlock({ data }) {
    return (
        <section className="mb-20 md:mb-28 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">{data.title}</h2>
            <p className="text-lg text-zinc-300 leading-relaxed text-center">
                {data.content}
            </p>
        </section>
    );
}