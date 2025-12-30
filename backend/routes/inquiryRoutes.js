const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controllers/inquiryController');

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Public
router.post('/', createInquiry);

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public (Should be protected for Admin in real app)
router.get('/', getInquiries);

module.exports = router;
