import React from 'react';
import { motion } from 'framer-motion';
import { Code, Gamepad2, Heart, Shield, Star, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8 text-blue-500" />,
      title: "Unblocked Games",
      description: "Access a wide variety of fun and engaging games, playable directly in your browser."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Safe & Secure",
      description: "All games are thoroughly vetted and safe to play. Your security is our top priority."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Community",
      description: "Join our growing community of gamers and make new friends while playing."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Regular Updates",
      description: "New games added regularly to keep the content fresh and exciting."
    },
    {
      icon: <Code className="w-8 h-8 text-red-500" />,
      title: "Modern Technology",
      description: "Built with cutting-edge web technologies for the best gaming experience."
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "Made with Love",
      description: "Crafted with passion by gamers, for gamers."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">About Duckizard</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to Duckizard, your premier destination for unblocked browser games.
            We're passionate about bringing you the best gaming experience possible,
            completely free and accessible from anywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              At Duckizard, we believe that gaming should be accessible to everyone,
              anywhere. Our mission is to provide a safe, engaging, and fun gaming
              platform that brings people together through the power of play.
            </p>
            <p className="text-gray-300 mb-4">
              We carefully curate our game selection to ensure there's something for
              everyone, from classic arcade games to modern puzzle challenges. Our
              platform is constantly evolving, with new games and features added
              regularly to keep the experience fresh and exciting.
            </p>
            <p className="text-gray-300">
              Whether you're looking to take a quick break, challenge your friends,
              or just have some fun, Duckizard is here for you. Join our community
              today and discover why thousands of players choose us for their gaming
              entertainment.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;