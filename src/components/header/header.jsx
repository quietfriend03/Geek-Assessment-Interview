import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import PropTypes from 'prop-types';

const Header = ({ isMobile, onMenuClick }) => {
  return (
    <header className="bg-white h-16 flex items-center w-screen px-4 fixed top-0 z-30">
      {isMobile && (
        <button
          onClick={onMenuClick}
          className="mr-4 p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}
      <div className="flex-1 flex items-center">
        <Link to="/user" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
          <span className="text-blue-600 font-bold text-xl">Geek Project</span>
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;
