import React, { useState } from 'react';

/**
 * Блок с формой для заполнения краткого брифа (заявки).
 * Этот блок предназначен для размещения в конце страницы.
 */
const BriefForm = () => {
    // Состояние для полей формы
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь должна быть логика отправки данных на сервер (API, email и т.д.)
        console.log('Данные формы отправлены:', formData);
        alert('Спасибо за вашу заявку! Мы скоро свяжемся с вами.');
        
        // Сброс формы (опционально)
        setFormData({
            name: '',
            contact: '',
            message: ''
        });
    };

    return (
        // Используем класс 'brief-form-bg' для кастомного фона (определим в CSS)
        <div className="w-full py-16 md:py-24 bg-gray-900 text-white brief-form-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Заголовок и описание */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                        ОТПРАВЬТЕ КРАТКИЙ БРИФ
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Заполните всего три поля, и мы подготовим персональное предложение по вашему проекту.
                    </p>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Поле "Имя" */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Например, Алексей"
                            className="w-full p-4 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                        />
                    </div>
                    
                    {/* Поле "Контакты" */}
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-1">
                            Email или Телефон
                        </label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            placeholder="Для обратной связи"
                            className="w-full p-4 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                        />
                    </div>

                    {/* Поле "Сообщение/Описание" */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Краткое описание проекта (Необязательно)
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Опишите, что именно вы хотите получить"
                            className="w-full p-4 border border-gray-700 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                        />
                    </div>

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        className="w-full px-8 py-4 text-lg font-bold rounded-lg shadow-xl 
                                   bg-amber-500 hover:bg-amber-600 text-gray-900 
                                   transition duration-300 ease-in-out transform hover:scale-[1.01]"
                    >
                        ОТПРАВИТЬ ЗАЯВКУ
                    </button>
                </form>

            </div>
        </div>
    );
};

export default BriefForm;