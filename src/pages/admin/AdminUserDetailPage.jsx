import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const AdminUserDetailPage = () => {
    const { uid } = useParams();
    const [user, setUser] = useState(null);
    const [leads, setLeads] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Функция форматирования, которая понимает и СТРОКУ (как у тебя в базе), и ОБЪЕКТ Firebase
    const formatDate = (dateValue) => {
        if (!dateValue) return 'Нет данных';
        
        try {
            // 1. Если это объект Timestamp от Firebase (seconds/nanoseconds)
            if (typeof dateValue === 'object' && dateValue.seconds) {
                return new Date(dateValue.seconds * 1000).toLocaleDateString('ru-RU');
            }
            
            // 2. Если это строка ISO (как на твоем скриншоте из консоли)
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('ru-RU');
            }
        } catch (e) {
            console.error("Ошибка парсинга даты:", e);
        }
        return 'Ошибка формата';
    };

    useEffect(() => {
        if (!uid) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Получаем юзера
                const userDoc = await getDoc(doc(db, 'users', uid));
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                }

                // Заявки
                const qLeads = query(
                    collection(db, 'leads'), 
                    where('uid', '==', uid),
                    orderBy('createdAt', 'desc')
                );
                const unsubLeads = onSnapshot(qLeads, (snap) => {
                    setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() })));
                });

                // Избранное
                const qFavs = query(collection(db, `users/${uid}/favorites`));
                const unsubFavs = onSnapshot(qFavs, (snap) => {
                    setFavorites(snap.docs.map(d => ({ id: d.id, ...d.data() })));
                    setLoading(false);
                });

                return () => {
                    unsubLeads();
                    unsubFavs();
                };
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, [uid]);

    if (loading) return <div style={styles.container}><h2>Загрузка...</h2></div>;
    if (!user) return <div style={styles.container}><h2>Юзер не найден</h2></div>;

    return (
        <div style={styles.container}>
            <Link to="/admin/users" style={styles.backLink}>← Назад к списку пользователей</Link>
            
            <div style={styles.profileHeader}>
                <div style={styles.avatarCircle}>
                    {user.name ? user.name.substring(0, 2).toUpperCase() : '??'}
                </div>
                <div>
                    <h1 style={styles.userName}>{user.name || "Без имени"}</h1>
                    <p style={styles.userEmail}>{user.email}</p>
                    <span style={user.isAdmin ? styles.roleAdmin : styles.roleUser}>
                        {user.isAdmin ? 'Администратор' : 'Пользователь'}
                    </span>
                </div>
            </div>

            {/* ВОТ ЭТОТ БЛОК ТЕБЕ НУЖЕН */}
            <div style={styles.metaContainer}>
                <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Регистрация</span>
                    <span style={styles.metaValue}>{formatDate(user.createdAt)}</span>
                </div>
                <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Последний вход</span>
                    <span style={styles.metaValue}>{formatDate(user.lastSignInTime)}</span>
                </div>
                <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>ID</span>
                    <span style={{...styles.metaValue, fontSize: '11px', color: '#444'}}>{uid}</span>
                </div>
            </div>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <h2 style={styles.cardHeader}>Заявки ({leads.length})</h2>
                    <div style={styles.listContainer}>
                        {leads.length > 0 ? leads.map(lead => (
                            <div key={lead.id} style={styles.listItem}>
                                <div>
                                    <div style={styles.itemTitle}>{lead.type || 'Заявка'}</div>
                                    <div style={styles.itemSubtitle}>{lead.carTitle || lead.comment}</div>
                                </div>
                                <div style={styles.itemDate}>{formatDate(lead.createdAt)}</div>
                            </div>
                        )) : <p style={styles.empty}>Заявок нет</p>}
                    </div>
                </div>

                <div style={styles.rightColumn}>
                    <div style={styles.card}>
                        <h2 style={styles.cardHeader}>Избранное ({favorites.length})</h2>
                        {favorites.map(fav => (
                            <div key={fav.id} style={styles.listItem}>
                                <div style={styles.itemTitle}>{fav.name || fav.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' },
    backLink: { color: '#55acee', textDecoration: 'none', marginBottom: '30px', display: 'block' },
    profileHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
    avatarCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ff8a71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#000' },
    userName: { fontSize: '32px', margin: 0 },
    userEmail: { color: '#888', margin: '5px 0' },
    roleAdmin: { backgroundColor: '#c0392b', padding: '2px 10px', borderRadius: '4px', fontSize: '12px' },
    roleUser: { backgroundColor: '#2980b9', padding: '2px 10px', borderRadius: '4px', fontSize: '12px' },
    
    // Стили для дат
    metaContainer: { display: 'flex', gap: '40px', marginBottom: '40px', padding: '20px', backgroundColor: '#141414', borderRadius: '12px', border: '1px solid #222' },
    metaItem: { display: 'flex', flexDirection: 'column', gap: '5px' },
    metaLabel: { color: '#666', fontSize: '11px', textTransform: 'uppercase' },
    metaValue: { color: '#fff', fontSize: '16px' },

    grid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' },
    card: { backgroundColor: '#141414', borderRadius: '12px', padding: '24px', border: '1px solid #222' },
    cardHeader: { fontSize: '18px', marginBottom: '20px' },
    listItem: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #222' },
    itemTitle: { fontSize: '16px', fontWeight: 'bold' },
    itemSubtitle: { fontSize: '13px', color: '#666' },
    itemDate: { fontSize: '12px', color: '#555' },
    empty: { color: '#444' }
};

export default AdminUserDetailPage;