import React, { useState } from 'react';
import { FiChevronRight, FiCode, FiBriefcase, FiClock, FiAward } from 'react-icons/fi';

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
    description: 'Design large-scale systems',
    icon: <FiAward className="w-6 h-6 text-purple-500" />
  },
];

const InterviewSetup = ({ onStart }) => {
  const [formData, setFormData] = useState({
    type: 'technical',
    difficulty: 'intermediate',
    duration: 30,
    language: 'javascript',
    topics: [],
  });

  const availableTopics = {
    technical: ['Data Structures', 'Algorithms', 'OOP', 'Databases', 'APIs'],
    behavioral: ['Teamwork', 'Leadership', 'Conflict Resolution', 'Time Management'],
    'system-design': ['Scalability', 'Load Balancing', 'Caching', 'Database Design']
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        topics: checked 
          ? [...prev.topics, value]
          : prev.topics.filter(topic => topic !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({
      ...formData,
      id: `interview-${Date.now()}`,
      startedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Configure Your Interview</h2>
        <p className="mt-2 text-gray-600">Select your preferences to start a personalized mock interview</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {interviewTypes.map((type) => (
              <label 
                key={type.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.type === type.id 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.id}
                  checked={formData.type === type.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className="mr-3">
                    <div className="p-2 rounded-lg bg-white">
                      {type.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{type.name}</h3>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {difficultyLevels.map((level) => (
              <label 
                key={level.id}
                className={`relative p-4 border rounded-lg cursor-pointer ${
                  formData.difficulty === level.id 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={level.id}
                  checked={formData.difficulty === level.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{level.name}</h3>
                  <p className="text-xs text-gray-500">{level.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Programming Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c++">C++</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Topics to Include</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {availableTopics[formData.type]?.map((topic) => (
              <label key={topic} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={topic}
                  checked={formData.topics.includes(topic)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{topic}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={formData.topics.length === 0}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              formData.topics.length === 0
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            Start Mock Interview
            <FiChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewSetup;
