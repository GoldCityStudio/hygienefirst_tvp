# Decap CMS Setup Guide for Hygiene First Website

## Prerequisites
- GitHub account
- Vercel account
- Your website repository on GitHub

## Step 1: Create GitHub OAuth Application

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/applications/new
   - Or: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App

2. **Fill in OAuth App Details**
   ```
   Application name: Hygiene First CMS
   Homepage URL: https://your-domain.vercel.app
   Authorization callback URL: https://your-domain.vercel.app/admin/index.html
   ```

3. **Get OAuth Credentials**
   - Copy the **Client ID**
   - Generate and copy the **Client Secret**

## Step 2: Update Admin Configuration

1. **Edit `admin/index.html`**
   - Replace `your-username/hygienefirst_tvp` with your actual GitHub repository
   - Replace `your-vercel-domain.vercel.app` with your actual Vercel domain

2. **Example Configuration**
   ```javascript
   backend: {
     name: 'github',
     repo: 'danny-soong/hygienefirst_tvp', // Your actual repo
     branch: 'main',
     site_domain: 'hygienefirst-tvp.vercel.app', // Your actual domain
   }
   ```

## Step 3: Set Up Vercel Environment Variables

1. **Go to Vercel Dashboard**
   - Visit your project settings
   - Go to Environment Variables

2. **Add Environment Variables**
   ```
   OAUTH_CLIENT_ID=your_github_client_id
   OAUTH_CLIENT_SECRET=your_github_client_secret
   ```

## Step 4: Deploy to Vercel

1. **Push Changes to GitHub**
   ```bash
   git add .
   git commit -m "Add Decap CMS configuration"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically deploy your changes
   - Wait for deployment to complete

## Step 5: Access CMS

1. **Visit Admin Panel**
   - Go to: `https://your-domain.vercel.app/admin`
   - Click "Login with GitHub"
   - Authorize the application

2. **Start Managing Content**
   - Create new services, news articles, drug entries
   - Edit existing content
   - Upload images and media

## Content Management Workflow

### Creating Content
1. Go to `/admin`
2. Select collection (Services, News, Drugs, etc.)
3. Click "New [Collection]"
4. Fill in the form
5. Click "Save"
6. Content is automatically committed to GitHub
7. Vercel rebuilds and deploys the site

### Editing Content
1. Go to `/admin`
2. Select collection
3. Click on existing item
4. Make changes
5. Click "Save"
6. Changes are automatically deployed

### Deleting Content
1. Go to `/admin`
2. Select collection
3. Click on item to edit
4. Click "Delete" button
5. Confirm deletion
6. Item is removed from repository

## Content Collections

### 🏥 Healthcare Services
- Manage all healthcare services
- Include pricing, descriptions, categories
- Featured services for homepage

### 📰 News & Updates
- Healthcare news and updates
- Service announcements
- Health tips and guides

### 💊 Drug Database
- Drug information and safety
- Disposal instructions
- Classification and categories

### 📍 Collection Points
- Drug collection locations
- Addresses and contact info
- Opening hours and coordinates

### 📄 Static Pages
- About page, contact info
- Terms and conditions
- Privacy policy

## Troubleshooting

### Authentication Issues
- Check OAuth callback URL matches exactly
- Verify environment variables are set
- Ensure GitHub OAuth app is properly configured

### Content Not Appearing
- Check file paths in collections configuration
- Verify markdown frontmatter format
- Check GitHub repository permissions

### Deployment Issues
- Check Vercel build logs
- Verify file structure matches configuration
- Ensure all required fields are filled

## Security Notes

- Keep OAuth credentials secure
- Regularly update dependencies
- Monitor access logs
- Use HTTPS only

## Support

For issues with Decap CMS:
- Documentation: https://decapcms.org/docs/
- GitHub Issues: https://github.com/decaporg/decap-cms/issues
- Community: https://decapcms.org/community/

For Vercel deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
