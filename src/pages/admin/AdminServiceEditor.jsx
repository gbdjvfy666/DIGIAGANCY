import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function AdminServiceEditor() {
    const { categoryId, subId } = useParams(); // Извлекаем например 'websites' и 'blog'
    const navigate = useNavigate();
    
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'services', categoryId);
                const snap = await getDoc(docRef);
                
                if (snap.exists()) {
                    const fullData = snap.data();
                    // Берем конкретную часть (например, только данные блога)
                    if (fullData[subId]) {
                        setServiceData(fullData[subId]);
                    } else {
                        console.error("Подкатегория не найдена в документе");
                    }
                }
            } catch (error) {
                console.error("Ошибка при загрузке:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [categoryId, subId]);

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'services', categoryId);
            const snap = await getDoc(docRef);
            
            if (snap.exists()) {
                const fullData = snap.data();
                // Обновляем только редактируемую часть, сохраняя остальные подкатегории
                fullData[subId] = serviceData;
                
                await updateDoc(docRef, fullData);
                alert("✅ Изменения успешно опубликованы!");
            }
        } catch (error) {
            alert("Ошибка при сохранении: " + error.message);
        }
    };

    // --- Логика конструктора блоков ---

    const addBlock = (type) => {
        const templates = {
            hero: { type: 'hero', data: { title: '', description: '', buttonText: 'Заказать', price: '' } },
            text: { type: 'text', data: { text: '' } },
            faq: { type: 'faq', data: { title: 'Вопросы', items: [{ q: '', a: '' }] } }
        };
        const newBlocks = [...(serviceData.blocks || []), templates[type]];
        setServiceData({ ...serviceData, blocks: newBlocks });
    };

    const updateBlockData = (blockIdx, newData) => {
        const newBlocks = [...serviceData.blocks];
        newBlocks[blockIdx].data = { ...newBlocks[blockIdx].data, ...newData };
        setServiceData({ ...serviceData, blocks: newBlocks });
    };

    const moveBlock = (idx, direction) => {
        const newBlocks = [...serviceData.blocks];
        const targetIdx = idx + direction;
        if (targetIdx < 0 || targetIdx >= newBlocks.length) return;
        [newBlocks[idx], newBlocks[targetIdx]] = [newBlocks[targetIdx], newBlocks[idx]];
        setServiceData({ ...serviceData, blocks: newBlocks });
    };

    const deleteBlock = (idx) => {
        const newBlocks = serviceData.blocks.filter((_, i) => i !== idx);
        setServiceData({ ...serviceData, blocks: newBlocks });
    };

    if (loading) return <div style={st.wrap}>Загрузка редактора...</div>;
    if (!serviceData) return <div style={st.wrap}>Данные не найдены</div>;

    return (
        <div style={st.wrap}>
            <div style={st.topNav}>
                <button onClick={() => navigate(-1)} style={st.backBtn}>← Назад</button>
                <button onClick={handleSave} style={st.saveBtn}>Опубликовать на сайт</button>
            </div>

            <div style={st.editorGrid}>
                <div style={st.canvas}>
                    <input 
                        style={st.mainTitleInput}
                        value={serviceData.title || ''}
                        onChange={(e) => setServiceData({...serviceData, title: e.target.value})}
                        placeholder="Название страницы (H1)"
                    />

                    {serviceData.blocks?.map((block, idx) => (
                        <div key={idx} style={st.blockCard}>
                            <div style={st.blockHeader}>
                                <span style={st.typeBadge}>{block.type.toUpperCase()}</span>
                                <div style={st.blockControls}>
                                    <button onClick={() => moveBlock(idx, -1)} style={st.ctrlBtn}>↑</button>
                                    <button onClick={() => moveBlock(idx, 1)} style={st.ctrlBtn}>↓</button>
                                    <button onClick={() => deleteBlock(idx)} style={{...st.ctrlBtn, color: '#ff4444'}}>✕</button>
                                </div>
                            </div>

                            {block.type === 'hero' && (
                                <div style={st.inputs}>
                                    <input style={st.input} value={block.data.title} onChange={e => updateBlockData(idx, {title: e.target.value})} placeholder="Заголовок"/>
                                    <textarea style={st.textarea} value={block.data.description} onChange={e => updateBlockData(idx, {description: e.target.value})} placeholder="Описание"/>
                                    <input style={st.input} value={block.data.buttonText} onChange={e => updateBlockData(idx, {buttonText: e.target.value})} placeholder="Текст кнопки"/>
                                </div>
                            )}

                            {block.type === 'text' && (
                                <textarea style={{...st.textarea, height: '150px'}} value={block.data.text} onChange={e => updateBlockData(idx, {text: e.target.value})} placeholder="Основной текст контента..."/>
                            )}
                        </div>
                    ))}

                    <div style={st.addPanel}>
                        <button onClick={() => addBlock('hero')} style={st.addBtn}>+ Добавить Hero</button>
                        <button onClick={() => addBlock('text')} style={st.addBtn}>+ Добавить Текст</button>
                    </div>
                </div>

                <div style={st.sidebar}>
                    <div style={st.sideCard}>
                        <label style={st.label}>ID документа:</label>
                        <div style={st.val}>{categoryId}</div>
                        <label style={st.label}>Ключ услуги:</label>
                        <div style={st.val}>{subId}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const st = {
    wrap: { padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' },
    topNav: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
    backBtn: { background: 'none', border: 'none', color: '#666', cursor: 'pointer' },
    saveBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
    editorGrid: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: '30px' },
    canvas: { display: 'flex', flexDirection: 'column', gap: '20px' },
    mainTitleInput: { background: 'none', border: 'none', borderBottom: '2px solid #1a1a1a', color: '#fff', fontSize: '32px', padding: '10px 0', outline: 'none', marginBottom: '20px' },
    blockCard: { backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '20px' },
    blockHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
    typeBadge: { fontSize: '10px', color: '#6366f1', fontWeight: 'bold' },
    blockControls: { display: 'flex', gap: '5px' },
    ctrlBtn: { backgroundColor: '#1a1a1a', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
    inputs: { display: 'flex', flexDirection: 'column', gap: '10px' },
    input: { backgroundColor: '#000', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px' },
    textarea: { backgroundColor: '#000', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px', minHeight: '80px', resize: 'vertical' },
    addPanel: { display: 'flex', gap: '10px', marginTop: '20px' },
    addBtn: { flex: 1, backgroundColor: '#0a0a0a', border: '1px dashed #333', color: '#444', padding: '15px', borderRadius: '12px', cursor: 'pointer' },
    sidebar: { height: 'fit-content' },
    sideCard: { backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '16px', border: '1px solid #1a1a1a' },
    label: { fontSize: '11px', color: '#444', display: 'block', marginBottom: '5px' },
    val: { fontSize: '13px', color: '#fff', marginBottom: '15px', fontFamily: 'monospace' }
};