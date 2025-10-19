import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const features = [
    {
      id: 1,
      title: 'Role-Based Questions',
      description: 'Practice with questions tailored to your target role',
      icon: <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">1</div>,
      path: '/role-based-questions',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Aptitude Tests',
      description: 'Practice quantitative, logical, and verbal reasoning',
      icon: <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">2</div>,
      path: '/aptitude-tests',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      id: 3,
      title: 'CS Fundamentals',
      description: 'Master DBMS, OS, CN, and OOPs concepts',
      icon: <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">3</div>,
      path: '/cs-fundamentals',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 4,
      title: 'Programming MCQs',
      description: 'Practice language and DSA basics',
      icon: <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">4</div>,
      path: '/programming-mcqs',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      id: 5,
      title: 'Company Questions',
      description: 'Prepare with questions from top tech companies',
      icon: <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">5</div>,
      path: '/company-questions',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600'
    },
    {
  id: 6,
  title: 'AI Mock Interview',
  description: 'Practice with AI-powered mock interviews and get detailed feedback',
  icon: <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3.707-1.293a1 1 0 00-1.414 0L9 9.586l-.293-.293a1 1 0 00-1.414 1.414l1 1a1 1 0 001.414 0l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
    </svg>
  </div>,
  path: '/mock-interview',
  color: 'from-indigo-500 to-purple-600',
  bgColor: 'bg-indigo-50',
  textColor: 'text-indigo-600'
}
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Interview Preparation Dashboard</h1>
          <p className="mt-3 text-xl text-gray-500">Choose an area to focus on your interview preparation</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.path}
              className={`group relative bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${feature.bgColor} hover:bg-opacity-50`}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${feature.bgColor} bg-opacity-50 group-hover:bg-opacity-100 transition-all duration-300`}>
                  <div className={`${feature.textColor}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
                  Start practicing
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
