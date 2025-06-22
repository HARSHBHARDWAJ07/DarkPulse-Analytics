import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button.tsx';
import { Card } from '../../components/common/Card.tsx';

export const Home: React.FC = () => {
  const features = [
    {
      title: 'Advanced Sentiment Analysis',
      description: 'Powered by cutting-edge AI to analyze emotions and opinions in text with high accuracy.',
      icon: '🧠'
    },
    {
      title: 'Real-time Processing',
      description: 'Get instant sentiment analysis results with detailed confidence scores and explanations.',
      icon: '⚡'
    },
    {
      title: 'Analysis History',
      description: 'Track and review all your previous sentiment analyses with detailed timestamps.',
      icon: '📊'
    },
    {
      title: 'Dark Mode',
      description: 'Comfortable viewing experience with beautiful dark and light theme options.',
      icon: '🌙'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden lg:py-32">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl dark:text-white"
            >
              Sentiment Analysis
              <span className="block text-primary-600 dark:text-primary-400">
                Made Simple
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300"
            >
              Discover the emotions behind any text with our AI-powered sentiment analysis tool. 
              Perfect for social media monitoring, customer feedback analysis, and content optimization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/sentiment-tool">
                <Button size="lg" className="min-w-48">
                  Try Live Demo
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute rounded-full -top-40 -right-32 w-80 h-80 bg-primary-400 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute bg-purple-400 rounded-full -bottom-40 -left-32 w-80 h-80 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bg-yellow-400 rounded-full top-40 left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Powerful Features
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Everything you need for comprehensive sentiment analysis in one beautiful, easy-to-use platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <Card>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of users who trust our sentiment analysis platform for their text analysis needs.
            </p>
            <Link to="/sentiment-tool">
              <Button size="lg">
                Start Analyzing Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};
