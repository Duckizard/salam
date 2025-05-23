import React from 'react';
import { Activity, Eye, EyeOff, Play, Pause } from 'lucide-react';
import { useStore } from '../../store';

const Header: React.FC = () => {
  const { showControls, toggleControls, isAnimating, toggleAnimation } = useStore();

  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center gap-2">
        <Activity className="text-primary-400" size={24} />
        <h1 className="text-xl font-semibold tracking-tight">
          Duckizard Made By Charbel
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={toggleAnimation}
          className="btn btn-ghost flex items-center gap-1 text-sm"
          title={isAnimating ? 'Pause Animation' : 'Start Animation'}
        >
          {isAnimating ? (
            <>
              <Pause size={16} />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span className="hidden sm:inline">Start</span>
            </>
          )}
        </button>
        
        <button
          onClick={toggleControls}
          className="btn btn-ghost flex items-center gap-1 text-sm"
          title={showControls ? 'Hide Controls' : 'Show Controls'}
        >
          {showControls ? (
            <>
              <EyeOff size={16} />
              <span className="hidden sm:inline">Hide Controls</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span className="hidden sm:inline">Show Controls</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;