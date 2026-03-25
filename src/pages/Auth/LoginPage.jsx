import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/admin'); // После успешного входа летим в админку
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-[350px] space-y-8">
        {/* Логотип или заголовок */}
        <div className="text-center">
          <h1 className="text-white text-2xl font-medium tracking-tight">Вход в систему</h1>
          <p className="text-[#888] text-sm mt-2">Введите данные для доступа к админ-панели</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black text-sm font-medium py-2 rounded-md hover:bg-[#ececec] transition-colors mt-6"
          >
            Продолжить
          </button>
        </form>

        <div className="text-center">
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

export default LoginPage;