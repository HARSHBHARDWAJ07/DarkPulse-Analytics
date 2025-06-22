import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/common/Card.tsx';
import { Button } from '../../components/common/Button.tsx';
import { Textarea } from '../../components/common/Textarea.tsx';
import { useSentimentAnalysis } from '../../hooks/useSentimentAnalysis.ts';
import { SentimentResult } from './SentimentResult.tsx';

export const SentimentTool: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const { analyzeSentiment, loading, error } = useSentimentAnalysis();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    const response = await analyzeSentiment({ text });
    if (response) {
      setResult(response.data);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const exampleTexts = [
    "I absolutely love this product! It's amazing and works perfectly.",
    "This service is terrible. I'm very disappointed with the quality.",
    "The weather today is okay, nothing special but not bad either.",
    "I'm excited about the new features in this update!"
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Sentiment Analysis Tool
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Analyze the emotional tone of any text using our advanced AI-powered sentiment analysis engine.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Input Text
            </h2>
            
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to analyze for sentiment..."
              rows={8}
              className="mb-4"
            />

            <div className="flex flex-col gap-3 mb-6 sm:flex-row">
              <Button
                onClick={handleAnalyze}
                disabled={!text.trim() || loading}
                isLoading={loading}
                className="flex-1"
              >
                {loading ? 'Analyzing...' : 'Analyze Sentiment'}
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </Button>
            </div>

            {error && (
              <div className="p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Example Texts */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Try these examples:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {exampleTexts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setText(example)}
                    className="p-3 text-sm text-left text-gray-700 transition-colors rounded-md bg-gray-50 dark:bg-dark-100 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Analysis Results
            </h2>
            
            {result ? (
              <SentimentResult result={result} originalText={text} />
            ) : (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">🤖</div>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter some text and click "Analyze Sentiment" to see the results here.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Input Text</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enter any text you want to analyze for sentiment
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">AI Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our AI processes the text to determine emotional tone
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Get Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive detailed sentiment scores and explanations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
