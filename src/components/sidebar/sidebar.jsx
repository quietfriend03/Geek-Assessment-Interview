import React, { useState } from 'react';
import { NavItem } from './nav-item';
import { SquareLibrary, IdCard, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const Sidebar = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState('User');
  const [expanded, setExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleNavLink = (text) => {
    setSelectedItem(text);
    // Optionally close sidebar on mobile when item is clicked
    if (window.innerWidth < 768) {
      onClose();
    }
  }
  
  return (
    <div className={`
      bg-white transition-all duration-100 h-screen flex flex-col justify-between p-1
      ${expanded ? 'w-40' : 'w-20'}
      relative
    `}>
      {/* Close button */}
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
      >
        <X size={18} />
      </button>
      
      <div>
        <nav className="mt-10"> {/* Increased top margin to make room for close button */}
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