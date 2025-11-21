// src/pages/MockInterview/components/InterviewRoom.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Question templates based on interview type and difficulty
const QUESTION_TEMPLATES = {
  technical: {
    beginner: [
      "Can you explain what [TECH] is and how you've used it?",
      "What are the basic concepts of [TECH] that every beginner should know?",
      "Can you describe a simple project where you used [TECH]?"
    ],
    intermediate: [
      "How would you approach debugging a performance issue in [TECH]?",
      "Can you explain how [TECH] handles [RELATED_CONCEPT]?",
      "What are some best practices when working with [TECH]?"
    ],
    advanced: [
      "How would you design a scalable system using [TECH]?",
      "Can you explain the internals of [TECH] and how it handles [COMPLEX_CONCEPT]?",
      "What are some advanced optimization techniques you've used with [TECH]?"
    ]
  },
  behavioral: {
    beginner: [
      "Tell me about a time you worked in a team.",
      "How do you handle tight deadlines?",
      "Describe a situation where you had to learn something new quickly."
    ],
    intermediate: [
      "Tell me about a time you had a conflict with a team member. How did you resolve it?",
      "Describe a situation where you had to make a difficult decision. What was the outcome?",
      "How do you prioritize your work when you have multiple deadlines?"
    ],
    advanced: [
      "Describe a time when you had to lead a team through a major challenge.",
      "Tell me about a time you failed and what you learned from it.",
      "How do you handle situations where you need to give difficult feedback?"
    ]
  }
};

const FOLLOW_UP_QUESTIONS = [
  "That's interesting! Can you elaborate on that?",
  "What was the most challenging part of that?",
  "How did you measure the success of this?",
  "What would you do differently if you had to do it again?",
  "How did this experience help you grow professionally?",
  "Can you give a specific example from your experience?",
  "What were the key things you learned from this?",
  "How would you explain this approach to a junior teammate?",
  "What tools or technologies did you use here?",
  "How would you handle a similar situation in the future?"
];

const InterviewRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const questionIndexRef = useRef(0);
  const followUpIndexRef = useRef(0);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);
  const [hasShownCompletionMessage, setHasShownCompletionMessage] = useState(false);

  // Get interview settings from location state or use defaults
  const interviewSettings = location.state?.interviewSettings || {
    type: 'technical',
    role: 'Software Engineer',
    difficulty: 'intermediate'
  };

  // Generate a non-repeating question based on interview settings
  const generateQuestion = () => {
    const { type, role, difficulty } = interviewSettings;
    const templates = QUESTION_TEMPLATES[type]?.[difficulty] ||
                     QUESTION_TEMPLATES.technical.intermediate;

    // Fill in placeholders for all templates
    const filledTemplates = templates.map((template) => {
      return template
        .replace(
          '[TECH]',
          role.includes('Frontend')
            ? 'React'
            : role.includes('Backend')
              ? 'Node.js'
              : role.includes('Data')
                ? 'Python'
                : 'your primary technology'
        )
        .replace('[ROLE]', role)
        .replace('[DIFFICULTY]', difficulty)
        .replace('[RELATED_CONCEPT]', 'state updates and rendering')
        .replace('[COMPLEX_CONCEPT]', 'performance optimization and rendering');
    });

    // If we've already asked all questions once, mark as complete
    if (questionIndexRef.current >= filledTemplates.length) {
      if (!noMoreQuestions) {
        setNoMoreQuestions(true);
      }
      return null;
    }

    const nextQuestion = filledTemplates[questionIndexRef.current];
    questionIndexRef.current += 1;

    return nextQuestion;
  };

  // Generate a non-repeating follow-up question (sequential)
  const generateFollowUp = () => {
    if (followUpIndexRef.current >= FOLLOW_UP_QUESTIONS.length) {
      followUpIndexRef.current = 0;
    }

    const nextFollowUp = FOLLOW_UP_QUESTIONS[followUpIndexRef.current];
    followUpIndexRef.current += 1;

    return nextFollowUp;
  };

  // Add initial question when component mounts
  useEffect(() => {
    const initialQuestion = `Welcome to your ${interviewSettings.difficulty} ${interviewSettings.type} interview for the ${interviewSettings.role} position. ` +
      `${interviewSettings.type === 'technical' 
        ? 'I\'ll be asking you some technical questions to assess your knowledge and problem-solving skills.'
        : 'I\'ll be asking you some behavioral questions to understand how you work in different situations.'}`;
      
    setMessages([
      {
        role: 'assistant',
        content: initialQuestion,
        timestamp: new Date().toISOString()
      },
      {
        role: 'assistant',
        content: generateQuestion(),
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      let response;

      if (noMoreQuestions) {
        // We've exhausted the main question set
        if (!hasShownCompletionMessage) {
          response = "We've now covered all the planned interview questions for this session. You can click 'End Interview' when you're ready, or keep practicing by asking your own questions.";
          setHasShownCompletionMessage(true);
        } else {
          // Optional: still allow follow-ups after completion
          response = generateFollowUp();
        }
      } else {
        // 30% chance to ask a follow-up question, 70% chance to ask a new question
        const askFollowUp = Math.random() < 0.3;

        if (askFollowUp) {
          response = generateFollowUp();
        } else {
          const nextQuestion = generateQuestion();
          if (nextQuestion === null) {
            // Just reached the end of the question set
            response = "We've now covered all the planned interview questions for this session. You can click 'End Interview' when you're ready, or keep practicing by asking your own questions.";
            setHasShownCompletionMessage(true);
          } else {
            response = nextQuestion;
          }
        }
      }

      if (!response) {
        setIsLoading(false);
        return;
      }

      // Add a small delay before showing the next question or message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString()
          }
        ]);
        setIsLoading(false);
      }, 500);
    }, 1000);
  };

  const endInterview = () => {
    navigate('/mock-interview');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold text-gray-800">
              {interviewSettings.role} - {interviewSettings.type.charAt(0).toUpperCase() + interviewSettings.type.slice(1)} Interview
            </h1>
            <button
              onClick={endInterview}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
            >
              End Interview
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Difficulty: <span className="font-medium capitalize">{interviewSettings.difficulty}</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
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
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex space-x-4">
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