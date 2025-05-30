import React from 'react';

interface NavButtonProps {
  onClick: () => void;
  isActive: boolean;
  isDarkMode: boolean;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ 
  onClick, 
  isActive, 
  isDarkMode, 
  label 
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
        isActive 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
          : `${isDarkMode ? 'text-purple-300 hover:bg-purple-900' : 'text-purple-700 hover:bg-purple-100'}`
      }`}
    >
      {label}
    </button>
  );
};

export default NavButton;