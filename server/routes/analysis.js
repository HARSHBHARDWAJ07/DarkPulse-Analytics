// server/routes/analysis.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const {
  analyzeSentiment,
  getAnalysisHistory,
  getAnalysisById
} = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');

// @route   POST /api/analysis
// @desc    Analyze text sentiment
// @access  Private
router.post(
  '/',
  protect,
  [
    check('text', 'Text is required').notEmpty(),
    check('text', 'Text must be between 1 and 1000 characters').isLength({ min: 1, max: 1000 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    analyzeSentiment(req, res, next);
  }
);

// @route   GET /api/analysis/history
// @desc    Get user's analysis history
// @access  Private
router.get(
  '/history',
  protect,
  getAnalysisHistory
);

// @route   GET /api/analysis/:id
// @desc    Get a specific analysis by ID
// @access  Private
router.get(
  '/:id',
  protect,
  getAnalysisById
);

module.exports = router;
