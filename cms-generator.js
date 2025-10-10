#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * CMS Content Generator
 * Automatically generates HTML files from CMS markdown content
 */

// Configuration
const CONFIG = {
    contentDir: './content',
    outputDir: './',
    templatesDir: './templates',
    collections: ['news', 'services', 'drugs', 'collection-points', 'pages']
};

/**
 * Parse markdown frontmatter
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { frontmatter: {}, body: content };
    }
    
    try {
        const frontmatter = yaml.load(match[1]);
        const body = match[2];
        return { frontmatter, body };
    } catch (error) {
        console.error('Error parsing frontmatter:', error);
        return { frontmatter: {}, body: content };
    }
}

/**
 * Convert markdown to HTML (basic implementation)
 */
function markdownToHtml(markdown) {
    return markdown
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^(?!<[h|l])/gim, '<p>')
        .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/gims, '')
        .replace(/<\/p><p><\/p>/gims, '')
        .replace(/<p><\/p>/gims, '');
}

/**
 * Generate HTML from template and data
 */
function generateHtml(template, data) {
    let html = template;
    
    // Replace template variables
    Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key] || '');
    });
    
    return html;
}

/**
 * Load template file
 */
function loadTemplate(templateName) {
    const templatePath = path.join(CONFIG.templatesDir, `${templateName}.html`);
    
    if (!fs.existsSync(templatePath)) {
        console.error(`Template not found: ${templatePath}`);
        return null;
    }
    
    return fs.readFileSync(templatePath, 'utf8');
}

/**
 * Generate news detail HTML
 */
function generateNewsDetail(frontmatter, body, slug) {
    const template = loadTemplate('news-detail');
    if (!template) return null;
    
    const htmlBody = markdownToHtml(body);
    
    const data = {
        title: frontmatter.title || '',
        title_en: frontmatter.title_en || '',
        description: frontmatter.excerpt || frontmatter.description || '',
        content: htmlBody,
        image: frontmatter.image || '/images/default-news.jpg',
        category: frontmatter.category || 'general',
        date: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('zh-TW') : '',
        slug: slug,
        canonical_url: `https://www.hygienefirstgroup.com/news/${slug}`,
        og_url: `https://www.hygienefirstgroup.com/news/${slug}`
    };
    
    return generateHtml(template, data);
}

/**
 * Generate service detail HTML
 */
function generateServiceDetail(frontmatter, body, slug) {
    const template = loadTemplate('service-detail');
    if (!template) return null;
    
    const htmlBody = markdownToHtml(body);
    
    const data = {
        title: frontmatter.title || '',
        title_en: frontmatter.title_en || '',
        description: frontmatter.description || '',
        content: htmlBody,
        image: frontmatter.image || '/images/default-service.jpg',
        price: frontmatter.price || '聯絡查詢',
        category: frontmatter.category || 'general',
        featured: frontmatter.featured ? 'true' : 'false',
        slug: slug,
        canonical_url: `https://www.hygienefirstgroup.com/services/${slug}`,
        og_url: `https://www.hygienefirstgroup.com/services/${slug}`
    };
    
    return generateHtml(template, data);
}

/**
 * Process collection files
 */
function processCollection(collectionName) {
    const collectionPath = path.join(CONFIG.contentDir, collectionName);
    
    if (!fs.existsSync(collectionPath)) {
        console.log(`Collection directory not found: ${collectionPath}`);
        return;
    }
    
    const files = fs.readdirSync(collectionPath).filter(file => file.endsWith('.md'));
    
    files.forEach(file => {
        const filePath = path.join(collectionPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { frontmatter, body } = parseFrontmatter(content);
        const slug = frontmatter.slug || path.basename(file, '.md');
        
        let htmlContent = null;
        let outputFileName = '';
        
        switch (collectionName) {
            case 'news':
                htmlContent = generateNewsDetail(frontmatter, body, slug);
                outputFileName = `news-detail-${slug}.html`;
                break;
            case 'services':
                htmlContent = generateServiceDetail(frontmatter, body, slug);
                outputFileName = `service-${slug}.html`;
                break;
            case 'drugs':
                htmlContent = generateNewsDetail(frontmatter, body, slug); // Reuse news template
                outputFileName = `drug-${slug}.html`;
                break;
            case 'collection-points':
                htmlContent = generateNewsDetail(frontmatter, body, slug); // Reuse news template
                outputFileName = `collection-point-${slug}.html`;
                break;
            case 'pages':
                htmlContent = generateNewsDetail(frontmatter, body, slug); // Reuse news template
                outputFileName = `page-${slug}.html`;
                break;
        }
        
        if (htmlContent) {
            const outputPath = path.join(CONFIG.outputDir, outputFileName);
            fs.writeFileSync(outputPath, htmlContent, 'utf8');
            console.log(`Generated: ${outputFileName}`);
        }
    });
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 Starting CMS Content Generator...');
    
    // Create templates directory if it doesn't exist
    if (!fs.existsSync(CONFIG.templatesDir)) {
        fs.mkdirSync(CONFIG.templatesDir, { recursive: true });
        console.log(`Created templates directory: ${CONFIG.templatesDir}`);
    }
    
    // Process each collection
    CONFIG.collections.forEach(collection => {
        console.log(`\n📁 Processing collection: ${collection}`);
        processCollection(collection);
    });
    
    console.log('\n✅ CMS Content Generation Complete!');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    parseFrontmatter,
    markdownToHtml,
    generateHtml,
    processCollection,
    main
};
