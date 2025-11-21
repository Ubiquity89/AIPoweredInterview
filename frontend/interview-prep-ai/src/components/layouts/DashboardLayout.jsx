import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
