import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 py-3 flex justify-between items-center bg-gradient-to-t from-black/40 to-transparent text-xs">
      <div className="text-white/60">
        Duckizard By Charbel • Made with React Three Fiber
      </div>
      
      <div className="flex items-center gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          title="View on GitHub"
        >
          <Github size={16} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;