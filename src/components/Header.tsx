import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">University Room Availability Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 md:hidden"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center">
              <span className="hidden md:inline mr-4">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition-colors duration-200"
              >
                <LogOut size={16} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="hidden md:flex p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;