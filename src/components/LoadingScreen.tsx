import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Truck as Duck } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duckPosition, setDuckPosition] = useState(0);
  const [coins, setCoins] = useState<{ x: number; y: number; collected: boolean }[]>([]);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Generate random coins
    const newCoins = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 20, // 20-80%
      collected: false
    }));
    setCoins(newCoins);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Handle duck movement
  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    setDuckPosition(Math.max(0, Math.min(100, x)));

    // Check coin collection
    setCoins(prevCoins => 
      prevCoins.map(coin => {
        if (!coin.collected && 
            Math.abs(x - coin.x) < 10 && 
            Math.abs(80 - coin.y) < 10) {
          setScore(prev => prev + 100);
          return { ...coin, collected: true };
        }
        return coin;
      })
    );
  };

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center">
      <div 
        className="w-full max-w-2xl aspect-video bg-gray-800 rounded-2xl relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background grid effect */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-px opacity-10">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="bg-white/10" />
          ))}
        </div>

        {/* Duck character */}
        <motion.div
          className="absolute bottom-[20%] transform -translate-x-1/2"
          style={{ left: `${duckPosition}%` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Duck className="w-8 h-8 text-yellow-400" />
        </motion.div>

        {/* Coins */}
        {coins.map((coin, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              coin.collected ? 'bg-green-400' : 'bg-yellow-400'
            }`}
            style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
            animate={coin.collected ? { 
              scale: [1, 1.5, 0],
              opacity: [1, 1, 0]
            } : {
              y: [0, -5, 0]
            }}
            transition={{ duration: 1, repeat: coin.collected ? 0 : Infinity }}
          />
        ))}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-4xl font-bold text-blue-400 mb-4"
        >
          <Activity className="inline-block mr-2" />
          Loading SALAM DOT COM
        </motion.div>
        
        <div className="flex items-center justify-center gap-8 text-xl">
          <div className="text-gray-400">
            Loading: {Math.min(100, Math.round(progress))}%
          </div>
          <div className="text-yellow-400">
            Score: {score}
          </div>
        </div>

        <p className="mt-4 text-gray-500">
          Move your mouse to collect coins while you wait!
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;