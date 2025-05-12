import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/sidebar';
import { Menu } from 'lucide-react';

export const AppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  
  // Check screen size and update sidebar visibility
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-hide sidebar on mobile, show on desktop
      if (mobile) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    }
    
    // Run on mount and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle click outside to close sidebar (only on mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMobile && 
        sidebarVisible &&
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarVisible(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarVisible, isMobile]);
  
  return (
    <div className="flex bg-red-300 min-h-screen relative">
      {/* Toggle Button - only shown on mobile when sidebar is hidden */}
      {isMobile && !sidebarVisible && (
        <button 
          onClick={() => setSidebarVisible(true)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10"
        >
          <Menu size={24} />
        </button>
      )}
      
      {/* Mobile: Sidebar with overlay */}
      {isMobile && sidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-20">
          <div ref={sidebarRef}>
            <Sidebar onClose={() => setSidebarVisible(false)} />
          </div>
        </div>
      )}
      
      {/* Desktop: Sidebar without overlay */}
      {!isMobile && (
        <div ref={sidebarRef} className="z-10">
          <Sidebar onClose={() => {}} /> {/* Empty onClose for desktop */}
        </div>
      )}
      
      {/* Main content */}
      <div className={`flex-1 p-4 ${!isMobile ? 'ml-40' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}