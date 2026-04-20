const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const router = express.Router();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? require('stripe')(stripeSecret) : null;

/** Disinfection page products — amounts in HKD cents (Stripe) */
const DISINFECTION_CHECKOUT_PRODUCTS = {
  standard: {
    name: '光自潔™納米消毒 — 標準方案',
    description: '適合一般家居空間之上門消毒服務（每單位起）。',
    unit_amount: 80000, // HK$ 800.00
  },
  premium: {
    name: '光自潔™納米消毒 — 深度方案',
    description: '較大面積或較高要求之專業消毒服務。',
    unit_amount: 280000, // HK$ 2,800.00
  },
};

// Mock Stripe payment processing (replace with actual Stripe integration)
async function processStripePayment(paymentData) {
  // Simulate payment processing
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        resolve({
          success: true,
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
          status: 'completed'
        });
      } else {
        reject(new Error('Payment failed - insufficient funds'));
      }
    }, 2000);
  });
}

// Process payment
router.post('/process', async (req, res) => {
  try {
    const { items, total, payment, couponCode } = req.body;
    
    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in cart' });
    }
    
    if (!payment || !payment.cardNumber || !payment.name || !payment.email) {
      return res.status(400).json({ success: false, message: 'Missing payment information' });
    }
    
    // For demo purposes, use a default user (in production, get from JWT token)
    let user = await User.findOne({ email: payment.email });
    if (!user) {
      // Create user if doesn't exist
      user = await User.create({
        name: payment.name,
        email: payment.email,
        phone: payment.phone || '',
        password: 'temp_password_' + Math.random().toString(36).substr(2, 9)
      });
    }
    
    // Validate and apply coupon if provided
    let finalTotal = total;
    let appliedCoupon = null;
    
    if (couponCode) {
      const coupon = await Coupon.findOne({ 
        code: couponCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() }
      });
      
      if (coupon) {
        appliedCoupon = coupon;
        if (coupon.discountType === 'percentage') {
          finalTotal = total * (1 - coupon.discountValue / 100);
        } else {
          finalTotal = Math.max(0, total - coupon.discountValue);
        }
      }
    }
    
    // Process payment with Stripe
    const paymentResult = await processStripePayment({
      amount: finalTotal,
      currency: 'hkd',
      cardNumber: payment.cardNumber,
      expiry: payment.expiry,
      cvc: payment.cvc,
      name: payment.name
    });
    
    // Create order
    const order = await Order.create({
      user: user._id,
      items: items.map(item => ({
        serviceId: item.name, // Using name as serviceId for demo
        name: item.name,
        price: item.price,
        quantity: item.qty
      })),
      total: finalTotal,
      originalTotal: total, // Store original total before discount
      appliedCoupon: appliedCoupon ? appliedCoupon._id : null,
      paymentDetails: {
        cardLast4: payment.cardNumber.slice(-4),
        paymentMethod: 'card',
        transactionId: paymentResult.transactionId,
        status: paymentResult.status
      },
      billingInfo: {
        name: payment.name,
        email: payment.email,
        phone: payment.phone,
        address: payment.address
      },
      status: paymentResult.success ? 'confirmed' : 'pending'
    });
    
    // Update user's order history
    await User.findByIdAndUpdate(user._id, {
      $push: { orders: order._id }
    });
    
    // Mark coupon as used if applied
    if (appliedCoupon) {
      await Coupon.findByIdAndUpdate(appliedCoupon._id, {
        $inc: { usageCount: 1 }
      });
    }
    
    res.json({
      success: true,
      orderId: order.orderNumber,
      message: 'Payment processed successfully',
      appliedCoupon: appliedCoupon ? {
        code: appliedCoupon.code,
        discountType: appliedCoupon.discountType,
        discountValue: appliedCoupon.discountValue
      } : null
    });
    
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment processing failed'
    });
  }
});

/**
 * Stripe Checkout — redirect to hosted payment page (disinfection products).
 * POST body: { productId: 'standard' | 'premium', customerEmail?: string }
 */
router.post('/create-checkout-session', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      success: false,
      message: 'Stripe is not configured (missing STRIPE_SECRET_KEY)',
    });
  }
  try {
    const { productId, customerEmail } = req.body || {};
    const product = DISINFECTION_CHECKOUT_PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product. Use standard or premium.',
      });
    }

    const siteUrl =
      process.env.PUBLIC_SITE_URL ||
      (req.get('origin') || `${req.protocol}://${req.get('host')}`);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.unit_amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/disinfection-epidemic-prevention.html?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/disinfection-epidemic-prevention.html?canceled=1`,
      ...(customerEmail && typeof customerEmail === 'string'
        ? { customer_email: customerEmail.trim().slice(0, 320) }
        : {}),
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Stripe Checkout error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Could not start checkout',
    });
  }
});

// Get user's orders
router.get('/orders', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId' });
    }
    
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .select('-paymentDetails.cardLast4');
    
    res.json({
      success: true,
      orders: orders
    });
    
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders'
    });
  }
});

// Get order details
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId' });
    }
    
    const order = await Order.findOne({ 
      orderNumber: orderId, 
      user: userId 
    }).select('-paymentDetails.cardLast4');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({
      success: true,
      order: order
    });
    
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order'
    });
  }
});

module.exports = router; 