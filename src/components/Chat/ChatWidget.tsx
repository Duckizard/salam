import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles, Eraser, Copy, Volume2, VolumeX, Settings, Download, XCircle } from 'lucide-react';
import { nanoid } from 'nanoid';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
  model: string;
  timestamp: Date;
}

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

const FREE_CHAT_MODELS = [
  { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo (Free)', icon: '🤖' },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B (Free)', icon: '🌟' },
  { id: 'anthropic/claude-2', name: 'Claude 2 (Free)', icon: '🧠' }
];

const TypingAnimation: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30 + Math.random() * 20);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-4 ml-1 bg-green-400 animate-pulse" />
      )}
    </span>
  );
};

const ChatWidget: React.FC<{ fullscreen?: boolean }> = ({ fullscreen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(FREE_CHAT_MODELS[0].id);
  const [sound, setSound] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [suggestions] = useState([
    "Tell me a story",
    "How can I learn programming?",
    "Write a poem"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollEnabledRef = useRef(true);
  const lastScrollPositionRef = useRef(0);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    
    autoScrollEnabledRef.current = isAtBottom;
    lastScrollPositionRef.current = scrollTop;
  };

  const scrollToBottom = (force = false) => {
    if (!chatContainerRef.current || (!autoScrollEnabledRef.current && !force)) return;
    
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && !lastMessage.isTyping) {
        scrollToBottom();
      }
    }
  }, [messages]);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const getModelMessages = (modelId: string) => {
    return messages.filter(msg => msg.model === modelId);
  };

  const playSound = (type: 'send' | 'receive') => {
    if (!sound) return;
    const audio = new Audio(type === 'send' ? '/sounds/send.mp3' : '/sounds/receive.mp3');
    audio.play();
  };

  const cancelResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!API_KEY) {
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: 'assistant',
        content: 'Error: OpenRouter API key not found. Please set the VITE_OPENROUTER_API_KEY environment variable.',
        model: selectedModel,
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: input,
      model: selectedModel,
      timestamp: new Date()
    };

    playSound('send');
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    scrollToBottom(true);

    const modelMessages = updatedMessages
      .filter(msg => msg.model === selectedModel)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': 'https://salam.com',
          'X-Title': 'SALAM DOT COM'
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: modelMessages,
          max_tokens: 1000,
          temperature,
          top_p: 0.9,
          stream: false
        }),
        signal: abortControllerRef.current.signal
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to get response');
      }

      playSound('receive');
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: data.choices[0].message.content,
        isTyping: true,
        model: selectedModel,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request cancelled');
      } else {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, {
          id: nanoid(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          model: selectedModel,
          timestamp: new Date()
        }]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const downloadChat = () => {
    const chatLog = currentModelMessages
      .map(msg => `${msg.role.toUpperCase()} [${new Date(msg.timestamp).toLocaleString()}]: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatLog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([]);
    autoScrollEnabledRef.current = true;
  };

  const currentModelMessages = getModelMessages(selectedModel);

  const chatContent = (
    <div className={`glass rounded-xl shadow-xl overflow-hidden flex flex-col ${
      fullscreen ? 'w-full h-full' : 'w-[600px]'
    }`}>
      <div className="p-4 bg-black/50 backdrop-blur-md flex justify-between items-center border-b border-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle size={20} className="text-primary" />
          Chat with Salam
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSound(!sound)}
            className="p-2 hover:bg-gray-900/50 rounded-xl transition-all duration-300"
            title={sound ? 'Mute' : 'Unmute'}
          >
            {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-900/50 rounded-xl transition-all duration-300"
            title="Settings"
          >
            <Settings size={18} />
          </button>
          {!fullscreen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-900/50 rounded-xl transition-all duration-300"
              title="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-900 border-t border-gray-800"
          >
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm mb-2">Temperature: {temperature}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Eraser size={16} />
                  Clear Chat
                </button>
                <button
                  onClick={downloadChat}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Download Chat
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-2 bg-gray-900 flex justify-between items-center space-x-2 border-t border-gray-800">
        <select
          value={selectedModel}
          onChange={(e) => handleModelChange(e.target.value)}
          className="flex-1 bg-gray-800 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {FREE_CHAT_MODELS.map(model => (
            <option key={model.id} value={model.id}>
              {model.icon} {model.name}
            </option>
          ))}
        </select>
      </div>

      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className={`${fullscreen ? 'flex-1' : 'h-[600px]'} overflow-y-auto p-4 space-y-4 bg-black`}
      >
        {currentModelMessages.length === 0 && (
          <div className="text-center text-gray-400">
            <Sparkles className="mx-auto mb-2" size={24} />
            <p className="mb-4">Start a conversation or try these suggestions:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-sm text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {currentModelMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`group relative max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-900 text-gray-200'
              }`}
            >
              <div className="absolute -top-6 right-0 flex items-center gap-1">
                <button
                  onClick={() => copyToClipboard(message.content)}
                  className="p-1 bg-gray-900 rounded hover:bg-gray-800 transition-colors"
                  title="Copy message"
                >
                  <Copy size={14} />
                </button>
              </div>
              {message.isTyping ? (
                <div className="flex items-center gap-2">
                  <TypingAnimation 
                    text={message.content} 
                    onComplete={() => {
                      setMessages(prev =>
                        prev.map(msg =>
                          msg.id === message.id
                            ? { ...msg, isTyping: false }
                            : msg
                        )
                      );
                    }} 
                  />
                  {isLoading && (
                    <button
                      onClick={cancelResponse}
                      className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      title="Cancel response"
                    >
                      <XCircle size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="mt-1 text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message... (Shift + Enter for new line)"
            className="flex-1 bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            style={{
              minHeight: '44px',
              maxHeight: '200px'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send size={24} />
            )}
          </button>
        </div>
      </form>
    </div>
  );

  if (fullscreen) {
    return chatContent;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50"
          >
            {chatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;