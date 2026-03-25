import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const AdminUsersListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Универсальная функция для парсинга дат
    const formatDate = (dateValue) => {
        if (!dateValue) return '---';
        
        try {
            // Если это Timestamp от Firebase (с полями seconds/nanoseconds)
            if (typeof dateValue === 'object' && dateValue.seconds) {
                return new Date(dateValue.seconds * 1000).toLocaleDateString('ru-RU');
            }
            // Если это строка (ISO string из базы)
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('ru-RU');
            }
        } catch (e) {
            console.error("Ошибка формата даты:", e);
        }
        return '---';
    };

    useEffect(() => {
        const usersRef = collection(db, 'users');
        // Убедись, что в Firestore создан индекс для этого запроса, если используешь orderBy
        const q = query(usersRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const usersData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                // Сортировка: админы всегда сверху
                const sortedUsers = usersData.sort((a, b) => (b.isAdmin ? 1 : 0) - (a.isAdmin ? 1 : 0));
                
                setUsers(sortedUsers);
                setLoading(false);
            } catch (err) {
                console.error("Ошибка обработки данных:", err);
                setError('Ошибка при получении списка пользователей.');
                setLoading(false);
            }
        }, (err) => {
            console.error("Ошибка Firestore:", err);
            setError('Нет доступа к базе данных или ошибка сети.');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleRowClick = (uid) => {
        navigate(`/admin/users/${uid}`);
    };

    if (loading) return <div style={styles.container}><h2 style={{color: '#eee'}}>Загрузка...</h2></div>;
    if (error) return <div style={{...styles.container, color: '#e74c3c'}}><h2>{error}</h2></div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Все пользователи ({users.length})</h1>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Пользователь</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Роль</th>
                            <th style={styles.th}>Регистрация</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr 
                                key={user.id} 
                                onClick={() => handleRowClick(user.id)} 
                                style={styles.trHover}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={styles.td}>
                                    <div style={styles.userCell}>
                                        <img 
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name || user.email}&background=random`} 
                                            alt="avatar" 
                                            style={styles.avatar}
                                        />
                                        <div>
                                            <div style={styles.userName}>{user.name || 'Аноним'}</div>
                                            <div style={styles.userUid}>{user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    {user.isAdmin ? (
                                        <span style={{...styles.roleBadge, ...styles.roleAdmin}}>Администратор</span>
                                    ) : (
                                        <span style={{...styles.roleBadge, ...styles.roleUser}}>Пользователь</span>
                                    )}
                                </td>
                                <td style={styles.td}>
                                    {formatDate(user.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', backgroundColor: 'transparent' },
    header: { borderBottom: '1px solid #2d2d2d', paddingBottom: '15px', marginBottom: '20px', color: '#fff', fontSize: '24px' },
    tableWrapper: { overflowX: 'auto', backgroundColor: '#0c0c0c', border: '1px solid #222', borderRadius: '12px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { borderBottom: '1px solid #222', padding: '15px', textAlign: 'left', color: '#555', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1.5px', fontWeight: 'bold' },
    td: { borderBottom: '1px solid #161616', padding: '15px', textAlign: 'left', verticalAlign: 'middle', color: '#aaa', fontSize: '14px' },
    trHover: { cursor: 'pointer', transition: 'background-color 0.2s' },
    userCell: { display: 'flex', alignItems: 'center', gap: '12px' },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #333' },
    userName: { fontWeight: '600', color: '#eee', fontSize: '14px' },
    userUid: { fontSize: '9px', color: '#444', fontFamily: 'monospace', marginTop: '2px' },
    roleBadge: { padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' },
    roleAdmin: { backgroundColor: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid rgba(231, 76, 60, 0.2)' },
    roleUser: { backgroundColor: 'rgba(52, 152, 219, 0.1)', color: '#3498db', border: '1px solid rgba(52, 152, 219, 0.2)' },
};

export default AdminUsersListPage;