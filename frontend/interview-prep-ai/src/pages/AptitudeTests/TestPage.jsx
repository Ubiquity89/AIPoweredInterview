import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Sample questions data - In a real app, this would come from an API
  const questions = [
    // Quantitative Questions
    {
      id: 1,
      question: "If a train travels 300 km in 5 hours, what is its speed in km/h?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correct: 1,
      category: 'quantitative'
    },
    {
      id: 2,
      question: "What is 25% of 200?",
      options: ["25", "50", "75", "100"],
      correct: 1,
      category: 'quantitative'
    },
    {
      id: 3,
      question: "If x + 15 = 30, what is the value of x?",
      options: ["10", "15", "20", "25"],
      correct: 1,
      category: 'quantitative'
    },
    {
      id: 4,
      question: "What is the area of a rectangle with length 8cm and width 5cm?",
      options: ["13 cm²", "26 cm²", "35 cm²", "40 cm²"],
      correct: 3,
      category: 'quantitative'
    },
    {
      id: 5,
      question: "If a shirt costs $20 after a 20% discount, what was its original price?",
      options: ["$22", "$24", "$25", "$28"],
      correct: 2,
      category: 'quantitative'
    },
    // Logical Questions
    {
      id: 6,
      question: "What is the next number in the series: 2, 4, 8, 16, ...?",
      options: ["24", "32", "64", "128"],
      correct: 1,
      category: 'logical'
    },
    {
      id: 7,
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
      options: ["True", "False", "Uncertain", "None of the above"],
      correct: 0,
      category: 'logical'
    },
    // Verbal Questions
    {
      id: 8,
      question: "Choose the word most similar to 'Eloquent':",
      options: ["Fluent", "Quiet", "Rude", "Simple"],
      correct: 0,
      category: 'verbal'
    },
    {
      id: 9,
      question: "Select the correct sentence:",
      options: [
        "She don't like apples.",
        "She doesn't likes apples.",
        "She doesn't like apples.",
        "She don't likes apples."
      ],
      correct: 2,
      category: 'verbal'
    }
  ].filter(q => q.category === categoryId);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    const correctAnswers = questions.reduce((count, q, index) => {
      return count + (answers[q.id] === q.correct ? 1 : 0);
    }, 0);
    
    setScore({
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100)
    });
    
    setIsSubmitted(true);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No questions available</h2>
        <p className="text-gray-600 mb-6">There are no questions available for this category yet.</p>
        <button
          onClick={() => navigate('/aptitude-tests')}
          className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Test Completed!</h2>
        <p className="text-gray-600 mb-8">You have completed the test. Here's your score:</p>
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full w-40 h-40 flex flex-col items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-bold">{score.percentage}%</span>
          <span className="text-sm opacity-80">Score</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{score.correct}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{score.total - score.correct}</div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/aptitude-tests')}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Back to Tests
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <div className="flex items-center bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium">
          <span className="mr-1">⏱️</span>
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <p className="text-lg text-gray-800 mb-6">{currentQ.question}</p>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <div 
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                answers[currentQ.id] === index 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                  answers[currentQ.id] === index 
                    ? 'border-emerald-500 bg-emerald-500 text-white' 
                    : 'border-gray-300'
                }`}>
                  {answers[currentQ.id] === index && '✓'}
                </div>
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentQuestion === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LuChevronLeft className="mr-1" /> Previous
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Next <LuChevronRight className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;
