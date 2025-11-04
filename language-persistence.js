// Language Persistence System
// This script handles language preference storage and automatic redirection

(function() {
    'use strict';
    
    // Language mapping for special pages with Chinese characters
    const specialPageMapping = {
        'zh': {
            'home-medication-collection-en.html': '家居藥物回收計劃.html',
            'medical-waste-management-en.html': '醫療廢棄物處理及管理.html',
            'chemical-waste-management-en.html': '化學廢物處理及管理.html',
            'drug-classification-search-en.html': '藥物分類搜尋引擎器.html',
            'community-en.html': 'community-zh.html'
        },
        'en': {
            '家居藥物回收計劃.html': 'home-medication-collection-en.html',
            '醫療廢棄物處理及管理.html': 'medical-waste-management-en.html',
            '化學廢物處理及管理.html': 'chemical-waste-management-en.html',
            '藥物分類搜尋引擎器.html': 'drug-classification-search-en.html',
            'community-zh.html': 'community-en.html'
        }
    };
    
    /**
     * Get the current page language based on filename
     */
    function getCurrentLanguage() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop() || 'index.html';
        
        // Check if it's an English page
        if (fileName.includes('-en.html') || fileName === 'index-en.html') {
            return 'en';
        }
        
        // Check if it's a special Chinese page
        const chineseFileName = Object.keys(specialPageMapping.en).find(
            key => fileName.includes(key) || fileName === key
        );
        if (chineseFileName) {
            return 'zh';
        }
        
        // Default to Chinese for pages without -en
        return 'zh';
    }
    
    /**
     * Convert a URL to the opposite language version
     */
    function convertToOppositeLanguage(url) {
        if (!url) return url;
        
        // Handle relative URLs
        const fileName = url.split('/').pop() || url;
        const basePath = url.substring(0, url.lastIndexOf('/') + 1);
        
        // Handle special pages with Chinese characters
        if (specialPageMapping.en[fileName]) {
            return basePath + specialPageMapping.en[fileName];
        }
        if (specialPageMapping.zh[fileName]) {
            return basePath + specialPageMapping.zh[fileName];
        }
        
        // Handle standard pages
        if (fileName.includes('-en.html')) {
            // Convert from English to Chinese
            return basePath + fileName.replace('-en.html', '.html');
        } else if (fileName === 'index-en.html') {
            return basePath + 'index.html';
        } else if (fileName === 'index.html') {
            return basePath + 'index-en.html';
        } else if (fileName.endsWith('.html') && !fileName.includes('-en') && !fileName.includes('community-zh')) {
            // Convert from Chinese to English
            const baseName = fileName.replace('.html', '');
            return basePath + baseName + '-en.html';
        }
        
        return url;
    }
    
    /**
     * Convert a URL to the preferred language version
     */
    function convertToPreferredLanguage(url) {
        if (!url) return url;
        
        const preferredLang = getStoredLanguage();
        if (!preferredLang) return url;
        
        const currentLang = getCurrentLanguage();
        
        // Only convert if the preferred language is different from current
        if (preferredLang !== currentLang) {
            return convertToOppositeLanguage(url);
        }
        
        return url;
    }
    
    /**
     * Get stored language preference
     */
    function getStoredLanguage() {
        return localStorage.getItem('preferredLanguage') || null;
    }
    
    /**
     * Store language preference
     */
    function storeLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
    }
    
    /**
     * Check and redirect if language preference doesn't match current page
     */
    function checkAndRedirect() {
        const storedLang = getStoredLanguage();
        const currentLang = getCurrentLanguage();
        
        // If user has a preference and it doesn't match current page, redirect
        if (storedLang && storedLang !== currentLang) {
            const currentPath = window.location.pathname;
            const fileName = currentPath.split('/').pop() || 'index.html';
            const newFileName = convertToOppositeLanguage(fileName);
            
            // Only redirect if we can convert the URL
            if (newFileName && newFileName !== fileName) {
                const newPath = currentPath.replace(fileName, newFileName);
                window.location.href = newPath;
                return true;
            }
        }
        
        // Store current language if no preference exists
        if (!storedLang) {
            storeLanguage(currentLang);
        }
        
        return false;
    }
    
    /**
     * Initialize language persistence on page load
     */
    function initLanguagePersistence() {
        // Don't redirect if we're already in the process of switching
        if (sessionStorage.getItem('languageSwitching') === 'true') {
            sessionStorage.removeItem('languageSwitching');
            return;
        }
        
        checkAndRedirect();
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguagePersistence);
    } else {
        initLanguagePersistence();
    }
    
    
    // Export functions for use in language switcher
    window.languagePersistence = {
        storeLanguage: storeLanguage,
        convertToOppositeLanguage: convertToOppositeLanguage,
        convertToPreferredLanguage: convertToPreferredLanguage,
        getCurrentLanguage: getCurrentLanguage
    };
})();

