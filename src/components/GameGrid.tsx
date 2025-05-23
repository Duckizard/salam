import React from 'react';
import { motion } from 'framer-motion';
import GameCard from './GameCard';
import { games } from '../data/games';

const GameGrid = () => {
  return (
    <div className="grid gap-4">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <GameCard game={game} />
        </motion.div>
      ))}
    </div>
  );
};

export default GameGrid;