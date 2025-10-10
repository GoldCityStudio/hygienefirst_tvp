# Google OAuth Setup Guide for Hygiene First CMS

This guide will help you set up Google OAuth authentication for the Hygiene First CMS, making it easier for clients to log in using their Gmail/Google accounts.

## 🚀 Benefits of Google OAuth

- **Easier for clients**: Most people already have Google accounts
- **No GitHub knowledge required**: Clients don't need to understand GitHub
- **Familiar interface**: Google's login is widely recognized
- **Better security**: Google handles security best practices

## 📋 Prerequisites

- Google account with access to Google Cloud Console
- Admin access to the Hygiene First website

## 🔧 Step 1: Create Google OAuth Application

### 1.1 Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

### 1.2 Create or Select Project
- Click "Select a project" at the top
- Click "New Project"
- Name: `Hygiene First CMS`
- Click "Create"

### 1.3 Enable Google+ API
- Go to "APIs & Services" → "Library"
- Search for "Google+ API"
- Click on it and press "Enable"

### 1.4 Create OAuth Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth client ID"
- If prompted, configure OAuth consent screen first:
  - Choose "External" user type
  - Fill in required fields:
    - App name: `Hygiene First CMS`
    - User support email: Your email
    - Developer contact: Your email
  - Add scopes: `email`, `profile`, `openid`
  - Add test users: Your email and client emails

### 1.5 Configure OAuth Client
- Application type: `Web application`
- Name: `Hygiene First CMS`
- Authorized redirect URIs:
  ```
  https://www.hygienefirstgroup.com/admin/auth.html
  ```
- Click "Create"

### 1.6 Copy Credentials
- Copy the **Client ID** (you'll need this)
- Copy the **Client Secret** (keep this secure)

## 🔧 Step 2: Update Website Configuration

### 2.1 Update Auth Page
Replace `YOUR_GOOGLE_CLIENT_ID` in `admin/auth.html` with your actual Google Client ID:

```javascript
const GOOGLE_CLIENT_ID = 'your-actual-google-client-id-here';
```

### 2.2 Add Environment Variables (Optional)
For production, add these to your Vercel environment variables:
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret

## 🔧 Step 3: Test the Setup

### 3.1 Test Google Login
1. Visit: `https://www.hygienefirstgroup.com/admin/cms`
2. Click "Login with Google"
3. Complete Google authentication
4. Verify you're redirected back to CMS

### 3.2 Test GitHub Login (Backup)
1. Click "Login with GitHub" 
2. Complete GitHub authentication
3. Verify both methods work

## 🔧 Step 4: Client Access Setup

### 4.1 Add Client Emails to OAuth App
- Go back to Google Cloud Console
- Go to "APIs & Services" → "OAuth consent screen"
- Add client email addresses to "Test users"
- Or publish the app for public use

### 4.2 Send Client Instructions
Send clients this information:
- **CMS URL**: `https://www.hygienefirstgroup.com/admin/cms`
- **Login Method**: Click "Login with Google" and use their Gmail account
- **Backup Method**: Can also use GitHub if they prefer

## 🔧 Step 5: Production Considerations

### 5.1 Server-Side Token Exchange
Currently using mock tokens. For production, implement server-side token exchange:

```javascript
// Exchange Google OAuth code for access token
const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    code: oauthCode,
    grant_type: 'authorization_code',
    redirect_uri: GOOGLE_REDIRECT_URI
  })
});
```

### 5.2 User Management
Consider implementing:
- User role management
- Access control based on email domains
- Audit logging for content changes

## 🚨 Security Notes

- Keep Client Secret secure
- Use HTTPS for all OAuth flows
- Regularly review OAuth app permissions
- Monitor for suspicious activity
- Consider IP restrictions for admin access

## 📞 Support

If you encounter issues:
1. Check Google Cloud Console for error logs
2. Verify redirect URI matches exactly
3. Ensure OAuth consent screen is configured
4. Check that test users are added (if using test mode)

## 🎯 Expected Result

After setup:
- ✅ Clients can login with Gmail accounts
- ✅ CMS loads after Google authentication
- ✅ Both Google and GitHub login work
- ✅ Content management works normally
- ✅ No more Netlify authentication issues

The Google OAuth integration provides a much more user-friendly experience for clients who want to manage website content without needing GitHub knowledge.
