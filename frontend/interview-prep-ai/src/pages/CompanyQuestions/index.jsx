import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CompanyQuestions = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState('');

  // Sample company questions
  const companyQuestions = {
    google: [
      {
        question: "Implement a function to find the k most frequent elements in an array.",
        category: "Coding (Arrays)",
        type: "coding"
      },
      {
        question: "Design an algorithm to serialize and deserialize a binary tree.",
        category: "Coding (Trees)",
        type: "coding"
      },
      {
        question: "Implement a thread-safe blocking queue in your preferred language.",
        category: "Coding (Concurrency)",
        type: "coding"
      },
      // System Design
      {
        question: "Design a distributed key-value store like Google's Bigtable.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you design Google Search's autocomplete feature? Consider scale and performance.",
        category: "System Design",
        type: "design"
      },
      // Behavioral
      {
        question: "Tell me about a time you had to make a decision without complete information.",
        category: "Behavioral",
        type: "behavioral"
      },
      {
        question: "How do you handle disagreements with your manager about technical decisions?",
        category: "Behavioral",
        type: "behavioral"
      },
      // Algorithm
      {
        question: "Given two sorted arrays, find the median of the two sorted arrays.",
        category: "Algorithms",
        type: "coding"
      }
    ],
    microsoft: [
      // Coding Questions
      {
        question: "Implement an LRU (Least Recently Used) cache.",
        category: "Coding (Data Structures)",
        type: "coding"
      },
      {
        question: "Write a function to validate if a binary tree is a valid binary search tree.",
        category: "Coding (Trees)",
        type: "coding"
      },
      // System Design
      {
        question: "Design a distributed file storage system similar to OneDrive.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you design Microsoft Teams' real-time collaboration features?",
        category: "System Design",
        type: "design"
      },
      // Behavioral
      {
        question: "Describe a time when you had to learn a new technology quickly.",
        category: "Behavioral",
        type: "behavioral"
      }
    ],
    amazon: [
      // Coding Questions
      {
        question: "Given a string, find the length of the longest substring without repeating characters.",
        category: "Coding (Strings)",
        type: "coding"
      },
      {
        question: "Implement a function to check if a binary tree is balanced.",
        category: "Coding (Trees)",
        type: "coding"
      },
      // System Design
      {
        question: "Design Amazon's product recommendation system.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you handle a system outage during a high-traffic event like Prime Day?",
        category: "System Design",
        type: "design"
      },
      // Leadership Principles
      {
        question: "Tell me about a time you had to make a quick decision without consulting your manager.",
        category: "Leadership Principles",
        type: "behavioral"
      }
    ],
    facebook: [
      // Coding Questions
      {
        question: "Given a string, find the longest palindromic substring.",
        category: "Coding (Strings)",
        type: "coding"
      },
      {
        question: "Implement a function to find the minimum window in a string which will contain all the characters in another string.",
        category: "Coding (Strings)",
        type: "coding"
      },
      // System Design
      {
        question: "Design Facebook's news feed ranking algorithm.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you design a privacy-focused feature for Facebook?",
        category: "System Design",
        type: "design"
      }
    ],
    apple: [
      {
        question: "Design the iOS photo storage optimization feature.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you optimize battery life for a video streaming app?",
        category: "Mobile Development",
        type: "design"
      }
    ],
    netflix: [
      {
        question: "Design a system to recommend shows to users based on their viewing history.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you handle video streaming at scale with minimal buffering?",
        category: "System Design",
        type: "design"
      }
    ]
  };

  useEffect(() => {
    console.log('Company name from URL:', companyName);
    
    if (!companyName) {
      setError('No company name provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    
    // Format the company name for display
    const formattedName = companyName.charAt(0).toUpperCase() + companyName.slice(1).toLowerCase();
    setDisplayName(formattedName);
    
    // Get questions for the company
    const companyData = companyQuestions[companyName.toLowerCase()];
    
    if (companyData) {
      setQuestions(companyData);
    } else {
      // Generate generic questions if company not found
      setQuestions([
        {
          question: `What do you know about ${formattedName}'s products/services and how would you improve them?`,
          category: 'Product Knowledge',
          type: 'behavioral'
        },
        {
          question: `How would you approach solving a challenging technical problem at ${formattedName}?`,
          category: 'Problem Solving',
          type: 'behavioral'
        },
        {
          question: `Why do you want to work at ${formattedName} specifically?`,
          category: 'Company Fit',
          type: 'behavioral'
        }
      ]);
    }
    
    setLoading(false);
  }, [companyName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Companies
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          {formattedCompanyName || companyName || 'Company'} Interview Questions
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Prepare for your {formattedCompanyName || companyName || 'company'} interview with these tailored questions
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/company-questions')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/company-questions')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Companies
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {displayName || 'Company'} Interview Questions
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Prepare for your {displayName || 'company'} interview with these tailored questions
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Interview Preparation Guide
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Comprehensive questions for {formattedCompanyName || 'this company'} interviews
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {questions.map((item, index) => (
              <div 
                key={index} 
                className="px-6 py-5 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-md p-2">
                    {getQuestionIcon(item.type || 'default')}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
                      {item.question}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyle(item.type)}`}>
                        {item.category}
                      </span>
                      {item.type === 'coding' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Coding Challenge
                        </span>
                      )}
                      {item.type === 'design' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          System Design
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Interview Tips
            </h2>
          </div>
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Don't see your question?
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                We're constantly updating our question bank. Check back later or practice with our general programming questions.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
