// src/pages/MockInterview/components/InterviewRoom.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterviewStore } from '../../../stores/useInterviewStore';
import axios from 'axios';

const InterviewRoom = () => {
  const navigate = useNavigate();
  const {
    isInterviewActive,
    currentQuestion,
    interviewHistory,
    isLoading,
    error,
    setCurrentQuestion,
    addToHistory,
    setLoading,
    setError,
    startInterview: startInterviewInStore,
    endInterview: endInterviewInStore,
    interviewSettings
  } = useInterviewStore();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [interviewHistory]);

  // Handle sending messages to the backend
  const sendMessage = async (messages) => {
    try {
      const token = localStorage.getItem('token');
      // Get interview settings from the store
      const settings = useInterviewStore.getState().interviewSettings;
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/interview/conversation`,
        { 
          messages,
          settings // Include interview settings in the request
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.response?.data?.message || 'Failed to send message');
      throw error;
    }
  };

  // Start the interview
  const startInterview = async () => {
    if (!interviewSettings) {
      setError('Interview settings not found. Please configure the interview first.');
      return;
    }

    setLoading(true);
    startInterviewInStore();
    
    try {
      const { type, role, difficulty } = interviewSettings;
      const initialMessage = `Start a ${difficulty} ${type} interview for a ${role} role. Begin with an introduction.`;
      
      // Add initial message to history
      addToHistory({
        role: 'user',
        content: initialMessage,
        timestamp: new Date().toISOString()
      });

      // Send initial message to backend
      const response = await sendMessage([{ role: 'user', content: initialMessage }]);
      
      if (response.success && response.message) {
        setCurrentQuestion(response.message);
        addToHistory({
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error starting interview:', error);
      setError('Failed to start interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    // Add user message to history
    addToHistory(userMessage);
    setInputValue('');
    setLoading(true);

    try {
      // Prepare conversation history
      const messages = [
        ...interviewHistory.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: inputValue }
      ];

      // Send message to backend
      const response = await sendMessage(messages);
      
      if (response.success && response.message) {
        setCurrentQuestion(response.message);
        addToHistory({
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  // End the interview
  const endInterview = () => {
    endInterviewInStore();
    navigate('/mock-interview');
  };

  // Start interview on component mount
  useEffect(() => {
    if (!interviewSettings?.type || !interviewSettings?.role) {
      setError('Interview settings not found. Please configure the interview first.');
      navigate('/mock-interview');
      return;
    }

    if (!isInterviewActive) {
      startInterview();
    }
  }, [isInterviewActive, interviewSettings, navigate]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Mock Interview</h1>
          <button
            onClick={endInterview}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Ending...' : 'End Interview'}
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {interviewHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              isLoading || !inputValue.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewRoom;