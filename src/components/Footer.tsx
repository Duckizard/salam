import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`bg-gray-900 text-white p-4 text-center text-sm rounded-t-xl mt-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
      &copy; {new Date().getFullYear()} Salam AI. All rights reserved.
    </footer>
  );
};