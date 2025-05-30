import React, { useState, useEffect } from 'react';
import { CLOAK_OPTIONS } from '../data/cloakingData';

interface CloakerViewProps {
  isDarkMode: boolean;
}

const CloakerView: React.FC<CloakerViewProps> = ({ isDarkMode }) => {
  const [customTabTitle, setCustomTabTitle] = useState('');
  
  // Store original title and favicon to revert later
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalFavicon, setOriginalFavicon] = useState('');

  // Store current title and favicon
  useEffect(() => {
    setOriginalTitle(document.title);
    setOriginalFavicon(getFaviconHref());
  }, []);

  // Function to get the current favicon href
  function getFaviconHref() {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    return link.href;
  }

  // Function to set the favicon
  function setFavicon(href: string) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    (link as HTMLLinkElement).href = href;
  }

  // Function to apply cloaking
  const applyCloak = (title: string, favicon: string) => {
    document.title = title;
    setFavicon(favicon);
  };

  // Function to reset cloaking
  const resetCloak = () => {
    document.title = originalTitle;
    setFavicon(originalFavicon);
  };

  return (
    <div className={`flex flex-col w-full max-w-3xl bg-white bg-opacity-95 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-purple-200'}`}>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
        <span role="img" aria-label="disguise" className="mr-2">🎭</span> Tab Cloaker
      </h2>
      <p className={`text-base sm:text-lg mb-4 sm:mb-6 text-center leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Change your browser tab's title and icon to hide your activity. Perfect for quick discretion!
      </p>

      <div className={`mb-6 p-4 sm:p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-100'}`}>
        <label htmlFor="customTitle" className={`block text-base sm:text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Custom Tab Title:</label>
        <input
          type="text"
          id="customTitle"
          value={customTabTitle}
          onChange={(e) => setCustomTabTitle(e.target.value)}
          placeholder="e.g., 'My Homework', 'Meeting Notes'"
          className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
        />
        <button
          onClick={() => applyCloak(customTabTitle, getFaviconHref())} // Keep current favicon for custom title
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-base sm:text-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Apply Custom Title
        </button>
      </div>

      <div className={`mb-6 p-4 sm:p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-100'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Quick Cloak Options:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {CLOAK_OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => applyCloak(option.title, option.favicon)}
              className={`flex items-center justify-center p-3 rounded-xl shadow-sm hover:border-purple-300 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 hover:dark:bg-gray-500' : 'bg-white border border-gray-200 hover:bg-purple-50'}`}
            >
              <img 
                src={option.favicon} 
                alt={option.name} 
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }} 
              />
              <span className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetCloak}
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-base sm:text-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        Reset Tab
      </button>
    </div>
  );
};

export default CloakerView;