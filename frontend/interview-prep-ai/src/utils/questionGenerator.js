const questionsDatabase = {
  technical: {
    beginner: [
      "Explain the difference between let, const, and var in JavaScript.",
      "What is the difference between == and === in JavaScript?",
      "How does the event loop work in JavaScript?",
      "What is the difference between null and undefined?",
      "Explain the concept of closures in JavaScript."
    ],
    intermediate: [
      "Implement a function to reverse a string in JavaScript.",
      "How would you implement a debounce function?",
      "Explain the concept of promises and how they work.",
      "What is the difference between call, apply, and bind?",
      "How would you handle errors in an async/await function?"
    ],
    advanced: [
      "Implement a function to flatten a nested JavaScript object.",
      "How would you implement a simple version of React's useState hook?",
      "Explain the Virtual DOM and how it improves performance.",
      "How would you implement a deep clone function in JavaScript?",
      "Explain the concept of currying and provide an example."
    ]
  },
  behavioral: {
    beginner: [
      "Tell me about yourself.",
      "What are your strengths and weaknesses?",
      "Why do you want to work for our company?",
      "Where do you see yourself in 5 years?",
      "How do you handle stress and pressure?"
    ],
    intermediate: [
      "Tell me about a time you had to work with a difficult team member.",
      "Describe a situation where you had to learn something new quickly.",
      "How do you handle tight deadlines?",
      "Tell me about a time you made a mistake and how you handled it.",
      "How do you prioritize your work when you have multiple deadlines?"
    ],
    advanced: [
      "Tell me about a time you had to make a difficult decision without all the information.",
      "Describe a situation where you had to persuade a team to adopt your idea.",
      "How do you handle conflicts within your team?",
      "Tell me about a time you failed and what you learned from it.",
      "How do you stay motivated when working on long-term projects?"
    ]
  },
  'system-design': {
    beginner: [
      "How would you design a simple URL shortening service like bit.ly?",
      "Design a basic chat application like WhatsApp.",
      "How would you design a parking lot management system?",
      "Design a simple key-value store like Redis.",
      "How would you design a basic social media feed?"
    ],
    intermediate: [
      "Design a ride-sharing service like Uber or Lyft.",
      "How would you design Twitter's news feed?",
      "Design a distributed cache system like Memcached.",
      "How would you design a rate limiter for an API?",
      "Design a real-time collaborative editing system like Google Docs."
    ],
    advanced: [
      "Design a global-scale video streaming platform like YouTube.",
      "How would you design a distributed database like MongoDB?",
      "Design a system for handling millions of concurrent WebSocket connections.",
      "How would you design a real-time analytics system for tracking user behavior?",
      "Design a system for handling financial transactions with strong consistency guarantees."
    ]
  }
};

// Helper function to get all questions of a specific type and difficulty
const getQuestionsByTypeAndDifficulty = (type, difficulty) => {
  // If the exact type and difficulty exist, return those questions
  if (questionsDatabase[type]?.[difficulty]) {
    return questionsDatabase[type][difficulty];
  }
  
  // If the type exists but not the difficulty, get all questions of that type
  if (questionsDatabase[type]) {
    return Object.values(questionsDatabase[type]).flat();
  }
  
  // If the type doesn't exist, get all questions of the requested difficulty
  const allQuestions = [];
  Object.values(questionsDatabase).forEach(difficulties => {
    if (difficulties[difficulty]) {
      allQuestions.push(...difficulties[difficulty]);
    }
  });
  
  return allQuestions.length > 0 ? allQuestions : [
    "No questions available for the selected type and difficulty. Please try different settings."
  ];
};

export const generateQuestions = (type, difficulty, count = 5) => {
  console.log(`Generating ${count} questions for type: ${type}, difficulty: ${difficulty}`);
  
  // Get all available questions for the type and difficulty
  let availableQuestions = getQuestionsByTypeAndDifficulty(type, difficulty);
  
  // If no questions found, try to get any questions
  if (availableQuestions.length === 0 || 
     (availableQuestions.length === 1 && availableQuestions[0].startsWith("No questions"))) {
    console.warn(`No questions found for type: ${type}, difficulty: ${difficulty}. Using fallback questions.`);
    availableQuestions = Object.values(questionsDatabase)
      .flatMap(difficulties => Object.values(difficulties))
      .flat();
  }

  // Shuffle the questions
  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  
  // Take the requested number of questions (or all if not enough)
  const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // If we couldn't get enough unique questions, duplicate some
  while (selectedQuestions.length < count && selectedQuestions.length > 0) {
    const remaining = count - selectedQuestions.length;
    const additional = selectedQuestions.slice(0, Math.min(remaining, selectedQuestions.length));
    selectedQuestions.push(...additional);
  }
  
  console.log(`Generated ${selectedQuestions.length} questions`);
  
  return selectedQuestions.map((text, index) => ({
    id: `${type}-${difficulty}-${index}-${Date.now()}`,
    text,
    type,
    timeLimit: type === 'technical' ? 300 : type === 'behavioral' ? 180 : 600
  }));
};

export const getRandomQuestion = (type, difficulty) => {
  const questions = questionsDatabase[type]?.[difficulty] || [];
  if (questions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  return {
    id: Date.now(),
    text: questions[randomIndex],
    type,
    timeLimit: type === 'technical' ? 300 : type === 'behavioral' ? 180 : 600
  };
};
