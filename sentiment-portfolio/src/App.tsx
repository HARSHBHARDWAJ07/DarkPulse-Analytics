import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { Home } from './pages/Home/index.tsx';
import {About} from './pages/About/index.tsx';
import { ProtectedRoute } from './components/Auth/ProtectedRoute.tsx';
import { PublicRoute } from './components/Auth/PublicRoute.tsx';
import { SentimentTool } from './pages/SentimentTool/index.tsx';
import { AnalysisHistory } from './pages/AnalysisHistory/index.tsx';
import { Blog } from './pages/Blog/index.tsx';
import { Contact } from './pages/Contact/index.tsx';
import { Login } from './pages/Auth/Login/index.tsx';
import { Signup } from './pages/Auth/Signup/index.tsx';

import { useTheme } from './hooks/useTheme.ts';

function App() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-dark-300 dark:text-gray-100">
        <Router>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
               <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
               <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
            <Route path="/sentiment-tool" element={
                <ProtectedRoute>
                  <SentimentTool />
                </ProtectedRoute>
              } />
              <Route path="/analysis-history" element={
                <ProtectedRoute>
                  <AnalysisHistory />
                </ProtectedRoute>
              } />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
