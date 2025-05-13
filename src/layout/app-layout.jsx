import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const AppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const sidebarRef = useRef(null);

  // Theo dõi resize để cập nhật isMobile và sidebarVisible
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarVisible(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click ngoài đóng sidebar trên mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobile &&
        sidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarVisible]);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Header
        isMobile={isMobile}
        onMenuClick={() => setSidebarVisible(true)}
      />

      <div className="flex flex-1 pt-16">
        {/* Mobile: overlay + sidebar */}
        {isMobile && (
          <div
            className={`
              fixed inset-0 z-40 flex
              ${sidebarVisible ? 'pointer-events-auto' : 'pointer-events-none'}
            `}
          >
            {/* Overlay fade in/out */}
            <div
              className={`
                absolute inset-0 bg-black
                transition-opacity duration-300 ease-in-out
                ${sidebarVisible ? 'opacity-50' : 'opacity-0'}
              `}
              onClick={() => setSidebarVisible(false)}
            />

            {/* Sidebar slide in/out */}
            <div
              ref={sidebarRef}
              className={`
                relative z-50
                transform transition-transform duration-300 ease-in-out
                ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}
              `}
              style={{ width: 'fit-content' }}
            >
              <Sidebar onClose={() => setSidebarVisible(false)} isMobile />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        {!isMobile && (
          <div ref={sidebarRef} className="z-20">
            <Sidebar onClose={() => {}} isMobile={false} />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 transition-all">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
