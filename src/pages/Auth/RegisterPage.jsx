import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Создаем пользователя в Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Обновляем профиль (добавляем имя)
      await updateProfile(user, { displayName: name });

      // 3. Создаем документ в Firestore
      // Это критично для твоей админки!
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        isAdmin: false, // По умолчанию все — обычные юзеры
        createdAt: new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
        photoURL: ""
      });

      navigate('/profile'); 
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Этот email уже занят');
      } else {
        setError('Ошибка при регистрации. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-[350px] space-y-8">
        <div className="text-center">
          <h1 className="text-white text-2xl font-medium tracking-tight">Регистрация</h1>
          <p className="text-[#888] text-sm mt-2">Создайте аккаунт для доступа к функциям</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[#888] text-xs uppercase tracking-widest ml-1">Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-[#333] rounded-md px-3 py-2 text-white text-sm focus:border-[#666] focus:outline-none transition-colors placeholder:text-[#444]"
              placeholder="Иван Иванов"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#888] text-xs uppercase tracking-widest ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-[#333] rounded-md px-3 py-2 text-white text-sm focus:border-[#666] focus:outline-none transition-colors placeholder:text-[#444]"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#888] text-xs uppercase tracking-widest ml-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-[#333] rounded-md px-3 py-2 text-white text-sm focus:border-[#666] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black text-sm font-medium py-2 rounded-md hover:bg-[#ececec] transition-colors mt-6 disabled:opacity-50"
          >
            {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-[#666] text-xs">
            Уже есть аккаунт?{' '}
            <button onClick={() => navigate('/login')} className="text-white hover:underline">Войти</button>
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-[#666] text-xs hover:text-white transition-colors"
          >
            ← Назад на сайт
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;