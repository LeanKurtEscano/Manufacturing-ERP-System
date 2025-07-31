import React, { useState } from 'react';
import Sidebar from '../layouts/Sidebar';
import { Outlet } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
const Dashboard: React.FC = () => {
 const { toggle } = useProfile();

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main Content */}
      <div
        className={`transition-all duration-500 flex-1 ${
          toggle ? 'ml-16' : 'ml-64'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
