import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Иконка логотипа встроена прямо в компонент ---
const VeLogoIcon = () => {
    return (
        <svg className="w-full h-auto max-w-sm mx-auto" viewBox="0 0 521 332" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ve-logo-gradient-comments" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E9A8FF" />
                    <stop offset="100%" stopColor="#A8C4FF" />
                </linearGradient>
            </defs>
            <path d="M0 0V6.10491C21.1936 6.10491 47.0973 13.1984 88.996 111.282L90.9494 116.146C91.6269 117.813 93.5645 118.565 95.1872 117.776C96.6469 117.066 97.3138 115.341 96.7099 113.832L95.1188 109.878C88.0613 92.4308 71.1002 6.10491 137.994 6.10491V0H0Z" fill="url(#ve-logo-gradient-comments)" />
            <path d="M511.782 234.384C501.889 328.708 371.903 325.884 371.903 325.884H359.573C357.888 325.884 356.522 327.262 356.522 328.94C356.522 330.633 357.888 332 359.573 332H517.905V234.384H511.782Z" fill="url(#ve-logo-gradient-comments)" />
            <path d="M356.544 0H203.001V6.10491C238.771 6.10491 216.654 60.8335 216.654 60.8335L205.022 88.2926L203.657 91.5158L144.11 232.023L144.089 231.955L140.796 239.696L178.021 332H188.876C309.441 54.2238 315.543 44.3119 315.543 44.3119C331.559 6.58342 343.809 6.58342 356.538 6.10491H371.919C371.919 6.10491 500.021 6.58341 505.665 93.3563H511.799V0H356.544Z" fill="url(#ve-logo-gradient-comments)" />
            <path d="M448.677 108.947C443.5 162.203 382.729 161.257 382.729 161.257H375.597C373.24 161.325 371.896 161.257 371.896 161.257H359.592C357.912 161.257 356.499 162.676 356.499 164.354C356.499 166.037 357.912 167.393 359.592 167.393H375.597H382.729C382.729 167.393 443.5 166.909 448.677 219.76H454.795V108.947H448.677Z" fill="url(#ve-logo-gradient-comments)" />
        </svg>
    );
};


export default function BlogCommentsBlock({ data }) {
    // В будущем, 'data' будет содержать массив комментариев
    const { comments = [] } = data || {}; 
    
    // Состояния для полей формы
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isChecked, setIsChecked] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isChecked) {
            alert("Пожалуйста, согласитесь с политикой конфиденциальности.");
            return;
        }
        // Здесь будет логика отправки данных на сервер
        console.log({ name, email, commentText });
        alert("Комментарий отправлен (в консоль)!");
        // Очистка формы
        setName('');
        setEmail('');
        setCommentText('');
    };

    return (
        <section className="bg-white text-black py-16">
            <div className="container max-w-8xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

                    {/* Левая колонка: Форма комментария */}
                    <aside className="lg:col-span-1 bg-zinc-100 text-black p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-6">Оставьте комментарий</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Имя*" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                                className="w-full p-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input 
                                type="email" 
                                placeholder="Почта*" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <textarea 
                                placeholder="Текст комментария*" 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                                rows="5"
                                className="w-full p-4 bg-white border border-zinc-200 rounded-2xl resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                            ></textarea>
                            
                            <button 
                                type="submit"
                                className="w-full text-white font-bold py-4 px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity disabled:opacity-50"
                                disabled={!name || !email || !commentText || !isChecked}
                            >
                                Отправить
                            </button>
                            
                            <div className="flex items-start pt-2">
                                <input 
                                    type="checkbox" 
                                    id="comments-checkbox" 
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    required
                                    className="h-5 w-5 mt-1 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="comments-checkbox" className="ml-3 text-sm text-zinc-600">
                                    Согласен с <Link to="/politika" className="underline hover:text-black">условием политики конфиденциальности</Link>
                                </label>
                            </div>
                        </form>
                    </aside>

                    {/* Правая колонка: Список комментариев или заглушка */}
                    <div className="lg:col-span-2">
                        {comments.length === 0 ? (
                            // Заглушка, если комментариев нет
                            <div className="text-center py-16">
                                <p className="text-2xl text-zinc-500 mb-12">
                                    Здесь пока нет комментариев. <br />
                                    Вы можете стать первым.
                                </p>
                                <VeLogoIcon />
                            </div>
                        ) : (
                            // Здесь будет рендеринг списка комментариев
                            <div className="space-y-8">
                                {comments.map((comment, index) => (
                                    <div key={index} className="bg-zinc-100 p-6 rounded-lg">
                                        <p className="font-bold">{comment.author}</p>
                                        <p className="text-zinc-500 text-sm mb-2">{comment.date}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}