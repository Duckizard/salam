import React from 'react';
import { PROXY_LIST } from '../data/proxyData';

interface ProxyViewProps {
  isDarkMode: boolean;
}

const ProxyView: React.FC<ProxyViewProps> = ({ isDarkMode }) => {
  return (
    <div className={`flex flex-col w-full max-w-4xl bg-white bg-opacity-95 rounded-3xl shadow-2xl h-[85vh] overflow-hidden animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-purple-200'}`}>
      <h2 className={`text-2xl sm:text-3xl font-bold p-4 sm:p-6 border-b ${isDarkMode ? 'dark:text-purple-300 dark:border-gray-700' : 'text-purple-700 border-gray-200'}`}>Available Proxies</h2>
      <div className={`flex-grow p-4 sm:p-6 overflow-y-auto custom-scrollbar ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
        {PROXY_LIST.length === 0 ? (
          <div className={`flex items-center justify-center h-full text-lg sm:text-xl italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No proxies available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PROXY_LIST.map((proxy, index) => (
              <a
                key={index}
                href={proxy.url.startsWith('http') ? proxy.url : `https://${proxy.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 group border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gray-50 border-gray-100'}`}
              >
                <h3 className={`text-base sm:text-lg font-semibold group-hover:text-purple-800 transition-colors duration-200 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  {proxy.name}
                </h3>
                <p className={`text-xs sm:text-sm truncate group-hover:text-gray-800 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {proxy.url}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProxyView;