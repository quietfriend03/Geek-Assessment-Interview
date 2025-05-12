import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/sidebar';
import { Menu } from 'lucide-react';

export const AppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarRef = useRef(null);
  
  // Handle click outside to close sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarVisible) {
        setSidebarVisible(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarVisible]);
  
  return (
    <div className="flex bg-red-300 min-h-screen relative">
      {/* Toggle Button - only shown when sidebar is hidden */}
      {!sidebarVisible && (
        <button 
          onClick={() => setSidebarVisible(true)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10"
        >
          <Menu size={24} />
        </button>
      )}
      
      {/* Sidebar with overlay */}
      {sidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-20">
          <div ref={sidebarRef}>
            <Sidebar onClose={() => setSidebarVisible(false)} />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}