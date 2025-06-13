// Enhanced Google Analytics Implementation

// Initialize GA4
(function() {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    
    // Initialize with your GA4 property ID
    gtag('config', 'G-XXXXXXXXXX', {
        'send_page_view': true,
        'anonymize_ip': true,
        'cookie_domain': 'hygienefirst.com',
        'cookie_expires': 63072000, // 2 years in seconds
        'cookie_update': true,
        'page_title': document.title
    });
    
    // Language tracking
    let language = document.documentElement.lang || 'en';
    gtag('set', 'user_properties', {
        language: language
    });
    
    // Custom dimensions
    gtag('set', 'custom_map', {
        'dimension1': 'user_type',
        'dimension2': 'page_template',
        'dimension3': 'page_language'
    });
    
    // Set current page template/type
    let pageTemplate = 'other';
    if (window.location.pathname === '/' || window.location.pathname === '/zh-tw' || window.location.pathname === '/index.html' || window.location.pathname === '/index-zh.html') {
        pageTemplate = 'home';
    } else if (window.location.pathname.includes('services')) {
        pageTemplate = 'services';
    } else if (window.location.pathname.includes('contact')) {
        pageTemplate = 'contact';
    }
    
    // Send pageview with custom dimensions
    gtag('event', 'page_view', {
        'user_type': 'visitor',
        'page_template': pageTemplate,
        'page_language': language
    });
    
    // Track outbound links
    document.addEventListener('click', function(e) {
        let target = e.target;
        
        // Find closest anchor element
        while (target && target.tagName !== 'A') {
            target = target.parentNode;
            if (!target) return;
        }
        
        // If it's an anchor with href
        if (target && target.tagName === 'A' && target.href) {
            const href = target.href;
            // Check if it's an external link
            if (href.indexOf(location.host) === -1 && href.indexOf('javascript:') === -1 && !href.startsWith('#')) {
                // Send event for outbound link
                gtag('event', 'outbound_link', {
                    'link_url': href,
                    'link_text': target.innerText || 'Image link'
                });
            }
        }
    });
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        
        // Check if it's the contact or booking form
        if (form.id === 'contactForm' || form.id === 'booking-form') {
            gtag('event', 'form_submission', {
                'form_id': form.id,
                'form_name': form.id === 'contactForm' ? 'Contact Form' : 'Booking Form'
            });
        }
    });
    
    // Track booking modal interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Track modal open
        const bookingButtons = document.querySelectorAll('.book-now-btn, .cta-btn');
        bookingButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                gtag('event', 'booking_modal_open', {
                    'page_location': window.location.pathname
                });
            });
        });
        
        // Track booking process steps
        const nextButtons = document.querySelectorAll('.next-step');
        nextButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const step = parseInt(this.dataset.step) + 1;
                gtag('event', 'booking_step', {
                    'step_number': step,
                    'step_name': getStepName(step)
                });
            });
        });
        
        // Track successful booking
        const submitButton = document.getElementById('submit-booking');
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                gtag('event', 'booking_complete', {
                    'booking_type': getSelectedService(),
                    'language': language
                });
            });
        }
    });
    
    // Helper function to get step name
    function getStepName(step) {
        switch(step) {
            case 1: return 'service_selection';
            case 2: return 'date_time_selection';
            case 3: return 'contact_information';
            case 4: return 'payment_method';
            default: return 'unknown';
        }
    }
    
    // Helper function to get selected service
    function getSelectedService() {
        const selectedService = document.querySelector('input[name="service"]:checked');
        return selectedService ? selectedService.dataset.name : 'unknown';
    }
    
    // Scroll depth tracking
    let scrollDepths = [25, 50, 75, 100];
    let sentDepths = [];
    
    window.addEventListener('scroll', debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = getDocHeight();
        const scrollPercent = Math.floor((scrollTop / (docHeight - windowHeight)) * 100);
        
        scrollDepths.forEach(function(depth) {
            if (scrollPercent >= depth && sentDepths.indexOf(depth) === -1) {
                sentDepths.push(depth);
                gtag('event', 'scroll_depth', {
                    'depth': depth + '%',
                    'page': window.location.pathname
                });
            }
        });
    }, 250));
    
    // Get document height
    function getDocHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }
    
    // Debounce function to limit scroll event firing
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Track time on page
    let startTime = new Date();
    let timeIntervals = [30, 60, 120, 180, 300]; // time in seconds
    let timeEvents = [];
    
    // Set interval to check time spent
    setInterval(function() {
        const timeSpent = Math.floor((new Date() - startTime) / 1000);
        
        timeIntervals.forEach(function(interval) {
            if (timeSpent >= interval && timeEvents.indexOf(interval) === -1) {
                timeEvents.push(interval);
                gtag('event', 'time_on_page', {
                    'time_interval': interval + 's',
                    'page': window.location.pathname
                });
            }
        });
    }, 10000); // Check every 10 seconds
    
    // Page unload / visibility change tracking
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            const timeSpent = Math.floor((new Date() - startTime) / 1000);
            gtag('event', 'page_exit', {
                'time_spent': timeSpent + 's',
                'page': window.location.pathname
            });
        }
    });
    
    // Track 404 errors
    if (document.title.indexOf('404') > -1 || document.title.indexOf('Not Found') > -1) {
        gtag('event', 'page_not_found', {
            'page_location': window.location.pathname,
            'from_page': document.referrer
        });
    }
})(); 