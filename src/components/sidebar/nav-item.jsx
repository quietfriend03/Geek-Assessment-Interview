import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ text, children, onClick, expanded, select = false }) => {
  return (
    <NavLink to={`/${text.toLowerCase()}`} className="block">
      <div
        id={text}
        onClick={() => onClick(text)}
        className={`
          w-full h-10 flex items-center justify-start cursor-pointer my-1
          rounded-lg transition-colors duration-0
          ${select ? 'bg-blue-100' : 'hover:bg-gray-100'}
        `}
      >
        <div className={`
          flex-shrink-0 flex items-center justify-center ml-7
          ${select ? 'text-blue-500' : 'text-gray-600'}
        `}>
          {children}
        </div>

        {expanded && (
          <span className={`
            ml-2 font-light text-sm duration-300
            ${select ? 'text-blue-500' : 'text-gray-600'}
          `}>
            {text}
          </span>
        )}
      </div>
    </NavLink>
  );
};

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  select: PropTypes.bool,
};
