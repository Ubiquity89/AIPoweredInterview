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
        question: "Find the longest substring with at most K distinct characters using O(1) space.",
        category: "Coding (Strings, Sliding Window, Two Pointers)",
        type: "coding"
      },
      {
        question: "Implement a thread-safe blocking queue with fixed capacity.",
        category: "Coding (Concurrency, Data Structures)",
        type: "coding"
      },
      {
        question: "Find the longest increasing path in a 2D matrix.",
        category: "Coding (Dynamic Programming, DFS, Memoization)",
        type: "coding"
      },
      {
        question: "How would you design Google Search's autocomplete feature?",
        category: "System Design",
        type: "design"
      },
      {
        question: "Design a rate limiter for Google's API services.",
        category: "System Design",
        type: "design"
      },
      {
        question: "Tell me about a time you had to optimize a slow piece of code.",
        category: "Behavioral",
        type: "behavioral"
      }
    ],
    microsoft: [
      {
        question: "Implement an LRU (Least Recently Used) cache with O(1) time complexity using a combination of hashmap and doubly linked list.",
        category: "Coding (Data Structures, Hashing, Linked Lists)",
        type: "coding"
      },
      {
        question: "Design a distributed file storage system with file versioning and conflict resolution.",
        category: "System Design (Distributed Systems)",
        type: "design"
      },
      {
        question: "Find the median of two sorted arrays with O(log(min(m,n))) time complexity and O(1) space.",
        category: "Coding (Arrays, Binary Search, Divide and Conquer)",
        type: "coding"
      },
      {
        question: "Implement a thread-safe circular buffer with blocking read/write operations.",
        category: "Coding (Concurrency, Circular Buffer)",
        type: "coding"
      },
      {
        question: "Find the k-th smallest element in a row-wise and column-wise sorted 2D array.",
        category: "Coding (Arrays, Binary Search, Heaps)",
        type: "coding"
      },
      {
        question: "Implement a trie with insert, search, and startsWith methods with wildcard support.",
        category: "Coding (Trie, String Manipulation)",
        type: "coding"
      },
      {
        question: "Design Microsoft Teams' real-time messaging feature.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you implement the 'undo' feature in Microsoft Word?",
        category: "System Design",
        type: "design"
      },
      {
        question: "Describe a time when you had to learn a new technology quickly.",
        category: "Behavioral",
        type: "behavioral"
      }
    ],
    amazon: [
      {
        question: "Design an e-commerce system with features like inventory management, shopping cart, and recommendation engine.",
        category: "System Design (Distributed Systems, Microservices)",
        type: "design"
      },
      {
        question: "Implement a thread-safe shopping cart with features like add, remove, update quantity, and calculate total with discounts and taxes.",
        category: "Coding (OOP, Concurrency, Design Patterns)",
        type: "coding"
      },
      {
        question: "Find the minimum number of meeting rooms required given an array of meeting time intervals.",
        category: "Coding (Sorting, Heaps, Greedy)",
        type: "coding"
      },
      {
        question: "Implement a rate limiter for API requests with configurable time windows and request limits.",
        category: "Coding (System Design, Concurrency)",
        type: "coding"
      },
      {
        question: "Design a distributed cache system with LRU eviction policy.",
        category: "System Design (Distributed Systems, Caching)",
        type: "design"
      },
      {
        question: "Design a recommendation system for Amazon products.",
        category: "System Design",
        type: "design"
      },
      {
        question: "Find the first non-repeating character in a stream of characters.",
        category: "Coding (Strings, Queues)",
        type: "coding"
      },
      {
        question: "Tell me about a time you had to make a decision with incomplete data.",
        category: "Behavioral",
        type: "behavioral"
      }
    ],
    apple: [
      {
        question: "Design an iOS photo gallery with features like search, organization by albums, and face recognition.",
        category: "System Design (Mobile, Image Processing)",
        type: "design"
      },
      {
        question: "Implement a thread-safe singleton with double-checked locking and handle serialization/deserialization.",
        category: "Coding (Concurrency, OOP, Design Patterns)",
        type: "coding"
      },
      {
        question: "Design a task scheduler that can schedule tasks to run after a delay or at a specific time.",
        category: "Coding (Heaps, Concurrency, System Design)",
        type: "coding"
      },
      {
        question: "Implement a read-heavy key-value store with support for transactions and snapshots.",
        category: "Coding (Data Structures, Concurrency, System Design)",
        type: "coding"
      },
      {
        question: "Design a notification system that can handle millions of users with low latency.",
        category: "System Design (Distributed Systems, Real-time)",
        type: "design"
      },
      {
        question: "Design the iOS app store review system.",
        category: "System Design",
        type: "design"
      },
      {
        question: "How would you implement the 'Undo' functionality in a text editor?",
        category: "Coding (Data Structures, Stack)",
        type: "coding"
      },
      {
        question: "Tell me about a time you had to make a tough decision between multiple good options.",
        category: "Behavioral",
        type: "behavioral"
      }
    ],
    facebook: [
      {
        question: "Design a personalized news feed algorithm that considers user engagement, post recency, and relevance.",
        category: "System Design (Algorithms, Machine Learning)",
        type: "design"
      },
      {
        question: "Implement a social media post system with features like like, share, and comment with real-time updates.",
        category: "System Design (Real-time, WebSockets)",
        type: "design"
      },
      {
        question: "Find the shortest path between two users in a social network using bidirectional BFS.",
        category: "Coding (Graphs, BFS, Optimization)",
        type: "coding"
      },
      {
        question: "Design a typeahead search that shows relevant results as the user types.",
        category: "System Design (Search, Auto-complete)",
        type: "design"
      },
      {
        question: "Implement a thread-safe concurrent hash map with put, get, and remove operations.",
        category: "Coding (Concurrency, Data Structures)",
        type: "coding"
      },
      {
        question: "Design a distributed key-value store that can handle billions of requests per second.",
        category: "System Design (Distributed Systems, Scalability)",
        type: "design"
      },
      {
        question: "Design Facebook Messenger's real-time chat system.",
        category: "System Design",
        type: "design"
      },
      {
        question: "Tell me about a time you had to handle a difficult team member.",
        category: "Behavioral",
        type: "behavioral"
      }
    ]
  };

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {displayName} Interview Questions
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Prepare for your {displayName} interview with these tailored questions
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
            <div key={index} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {q.type === 'coding' && (
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                    )}
                    {q.type === 'design' && (
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {q.type === 'behavioral' && (
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-100 text-purple-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{q.question}</h3>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {q.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
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
