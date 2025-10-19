import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MockInterview from "./pages/MockInterview";
import LandingPage from "./pages/LandingPage";
import RoleBasedQuestions from "./pages/Home/Dashboard";
import Dashboard from "./pages/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import AptitudeTests from "./pages/AptitudeTests";
import AptitudeTestPage from "./pages/AptitudeTests/TestPage";
import CSFundamentals from "./pages/CSFundamentals";
import CompanyQuestions from "./pages/CompanyQuestions/CompanyQuestionsFixed";
import CompanyList from "./pages/CompanyList";
import UserProvider from './context/userContext';
import Navbar from './components/layouts/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ProgrammingMCQs from "./pages/ProgrammingMCQs";

// Layout component that includes Navbar and content
const MainLayout = () => (
  <div>
    <Navbar />
    <div className="pt-16">
      <Outlet />
    </div>
  </div>
);

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aptitude-tests" element={<AptitudeTests />} />
            <Route path="/aptitude-test/:categoryId" element={<AptitudeTestPage />} />
            <Route path="/cs-fundamentals" element={<CSFundamentals />} />
            <Route path="/role-based-questions" element={<RoleBasedQuestions />} />
            <Route path="/programming-mcqs" element={<ProgrammingMCQs />} />
            <Route path="/company-questions" element={<CompanyList />} />
            <Route path="/company-questions/:companyName" element={<CompanyQuestions />} />
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
            <Route path="/mock-interview" element={<MockInterview />} />
          </Route>
        </Routes>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </Router>
    </UserProvider>
  );
};

export default App
