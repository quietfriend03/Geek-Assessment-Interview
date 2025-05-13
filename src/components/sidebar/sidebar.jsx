import React, { useState, useEffect } from 'react';
import { NavItem } from './nav-item';
import { SquareLibrary, IdCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ onClose, isMobile, onExpand }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the base route from the location pathname
  const getBaseRoute = (pathname) => {
    const firstSegment = pathname.split('/')[1] || 'user';
    return firstSegment;
  };
  
  // Determine the initially selected item based on the URL
  const initialPath = getBaseRoute(location.pathname);
  const [selectedItem, setSelectedItem] = useState(
    initialPath.charAt(0).toUpperCase() + initialPath.slice(1)
  );

  // Update selected item when route changes
  useEffect(() => {
    const path = getBaseRoute(location.pathname);
    const formatted = path.charAt(0).toUpperCase() + path.slice(1);
    setSelectedItem(formatted);
  }, [location.pathname]);

  // Notify parent component when expanded state changes
  useEffect(() => {
    if (onExpand) {
      onExpand(expanded);
    }
  }, [expanded, onExpand]);

  const toggleSidebar = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
  };

  const handleNavLink = (text) => {
    const route = text.toLowerCase();
    navigate(`/${route}`);
    setSelectedItem(text);
    if (isMobile) onClose();
  };

  return (
    <div
      className={`
        bg-white h-full flex flex-col justify-between p-1
        transition-all duration-300 ease-in-out
        ${expanded ? 'w-40' : 'w-20'}
        ${isMobile ? 'pt-16' : ''}
      `}
    >
      <nav className="mt-4">
        <NavItem
          text="User"
          onClick={() => handleNavLink('User')}
          expanded={expanded}
          select={selectedItem === 'User'}
        >
          <SquareLibrary className="w-4 h-4" />
        </NavItem>
        <NavItem
          text="Album"
          onClick={() => handleNavLink('Album')}
          expanded={expanded}
          select={selectedItem === 'Album'}
        >
          <IdCard className="w-4 h-4" />
        </NavItem>
      </nav>

      {!isMobile && (
        <div className="flex justify-center p-1">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition transform hover:scale-105 shadow-sm"
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded
              ? <ChevronLeft size={18} className="text-blue-500" />
              : <ChevronRight size={18} className="text-blue-500" />
            }
          </button>
        </div>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onExpand: PropTypes.func,
};

export default Sidebar;