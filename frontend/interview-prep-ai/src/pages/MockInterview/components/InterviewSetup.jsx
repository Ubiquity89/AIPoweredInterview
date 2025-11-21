// src/pages/MockInterview/components/InterviewSetup.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCode, FiBriefcase, FiAward } from 'react-icons/fi';
import { useInterviewStore } from '../../../stores/useInterviewStore';

const difficultyLevels = [
  { id: 'beginner', name: 'Beginner', description: 'Basic concepts and fundamentals' },
  { id: 'intermediate', name: 'Intermediate', description: 'Balanced mix of concepts' },
  { id: 'advanced', name: 'Advanced', description: 'Challenging problems and system design' },
];

const interviewTypes = [
  { 
    id: 'technical', 
    name: 'Technical', 
    description: 'Coding and technical questions',
    icon: <FiCode className="w-6 h-6 text-blue-500" />
  },
  { 
    id: 'behavioral', 
    name: 'Behavioral', 
    description: 'Soft skills and situational questions',
    icon: <FiBriefcase className="w-6 h-6 text-green-500" />
  },
  { 
    id: 'system-design', 
    name: 'System Design', 
    description: 'System architecture and design questions',
    icon: <FiAward className="w-6 h-6 text-purple-500" />
  },
];

const InterviewSetup = () => {
  const interviewSettings = useInterviewStore((state) => state.interviewSettings);
  const [selectedType, setSelectedType] = useState(interviewSettings?.type || '');
  const [difficulty, setDifficulty] = useState(interviewSettings?.difficulty || 'intermediate');
  const [role, setRole] = useState(interviewSettings?.role || '');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setInterviewState = useInterviewStore((state) => state.setInterviewState);
  const startInterviewInStore = useInterviewStore((state) => state.startInterview);

  useEffect(() => {
    if (interviewSettings) {
      setSelectedType(interviewSettings.type || '');
      setRole(interviewSettings.role || '');
      setDifficulty(interviewSettings.difficulty || 'intermediate');
    }
  }, [interviewSettings]);

  const handleStartInterview = async () => {
    if (!selectedType || !role) {
      alert('Please select an interview type and enter your role');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Save interview settings to the store
      setInterviewState({
        interviewSettings: {
          type: selectedType,
          role: role,
          difficulty: difficulty
        },
        currentQuestion: null,
        interviewHistory: [],
        feedback: null
      });
      
      // mark interview as active so the room route can load
      startInterviewInStore();

      // Navigate to the interview room
      navigate('room');
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview Setup</h1>
          <p className="text-gray-600">Configure your interview settings to get started</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Interview Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {interviewTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center mb-2">
                  {type.icon}
                  <h3 className="ml-2 font-medium">{type.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Role/Position
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficultyLevels.map((level) => (
                <div
                  key={level.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    difficulty === level.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setDifficulty(level.id)}
                >
                  <h3 className="font-medium">{level.name}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleStartInterview}
              disabled={!selectedType || !role || isLoading}
              className={`px-8 py-3 rounded-lg text-white font-medium ${
                !selectedType || !role || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Starting...' : 'Start Mock Interview'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;