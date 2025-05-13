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
    <div className="flex bg-gray-50 min-h-screen relative">
      {/* Toggle Button - only shown on mobile when sidebar is hidden */}
      {isMobile && !sidebarVisible && (
        <button 
          onClick={() => setSidebarVisible(true)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10 transition-all duration-300 ease-in-out hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      )}
      
      {/* Mobile: Sidebar with overlay */}
      {isMobile && (
        <div 
          className={`fixed inset-0 z-20 transition-opacity duration-300 ease-in-out
            ${sidebarVisible ? 'visible' : 'invisible'}`}
        >
          {/* Overlay background */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out
              ${sidebarVisible ? 'opacity-50' : 'opacity-0'}`}
            onClick={() => setSidebarVisible(false)}
          ></div>
          
          {/* Sidebar */}
          <div 
            ref={sidebarRef} 
            className={`h-full transform transition-transform duration-300 ease-in-out relative
              ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
            style={{width: 'fit-content'}}
          >
            <Sidebar onClose={() => setSidebarVisible(false)} isMobile={isMobile} />
          </div>
        </div>
      )}
      
      {/* Desktop: Sidebar without overlay */}
      {!isMobile && (
        <div ref={sidebarRef} className="z-20 transition-all duration-300 ease-in-out">
          <Sidebar onClose={() => {}} isMobile={isMobile} /> {/* Empty onClose for desktop */}
        </div>
      )}
      
      {/* Main content */}
      <div 
        className={`flex-1 p-4 transition-all duration-300 ease-in-out
          ${!isMobile ? 'mt-2' : 'ml-12 mt-2'}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
