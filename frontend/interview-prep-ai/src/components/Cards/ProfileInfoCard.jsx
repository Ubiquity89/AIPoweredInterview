import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

// Function to generate a consistent color based on user's name
const getRandomColor = (name) => {
  if (!name) return 'bg-gray-100 text-gray-600 border-gray-200';
  
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

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const colorClass = getRandomColor(user?.name);

  if (!user) return null;
  
  return (
    <div className='group relative'>
      <div className='flex items-center space-x-3 p-2 pr-4 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
        {user.profileImageUrl ? (
          <div className='relative'>
            <img 
              src={user.profileImageUrl} 
              alt={user.name || 'User'}
              className='w-10 h-10 rounded-full border-2 border-white shadow-md object-cover transition-transform duration-200 group-hover:scale-105' 
            />
          </div>
        ) : (
          <div className={`${colorClass} w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 border-white shadow-md transition-all duration-200 group-hover:scale-105`}>
            <span className='relative'>{getUserInitials()}</span>
          </div>
        )}
        
        <div className='flex flex-col justify-center'>
          <div className='text-sm font-medium text-gray-800 leading-tight'>Hello, {user.name?.split(' ')[0] || 'User'}</div>
          <button 
            onClick={handleLogout}
            className='text-xs text-gray-500 hover:text-pink-600 font-medium hover:underline transition-colors pt-0.5 flex items-center group/button'
          >
            Sign out
            <svg className='w-3.5 h-3.5 ml-1 text-gray-400 group-hover/button:text-pink-500 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
