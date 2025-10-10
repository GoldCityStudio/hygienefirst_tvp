# GitHub Repository Access Setup Guide

## 🎯 **Quick Setup Checklist**

### **Before You Start**
- [ ] Client has email address
- [ ] You have admin access to repository
- [ ] Repository is `GoldCityStudio/hygienefirst_tvp`

### **Setup Steps**
- [ ] Go to repository settings
- [ ] Navigate to "Manage access"
- [ ] Invite client as collaborator
- [ ] Set permission to "Write"
- [ ] Send client invitation
- [ ] Client accepts invitation
- [ ] Test CMS access

## 🔧 **Detailed Instructions**

### **Step 1: Repository Settings**
1. Navigate to: `https://github.com/GoldCityStudio/hygienefirst_tvp`
2. Click the **"Settings"** tab
3. Look for **"Manage access"** in the left sidebar
4. Click **"Manage access"**

### **Step 2: Invite Collaborator**
1. Click **"Invite a collaborator"** button
2. In the search box, enter:
   - Client's GitHub username (if they have one)
   - OR client's email address (if they don't have GitHub)
3. Select **"Write"** permission
4. Click **"Add [username] to this repository"**

### **Step 3: Client Onboarding**
1. **Client receives email invitation**
2. **Client clicks invitation link**
3. **If no GitHub account**:
   - Client creates GitHub account
   - Uses email address to sign up
4. **If has GitHub account**:
   - Client logs in
   - Accepts invitation
5. **Client confirms access**

## 📧 **Email Templates for Clients**

### **For Clients Without GitHub Account**
```
Subject: GitHub Account Setup for Website Management

Dear [Client Name],

To manage your website content, you'll need a GitHub account. Here's how to set it up:

1. Check your email for a GitHub invitation
2. Click the invitation link
3. Click "Sign up for GitHub"
4. Create account using your email address
5. Accept the repository invitation

Once set up, you can access the CMS at:
https://www.hygienefirstgroup.com/admin/cms

Best regards,
[Your Name]
```

### **For Clients With GitHub Account**
```
Subject: Website CMS Access Granted

Dear [Client Name],

You now have access to manage your website content! Here's how to get started:

1. Check your email for a GitHub invitation
2. Click "Accept invitation"
3. Log into your GitHub account
4. Confirm access to the repository

Access the CMS at:
https://www.hygienefirstgroup.com/admin/cms

Training materials are attached.

Best regards,
[Your Name]
```

## 🔍 **Troubleshooting Common Issues**

### **Issue: Client Can't Find Invitation Email**
**Solution**:
- Check spam/junk folder
- Resend invitation from GitHub
- Verify email address is correct

### **Issue: Client Can't Accept Invitation**
**Solution**:
- Ensure client is logged into correct GitHub account
- Check if invitation has expired (resend if needed)
- Verify repository name is correct

### **Issue: Client Gets "Access Denied" Error**
**Solution**:
- Check permission level is set to "Write"
- Verify client accepted invitation
- Ensure client is logged into GitHub

### **Issue: CMS Shows "Authentication Error"**
**Solution**:
- Check GitHub OAuth app configuration
- Verify environment variables in Vercel
- Ensure callback URL is correct

## 📊 **Managing Multiple Clients**

### **Option 1: Individual Access**
- Add each client as separate collaborator
- Each client has direct repository access
- Easy to manage individual permissions

### **Option 2: Team Access**
- Create "Content Managers" team
- Add all clients to team
- Give team repository access
- Easier to manage multiple users

### **Option 3: Organization Access**
- Move repository to GitHub Organization
- Create organization teams
- More advanced permission management

## 🔐 **Security Best Practices**

### **Access Management**
- Regularly review who has access
- Remove access for former employees
- Use strong passwords for GitHub accounts

### **Content Review**
- Set up content review process
- Monitor changes in repository
- Backup important content regularly

### **Training**
- Provide proper training materials
- Set up support channels
- Document common procedures

## 📞 **Support Information**

### **For Technical Issues**
- **GitHub Support**: https://support.github.com
- **Repository Issues**: https://github.com/GoldCityStudio/hygienefirst_tvp/issues
- **Your Contact**: [Your Email/Phone]

### **For Client Support**
- **CMS Training**: Send `CLIENT-TRAINING-GUIDE.md`
- **Setup Guide**: Send `CLIENT-CMS-SETUP-GUIDE.md`
- **Direct Support**: [Your Contact Information]

---

**Last Updated**: January 2025
**Repository**: GoldCityStudio/hygienefirst_tvp
**CMS URL**: https://www.hygienefirstgroup.com/admin/cms
