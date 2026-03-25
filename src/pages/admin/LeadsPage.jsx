import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeads(data);
        setLoading(false);
      }, 
      (err) => {
        console.error("Firestore Error:", err);
        setError("Доступ запрещен или ошибка сервера");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{padding: '20px', color: '#888'}}>Загрузка...</div>;
  if (error) return <div style={{padding: '20px', color: '#ff4444'}}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Новые заявки</h2>
      <div style={{ background: '#111', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc' }}>
          <thead>
            <tr style={{ background: '#1a1a1a', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Имя / Контакт</th>
              <th style={{ padding: '15px' }}>Дата поступления</th>
              <th style={{ padding: '15px' }}>ID</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '15px' }}>{lead.name || 'Аноним'}</td>
                <td style={{ padding: '15px' }}>
                  {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString() : '---'}
                </td>
                <td style={{ padding: '15px', color: '#444', fontSize: '12px' }}>{lead.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsPage;