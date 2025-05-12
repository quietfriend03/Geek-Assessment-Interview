import React, { useState } from 'react';
import { NavItem } from './nav-item';
import { SquareLibrary, IdCard, ChevronLeft, ChevronRight } from 'lucide-react';

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('User');
  const [expanded, setExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleNavLink = (text) => {
    setSelectedItem(text);
  }
  
  return (
    <div className={`bg-white transition-all duration-200 h-screen flex flex-col justify-between p-1 ${expanded ? 'w-40' : 'w-20'}`}>
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
      
      <div className="mb-2 flex justify-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-blue  hover:bg-blue-200 transition-colors"
        >
          {expanded ? <ChevronLeft size={18} color = "blue" /> : <ChevronRight size={18} color = "blue"/>}
        </button>
      </div>
    </div>
  );
}