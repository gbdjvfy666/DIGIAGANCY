import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import AdminServiceEditor from './AdminServiceEditor';
// Импорт страниц админки
import AdminDashboardPage from './AdminDashboardPage';
import AdminUsersListPage from './AdminUsersListPage';
import LeadsPage from './LeadsPage';
import AdminBlogList from './AdminBlogList'; // Создадим этот файл для списка статей
import AdminBlogEditor from './AdminBlogEditor'; // Наш конструктор
import AdminServicesList from './AdminServicesList';
// Иконки
const AnalyticsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> );
const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-2.438c.367-1.068.74-2.16.998-3.268 1.45-5.248.83-11.23-2.18-14.735a9.369 9.369 0 00-8.14-4.438 9.37 9.37 0 00-5.332 2.25c-2.486 2.486-3.41 6.13-2.73 9.728.666 3.523 3.109 6.401 6.166 7.73 1.956.83 4.1 1.114 6.224 1.018zM15 15.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const LeadsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg> );
const BlogIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> );
const MenuIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 24, height: 24 }}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg> );
const ServicesIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.625a2.25 2.25 0 00-2.25 2.25m16.5 0V9.45c0-.621-.504-1.125-1.125-1.125h-4.461m-11.039 0h4.461m0 0V4.65c0-.621.504-1.125 1.125-1.125h4.375c.621 0 1.125.504 1.125 1.125v3.675m-8.25 0h8.25" /></svg> );

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Дашборд', icon: <AnalyticsIcon />, end: true },
    { path: '/admin/users', label: 'Пользователи', icon: <UsersIcon /> },
    { path: '/admin/leads', label: 'Заявки', icon: <LeadsIcon /> },
    { path: '/admin/blog', label: 'Блог / Конструктор', icon: <BlogIcon /> },
    { path: '/admin/services', label: 'Услуги', icon: <ServicesIcon /> }, // Добавили пункт
  ];

  useEffect(() => {
    document.body.style.cursor = 'auto';
    const root = document.getElementById('root');
    if (root) root.style.cursor = 'auto';
  }, []);

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, ...(isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed) }}>
        <div style={styles.sidebarHeader}>
           <h2 style={{color: '#fff', fontSize: '1.2rem', fontWeight: 'bold'}}>ADMIN PANEL</h2>
        </div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) })}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div style={{ ...styles.mainContent, ...(isSidebarOpen ? styles.mainContentShifted : {}) }}>
        <header style={styles.header}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.menuButton}>
            <MenuIcon />
          </button>
          <div style={{fontSize: '12px', color: '#444', fontFamily: 'monospace'}}>
            {location.pathname}
          </div>
        </header>
              
        <main style={styles.pageContent}>
          <Routes>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersListPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="services" element={<AdminServicesList />} />
            <Route path="services/edit/:slug" element={<AdminServiceEditor />} />
            {/* НОВЫЕ РОУТЫ ДЛЯ БЛОГА */}
            <Route path="blog" element={<AdminBlogList />} />
            <Route path="blog/edit/:slug" element={<AdminBlogEditor />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Стили без изменений...
const styles = {
  root: { display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e0e0e0' },
  sidebar: { width: '260px', backgroundColor: '#000', borderRight: '1px solid #1a1a1a', position: 'fixed', height: '100%', transition: '0.3s ease', zIndex: 100 },
  sidebarOpen: { left: 0 },
  sidebarClosed: { left: '-260px' },
  sidebarHeader: { padding: '20px', textAlign: 'center', borderBottom: '1px solid #1a1a1a' },
  nav: { padding: '10px' },
  navLink: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#888', textDecoration: 'none', borderRadius: '8px', marginBottom: '4px', transition: '0.2s', fontSize: '14px' },
  navLinkActive: { backgroundColor: '#1a1a1a', color: '#fff' },
  mainContent: { flexGrow: 1, transition: 'padding-left 0.3s ease', width: '100%' },
  mainContentShifted: { paddingLeft: '260px' },
  header: { height: '60px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '20px', backgroundColor: '#050505' },
  menuButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#fff' },
  pageContent: { padding: '30px' }
};

export default AdminLayout;