# How to Get Dialogflow Access Token and Project ID

## 🔍 **What You Have vs What You Need**

**What you have:** `1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com`
- This is a **Google OAuth Client ID**, not an access token
- This is used to authenticate users, not to call APIs directly

**What you need:** 
- **Access Token**: A temporary token that allows API calls (starts with `ya29.`)
- **Project ID**: Your Dialogflow project identifier

## 🚀 **Method 1: Get Access Token (Easiest)**

### **Step 1: Go to Google Cloud Console**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Dialogflow project
3. Go to **APIs & Services** → **Credentials**

### **Step 2: Create Service Account**
1. Click **"Create Credentials"** → **"Service Account"**
2. Name: `dialogflow-api-service`
3. Description: `Service account for Dialogflow API access`
4. Click **"Create and Continue"**

### **Step 3: Grant Permissions**
1. Role: **"Dialogflow API Client"**
2. Click **"Continue"** → **"Done"**

### **Step 4: Download Key File**
1. Click on your new service account
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create New Key"**
4. Choose **"JSON"** format
5. Download the file (keep it secure!)

### **Step 5: Generate Access Token**
Use one of these methods:

#### **Option A: Using gcloud CLI**
```bash
# Install gcloud CLI first, then:
gcloud auth activate-service-account --key-file=path/to/your/key.json
gcloud auth print-access-token
```

#### **Option B: Using Google Cloud Shell**
1. Go to [Google Cloud Shell](https://shell.cloud.google.com/)
2. Upload your JSON key file
3. Run:
```bash
gcloud auth activate-service-account --key-file=your-key-file.json
gcloud auth print-access-token
```

#### **Option C: Using Node.js Script**
Create a file `get-token.js`:
```javascript
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');

async function getAccessToken() {
    const auth = new GoogleAuth({
        keyFile: 'path/to/your/key.json',
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    console.log('Access Token:', accessToken.token);
}

getAccessToken();
```

## 🆔 **Method 2: Get Project ID**

### **Option A: From Dialogflow Console**
1. Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Look at the URL: `https://dialogflow.cloud.google.com/#/agent/[PROJECT-ID]/...`
3. The PROJECT-ID is in the URL

### **Option B: From Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Look at the project selector (top left)
3. Your project ID is shown there

### **Option C: From Project Settings**
1. In Google Cloud Console, go to **IAM & Admin** → **Settings**
2. Your Project ID is displayed there

## 🔧 **Method 3: Quick Setup (Alternative)**

If the above seems complex, you can also use the **OAuth Playground**:

### **Step 1: Go to OAuth Playground**
1. Visit [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

### **Step 2: Configure**
1. Click the gear icon (⚙️) in top right
2. Check **"Use your own OAuth credentials"**
3. Enter your Client ID: `1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com`
4. Enter your Client Secret (get this from Google Cloud Console)

### **Step 3: Get Token**
1. In the left panel, find **"Dialogflow API v2"**
2. Select **"https://www.googleapis.com/auth/cloud-platform"**
3. Click **"Authorize APIs"**
4. Sign in with your Google account
5. Click **"Exchange authorization code for tokens"**
6. Copy the **Access Token** (starts with `ya29.`)

## 📝 **Update Your Configuration**

Once you have both values, update your `dialogflow-config-example.html`:

```html
<script>
    // Dialogflow Configuration - Easiest Method
    window.DIALOGFLOW_ACCESS_TOKEN = 'ya29.a0AfH6SMC...'; // Your access token here
    window.DIALOGFLOW_PROJECT_ID = 'your-project-id-12345'; // Your project ID here
    
    window.DIALOGFLOW_LANGUAGE_CODE = 'zh-TW';
    
    console.log('Dialogflow configuration loaded:', {
        hasToken: !!window.DIALOGFLOW_ACCESS_TOKEN,
        projectId: window.DIALOGFLOW_PROJECT_ID,
        languageCode: window.DIALOGFLOW_LANGUAGE_CODE
    });
</script>
```

## 🔍 **What the Values Look Like**

- **Access Token**: `ya29.a0AfH6SMC...` (long string starting with ya29.)
- **Project ID**: `my-dialogflow-project-12345` (usually lowercase with hyphens)

## ⚠️ **Important Notes**

1. **Access tokens expire** (usually after 1 hour)
2. **Keep your service account key secure** - never commit it to version control
3. **For production**, consider using server-side authentication instead
4. **Test immediately** after getting the token as it will expire

## 🧪 **Test Your Setup**

1. **Add the configuration** to your `booking.html`
2. **Open the page** in browser
3. **Open Developer Console** (F12)
4. **Check the console** for configuration confirmation
5. **Click the robot button** and test with "服務價格"

## 🆘 **Still Having Trouble?**

If you're still having issues:
1. **Check the browser console** for error messages
2. **Verify the token** is not expired
3. **Ensure Dialogflow API** is enabled in your project
4. **Make sure the project ID** matches exactly

The access token should look like: `ya29.a0AfH6SMC...` (not like your client ID)
