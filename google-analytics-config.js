/**
 * Google Analytics Configuration for Hygiene First Website
 * 
 * This file contains Google Analytics 4 (GA4) configuration and tracking
 * functions specifically designed for the Hygiene First booking system.
 * 
 * Features:
 * - Enhanced Ecommerce tracking
 * - Custom events for booking flow
 * - User journey tracking
 * - Service-specific analytics
 * - Conversion tracking
 */

// Google Analytics Configuration
const GA_CONFIG = {
    trackingId: 'G-NFT58KR02S', // Your actual GA4 tracking ID
    measurementId: 'G-NFT58KR02S', // Same as tracking ID for GA4
    enabled: true,
    
    // Custom Dimensions (configure these in GA4)
    customDimensions: {
        userType: 'dimension1',        // new_user, returning_user, member
        serviceCategory: 'dimension2', // health_assessment, elderly_care, etc.
        bookingStep: 'dimension3',     // service_selection, date_time, etc.
        userLocation: 'dimension4',    // hong_kong, kowloon, new_territories
        deviceType: 'dimension5'       // mobile, tablet, desktop
    },
    
    // Custom Metrics
    customMetrics: {
        bookingCompletionTime: 'metric1', // Time to complete booking
        servicePrice: 'metric2',          // Service price selected
        pageEngagementTime: 'metric3'     // Time spent on page
    },
    
    // Enhanced Ecommerce Configuration
    ecommerce: {
        enabled: true,
        currency: 'HKD',
        country: 'HK'
    }
};

// Service Categories for Analytics
const SERVICE_CATEGORIES = {
    'health-assessment': 'health_assessment',
    'elderly-care': 'elderly_care',
    'wound-care': 'wound_care',
    'accompaniment': 'accompaniment',
    'nasogastric-care': 'nasogastric_care',
    'rehabilitation': 'rehabilitation',
    'housekeeping': 'housekeeping',
    'disinfection': 'disinfection'
};

// Booking Steps for Funnel Analysis
const BOOKING_STEPS = {
    'service_selection': 'Service Selection',
    'date_time_selection': 'Date & Time Selection',
    'customer_info': 'Customer Information',
    'confirmation': 'Booking Confirmation',
    'completed': 'Booking Completed'
};

/**
 * Initialize Google Analytics
 */
function initializeGoogleAnalytics() {
    if (!GA_CONFIG.enabled || !GA_CONFIG.trackingId) {
        console.log('Google Analytics not configured');
        return;
    }
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.trackingId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    
    // Configure GA4
    gtag('config', GA_CONFIG.trackingId, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
            [GA_CONFIG.customDimensions.userType]: 'user_type',
            [GA_CONFIG.customDimensions.serviceCategory]: 'service_category',
            [GA_CONFIG.customDimensions.bookingStep]: 'booking_step',
            [GA_CONFIG.customDimensions.userLocation]: 'user_location',
            [GA_CONFIG.customDimensions.deviceType]: 'device_type'
        }
    });
    
    console.log('Google Analytics initialized');
}

/**
 * Track Page View
 */
function trackPageView(pageName, pageCategory = 'General') {
    if (!window.gtag) return;
    
    gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_category: pageCategory,
        custom_parameters: {
            user_type: getUserType(),
            device_type: getDeviceType(),
            user_location: getUserLocation()
        }
    });
}

/**
 * Track Service Selection
 */
function trackServiceSelection(serviceId, serviceName, servicePrice) {
    if (!window.gtag) return;
    
    const serviceCategory = SERVICE_CATEGORIES[serviceId] || 'unknown';
    
    gtag('event', 'select_item', {
        item_list_id: 'services',
        item_list_name: 'Healthcare Services',
        items: [{
            item_id: serviceId,
            item_name: serviceName,
            item_category: serviceCategory,
            price: servicePrice,
            currency: 'HKD'
        }],
        custom_parameters: {
            service_category: serviceCategory,
            booking_step: 'service_selection'
        }
    });
    
    // Set custom dimension
    gtag('config', GA_CONFIG.trackingId, {
        custom_map: {
            [GA_CONFIG.customDimensions.serviceCategory]: serviceCategory
        }
    });
}

/**
 * Track Booking Step
 */
function trackBookingStep(step, stepName, additionalData = {}) {
    if (!window.gtag) return;
    
    gtag('event', 'booking_step', {
        step_name: stepName,
        step_number: Object.keys(BOOKING_STEPS).indexOf(step) + 1,
        ...additionalData,
        custom_parameters: {
            booking_step: step
        }
    });
    
    // Set custom dimension
    gtag('config', GA_CONFIG.trackingId, {
        custom_map: {
            [GA_CONFIG.customDimensions.bookingStep]: step
        }
    });
}

/**
 * Track Booking Completion
 */
function trackBookingCompletion(bookingData) {
    if (!window.gtag) return;
    
    const { service, customer, date, time } = bookingData;
    const serviceCategory = SERVICE_CATEGORIES[service.id] || 'unknown';
    
    // Track purchase event
    gtag('event', 'purchase', {
        transaction_id: bookingData.id,
        value: service.price,
        currency: 'HKD',
        items: [{
            item_id: service.id,
            item_name: service.name,
            item_category: serviceCategory,
            price: service.price,
            quantity: 1
        }],
        custom_parameters: {
            service_category: serviceCategory,
            booking_step: 'completed',
            user_type: getUserType()
        }
    });
    
    // Track conversion
    gtag('event', 'conversion', {
        send_to: GA_CONFIG.trackingId,
        value: service.price,
        currency: 'HKD',
        transaction_id: bookingData.id
    });
    
    console.log('Booking completion tracked:', bookingData.id);
}

/**
 * Track Chatbot Interaction
 */
function trackChatbotInteraction(action, message = '') {
    if (!window.gtag) return;
    
    gtag('event', 'chatbot_interaction', {
        action: action, // 'open', 'close', 'message_sent', 'message_received'
        message_length: message.length,
        custom_parameters: {
            user_type: getUserType()
        }
    });
}

/**
 * Track Service Inquiry
 */
function trackServiceInquiry(serviceType, inquiryMethod = 'form') {
    if (!window.gtag) return;
    
    gtag('event', 'service_inquiry', {
        service_type: serviceType,
        inquiry_method: inquiryMethod,
        custom_parameters: {
            service_category: SERVICE_CATEGORIES[serviceType] || 'unknown',
            user_type: getUserType()
        }
    });
}

/**
 * Track User Engagement
 */
function trackUserEngagement(action, element = '') {
    if (!window.gtag) return;
    
    gtag('event', 'user_engagement', {
        engagement_time_msec: Date.now(),
        action: action,
        element: element,
        custom_parameters: {
            user_type: getUserType(),
            device_type: getDeviceType()
        }
    });
}

/**
 * Track Error Events
 */
function trackError(errorType, errorMessage, errorLocation = '') {
    if (!window.gtag) return;
    
    gtag('event', 'exception', {
        description: errorMessage,
        fatal: false,
        custom_parameters: {
            error_type: errorType,
            error_location: errorLocation,
            user_type: getUserType()
        }
    });
}

/**
 * Helper Functions
 */

function getUserType() {
    // Determine user type based on session or localStorage
    const isReturning = localStorage.getItem('hygiene_first_visitor') === 'true';
    const isMember = localStorage.getItem('hygiene_first_member') === 'true';
    
    if (isMember) return 'member';
    if (isReturning) return 'returning_user';
    return 'new_user';
}

function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

function getUserLocation() {
    // This would typically be determined by IP geolocation or user input
    // For now, return a default value
    return 'hong_kong';
}

/**
 * Initialize Analytics on Page Load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mark user as returning if they've visited before
    if (localStorage.getItem('hygiene_first_visitor')) {
        localStorage.setItem('hygiene_first_visitor', 'true');
    } else {
        localStorage.setItem('hygiene_first_visitor', 'true');
    }
    
    // Initialize Google Analytics
    initializeGoogleAnalytics();
    
    // Track initial page view
    setTimeout(() => {
        trackPageView(document.title, 'Healthcare Services');
    }, 1000);
});

/**
 * Export functions for use in other scripts
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GA_CONFIG,
        SERVICE_CATEGORIES,
        BOOKING_STEPS,
        initializeGoogleAnalytics,
        trackPageView,
        trackServiceSelection,
        trackBookingStep,
        trackBookingCompletion,
        trackChatbotInteraction,
        trackServiceInquiry,
        trackUserEngagement,
        trackError
    };
}
