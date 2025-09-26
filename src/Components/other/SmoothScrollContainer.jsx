import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const SmoothScrollContainer = ({ children }) => {
  const containerRef = useSmoothScroll();

  return (
    <div className="fixed top-0 left-0 w-full will-change-transform" ref={containerRef}>
      {children}
    </div>
  );
};

export default SmoothScrollContainer;