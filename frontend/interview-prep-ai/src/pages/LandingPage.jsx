import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Update the import at the top of LandingPage.jsx
import { LuSparkles, LuArrowRight, LuCheck, LuUser, LuStar, LuShield, LuCode, LuMessageSquare, LuUsers, LuAward, LuBookmark, LuSave } from 'react-icons/lu';
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

// Function to generate a consistent color based on user's name
const getRandomColor = (name) => {
  if (!name) return 'bg-gray-100 text-gray-600';
  
  const colors = [
    'bg-blue-100 text-blue-600 border-blue-200',
    'bg-green-100 text-green-600 border-green-200',
    'bg-purple-100 text-purple-600 border-purple-200',
    'bg-pink-100 text-pink-600 border-pink-200',
    'bg-indigo-100 text-indigo-600 border-indigo-200',
    'bg-amber-100 text-amber-600 border-amber-200',
    'bg-rose-100 text-rose-600 border-rose-200',
    'bg-emerald-100 text-emerald-600 border-emerald-200'
  ];
  
  // Create a consistent hash from the name
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Avatar component with fallback to initials
const UserAvatar = ({ user, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };
  
  if (user?.profilePicture) {
    return (
      <img 
        src={user.profilePicture} 
        alt={user.name || 'User'} 
        className={`rounded-full object-cover border-2 border-white shadow-sm ${sizeClasses[size]} ${className}`}
      />
    );
  }
  
  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : 'U';
    
  const colorClass = getRandomColor(user?.name || 'User');
  
  return (
    <div 
      className={`${colorClass} ${sizeClasses[size]} ${className} rounded-full flex items-center justify-center font-semibold border-2 border-white shadow-sm`}
    >
      {initials}
    </div>
  );
};

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7D1C4A] to-[#A53860] bg-clip-text text-transparent">
                InterviewPrepAI
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              {user ? (
                <ProfileInfoCard user={user} />
              ) : (
                <>
                  <button 
                    onClick={() => setOpenAuthModal(true)}
                    className="text-gray-700 hover:text-gray-900 font-medium text-base px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={handleCTA}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#7D1C4A] to-[#A53860] text-white rounded-lg font-semibold text-base hover:opacity-90 hover:shadow-md transition-all transform hover:-translate-y-0.5 flex items-center"
                  >
                    Get Started
                    <LuArrowRight className="ml-2 w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

     {/* Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
  {/* Animated background blobs */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
  </div>

  <div className="container mx-auto px-4 pt-20 md:pt-28 pb-24 md:pb-36 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left side - Content */}
        <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-sm font-medium text-purple-800 mb-6 shadow-md">
            <LuSparkles className="mr-2 w-4 h-4 text-pink-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              AI-Powered Interview Preparation
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Ace Your Next Interview with{' '}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Magic
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            Get <span className="font-semibold text-purple-700">personalized interview practice</span> with AI-generated questions, 
            <span className="font-semibold text-pink-600"> instant feedback</span>, and detailed analytics to help you 
            <span className="font-semibold text-indigo-600"> land your dream job</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={handleCTA}
              className="px-8 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl shadow-pink-200 hover:shadow-pink-300/50 flex items-center justify-center"
            >
              Start Practicing Now
              <LuArrowRight className="ml-3 w-5 h-5 animate-pulse" />
            </button>
            <button 
              onClick={() => {
                const section = document.getElementById('features');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-5 bg-white text-gray-800 border-2 border-gray-200 hover:border-purple-300 rounded-xl text-lg font-medium transition-all hover:shadow-lg flex items-center justify-center"
            >
              <LuSparkles className="mr-3 w-5 h-5 text-purple-600" />
              Explore Features
            </button>
          </div>
          
          {/* User Testimonials */}
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                {['Sarah', 'Michael', 'Priya', 'Carlos', 'Aisha', 'James'].map((name, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <img 
                      src={`https://i.pravatar.cc/150?img=${30 + i}`}
                      alt={name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${name}&background=random`;
                      }}
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-600 shadow-lg">
                  +10K
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <LuStar className="w-3.5 h-3.5 mr-1" />
                <span>5.0</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">10,000+ job seekers</span> have improved their interview skills with us
            </p>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative">
            {/* Main image with 3D effect */}
            <div className="relative z-10 transform transition-all duration-500 hover:scale-105">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl opacity-20 blur-xl -z-10"></div>
              <img 
                src={HERO_IMG} 
                alt="Interview preparation" 
                className="relative z-10 w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border-4 border-white/80 transform rotate-1 hover:rotate-0 transition-all duration-300"
              />
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-xl border border-gray-100 transform -rotate-6">
                <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 p-2 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                    <LuCheck className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-green-800">AI Feedback</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-xl border border-gray-100 transform rotate-6">
                <div className="flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                    <LuMessageSquare className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-blue-800">Real-time Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Animated scroll indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-10 h-16 border-4 border-pink-300 rounded-full flex justify-center p-2">
        <div className="w-2 h-2 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full animate-scroll"></div>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }} />
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-gray-600">
              Our platform provides all the tools and resources to help you prepare 
              and succeed in your next job interview.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {APP_FEATURES.slice(0, 3).map((feature, index) => (
              <div 
                key={feature.id}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:ring-2 hover:ring-pink-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-[#7D1C4A]/5 group-hover:to-[#A53860]/5 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-[#7D1C4A] group-hover:to-[#A53860] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                    {feature.icon === 'code' ? <LuCode className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors" /> :
                     feature.icon === 'message' ? <LuMessageSquare className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors" /> :
                     feature.icon === 'users' ? <LuUsers className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors" /> :
                     feature.icon === 'award' ? <LuAward className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors" /> :
                     <LuSparkles className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7D1C4A] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {APP_FEATURES.slice(3).map((feature, index) => (
              <div 
                key={feature.id}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:ring-2 hover:ring-pink-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-[#7D1C4A]/5 group-hover:to-[#A53860]/5 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-[#7D1C4A] group-hover:to-[#A53860] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                    {feature.icon === 'code' ? <LuCode className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors duration-300" /> :
                     feature.icon === 'message' ? <LuMessageSquare className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors duration-300" /> :
                     feature.icon === 'users' ? <LuUsers className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors duration-300" /> :
                     feature.icon === 'award' ? <LuAward className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors duration-300" /> :
                     feature.icon === 'save' ? <LuSave className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors duration-300" /> :
                     <LuSparkles className="w-6 h-6 text-[#7D1C4A] group-hover:text-white transition-colors duration-300" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7D1C4A] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Join 10,000+ job seekers who aced their interviews</h2>
            <div className="flex -space-x-2 mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                />
              ))}
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our users have successfully landed jobs at top companies worldwide. Be next to join our success stories!
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  InterviewPrepAI
                </span>
                <span className="text-gray-400">&copy; {new Date().getFullYear()}</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Made by Ubiquity</p>
            </div>
            
            <div className="flex space-x-6">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  aria-label={social}
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)}>
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} setOpenAuthModal={setOpenAuthModal} />
        ) : (
          <SignUp setCurrentPage={setCurrentPage} setOpenAuthModal={setOpenAuthModal} />
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;