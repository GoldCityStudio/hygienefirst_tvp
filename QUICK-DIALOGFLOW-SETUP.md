# Quick Dialogflow Setup - Environment Variable Method

## 🚀 **Easiest Setup Method**

This is the simplest way to get your Dialogflow chatbot working immediately.

## **Step 1: Get Your Access Token**

### **Option A: Using Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Dialogflow project
3. Go to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID** (Web application)
5. Use the client ID to get an access token

### **Option B: Using Service Account (Recommended)**
1. Go to **IAM & Admin** → **Service Accounts**
2. Create new service account
3. Grant **Dialogflow API Client** role
4. Download JSON key file
5. Use the key to generate access token

### **Option C: Using gcloud CLI**
```bash
# Install gcloud CLI first
gcloud auth application-default print-access-token
```

## **Step 2: Add Token to Your HTML**

Add this script tag **before** the chatbot script in your `booking.html`:

```html
<!-- Add this BEFORE the chatbot script -->
<script>
    // Replace with your actual access token
    window.DIALOGFLOW_ACCESS_TOKEN = 'ya29.a0AfH6SMC...'; // Your token here
</script>
```

## **Step 3: Update Project ID**

In your `booking.html`, find this line and update it:

```javascript
// Find this line in the code:
projectId: 'hygiene-first-booking', // Replace with your actual project ID

// Change it to:
projectId: 'your-actual-project-id', // Your Dialogflow project ID
```

## **Step 4: Test the Integration**

1. **Open your booking page** in a browser
2. **Open Developer Console** (F12)
3. **Click the robot button** to open the chat
4. **Type a message** like "服務價格"
5. **Check the console** for API calls and responses

## **Example Configuration**

Here's a complete example of what to add to your HTML:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <!-- Your existing head content -->
</head>
<body>
    <!-- Your existing body content -->
    
    <!-- Add this script BEFORE the chatbot script -->
    <script>
        // Dialogflow Configuration
        window.DIALOGFLOW_ACCESS_TOKEN = 'ya29.a0AfH6SMC...'; // Your access token
        window.DIALOGFLOW_PROJECT_ID = 'your-project-id'; // Your project ID
    </script>
    
    <!-- Your existing chatbot script -->
    <script>
        // The chatbot will automatically use these values
    </script>
</body>
</html>
```

## **Quick Test Commands**

Open browser console and run these commands to test:

```javascript
// Check if token is loaded
console.log('Access Token:', window.DIALOGFLOW_ACCESS_TOKEN);

// Test API call
sendToDialogflow('服務價格').then(response => {
    console.log('Response:', response);
});

// Check configuration
console.log('Dialogflow Config:', DIALOGFLOW_CONFIG);
```

## **Troubleshooting**

### **Common Issues:**

1. **"No Dialogflow access token configured"**
   - Make sure you added the script tag with the token
   - Check that the token is valid and not expired

2. **"HTTP error! status: 401"**
   - Your access token is invalid or expired
   - Generate a new token

3. **"HTTP error! status: 404"**
   - Your project ID is incorrect
   - Check the project ID in Google Cloud Console

4. **"API not configured"**
   - The token or project ID is missing
   - Verify both are set correctly

## **Security Note**

⚠️ **Important**: This method exposes your access token in the client-side code. For production use, consider using the server-side proxy method instead.

## **Next Steps**

Once this is working:
1. **Create Dialogflow Intents** for your specific use cases
2. **Test different questions** to ensure responses work
3. **Consider upgrading** to server-side authentication for production
4. **Monitor usage** and performance

## **Need Help?**

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your access token is valid
3. Ensure your project ID is correct
4. Make sure Dialogflow API is enabled in your project

The chatbot should now respond with real AI responses from your Dialogflow agent! 🤖✨
