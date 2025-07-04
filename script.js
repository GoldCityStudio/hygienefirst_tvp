document.addEventListener('DOMContentLoaded', function() {
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    // Handle all internal links for page transitions
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links that aren't anchors, exclude phone/email links
        if (link.hostname === window.location.hostname && 
            !link.href.includes('#') && 
            !link.href.includes('tel:') && 
            !link.href.includes('mailto:')) {
            
            link.addEventListener('click', function(e) {
                // Skip if modifier keys are pressed
                if (e.metaKey || e.ctrlKey) return;
                
                e.preventDefault();
                const targetUrl = this.href;
                
                // Trigger transition
                pageTransition.classList.add('active');
                
                // Navigate after transition completes
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            });
        }
    });

    // Handle page load transition
    if (performance.navigation.type !== 1) { // Not a page refresh
        pageTransition.classList.add('active');
        pageTransition.classList.add('exit');
        
        setTimeout(() => {
            pageTransition.classList.remove('active');
            setTimeout(() => {
                pageTransition.classList.remove('exit');
            }, 600);
        }, 500);
    }

    // Enhanced Navbar functionality
    function enhanceNavigation() {
        // Auto-add active class to current page nav item
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-menu a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Skip if no href or it's a hash
            if (!linkPath || linkPath === '#') return;
            
            // Check if the current path contains the link path or if it's the homepage
            if ((currentPath.includes(linkPath) && linkPath !== '/') || 
                (currentPath === '/' && linkPath === 'index.html') ||
                (currentPath.endsWith('/index-zh.html') && linkPath === 'index-zh.html')) {
                link.classList.add('active');
                
                // If this is a dropdown link, add active to parent
                const dropdownParent = link.closest('.dropdown');
                if (dropdownParent) {
                    const parentLink = dropdownParent.querySelector('a');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
        });
        
        // Make header sticky on scroll with enhanced animations
        const header = document.querySelector('header');
        const heroSection = document.querySelector('.hero');
        let stickyOffset = 100;
        
        // Set the sticky threshold based on hero section if it exists
        if (heroSection) {
            stickyOffset = heroSection.offsetTop;
        }
        
        function updateHeaderState() {
            if (window.pageYOffset > stickyOffset) {
                header.classList.add('sticky');
                document.body.style.paddingTop = header.offsetHeight + 'px';
            } else {
                header.classList.remove('sticky');
                document.body.style.paddingTop = '0';
            }
        }
        
        // Initial call to set header state
        updateHeaderState();
        window.addEventListener('scroll', updateHeaderState);
        window.addEventListener('resize', updateHeaderState);
        
        // Mobile menu enhancements
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainMenu = document.querySelector('.main-menu');
        const overlay = document.querySelector('.overlay');
        
        if (mobileMenuToggle && mainMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mainMenu.classList.toggle('active');
                
                if (overlay) {
                    overlay.classList.toggle('active');
                }
                
                // Prevent body scrolling when menu is open
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking overlay
            if (overlay) {
                overlay.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    mainMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            }
            
            // Enhanced dropdown functionality for mobile
            const dropdowns = document.querySelectorAll('.main-menu .dropdown');
            
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                if (link) {
                    link.addEventListener('click', function(e) {
                        // Only do this for mobile view
                        if (window.innerWidth <= 992) {
                            e.preventDefault();
                            
                            // Check if this is already open
                            const isOpen = dropdown.classList.contains('open');
                            
                            // Close all other dropdowns
                            dropdowns.forEach(otherDropdown => {
                                if (otherDropdown !== dropdown) {
                                    otherDropdown.classList.remove('open');
                                }
                            });
                            
                            // Toggle this dropdown
                            dropdown.classList.toggle('open', !isOpen);
                        }
                    });
                }
            });
            
            // Close menu when window is resized to desktop size
            window.addEventListener('resize', function() {
                if (window.innerWidth > 992) {
                    mobileMenuToggle.classList.remove('active');
                    mainMenu.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Remove all open classes from dropdowns
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('open');
                    });
                }
            });
        }
    }
    
    // Initialize enhanced navigation
    enhanceNavigation();

    // Enhanced scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Stats animation
    const stats = document.querySelectorAll('.stat');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Initialize counters for stats
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        stats.forEach(stat => {
            const countElement = stat.querySelector('h2');
            if (!countElement || !countElement.hasAttribute('data-count')) return;
            
            const countTarget = parseInt(countElement.getAttribute('data-count'), 10);
            const duration = 2000;
            const frameRate = 20;
            const frames = duration / frameRate;
            const increment = countTarget / frames;
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= countTarget) {
                    current = countTarget;
                    clearInterval(counter);
                }
                countElement.textContent = Math.floor(current).toLocaleString();
            }, frameRate);
        });
        
        countersStarted = true;
    }
    
    // Check elements on scroll
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
        
        // Check if stats section is in view to start counters
        const statsSection = document.querySelector('.stats');
        if (statsSection && isInViewport(statsSection)) {
            stats.forEach(stat => stat.classList.add('in-view'));
            startCounters();
        }
    }
    
    // Check on load and scroll
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);
    
    // Smooth reveal of sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add(index % 2 === 0 ? 'odd' : 'even');
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.8s ease-out';
        
        setTimeout(() => {
            section.style.opacity = '1';
        }, 300 + (index * 100));
    });
    
    // Enhanced back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            // Moves the hero content slightly in the opposite direction of scroll
            // Creating a parallax effect
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize stat counters if they exist
    stats.forEach(stat => {
        const countElement = stat.querySelector('h2');
        if (countElement && countElement.textContent.trim()) {
            countElement.setAttribute('data-count', countElement.textContent.replace(/[^0-9]/g, ''));
            countElement.textContent = '0';
        }
    });
    
    // Initialize hero animation triggers
    const heroElements = document.querySelectorAll('.hero h1, .hero h2, .hero p, .cta-buttons');
    heroElements.forEach(element => {
        element.style.opacity = '1';
    });
    
    // Setup for booking modal functionality
    setupBookingModal();
    
    // Setup testimonial slider
    setupTestimonialSlider();
    
    // Image lazy loading with fade-in effect
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';
        
        img.addEventListener('load', function() {
            img.style.opacity = '1';
        });
    });
    
    // Add active state to current page in navigation
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.main-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            link.classList.add('active');
        }
    });
    
    // Add FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                } else {
                    field.style.borderColor = '#e0e0e0';
                    field.style.boxShadow = 'none';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '提交中...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = '提交成功！';
                    submitBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.detail-card, .service-option-card, .process-step, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Service option card interactions
    const serviceOptionCards = document.querySelectorAll('.service-option-card');
    
    serviceOptionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Payment table row hover effects
    const paymentTableRows = document.querySelectorAll('.payment-table tbody tr');
    
    paymentTableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Download button interactions
    const downloadButtons = document.querySelectorAll('.download-buttons .btn');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show download message
            const originalText = this.textContent;
            this.textContent = '準備下載...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });

    // Hero button interactions
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize new systems
    initializeOrderAssignmentSystem();
    setupEmailNotifications();
    initializeContentManagementSystem();
    initializeRealTimeAppointmentSystem();
    setupAutomaticReminderSystem();
    
    // Enhance form submission to use new systems
    enhanceFormSubmission();

    // News Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            newsCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send this to your backend
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.className = 'success-message';
            successMessage.textContent = '感謝您的訂閱！';
            this.appendChild(successMessage);
            
            // Clear the input
            this.querySelector('input[type="email"]').value = '';
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Contact Page Functionality
    const organizationForm = document.querySelector('.organization-form');
    
    if (organizationForm) {
        organizationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                submitForm(this);
            }
        });
    }
    
    // Smooth Scrolling for Contact Page
    const contactLinks = document.querySelectorAll('a[href^="#"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form Input Focus Effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.parentElement.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Contact Info Item Hover Effects
    const contactInfoItems = document.querySelectorAll('.contact-info-item');
    contactInfoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Animation on Scroll for Contact Page
    const contactObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const contactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, contactObserverOptions);
    
    const contactAnimatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    contactAnimatedElements.forEach(el => {
        contactObserver.observe(el);
    });
});

// Form Validation Functions
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const formGroup = field.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    const successMessage = formGroup.querySelector('.success-message');
    
    // Remove existing messages
    if (errorMessage) errorMessage.remove();
    if (successMessage) successMessage.remove();
    
    // Remove existing classes
    formGroup.classList.remove('error', 'success');
    
    // Validation rules
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Required field validation
    if (required && !value) {
        showFieldError(formGroup, '此欄位為必填項目');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(formGroup, '請輸入有效的電子郵件地址');
            return false;
        }
    }
    
    // Phone validation
    if (field.name === 'phone' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 8) {
            showFieldError(formGroup, '請輸入有效的電話號碼');
            return false;
        }
    }
    
    // Textarea validation
    if (field.tagName === 'TEXTAREA' && value) {
        if (value.length < 10) {
            showFieldError(formGroup, '訊息內容至少需要10個字符');
            return false;
        }
    }
    
    // Show success state
    if (value) {
        showFieldSuccess(formGroup, '格式正確');
    }
    
    return true;
}

function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function showFieldSuccess(formGroup, message) {
    formGroup.classList.add('success');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    formGroup.appendChild(successDiv);
}

function submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Show success message
        showFormSuccess(form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            const successMessage = document.querySelector('.form-success-message');
            if (successMessage) {
                successMessage.remove();
            }
        }, 5000);
    }, 2000);
}

function showFormSuccess(form) {
    // Remove existing success message
    const existingMessage = document.querySelector('.form-success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid #c3e6cb;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    successDiv.innerHTML = `
        <span style="font-size: 1.2rem;">✓</span>
        <span>表單提交成功！我們會盡快回覆您。</span>
    `;
    
    // Insert at the beginning of the form
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Add the booking modal functionality
function setupBookingModal() {
    const bookBtns = document.querySelectorAll('.book-now-btn, .cta-button, [data-toggle="booking-modal"]');
    const bookingModal = document.querySelector('.booking-modal');
    const closeModal = document.querySelector('.booking-modal .close-btn');
    const modalSteps = document.querySelectorAll('.booking-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Open booking modal
    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (bookingModal) {
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                showStep(0); // Show first step
            }
        });
    });
    
    // Close booking modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = ''; // Enable scrolling
            resetForm();
        });
    }
    
    // Close on outside click
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = ''; // Enable scrolling
                resetForm();
            }
        });
    }
    
    // Next step buttons
    let currentStep = 0;
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Validate current step before proceeding
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });
    
    // Previous step buttons
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });
    
    // Show specific step
    function showStep(stepIndex) {
        modalSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Update progress
        progressSteps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Show/hide prev/next buttons
        prevBtns.forEach(btn => {
            btn.style.display = stepIndex === 0 ? 'none' : 'inline-block';
        });
    }
    
    // Validate step before proceeding
    function validateStep(step) {
        const currentStepEl = modalSteps[step];
        
        // Basic validation example - can be extended
        if (step === 0) {
            // Service selection validation
            const serviceSelected = currentStepEl.querySelector('input[name="service"]:checked');
            return !!serviceSelected;
        } else if (step === 1) {
            // Date and time validation
            const dateSelected = currentStepEl.querySelector('.selected-date');
            const timeSelected = currentStepEl.querySelector('.time-slot.selected');
            return dateSelected && timeSelected;
        } else if (step === 2) {
            // Contact info validation
            const nameInput = currentStepEl.querySelector('input[name="name"]');
            const emailInput = currentStepEl.querySelector('input[name="email"]');
            const phoneInput = currentStepEl.querySelector('input[name="phone"]');
            
            if (!nameInput.value || !emailInput.value || !phoneInput.value) {
                return false;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(emailInput.value);
        }
        
        return true;
    }
    
    // Reset form when closing
    function resetForm() {
        currentStep = 0;
        showStep(0);
        
        // Clear inputs
        const inputs = bookingModal.querySelectorAll('input:not([type="radio"]), textarea');
        inputs.forEach(input => {
            input.value = '';
        });
        
        // Uncheck radio buttons
        const radioButtons = bookingModal.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
    }
    
    // Calendar functionality
    setupCalendar();
}

// Calendar setup for booking
function setupCalendar() {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer) return;
    
    const monthYear = calendarContainer.querySelector('.month-year');
    const daysContainer = calendarContainer.querySelector('.days');
    const prevMonth = calendarContainer.querySelector('.prev-month');
    const nextMonth = calendarContainer.querySelector('.next-month');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Generate calendar
    function generateCalendar() {
        if (!monthYear || !daysContainer) return;
        
        // Set month and year in header
        const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Clear previous days
        daysContainer.innerHTML = '';
        
        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty cells for days before the first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            daysContainer.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            
            // Check if this day is in the past
            const thisDate = new Date(currentYear, currentMonth, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (thisDate < today) {
                day.classList.add('disabled');
            } else {
                day.classList.add('selectable');
                day.addEventListener('click', () => selectDate(day, i));
            }
            
            day.textContent = i;
            daysContainer.appendChild(day);
        }
    }
    
    // Select a date
    function selectDate(dayElement, day) {
        // Remove selection from all days
        document.querySelectorAll('.day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked day
        dayElement.classList.add('selected');
        
        // Update selected date text
        const selectedDateEl = document.querySelector('.selected-date');
        if (selectedDateEl) {
            const formattedDate = `${currentYear}/${currentMonth + 1}/${day}`;
            selectedDateEl.textContent = formattedDate;
            selectedDateEl.dataset.date = formattedDate;
        }
        
        // Generate time slots for the selected date
        generateTimeSlots();
    }
    
    // Generate available time slots
    function generateTimeSlots() {
        const timeSlotsContainer = document.querySelector('.time-slots');
        if (!timeSlotsContainer) return;
        
        timeSlotsContainer.innerHTML = '';
        
        // Example time slots - in a real app, these would come from availability data
        const timeSlots = [
            "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
            "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
            "16:00", "16:30", "17:00"
        ];
        
        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.classList.add('time-slot');
            slot.textContent = time;
            
            // Randomly make some slots unavailable (for demo purposes)
            if (Math.random() > 0.7) {
                slot.classList.add('unavailable');
            } else {
                slot.addEventListener('click', () => selectTimeSlot(slot, time));
            }
            
            timeSlotsContainer.appendChild(slot);
        });
    }
    
    // Select a time slot
    function selectTimeSlot(slotElement, time) {
        // Skip if unavailable
        if (slotElement.classList.contains('unavailable')) return;
        
        // Remove selection from all slots
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked slot
        slotElement.classList.add('selected');
        
        // Update selected time text
        const selectedTimeEl = document.querySelector('.selected-time');
        if (selectedTimeEl) {
            selectedTimeEl.textContent = time;
        }
    }
    
    // Navigation: Previous month
    if (prevMonth) {
        prevMonth.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar();
        });
    }
    
    // Navigation: Next month
    if (nextMonth) {
        nextMonth.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar();
        });
    }
    
    // Initialize calendar
    generateCalendar();
}

// Setup for testimonial slider
function setupTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (!testimonialSlider) return;

    const testimonialsContainer = testimonialSlider.querySelector('.testimonials-container');
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;

    let currentIndex = 0;
    const interval = 2500; // 2.5 seconds between slides
    const cardsPerView = 2.5; // Show 2.5 cards at a time

    // Function to show testimonials starting from a specific index
    function showTestimonials(startIndex) {
        testimonials.forEach((testimonial, i) => {
            if (i >= startIndex && i < startIndex + cardsPerView) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });

        // Calculate the transform to show the correct cards
        const cardWidth = testimonials[0].offsetWidth + 30; // Include margin
        const transformX = -startIndex * cardWidth;
        testimonialsContainer.style.transform = `translateX(${transformX}px)`;
    }

    // Function to go to next set of testimonials
    function nextTestimonials() {
        currentIndex = (currentIndex + 1) % Math.ceil(testimonials.length / cardsPerView);
        showTestimonials(currentIndex * cardsPerView);
        updateDots();
    }

    // Function to go to previous set of testimonials
    function prevTestimonials() {
        currentIndex = (currentIndex - 1 + Math.ceil(testimonials.length / cardsPerView)) % Math.ceil(testimonials.length / cardsPerView);
        showTestimonials(currentIndex * cardsPerView);
        updateDots();
    }

    // Initialize - show first set of testimonials
    showTestimonials(0);

    // Start autoplay
    const autoplayInterval = setInterval(nextTestimonials, interval);

    // Pause autoplay on hover
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // Resume autoplay when mouse leaves
    testimonialSlider.addEventListener('mouseleave', () => {
        setInterval(nextTestimonials, interval);
    });

    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    const totalSlides = Math.ceil(testimonials.length / cardsPerView);

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        
        dot.addEventListener('click', () => {
            currentIndex = i;
            showTestimonials(currentIndex * cardsPerView);
            updateDots();
        });
        
        dotsContainer.appendChild(dot);
    }

    testimonialSlider.appendChild(dotsContainer);

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        showTestimonials(currentIndex * cardsPerView);
    });
}

// Healthcare Staff Management and Order Assignment System
function initializeOrderAssignmentSystem() {
    console.log('Initializing Order Assignment System');
    
    // Simulated healthcare staff database
    const healthcareStaff = [
        { id: 1, name: "王護理師", specialties: ["基本居家護理", "進階居家護理"], availability: "full" },
        { id: 2, name: "陳醫師", specialties: ["進階居家護理", "專業醫療護理"], availability: "partial" },
        { id: 3, name: "林醫護人員", specialties: ["基本居家護理", "疫苗接種"], availability: "full" },
        { id: 4, name: "張護理師", specialties: ["進階居家護理", "慢性病管理"], availability: "full" },
        { id: 5, name: "黃物理治療師", specialties: ["復健治療", "術後照護"], availability: "partial" }
    ];
    
    // Function to automatically assign staff based on service type and availability
    function assignStaffMember(serviceType, appointmentDate, appointmentTime) {
        // Filter available staff with matching specialties
        const availableStaff = healthcareStaff.filter(staff => {
            return staff.specialties.includes(serviceType) && staff.availability !== "unavailable";
        });
        
        if (availableStaff.length === 0) {
            return null; // No available staff
        }
        
        // Simple assignment algorithm - in a real system this would be more sophisticated
        // considering workload, location, patient history, etc.
        return availableStaff[Math.floor(Math.random() * availableStaff.length)];
    }
    
    // Add this function to the global scope for use in form submission
    window.assignStaffMember = assignStaffMember;
    
    // Create staff management interface for admins (minimal implementation)
    function createStaffManagementInterface() {
        // This would typically be in an admin area
        if (document.querySelector('.admin-panel')) {
            const adminPanel = document.querySelector('.admin-panel');
            
            const staffSection = document.createElement('div');
            staffSection.className = 'staff-management-section';
            staffSection.innerHTML = `
                <h3>醫護人員管理</h3>
                <div class="staff-list">
                    ${healthcareStaff.map(staff => `
                        <div class="staff-card" data-staff-id="${staff.id}">
                            <h4>${staff.name}</h4>
                            <p>專長: ${staff.specialties.join(', ')}</p>
                            <p>可用性: ${staff.availability === 'full' ? '全時可用' : '部分時段可用'}</p>
                            <button class="assign-manually">手動指派</button>
                        </div>
                    `).join('')}
                </div>
                <button class="add-staff-btn">新增醫護人員</button>
            `;
            
            adminPanel.appendChild(staffSection);
        }
    }
    
    // Initialize if admin panel exists
    if (document.querySelector('.admin-panel')) {
        createStaffManagementInterface();
    }
}

// Enhanced Email Notification System
function setupEmailNotifications() {
    console.log('Setting up Email Notification System');
    
    // Function to send booking confirmation email
    function sendBookingConfirmationEmail(bookingData) {
        // In a real implementation this would make an API call to a backend service
        console.log('Sending booking confirmation email to:', bookingData.email);
        
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful email sending
                if (bookingData.email && bookingData.email.includes('@')) {
                    resolve({
                        success: true,
                        messageId: 'booking-' + Date.now(),
                        message: '預約確認郵件已發送'
                    });
                } else {
                    reject({
                        success: false,
                        error: '電子郵件地址無效'
                    });
                }
            }, 1500);
        });
    }
    
    // Function to send appointment reminder
    function sendAppointmentReminder(bookingData, timeBeforeAppointment) {
        console.log(`Scheduling reminder email for ${timeBeforeAppointment} before appointment`);
        
        // In a real implementation this would schedule a task on the server
        // For demonstration, we'll simulate a scheduled task
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Reminder email would be sent to ${bookingData.email} for appointment on ${bookingData.date} at ${bookingData.time}`);
                resolve({
                    success: true,
                    message: '預約提醒已排程'
                });
            }, 2000);
        });
    }
    
    // Make functions available globally for form submission
    window.emailNotifications = {
        sendBookingConfirmationEmail,
        sendAppointmentReminder
    };
}

// Content Management System (minimal client-side implementation)
function initializeContentManagementSystem() {
    console.log('Initializing Content Management System');
    
    // Booking data store (in a real implementation this would be a database)
    const bookings = [];
    
    // Function to add a booking
    function addBooking(bookingData) {
        // Add unique ID and status
        bookingData.id = 'BK' + Date.now();
        bookingData.status = 'pending';
        bookingData.createdAt = new Date().toISOString();
        
        // Add staff assignment if available
        if (window.assignStaffMember) {
            const assignedStaff = window.assignStaffMember(
                bookingData.service, 
                bookingData.date, 
                bookingData.time
            );
            
            if (assignedStaff) {
                bookingData.assignedStaff = assignedStaff;
            }
        }
        
        // Store booking
        bookings.push(bookingData);
        localStorage.setItem('hygienefirst_bookings', JSON.stringify(bookings));
        
        console.log('Booking added:', bookingData);
        return bookingData;
    }
    
    // Function to get all bookings (for admin panel)
    function getAllBookings() {
        return bookings;
    }
    
    // Function to get booking by ID
    function getBookingById(id) {
        return bookings.find(booking => booking.id === id);
    }
    
    // Function to update booking status
    function updateBookingStatus(id, status) {
        const booking = bookings.find(booking => booking.id === id);
        if (booking) {
            booking.status = status;
            booking.updatedAt = new Date().toISOString();
            localStorage.setItem('hygienefirst_bookings', JSON.stringify(bookings));
            return true;
        }
        return false;
    }
    
    // Load existing bookings from localStorage if available
    try {
        const savedBookings = localStorage.getItem('hygienefirst_bookings');
        if (savedBookings) {
            bookings.push(...JSON.parse(savedBookings));
        }
    } catch (e) {
        console.error('Error loading saved bookings:', e);
    }
    
    // Create admin bookings interface if admin panel exists
    if (document.querySelector('.admin-panel')) {
        createBookingsManagementInterface();
    }
    
    function createBookingsManagementInterface() {
        const adminPanel = document.querySelector('.admin-panel');
        
        const bookingsSection = document.createElement('div');
        bookingsSection.className = 'bookings-management-section';
        bookingsSection.innerHTML = `
            <h3>預約管理</h3>
            <div class="booking-filters">
                <select class="status-filter">
                    <option value="all">所有狀態</option>
                    <option value="pending">待處理</option>
                    <option value="confirmed">已確認</option>
                    <option value="completed">已完成</option>
                    <option value="cancelled">已取消</option>
                </select>
                <input type="date" class="date-filter" placeholder="按日期篩選">
                <button class="refresh-bookings">刷新</button>
            </div>
            <div class="bookings-list">
                ${bookings.length > 0 ? 
                    bookings.map(booking => `
                        <div class="booking-card" data-booking-id="${booking.id}">
                            <div class="booking-header">
                                <h4>預約 #${booking.id}</h4>
                                <span class="booking-status ${booking.status}">${booking.status}</span>
                            </div>
                            <div class="booking-details">
                                <p><strong>服務:</strong> ${booking.service}</p>
                                <p><strong>日期:</strong> ${booking.date} ${booking.time}</p>
                                <p><strong>客戶:</strong> ${booking.name} (${booking.phone})</p>
                                <p><strong>指派人員:</strong> ${booking.assignedStaff ? booking.assignedStaff.name : '未指派'}</p>
                            </div>
                            <div class="booking-actions">
                                <button class="view-details-btn">查看詳情</button>
                                <button class="change-status-btn">變更狀態</button>
                            </div>
                        </div>
                    `).join('') : 
                    '<p>目前沒有預約記錄</p>'
                }
            </div>
        `;
        
        adminPanel.appendChild(bookingsSection);
        
        // Add event listeners for admin actions
        const refreshBtn = bookingsSection.querySelector('.refresh-bookings');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                // Refresh bookings list
                console.log('Refreshing bookings list');
                // Implementation would update the displayed bookings
            });
        }
    }
    
    // Make booking management functions available globally
    window.bookingSystem = {
        addBooking,
        getAllBookings,
        getBookingById,
        updateBookingStatus
    };
}

// Real-time appointment system
function initializeRealTimeAppointmentSystem() {
    console.log('Initializing Real-time Appointment System');
    
    // Function to check real-time availability
    function checkTimeSlotAvailability(date, timeSlot) {
        // In a real implementation, this would check a database
        // For demo purposes, we'll simulate some time slots being unavailable
        
        // Parse date string to Date object
        const appointmentDate = new Date(date);
        const currentDate = new Date();
        
        // No appointments in the past
        if (appointmentDate < currentDate) {
            return false;
        }
        
        // Simulate some time slots being unavailable based on weekday
        const weekday = appointmentDate.getDay();
        
        // Weekends (Saturday and Sunday) have limited availability
        if (weekday === 0) { // Sunday
            // Only morning slots available on Sunday
            return timeSlot.includes('上午');
        } else if (weekday === 6) { // Saturday
            // 9am and 5pm not available on Saturday
            return !timeSlot.includes('9:00') && !timeSlot.includes('17:00');
        }
        
        // Simulate some random slots being unavailable (20% chance)
        return Math.random() > 0.2;
    }
    
    // Function to get available staff in real-time
    function getAvailableStaffForTimeSlot(date, timeSlot, serviceType) {
        // In a real implementation, this would query a database
        // For demo purposes, we'll return simulated data
        
        // Simulate 2-3 available staff members
        const availableCount = Math.floor(Math.random() * 2) + 2;
        const availableStaff = [];
        
        for (let i = 0; i < availableCount; i++) {
            availableStaff.push({
                id: 'ST' + (i + 1),
                name: ['王醫師', '陳護理師', '林醫護人員', '張醫師', '黃護理師'][i],
                rating: (4 + Math.random()).toFixed(1), // Random rating between 4.0-5.0
                specialties: [serviceType]
            });
        }
        
        return availableStaff;
    }
    
    // Enable real-time calendar updates
    function enableRealTimeCalendarUpdates() {
        // This would connect to a real-time database or API
        // For demo purposes, we'll simulate updates
        
        console.log('Enabling real-time calendar updates');
        
        // In a real implementation, this might use WebSockets or Server-Sent Events
        // to receive live updates on availability changes
        
        // For demo, we'll just update the calendar periodically
        setInterval(() => {
            // Check if calendar is visible
            const calendarElement = document.querySelector('.calendar-days');
            if (calendarElement && calendarElement.children.length > 0) {
                console.log('Updating calendar availability in real-time');
                
                // Simulate a random day becoming unavailable or available again
                const allDays = calendarElement.querySelectorAll('.day:not(.empty)');
                if (allDays.length > 0) {
                    const randomDay = allDays[Math.floor(Math.random() * allDays.length)];
                    
                    // Toggle availability (in a real system this would be based on actual booking data)
                    if (Math.random() > 0.7) { // 30% chance of toggling
                        if (randomDay.classList.contains('unavailable')) {
                            randomDay.classList.remove('unavailable');
                            console.log(`Day ${randomDay.textContent} is now available again`);
                        } else {
                            randomDay.classList.add('unavailable');
                            console.log(`Day ${randomDay.textContent} is now unavailable`);
                        }
                    }
                }
            }
        }, 30000); // Check every 30 seconds
    }
    
    // Make real-time functions available globally
    window.realTimeAppointments = {
        checkTimeSlotAvailability,
        getAvailableStaffForTimeSlot
    };
    
    // Enable real-time updates if calendar exists
    if (document.querySelector('.calendar-days')) {
        enableRealTimeCalendarUpdates();
    }
}

// Automatic Appointment Reminder System
function setupAutomaticReminderSystem() {
    console.log('Setting up Automatic Reminder System');
    
    // Function to schedule reminders for an appointment
    function scheduleAppointmentReminders(bookingData) {
        console.log('Scheduling reminders for appointment:', bookingData);
        
        // In a real implementation, this would create server-side scheduled tasks
        // For demo purposes, we'll simulate the scheduling
        
        const reminderTimes = [
            { label: '1 day before', hours: 24 },
            { label: '3 hours before', hours: 3 }
        ];
        
        // Schedule each reminder
        reminderTimes.forEach(reminder => {
            // In a real implementation, this would make an API call
            console.log(`Scheduling ${reminder.label} reminder for ${bookingData.name}`);
            
            // Simulate successful scheduling
            setTimeout(() => {
                console.log(`Reminder scheduled: ${reminder.label} for appointment on ${bookingData.date}`);
            }, 1000);
        });
        
        return {
            success: true,
            message: `Reminders scheduled for ${reminderTimes.length} time points`,
            reminderTimes: reminderTimes.map(r => r.label)
        };
    }
    
    // Make reminder functions available globally
    window.reminderSystem = {
        scheduleAppointmentReminders
    };
}

// Update form submission to use the new systems
function enhanceFormSubmission() {
    const confirmBookingBtn = document.getElementById('confirm-booking') || document.getElementById('submit-booking');
    
    if (confirmBookingBtn) {
        const originalClickHandler = confirmBookingBtn.onclick;
        
        confirmBookingBtn.onclick = async function(e) {
            // If there was an original handler, call it first
            if (typeof originalClickHandler === 'function') {
                originalClickHandler.call(this, e);
            }
            
            // Get form data from the booking form
            const formData = {
                service: document.querySelector('input[name="service"]:checked') ? 
                    document.querySelector('input[name="service"]:checked').getAttribute('data-name') || 
                    document.querySelector('input[name="service"]:checked').value : '',
                date: document.querySelector('.selected-date') ? 
                    document.querySelector('.selected-date').getAttribute('data-date') || 
                    document.querySelector('.selected-date').textContent : '',
                time: document.querySelector('input[name="time-slot"]:checked') ? 
                    document.querySelector('input[name="time-slot"]:checked').value : '',
                name: document.getElementById('customer-name') ? 
                    document.getElementById('customer-name').value : 
                    document.getElementById('name') ? document.getElementById('name').value : '',
                email: document.getElementById('customer-email') ? 
                    document.getElementById('customer-email').value : 
                    document.getElementById('email') ? document.getElementById('email').value : '',
                phone: document.getElementById('customer-phone') ? 
                    document.getElementById('customer-phone').value : 
                    document.getElementById('phone') ? document.getElementById('phone').value : '',
                address: document.getElementById('customer-address') ? 
                    document.getElementById('customer-address').value : 
                    document.getElementById('address') ? document.getElementById('address').value : '',
                notes: document.getElementById('customer-notes') ? 
                    document.getElementById('customer-notes').value : 
                    document.getElementById('notes') ? document.getElementById('notes').value : '',
                payment: document.querySelector('input[name="payment"]:checked') ? 
                    document.querySelector('input[name="payment"]:checked').value : 'Unknown'
            };
            
            console.log('Booking data collected:', formData);
            
            // Proceed only if we have at least the basic information
            if (formData.service && formData.date && formData.time && formData.name && formData.email) {
                try {
                    // 1. Add booking to the system
                    let booking = {};
                    if (window.bookingSystem && window.bookingSystem.addBooking) {
                        booking = window.bookingSystem.addBooking(formData);
                        console.log('Booking added to system:', booking);
                    }
                    
                    // 2. Assign staff member if available
                    if (window.assignStaffMember) {
                        const assignedStaff = window.assignStaffMember(
                            formData.service, formData.date, formData.time
                        );
                        
                        if (assignedStaff) {
                            console.log('Staff assigned:', assignedStaff);
                            formData.assignedStaff = assignedStaff;
                            
                            // Update the booking in our system
                            if (booking.id && window.bookingSystem && window.bookingSystem.updateBookingStatus) {
                                window.bookingSystem.updateBookingStatus(booking.id, 'confirmed');
                            }
                        }
                    }
                    
                    // 3. Send confirmation email
                    if (window.emailNotifications && window.emailNotifications.sendBookingConfirmationEmail) {
                        try {
                            const emailResult = await window.emailNotifications.sendBookingConfirmationEmail(formData);
                            console.log('Email sent result:', emailResult);
                            
                            // Show success message in UI
                            const confirmationMessage = document.querySelector('.confirmation-step p') || 
                                document.querySelector('#step-confirmation p');
                            
                            if (confirmationMessage) {
                                confirmationMessage.innerHTML += '<br><strong>確認郵件已發送至您的郵箱。</strong>';
                            }
                        } catch (error) {
                            console.error('Failed to send email:', error);
                        }
                    }
                    
                    // 4. Schedule automatic reminders
                    if (window.reminderSystem && window.reminderSystem.scheduleAppointmentReminders) {
                        const reminderResult = window.reminderSystem.scheduleAppointmentReminders(formData);
                        console.log('Reminders scheduled:', reminderResult);
                        
                        // Add reminder info to confirmation
                        const confirmationDetails = document.querySelector('.confirmation-details');
                        if (confirmationDetails) {
                            const reminderInfo = document.createElement('div');
                            reminderInfo.className = 'reminder-info';
                            reminderInfo.innerHTML = `
                                <h4>預約提醒</h4>
                                <p>我們將在預約前發送提醒郵件通知。</p>
                            `;
                            
                            confirmationDetails.appendChild(reminderInfo);
                        }
                    }
                    
                    console.log('Booking process completed successfully');
                    
                } catch (error) {
                    console.error('Error during booking process:', error);
                }
            }
        };
    }
} 