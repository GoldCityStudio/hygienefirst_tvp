#!/usr/bin/env node

/**
 * XML Sitemap Generator for Hygiene First Website
 * 
 * This script automatically generates a sitemap.xml file by scanning
 * the project directory for HTML files and creating appropriate entries.
 * 
 * Usage: node sitemap-generator.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    baseUrl: 'https://www.hygienefirstgroup.com',
    outputFile: 'sitemap.xml',
    scanDirectory: '.',
    excludeFiles: [
        '404.html',
        '404-zh.html',
        'dialogflow-config-example.html',
        'test-registration.html',
        'test-urls.html',
        'video-test.html'
    ],
    excludeDirectories: [
        'node_modules',
        '.git',
        'images',
        'backend',
        'Collection points database',
        'Drug database'
    ],
    priorityMap: {
        'index.html': 1.0,
        'index-zh.html': 1.0,
        'booking.html': 0.9,
        'services.html': 0.8,
        'service.html': 0.8,
        'contact.html': 0.8,
        'contact-zh.html': 0.8,
        'about.html': 0.6,
        'news.html': 0.7,
        'member-account.html': 0.6
    },
    changeFreqMap: {
        'index.html': 'weekly',
        'index-zh.html': 'weekly',
        'booking.html': 'weekly',
        'news.html': 'daily',
        'services.html': 'monthly',
        'service.html': 'monthly',
        'contact.html': 'monthly',
        'contact-zh.html': 'monthly',
        'about.html': 'monthly'
    }
};

/**
 * Get all HTML files in directory recursively
 */
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip excluded directories
            if (!CONFIG.excludeDirectories.includes(file)) {
                getHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            // Skip excluded files
            if (!CONFIG.excludeFiles.includes(file)) {
                fileList.push(filePath);
            }
        }
    });
    
    return fileList;
}

/**
 * Get file modification date
 */
function getLastMod(filePath) {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
}

/**
 * Get priority for a file
 */
function getPriority(filePath) {
    const fileName = path.basename(filePath);
    return CONFIG.priorityMap[fileName] || 0.5;
}

/**
 * Get change frequency for a file
 */
function getChangeFreq(filePath) {
    const fileName = path.basename(filePath);
    return CONFIG.changeFreqMap[fileName] || 'monthly';
}

/**
 * Generate URL entry for sitemap
 */
function generateUrlEntry(filePath) {
    const relativePath = path.relative(CONFIG.scanDirectory, filePath).replace(/\\/g, '/');
    const url = `${CONFIG.baseUrl}/${relativePath}`;
    const lastmod = getLastMod(filePath);
    const priority = getPriority(filePath);
    const changefreq = getChangeFreq(filePath);
    
    // Check if this is a bilingual page
    const fileName = path.basename(filePath);
    let alternateLink = '';
    
    if (fileName === 'index.html') {
        alternateLink = '        <xhtml:link rel="alternate" hreflang="zh-tw" href="https://www.hygienefirstgroup.com/index-zh.html"/>';
    } else if (fileName === 'index-zh.html') {
        alternateLink = '        <xhtml:link rel="alternate" hreflang="en" href="https://www.hygienefirstgroup.com/index.html"/>';
    } else if (fileName === 'services.html') {
        alternateLink = '        <xhtml:link rel="alternate" hreflang="zh-tw" href="https://www.hygienefirstgroup.com/service.html"/>';
    } else if (fileName === 'service.html') {
        alternateLink = '        <xhtml:link rel="alternate" hreflang="en" href="https://www.hygienefirstgroup.com/services.html"/>';
    } else if (fileName === 'contact.html') {
        alternateLink = '        <xhtml:link rel="alternate" hreflang="zh-tw" href="https://www.hygienefirstgroup.com/contact-zh.html"/>';
    } else if (fileName === 'contact-zh.html') {
        alternateLink = '        <xhtml:link rel="alternate" hreflang="en" href="https://www.hygienefirstgroup.com/contact.html"/>';
    }
    
    return `    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>${alternateLink ? '\n' + alternateLink : ''}
    </url>`;
}

/**
 * Generate complete sitemap XML
 */
function generateSitemap() {
    console.log('🔍 Scanning for HTML files...');
    const htmlFiles = getHtmlFiles(CONFIG.scanDirectory);
    
    console.log(`📄 Found ${htmlFiles.length} HTML files`);
    
    // Sort files for consistent output
    htmlFiles.sort();
    
    // Generate XML header
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
    
    // Generate URL entries
    htmlFiles.forEach(filePath => {
        const entry = generateUrlEntry(filePath);
        sitemap += '\n' + entry;
    });
    
    // Close XML
    sitemap += '\n</urlset>';
    
    return sitemap;
}

/**
 * Main function
 */
function main() {
    try {
        console.log('🚀 Starting sitemap generation...');
        
        const sitemap = generateSitemap();
        
        // Write to file
        fs.writeFileSync(CONFIG.outputFile, sitemap, 'utf8');
        
        console.log(`✅ Sitemap generated successfully: ${CONFIG.outputFile}`);
        console.log(`📊 Total URLs: ${sitemap.split('<url>').length - 1}`);
        
        // Show some statistics
        const htmlFiles = getHtmlFiles(CONFIG.scanDirectory);
        const highPriority = htmlFiles.filter(f => getPriority(f) >= 0.8).length;
        const mediumPriority = htmlFiles.filter(f => getPriority(f) >= 0.6 && getPriority(f) < 0.8).length;
        const lowPriority = htmlFiles.filter(f => getPriority(f) < 0.6).length;
        
        console.log('\n📈 Priority Distribution:');
        console.log(`   High Priority (≥0.8): ${highPriority} pages`);
        console.log(`   Medium Priority (0.6-0.8): ${mediumPriority} pages`);
        console.log(`   Low Priority (<0.6): ${lowPriority} pages`);
        
    } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateSitemap,
    getHtmlFiles,
    CONFIG
};
