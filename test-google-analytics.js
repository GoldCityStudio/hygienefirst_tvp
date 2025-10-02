#!/usr/bin/env node

/**
 * Google Analytics Test Script
 * 
 * This script tests the Google Analytics implementation by checking
 * if the tracking code is properly configured and provides testing
 * instructions.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    trackingId: 'G-NFT58KR02S',
    testPages: [
        'index.html',
        'booking.html',
        'services.html',
        'contact.html'
    ]
};

/**
 * Check if Google Analytics is properly configured
 */
function checkGoogleAnalyticsConfig() {
    console.log('🔍 Checking Google Analytics configuration...\n');
    
    let allGood = true;
    
    // Check google-analytics-config.js
    try {
        const gaConfig = fs.readFileSync('google-analytics-config.js', 'utf8');
        if (gaConfig.includes(CONFIG.trackingId)) {
            console.log('✅ google-analytics-config.js: Tracking ID configured');
        } else {
            console.log('❌ google-analytics-config.js: Tracking ID not found');
            allGood = false;
        }
    } catch (error) {
        console.log('❌ google-analytics-config.js: File not found');
        allGood = false;
    }
    
    // Check meta-tag-generator.js
    try {
        const metaConfig = fs.readFileSync('meta-tag-generator.js', 'utf8');
        if (metaConfig.includes(CONFIG.trackingId)) {
            console.log('✅ meta-tag-generator.js: Tracking ID configured');
        } else {
            console.log('❌ meta-tag-generator.js: Tracking ID not found');
            allGood = false;
        }
    } catch (error) {
        console.log('❌ meta-tag-generator.js: File not found');
        allGood = false;
    }
    
    // Check HTML files
    CONFIG.testPages.forEach(page => {
        try {
            const content = fs.readFileSync(page, 'utf8');
            if (content.includes(CONFIG.trackingId)) {
                console.log(`✅ ${page}: Google Analytics tracking code found`);
            } else {
                console.log(`❌ ${page}: Google Analytics tracking code not found`);
                allGood = false;
            }
        } catch (error) {
            console.log(`❌ ${page}: File not found`);
            allGood = false;
        }
    });
    
    return allGood;
}

/**
 * Generate test instructions
 */
function generateTestInstructions() {
    console.log('\n📋 Google Analytics Testing Instructions:\n');
    
    console.log('1. **Real-Time Testing**:');
    console.log('   - Open your website in a browser');
    console.log('   - Go to Google Analytics → Reports → Realtime');
    console.log('   - You should see your current session\n');
    
    console.log('2. **Browser Console Testing**:');
    console.log('   - Open browser developer tools (F12)');
    console.log('   - Go to Console tab');
    console.log('   - Type: gtag("event", "test_event", {test: true})');
    console.log('   - Check if event appears in GA4 real-time reports\n');
    
    console.log('3. **Booking Flow Testing**:');
    console.log('   - Visit booking.html');
    console.log('   - Select a service');
    console.log('   - Complete booking steps');
    console.log('   - Check GA4 for custom events\n');
    
    console.log('4. **Chatbot Testing**:');
    console.log('   - Open chatbot on any page');
    console.log('   - Send a message');
    console.log('   - Check for chatbot_interaction events\n');
    
    console.log('5. **Validation Tools**:');
    console.log('   - Google Analytics Debugger Chrome extension');
    console.log('   - GA4 Event Builder: https://ga-dev-tools.google/ga4/event-builder/');
    console.log('   - Google Tag Assistant: https://tagassistant.google.com/\n');
}

/**
 * Generate test events
 */
function generateTestEvents() {
    console.log('🧪 Test Events to Trigger:\n');
    
    const testEvents = [
        {
            name: 'page_view',
            description: 'Automatic page view tracking',
            trigger: 'Visit any page'
        },
        {
            name: 'select_item',
            description: 'Service selection tracking',
            trigger: 'Select a service on booking page'
        },
        {
            name: 'booking_step',
            description: 'Booking funnel tracking',
            trigger: 'Navigate through booking steps'
        },
        {
            name: 'purchase',
            description: 'Booking completion tracking',
            trigger: 'Complete a booking'
        },
        {
            name: 'chatbot_interaction',
            description: 'Chatbot usage tracking',
            trigger: 'Open/close chatbot or send message'
        },
        {
            name: 'user_engagement',
            description: 'User behavior tracking',
            trigger: 'Interact with page elements'
        }
    ];
    
    testEvents.forEach((event, index) => {
        console.log(`${index + 1}. **${event.name}**`);
        console.log(`   Description: ${event.description}`);
        console.log(`   Trigger: ${event.trigger}\n`);
    });
}

/**
 * Generate debugging checklist
 */
function generateDebuggingChecklist() {
    console.log('🔧 Debugging Checklist:\n');
    
    const checklist = [
        'Check if gtag function is available in browser console',
        'Verify tracking ID is correct in all files',
        'Check for JavaScript errors in browser console',
        'Ensure Google Analytics script is loading',
        'Verify custom dimensions are configured in GA4',
        'Check if events are appearing in real-time reports',
        'Test with different browsers and devices',
        'Check network tab for GA requests',
        'Verify enhanced ecommerce is enabled',
        'Test conversion tracking'
    ];
    
    checklist.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
    });
    
    console.log('\n');
}

/**
 * Main function
 */
function main() {
    console.log('🚀 Google Analytics Test Script');
    console.log('=' .repeat(50));
    console.log(`Tracking ID: ${CONFIG.trackingId}\n`);
    
    // Check configuration
    const configOk = checkGoogleAnalyticsConfig();
    
    if (configOk) {
        console.log('\n🎉 Google Analytics configuration looks good!');
    } else {
        console.log('\n⚠️ Google Analytics configuration has issues.');
        console.log('Please check the errors above and fix them.');
    }
    
    // Generate test instructions
    generateTestInstructions();
    
    // Generate test events
    generateTestEvents();
    
    // Generate debugging checklist
    generateDebuggingChecklist();
    
    console.log('📊 Next Steps:');
    console.log('1. Test the implementation using the instructions above');
    console.log('2. Check Google Analytics real-time reports');
    console.log('3. Set up custom reports and dashboards');
    console.log('4. Monitor conversion tracking');
    console.log('5. Regular performance reviews\n');
    
    console.log('🔗 Useful Links:');
    console.log('- Google Analytics: https://analytics.google.com/');
    console.log('- GA4 Event Builder: https://ga-dev-tools.google/ga4/event-builder/');
    console.log('- Google Tag Assistant: https://tagassistant.google.com/');
    console.log('- GA4 Documentation: https://developers.google.com/analytics/devguides/collection/ga4\n');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    checkGoogleAnalyticsConfig,
    generateTestInstructions,
    generateTestEvents,
    generateDebuggingChecklist,
    CONFIG
};
