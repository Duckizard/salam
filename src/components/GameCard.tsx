import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={game.url}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold">{game.title}</h3>
          <p className="text-sm text-gray-400">{game.category}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
          <Play size={20} />
        </button>
      </motion.div>
    </Link>
  );
};

export default GameCard;