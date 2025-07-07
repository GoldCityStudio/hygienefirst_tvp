const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percent', 'fixed'], required: true },
  amount: { type: Number, required: true },
  expiry: { type: Date },
  usageLimit: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Coupon', CouponSchema); 