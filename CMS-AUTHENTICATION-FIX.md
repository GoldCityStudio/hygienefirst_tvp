# GitHub OAuth App Setup for CMS Authentication

## 🚨 **Current Issue**
The CMS is trying to use Netlify authentication, but your site is hosted on Vercel. We need to set up GitHub OAuth authentication instead.

## 🔧 **Solution: Create GitHub OAuth App**

### **Step 1: Create GitHub OAuth Application**

1. **Go to GitHub Settings**:
   - Visit: https://github.com/settings/applications/new
   - Or: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App

2. **Fill in OAuth App Details**:
   ```
   Application name: Hygiene First CMS
   Homepage URL: https://www.hygienefirstgroup.com
   Authorization callback URL: https://www.hygienefirstgroup.com/admin/cms.html
   ```

3. **Get OAuth Credentials**:
   - Copy the **Client ID**
   - Generate and copy the **Client Secret**

### **Step 2: Update CMS Configuration**

The CMS is now configured to use GitHub authentication directly. No additional configuration needed in the HTML file.

### **Step 3: Set Up Vercel Environment Variables**

1. **Go to Vercel Dashboard**:
   - Visit your project settings
   - Go to Environment Variables

2. **Add Environment Variables**:
   ```
   OAUTH_CLIENT_ID=your_github_client_id
   OAUTH_CLIENT_SECRET=your_github_client_secret
   ```

### **Step 4: Test the Setup**

1. **Deploy the updated CMS**:
   ```bash
   git add admin/cms.html
   git commit -m "Fix CMS authentication for Vercel"
   git push origin main
   ```

2. **Test CMS Access**:
   - Visit: `https://www.hygienefirstgroup.com/admin/cms`
   - Click "Login with GitHub"
   - Should redirect to GitHub for authentication
   - After authorization, should return to CMS

## 🔍 **Alternative: Manual GitHub Access**

If OAuth setup is complex, clients can also:

1. **Access GitHub directly**:
   - Go to: `https://github.com/GoldCityStudio/hygienefirst_tvp`
   - Navigate to content folders
   - Edit files directly in GitHub interface

2. **Use GitHub Desktop**:
   - Download GitHub Desktop
   - Clone repository locally
   - Edit files with any text editor
   - Commit and push changes

## 📞 **Quick Fix for Testing**

For immediate testing, you can:

1. **Give clients direct GitHub access**:
   - Add them as collaborators to the repository
   - They can edit files directly in GitHub
   - Changes will auto-deploy via Vercel

2. **Use GitHub web interface**:
   - Navigate to `content/` folders
   - Click "Edit" on any file
   - Make changes and commit
   - Changes appear on website immediately

## 🎯 **Expected Result**

After proper setup:
- ✅ CMS loads without authentication errors
- ✅ Clients can login with GitHub accounts
- ✅ Content updates automatically deploy
- ✅ No more "Not Found" errors

---

**Next Steps**: Set up the GitHub OAuth app and deploy the updated CMS configuration.
