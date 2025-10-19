import React, { useEffect } from 'react';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiBarChart2,
  FiMessageSquare,
  FiRefreshCw,
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AnalysisReport = ({ data, onRestart, config }) => {
  const navigate = useNavigate();

  // Debug: Log the received props
  useEffect(() => {
    console.log('AnalysisReport - Received data:', data);
    console.log('AnalysisReport - Received config:', config);
  }, [data, config]);

  // Check if we have valid data
  if (!data || !config) {
    return (
      <div className="text-center p-8">
        <FiAlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h2>
        <p className="mt-2 text-gray-600">
          We couldn't load your interview results.
        </p>
        <button
          onClick={onRestart}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start New Interview
        </button>
      </div>
    );
  }

  // Ensure we have valid questions array
  const questions = Array.isArray(data.questions) ? data.questions : [];

  // Calculate average time per question with fallback
  const avgTimePerQuestion =
    questions.length > 0
      ? questions.reduce((acc, q) => acc + (q.timeSpent || 0), 0) /
        questions.length
      : 0;

  // Ensure we have valid analysis data with fallbacks
  const analysis = {
    communication: 0,
    problemSolving: 0,
    technicalKnowledge: 0,
    confidence: 0,
    ...(data.analysis || {}),
  };

  // Calculate overall score as an average of all metrics
  const overallScore = Math.round(
    (analysis.communication +
      analysis.problemSolving +
      (analysis.technicalKnowledge || 0) +
      analysis.confidence) /
      (analysis.technicalKnowledge ? 4 : 3)
  );

  // Calculate duration with fallback
  const duration =
    data.duration ||
    questions.reduce((total, q) => total + (q.timeSpent || 0), 0);

  // Performance metrics
  const performanceMetrics = [
    {
      name: 'Communication',
      score: analysis.communication || 0,
      description:
        'Clarity, articulation, and organization of your responses.',
    },
    {
      name: 'Problem Solving',
      score: analysis.problemSolving || 0,
      description: 'Approach to solving problems and handling challenges.',
    },
    {
      name: 'Technical Knowledge',
      score: analysis.technicalKnowledge || 0,
      description: 'Depth and accuracy of your technical understanding.',
    },
    {
      name: 'Confidence',
      score: analysis.confidence || 0,
      description: 'Assurance and self-confidence during the interview.',
    },
  ].filter((metric) => metric.score > 0);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <FiCheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Interview Completed!
        </h2>
        <p className="mt-2 text-gray-600">
          You've completed the {config?.type || 'interview'}. Here's how you did:
        </p>

        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-sm font-medium text-gray-500">
                  Overall Score
                </p>
                <div className="mt-1 flex items-baseline justify-center sm:justify-start">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {overallScore}%
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    out of 100%
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      overallScore >= 80
                        ? 'bg-green-500'
                        : overallScore >= 60
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${overallScore}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 text-center sm:text-right">
                  {overallScore >= 80
                    ? 'Excellent!'
                    : overallScore >= 60
                    ? 'Good job!'
                    : 'Keep practicing!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Time */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FiClock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Time
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {Math.floor(duration / 60)}m {duration % 60}s
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Count */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FiCheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Questions
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {questions.length}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      completed
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Avg Time per Question */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <FiClock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Time/Question
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {Math.floor(avgTimePerQuestion / 60)}m{' '}
                      {Math.floor(avgTimePerQuestion % 60)}s
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FiBarChart2 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Difficulty
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 capitalize">
                      {config.difficulty}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Performance Metrics
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Detailed breakdown of your interview performance
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">
                    {metric.name}
                  </span>
                  <span className="font-medium text-gray-900">
                    {metric.score}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      metric.score >= 8
                        ? 'bg-green-500'
                        : metric.score >= 6
                        ? 'bg-blue-500'
                        : metric.score >= 4
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.score * 10}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback & Recommendations + Question Review */}
      <div className="space-y-8">
        {/* Feedback Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Feedback & Recommendations
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Personalized tips to improve your interview skills
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {Array.isArray(data.analysis?.feedback) &&
              data.analysis.feedback.length > 0 ? (
                data.analysis.feedback.map((feedback, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 pt-0.5">
                      <FiMessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{feedback}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No feedback available</p>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <FaRegLightbulb className="mr-2 text-yellow-500" />
                Pro Tip
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                Practice explaining your thought process out loud while solving
                problems. Interviewers value clear communication as much as
                technical skills.
              </p>
            </div>
          </div>
        </div>

        {/* Question Review Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Question Review
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Review your responses and see model answers
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-8">
              {questions.map((question, index) => (
                <div
                  key={question.id || index}
                  className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium text-sm">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-base font-medium text-gray-900">
                        {question.text}
                      </h4>
                      <div className="mt-2 bg-blue-50 p-3 rounded-md">
                        <h5 className="text-sm font-medium text-blue-800">
                          Your Response
                        </h5>
                        <p className="mt-1 text-sm text-gray-700">
                          {question.response || 'No response provided'}
                        </p>
                      </div>
                      <div className="mt-3 bg-gray-50 p-3 rounded-md">
                        <h5 className="text-sm font-medium text-gray-800">
                          Time Spent
                        </h5>
                        <p className="mt-1 text-sm text-gray-600">
                          {Math.floor(question.timeSpent / 60)}m{' '}
                          {question.timeSpent % 60}s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Dashboard
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Try Another Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
