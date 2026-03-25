import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Firebase & Store
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 
import { useUserStore } from './store/useUserStore';

// Hooks & Components
import { useSmoothScroll } from './Components/other/hooks/useSmoothScroll';
import CustomCursor from './Components/other/CustomCursor';
import Navbar from './Components/other/Navbar';
import Footer from './Components/other/Footer';

// Pages
import Home from './pages/Home';
import Design from './pages/Design';
import Target from './pages/Target';
import Works from './pages/Works';
import Test from './pages/Test';
import Reviews from './pages/Reviews';
import WebDevelopment from './pages/WebDevelopment';
import About from './pages/About';
import Brief from './pages/Brief';
import Services from './pages/Services';
import ServicePage from './pages/ServiecesConstructor/ServicePage';
import BlogPage from './pages/BlogConstructor/BlogPage';
import Profile from './pages/Auth/ProfilePage';
import LoginPage from './pages/Auth/LoginPage'; 
import RegisterPage from './pages/Auth/RegisterPage';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';
import AdminLayout from './pages/admin/AdminLayout';
import AdminServicesList from './pages/admin/AdminServicesList';
import AdminSubCategoryList from './pages/admin/AdminSubCategoryList';
import AdminServiceEditor from './pages/admin/AdminServiceEditor';


gsap.registerPlugin(ScrollTrigger);

// 1. Защита для АДМИНА
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useUserStore();
  if (loading) return null; 
  return isAdmin ? children : <Navigate to="/login" replace />;
};

// 2. Защита для ПРОФИЛЯ
const PrivateRoute = ({ children }) => {
  const { user, loading } = useUserStore();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const location = useLocation();
  const { containerRef, refreshScroll } = useSmoothScroll();
  
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    });
    return () => unsubscribe();
  }, [setUser, clearUser]);

  useLayoutEffect(() => {
    if (!isAdminPage) {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? window.scrollTo(0, value) : window.scrollY;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });
      
      ScrollTrigger.defaults({ scroller: document.body });
      refreshScroll();
    }

    return () => {
      ScrollTrigger.killAll();
    }
  }, [refreshScroll, isAdminPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAdminPage) {
      setTimeout(() => {
        refreshScroll();
      }, 100);
    }
  }, [location.pathname, location.search, refreshScroll, isAdminPage]);

return (
    <>
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <CustomCursor />}

      {isAdminPage ? (
        <Routes>
          {/* Все админские пути собираем здесь */}
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            } 
          >
            {/* Если внутри AdminLayout есть <Outlet />, пути ниже отрендерятся там */}
            <Route path="services" element={<AdminServicesList />} />
            <Route path="services/category/:categoryId" element={<AdminSubCategoryList />} />
            <Route path="services/edit/:categoryId/:subId" element={<AdminServiceEditor />} />
            <Route path="blog/edit/:slug" element={<AdminBlogEditor />} />
          </Route>
        </Routes>
      ) : (
        <div className="fixed top-0 left-0 w-full will-change-transform bg-black" ref={containerRef}>
          <Routes>
            {/* КЛИЕНТСКИЕ РОУТЫ */}
            <Route path="/" element={<Home />} />
            <Route path="/target" element={<Target />} />
            <Route path="/Design" element={<Design />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/works" element={<Works />} />
            <Route path="/About" element={<About />} />
            <Route path="/Brief" element={<Brief />} />
            <Route path="/services" element={<Services />} />

            {/* ДИНАМИЧЕСКИЕ СТРАНИЦЫ УСЛУГ ДЛЯ КЛИЕНТОВ */}
            <Route path="/services/:category/:slug" element={<ServicePage />} />
            <Route path="/services/:category" element={<ServicePage />} />
            
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />

            {/* AUTH ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}