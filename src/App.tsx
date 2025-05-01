import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check system preference on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 transition-colors duration-300">
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <div className="container mx-auto px-4 py-12 flex items-center justify-center">
            <LoginForm />
          </div>
        )}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} University Room Availability Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;