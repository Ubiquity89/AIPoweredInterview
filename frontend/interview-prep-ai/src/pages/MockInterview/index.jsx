import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiMic, FiVideo, FiCode, FiMessageSquare } from 'react-icons/fi';
import InterviewSetup from './components/InterviewSetup';
import InterviewRoom from './components/InterviewRoom';
import AnalysisReport from './components/AnalysisReport';

const MockInterview = () => {
  const [step, setStep] = useState('setup'); // setup, interview, analysis
  const [interviewConfig, setInterviewConfig] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const navigate = useNavigate();

  const startInterview = (config) => {
    setInterviewConfig(config);
    setStep('interview');
  };

  const completeInterview = (data) => {
    console.log('1. Interview completed with raw data:', data);
    
    try {
      // Create a safe copy of the data with all required fields
      const safeData = {
        config: {
          type: data?.config?.type || 'technical',
          difficulty: data?.config?.difficulty || 'intermediate'
        },
        questions: Array.isArray(data?.questions) && data.questions.length > 0 
          ? data.questions 
          : [{
              id: 'default-q-' + Date.now(),
              text: 'Sample question',
              response: 'No response recorded',
              timeSpent: 0
            }],
        analysis: {
          communication: 70,
          problemSolving: 70,
          technicalKnowledge: 70,
          confidence: 70,
          ...(data?.analysis || {})
        },
        // Preserve any additional data
        ...data
      };

      console.log('2. Processed interview data:', safeData);
      
      // Store in session storage for debugging
      sessionStorage.setItem('lastInterviewData', JSON.stringify(safeData));
      
      // Update state
      setInterviewData(safeData);
      console.log('3. State updated, navigating to analysis step');
      setStep('analysis');
    } catch (error) {
      console.error('Error in completeInterview:', error);
      // Fallback to minimal data
      const fallbackData = {
        config: { type: 'technical', difficulty: 'intermediate' },
        questions: [{
          id: 'error-fallback',
          text: 'Error loading questions',
          response: 'Error occurred during interview processing',
          timeSpent: 0
        }],
        analysis: {
          communication: 0,
          problemSolving: 0,
          technicalKnowledge: 0,
          confidence: 0
        }
      };
      setInterviewData(fallbackData);
      setStep('analysis');
    }
  };

  const restartInterview = () => {
    console.log('Restarting interview...');
    setStep('setup');
    setInterviewConfig(null);
    setInterviewData(null);
  };

  // Render the analysis report with proper error boundaries
  const renderAnalysisReport = () => {
    console.log('Rendering analysis report with:', { interviewData, interviewConfig });
    
    // Check if we have the minimum required data
    if (!interviewData || !interviewConfig) {
      const errorMessage = !interviewData && !interviewConfig 
        ? 'Interview data and config are missing' 
        : !interviewData 
          ? 'Interview data is missing' 
          : 'Interview config is missing';
          
      console.error('Missing data in analysis report:', { errorMessage, interviewData, interviewConfig });
      
      return (
        <div className="text-center p-8">
          <FiAlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 font-medium mb-2">{errorMessage}</p>
          <p className="text-gray-600 mb-6">Please try starting a new interview.</p>
          <button
            onClick={restartInterview}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start New Interview
          </button>
        </div>
      );
    }
    
    try {
      return (
        <AnalysisReport 
          data={interviewData} 
          config={interviewConfig}
          onRestart={restartInterview} 
        />
      );
    } catch (error) {
      console.error('Error rendering AnalysisReport:', error);
      return (
        <div className="text-center p-8">
          <FiAlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Rendering Report</h2>
          <p className="text-gray-600 mb-6">An error occurred while rendering your interview results.</p>
          <div className="space-x-4">
            <button
              onClick={restartInterview}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Start New Interview
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Mock Interview</h1>
          <p className="mt-2 text-lg text-gray-600">Practice with AI and get detailed feedback on your performance</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {step === 'setup' && <InterviewSetup onStart={startInterview} />}
            {step === 'interview' && interviewConfig && (
              <InterviewRoom 
                config={interviewConfig} 
                onComplete={completeInterview} 
                onCancel={() => setStep('setup')} 
              />
            )}
            {step === 'analysis' && renderAnalysisReport()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
