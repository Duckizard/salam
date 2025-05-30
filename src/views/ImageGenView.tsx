import React, { useState } from 'react';

interface ImageGenViewProps {
  isDarkMode: boolean;
}

const ImageGenView: React.FC<ImageGenViewProps> = ({ isDarkMode }) => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState('');

  // Function to generate an image using Imagen
  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      setImageError("Please enter a prompt to generate an image.");
      return;
    }

    setGeneratedImageUrl(''); // Clear previous image
    setImageError(''); // Clear previous error
    setIsGeneratingImage(true); // Show loading indicator

    try {
      const payload = { instances: { prompt: imagePrompt }, parameters: { "sampleCount": 1} };
      const apiKey = ""; // API key is provided by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
        setGeneratedImageUrl(imageUrl);
      } else {
        setImageError("Failed to generate image. Please try a different prompt.");
        console.error("Image generation API response was unexpected:", result);
      }
    } catch (error) {
      setImageError("An error occurred during image generation. Please try again.");
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false); // Hide loading indicator
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-3xl bg-white bg-opacity-95 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-purple-200'}`}>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>AI Image Generator</h2>
      <p className={`text-base sm:text-lg mb-4 sm:mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Generate unique images from text prompts using AI.</p>

      <div className={`mb-6 p-4 sm:p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-100'}`}>
        <label htmlFor="imagePrompt" className={`block text-base sm:text-lg font-medium mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Enter your image prompt:</label>
        <input
          type="text"
          id="imagePrompt"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          placeholder="Describe the image you want to generate (e.g., 'A futuristic city at sunset')"
          className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
          disabled={isGeneratingImage}
        />
        <button
          onClick={generateImage}
          className="mt-4 sm:mt-5 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-base sm:text-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGeneratingImage}
        >
          {isGeneratingImage ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Image...
            </span>
          ) : 'Generate Image'}
        </button>
      </div>

      {imageError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6 shadow-md" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {imageError}</span>
        </div>
      )}

      {generatedImageUrl && !isGeneratingImage && (
        <div className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
          <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Your Generated Image:</h3>
          <img
            src={generatedImageUrl}
            alt="Generated by AI"
            className={`max-w-full h-auto rounded-lg shadow-lg border ${isDarkMode ? 'dark:border-gray-500' : 'border-gray-300'} transition-all duration-300 hover:scale-102`}
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src="https://placehold.co/400x300/e0e0e0/555555?text=Image+Load+Error"; 
              setImageError("Image could not be loaded."); 
            }}
          />
          <a
            href={generatedImageUrl}
            download="salam_ai_generated_image.png"
            className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-base sm:text-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageGenView;