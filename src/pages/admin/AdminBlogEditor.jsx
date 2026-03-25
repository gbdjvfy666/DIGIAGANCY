import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminBlogEditor() {
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                // Используем ту же логику, что и в BlogPage
                const docRef = doc(db, 'posts', slug || 'blog-index');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost(docSnap.data());
                }
            } catch (error) {
                console.error("Ошибка редактора:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateDoc(doc(db, 'posts', slug), post);
            alert("✅ Изменения сохранены!");
        } catch (e) {
            alert("❌ Ошибка при сохранении");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Удалить этот пост навсегда?")) {
            await deleteDoc(doc(db, 'posts', slug));
            navigate('/admin/blog');
        }
    };

    const updateBlock = (index, newData) => {
        const newBlocks = [...post.blocks];
        newBlocks[index].data = { ...newBlocks[index].data, ...newData };
        setPost({ ...post, blocks: newBlocks });
    };

    const addTextBlock = () => {
        const newBlock = { type: 'content', data: { text: '<p>Новый текстовый блок</p>' } };
        setPost({ ...post, blocks: [...post.blocks, newBlock] });
    };

    if (loading) return <div className="p-10 text-white">Загрузка данных для редактирования...</div>;
    if (!post) return <div className="p-10 text-white">Пост не найден</div>;

    return (
        <div style={s.container}>
            {/* ШАПКА РЕДАКТОРА */}
            <div style={s.header}>
                <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                    <button onClick={() => navigate('/admin/blog')} style={s.backBtn}>← Назад</button>
                    <h1 style={s.title}>Редактор: {slug}</h1>
                </div>
                <div style={{display:'flex', gap:'10px'}}>
                    <button onClick={handleDelete} style={s.deleteBtn}>Удалить пост</button>
                    <button onClick={handleSave} disabled={saving} style={s.saveBtn}>
                        {saving ? 'Сохранение...' : 'Опубликовать'}
                    </button>
                </div>
            </div>

            <div style={s.layout}>
                {/* СПИСОК БЛОКОВ */}
                <div style={s.main}>
                    {post.blocks.map((block, idx) => (
                        <div key={idx} style={s.blockCard}>
                            <div style={s.blockLabel}>Тип блока: {block.type}</div>
                            
                            {block.type === 'hero' && (
                                <div>
                                    <input 
                                        style={s.input} 
                                        value={block.data?.title || ""} 
                                        placeholder="Заголовок Hero"
                                        onChange={(e) => updateBlock(idx, { title: e.target.value })}
                                    />
                                    <textarea 
                                        style={{...s.input, height: '80px'}} 
                                        value={block.data?.description || ""} 
                                        placeholder="Описание Hero"
                                        onChange={(e) => updateBlock(idx, { description: e.target.value })}
                                    />
                                </div>
                            )}

                            {block.type === 'content' && (
                                <textarea 
                                    style={s.textarea}
                                    value={block.data?.text || ""} 
                                    onChange={(e) => updateBlock(idx, { text: e.target.value })}
                                    placeholder="Контент статьи (HTML)"
                                />
                            )}

                            {['posts-grid', 'tags-nav', 'comments', 'recommended'].includes(block.type) && (
                                <div style={s.systemBlock}>Системный блок {block.type} (настраивается автоматически)</div>
                            )}
                        </div>
                    ))}
                    
                    <button onClick={addTextBlock} style={s.addBtn}>+ Добавить текстовый блок</button>
                </div>

                {/* ПРАВАЯ ПАНЕЛЬ (МЕТА ДАННЫЕ) */}
                <aside style={s.sidebar}>
                    <label style={s.label}>H1 Заголовок страницы</label>
                    <input 
                        style={s.input} 
                        value={post.title || ""} 
                        onChange={(e) => setPost({...post, title: e.target.value})}
                    />
                    <label style={s.label}>Категория</label>
                    <input 
                        style={s.input} 
                        value={post.category || ""} 
                        onChange={(e) => setPost({...post, category: e.target.value})}
                    />
                </aside>
            </div>
        </div>
    );
}

const s = {
    container: { padding: '30px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' },
    header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid #222', paddingBottom: '20px' },
    title: { fontSize: '20px', margin: 0 },
    backBtn: { background: 'none', border: 'none', color: '#666', cursor: 'pointer' },
    saveBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    deleteBtn: { backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    layout: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' },
    blockCard: { backgroundColor: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #222', marginBottom: '20px' },
    blockLabel: { fontSize: '10px', color: '#555', textTransform: 'uppercase', marginBottom: '10px' },
    input: { width: '100%', backgroundColor: '#050505', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '10px', outline: 'none' },
    textarea: { width: '100%', backgroundColor: '#050505', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '6px', minHeight: '300px', outline: 'none', fontFamily: 'monospace' },
    addBtn: { width: '100%', padding: '15px', background: 'none', border: '1px dashed #444', color: '#666', borderRadius: '12px', cursor: 'pointer' },
    sidebar: { backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '12px', border: '1px solid #222', height: 'fit-content' },
    label: { display: 'block', fontSize: '11px', color: '#444', marginBottom: '5px' },
    systemBlock: { padding: '20px', textAlign: 'center', color: '#444', border: '1px dashed #222', borderRadius: '8px' }
};