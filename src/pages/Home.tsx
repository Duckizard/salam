import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Brain, Bot } from 'lucide-react';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-12"
    >
      <section className="text-center py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold mb-6 text-white">
            Welcome to SALAM DOT COM
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of AI communication. Engage in meaningful conversations, get answers, and explore the possibilities of artificial intelligence.
          </p>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <MessageSquare className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-3">Natural Conversations</h2>
          <p className="text-gray-300">
            Engage in fluid, context-aware conversations that feel natural and meaningful.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <Brain className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-3">Advanced Intelligence</h2>
          <p className="text-gray-300">
            Powered by state-of-the-art language models for accurate and insightful responses.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <Sparkles className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-3">Creative Assistant</h2>
          <p className="text-gray-300">
            Get help with writing, brainstorming, and creative projects.
          </p>
        </motion.div>
      </section>

      <section className="mt-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass p-8 rounded-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <Bot className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Start a Conversation</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-300">
                Try asking about:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Writing and content creation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Technical explanations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Problem-solving assistance
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <button 
                onClick={() => window.location.href = '/chat'}
                className="btn px-8 py-3 text-lg font-semibold"
              >
                Start Chatting
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;