import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Design from './pages/Design';
import Target from './pages/Target';
import Works from './pages/Works';
import Test from './pages/Test'; 
import Reviews from './pages/Reviews'; 
import WebDevelopment from './pages/WebDevelopment';
import About from './pages/About';
import CustomCursor from './Components/other/CustomCursor';
import SmoothScrollContainer from './Components/other/SmoothScrollContainer';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SmoothScrollContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/target" element={<Target />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/works" element={<Works />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </SmoothScrollContainer>
  );
}

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <AppContent />
    </Router>
  );
}