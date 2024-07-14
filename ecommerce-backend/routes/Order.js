const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  const { customerName, address, products, totalAmount } = req.body;

  if (!customerName || !address || !products || !totalAmount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate products array
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Products must be a non-empty array' });
  }

  try {
    const order = new Order({ customerName, address, products, totalAmount });
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
