import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';

const CompanyQuestions = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState('');

  // Sample company questions with enhanced DSA content
  const companyQuestions = {
    google: [
      {
        question: "Implement a function to find the k most frequent elements in an array using a min-heap.",
        category: "Coding (Arrays, Heaps, Hashing)",
        type: "coding"
      },
      {
        question: "Design an algorithm to serialize and deserialize a binary tree with O(n) time and space complexity.",
        category: "Coding (Trees, Recursion, BFS/DFS)",
        type: "coding"
      },
      {
        question: "How would you design a distributed key-value store like Bigtable?",
        category: "System Design (Distributed Systems, Storage)",
        type: "design"
      }
    ],
    microsoft: [
      {
        question: "Implement a function to check if a binary tree is a valid binary search tree.",
        category: "Coding (Trees, Recursion)",
        type: "coding"
      },
      {
        question: "How would you design a scalable notification system for a product like Microsoft Teams?",
        category: "System Design (Real-time, Scalability)",
        type: "design"
      }
    ],
    amazon: [
      {
        question: "Implement an LRU (Least Recently Used) cache with O(1) time complexity for get and put operations.",
        category: "Coding (Data Structures, Hashing, Linked Lists)",
        type: "coding"
      },
      {
        question: "How would you design a system to handle millions of product recommendations per second?",
        category: "System Design (Scalability, Caching, Machine Learning)",
        type: "design"
      }
    ],
    facebook: [
      {
        question: "Design a personalized news feed algorithm that considers user engagement, post recency, and relevance.",
        category: "System Design (Algorithms, Machine Learning)",
        type: "design"
      },
      {
        question: "Implement a function to find the longest palindromic substring in a string with O(n²) time complexity.",
        category: "Coding (Strings, Dynamic Programming)",
        type: "coding"
      }
    ]
  };

  useEffect(() => {
    // Set loading state
    setLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      if (companyName && companyQuestions[companyName]) {
        setQuestions(companyQuestions[companyName]);
        setDisplayName(companyName.charAt(0).toUpperCase() + companyName.slice(1));
        setError('');
      } else {
        setError('Company not found');
        setQuestions([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [companyName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton />
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Error</h3>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <button
              onClick={() => navigate('/company-questions')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Back to Companies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayName} Interview Questions</h1>
            <p className="text-lg text-gray-600">Practice common interview questions for {displayName}</p>
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      q.type === 'coding' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {q.type}
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {q.category}
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <p className="text-gray-700">{q.question}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="space-y-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate('/company-questions')}
              >
                Back to All Companies
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => navigate('/programming-mcqs')}
              >
                Practice Programming Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestions;
