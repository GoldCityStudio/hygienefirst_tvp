const express = require('express');
const Coupon = require('../models/Coupon');
const router = express.Router();

// Admin: Create coupon
router.post('/admin', async (req, res) => {
  const { code, type, amount, expiry, usageLimit, active } = req.body;
  try {
    const coupon = new Coupon({ code, type, amount, expiry, usageLimit, active });
    await coupon.save();
    res.json(coupon);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Admin: List all coupons
router.get('/admin', async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

// Admin: Delete coupon
router.delete('/admin/:id', async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// User: Apply coupon
router.post('/apply', async (req, res) => {
  const { code } = req.body;
  try {
    const coupon = await Coupon.findOne({ code, active: true });
    if (!coupon) return res.status(404).json({ msg: 'Coupon not found' });
    if (coupon.expiry && new Date() > coupon.expiry) return res.status(400).json({ msg: 'Coupon expired' });
    if (coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ msg: 'Coupon usage limit reached' });
    res.json({ type: coupon.type, amount: coupon.amount });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router; 