import React from 'react';

interface HomeViewProps {
  isDarkMode: boolean;
  setCurrentView: (view: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ isDarkMode, setCurrentView }) => {
  const FeatureCard = ({ 
    emoji, 
    title, 
    description, 
    buttonText, 
    viewName, 
    delayClass 
  }: { 
    emoji: string, 
    title: string, 
    description: string, 
    buttonText: string, 
    viewName: string, 
    delayClass: string 
  }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100' : 'border-purple-100'} transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up ${delayClass}`}>
      <div className={`text-5xl mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{emoji}</div>
      <h4 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>{title}</h4>
      <p className={`text-gray-700 text-md leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{description}</p>
      <button
        onClick={() => setCurrentView(viewName)}
        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-5 rounded-full text-sm shadow-md transition-all duration-300 hover:scale-105"
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className={`flex flex-col items-center w-full max-w-5xl ${isDarkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <div className={`bg-white bg-opacity-95 p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-3xl transform transition-all duration-700 ease-out animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100' : 'border-purple-200'} mb-12`}>
        <h2 className={`text-5xl sm:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight animate-bounce-in ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
          Welcome to <span className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Salam AI</span>
        </h2>
        <p className={`text-xl sm:text-2xl mb-8 sm:mb-10 leading-relaxed animate-fade-in delay-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Your intelligent companion for insightful conversations and creative explorations.
          Discover the power of AI at your fingertips.
        </p>
        <button
          onClick={() => setCurrentView('chat')}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg sm:text-xl shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-pulse-once"
        >
          Start Chatting Now!
        </button>
      </div>

      {/* Features Overview Section */}
      <div className="w-full text-center mb-12">
        <h3 className={`text-4xl font-extrabold mb-8 animate-fade-in-up delay-300 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
          Explore Our Powerful Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <FeatureCard 
            emoji="💬" 
            title="AI Chat" 
            description="Engage in intelligent conversations and leverage advanced AI capabilities for summaries, creative writing, and more." 
            buttonText="Go to Chat" 
            viewName="chat" 
            delayClass="delay-400" 
          />
          <FeatureCard 
            emoji="🎨" 
            title="Image Generator" 
            description="Unleash your creativity by generating stunning images from simple text descriptions using cutting-edge AI." 
            buttonText="Generate Images" 
            viewName="image-gen" 
            delayClass="delay-500" 
          />
          <FeatureCard 
            emoji="🌐" 
            title="Web Proxies" 
            description="Access a curated list of working web proxies to browse the internet securely and privately." 
            buttonText="Browse Proxies" 
            viewName="proxy" 
            delayClass="delay-600" 
          />
          <FeatureCard 
            emoji="🎭" 
            title="Tab Cloaker" 
            description="Instantly change your browser tab's title and icon for quick discretion and privacy." 
            buttonText="Cloak Tab" 
            viewName="cloaker" 
            delayClass="delay-700" 
          />
          <FeatureCard 
            emoji="🔊" 
            title="Text to Speech" 
            description="Convert any written text into natural-sounding spoken words directly in your browser." 
            buttonText="Try Text to Speech" 
            viewName="text-to-speech" 
            delayClass="delay-800" 
          />
          <FeatureCard 
            emoji="📏" 
            title="Unit Converter" 
            description="Quickly convert between various units of length, weight, and temperature with ease." 
            buttonText="Convert Units" 
            viewName="unit-converter" 
            delayClass="delay-900" 
          />
        </div>
      </div>

      {/* About the Creator Section */}
      <div className="w-full text-center mb-12">
        <h3 className={`text-4xl font-extrabold mb-8 animate-fade-in-up delay-1000 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
          Meet the Creator
        </h3>
        <div className={`flex flex-col md:flex-row items-center justify-center bg-white p-8 rounded-3xl shadow-2xl border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100' : 'border-purple-200'} animate-fade-in-up delay-1100`}>
          <img
            src="https://media.discordapp.net/attachments/1244593141877571655/1377924648712273991/image.png?ex=683abbd4&is=68396a54&hm=4213c194fdd7b8e25c48de322b93c17b0e73c6d4da7527c5cc4091e3be36abf6&=&format=webp&quality=lossless"
            alt="Creator of Salam AI"
            className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-purple-300 mb-6 md:mb-0 md:mr-8"
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src="https://placehold.co/200x200/e0e0e0/555555?text=Creator+Image+Error"; 
            }}
          />
          <div className="text-left max-w-lg">
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Hello! I'm the creator behind Salam AI, a project born from a passion for exploring the capabilities of artificial intelligence and making powerful tools accessible. My goal is to build intuitive and engaging applications that leverage AI to enhance daily interactions and spark creativity.
            </p>
            <p className={`text-lg leading-relaxed mt-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              I believe in the potential of AI to simplify complex tasks and open new avenues for learning and expression. Thank you for visiting Salam AI, and I hope you enjoy exploring its features!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;