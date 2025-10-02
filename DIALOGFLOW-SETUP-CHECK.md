# Dialogflow Setup Diagnostic Tool

## 🔍 **Current Configuration Analysis**

I can see you've added the configuration to your `booking.html`, but there's an issue:

### **❌ Problem Found:**
```javascript
window.DIALOGFLOW_ACCESS_TOKEN = '1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com';
```

**This is NOT an access token!** This is still your Google OAuth Client ID.

### **✅ What You Have Correct:**
```javascript
window.DIALOGFLOW_PROJECT_ID = 'hygienefirstbookingassist-fweq';  // ✅ This looks correct
window.DIALOGFLOW_LANGUAGE_CODE = 'zh-TW';  // ✅ This is correct
```

## 🚀 **Quick Fix Steps**

### **Step 1: Get the Real Access Token**

**Easiest Method - Using OAuth Playground:**

1. **Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)**
2. **Click the gear icon (⚙️)** in top right
3. **Check "Use your own OAuth credentials"**
4. **Enter your Client ID**: `1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com`
5. **Get your Client Secret** from Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project `hygienefirstbookingassist-fweq`
   - Go to **APIs & Services** → **Credentials**
   - Find your OAuth 2.0 Client ID
   - Copy the **Client Secret**
6. **Back in OAuth Playground**:
   - Enter the Client Secret
   - In the left panel, find **"Dialogflow API v2"**
   - Select: `https://www.googleapis.com/auth/cloud-platform`
   - Click **"Authorize APIs"** and sign in
   - Click **"Exchange authorization code for tokens"**
   - Copy the **Access Token** (should start with `ya29.`)

### **Step 2: Update Your Configuration**

Replace this line in your `booking.html`:
```javascript
// WRONG (current):
window.DIALOGFLOW_ACCESS_TOKEN = '1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com';

// CORRECT (replace with your actual access token):
window.DIALOGFLOW_ACCESS_TOKEN = 'ya29.a0AfH6SMC...'; // Your real access token here
```

## 🧪 **Test Your Setup**

### **Step 1: Open Browser Console**
1. Open `booking.html` in your browser
2. Press **F12** to open Developer Console
3. Look for the configuration message

### **Step 2: Check Configuration**
You should see:
```
Dialogflow configuration loaded: {
    hasToken: true,
    projectId: "hygienefirstbookingassist-fweq",
    languageCode: "zh-TW"
}
```

### **Step 3: Test the Chatbot**
1. Click the robot button
2. Type "服務價格"
3. Check console for API calls

## 🔍 **What to Look For**

### **✅ Correct Access Token Format:**
- Starts with `ya29.`
- Very long string (hundreds of characters)
- Example: `ya29.a0AfH6SMC...`

### **❌ Wrong Format (what you currently have):**
- Ends with `.apps.googleusercontent.com`
- Much shorter
- Example: `1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com`

## 🚨 **Common Issues & Solutions**

### **Issue 1: "No Dialogflow access token configured"**
- **Cause**: Access token is missing or invalid format
- **Solution**: Get real access token using OAuth Playground

### **Issue 2: "HTTP error! status: 401"**
- **Cause**: Invalid or expired access token
- **Solution**: Generate new access token

### **Issue 3: "HTTP error! status: 404"**
- **Cause**: Wrong project ID or Dialogflow API not enabled
- **Solution**: Verify project ID and enable Dialogflow API

## 📋 **Checklist**

- [ ] Access token starts with `ya29.`
- [ ] Project ID is `hygienefirstbookingassist-fweq`
- [ ] Language code is `zh-TW`
- [ ] Dialogflow API is enabled in your project
- [ ] Console shows "Dialogflow configuration loaded"
- [ ] Chatbot responds to test messages

## 🎯 **Next Steps**

1. **Get the real access token** using OAuth Playground
2. **Update your configuration** in booking.html
3. **Test the chatbot** with "服務價格"
4. **Check console** for any error messages

Once you have the correct access token (starting with `ya29.`), your Dialogflow integration should work perfectly!
