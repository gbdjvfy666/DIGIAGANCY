import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BriefForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'leads'), {
                ...formData,
                createdAt: serverTimestamp()
            });
            setSent(true);
            setFormData({ name: '', contact: '', message: '' });
        } catch (err) {
            console.error('Ошибка отправки заявки:', err);
            alert('Ошибка при отправке. Попробуйте ещё раз.');
        } finally {
            setLoading(false);
        }
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

                    {sent ? (
                        <div className="w-full px-8 py-4 text-lg font-bold rounded-lg text-center bg-green-500/10 border border-green-500/30 text-green-400">
                            Заявка отправлена! Скоро свяжемся с вами.
                        </div>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-8 py-4 text-lg font-bold rounded-lg shadow-xl
                                       bg-amber-500 hover:bg-amber-600 text-gray-900
                                       transition duration-300 ease-in-out transform hover:scale-[1.01] disabled:opacity-50"
                        >
                            {loading ? 'Отправка...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
                        </button>
                    )}
                </form>

            </div>
        </div>
    );
};

export default BriefForm;