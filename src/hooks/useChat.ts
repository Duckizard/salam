import { useState, useRef } from 'react';

// Interface for chat message
interface ChatMessage {
  role: string;
  parts: { text: string }[];
}

export const useChat = () => {
  // State to store the chat history
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  // State to store the current message being typed by the user
  const [message, setMessage] = useState('');
  // State to indicate if the AI is currently generating a response (for main chat)
  const [isLoading, setIsLoading] = useState(false);
  // State to control the AbortController for stopping fetch requests
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  // State to control the typing animation for the AI
  const [isTyping, setIsTyping] = useState(false);
  // State to indicate if a special LLM feature (summarize/creative/sentiment/questions) is loading
  const [isFeatureLoading, setIsFeatureLoading] = useState(false);

  // Function to call the Gemini API for text generation
  const callGeminiAPI = async (promptContent: string, currentChatHistory: ChatMessage[], controller: AbortController) => {
    setIsTyping(true); // Start typing animation
    setIsFeatureLoading(true); // Indicate feature is loading

    try {
      const payload = {
        contents: currentChatHistory, // Send relevant chat history for context
      };
      const apiKey = ""; // API key is provided by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal, // Attach the abort signal
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        return "Sorry, I couldn't get a response. Please try again.";
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted by user');
        return "Operation stopped.";
      } else {
        console.error('Error calling Gemini API:', error);
        return "An error occurred. Please check your network connection.";
      }
    } finally {
      setIsTyping(false); // Stop typing animation
      setIsFeatureLoading(false); // Hide feature loading indicator
    }
  };

  // Function to send a message to the AI (main chat)
  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages

    const userMessage = { role: 'user', parts: [{ text: message }] };
    setChatHistory((prev) => [...prev, userMessage]); // Add user message to history
    setMessage(''); // Clear the input field
    setIsLoading(true); // Show loading indicator

    const controller = new AbortController();
    setAbortController(controller);

    const aiResponseText = await callGeminiAPI(message, [...chatHistory, userMessage], controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: aiResponseText }] }]);

    setIsLoading(false); // Hide loading indicator
    setAbortController(null); // Clear the abort controller
  };

  // Function to reset chat history
  const resetChat = () => {
    setChatHistory([]);
    setMessage('');
    setIsLoading(false);
    setIsTyping(false);
    setIsFeatureLoading(false);
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Chat history has been cleared!" }] }]);
  };

  // Function to summarize the chat history
  const summarizeChat = async () => {
    if (chatHistory.length === 0) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "There's no conversation to summarize yet!" }] }]);
      return;
    }

    const summaryPrompt = {
      role: 'user',
      parts: [{ text: "Please provide a concise summary of the following conversation history:" }]
    };
    const conversationForSummary = [...chatHistory, summaryPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const summaryText = await callGeminiAPI("Summarize chat", conversationForSummary, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Summary:** ${summaryText}` }] }]);
    setAbortController(null);
  };

  // Function to generate a creative response based on the last user message
  const generateCreativeResponse = async () => {
    const lastUserMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please send a message first to get a creative response!" }] }]);
      return;
    }

    const creativePrompt = {
      role: 'user',
      parts: [{ text: `Generate a creative and imaginative response (e.g., a short story, poem, or unique idea) based on this: "${lastUserMessage.parts[0].text}"` }]
    };
    const conversationForCreative = [...chatHistory, creativePrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const creativeText = await callGeminiAPI("Creative response", conversationForCreative, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Creative Spark:** ${creativeText}` }] }]);
    setAbortController(null);
  };

  // Function to analyze the sentiment of the last user message
  const analyzeSentiment = async () => {
    const lastUserMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please send a message first to analyze its sentiment!" }] }]);
      return;
    }

    const sentimentPrompt = {
      role: 'user',
      parts: [{ text: `Analyze the sentiment of the following text and classify it as positive, negative, or neutral, along with a brief explanation: "${lastUserMessage.parts[0].text}"` }]
    };
    const conversationForSentiment = [...chatHistory, sentimentPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const sentimentText = await callGeminiAPI("Analyze sentiment", conversationForSentiment, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Sentiment Analysis:** ${sentimentText}` }] }]);
    setAbortController(null);
  };

  // Function to suggest follow-up questions based on the last AI response
  const suggestFollowUpQuestions = async () => {
    const lastAiResponse = chatHistory.slice().reverse().find(msg => msg.role === 'model');
    if (!lastAiResponse) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "No AI response to suggest questions for yet!" }] }]);
      return;
    }

    const questionsPrompt = {
      role: 'user',
      parts: [{ text: `Based on the following AI response, suggest 2-3 concise follow-up questions a user might ask: "${lastAiResponse.parts[0].text}"` }]
    };
    const conversationForQuestions = [...chatHistory, questionsPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const questionsText = await callGeminiAPI("Suggest questions", conversationForQuestions, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Suggested Questions:** ${questionsText}` }] }]);
    setAbortController(null);
  };

  // Function to translate the last user message
  const translateText = async () => {
    const lastUserMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please send a message first to translate!" }] }]);
      return;
    }

    const translatePrompt = {
      role: 'user',
      parts: [{ text: `Translate the following text into English: "${lastUserMessage.parts[0].text}"` }]
    };
    const conversationForTranslation = [...chatHistory, translatePrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const translatedText = await callGeminiAPI("Translate text", conversationForTranslation, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Translation:** ${translatedText}` }] }]);
    setAbortController(null);
  };

  // Function to generate an idea based on the current input message
  const generateIdea = async () => {
    if (!message.trim()) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please type a topic in the input field to generate an idea!" }] }]);
      return;
    }

    const ideaPrompt = {
      role: 'user',
      parts: [{ text: `Generate a creative idea or brainstorming points about: "${message}"` }]
    };
    const conversationForIdea = [...chatHistory, ideaPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const ideaText = await callGeminiAPI("Generate idea", conversationForIdea, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Idea Generated:** ${ideaText}` }] }]);
    setMessage(''); // Clear input after generating idea
    setAbortController(null);
  };

  // Function to extract keywords from the last message
  const extractKeywords = async () => {
    const lastMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user' || msg.role === 'model');
    if (!lastMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "No message available to extract keywords from." }] }]);
      return;
    }

    const keywordsPrompt = {
      role: 'user',
      parts: [{ text: `Extract the main keywords and key phrases from the following text, presented as a comma-separated list: "${lastMessage.parts[0].text}"` }]
    };
    const conversationForKeywords = [...chatHistory, keywordsPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const keywordsText = await callGeminiAPI("Extract keywords", conversationForKeywords, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Keywords:** ${keywordsText}` }] }]);
    setAbortController(null);
  };

  // Function to rephrase the last user message
  const rephraseText = async () => {
    const lastUserMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please send a message first to rephrase!" }] }]);
      return;
    }

    const rephrasePrompt = {
      role: 'user',
      parts: [{ text: `Rephrase the following text to sound more professional and concise: "${lastUserMessage.parts[0].text}"` }]
    };
    const conversationForRephrase = [...chatHistory, rephrasePrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const rephrasedText = await callGeminiAPI("Rephrase text", conversationForRephrase, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Rephrased:** ${rephrasedText}` }] }]);
    setAbortController(null);
  };

  // Function to check grammar and spelling of the last user message
  const checkGrammarSpelling = async () => {
    const lastUserMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please send a message first to check grammar and spelling!" }] }]);
      return;
    }

    const grammarPrompt = {
      role: 'user',
      parts: [{ text: `Correct any grammar and spelling errors in the following text: "${lastUserMessage.parts[0].text}"` }]
    };
    const conversationForGrammar = [...chatHistory, grammarPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const correctedText = await callGeminiAPI("Grammar/Spelling Check", conversationForGrammar, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Corrected Text:** ${correctedText}` }] }]);
    setAbortController(null);
  };

  // Function to elaborate on the last message
  const elaborateText = async () => {
    const lastMessage = chatHistory.slice().reverse().find(msg => msg.role === 'user' || msg.role === 'model');
    if (!lastMessage) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "No message available to elaborate on." }] }]);
      return;
    }

    const elaboratePrompt = {
      role: 'user',
      parts: [{ text: `Elaborate on the following text, providing more detail and expanding on the ideas: "${lastMessage.parts[0].text}"` }]
    };
    const conversationForElaborate = [...chatHistory, elaboratePrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const elaboratedText = await callGeminiAPI("Elaborate Text", conversationForElaborate, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Elaborated Text:** ${elaboratedText}` }] }]);
    setAbortController(null);
  };

  // Function to explain code
  const explainCode = async () => {
    if (!message.trim()) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please type the code you want explained in the input field." }] }]);
      return;
    }

    const codePrompt = {
      role: 'user',
      parts: [{ text: `Explain the following code step-by-step and conceptually: \n\`\`\`\n${message}\n\`\`\`` }]
    };
    const conversationForCode = [...chatHistory, codePrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const explanationText = await callGeminiAPI("Code Explainer", conversationForCode, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Code Explanation:** ${explanationText}` }] }]);
    setMessage(''); // Clear input after generating idea
    setAbortController(null);
  };

  // Function to generate a recipe
  const generateRecipe = async () => {
    if (!message.trim()) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please type ingredients or a dish idea in the input field to generate a recipe." }] }]);
      return;
    }

    const recipePrompt = {
      role: 'user',
      parts: [{ text: `Generate a recipe based on the following ingredients/idea: "${message}". Please include ingredients, instructions, and a serving size.` }]
    };
    const conversationForRecipe = [...chatHistory, recipePrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const recipeText = await callGeminiAPI("Recipe Generator", conversationForRecipe, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Recipe:** ${recipeText}` }] }]);
    setMessage(''); // Clear input after generating idea
    setAbortController(null);
  };

  // Function to fact check a statement
  const factCheck = async () => {
    if (!message.trim()) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please type a statement in the input field to fact check." }] }]);
      return;
    }

    const factCheckPrompt = {
      role: 'user',
      parts: [{ text: `Fact check the following statement and provide a concise verification or relevant context: "${message}"` }]
    };
    const conversationForFactCheck = [...chatHistory, factCheckPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const factCheckText = await callGeminiAPI("Fact Check", conversationForFactCheck, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Fact Check:** ${factCheckText}` }] }]);
    setMessage('');
    setAbortController(null);
  };

  // Function to generate pros and cons
  const generateProsCons = async () => {
    if (!message.trim()) {
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: "Please type a topic in the input field to generate pros and cons." }] }]);
      return;
    }

    const prosConsPrompt = {
      role: 'user',
      parts: [{ text: `Generate a list of pros and cons for the following topic: "${message}"` }]
    };
    const conversationForProsCons = [...chatHistory, prosConsPrompt];

    const controller = new AbortController();
    setAbortController(controller);

    const prosConsText = await callGeminiAPI("Pros & Cons", conversationForProsCons, controller);
    setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: `✨ **Pros & Cons:** ${prosConsText}` }] }]);
    setMessage('');
    setAbortController(null);
  };

  return {
    chatHistory,
    message,
    setMessage,
    isLoading,
    isTyping,
    isFeatureLoading,
    abortController,
    sendMessage,
    resetChat,
    summarizeChat,
    generateCreativeResponse,
    analyzeSentiment,
    suggestFollowUpQuestions,
    translateText,
    generateIdea,
    extractKeywords,
    rephraseText,
    checkGrammarSpelling,
    elaborateText,
    explainCode,
    generateRecipe,
    factCheck,
    generateProsCons
  };
};