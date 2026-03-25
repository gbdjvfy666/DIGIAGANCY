import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

// Импорты твоих блоков
import HeroBlock from './ServiceBlocks/HeroBlock';
import FaqBlock from './ServiceBlocks/FaqBlock';
import TextBlock from './ServiceBlocks/TextBlock';
import WebsiteTypesGrid from './ServiceBlocks/WebsiteTypesGrid';
import PricingBlock from './ServiceBlocks/PricingBlock';
import ContactFormBlock from './ServiceBlocks/ContactFormBlock';

const blockComponents = {
  hero: HeroBlock,
  faq: FaqBlock,
  text: TextBlock,
  link: WebsiteTypesGrid,
  price: PricingBlock,
  contact: ContactFormBlock,
};

export default function ServicePage() {
  const { category, slug } = useParams();
  // Выбираем slug: если есть второй параметр — берем его, иначе берем категорию
  const activeId = slug || category;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!activeId) return;
      setLoading(true);
      
      try {
        const docRef = doc(db, 'services', activeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Данные из Firebase для", activeId, ":", data); // Смотри это в консоли F12!
          setService(data);
        } else {
          console.warn("Документ не найден в коллекции services:", activeId);
          setService(null);
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [activeId]);

  if (loading) return <div className="min-h-screen bg-black" />;

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Услуга {activeId} не найдена</h2>
        <Link to="/services" className="mt-4 text-purple-500 underline">Назад к услугам</Link>
      </div>
    );
  }

  // Проверяем наличие блоков. 
  // Если после миграции данные упали в под-объект (например, service.service.blocks), 
  // добавим проверку и на этот случай.
  const blocks = service.blocks || (service[activeId] && service[activeId].blocks);

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        {blocks && blocks.length > 0 ? (
          blocks.map((block, index) => {
            const Component = blockComponents[block.type];
            if (!Component) return null;

            // Передаем данные в компонент. 
            // ВАЖНО: Убедись, что твои блоки принимают пропс {data}
            return <Component key={`${activeId}-${index}`} data={block.data} currentSlug={activeId} />;
          })
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-500">В данной услуге еще нет добавленных блоков.</p>
            <p className="text-xs text-zinc-700 mt-2 italic">ID документа: {activeId}</p>
            {/* Технический вывод для тебя, чтобы понять что не так */}
            <pre className="text-[10px] text-left inline-block mt-10 p-4 bg-zinc-950 border border-zinc-900">
              {JSON.stringify(service, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}