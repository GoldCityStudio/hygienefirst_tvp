const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get current cart
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ msg: 'Missing userId' });
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  res.json(cart);
});

// Add or update item in cart
router.post('/add', async (req, res) => {
  const { userId, serviceId, name, price, quantity } = req.body;
  if (!userId || !serviceId) return res.status(400).json({ msg: 'Missing userId or serviceId' });
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  const idx = cart.items.findIndex(item => item.serviceId === serviceId);
  if (idx > -1) {
    cart.items[idx].quantity = quantity || 1;
    cart.items[idx].name = name;
    cart.items[idx].price = price;
  } else {
    cart.items.push({ serviceId, name, price, quantity: quantity || 1 });
  }
  await cart.save();
  res.json(cart);
});

// Remove item from cart
router.post('/remove', async (req, res) => {
  const { userId, serviceId } = req.body;
  if (!userId || !serviceId) return res.status(400).json({ msg: 'Missing userId or serviceId' });
  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ msg: 'Cart not found' });
  cart.items = cart.items.filter(item => item.serviceId !== serviceId);
  await cart.save();
  res.json(cart);
});

// Clear cart
router.post('/clear', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ msg: 'Missing userId' });
  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ msg: 'Cart not found' });
  cart.items = [];
  await cart.save();
  res.json(cart);
});

module.exports = router; 