import React from 'react';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
