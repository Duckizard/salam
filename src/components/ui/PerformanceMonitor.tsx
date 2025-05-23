import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

const PerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [showMonitor, setShowMonitor] = useState(false);
  
  useEffect(() => {
    if (!showMonitor) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    
    const updateFps = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(updateFps);
    };
    
    const animationId = requestAnimationFrame(updateFps);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [showMonitor]);
  
  return (
    <div className="absolute bottom-10 left-4 z-10">
      <button
        onClick={() => setShowMonitor(!showMonitor)}
        className="btn btn-ghost flex items-center gap-1 mb-2"
        title="Toggle Performance Monitor"
      >
        <Activity size={16} />
        <span>
          {showMonitor ? 'Hide Stats' : 'Show Stats'}
        </span>
      </button>
      
      {showMonitor && (
        <div className="glass-panel px-3 py-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">FPS:</span>
            <span className={`font-mono ${getFpsColor(fps)}`}>{fps}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to determine color based on FPS value
const getFpsColor = (fps: number): string => {
  if (fps >= 50) return 'text-success-400';
  if (fps >= 30) return 'text-warning-400';
  return 'text-error-400';
};

export default PerformanceMonitor;