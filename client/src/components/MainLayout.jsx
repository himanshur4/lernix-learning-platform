import React from 'react';
import { useMatch } from 'react-router-dom';
import AppBackground from './AppBg';
import Navbar from './student/Navbar';


const MainLayout = ({ children }) => {
  const isEducatorRoute = useMatch('/educator/*');

  return (
    // This parent div needs to be relative for the absolute background to work

<div className="min-h-screen w-full bg-white bg- relative text-gray-800">
      <AppBackground />
      
      {/* This container holds your actual content and sits on top of the background */}
      <div className="relative z-10">
        {!isEducatorRoute && <Navbar />}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

