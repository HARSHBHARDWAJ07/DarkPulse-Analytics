const AnalysisRecord = require('../models/AnalysisRecord');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { validationResult } = require('express-validator');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Analyze text sentiment using Google Gemini API
exports.analyzeSentiment = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    const userId = req.user.id; // From auth middleware

    // Use Gemini 1.5 Flash model for sentiment analysis
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    });

    // Construct the prompt for Gemini
    const prompt = `Act as a sentiment analysis tool. Analyze the sentiment of the following text and respond with a JSON object containing these properties:
      - "sentiment": (only "positive", "negative", or "neutral")
      - "confidence": (a decimal number between 0 and 1)
      - "explanation": (brief explanation of the sentiment analysis in one sentence)
    
    Text: "${text}"
    
    Respond ONLY with valid JSON in this exact format:
    {
      "sentiment": "...",
      "confidence": ...,
      "explanation": "..."
    }`;

    // Call Gemini API for sentiment analysis
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Parse the JSON response
    const sentimentResult = JSON.parse(responseText);

    // Create a new analysis record
    const newAnalysis = new AnalysisRecord({
      userId,
      text,
      sentimentScores: {
        sentiment: sentimentResult.sentiment,
        confidence: sentimentResult.confidence,
        explanation: sentimentResult.explanation
      },
      timestamp: Date.now()
    });

    // Save to database
    await newAnalysis.save();

    // Return the result
    return res.status(200).json({
      success: true,
      data: sentimentResult,
      analysisId: newAnalysis._id
    });
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error analyzing sentiment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's analysis history
exports.getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const analyses = await AnalysisRecord.find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AnalysisRecord.countDocuments({ userId });

    return res.status(200).json({
      success: true,
      data: analyses,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching analysis history'
    });
  }
};

// Get a specific analysis by ID
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await AnalysisRecord.findById(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    // Check if the analysis belongs to the requesting user
    if (analysis.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this analysis'
      });
    }

    return res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching analysis'
    });
  }
};
