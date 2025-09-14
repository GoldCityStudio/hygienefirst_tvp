# Testing Guide for HygieneFirstTVP Registration System

## Overview
This guide explains how to test the registration and login functionality of the HygieneFirstTVP member system.

## Test Accounts Available

### Test Account 1
- **Name:** Test User 1
- **Email:** test1@hygienefirst.com
- **Password:** test123456
- **Phone:** +852-1234-5678

### Test Account 2
- **Name:** Test User 2
- **Email:** test2@hygienefirst.com
- **Password:** password123
- **Phone:** +852-9876-5432

### Admin Test Account
- **Name:** Admin Test
- **Email:** admin@hygienefirst.com
- **Password:** admin123456
- **Phone:** +852-5555-5555

## How to Test

### Method 1: Using the Test Page
1. Open `test-registration.html` in your browser
2. Click "Fill Test Account 1" or "Fill Test Account 2" to auto-fill the registration form
3. Click "Test Registration" to switch to the registration form
4. Submit the form to test registration functionality
5. Use "Test Login" to switch to login form and test login functionality

### Method 2: Using the Main Member Page
1. Open `member-account.html` in your browser
2. Click "立即註冊" (Register Now) to switch to registration form
3. Fill in the form with any of the test account data above
4. Submit the form to test registration
5. Click "登入" (Login) to switch back to login form
6. Use the same credentials to test login

## Testing Scenarios

### Registration Testing
1. **Valid Registration:** Use any test account data to register
2. **Duplicate Email:** Try registering with the same email twice
3. **Invalid Email:** Try registering with an invalid email format
4. **Missing Fields:** Try submitting without required fields
5. **Password Requirements:** Test with various password lengths

### Login Testing
1. **Valid Login:** Use test account credentials to log in
2. **Invalid Email:** Try logging in with non-existent email
3. **Wrong Password:** Try logging in with incorrect password
4. **Empty Fields:** Try submitting login form without credentials

## Backend Testing

### Starting the Backend Server
```bash
cd backend
npm install
node server.js
```

### API Endpoints
- **Registration:** POST `/api/auth/register`
- **Login:** POST `/api/auth/login`

### Example API Calls

#### Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User 1",
    "email": "test1@hygienefirst.com",
    "password": "test123456"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test1@hygienefirst.com",
    "password": "test123456"
  }'
```

## Expected Results

### Successful Registration
- Form switches to registration view
- User data is submitted to backend
- JWT token is returned
- User is redirected to dashboard
- Success message is displayed

### Successful Login
- User credentials are validated
- JWT token is returned
- User is redirected to dashboard
- User information is displayed

### Error Handling
- Invalid credentials show error messages
- Network errors are handled gracefully
- Form validation prevents invalid submissions

## Troubleshooting

### Common Issues
1. **Backend not running:** Make sure the backend server is started
2. **CORS errors:** Check if backend has CORS enabled
3. **Database connection:** MongoDB connection is optional for demo mode
4. **JavaScript errors:** Check browser console for errors

### Debug Steps
1. Open browser developer tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for API call failures
4. Verify all required files are loaded

## Files Created for Testing
- `test-registration.html` - Comprehensive test page
- `test-account-data.json` - Test account data
- `backend/create-test-account.js` - Script to create test accounts
- `TESTING-GUIDE.md` - This documentation

## Notes
- These are test accounts only - not real user data
- The system works in demo mode without MongoDB connection
- All test data is safe to use and modify
- The registration functionality has been fixed and tested
