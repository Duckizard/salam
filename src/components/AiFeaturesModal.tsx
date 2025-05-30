import React from 'react';

interface AiFeaturesModalProps {
  isDarkMode: boolean;
  closeModal: () => void;
  isLoading: boolean;
  isFeatureLoading: boolean;
  features: {
    summarizeChat: () => void;
    generateCreativeResponse: () => void;
    analyzeSentiment: () => void;
    suggestFollowUpQuestions: () => void;
    translateText: () => void;
    generateIdea: () => void;
    extractKeywords: () => void;
    rephraseText: () => void;
    checkGrammarSpelling: () => void;
    elaborateText: () => void;
    explainCode: () => void;
    generateRecipe: () => void;
    factCheck: () => void;
    generateProsCons: () => void;
  };
}

const AiFeaturesModal: React.FC<AiFeaturesModalProps> = ({ 
  isDarkMode, 
  closeModal, 
  isLoading, 
  isFeatureLoading, 
  features 
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full animate-fade-in-up transform scale-95 transition-all duration-300 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>AI Features</h3>
          <button
            onClick={closeModal}
            className={`text-gray-500 hover:text-gray-700 transition-colors duration-200 ${isDarkMode ? 'dark:text-gray-400 hover:dark:text-gray-200' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureButton 
            onClick={features.summarizeChat} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:ring-green-300"
            label="Summarize Chat"
          />
          <FeatureButton 
            onClick={features.generateCreativeResponse} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-orange-300"
            label="Creative Response"
          />
          <FeatureButton 
            onClick={features.analyzeSentiment} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-300"
            label="Analyze Sentiment"
          />
          <FeatureButton 
            onClick={features.suggestFollowUpQuestions} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-purple-300"
            label="Suggest Questions"
          />
          <FeatureButton 
            onClick={features.translateText} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 focus:ring-yellow-300"
            label="Translate"
          />
          <FeatureButton 
            onClick={features.generateIdea} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 focus:ring-lime-300"
            label="Generate Idea"
          />
          <FeatureButton 
            onClick={features.extractKeywords} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-300"
            label="Extract Keywords"
          />
          <FeatureButton 
            onClick={features.rephraseText} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 focus:ring-pink-300"
            label="Rephrase Text"
          />
          <FeatureButton 
            onClick={features.checkGrammarSpelling} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-indigo-300"
            label="Grammar & Spelling"
          />
          <FeatureButton 
            onClick={features.elaborateText} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 focus:ring-gray-300"
            label="Elaborate Text"
          />
          <FeatureButton 
            onClick={features.explainCode} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 focus:ring-emerald-300"
            label="Code Explainer"
          />
          <FeatureButton 
            onClick={features.generateRecipe} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 focus:ring-rose-300"
            label="Recipe Generator"
          />
          <FeatureButton 
            onClick={features.factCheck} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 focus:ring-indigo-300"
            label="Fact Check"
          />
          <FeatureButton 
            onClick={features.generateProsCons} 
            isDisabled={isLoading || isFeatureLoading}
            className="from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 focus:ring-teal-300"
            label="Pros & Cons"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  className: string;
  label: string;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ onClick, isDisabled, className, label }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${className} text-white font-semibold p-4 rounded-xl shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed text-base`}
      disabled={isDisabled}
    >
      ✨ {label}
    </button>
  );
};

export default AiFeaturesModal;