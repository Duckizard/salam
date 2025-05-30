import React from 'react';
import NavButton from './NavButton';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  isDarkMode, 
  toggleDarkMode 
}) => {
  return (
    <header className={`bg-white bg-opacity-95 backdrop-blur-md shadow-xl p-4 flex justify-between items-center sticky top-0 z-20 rounded-b-3xl transition-colors duration-300 ${isDarkMode ? 'dark:bg-gray-800 dark:bg-opacity-95 dark:shadow-2xl' : ''}`}>
      <h1 className={`text-4xl font-extrabold animate-fade-in-down ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Salam AI</h1>
      <nav className="flex flex-wrap justify-center sm:justify-end gap-x-2 gap-y-1">
        <NavButton
          onClick={() => setCurrentView('home')}
          isActive={currentView === 'home'}
          isDarkMode={isDarkMode}
          label="Home"
        />
        <NavButton
          onClick={() => setCurrentView('chat')}
          isActive={currentView === 'chat'}
          isDarkMode={isDarkMode}
          label="Chat"
        />
        <NavButton
          onClick={() => setCurrentView('proxy')}
          isActive={currentView === 'proxy'}
          isDarkMode={isDarkMode}
          label="Proxy"
        />
        <NavButton
          onClick={() => setCurrentView('cloaker')}
          isActive={currentView === 'cloaker'}
          isDarkMode={isDarkMode}
          label="Tab Cloaker"
        />
        <NavButton
          onClick={() => setCurrentView('image-gen')}
          isActive={currentView === 'image-gen'}
          isDarkMode={isDarkMode}
          label="Image Generator"
        />
        <NavButton
          onClick={() => setCurrentView('text-to-speech')}
          isActive={currentView === 'text-to-speech'}
          isDarkMode={isDarkMode}
          label="Text to Speech"
        />
        <NavButton
          onClick={() => setCurrentView('unit-converter')}
          isActive={currentView === 'unit-converter'}
          isDarkMode={isDarkMode}
          label="Unit Converter"
        />
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105
            ${isDarkMode ? 'bg-gray-700 text-yellow-300 shadow-lg' : 'bg-white text-yellow-600 border border-yellow-400 shadow-md hover:bg-yellow-100'}`}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg\" className="h-5 w-5\" viewBox="0 0 20 20\" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};