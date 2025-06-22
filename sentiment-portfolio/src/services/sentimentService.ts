import { api } from './api.ts';
import { AnalysisRequest, AnalysisResponse, SentimentAnalysis } from '../types/index.ts';

export const sentimentService = {
  async analyzeSentiment(request: AnalysisRequest): Promise<AnalysisResponse> {
    const response = await api.post('/analysis', request);
    return response.data;
  },

  async getAnalysisHistory(page: number = 1, limit: number = 10): Promise<{
    data: SentimentAnalysis[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> {
    const response = await api.get(`/analysis/history?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getAnalysisById(id: string): Promise<SentimentAnalysis> {
    const response = await api.get(`/analysis/${id}`);
    return response.data.data;
  },
};
