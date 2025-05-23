import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time - in a real app, this would be based on actual asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!loading) return null;
  
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background-dark">
      <Activity className="text-primary-400 animate-pulse w-16 h-16 mb-6" />
      
      <h1 className="text-2xl font-semibold text-white mb-4">
        Loading Particle Visualizer
      </h1>
      
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 animate-pulse-slow rounded-full" />
      </div>
    </div>
  );
};

export default LoadingScreen;