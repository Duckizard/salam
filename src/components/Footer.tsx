import React from 'react';
import { MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <MessageSquare className="w-8 h-8 text-primary mb-4" />
          <p className="text-gray-400">
            © 2024 SALAM DOT COM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;