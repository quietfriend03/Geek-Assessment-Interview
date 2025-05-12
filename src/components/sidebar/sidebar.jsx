import React, { useState } from 'react';
import { NavItem } from './nav-item';
import { SquareLibrary, IdCard, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const Sidebar = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState('User');
  const [expanded, setExpanded] = useState(true);
  
  // Determine if we're on mobile based on whether onClose is a meaningful function
  const isMobile = typeof onClose === 'function' && onClose.toString() !== '() => {}';
  
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
    <div className={`
      bg-white transition-all duration-100 h-screen flex flex-col justify-between p-1
      ${expanded ? 'w-40' : 'w-20'}
      relative
    `}>
      {/* Close button - only on mobile */}
      {isMobile && (
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      )}
      
      <div>
        <nav className={isMobile ? "mt-10" : "mt-4"}> 
          <NavItem text={"User"} onClick={handleNavLink} select={selectedItem === 'User'} expanded={expanded}>
            <SquareLibrary className='w-4 h-4'/>
          </NavItem>
          <NavItem text={"Album"} onClick={handleNavLink} select={selectedItem === 'Album'} expanded={expanded}>
            <IdCard className='w-4 h-4'/>
          </NavItem>
        </nav>
      </div>
      
      <div className="mb-2 flex justify-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {expanded ? <ChevronLeft size={18} color="blue" /> : <ChevronRight size={18} color="blue"/>}
        </button>
      </div>
    </div>
  );
}