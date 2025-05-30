import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import ProxyView from './views/ProxyView';
import CloakerView from './views/CloakerView';
import ImageGenView from './views/ImageGenView';
import TextToSpeechView from './views/TextToSpeechView';
import UnitConverterView from './views/UnitConverterView';
import { useDarkMode } from './hooks/useDarkMode';
import './styles/animations.css';

function App() {
  // State to manage the current view
  const [currentView, setCurrentView] = useState('home');
  
  // Use custom hook for dark mode
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen font-inter flex flex-col antialiased transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800'}`}>
      {/* Header */}
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-6 sm:p-8">
        {currentView === 'home' ? (
          <HomeView isDarkMode={isDarkMode} setCurrentView={setCurrentView} />
        ) : currentView === 'chat' ? (
          <ChatView isDarkMode={isDarkMode} />
        ) : currentView === 'proxy' ? (
          <ProxyView isDarkMode={isDarkMode} />
        ) : currentView === 'cloaker' ? (
          <CloakerView isDarkMode={isDarkMode} />
        ) : currentView === 'image-gen' ? (
          <ImageGenView isDarkMode={isDarkMode} />
        ) : currentView === 'text-to-speech' ? (
          <TextToSpeechView isDarkMode={isDarkMode} />
        ) : (
          <UnitConverterView isDarkMode={isDarkMode} />
        )}
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;