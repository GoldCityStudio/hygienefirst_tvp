# XML Sitemap Generator

## Overview
This project includes an automated XML sitemap generator that scans your website for HTML files and creates a comprehensive `sitemap.xml` file for search engines.

## Features
- ✅ **Automatic HTML file discovery** - Scans directories recursively
- ✅ **Smart priority assignment** - High priority for important pages
- ✅ **Change frequency optimization** - Based on content type
- ✅ **Bilingual support** - Handles English/Chinese page pairs
- ✅ **Exclusion system** - Skips test files and directories
- ✅ **Last modified dates** - Uses actual file modification times
- ✅ **SEO optimization** - Proper XML structure and metadata

## Usage

### Generate Sitemap
```bash
# Generate sitemap once
npm run sitemap

# Or run directly
node sitemap-generator.js
```

### Watch Mode (Auto-regenerate)
```bash
# Regenerate sitemap when files change
npm run sitemap:watch
```

## Configuration

### Priority Levels
- **1.0**: Homepage (index.html, index-zh.html)
- **0.9**: Booking page (booking.html)
- **0.8**: Services, Contact pages
- **0.7**: News, Service detail pages
- **0.6**: About, Member account pages
- **0.5**: Default for other pages

### Change Frequencies
- **weekly**: Homepage, Booking page
- **daily**: News pages
- **monthly**: Services, About, Contact pages
- **yearly**: Legal pages (privacy, terms)

### Excluded Files
- Test files (test-*.html)
- 404 pages
- Configuration examples
- Video test pages

### Excluded Directories
- node_modules
- .git
- images
- backend
- Database folders

## Current Sitemap Status

### High Priority Pages (≥0.8)
- Homepage (English & Chinese)
- Booking page
- Services pages
- Contact pages

### Total Pages: 73
- High Priority: 7 pages
- Medium Priority: 3 pages
- Low Priority: 63 pages

## Bilingual Support

The generator automatically creates `hreflang` links for:
- `index.html` ↔ `index-zh.html`
- `services.html` ↔ `service.html`
- `contact.html` ↔ `contact-zh.html`

### Domain Configuration

The sitemap is configured for the correct domain:
- **Production Domain**: `https://www.hygienefirstgroup.com`
- **All URLs**: Use the full domain with www subdomain
- **Bilingual Links**: Properly reference the correct domain

## File Structure
```
sitemap.xml              # Generated sitemap file
sitemap-generator.js     # Generator script
SITEMAP-GENERATOR-README.md  # This documentation
```

## Integration

### Package.json Scripts
```json
{
  "scripts": {
    "sitemap": "node sitemap-generator.js",
    "sitemap:watch": "nodemon sitemap-generator.js"
  }
}
```

### Manual Integration
```javascript
const { generateSitemap } = require('./sitemap-generator.js');

// Generate sitemap programmatically
const sitemap = generateSitemap();
console.log(sitemap);
```

## SEO Benefits

1. **Search Engine Discovery** - Helps search engines find all pages
2. **Priority Signals** - Indicates page importance
3. **Update Frequency** - Guides crawl frequency
4. **Bilingual SEO** - Proper language targeting
5. **Fresh Content** - Uses actual modification dates

## Maintenance

### Regular Updates
- Run `npm run sitemap` after adding new pages
- Update priority levels in `sitemap-generator.js` if needed
- Review excluded files list periodically

### Monitoring
- Check sitemap in Google Search Console
- Monitor crawl errors
- Verify all important pages are included

## Troubleshooting

### Common Issues
1. **Missing pages**: Check exclusion lists
2. **Wrong priorities**: Update `priorityMap` in config
3. **Old dates**: Files not modified recently
4. **XML errors**: Check for special characters in filenames

### Validation
- Use [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Check in Google Search Console
- Validate XML syntax

## Future Enhancements

- [ ] Image sitemap generation
- [ ] News sitemap for blog posts
- [ ] Video sitemap for media content
- [ ] Automatic submission to search engines
- [ ] Sitemap index for large sites
- [ ] CDN integration
- [ ] Multi-language support beyond English/Chinese

## Support

For issues or questions:
1. Check the configuration in `sitemap-generator.js`
2. Verify file permissions
3. Review exclusion lists
4. Check console output for errors

---

**Last Updated**: January 27, 2025  
**Generator Version**: 1.0.0  
**Total Pages**: 73
