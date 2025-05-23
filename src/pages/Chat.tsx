import React from 'react';
import ChatWidget from '../components/Chat/ChatWidget';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-900">
      <ChatWidget fullscreen />
    </div>
  );
};

export default Chat;