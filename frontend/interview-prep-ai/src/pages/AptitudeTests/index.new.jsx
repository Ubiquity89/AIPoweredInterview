import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';

const AptitudeTests = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showExplanation, setShowExplanation] = useState(null);

  const toggleExplanation = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setShowExplanation(showExplanation === key ? null : key);
  };

  const categories = [
    {
      id: 'quantitative',
      title: 'Quantitative Aptitude',
      description: 'Practice numerical ability and mathematical problems',
      questions: [
        {
          question: "If a train travels 300 km in 5 hours, what is its speed in km/h?",
          options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
          answer: 1,
          explanation: "Speed = Distance/Time = 300 km / 5 hours = 60 km/h"
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
                      <div className="mt-3 space-y-2">
                        {q.options.map((option, i) => (
                          <div key={i} className="flex items-center">
                            <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full border ${
                              i === q.answer ? 'bg-green-100 border-green-500' : 'border-gray-300'
                            } mr-2 text-sm`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className={i === q.answer ? 'text-green-600 font-medium' : 'text-gray-700'}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => toggleExplanation(category.id, index)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {showExplanation === `${category.id}-${index}` ? 'Hide Explanation' : 'Show Explanation'}
                      </button>
                      {showExplanation === `${category.id}-${index}` && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-md">
                          <p className="text-sm text-blue-700">{q.explanation}</p>
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
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Aptitude Tests</h1>
          <p className="text-gray-600">Practice different types of aptitude questions to improve your skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
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

export default AptitudeTests;
