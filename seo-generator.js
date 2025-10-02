#!/usr/bin/env node

/**
 * Combined SEO Generator for Hygiene First Website
 * 
 * This script runs both the sitemap generator and meta tag generator
 * to ensure complete SEO optimization for the website.
 * 
 * Usage: node seo-generator.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    sitemapGenerator: 'sitemap-generator.js',
    metaTagGenerator: 'meta-tag-generator.js',
    outputDir: '.',
    logFile: 'seo-generation.log'
};

/**
 * Log message with timestamp
 */
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    
    // Also write to log file
    fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

/**
 * Run sitemap generator
 */
function generateSitemap() {
    try {
        log('🚀 Starting sitemap generation...');
        const output = execSync(`node ${CONFIG.sitemapGenerator}`, { 
            encoding: 'utf8',
            cwd: process.cwd()
        });
        
        log('✅ Sitemap generation completed successfully');
        log(`📊 Sitemap output: ${output.trim()}`);
        return true;
        
    } catch (error) {
        log(`❌ Sitemap generation failed: ${error.message}`);
        return false;
    }
}

/**
 * Run meta tag generator
 */
function generateMetaTags() {
    try {
        log('🚀 Starting meta tag generation...');
        const output = execSync(`node ${CONFIG.metaTagGenerator}`, { 
            encoding: 'utf8',
            cwd: process.cwd()
        });
        
        log('✅ Meta tag generation completed successfully');
        log(`📊 Meta tag output: ${output.trim()}`);
        return true;
        
    } catch (error) {
        log(`❌ Meta tag generation failed: ${error.message}`);
        return false;
    }
}

/**
 * Generate SEO report
 */
function generateSEOReport() {
    try {
        log('📊 Generating SEO report...');
        
        // Check if sitemap exists
        const sitemapExists = fs.existsSync('sitemap.xml');
        const sitemapSize = sitemapExists ? fs.statSync('sitemap.xml').size : 0;
        
        // Count HTML files
        const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
        
        // Count configured pages
        const metaTagGenerator = require('./meta-tag-generator.js');
        const configuredPages = Object.keys(metaTagGenerator.PAGE_CONFIGS);
        
        const report = `
# SEO Generation Report
Generated: ${new Date().toISOString()}

## Sitemap Status
- Sitemap exists: ${sitemapExists ? '✅ Yes' : '❌ No'}
- Sitemap size: ${sitemapSize} bytes
- Total HTML files: ${htmlFiles.length}

## Meta Tags Status
- Configured pages: ${configuredPages.length}
- Pages with meta tags: ${configuredPages.join(', ')}

## Recommendations
${sitemapExists ? '✅ Sitemap is up to date' : '⚠️ Sitemap needs to be generated'}
${configuredPages.length > 0 ? '✅ Meta tags are configured' : '⚠️ Meta tags need to be configured'}

## Next Steps
1. Submit sitemap to Google Search Console
2. Monitor search engine performance
3. Update meta tags when content changes
4. Regular SEO audits and optimization
`;
        
        fs.writeFileSync('seo-report.md', report);
        log('✅ SEO report generated: seo-report.md');
        
        return true;
        
    } catch (error) {
        log(`❌ SEO report generation failed: ${error.message}`);
        return false;
    }
}

/**
 * Validate SEO implementation
 */
function validateSEO() {
    try {
        log('🔍 Validating SEO implementation...');
        
        const issues = [];
        const warnings = [];
        
        // Check sitemap
        if (!fs.existsSync('sitemap.xml')) {
            issues.push('Sitemap not found');
        } else {
            const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
            if (!sitemapContent.includes('https://www.hygienefirstgroup.com')) {
                warnings.push('Sitemap may not have correct domain');
            }
        }
        
        // Check meta tag generator
        if (!fs.existsSync('meta-tag-generator.js')) {
            issues.push('Meta tag generator not found');
        }
        
        // Check key HTML files
        const keyFiles = ['index.html', 'booking.html', 'services.html'];
        keyFiles.forEach(file => {
            if (fs.existsSync(file)) {
                const content = fs.readFileSync(file, 'utf8');
                if (!content.includes('meta name="description"')) {
                    warnings.push(`${file} may not have meta description`);
                }
                if (!content.includes('application/ld+json')) {
                    warnings.push(`${file} may not have structured data`);
                }
            } else {
                warnings.push(`${file} not found`);
            }
        });
        
        // Log results
        if (issues.length === 0 && warnings.length === 0) {
            log('✅ SEO validation passed - no issues found');
        } else {
            if (issues.length > 0) {
                log(`❌ SEO issues found: ${issues.join(', ')}`);
            }
            if (warnings.length > 0) {
                log(`⚠️ SEO warnings: ${warnings.join(', ')}`);
            }
        }
        
        return {
            issues,
            warnings,
            passed: issues.length === 0
        };
        
    } catch (error) {
        log(`❌ SEO validation failed: ${error.message}`);
        return { issues: [error.message], warnings: [], passed: false };
    }
}

/**
 * Main function
 */
function main() {
    const startTime = Date.now();
    
    log('🚀 Starting comprehensive SEO generation...');
    log('=' .repeat(50));
    
    // Initialize log file
    fs.writeFileSync(CONFIG.logFile, `SEO Generation Log - ${new Date().toISOString()}\n`);
    
    let sitemapSuccess = false;
    let metaTagsSuccess = false;
    let reportSuccess = false;
    let validationPassed = false;
    
    try {
        // Step 1: Generate sitemap
        sitemapSuccess = generateSitemap();
        log('');
        
        // Step 2: Generate meta tags
        metaTagsSuccess = generateMetaTags();
        log('');
        
        // Step 3: Generate SEO report
        reportSuccess = generateSEOReport();
        log('');
        
        // Step 4: Validate SEO implementation
        const validation = validateSEO();
        validationPassed = validation.passed;
        log('');
        
        // Summary
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        log('=' .repeat(50));
        log('📊 SEO Generation Summary:');
        log(`   Sitemap: ${sitemapSuccess ? '✅ Success' : '❌ Failed'}`);
        log(`   Meta Tags: ${metaTagsSuccess ? '✅ Success' : '❌ Failed'}`);
        log(`   Report: ${reportSuccess ? '✅ Success' : '❌ Failed'}`);
        log(`   Validation: ${validationPassed ? '✅ Passed' : '❌ Failed'}`);
        log(`   Duration: ${duration}s`);
        log('');
        
        if (sitemapSuccess && metaTagsSuccess && reportSuccess && validationPassed) {
            log('🎉 SEO generation completed successfully!');
            log('📁 Generated files:');
            log('   - sitemap.xml');
            log('   - seo-report.md');
            log('   - seo-generation.log');
            log('');
            log('🔗 Next steps:');
            log('   1. Submit sitemap to Google Search Console');
            log('   2. Monitor search engine performance');
            log('   3. Regular SEO audits and optimization');
        } else {
            log('⚠️ SEO generation completed with issues');
            log('Please review the log above for details');
        }
        
    } catch (error) {
        log(`❌ SEO generation failed: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateSitemap,
    generateMetaTags,
    generateSEOReport,
    validateSEO,
    CONFIG
};
