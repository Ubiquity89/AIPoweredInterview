import React from 'react';
import { Link } from 'react-router-dom';

const companies = [
  {
    id: 'google',
    name: 'Google',
    description: 'Prepare for interviews at Google with these common questions',
    logo: 'G',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverBgColor: 'hover:bg-blue-100'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Get ready for Microsoft interviews with these questions',
    logo: 'M',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    borderColor: 'border-green-200',
    hoverBgColor: 'hover:bg-green-100'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Ace your Amazon interview with these questions',
    logo: 'A',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-200',
    hoverBgColor: 'hover:bg-yellow-100'
  },
  {
    id: 'facebook',
    name: 'Meta (Facebook)',
    description: 'Prepare for Meta (Facebook) interviews',
    logo: 'F',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    hoverBgColor: 'hover:bg-indigo-100'
  },
  {
    id: 'apple',
    name: 'Apple',
    description: 'Get ready for Apple interview questions',
    logo: '🍏',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-200',
    hoverBgColor: 'hover:bg-gray-100'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    description: 'Prepare for Netflix technical interviews',
    logo: 'N',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
    hoverBgColor: 'hover:bg-red-100'
  }
];

const CompanyList = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Company Interview Questions
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select a company to view common interview questions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link
              key={company.id}
              to={`/company-questions/${company.id}`}
              className={`flex flex-col p-6 rounded-xl border-2 ${company.borderColor} ${company.bgColor} ${company.hoverBgColor} transition-colors duration-200 transform hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${company.bgColor} flex items-center justify-center text-2xl font-bold ${company.textColor} border-2 ${company.borderColor}`}>
                  {company.logo}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                </div>
              </div>
              <p className="mt-4 text-gray-600 flex-grow">{company.description}</p>
              <div className="mt-4 text-sm font-medium text-blue-600">
                View questions →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
