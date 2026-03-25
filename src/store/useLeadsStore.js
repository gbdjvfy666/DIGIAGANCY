import { create } from 'zustand';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const useLeadsStore = create((set) => ({
  leads: [],
  loading: true,

  subscribeToLeads: () => {
    set({ loading: true });
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dateFormatted: doc.data().createdAt?.toDate().toLocaleDateString('ru-RU') || 'Нет даты'
      }));
      set({ leads: leadsData, loading: false });
    });

    return unsubscribe;
  },
}));