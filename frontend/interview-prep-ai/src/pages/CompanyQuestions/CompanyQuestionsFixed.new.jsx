import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';

const ProgrammingMCQs = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const navigate = useNavigate();

  // Sample questions - in a real app, these would come from an API
  const questions = {
    python: [
      {
        question: "What is the output of 'print(2 ** 3 ** 2)' in Python?",
        options: ["64", "512", "Error", "None of the above"],
        correct: 1,
        explanation: "The ** operator has right-to-left associativity, so 3**2 is evaluated first (9), then 2**9 = 512."
      },
      {
        question: "Which of these is NOT a valid Python data type?",
        options: ["list", "tuple", "array", "All are valid"],
        correct: 2,
        explanation: "While Python has an 'array' module, 'array' is not a built-in data type like list or tuple."
      }
    ],
    javascript: [
      {
        question: "What will '2 + '2' - 2' return in JavaScript?",
        options: ["'22'", "20", "2", "NaN"],
        correct: 1,
        explanation: "'2' + '2' is '22', then '22' - 2 is 20 because - forces type coercion to number."
      }
    ]
  };

  const currentQuestions = questions[selectedLanguage] || [];

  const handleAnswer = (selectedIndex) => {
    if (answered) return;
    
    setSelectedOption(selectedIndex);
    setAnswered(true);
    
    if (selectedIndex === currentQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Programming MCQs
        </h1>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Programming Language:
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              resetQuiz();
            }}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        {showScore ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg mb-4">
              Your score: {score} out of {currentQuestions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Restart Quiz
            </button>
          </div>
        ) : currentQuestions.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <span className="text-gray-600">
                Question {currentQuestion + 1}/{currentQuestions.length}
              </span>
              <h2 className="text-xl font-semibold mt-2">
                {currentQuestions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedOption === index
                      ? 'bg-indigo-50 border-indigo-500'
                      : 'hover:bg-gray-50'
                  } ${
                    answered && index === currentQuestions[currentQuestion].correct
                      ? 'bg-green-50 border-green-500'
                      : ''
                  } ${
                    answered && 
                    selectedOption === index && 
                    selectedOption !== currentQuestions[currentQuestion].correct
                      ? 'bg-red-50 border-red-500'
                      : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            {answered && (
              <div className="mb-6 p-4 bg-blue-50 rounded-md">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p>{currentQuestions[currentQuestion].explanation}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!answered}
                className={`px-4 py-2 rounded-md ${
                  answered
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === currentQuestions.length - 1
                  ? 'Finish'
                  : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No questions available for this language yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammingMCQs;