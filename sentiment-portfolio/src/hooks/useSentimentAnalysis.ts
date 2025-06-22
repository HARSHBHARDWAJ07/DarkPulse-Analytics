import { useState } from 'react';
import { AnalysisRequest, AnalysisResponse } from '../types';
import { sentimentService } from '../services/sentimentService.ts';

export const useSentimentAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async (request: AnalysisRequest): Promise<AnalysisResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sentimentService.analyzeSentiment(request);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeSentiment, loading, error };
};
