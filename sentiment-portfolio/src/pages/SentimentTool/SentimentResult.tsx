import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button.tsx';

interface SentimentResultProps {
  result: {
    sentiment: string;
    confidence: number;
    explanation: string;
  };
  originalText: string;
}

export const SentimentResult: React.FC<SentimentResultProps> = ({ result, originalText }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  const getSentimentBgColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  const handleShare = async () => {
    const shareText = `Sentiment Analysis Result: ${result.sentiment} (${Math.round(result.confidence * 100)}% confidence) - "${originalText.substring(0, 100)}${originalText.length > 100 ? '...' : ''}"`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sentiment Analysis Result',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      // You could add a toast notification here
    }
  };

  const handleCopy = async () => {
    const resultText = `Sentiment: ${result.sentiment}\nConfidence: ${Math.round(result.confidence * 100)}%\nExplanation: ${result.explanation}`;
    await navigator.clipboard.writeText(resultText);
    // You could add a toast notification here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Result */}
      <div className={`p-6 border rounded-lg ${getSentimentBgColor(result.sentiment)}`}>
        <div className="text-center">
          <div className="mb-3 text-6xl">{getSentimentIcon(result.sentiment)}</div>
          <h3 className={`text-2xl font-bold capitalize ${getSentimentColor(result.sentiment)}`}>
            {result.sentiment}
          </h3>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Confidence: {Math.round(result.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Confidence Level</span>
          <span>{Math.round(result.confidence * 100)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-3 rounded-full ${
              result.sentiment.toLowerCase() === 'positive'
                ? 'bg-green-500'
                : result.sentiment.toLowerCase() === 'negative'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
          />
        </div>
      </div>

      {/* Explanation */}
      {result.explanation && (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-100">
          <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Analysis Explanation</h4>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {result.explanation}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={handleCopy} className="flex-1">
          📋 Copy Results
        </Button>
        <Button variant="outline" onClick={handleShare} className="flex-1">
          📤 Share Results
        </Button>
      </div>

      {/* Original Text Preview */}
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-100">
        <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Analyzed Text</h4>
        <p className="text-sm italic text-gray-700 dark:text-gray-300">
          "{originalText}"
        </p>
      </div>
    </motion.div>
  );
};
