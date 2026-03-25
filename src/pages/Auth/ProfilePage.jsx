import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase'; 
import { useUserStore } from '../../store/useUserStore'; // Твой стор
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// --- Иконки ---
const EditIcon = () => <svg height="16" viewBox="0 0 20 20" width="16" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>;
const FavoriteIcon = () => <svg height="18" viewBox="0 0 24 24" width="18" fill="currentColor"><path d="M12.727,22a1,1,0,0,1-.5-.136C11.545,21.455,2,15.818,2,9.091A5.09,5.09,0,0,1,7.091,4,5.914,5.914,0,0,1,12,6.545,5.914,5.914,0,0,1,16.909,4,5.09,5.09,0,0,1,22,9.091c0,6.727-9.545,12.364-10.227,12.773A1,1,0,0,1,11.5,22ZM12,8.545a1,1,0,0,1-1-1A3.913,3.913,0,0,0,7.091,6,3.091,3.091,0,0,0,4,9.091c0,4.91,6.818,9.364,8,10.182,1.182-.818,8-5.272,8-10.182A3.091,3.091,0,0,0,16.909,6a3.913,3.913,0,0,0-3.909,1.545,1,1,0,0,1-1,1Z"/></svg>;

const ProfilePage = () => {
    const { user, isAdmin } = useUserStore();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [message, setMessage] = useState({ text: '', isError: false });

    useEffect(() => {
        if (user) {
            setNewName(user.displayName || 'Пользователь');
        }
    }, [user]);

    const handleLogout = () => {
        signOut(auth).then(() => navigate('/login'));
    };

    const handleSaveName = async () => {
        if (!auth.currentUser || newName === auth.currentUser.displayName) {
            setIsEditing(false);
            return;
        }
        setLoadingUpdate(true);
        setMessage({ text: '', isError: false });

        try {
            // 1. Обновляем в Firebase Auth
            await updateProfile(auth.currentUser, { displayName: newName });
            
            // 2. Обновляем в Firestore (если есть коллекция users)
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, { name: newName }).catch(() => {
                console.log("Документ в Firestore не найден, обновлен только Auth");
            });

            setMessage({ text: 'Имя успешно обновлено!', isError: false });
            setIsEditing(false);
        } catch (error) {
            setMessage({ text: 'Не удалось обновить имя.', isError: true });
        } finally {
            setLoadingUpdate(false);
        }
    };

    if (!user) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={{color: '#fff'}}>Доступ запрещен</h1>
                    <button onClick={() => navigate('/login')} style={styles.actionButton}>Войти</button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.profileHeader}>
                    <div style={styles.avatar}>
                        {newName?.charAt(0) || user.email?.charAt(0)}
                    </div>

                    {!isEditing ? (
                        <div style={styles.nameContainer}>
                            <h1 style={styles.userName}>{newName || 'Имя не указано'}</h1>
                            <button onClick={() => setIsEditing(true)} style={styles.editButton}><EditIcon /></button>
                        </div>
                    ) : (
                        <div style={styles.editForm}>
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)} 
                                style={styles.input}
                            />
                            <button onClick={handleSaveName} disabled={loadingUpdate} style={styles.saveButton}>
                                {loadingUpdate ? '...' : '✓'}
                            </button>
                            <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>×</button>
                        </div>
                    )}
                    <p style={styles.userEmail}>{user.email}</p>
                    {isAdmin && <span style={styles.roleBadge}>Администратор</span>}
                </div>
                
                {message.text && (
                    <p style={{...styles.message, color: message.isError ? '#ff4d4d' : '#00e676'}}>
                        {message.text}
                    </p>
                )}

                <div style={styles.actionsContainer}>
                    <button onClick={() => navigate('/favorites')} style={styles.actionButton}>
                        <FavoriteIcon />
                        <span>Избранное</span>
                    </button>
                    {isAdmin && (
                        <button onClick={() => navigate('/admin')} style={styles.actionButton}>
                            <span>Панель администратора</span>
                        </button>
                    )}
                    <button onClick={handleLogout} style={{...styles.actionButton, ...styles.logoutButton}}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: '#070707',
        fontFamily: "'Inter', sans-serif",
    },
    card: {
        backgroundColor: '#0f0f0f',
        borderRadius: '16px',
        padding: '40px',
        border: '1px solid #1c1c1c',
        textAlign: 'center',
        width: '100%',
        maxWidth: '450px',
    },
    profileHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '20px',
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    userName: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#fff',
        margin: 0,
    },
    userEmail: {
        fontSize: '14px',
        color: '#666',
        margin: '8px 0',
    },
    editButton: {
        background: 'none',
        border: 'none',
        color: '#444',
        cursor: 'pointer',
    },
    editForm: {
        display: 'flex',
        gap: '8px',
    },
    input: {
        padding: '6px 12px',
        background: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '6px',
        color: '#fff',
    },
    saveButton: { background: '#00e676', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '0 10px' },
    cancelButton: { background: '#ff4d4d', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '0 10px', color: '#fff' },
    roleBadge: {
        fontSize: '10px',
        background: '#1a1a1a',
        border: '1px solid #333',
        padding: '4px 12px',
        borderRadius: '100px',
        color: '#888',
        marginTop: '10px',
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px solid #1c1c1c',
    },
    actionButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '12px',
        background: '#111',
        border: '1px solid #222',
        borderRadius: '10px',
        color: '#eee',
        cursor: 'pointer',
        fontSize: '14px',
        transition: '0.2s',
    },
    logoutButton: {
        color: '#ff4d4d',
        borderColor: 'rgba(255, 77, 77, 0.2)',
    },
    message: { fontSize: '12px', marginBottom: '15px' }
};

export default ProfilePage;