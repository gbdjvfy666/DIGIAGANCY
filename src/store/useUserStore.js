import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,

  setUser: (userData) => {

    const ADMIN_UID = "KelJZsdRK7h44kGvcMRa1Zsu8T92"; 
    
    set({ 
      user: userData, 
      isAdmin: userData?.uid === ADMIN_UID, 
      loading: false 
    });
  },

  // Функция для выхода
  clearUser: () => set({ user: null, isAdmin: false, loading: false }),
}));