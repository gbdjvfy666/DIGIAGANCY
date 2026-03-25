import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminBlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Используем onSnapshot для обновления списка в реальном времени
    useEffect(() => {
        const colRef = collection(db, 'posts');
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (postId, e) => {
        e.stopPropagation(); // Чтобы не сработал переход к редактированию
        if (window.confirm(`Вы уверены, что хотите удалить пост "${postId}"? Это действие необратимо.`)) {
            try {
                await deleteDoc(doc(db, 'posts', postId));
                alert("Удалено успешно");
            } catch (err) {
                console.error(err);
                alert("Ошибка при удалении");
            }
        }
    };

    if (loading) return <div style={{color: '#888', padding: '20px'}}>Загрузка базы данных...</div>;

    return (
        <div>
            <div style={st.headerRow}>
                <h2>Статьи и страницы ({posts.length})</h2>
                <button style={st.createBtn} onClick={() => alert('Функция создания нового документа скоро будет!')}>
                    + Создать новый пост
                </button>
            </div>

            {posts.length === 0 ? (
                <div style={st.emptyState}>
                    <p>В Firebase пока нет данных.</p>
                    <button onClick={() => navigate('/migrate-blog')} style={st.editBtn}>Перейти к миграции</button>
                </div>
            ) : (
                <div style={st.table}>
                    {posts.map(post => (
                        <div key={post.id} style={st.row}>
                            <div style={st.info}>
                                <div style={st.postTitle}>{post.title || 'Без названия'}</div>
                                <div style={st.postSlug}>{post.id} {post.isIndexPage && <span style={st.badge}>INDEX PAGE</span>}</div>
                            </div>
                            
                            <div style={st.actions}>
                                <button 
                                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                                    style={st.editBtn}
                                >
                                    Редактировать
                                </button>
                                <button 
                                    onClick={(e) => handleDelete(post.id, e)}
                                    style={st.deleteBtn}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const st = {
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    table: { display: 'flex', flexDirection: 'column', gap: '12px' },
    row: { 
        backgroundColor: '#111', 
        padding: '16px 24px', 
        borderRadius: '12px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        border: '1px solid #222',
        transition: '0.2s hover',
    },
    info: { display: 'flex', flexDirection: 'column', gap: '4px' },
    postTitle: { fontSize: '16px', fontWeight: '600', color: '#fff' },
    postSlug: { fontSize: '12px', color: '#555', fontFamily: 'monospace' },
    badge: { backgroundColor: '#333', color: '#888', padding: '2px 6px', borderRadius: '4px', marginLeft: '10px', fontSize: '10px' },
    actions: { display: 'flex', gap: '10px' },
    createBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    editBtn: { backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#eee', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
    deleteBtn: { backgroundColor: 'transparent', border: '1px solid #451a1a', color: '#ff4d4d', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
    emptyState: { textAlign: 'center', padding: '50px', backgroundColor: '#111', borderRadius: '15px', border: '1px dashed #333' }
};

export default AdminBlogList;