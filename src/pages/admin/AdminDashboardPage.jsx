import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
  CircularProgress, Alert, Button
} from '@mui/material';
import {
  People as PeopleIcon,
  Chat as ChatIcon,
  RequestQuote as LeadIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Firebase
import { db } from '../../firebase'; // ПУТЬ К ТВОЕМУ ФАЙЛУ FIREBASE
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';

const StatCard = ({ title, value, subtitle, icon, color = '#1976d2' }) => (
  <Card sx={{ height: '100%', backgroundColor: '#0f0f0f', border: '1px solid #1c1c1c', color: '#fff' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="grey.500" gutterBottom variant="h6">{title}</Typography>
          <Typography variant="h4" fontWeight="bold">{value}</Typography>
          {subtitle && <Typography variant="body2" color="grey.600">{subtitle}</Typography>}
        </Box>
        <Box sx={{ backgroundColor: color, borderRadius: '12px', p: 1.5, color: 'white', display: 'flex' }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. СЛУШАЕМ ЗАЯВКИ (LEADS)
    const qLeads = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(10));
    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(leadsData);
    });

    // 2. СЛУШАЕМ ПОЛЬЗОВАТЕЛЕЙ (USERS)
    const qUsers = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(10));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLoading(false);
    });

    return () => { unsubLeads(); unsubUsers(); };
  }, []);

  const formatDate = (date) => {
    if (!date) return '---';
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;

  return (
    <Box p={3} sx={{ backgroundColor: '#070707', minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>Панель управления</Typography>
      
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Всего заявок" value={leads.length} subtitle="Последние 10" icon={<LeadIcon />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Пользователи" value={users.length} icon={<PeopleIcon />} color="#9c27b0" />
        </Grid>
        {/* Можно добавить больше карточек */}
      </Grid>

      <Grid container spacing={3}>
        {/* ТАБЛИЦА ЗАЯВОК */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#0f0f0f', border: '1px solid #1c1c1c' }}>
            <CardContent>
              <Typography variant="h6" color="#fff" mb={2}>Последние заявки</Typography>
              <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#666' }}>Имя</TableCell>
                      <TableCell sx={{ color: '#666' }}>Дата</TableCell>
                      <TableCell sx={{ color: '#666' }}>Статус</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell sx={{ color: '#eee' }}>{lead.name || lead.clientName || 'Без имени'}</TableCell>
                        <TableCell sx={{ color: '#eee' }}>{formatDate(lead.createdAt)}</TableCell>
                        <TableCell><Chip label="Новая" size="small" color="primary" variant="outlined" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#0f0f0f', border: '1px solid #1c1c1c' }}>
            <CardContent>
              <Typography variant="h6" color="#fff" mb={2}>Новые пользователи</Typography>
              <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#666' }}>Email</TableCell>
                      <TableCell sx={{ color: '#666' }}>Имя</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell sx={{ color: '#eee' }}>{user.email}</TableCell>
                        <TableCell sx={{ color: '#eee' }}>{user.name || '---'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardPage;