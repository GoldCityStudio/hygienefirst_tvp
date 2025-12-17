# Meta Tag Generator

## Overview
This project includes an automated meta tag generator that creates comprehensive SEO meta tags for HTML files, including descriptions, keywords, Open Graph tags, Twitter cards, and structured data.

## Features
- ✅ **Automatic Meta Tag Generation** - Creates SEO-optimized meta tags
- ✅ **Open Graph Support** - Social media sharing optimization
- ✅ **Twitter Cards** - Enhanced Twitter sharing
- ✅ **Structured Data (JSON-LD)** - Rich snippets for search engines
- ✅ **Mobile Optimization** - App-like meta tags for mobile devices
- ✅ **Canonical URLs** - Prevents duplicate content issues
- ✅ **Language Support** - Hreflang tags for international SEO
- ✅ **Business Schema** - Medical business structured data

## Usage

### Generate Meta Tags for All Pages
```bash
# Generate meta tags for all configured pages
npm run meta:all

# Or run directly
node meta-tag-generator.js
```

### Generate Meta Tags for Specific Page
```bash
# Generate meta tags for specific file
node meta-tag-generator.js booking.html
```

## Configuration

### Page-Specific Configurations
The generator includes pre-configured settings for key pages:

#### **Homepage (index.html, index-zh.html)**
- **Priority**: 1.0 (Highest)
- **Schema**: MedicalBusiness
- **Keywords**: Hygiene First, 首衛, 醫療護理, 上門護理, 疫苗注射

#### **Booking Page (booking.html)**
- **Priority**: 0.9 (Very High)
- **Schema**: MedicalBusiness
- **Keywords**: 醫療護理預約, 上門健康評估, 長者照顧服務
- **Services**: All 8 booking services with prices

#### **Services Pages (services.html, service.html)**
- **Priority**: 0.8 (High)
- **Schema**: MedicalBusiness
- **Keywords**: 居家護理服務, 上門健康評估, 長者照顧

#### **Contact Pages (contact.html, contact-zh.html)**
- **Priority**: 0.8 (High)
- **Schema**: ContactPage
- **Keywords**: 聯絡Hygiene First, 首衛聯絡, 醫療護理查詢

#### **About Page (about.html)**
- **Priority**: 0.6 (Medium)
- **Schema**: AboutPage
- **Keywords**: 關於Hygiene First, 首衛歷史, 醫療護理公司

#### **News Page (news.html)**
- **Priority**: 0.7 (Medium-High)
- **Schema**: NewsArticle
- **Keywords**: Hygiene First新聞, 首衛動態, 護理服務資訊

## Generated Meta Tags

### **Basic SEO Tags**
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="Hygiene First Company Limited">
<meta name="robots" content="index, follow">
<meta name="language" content="zh-TW">
<meta name="geo.region" content="HK">
<meta name="geo.placename" content="Hong Kong">
```

### **Open Graph Tags**
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:image" content="...">
<meta property="og:site_name" content="Hygiene First 首衛">
<meta property="og:locale" content="zh_TW">
```

### **Twitter Card Tags**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

### **Mobile & App Tags**
```html
<meta name="theme-color" content="#FF7A00">
<meta name="msapplication-TileColor" content="#FF7A00">
<meta name="application-name" content="Hygiene First 首衛">
<meta name="apple-mobile-web-app-title" content="Hygiene First 首衛">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

### **Canonical & Language Tags**
```html
<link rel="canonical" href="...">
<link rel="alternate" hreflang="zh-TW" href="...">
<link rel="alternate" hreflang="zh-HK" href="...">
<link rel="alternate" hreflang="x-default" href="...">
```

### **Structured Data (JSON-LD)**
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Hygiene First 首衛",
  "description": "...",
  "telephone": "+852-2827-8889",
  "email": "careteam@hygienefirstgroup.com",
  "address": {...},
  "aggregateRating": {
    "ratingValue": "4.8",
    "reviewCount": "60000"
  }
}
```

## Business Information

### **Company Details**
- **Name**: Hygiene First 首衛
- **Full Name**: Hygiene First Company Limited
- **Phone**: +852-2827-8889
- **Email**: careteam@hygienefirstgroup.com
- **Website**: https://www.hygienefirstgroup.com

### **Address**
- **Street**: 新合里3號匯賢一號雋峰12樓17室
- **Locality**: 屯門
- **Region**: 新界
- **Country**: HK

### **Coordinates**
- **Latitude**: 22.3964
- **Longitude**: 113.9725

### **Ratings**
- **Rating**: 4.8/5 stars
- **Review Count**: 60,000+
- **Best Rating**: 5
- **Worst Rating**: 1

## Service Keywords

### **Core Services**
- 上門健康評估 (Health screening)
- 長者照顧服務 (Elderly Care)
- 傷口護理 (Wound Care)
- 陪診護送服務 (Accompaniment)
- 鼻胃喉管護理 (Nasogastric Care)
- 復康護理 (Rehabilitation)
- 家居清潔 (Housekeeping)
- 納米消毒服務 (Disinfection)

### **Target Keywords**
- 醫療護理預約
- 24小時護理
- 香港護理服務
- 專業護士
- 物理治療師
- 保健員
- Hygiene First
- 首衛

## SEO Benefits

### **Search Engine Optimization**
1. **Better Rankings** - Optimized meta descriptions and keywords
2. **Rich Snippets** - Structured data for enhanced search results
3. **Local SEO** - Hong Kong-specific geo tags
4. **Mobile SEO** - Mobile-optimized meta tags
5. **Social SEO** - Open Graph and Twitter Card optimization

### **User Experience**
1. **Social Sharing** - Enhanced previews on social media
2. **Mobile Experience** - App-like experience on mobile devices
3. **Language Support** - Proper language targeting
4. **Canonical URLs** - Prevents duplicate content issues

## File Structure
```
meta-tag-generator.js          # Generator script
META-TAG-GENERATOR-README.md   # This documentation
package.json                   # NPM scripts
```

## Integration

### **Package.json Scripts**
```json
{
  "scripts": {
    "meta": "node meta-tag-generator.js",
    "meta:all": "node meta-tag-generator.js"
  }
}
```

### **Manual Integration**
```javascript
const { generateMetaTags, updateHtmlFile } = require('./meta-tag-generator.js');

// Generate meta tags for specific file
updateHtmlFile('booking.html');

// Generate meta tags for all configured files
// (run without arguments)
```

## Customization

### **Adding New Pages**
1. Add page configuration to `PAGE_CONFIGS` in `meta-tag-generator.js`
2. Define title, description, keywords, and schema type
3. Run the generator for the new page

### **Modifying Existing Pages**
1. Update the configuration in `PAGE_CONFIGS`
2. Re-run the generator
3. Meta tags will be automatically updated

### **Business Information Updates**
1. Modify `CONFIG` object in `meta-tag-generator.js`
2. Update company details, contact information, etc.
3. Re-run generator for all pages

## Maintenance

### **Regular Updates**
- Run `npm run meta:all` after adding new pages
- Update page configurations when content changes
- Review and update keywords periodically
- Monitor search engine performance

### **Monitoring**
- Check meta tags in browser developer tools
- Validate structured data with Google's Rich Results Test
- Monitor social media sharing previews
- Track SEO performance in Google Search Console

## Troubleshooting

### **Common Issues**
1. **Missing meta tags**: Check if page is in `PAGE_CONFIGS`
2. **Wrong content**: Update page configuration
3. **Validation errors**: Check JSON-LD syntax
4. **Social preview issues**: Verify Open Graph tags

### **Validation Tools**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Future Enhancements

- [ ] Automatic page content analysis
- [ ] Dynamic keyword generation
- [ ] Multi-language support
- [ ] Image optimization for social sharing
- [ ] Performance monitoring integration
- [ ] A/B testing for meta descriptions
- [ ] Automatic sitemap integration
- [ ] Real-time SEO monitoring

## Support

For issues or questions:
1. Check the configuration in `meta-tag-generator.js`
2. Verify page configurations in `PAGE_CONFIGS`
3. Review generated meta tags in browser
4. Use validation tools to check structured data

---

**Last Updated**: January 27, 2025  
**Generator Version**: 1.0.0  
**Configured Pages**: 9
