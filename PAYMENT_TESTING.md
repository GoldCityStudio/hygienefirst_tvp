# Payment Gateway Testing Guide

## Overview
This website now includes a test payment gateway for the "基本照護方案" (Basic Care Package) service priced at HK$ 2,800.

## Features Implemented

### 1. Payment Modal
- Professional payment form with credit card input
- Real-time input formatting (card number, expiry, CVC)
- Form validation and error handling
- Success/error status display

### 2. Test Credit Card Numbers
Use these test card numbers to simulate different payment scenarios:

#### Success Cards:
- `4242424242424242` - Standard successful payment
- Any other valid card number format (90% success rate)

#### Failure Cards:
- `4000000000000002` - Card declined
- `4000000000009995` - Insufficient funds

### 3. Form Fields
- **持卡人姓名** (Cardholder Name)
- **信用卡號碼** (Credit Card Number) - Auto-formatted with spaces
- **到期日** (Expiry Date) - Auto-formatted as MM/YY
- **CVC** - 3-digit security code
- **電子郵件** (Email)
- **電話號碼** (Phone Number)

## How to Test

### 1. Access the Service Page
- Navigate to `service.html`
- Click "立即購買" (Buy Now) button on the "基本照護方案" card

### 2. Test Payment Scenarios
1. **Successful Payment**: Use `4242424242424242` with any future expiry date
2. **Declined Card**: Use `4000000000000002` to test decline handling
3. **Insufficient Funds**: Use `4000000000009995` to test balance error
4. **Random Cards**: Use any other number for random success/failure

### 3. Expected Behavior
- **Success**: Green checkmark with confirmation message
- **Failure**: Red X with specific error message
- **Processing**: Loading spinner during payment simulation
- **Form Reset**: Form clears after successful payment

## Backend Integration

### Current Setup
- Payment routes configured in `backend/routes/payment.js`
- Stripe dependency installed (`npm install stripe`)
- Mock payment processing for testing

### Production Integration
To connect to real Stripe:
1. Set environment variables:
   ```bash
   STRIPE_SECRET_KEY=sk_live_your_live_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
   ```

2. Update `processTestPayment()` function to call actual Stripe API
3. Replace mock processing with real payment intent creation

## Security Features
- Input validation and sanitization
- Credit card number masking (frontend only)
- Form reset after submission
- Error handling for failed payments

## Mobile Responsiveness
- Payment modal adapts to mobile screens
- Touch-friendly form inputs
- Responsive button sizing

## Next Steps for Production
1. Implement real Stripe integration
2. Add webhook handling for payment confirmations
3. Implement order management system
4. Add email confirmations
5. Set up proper error logging
6. Implement fraud detection measures
