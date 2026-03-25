import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminServicesList() {
    const navigate = useNavigate();

    const mainCategories = [
        { id: 'websites', title: 'Website', icon: '🌐', desc: 'Лендинги, Многостраничники, Квизы' },
        { id: 'presentations', title: 'Презентации', icon: '📊', desc: 'Инвестиционные, Коммерческие, ТЦ' },
        { id: 'marketing', title: 'Маркетинг', icon: '🎯', desc: 'Таргет, Контекст, SEO' }
    ];

    return (
        <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh' }}>
            <h1 style={{ color: '#fff', marginBottom: '30px' }}>Конструктор услуг</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                {mainCategories.map(cat => (
                    <div 
                        key={cat.id} 
                        onClick={() => navigate(`/admin/services/category/${cat.id}`)}
                        style={styles.bigCard}
                    >
                        <div style={{fontSize: '40px', marginBottom: '15px'}}>{cat.icon}</div>
                        <h2 style={{color: '#fff', margin: '0 0 10px 0'}}>{cat.title}</h2>
                        <p style={{color: '#444', fontSize: '13px', margin: 0}}>{cat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    bigCard: {
        backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '30px', 
        borderRadius: '20px', cursor: 'pointer', textAlign: 'center', transition: '0.3s'
    }
};