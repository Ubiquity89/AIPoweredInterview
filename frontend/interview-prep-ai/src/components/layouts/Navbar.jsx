import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { UserContext } from '../../context/userContext';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const handleGetStarted = () => {
    if (!user) {
      // Handle login/signup flow
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7D1C4A] to-[#A53860] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                InterviewPrepAI
              </h1>
            </Link>
          </div>
          
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="hidden md:inline-flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Sign In
                </Link>
                <button
                  onClick={handleGetStarted}
                  className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#7D1C4A] to-[#A53860] hover:from-[#6a173e] hover:to-[#8c2c4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
                >
                  Get Started Free
                  <LuArrowRight className="ml-2 h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center">
                {!isDashboard && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#7D1C4A] to-[#A53860] hover:from-[#6a173e] hover:to-[#8c2c4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
                  >
                    Go to Dashboard
                    <LuArrowRight className="ml-2 h-4 w-4" />
                  </button>
                )}
                <div className={isDashboard ? '' : 'ml-4'}>
                  <ProfileInfoCard />
                </div>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
