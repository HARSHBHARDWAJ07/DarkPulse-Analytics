// server/models/AnalysisRecord.js
const mongoose = require('mongoose');

const AnalysisRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    enum: ['manual', 'twitter', 'facebook', 'instagram', 'other'],
    default: 'manual'
  },
  sourceId: {
    type: String,
    sparse: true
  },
  sentimentScores: {
    sentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral'],
      required: true
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      required: true
    },
    explanation: {
      type: String
    },
    // Additional sentiment metrics could be added here
    positiveScore: Number,
    negativeScore: Number,
    neutralScore: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for faster queries
AnalysisRecordSchema.index({ userId: 1, timestamp: -1 });
AnalysisRecordSchema.index({ 'sentimentScores.sentiment': 1 });

module.exports = mongoose.model('AnalysisRecord', AnalysisRecordSchema);
