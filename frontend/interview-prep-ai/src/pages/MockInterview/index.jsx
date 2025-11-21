// src/pages/MockInterview/index.jsx
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InterviewSetup from './components/InterviewSetup';
import InterviewRoom from './components/InterviewRoom';
import AnalysisReport from './components/AnalysisReport';
import { useInterviewStore } from '../../stores/useInterviewStore';

const MockInterview = () => {
  const location = useLocation();
  const { isInterviewActive } = useInterviewStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<InterviewSetup />} />
          <Route 
            path="room" 
            element={isInterviewActive ? <InterviewRoom /> : <Navigate to="/mock-interview" replace />} 
          />
          <Route 
            path="analysis" 
            element={isInterviewActive ? <AnalysisReport /> : <Navigate to="/mock-interview" replace />} 
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default MockInterview;