import React from 'react';
import { MessageCircle as MessageCircleHelp, Mail, Phone } from 'lucide-react';

const Support = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Support Center</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
          <MessageCircleHelp className="w-12 h-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-3">Live Chat</h2>
          <p className="text-gray-300 mb-4">Get instant help from our support team through live chat</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
            Start Chat
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
          <Mail className="w-12 h-12 mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-3">Email Support</h2>
          <p className="text-gray-300 mb-4">Send us an email and we'll respond within 24 hours</p>
          <a href="mailto:support@example.com" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors">
            Email Us
          </a>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
          <Phone className="w-12 h-12 mb-4 text-purple-500" />
          <h2 className="text-xl font-semibold mb-3">Phone Support</h2>
          <p className="text-gray-300 mb-4">Call us directly for urgent assistance</p>
          <a href="tel:+1234567890" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors">
            Call Now
          </a>
        </div>
      </div>

      <div className="mt-12 bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">How do I reset my password?</h3>
            <p className="text-gray-300">Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">How can I report a bug?</h3>
            <p className="text-gray-300">Use our live chat feature or send an email to our support team with details about the issue you're experiencing.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Are there any scheduled maintenance periods?</h3>
            <p className="text-gray-300">We perform routine maintenance during off-peak hours and always notify users in advance through our notification system.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;