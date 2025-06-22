export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

export interface SentimentAnalysis {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  explanation?: string;
  timestamp: string;
  userId: string;
}

export interface AnalysisRequest {
  text: string;
}

export interface AnalysisResponse {
  success: boolean;
  data: {
    sentiment: string;
    confidence: number;
    explanation: string;
  };
  analysisId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name?: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
