import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function AdminSubCategoryList() {
    const { categoryId } = useParams(); 
    const [subItems, setSubItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Запрос к документу:", categoryId);
        
        const unsubscribe = onSnapshot(doc(db, 'services', categoryId), (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                console.log("Данные из Firebase:", data);

                // Превращаем объект в массив карточек
                const list = Object.keys(data).map(key => {
                    const item = data[key];
                    // Проверяем, является ли это объектом услуги (обычно там есть blocks или title)
                    if (typeof item === 'object' && item !== null) {
                        return {
                            id: key,
                            title: item.title || item.blocks?.[0]?.data?.title || key
                        };
                    }
                    return null;
                }).filter(Boolean);

                console.log("Обработанный список:", list);
                setSubItems(list);
            } else {
                console.error("Документ не найден в коллекции services!");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [categoryId]);

    if (loading) return <div style={{padding: '40px', color: '#fff'}}>Загрузка данных {categoryId}...</div>;

    return (
      <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px'}}>
              <button onClick={() => navigate('/admin/services')} style={{color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer'}}>← Назад</button>
              <h1 style={{fontSize: '24px', margin: 0}}>Категория: {categoryId}</h1>
          </div>

          {subItems.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {subItems.map(item => (
                      <div 
                          key={item.id} 
                          onClick={() => navigate(`/admin/services/edit/${categoryId}/${item.id}`)}
                          style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '25px', borderRadius: '15px', cursor: 'pointer', transition: '0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6366f1'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
                      >
                          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: '#444', marginTop: '10px', fontFamily: 'monospace' }}>ID: {item.id}</div>
                      </div>
                  ))}
              </div>
          ) : (
              <div style={{border: '1px dashed #222', padding: '50px', textAlign: 'center', borderRadius: '20px'}}>
                  <p style={{color: '#666'}}>В документе "{categoryId}" не найдено вложенных услуг.</p>
                  <p style={{fontSize: '12px', color: '#333'}}>Убедитесь, что внутри документа есть объекты (например, "blog")</p>
              </div>
          )}
      </div>
    );
}