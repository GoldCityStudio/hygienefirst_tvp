# Fix OAuth Playground "Access Blocked" Error

## 🚨 **Error: "Access blocked: Hygiene First Booking Assistant's request is invalid"**

This error occurs because your OAuth application isn't configured to allow requests from the OAuth Playground.

## 🔧 **Solution 1: Configure OAuth Redirect URIs**

### **Step 1: Go to Google Cloud Console**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `hygienefirstbookingassist-fweq`
3. Go to **APIs & Services** → **Credentials**

### **Step 2: Edit Your OAuth 2.0 Client**
1. Find your OAuth 2.0 Client ID: `1072617552128-vdtiii02sgmi2dgfbne64ke1n9gthia1.apps.googleusercontent.com`
2. Click the **pencil icon** to edit it

### **Step 3: Add Authorized Redirect URIs**
In the **"Authorized redirect URIs"** section, add:
```
https://developers.google.com/oauthplayground
```

### **Step 4: Save Changes**
1. Click **"Save"**
2. Wait a few minutes for changes to propagate

### **Step 5: Try OAuth Playground Again**
1. Go back to [OAuth Playground](https://developers.google.com/oauthplayground/)
2. Follow the steps again

## 🚀 **Solution 2: Alternative Method - Google Cloud Shell**

If OAuth Playground still doesn't work, use Google Cloud Shell:

### **Step 1: Open Google Cloud Shell**
1. Go to [Google Cloud Shell](https://shell.cloud.google.com/)
2. Make sure you're in the correct project: `hygienefirstbookingassist-fweq`

### **Step 2: Create Service Account**
```bash
# Create service account
gcloud iam service-accounts create dialogflow-api --display-name="Dialogflow API Service"

# Grant permissions
gcloud projects add-iam-policy-binding hygienefirstbookingassist-fweq --member="serviceAccount:dialogflow-api@hygienefirstbookingassist-fweq.iam.gserviceaccount.com" --role="roles/dialogflow.client"

# Generate access token
gcloud auth print-access-token
```

### **Step 3: Copy the Token**
The command will output a token starting with `ya29.` - copy this!

## 🔧 **Solution 3: Enable Dialogflow API**

Make sure Dialogflow API is enabled:

### **Step 1: Check API Status**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `hygienefirstbookingassist-fweq`
3. Go to **APIs & Services** → **Library**
4. Search for "Dialogflow API"
5. Make sure it's **enabled**

### **Step 2: Enable if Needed**
If not enabled, click **"Enable"**

## 🔧 **Solution 4: Use Service Account Key**

### **Step 1: Create Service Account Key**
1. Go to **IAM & Admin** → **Service Accounts**
2. Click **"Create Service Account"**
3. Name: `dialogflow-api`
4. Role: **"Dialogflow API Client"**
5. Click **"Create and Continue"** → **"Done"**

### **Step 2: Create Key**
1. Click on your new service account
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create New Key"**
4. Choose **"JSON"** format
5. Download the file

### **Step 3: Generate Token (Node.js)**
Create a file `get-token.js`:
```javascript
const { GoogleAuth } = require('google-auth-library');

async function getAccessToken() {
    const auth = new GoogleAuth({
        keyFile: 'path/to/your/downloaded-key.json',
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    console.log('Access Token:', accessToken.token);
}

getAccessToken();
```

Run with: `node get-token.js`

## 🔧 **Solution 5: Quick Test with gcloud CLI**

If you have gcloud CLI installed:

```bash
# Authenticate
gcloud auth login

# Set project
gcloud config set project hygienefirstbookingassist-fweq

# Get access token
gcloud auth print-access-token
```

## 🧪 **Test Your Token**

Once you get a token starting with `ya29.`:

1. **Update your booking.html**:
```javascript
window.DIALOGFLOW_ACCESS_TOKEN = 'ya29.YOUR_ACTUAL_TOKEN_HERE';
```

2. **Test in browser**:
   - Open `booking.html`
   - Press F12 for console
   - Click robot button
   - Type "服務價格"

## 📋 **Troubleshooting Checklist**

- [ ] Added `https://developers.google.com/oauthplayground` to redirect URIs
- [ ] Dialogflow API is enabled
- [ ] Service account has Dialogflow API Client role
- [ ] Token starts with `ya29.`
- [ ] Project ID is correct: `hygienefirstbookingassist-fweq`

## 🎯 **Recommended Next Steps**

1. **Try Solution 1** (add redirect URI) - this usually fixes the OAuth Playground issue
2. **If that doesn't work**, use **Solution 2** (Google Cloud Shell) - this is the most reliable method
3. **Test your token** immediately as it expires in about 1 hour

The Google Cloud Shell method (Solution 2) is usually the most reliable and doesn't require OAuth configuration changes!
