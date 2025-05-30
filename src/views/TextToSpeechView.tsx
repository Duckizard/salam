import React, { useState } from 'react';

interface TextToSpeechViewProps {
  isDarkMode: boolean;
}

const TextToSpeechView: React.FC<TextToSpeechViewProps> = ({ isDarkMode }) => {
  const [ttsText, setTtsText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsError, setTtsError] = useState('');

  // Function to handle text to speech
  const speakText = () => {
    if (!ttsText.trim()) {
      setTtsError("Please enter some text to speak.");
      return;
    }
    if ('speechSynthesis' in window) {
      setTtsError('');
      const utterance = new SpeechSynthesisUtterance(ttsText);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        setTtsError(`Speech synthesis error: ${event.error}`);
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTtsError("Text-to-speech is not supported in your browser.");
    }
  };

  // Function to stop text to speech
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-3xl bg-white bg-opacity-95 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-purple-200'}`}>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
        <span role="img" aria-label="speaker" className="mr-2">🔊</span> Text to Speech
      </h2>
      <p className={`text-base sm:text-lg mb-4 sm:mb-6 text-center leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Convert any text into natural-sounding speech.
      </p>

      <div className={`mb-6 p-4 sm:p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-100'}`}>
        <label htmlFor="ttsText" className={`block text-base sm:text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Enter text to speak:</label>
        <textarea
          id="ttsText"
          value={ttsText}
          onChange={(e) => setTtsText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={6}
          className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm resize-y ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
          disabled={isSpeaking}
        ></textarea>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={speakText}
            className="flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-base sm:text-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSpeaking || ttsText.trim() === ''}
          >
            {isSpeaking ? (
              <span className="flex items-center justify-center">
                <svg className="animate-pulse -ml-1 mr-3 h-5 w-5 text-white\" fill="currentColor\" viewBox="0 0 20 20\" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd\" d="M9.381 4.566A8.969 8.969 0 0112 3a8.969 8.969 0 012.619 1.566c.323.21.6.474.829.776C15.897 6.375 16.5 7.766 16.5 9.5c0 1.734-.603 3.125-1.052 4.158a3.5 3.5 0 01-.829.776A8.969 8.969 0 0112 16.5c-1.734 0-3.125-.603-4.158-1.052a3.5 3.5 0 01-.776-.829A8.969 8.969 0 014.5 12c0-1.734.603-3.125 1.052-4.158a3.5 3.5 0 01.776-.829zM12 10a2 2 0 100-4 2 2 0 000 4z\" clipRule="evenodd"></path>
                </svg>
                Speaking...
              </span>
            ) : 'Speak Text'}
          </button>
          <button
            onClick={stopSpeaking}
            className="flex-grow bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-base sm:text-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isSpeaking}
          >
            Stop
          </button>
        </div>
      </div>

      {ttsError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6 shadow-md" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {ttsError}</span>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechView;