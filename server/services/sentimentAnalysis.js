const axios = require('axios');

class SentimentAnalysisService {
  constructor() {
    this.openAIApiKey = process.env.OPENAI_API_KEY;
    this.openAIBaseUrl = 'https://api.openai.com/v1';
  }

  /**
   * Analyze sentiment using OpenAI GPT
   */
  async analyzeWithOpenAI(text) {
    try {
      const response = await axios.post(
        `${this.openAIBaseUrl}/chat/completions`,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a sentiment analysis expert. Analyze the sentiment of the given text and respond with a JSON object containing:
              - sentiment: one of "positive", "negative", or "neutral"
              - confidence: a number between 0 and 1 representing confidence in the analysis
              - explanation: a brief explanation of why this sentiment was determined
              - positiveScore: confidence score for positive sentiment (0-1)
              - negativeScore: confidence score for negative sentiment (0-1)
              - neutralScore: confidence score for neutral sentiment (0-1)`
            },
            {
              role: 'user',
              content: `Analyze the sentiment of this text: "${text}"`
            }
          ],
          temperature: 0.3,
          max_tokens: 300,
          response_format: { type: 'json_object' }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openAIApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = JSON.parse(response.data.choices[0].message.content);
      
      // Validate and normalize the response
      return this.normalizeResult(result);
    } catch (error) {
      console.error('OpenAI API error:', error.response?.data || error.message);
      throw new Error('Failed to analyze sentiment with OpenAI');
    }
  }

  /**
   * Fallback sentiment analysis using a simple rule-based approach
   */
  analyzeFallback(text) {
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 
      'awesome', 'love', 'like', 'happy', 'joy', 'pleased', 'satisfied',
      'perfect', 'brilliant', 'outstanding', 'superb', 'marvelous'
    ];

    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'angry',
      'sad', 'disappointed', 'frustrated', 'annoyed', 'upset', 'disgusting',
      'pathetic', 'useless', 'worthless', 'dreadful', 'appalling'
    ];

    const words = text.toLowerCase().split(/\W+/);
    let positiveScore = 0;
    let negativeScore = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore++;
      if (negativeWords.includes(word)) negativeScore++;
    });

    const totalWords = words.length;
    const positiveRatio = positiveScore / totalWords;
    const negativeRatio = negativeScore / totalWords;

    let sentiment, confidence;
    
    if (positiveRatio > negativeRatio) {
      sentiment = 'positive';
      confidence = Math.min(0.8, positiveRatio * 10); // Cap at 0.8 for rule-based
    } else if (negativeRatio > positiveRatio) {
      sentiment = 'negative';
      confidence = Math.min(0.8, negativeRatio * 10);
    } else {
      sentiment = 'neutral';
      confidence = 0.6; // Moderate confidence for neutral
    }

    return {
      sentiment,
      confidence,
      explanation: `Rule-based analysis detected ${positiveScore} positive and ${negativeScore} negative words.`,
      positiveScore: positiveRatio,
      negativeScore: negativeRatio,
      neutralScore: 1 - (positiveRatio + negativeRatio)
    };
  }

  /**
   * Main sentiment analysis method with fallback
   */
  async analyzeSentiment(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error('Text is required for sentiment analysis');
    }

    // Sanitize input
    const sanitizedText = text.trim().substring(0, 5000); // Limit length

    try {
      // Try OpenAI first
      if (this.openAIApiKey) {
        return await this.analyzeWithOpenAI(sanitizedText);
      } else {
        console.warn('OpenAI API key not configured, using fallback analysis');
        return this.analyzeFallback(sanitizedText);
      }
    } catch (error) {
      console.error('Primary sentiment analysis failed, using fallback:', error.message);
      return this.analyzeFallback(sanitizedText);
    }
  }

  /**
   * Normalize and validate analysis results
   */
  normalizeResult(result) {
    const validSentiments = ['positive', 'negative', 'neutral'];
    
    return {
      sentiment: validSentiments.includes(result.sentiment) ? result.sentiment : 'neutral',
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      explanation: result.explanation || 'Sentiment analysis completed',
      positiveScore: Math.max(0, Math.min(1, result.positiveScore || 0)),
      negativeScore: Math.max(0, Math.min(1, result.negativeScore || 0)),
      neutralScore: Math.max(0, Math.min(1, result.neutralScore || 0))
    };
  }

  /**
   * Batch sentiment analysis
   */
  async analyzeBatch(texts) {
    const results = [];
    
    for (const text of texts) {
      try {
        const result = await this.analyzeSentiment(text);
        results.push({ text, ...result, success: true });
      } catch (error) {
        results.push({ 
          text, 
          success: false, 
          error: error.message 
        });
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }
}

module.exports = new SentimentAnalysisService();
