import React, { useState, useEffect } from 'react';
import { NavItem } from './nav-item';
import { SquareLibrary, IdCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Sidebar = ({ onClose, isMobile }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'user'; // Default to user if we're at root
  const [selectedItem, setSelectedItem] = useState(
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
  );

  // Keep selected item in sync with URL
  useEffect(() => {
    const path = location.pathname.substring(1) || 'user';
    const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);
    setSelectedItem(formattedPath);
  }, [location]);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleNavLink = (text) => {
    setSelectedItem(text);
    // Close sidebar on mobile when item is clicked
    if (isMobile) {
      onClose();
    }
  }
  
  return (
    <div 
      className={`
        bg-white h-screen flex flex-col justify-between p-1
        transition-all duration-300 ease-in-out
        ${expanded ? 'w-40' : 'w-20'}
        relative shadow-lg
      `}
    >
      <div>
        <nav className="mt-4"> 
          <NavItem text={"User"} onClick={handleNavLink} select={selectedItem === 'User'} expanded={expanded}>
            <SquareLibrary className='w-4 h-4'/>
          </NavItem>
          <NavItem text={"Album"} onClick={handleNavLink} select={selectedItem === 'Album'} expanded={expanded}>
            <IdCard className='w-4 h-4'/>
          </NavItem>
        </nav>
      </div>
      
      {/* Only show the expand/collapse button on desktop */}
      {!isMobile && (
        <div className="mb-2 flex justify-center p-1">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? 
              <ChevronLeft size={18} className="transition-transform duration-300 text-blue-500" /> : 
              <ChevronRight size={18} className="transition-transform duration-300 text-blue-500" />
            }
          </button>
        </div>
      )}
    </div>
  );
}
