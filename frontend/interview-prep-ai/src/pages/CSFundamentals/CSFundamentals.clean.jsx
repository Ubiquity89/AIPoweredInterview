import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';

const CSFundamentals = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showExplanation, setShowExplanation] = useState(null);
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const toggleExplanation = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setShowExplanation(showExplanation === key ? null : key);
  };

  const loadMoreQuestions = (categoryId) => {
    setVisibleQuestions(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 20) + 20
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'cpp',
      title: 'C++ Programming',
      description: 'Master C++ concepts including OOP, memory management, and STL',
      questions: [
        {
          question: "What is the difference between new/delete and malloc/free in C++?",
          options: [
            "new/delete are operators while malloc/free are functions",
            "new/delete call constructors/destructors, malloc/free don't",
            "new returns a typed pointer, malloc returns void*",
            "All of the above"
          ],
          answer: 3,
          explanation: "All options are correct differences between new/delete and malloc/free in C++."
        },
        {
          question: "What is the purpose of a virtual destructor in C++?",
          options: [
            "To prevent memory leaks when deleting through base class pointer",
            "To make the class abstract",
            "To enable dynamic binding",
            "To improve performance"
          ],
          answer: 0,
          explanation: "A virtual destructor ensures that the derived class destructor is called when deleting an object through a base class pointer, preventing memory leaks."
        },
        {
          question: "What is the difference between stack and heap memory in C++?",
          options: [
            "Stack is for local variables, heap is for dynamic allocation",
            "Stack is faster but limited in size, heap is larger but slower",
            "Stack is managed automatically, heap requires manual management",
            "All of the above"
          ],
          answer: 3,
          explanation: "All options correctly describe differences between stack and heap memory in C++."
        },
        {
          question: "What is the use of the 'const' keyword in C++?",
          options: [
            "To declare constants",
            "To prevent modification of variables",
            "In function parameters to prevent modification of arguments",
            "All of the above"
          ],
          answer: 3,
          explanation: "The 'const' keyword has multiple uses in C++ including all the mentioned options."
        },
        {
          question: "What is the difference between deep copy and shallow copy in C++?",
          options: [
            "Shallow copy copies only the pointer, deep copy copies the data",
            "Deep copy creates a new object, shallow copy doesn't",
            "Shallow copy is faster but can cause issues with dynamic memory",
            "All of the above"
          ],
          answer: 3,
          explanation: "All options correctly describe differences between deep and shallow copy in C++."
        }
      ]
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Practice DSA concepts including arrays, trees, graphs, and algorithms',
      questions: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
          answer: 0,
          explanation: "Binary search has a time complexity of O(log n) as it divides the search interval in half each time."
        },
        {
          question: "Which data structure uses LIFO (Last In First Out) principle?",
          options: ["Stack", "Queue", "Linked List", "Tree"],
          answer: 0,
          explanation: "Stack follows LIFO where the last element added is the first one to be removed."
        }
      ]
    }
  ];

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <span className="mr-2">←</span> Back to Categories
        </button>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.title} Questions</h2>
          
          <div className="space-y-8">
            {category.questions.slice(0, visibleQuestions[selectedCategory] || 20).map((q, index) => {
              const isExpanded = showExplanation === `${selectedCategory}-${index}`;
              
              return (
                <div 
                  key={index} 
                  className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    {index + 1}. {q.question}
                  </h3>
                  <div className="space-y-2 mb-3">
                    {q.options.map((option, i) => (
                      <div 
                        key={i} 
                        className={`p-3 rounded-lg ${
                          i === q.answer ? 'bg-green-50 text-green-800' : 'bg-gray-50'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {option}
                        {i === q.answer && (
                          <span className="ml-2 text-sm text-green-600">(Correct Answer)</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleExplanation(selectedCategory, index)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {isExpanded ? 'Hide Explanation' : 'Show Explanation'}
                    <span className="ml-1">{isExpanded ? '▲' : '▼'}</span>
                  </button>
                  {isExpanded && (
                    <div className="mt-3 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
            
            {category.questions.length > (visibleQuestions[selectedCategory] || 20) && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => loadMoreQuestions(selectedCategory)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  Load 20 More Questions ({category.questions.length - (visibleQuestions[selectedCategory] || 20)} remaining)
                </button>
              </div>
            )}
          </div>
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
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CS Fundamentals</h1>
          <p className="text-gray-600">Master core computer science concepts for your interviews</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-1.5">❓</span> {category.questions.length} Questions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 z-50 text-2xl font-bold ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default CSFundamentals;
