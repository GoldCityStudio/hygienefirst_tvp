# Hygiene First Website

A professional website for Hygiene First healthcare services, featuring Traditional Chinese content and modern responsive design.

## Overview

This website is designed for Hygiene First healthcare services company. It features:

- Traditional Chinese (繁體中文) content
- Modern, responsive design with orange theme
- Multiple healthcare service sections
- Drug recycling program information
- Interactive maps and collection points
- Member account system
- Contact and booking functionality

## Technology Stack

- HTML5 with Traditional Chinese support
- CSS3 (with custom variables for theming)
- JavaScript (vanilla)
- Responsive design (mobile-first approach)
- Font Awesome for icons
- Google Maps API integration
- Firebase integration for backend services

## Local Development Setup

### Prerequisites

- Python 3.x installed on your system
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Running the Website Locally

#### Method 1: Python HTTP Server (Recommended)

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd hygienefirst_tvp-1
   ```

2. **Start the local server**
   
   **For Python 3:**
   ```bash
   python -m http.server 8000
   ```
   
   **For Python 2 (if Python 3 is not available):**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. **Access the website**
   - Open your browser and go to: `http://localhost:8000`
   - The main page will be available at: `http://localhost:8000/index.html`

#### Method 2: Direct File Access (Limited functionality)

1. Navigate to the project folder
2. Double-click `index.html` to open in browser
3. **Note:** Some features may not work due to CORS restrictions

### Troubleshooting

#### Python Not Found Error (Windows)

If you get "Python was not found" error on Windows:

**Option 1: Install Python from Microsoft Store**
1. Open Microsoft Store
2. Search for "Python 3.11" or latest version
3. Install Python
4. Restart your terminal/command prompt
5. Try `python -m http.server 8000` again

**Option 2: Install Python from python.org**
1. Go to https://www.python.org/downloads/
2. Download Python for Windows
3. Run installer and check "Add Python to PATH"
4. Restart terminal and try again

**Option 3: Use py launcher (Windows)**
```bash
py -m http.server 8000
```

#### Port Already in Use

If port 8000 is busy, use a different port:
```bash
python -m http.server 8080
# Then access: http://localhost:8080
```

#### Chinese Characters Not Displaying

1. Ensure your browser supports UTF-8 encoding
2. Check that HTML files have `<meta charset="UTF-8">`
3. Use a modern browser with full Unicode support

### Testing Clean URLs Locally

The website supports clean URLs (without .html extension). To test:

1. Start the Python server as above
2. Visit these URLs to test Chinese character handling:
   - `http://localhost:8000/家居藥物回收計劃`
   - `http://localhost:8000/藥物分類搜尋引擎器`
3. Use the test page: `http://localhost:8000/test-urls.html`

**Note:** Clean URL rewriting works on production servers (Vercel, Nginx, Apache) but may not work with Python's simple HTTP server. For full testing, deploy to a production environment.

## File Structure

```
hygienefirst_tvp-1/
├── index.html                          # Main homepage (Traditional Chinese)
├── index-en.html                       # English homepage
├── index-zh.html                       # Chinese homepage
├── 家居藥物回收計劃.html                # Drug recycling program page
├── 藥物分類搜尋引擎器.html              # Drug classification search
├── member-account.html                 # Member account page
├── styles.css                          # Main stylesheet
├── enhanced-styles.css                  # Enhanced styling
├── member-styles.css                    # Member page styles
├── script.js                           # Main JavaScript functionality
├── member-script.js                     # Member page JavaScript
├── backend/                            # Backend API services
│   ├── server.js                       # Express server
│   ├── models/                         # Database models
│   └── routes/                         # API routes
├── images/                             # All image assets
├── Collection points database/         # Collection points data
├── Drug database/                      # Drug database files
├── vercel.json                         # Vercel deployment config
├── nginx-config.conf                   # Nginx server config
├── .htaccess                          # Apache server config
└── test-urls.html                      # URL testing page
```

## Key Features

### 🏥 Healthcare Services
- Home healthcare services
- Elderly care services
- Wound care and rehabilitation
- Caregiver training programs

### 💊 Drug Recycling Program
- Interactive collection points map
- Drug classification search engine
- Educational content about drug disposal
- Collection point database with 293+ locations

### 👤 Member System
- User registration and login
- Account management
- Service booking system

### 🗺️ Interactive Features
- Google Maps integration
- Location-based services
- Real-time collection point finder

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. The `vercel.json` configuration will handle URL rewriting automatically
3. Deploy with zero configuration

### Traditional Server (Nginx/Apache)
1. Upload files to your web server
2. Use the provided `nginx-config.conf` or `.htaccess` for URL rewriting
3. Ensure UTF-8 encoding is properly configured

## Development Notes

### Chinese Character Support
- All HTML files use UTF-8 encoding
- Traditional Chinese characters are properly handled
- Clean URLs work with Chinese page names

### API Integration
- Google Maps API for location services
- Firebase for backend services
- WhatsApp integration for contact

### Responsive Design
- Mobile-first approach
- Optimized for all device sizes
- Touch-friendly interface

## Customization

To customize this website:

1. **Content Updates**: Modify HTML files for text content
2. **Styling**: Update CSS files (look for `:root` section with CSS variables)
3. **Images**: Replace images in the `images/` directory
4. **Contact Info**: Update contact details in footer sections
5. **Services**: Modify service descriptions and pricing
6. **Collection Points**: Update the collection points database

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This website is proprietary to Hygiene First Company Limited.

---

© 2025 Hygiene First Company Limited. All Rights Reserved. 