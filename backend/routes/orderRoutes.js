const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
router.post('/', createOrder);

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public (Should be protected for Admin in real app)
router.get('/', getOrders);

module.exports = router;
