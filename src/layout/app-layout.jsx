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
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const sidebarRef = useRef(null);

  // Tracking resize to update isMobile and sidebarVisible
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarVisible(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
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

  // Handle sidebar expansion state
  const handleSidebarExpand = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header
          isMobile={isMobile}
          onMenuClick={() => setSidebarVisible(true)}
        />
      </div>

      {/* Container: full viewport minus header height */}
      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        {/* Mobile: overlay + sidebar with ease-in-out */}
        {isMobile && (
          <div
            className={`
              fixed inset-0 z-40 flex pt-16
              ${sidebarVisible ? 'pointer-events-auto' : 'pointer-events-none'}
            `}
          >
            {/* Overlay */}
            <div
              className={`
                absolute inset-0 bg-black
                transition-opacity duration-300 ease-in-out will-change-opacity
                ${sidebarVisible ? 'opacity-50' : 'opacity-0'}
              `}
              onClick={() => setSidebarVisible(false)}
            />

            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className={`
                relative z-50
                transform transition-transform duration-300 ease-in-out will-change-transform
                ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}
              `}
              style={{ width: 'fit-content', height: 'calc(100% - 4rem)' }}
            >
              <Sidebar
                onClose={() => setSidebarVisible(false)}
                isMobile={true}
                onExpand={handleSidebarExpand}
              />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        {!isMobile && (
          <div
            ref={sidebarRef}
            className="fixed left-0 top-16 bottom-0 z-20"
          >
            <Sidebar
              onClose={() => {}}
              isMobile={false}
              onExpand={handleSidebarExpand}
            />
          </div>
        )}

        {/* Main content: scrollable and responsive to sidebar width */}
        <main
          className={`
            flex-1 bg-gray-50 will-change-scroll
            transition-all duration-300 ease-in-out
            ${!isMobile
              ? sidebarExpanded
                ? 'ml-40'
                : 'ml-20'
              : ''
            }
          `}
          style={{ 
            height: 'calc(100vh - 4rem)',
            overflowY: 'auto',
            overscrollBehavior: 'contain' 
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;