// src/pages/MockInterview/components/AnalysisReport.jsx
import { useEffect } from 'react';
import { useInterviewStore } from '../../../stores/useInterviewStore';

const AnalysisReport = () => {
  const { feedback, interviewHistory, isLoading, error } = useInterviewStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Interview Analysis
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed feedback on your performance
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="prose max-w-none">
            {feedback ? (
              <div dangerouslySetInnerHTML={{ __html: feedback }} />
            ) : (
              <p>No feedback available yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Full Transcript
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="space-y-4">
            {interviewHistory.map((entry, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  entry.role === 'assistant' ? 'bg-blue-50' : 'bg-green-50'
                }`}
              >
                <p className="font-medium text-sm text-gray-500">
                  {entry.role === 'assistant' ? 'Interviewer' : 'You'} -{' '}
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </p>
                <p className="mt-1">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;