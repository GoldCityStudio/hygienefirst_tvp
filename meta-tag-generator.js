#!/usr/bin/env node

/**
 * Meta Tag Generator for Hygiene First Website
 * 
 * This script automatically generates SEO meta tags for HTML files
 * by analyzing page content and creating appropriate meta descriptions,
 * keywords, Open Graph tags, and structured data.
 * 
 * Usage: node meta-tag-generator.js [filename]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    baseUrl: 'https://www.hygienefirstgroup.com',
    companyName: 'Hygiene First 首衛',
    companyFullName: 'Hygiene First Company Limited',
    phone: '+852-2827-8889',
    email: 'careteam@hygienefirstgroup.com',
    googleAnalytics: {
        trackingId: 'G-NFT58KR02S', // Your actual GA4 tracking ID
        enabled: true,
        enhancedEcommerce: true,
        customDimensions: {
            userType: 'dimension1',
            serviceCategory: 'dimension2',
            bookingStep: 'dimension3'
        }
    },
    
    address: {
        street: '新合里3號匯賢一號雋峰12樓17室',
        locality: '屯門',
        region: '新界',
        country: 'HK'
    },
    coordinates: {
        latitude: '22.3964',
        longitude: '113.9725'
    },
    themeColor: '#FF7A00',
    logoUrl: 'https://www.hygienefirstgroup.com/images/HF%20logo/logo.png',
    rating: {
        value: '4.8',
        count: '60000',
        best: '5',
        worst: '1'
    }
};

// Page-specific configurations
const PAGE_CONFIGS = {
    'index.html': {
        title: 'Hygiene First 首衛 - 一站式護理支援',
        description: 'Hygiene First 首衛提供24小時專業醫護人員配對服務，包括上門護理、疫苗注射、過期針藥回收。自2008年以來服務60,000+家庭，用心服務每個家庭。',
        keywords: 'Hygiene First,首衛,醫療護理,上門護理,疫苗注射,醫護人員配對,24小時護理,香港護理服務,專業護士,物理治療師,保健員',
        schemaType: 'MedicalBusiness',
        priority: 1.0
    },
    'index-zh.html': {
        title: 'Hygiene First 首衛 - 一站式護理支援',
        description: 'Hygiene First 首衛提供24小時專業醫護人員配對服務，包括上門護理、疫苗注射、過期針藥回收。自2008年以來服務60,000+家庭，用心服務每個家庭。',
        keywords: 'Hygiene First,首衛,醫療護理,上門護理,疫苗注射,醫護人員配對,24小時護理,香港護理服務,專業護士,物理治療師,保健員',
        schemaType: 'MedicalBusiness',
        priority: 1.0
    },
    'booking.html': {
        title: '服務預約 - Hygiene First 首衛',
        description: 'Hygiene First 首衛提供專業醫療護理服務預約，包括上門健康評估、長者照顧、傷口護理、陪診護送、復康護理等。24小時專業醫護人員配對，立即預約享受優質護理服務。',
        keywords: '醫療護理預約,上門健康評估,長者照顧服務,傷口護理,陪診護送,復康護理,鼻胃喉管護理,家居清潔,納米消毒,專業護士,物理治療師,保健員,24小時護理,香港護理服務,Hygiene First,首衛',
        schemaType: 'MedicalBusiness',
        priority: 0.9
    },
    'services.html': {
        title: '居家護理服務 - Hygiene First 首衛',
        description: 'Hygiene First 首衛提供全面的居家護理服務，包括上門健康評估、長者照顧、傷口護理、陪診護送、復康護理等專業醫療護理服務。',
        keywords: '居家護理服務,上門健康評估,長者照顧,傷口護理,陪診護送,復康護理,鼻胃喉管護理,照顧者培訓,中風護理,癌症護理,認知障礙症護理,手術後護理',
        schemaType: 'MedicalBusiness',
        priority: 0.8
    },
    'service.html': {
        title: '居家護理服務 - Hygiene First 首衛',
        description: 'Hygiene First 首衛提供全面的居家護理服務，包括上門健康評估、長者照顧、傷口護理、陪診護送、復康護理等專業醫療護理服務。',
        keywords: '居家護理服務,上門健康評估,長者照顧,傷口護理,陪診護送,復康護理,鼻胃喉管護理,照顧者培訓,中風護理,癌症護理,認知障礙症護理,手術後護理',
        schemaType: 'MedicalBusiness',
        priority: 0.8
    },
    'contact.html': {
        title: '聯絡我們 - Hygiene First 首衛',
        description: '聯絡Hygiene First 首衛專業醫療護理團隊。電話：2827 8889，電郵：careteam@hygienefirstgroup.com。24小時服務，立即查詢醫療護理服務。',
        keywords: '聯絡Hygiene First,首衛聯絡,醫療護理查詢,護理服務電話,上門護理預約,24小時護理熱線,香港護理服務',
        schemaType: 'ContactPage',
        priority: 0.8
    },
    'contact-zh.html': {
        title: '聯絡我們 - Hygiene First 首衛',
        description: '聯絡Hygiene First 首衛專業醫療護理團隊。電話：2827 8889，電郵：careteam@hygienefirstgroup.com。24小時服務，立即查詢醫療護理服務。',
        keywords: '聯絡Hygiene First,首衛聯絡,醫療護理查詢,護理服務電話,上門護理預約,24小時護理熱線,香港護理服務',
        schemaType: 'ContactPage',
        priority: 0.8
    },
    'about.html': {
        title: '關於我們 - Hygiene First 首衛',
        description: '了解Hygiene First 首衛的專業醫療護理服務歷史。自2008年以來，我們為60,000+家庭提供優質護理服務，擁有20,000+專業醫護人員網絡。',
        keywords: '關於Hygiene First,首衛歷史,醫療護理公司,專業護理團隊,香港護理服務,醫護人員網絡,護理服務經驗',
        schemaType: 'AboutPage',
        priority: 0.6
    },
    'news.html': {
        title: '媒體中心 - Hygiene First 首衛',
        description: 'Hygiene First 首衛最新消息和媒體資訊。了解我們的護理服務動態、健康護理知識、公司新聞和行業資訊。',
        keywords: 'Hygiene First新聞,首衛動態,護理服務資訊,健康護理知識,醫療護理新聞,護理行業資訊',
        schemaType: 'NewsArticle',
        priority: 0.7
    }
};

// Service-specific keywords
const SERVICE_KEYWORDS = {
    'health-assessment': '上門健康評估,專業護士,健康檢查,身體評估,醫療評估',
    'elderly-care': '長者照顧,長者護理,老人護理,居家護理,長者服務',
    'wound-care': '傷口護理,傷口處理,換藥服務,傷口清潔,專業護理',
    'accompaniment': '陪診護送,就醫陪同,醫院護送,陪診服務,醫療護送',
    'nasogastric-care': '鼻胃喉管護理,餵食護理,鼻胃管,喉管護理,專業護理',
    'rehabilitation': '復康護理,物理治療,康復訓練,復健服務,運動治療',
    'housekeeping': '家居清潔,專業清潔,家庭清潔,清潔服務,家居服務',
    'disinfection': '納米消毒,光觸媒消毒,專業消毒,家居消毒,消毒服務'
};

/**
 * Generate meta tags for a specific page
 */
function generateMetaTags(pageConfig, filename) {
    const url = `${CONFIG.baseUrl}/${filename}`;
    const title = pageConfig.title;
    const description = pageConfig.description;
    const keywords = pageConfig.keywords;
    
    return `    <!-- SEO Meta Tags -->
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="${CONFIG.companyFullName}">
    <meta name="robots" content="index, follow">
    <meta name="language" content="zh-TW">
    <meta name="geo.region" content="HK">
    <meta name="geo.placename" content="Hong Kong">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${CONFIG.logoUrl}">
    <meta property="og:site_name" content="${CONFIG.companyName}">
    <meta property="og:locale" content="zh_TW">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${CONFIG.logoUrl}">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="theme-color" content="${CONFIG.themeColor}">
    <meta name="msapplication-TileColor" content="${CONFIG.themeColor}">
    <meta name="application-name" content="${CONFIG.companyName}">
    <meta name="apple-mobile-web-app-title" content="${CONFIG.companyName}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${url}">
    
    <!-- Alternate Language Links -->
    <link rel="alternate" hreflang="zh-TW" href="${url}">
    <link rel="alternate" hreflang="zh-HK" href="${url}">
    <link rel="alternate" hreflang="x-default" href="${url}">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalytics.trackingId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${CONFIG.googleAnalytics.trackingId}', {
            page_title: '${title}',
            page_location: '${url}',
            custom_map: {
                '${CONFIG.googleAnalytics.customDimensions.userType}': 'user_type',
                '${CONFIG.googleAnalytics.customDimensions.serviceCategory}': 'service_category',
                '${CONFIG.googleAnalytics.customDimensions.bookingStep}': 'booking_step'
            }
        });
    </script>`;
}

/**
 * Generate structured data (JSON-LD) for a page
 */
function generateStructuredData(pageConfig, filename) {
    const url = `${CONFIG.baseUrl}/${filename}`;
    const title = pageConfig.title;
    const description = pageConfig.description;
    
    let structuredData = {
        "@context": "https://schema.org",
        "@type": pageConfig.schemaType,
        "name": CONFIG.companyName,
        "alternateName": CONFIG.companyFullName,
        "description": description,
        "url": url,
        "logo": CONFIG.logoUrl,
        "image": CONFIG.logoUrl
    };
    
    // Add contact information for business pages
    if (pageConfig.schemaType === 'MedicalBusiness' || pageConfig.schemaType === 'ContactPage') {
        structuredData.telephone = CONFIG.phone;
        structuredData.email = CONFIG.email;
        structuredData.address = {
            "@type": "PostalAddress",
            "streetAddress": CONFIG.address.street,
            "addressLocality": CONFIG.address.locality,
            "addressRegion": CONFIG.address.region,
            "addressCountry": CONFIG.address.country
        };
        structuredData.geo = {
            "@type": "GeoCoordinates",
            "latitude": CONFIG.coordinates.latitude,
            "longitude": CONFIG.coordinates.longitude
        };
        structuredData.openingHours = "Mo-Su 00:00-23:59";
        structuredData.priceRange = "$$";
        structuredData.currenciesAccepted = "HKD";
        structuredData.paymentAccepted = "Cash, Credit Card, Bank Transfer";
        structuredData.areaServed = {
            "@type": "Country",
            "name": "Hong Kong"
        };
        structuredData.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": CONFIG.rating.value,
            "reviewCount": CONFIG.rating.count,
            "bestRating": CONFIG.rating.best,
            "worstRating": CONFIG.rating.worst
        };
    }
    
    // Add service information for booking page
    if (filename === 'booking.html') {
        structuredData.serviceType = [
            "上門健康評估",
            "長者照顧服務", 
            "傷口護理",
            "陪診護送服務",
            "鼻胃喉管護理",
            "復康護理",
            "家居清潔",
            "納米消毒服務"
        ];
        
        structuredData.hasOfferCatalog = {
            "@type": "OfferCatalog",
            "name": "醫療護理服務",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "上門健康評估",
                        "description": "專業護士上門進行全面健康評估"
                    },
                    "price": "500",
                    "priceCurrency": "HKD"
                },
                {
                    "@type": "Offer", 
                    "itemOffered": {
                        "@type": "Service",
                        "name": "長者照顧服務",
                        "description": "專業照顧員提供長者日常照顧"
                    },
                    "price": "300",
                    "priceCurrency": "HKD"
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service", 
                        "name": "傷口護理",
                        "description": "專業傷口清潔、換藥及護理"
                    },
                    "price": "400",
                    "priceCurrency": "HKD"
                }
            ]
        };
    }
    
    return `    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    ${JSON.stringify(structuredData, null, 4)}
    </script>`;
}

/**
 * Update HTML file with meta tags
 */
function updateHtmlFile(filename) {
    try {
        const filePath = path.join(process.cwd(), filename);
        
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filename}`);
            return false;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Get page configuration
        const pageConfig = PAGE_CONFIGS[filename];
        if (!pageConfig) {
            console.log(`⚠️  No configuration found for ${filename}, using default`);
            return false;
        }
        
        // Remove existing meta tags (between <!-- SEO Meta Tags --> and <!-- Structured Data -->)
        const metaTagRegex = /<!-- SEO Meta Tags -->[\s\S]*?<!-- Structured Data \(JSON-LD\) -->[\s\S]*?<\/script>/g;
        content = content.replace(metaTagRegex, '');
        
        // Generate new meta tags
        const metaTags = generateMetaTags(pageConfig, filename);
        const structuredData = generateStructuredData(pageConfig, filename);
        
        // Insert meta tags after <title> tag
        const titleRegex = /(<title>.*?<\/title>)/;
        const replacement = `$1\n\n${metaTags}\n\n${structuredData}`;
        content = content.replace(titleRegex, replacement);
        
        // Write updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log(`✅ Updated meta tags for: ${filename}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filename}:`, error.message);
        return false;
    }
}

/**
 * Get all HTML files in directory
 */
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(file);
        }
    });
    
    return fileList;
}

/**
 * Main function
 */
function main() {
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
        // Update specific file
        const filename = args[0];
        console.log(`🚀 Updating meta tags for: ${filename}`);
        updateHtmlFile(filename);
    } else {
        // Update all configured files
        console.log('🚀 Updating meta tags for all configured pages...');
        
        const configuredFiles = Object.keys(PAGE_CONFIGS);
        let successCount = 0;
        
        configuredFiles.forEach(filename => {
            if (updateHtmlFile(filename)) {
                successCount++;
            }
        });
        
        console.log(`\n📊 Summary:`);
        console.log(`   Total files: ${configuredFiles.length}`);
        console.log(`   Successfully updated: ${successCount}`);
        console.log(`   Failed: ${configuredFiles.length - successCount}`);
        
        if (successCount > 0) {
            console.log('\n✅ Meta tag generation completed!');
        }
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateMetaTags,
    generateStructuredData,
    updateHtmlFile,
    CONFIG,
    PAGE_CONFIGS
};
