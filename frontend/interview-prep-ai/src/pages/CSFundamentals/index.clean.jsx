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

    // Check on initial load
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleQuestions = (categoryId) => {
    setVisibleQuestions(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const categories = [
    {
      id: 'data-structures',
      title: 'Data Structures',
      description: 'Learn about arrays, linked lists, trees, graphs, and more',
      questions: [
        {
          question: 'What is the difference between an array and a linked list?',
          answer: 'Arrays store elements in contiguous memory locations, while linked lists store elements in nodes with pointers to the next node.',
          difficulty: 'easy',
          topics: ['arrays', 'linked-lists']
        },
        // Add more questions here
      ]
    },
    // Add more categories here
  ];

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.title}</h2>
            <div className="space-y-6">
              {category.questions.map((q, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 mr-2">{index + 1}.</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{q.question}</p>
                      <button
                        onClick={() => setShowExplanation(showExplanation === index ? null : index)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {showExplanation === index ? 'Hide Answer' : 'Show Answer'}
                      </button>
                      {showExplanation === index && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-md">
                          <p className="text-sm text-blue-700">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 z-50 text-2xl font-bold ${
            showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
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
    </div>
  );
};

export default CSFundamentals;
