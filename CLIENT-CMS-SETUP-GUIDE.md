# GitHub OAuth App Setup for Client CMS Access

## 🎯 **Purpose**
This guide helps you set up GitHub OAuth authentication so your clients can access the CMS without needing GitHub accounts or repository access.

## 📋 **Prerequisites**
- GitHub account with admin access to the repository
- Access to Vercel dashboard
- Client's email addresses for access control

## 🔧 **Step 1: Create GitHub OAuth App**

### **1.1 Go to GitHub Settings**
1. Visit: https://github.com/settings/applications/new
2. Or: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App

### **1.2 Fill in OAuth App Details**
```
Application name: Hygiene First CMS
Homepage URL: https://www.hygienefirstgroup.com
Authorization callback URL: https://www.hygienefirstgroup.com/admin/cms.html
```

### **1.3 Get OAuth Credentials**
- Copy the **Client ID**
- Generate and copy the **Client Secret**

## 🔧 **Step 2: Set Up Vercel Environment Variables**

### **2.1 Go to Vercel Dashboard**
1. Visit your project settings
2. Go to Environment Variables

### **2.2 Add Environment Variables**
```
OAUTH_CLIENT_ID=your_github_client_id
OAUTH_CLIENT_SECRET=your_github_client_secret
```

## 🔧 **Step 3: Update Admin Configuration**

### **3.1 Edit `admin/cms.html`**
The CMS is already configured with:
- Repository: `GoldCityStudio/hygienefirst_tvp`
- Branch: `main`
- Domain: `www.hygienefirstgroup.com`

### **3.2 Test the Setup**
1. Visit: `https://www.hygienefirstgroup.com/admin/cms.html`
2. Click "Login with GitHub"
3. Authorize the application

## 🔧 **Step 4: Client Access Management**

### **4.1 Repository Access Control**
1. Go to your GitHub repository settings
2. Navigate to "Manage access"
3. Add collaborators with "Write" access:
   - Client's GitHub username
   - Any team members who need access

### **4.2 Alternative: Organization Access**
If using GitHub Organizations:
1. Create a team for "Content Managers"
2. Add clients to this team
3. Give team "Write" access to repository

## 🔧 **Step 5: Client Training**

### **5.1 Provide Client Access**
Send clients this information:
```
CMS URL: https://www.hygienefirstgroup.com/admin/cms.html
Login: Click "Login with GitHub" and use your GitHub account
```

### **5.2 Training Materials**
Provide clients with:
- Screenshots of the CMS interface
- Step-by-step guides for each content type
- Contact information for technical support

## 🔧 **Step 6: Content Management Workflow**

### **6.1 Client Workflow**
1. **Access CMS**: Go to admin URL
2. **Login**: Use GitHub authentication
3. **Select Collection**: Choose content type
4. **Create/Edit**: Fill in the form
5. **Save**: Content automatically commits to GitHub
6. **Deploy**: Vercel automatically rebuilds site

### **6.2 Content Types Available**
- **🏥 Healthcare Services**: Manage all healthcare services
- **📰 News & Updates**: Publish news articles
- **💊 Drug Database**: Update drug information
- **📍 Collection Points**: Manage collection locations
- **📄 Static Pages**: Edit about/contact pages

## 🔧 **Step 7: Troubleshooting**

### **7.1 Common Issues**

#### **Authentication Problems**
- Check OAuth callback URL matches exactly
- Verify environment variables are set
- Ensure GitHub OAuth app is properly configured

#### **Content Not Appearing**
- Check file paths in collections configuration
- Verify markdown frontmatter format
- Check GitHub repository permissions

#### **Deployment Issues**
- Check Vercel build logs
- Verify file structure matches configuration
- Ensure all required fields are filled

### **7.2 Support Contacts**
- **Technical Issues**: IT Team
- **Content Questions**: Marketing Team
- **Emergency**: [Your Contact Information]

## 🔧 **Step 8: Security Best Practices**

### **8.1 Access Control**
- Regularly review repository access
- Remove access for former employees
- Use strong GitHub passwords

### **8.2 Content Review**
- Set up content review process
- Monitor changes in GitHub
- Backup important content

### **8.3 Regular Maintenance**
- Update dependencies regularly
- Monitor access logs
- Keep OAuth credentials secure

## 📞 **Support**

For technical support or questions about this setup:
- **Email**: [Your Email]
- **Phone**: [Your Phone]
- **GitHub Issues**: [Repository Issues URL]

---

**Last Updated**: January 2025
**Version**: 1.0
