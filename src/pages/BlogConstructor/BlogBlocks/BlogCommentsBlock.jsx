import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Компонент Формы (без изменений) ---
const CommentForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit({ name, email, commentText });
            setName(''); setEmail(''); setCommentText('');
            setIsSubmitting(false);
        }, 1500);
    };

    const isButtonDisabled = !name || !email || !commentText || !isChecked || isSubmitting;

    return (
        <aside className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-none lg:sticky lg:top-8">
            <h3 className="text-3xl font-bold mb-6 text-white">Оставить комментарий</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="sr-only">Имя</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Ваше имя*" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" 
                    />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Почта</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Ваша почта*" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none" 
                    />
                </div>
                <div>
                    <label htmlFor="commentText" className="sr-only">Текст комментария</label>
                    <textarea 
                        name="commentText" 
                        id="commentText" 
                        rows={5} 
                        placeholder="Текст комментария*"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition rounded-none"
                    ></textarea>
                </div>
                
                <div className="flex items-start">
                    <input
                        type="checkbox"
                        id="comments-checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        required
                        className="h-5 w-5 mt-0.5 rounded-sm border-zinc-600 bg-zinc-700 text-green-500 focus:ring-white focus:ring-offset-zinc-900 cursor-pointer"
                    />
                    <label htmlFor="comments-checkbox" className="ml-3 text-sm text-zinc-400">
                        Согласен с <Link to="/politika" className="underline hover:text-white transition-colors">условием политики конфиденциальности</Link>
                    </label>
                </div>

                <div>
                    <button 
                        type="submit" 
                        className="w-full bg-white text-black px-10 py-4 rounded-none font-bold text-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        disabled={isButtonDisabled}
                    >
                        {isSubmitting ? "Отправка..." : "Отправить"}
                    </button>
                </div>
            </form>
        </aside>
    );
};

// --- Компоненты списка комментариев (без изменений) ---
const CommentItem = ({ comment }) => (
    <div className="py-6 border-b border-zinc-800 last:border-b-0">
        <div className="flex items-baseline space-x-3">
            <p className="font-semibold text-white">{comment.author}</p>
            <p className="text-xs text-zinc-500">{comment.date}</p>
        </div>
        <p className="text-zinc-400 mt-2">{comment.text}</p>
    </div>
);

const CommentList = ({ comments }) => (
    <div>
        {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
);

// --- Основной компонент с новой структурой ---
export default function BlogCommentsBlock() {
    // ИЗМЕНЕНИЕ: Начальное состояние - пустой массив
    const [comments, setComments] = useState([]);

    const handleNewComment = (newComment) => {
        const commentToAdd = {
            id: Date.now(), // Используем timestamp для уникального ключа
            author: newComment.name,
            date: 'Только что',
            text: newComment.commentText,
        };
        // Добавляем новый комментарий в начало списка
        setComments(prev => [commentToAdd, ...prev]);
    };

    return (
        <section 
            className="relative bg-black border-y border-zinc-800 py-24 sm:py-32 overflow-hidden" 
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 112, 115, 0.3) 0%, rgba(0, 31, 84, 0.15) 30%, transparent 65%)' }}
        >
            <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-5 gap-16 items-start">
                
                {/* ИЗМЕНЕНИЕ: Левая колонка - Форма */}
                <div className="lg:col-span-2">
                    <CommentForm onSubmit={handleNewComment} />
                </div>
                
                {/* ИЗМЕНЕНИЕ: Правая колонка - Комментарии */}
                <div className="lg:col-span-3 min-h-full">
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Комментарии <span className="text-zinc-500">({comments.length})</span>
                    </h3>
                    
                    {comments.length > 0 ? (
                        <div className="bg-zinc-900/30 border border-zinc-800 p-2 sm:p-4">
                           <CommentList comments={comments} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center h-full min-h-[300px] bg-zinc-900/30 border border-zinc-800 p-8">
                            <div>
                                <h4 className="text-xl font-bold text-white">Здесь пока тихо</h4>
                                <p className="text-zinc-500 mt-2">
                                    Оставьте комментарий в форме слева, <br/> и он появится здесь.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}