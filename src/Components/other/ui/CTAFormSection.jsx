import React, { useState } from 'react';
// global styles are imported in main.jsx, remove redundant import

const CTAFormSection = () => {
    const API_URL = 'http://localhost:4000/api/leads'; 

    const [formData, setFormData] = useState({
        name: '', city: '', budget: '', phone: '', isAgreed: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
        if (statusMessage) setStatusMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.isAgreed) {
            setStatusMessage('Пожалуйста, подтвердите согласие с условиями.');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage('Отправка...');
        
        const leadData = {
            name: formData.name, city: formData.city, budget: formData.budget,
            phone: formData.phone, source: 'Заявка с главной страницы' // [ИЗМЕНЕНИЕ]: Источник заявки
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData),
            });
            if (response.ok) {
                setStatusMessage('Спасибо! Ваша заявка успешно отправлена.');
                setFormData({ name: '', city: '', budget: '', phone: '', isAgreed: false });
                setTimeout(() => setStatusMessage(''), 5000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Не удалось отправить заявку.');
            }
        } catch (error) {
            setStatusMessage(`Произошла ошибка: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section 
            className="relative bg-black border-y border-zinc-800 py-24 sm:py-32 overflow-hidden" 
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(100, 100, 150, 0.1) 0%, rgba(30, 30, 50, 0.1) 30%, transparent 65%)' }}
        >
            <div className="relative z-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
                
                {/* [ИЗМЕНЕНИЕ]: Текст адаптирован под тематику авто */}
                <div>
                    <h2 className="text-4xl md:text-6xl font-damione font-extrabold tracking-wide text-white">
                        Получите персональное предложение
                    </h2>
                    <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                        Оставьте заявку, и наш менеджер свяжется с вами, чтобы бесплатно подобрать автомобиль и рассчитать итоговую стоимость «под ключ».
                    </p>
                    <ul className="space-y-4 mt-8">
                        <li className="flex items-center text-gray-300"><svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Бесплатный подбор и консультация</li>
                        <li className="flex items-center text-gray-300"><svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Расчет итоговой стоимости «под ключ»</li>
                        <li className="flex items-center text-gray-300"><svg className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Гарантия прозрачности сделки по договору</li>
                    </ul>
                </div>

                {/* Правая часть с формой */}
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-none">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                            <input type="text" name="name" placeholder="Ваше имя" required value={formData.name} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" />
                            <input type="text" name="city" placeholder="Город" required value={formData.city} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" />
                            <input type="text" name="budget" placeholder="Желаемый бюджет" required value={formData.budget} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" />
                            <input type="tel" name="phone" placeholder="+7 (999) 999-99-99" required value={formData.phone} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" />
                        </div>
                        <div className="flex items-center gap-3 my-4">
                            <input type="checkbox" id="agreement_home" name="isAgreed" checked={formData.isAgreed} onChange={handleChange} className="w-5 h-5 bg-zinc-700 border-zinc-600 accent-blue-500" />
                            <label htmlFor="agreement_home" className="text-xs text-zinc-400">Я согласен с <a href="/privacy" target="_blank" className="underline hover:text-white">Политикой обработки данных</a>.</label>
                        </div>
                        {statusMessage && (
                            <p className={`text-center text-sm mb-4 ${statusMessage.includes('ошибка') || statusMessage.includes('Пожалуйста') ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</p>
                        )}
                        <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black px-10 py-4 rounded-none font-bold text-lg hover:scale-105 transition-transform duration-300 disabled:bg-zinc-500 disabled:scale-100 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CTAFormSection;