import React from 'react';
import '../index.css'; // Убедитесь, что ваши основные стили подключены

// --- ДАННЫЕ ДЛЯ ОТЗЫВОВ ---
// Вы можете легко заменить эти данные на свои.
const reviewsData = [
    {
        id: 1,
        name: 'Александр Волков',
        company: 'Quantum Leap Logistics',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop',
        rating: 5,
        text: 'Команда NSBH превзошла все ожидания. Их подход к разработке B2B-платформы был не просто техническим, а глубоко стратегическим. В результате мы получили продукт, который не только решил нашу задачу по оптимизации маршрутов, но и открыл новые возможности для бизнеса. Профессионализм на каждом этапе!'
    },
    {
        id: 2,
        name: 'Елена Миронова',
        company: 'AURA Cosmetics',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop',
        rating: 5,
        text: 'Запуск нашей новой линейки косметики был бы невозможен без гениальной таргетинговой кампании от NSBH. Они не просто "настроили рекламу", а создали настоящую историю вокруг нашего бренда, которая нашла отклик у аудитории. Результаты говорят сами за себя: ROMI 412% — это космос!'
    },
    {
        id: 3,
        name: 'Игорь Федоров',
        company: 'Metropolis Bank',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
        rating: 5,
        text: 'Ребрендинг — это всегда риск. Но с NSBH мы чувствовали себя уверенно. Они создали не просто красивый логотип, а цельную и гибкую дизайн-систему, которая вдохнула новую жизнь в наш бренд и значительно ускорила работу наших команд разработки. Это партнерство, которое мы ценим.'
    },
    {
        id: 4,
        name: 'Мария Соколова',
        company: 'Artisan Verse',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop',
        rating: 5,
        text: 'Создание NFT-маркетплейса — сложная задача, требующая экспертизы и в блокчейне, и в UX. Команда NSBH справилась блестяще. Платформа работает стабильно, интуитивно понятна для художников и коллекционеров. Мы рады, что выбрали именно их для реализации нашей идеи.'
    },
];

// --- Вспомогательный компонент для отображения звезд ---
const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ${index < rating ? 'text-blue-500' : 'text-zinc-700'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.39c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
            ))}
        </div>
    );
};


// --- Главный компонент страницы "Отзывы" ---
export default function Reviews() {
    return (
        <div className="min-h-screen bg-black text-white font-garet">
            {/* --- Заголовок страницы --- */}
            <header className="py-24 md:py-32 px-8 text-center border-b-2 border-zinc-800">
                <h1 className="font-deutsch text-6xl md:text-9xl uppercase tracking-wider">Отзывы</h1>
                <p className="text-xl md:text-2xl text-gray-500 mt-4 max-w-3xl mx-auto font-garet">
                    Доверие наших клиентов — главный показатель качества нашей работы.
                </p>
            </header>

            {/* --- Сетка с карточками отзывов --- */}
            <main className="max-w-7xl mx-auto p-8 md:p-12">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {reviewsData.map((review) => (
                        <div 
                            key={review.id} 
                            className="break-inside-avoid p-6 bg-zinc-900 rounded-2xl border border-zinc-800 group
                                       hover:border-blue-500/50 transition-all duration-300
                                       hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                        >
                            <div className="flex items-center mb-4">
                                <img 
                                    src={review.avatarUrl} 
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-zinc-700"
                                />
                                <div>
                                    <p className="font-bold text-lg text-white">{review.name}</p>
                                    <p className="text-sm text-zinc-400">{review.company}</p>
                                </div>
                            </div>
                            <p className="text-zinc-300 leading-relaxed mb-4">
                                "{review.text}"
                            </p>
                            <StarRating rating={review.rating} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}