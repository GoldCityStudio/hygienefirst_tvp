#!/usr/bin/env node

/**
 * SEO-Friendly URL Generator
 * 
 * This script generates SEO-friendly URLs for the booking page
 * and provides recommendations for URL structure optimization.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    baseUrl: 'https://www.hygienefirstgroup.com',
    currentUrl: '/booking.html',
    services: [
        {
            id: 'health-assessment',
            name: '上門健康評估',
            englishName: 'Home Health Assessment',
            keywords: ['health', 'assessment', 'home', 'nurse', 'medical', 'checkup']
        },
        {
            id: 'elderly-care',
            name: '長者照顧服務',
            englishName: 'Elderly Care Services',
            keywords: ['elderly', 'care', 'senior', 'nursing', 'homecare']
        },
        {
            id: 'wound-care',
            name: '傷口護理',
            englishName: 'Wound Care',
            keywords: ['wound', 'care', 'dressing', 'nursing', 'medical']
        },
        {
            id: 'accompaniment',
            name: '陪診護送服務',
            englishName: 'Medical Escort Services',
            keywords: ['escort', 'medical', 'transport', 'accompaniment', 'hospital']
        },
        {
            id: 'nasogastric-care',
            name: '鼻胃喉管護理',
            englishName: 'Nasogastric Tube Care',
            keywords: ['nasogastric', 'tube', 'feeding', 'medical', 'nursing']
        },
        {
            id: 'rehabilitation',
            name: '復康護理',
            englishName: 'Rehabilitation Care',
            keywords: ['rehabilitation', 'physiotherapy', 'recovery', 'therapy']
        },
        {
            id: 'housekeeping',
            name: '專業家居清潔',
            englishName: 'Professional Housekeeping',
            keywords: ['housekeeping', 'cleaning', 'home', 'professional']
        },
        {
            id: 'disinfection',
            name: '納米消毒服務',
            englishName: 'Nano Disinfection Services',
            keywords: ['disinfection', 'nano', 'cleaning', 'sanitization']
        }
    ]
};

/**
 * Generate SEO-friendly URL options
 */
function generateSEOUrlOptions() {
    console.log('🔗 SEO-Friendly URL Options for Booking Page\n');
    
    const options = [
        {
            category: 'Service-Based URLs',
            description: 'URLs that include specific service keywords',
            urls: [
                '/book-medical-care-services',
                '/book-home-healthcare',
                '/book-nursing-services',
                '/book-elderly-care',
                '/book-wound-care',
                '/book-rehabilitation-services'
            ]
        },
        {
            category: 'Action-Based URLs',
            description: 'URLs that focus on the booking action',
            urls: [
                '/book-now',
                '/schedule-appointment',
                '/make-booking',
                '/reserve-service',
                '/book-care-service'
            ]
        },
        {
            category: 'Location-Based URLs',
            description: 'URLs that include location for local SEO',
            urls: [
                '/book-hong-kong-healthcare',
                '/book-hk-medical-services',
                '/book-home-care-hong-kong',
                '/book-nursing-hk'
            ]
        },
        {
            category: 'Category-Based URLs',
            description: 'URLs organized by service categories',
            urls: [
                '/book/medical-services',
                '/book/home-care',
                '/book/nursing-care',
                '/book/rehabilitation',
                '/book/elderly-care'
            ]
        },
        {
            category: 'Bilingual URLs',
            description: 'URLs that work for both Chinese and English',
            urls: [
                '/book-護理服務',
                '/book-care-services',
                '/預約-醫療服務',
                '/book-medical-預約'
            ]
        }
    ];
    
    options.forEach((option, index) => {
        console.log(`${index + 1}. **${option.category}**`);
        console.log(`   ${option.description}`);
        option.urls.forEach(url => {
            console.log(`   - ${CONFIG.baseUrl}${url}`);
        });
        console.log('');
    });
    
    return options;
}

/**
 * Generate service-specific URLs
 */
function generateServiceSpecificUrls() {
    console.log('🏥 Service-Specific URL Options\n');
    
    CONFIG.services.forEach(service => {
        console.log(`**${service.name} (${service.englishName})**`);
        console.log(`Service ID: ${service.id}`);
        console.log(`Keywords: ${service.keywords.join(', ')}`);
        
        const urlOptions = [
            `/book/${service.id}`,
            `/book-${service.id}`,
            `/schedule-${service.id}`,
            `/book-${service.keywords[0]}-${service.keywords[1]}`,
            `/預約-${service.name.replace(/\s+/g, '-')}`
        ];
        
        urlOptions.forEach(url => {
            console.log(`   - ${CONFIG.baseUrl}${url}`);
        });
        console.log('');
    });
}

/**
 * Generate URL structure recommendations
 */
function generateURLStructureRecommendations() {
    console.log('📋 URL Structure Recommendations\n');
    
    const recommendations = [
        {
            title: 'Primary Booking URL',
            url: '/book-now',
            reason: 'Simple, clear, and action-oriented',
            seoBenefits: [
                'Easy to remember',
                'Clear call-to-action',
                'Good for conversion',
                'Works in multiple languages'
            ]
        },
        {
            title: 'Service Category URLs',
            url: '/book/medical-services',
            reason: 'Organized by service categories',
            seoBenefits: [
                'Better site structure',
                'Easier to manage',
                'Good for internal linking',
                'Scalable for new services'
            ]
        },
        {
            title: 'Location-Specific URLs',
            url: '/book-hong-kong-healthcare',
            reason: 'Includes location for local SEO',
            seoBenefits: [
                'Better local search ranking',
                'Geographic targeting',
                'Local keyword optimization',
                'Regional service focus'
            ]
        }
    ];
    
    recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. **${rec.title}**`);
        console.log(`   URL: ${CONFIG.baseUrl}${rec.url}`);
        console.log(`   Reason: ${rec.reason}`);
        console.log(`   SEO Benefits:`);
        rec.seoBenefits.forEach(benefit => {
            console.log(`   - ${benefit}`);
        });
        console.log('');
    });
}

/**
 * Generate URL migration plan
 */
function generateURLMigrationPlan() {
    console.log('🔄 URL Migration Plan\n');
    
    const migrationSteps = [
        {
            step: 1,
            action: 'Choose new URL structure',
            description: 'Select the most appropriate SEO-friendly URL',
            example: '/book-now or /book/medical-services'
        },
        {
            step: 2,
            action: 'Set up 301 redirects',
            description: 'Redirect old URL to new URL',
            example: 'booking.html → /book-now'
        },
        {
            step: 3,
            action: 'Update internal links',
            description: 'Update all internal links to use new URL',
            example: 'Update navigation, buttons, and links'
        },
        {
            step: 4,
            action: 'Update sitemap.xml',
            description: 'Add new URL to sitemap and remove old one',
            example: 'Update sitemap-generator.js'
        },
        {
            step: 5,
            action: 'Update meta tags',
            description: 'Update canonical URLs and Open Graph URLs',
            example: 'Update meta-tag-generator.js'
        },
        {
            step: 6,
            action: 'Test and verify',
            description: 'Test redirects and verify SEO implementation',
            example: 'Use Google Search Console to monitor'
        }
    ];
    
    migrationSteps.forEach(step => {
        console.log(`**Step ${step.step}: ${step.action}**`);
        console.log(`   Description: ${step.description}`);
        console.log(`   Example: ${step.example}`);
        console.log('');
    });
}

/**
 * Generate .htaccess rules for URL rewriting
 */
function generateHtaccessRules() {
    console.log('⚙️ .htaccess Rules for URL Rewriting\n');
    
    const htaccessRules = `
# SEO-Friendly URL Rewriting for Booking Page
RewriteEngine On

# Redirect old booking.html to new SEO-friendly URL
RewriteRule ^booking\.html$ /book-now [R=301,L]

# Rewrite SEO-friendly URLs to actual files
RewriteRule ^book-now$ booking.html [L]
RewriteRule ^book/medical-services$ booking.html [L]
RewriteRule ^book-hong-kong-healthcare$ booking.html [L]

# Service-specific URLs
RewriteRule ^book/health-assessment$ booking.html?service=health-assessment [L]
RewriteRule ^book/elderly-care$ booking.html?service=elderly-care [L]
RewriteRule ^book/wound-care$ booking.html?service=wound-care [L]
RewriteRule ^book/accompaniment$ booking.html?service=accompaniment [L]
RewriteRule ^book/nasogastric-care$ booking.html?service=nasogastric-care [L]
RewriteRule ^book/rehabilitation$ booking.html?service=rehabilitation [L]
RewriteRule ^book/housekeeping$ booking.html?service=housekeeping [L]
RewriteRule ^book/disinfection$ booking.html?service=disinfection [L]

# Remove .html extension from all URLs
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
`;
    
    console.log(htaccessRules);
}

/**
 * Generate JavaScript for URL handling
 */
function generateJavaScriptURLHandling() {
    console.log('📝 JavaScript for URL Handling\n');
    
    const jsCode = `
// URL Parameter Handling for Service Pre-selection
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Pre-select service based on URL parameter
function preSelectServiceFromUrl() {
    const serviceId = getUrlParameter('service');
    if (serviceId) {
        // Find the service in the services array
        const service = services.find(s => s.id === serviceId);
        if (service) {
            // Pre-select the service
            selectService(serviceId);
            // Scroll to booking steps
            document.getElementById('bookingSteps').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Update URL when service is selected
function updateUrlForService(serviceId) {
    const newUrl = \`/book/\${serviceId}\`;
    window.history.pushState({}, '', newUrl);
}

// Initialize URL handling
document.addEventListener('DOMContentLoaded', function() {
    preSelectServiceFromUrl();
});

// Update selectService function to include URL update
function selectService(serviceId) {
    // ... existing code ...
    
    // Update URL
    updateUrlForService(serviceId);
    
    // ... rest of existing code ...
}
`;
    
    console.log(jsCode);
}

/**
 * Generate SEO analysis for current vs new URLs
 */
function generateSEOAnalysis() {
    console.log('📊 SEO Analysis: Current vs New URLs\n');
    
    const analysis = {
        current: {
            url: '/booking.html',
            issues: [
                'Generic filename',
                'No keywords in URL',
                'Not descriptive',
                'Poor user experience',
                'Weak SEO signal'
            ],
            score: 3
        },
        recommended: {
            url: '/book-now',
            benefits: [
                'Action-oriented keyword',
                'Clear call-to-action',
                'Better user experience',
                'Improved click-through rates',
                'Strong SEO signal'
            ],
            score: 9
        }
    };
    
    console.log('**Current URL Analysis:**');
    console.log(`URL: ${CONFIG.baseUrl}${analysis.current.url}`);
    console.log('Issues:');
    analysis.current.issues.forEach(issue => {
        console.log(`- ${issue}`);
    });
    console.log(`SEO Score: ${analysis.current.score}/10\n`);
    
    console.log('**Recommended URL Analysis:**');
    console.log(`URL: ${CONFIG.baseUrl}${analysis.recommended.url}`);
    console.log('Benefits:');
    analysis.recommended.benefits.forEach(benefit => {
        console.log(`- ${benefit}`);
    });
    console.log(`SEO Score: ${analysis.recommended.score}/10\n`);
    
    console.log('**Improvement Potential:**');
    console.log(`Score Improvement: +${analysis.recommended.score - analysis.current.score} points`);
    console.log('Expected Benefits:');
    console.log('- Better search engine rankings');
    console.log('- Improved user experience');
    console.log('- Higher click-through rates');
    console.log('- Better conversion rates');
    console.log('- Enhanced brand perception\n');
}

/**
 * Main function
 */
function main() {
    console.log('🚀 SEO-Friendly URL Generator');
    console.log('=' .repeat(50));
    console.log(`Current URL: ${CONFIG.baseUrl}${CONFIG.currentUrl}\n`);
    
    // Generate all recommendations
    generateSEOUrlOptions();
    generateServiceSpecificUrls();
    generateURLStructureRecommendations();
    generateURLMigrationPlan();
    generateHtaccessRules();
    generateJavaScriptURLHandling();
    generateSEOAnalysis();
    
    console.log('🎯 Recommended Action Plan:');
    console.log('1. Choose /book-now as the primary booking URL');
    console.log('2. Set up 301 redirect from booking.html to /book-now');
    console.log('3. Update all internal links and meta tags');
    console.log('4. Implement service-specific URLs for better targeting');
    console.log('5. Monitor performance and adjust as needed\n');
    
    console.log('🔗 Next Steps:');
    console.log('- Review the URL options above');
    console.log('- Choose the most appropriate structure');
    console.log('- Implement the migration plan');
    console.log('- Test thoroughly before going live');
    console.log('- Monitor SEO performance after implementation\n');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateSEOUrlOptions,
    generateServiceSpecificUrls,
    generateURLStructureRecommendations,
    generateURLMigrationPlan,
    generateHtaccessRules,
    generateJavaScriptURLHandling,
    generateSEOAnalysis,
    CONFIG
};

