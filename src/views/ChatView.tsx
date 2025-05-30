import React, { useState, useRef } from 'react';
import AiFeaturesModal from '../components/AiFeaturesModal';
import { useChat } from '../hooks/useChat';

interface ChatViewProps {
  isDarkMode: boolean;
}

const ChatView: React.FC<ChatViewProps> = ({ isDarkMode }) => {
  // Chat state
  const { 
    chatHistory, 
    message, 
    setMessage, 
    isLoading, 
    isTyping, 
    isFeatureLoading, 
    sendMessage, 
    resetChat,
    abortController,
    summarizeChat,
    generateCreativeResponse,
    analyzeSentiment,
    suggestFollowUpQuestions,
    translateText,
    generateIdea,
    extractKeywords,
    rephraseText,
    checkGrammarSpelling,
    elaborateText,
    explainCode,
    generateRecipe,
    factCheck,
    generateProsCons
  } = useChat();

  // Modal state
  const [showAiFeaturesModal, setShowAiFeaturesModal] = useState(false);
  
  // Ref for chat end (kept for potential future use)
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textarea);
  };

  // Function to handle key presses in the input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && !isFeatureLoading) {
      sendMessage();
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-4xl bg-white bg-opacity-95 rounded-3xl shadow-2xl h-[85vh] overflow-hidden animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-purple-200'}`}>
      {/* Chat History Display */}
      <div className={`flex-grow p-4 sm:p-6 overflow-y-auto custom-scrollbar ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
        {chatHistory.length === 0 ? (
          <div className={`flex items-center justify-center h-full text-lg sm:text-xl italic animate-fade-in ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Start a conversation! Type your message below.
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 sm:mb-4 animate-slide-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-300 ease-in-out ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-br-none'
                    : `${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'} rounded-bl-none`
                }`}
              >
                {/* Render parts of the message, handling code blocks */}
                {msg.parts[0].text.split(/(```[\s\S]*?```)/g).map((part, partIndex) => {
                  if (part.startsWith('```') && part.endsWith('```')) {
                    const codeContent = part.substring(3, part.length - 3); // Remove backticks
                    const lines = codeContent.split('\n');
                    let language = 'plaintext';
                    let actualCode = codeContent;

                    if (lines.length > 0 && lines[0].trim().length > 0 && !lines[0].includes(' ')) {
                      language = lines[0].trim();
                      actualCode = lines.slice(1).join('\n');
                    }

                    return (
                      <div key={partIndex} className="relative my-2 bg-gray-800 rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-700 px-4 py-2 text-xs font-mono text-gray-300">
                          <span>{language.toUpperCase()}</span>
                          <button
                            onClick={() => copyToClipboard(actualCode)}
                            className="flex items-center text-gray-300 hover:text-white px-2 py-1 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1.414l.707-.707A2 2 0 0021 16.586V14a2 2 0 00-2-2h-2.586l.707-.707A2 2 0 0015.414 8H14a2 2 0 00-2-2V4a2 2 0 00-2-2H8z" />
                            </svg>
                            Copy
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-gray-100">
                          <code>{actualCode}</code>
                        </pre>
                      </div>
                    );
                  }
                  return <span key={partIndex}>{part}</span>;
                })}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} /> {/* Scroll target */}
      </div>

      {/* Loading Indicator / Typing Animation */}
      {(isLoading || isFeatureLoading || isTyping) && (
        <div className={`px-4 py-2 sm:px-6 sm:py-3 text-center font-medium text-base sm:text-lg flex items-center justify-center space-x-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          <span>AI is typing</span>
          <span className="dot dot1">.</span>
          <span className="dot dot2">.</span>
          <span className="dot dot3">.</span>
        </div>
      )}

      {/* Chat Input Area */}
      <div className={`p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center bg-gray-50 bg-opacity-90 rounded-b-3xl ${isDarkMode ? 'dark:bg-gray-900 dark:border-gray-700' : ''}`}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className={`flex-grow w-full sm:w-auto p-3 sm:p-4 border rounded-full focus:outline-none focus:ring-3 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm mb-3 sm:mb-0 sm:mr-4 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100' : 'border-gray-300'}`}
          disabled={isLoading || isFeatureLoading}
        />
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
          {isLoading || isFeatureLoading ? (
            <button
              onClick={() => abortController?.abort()} // Abort the fetch request
              className="flex-grow bg-red-500 hover:bg-red-600 text-white p-3 sm:p-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 text-sm sm:text-base"
            >
              Stop
            </button>
          ) : (
            <>
              <button
                onClick={sendMessage}
                className="flex-grow bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-3 sm:p-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={isLoading || isFeatureLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <button
                onClick={() => setShowAiFeaturesModal(true)}
                className="flex-grow bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold p-3 sm:p-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 text-sm sm:text-base"
                disabled={isLoading || isFeatureLoading}
              >
                ✨ AI Features
              </button>
              <button
                onClick={resetChat}
                className="flex-grow bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold p-3 sm:p-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={isLoading || isFeatureLoading}
              >
                🔄 Reset Chat
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* AI Features Modal */}
      {showAiFeaturesModal && (
        <AiFeaturesModal 
          isDarkMode={isDarkMode}
          closeModal={() => setShowAiFeaturesModal(false)}
          isLoading={isLoading}
          isFeatureLoading={isFeatureLoading}
          features={{
            summarizeChat,
            generateCreativeResponse,
            analyzeSentiment,
            suggestFollowUpQuestions,
            translateText,
            generateIdea,
            extractKeywords,
            rephraseText,
            checkGrammarSpelling,
            elaborateText,
            explainCode,
            generateRecipe,
            factCheck,
            generateProsCons
          }}
        />
      )}
    </div>
  );
};

export default ChatView;