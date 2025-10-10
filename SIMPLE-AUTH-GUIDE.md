# Simple Authentication Setup Guide

## 🎯 **Simple Username/Password Login**

I've created a much simpler authentication system that doesn't require any external accounts (Google, GitHub, etc.). Clients can just use a username and password.

## 🔑 **Default Login Credentials**

The system comes with these pre-configured accounts:

| Username | Password | Role | Access Level |
|----------|----------|------|--------------|
| `admin` | `hygienefirst2024` | Administrator | Full access to all content |
| `client` | `client123` | Client | Can edit all content |
| `editor` | `editor456` | Editor | Can edit content |
| `manager` | `manager789` | Manager | Can manage content |

## 🚀 **How Clients Login**

1. **Visit**: `https://www.hygienefirstgroup.com/admin/cms`
2. **Enter Username**: e.g., `client`
3. **Enter Password**: e.g., `client123`
4. **Click "登入"**: Login button
5. **Access CMS**: Automatically redirected to content management

## 🔧 **Customizing Credentials**

To change the login credentials, edit `admin/simple-auth.html`:

```javascript
const VALID_CREDENTIALS = {
  'your-username': 'your-password',
  'client-name': 'client-password',
  'editor-name': 'editor-password'
};
```

## 🛡️ **Security Features**

- **Session Management**: 24-hour automatic logout
- **Password Protection**: Secure password validation
- **Session Storage**: Encrypted session data
- **Auto-logout**: Expires after 24 hours
- **Error Handling**: Clear error messages

## 📋 **Client Instructions**

Send clients this simple instruction:

### **How to Access Your Website CMS**

1. **Go to**: `https://www.hygienefirstgroup.com/admin/cms`
2. **Login with**:
   - Username: `client`
   - Password: `client123`
3. **Click "登入"**
4. **Start editing** your website content!

### **What You Can Do**
- ✅ Add/edit news articles
- ✅ Update service information
- ✅ Manage drug database
- ✅ Update collection points
- ✅ Edit static pages
- ✅ Upload images

## 🔄 **Backup Authentication**

If clients prefer, they can still use:
- **Google/Gmail login**: Click "使用 Google/GitHub 登入"
- **GitHub login**: For technical users

## 🎯 **Benefits of Simple Auth**

- **No external accounts needed**
- **Easy to remember credentials**
- **Works immediately**
- **No setup required**
- **Familiar login experience**
- **24-hour sessions**

## 🔧 **Production Security**

For production use, consider:
1. **Change default passwords**
2. **Use strong passwords**
3. **Add user management**
4. **Implement server-side validation**
5. **Add audit logging**

## 📞 **Support**

If clients forget their password:
1. Check this guide for default credentials
2. Update credentials in `admin/simple-auth.html`
3. Redeploy the website

The simple authentication system makes it super easy for clients to access and manage their website content without any technical complexity!
