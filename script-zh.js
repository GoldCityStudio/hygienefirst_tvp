// 移動選單切換
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // 關閉導航欄，如果點擊了導航鏈接
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // 滾動時頭部的效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 評價輪播
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonialsContainer = testimonialSlider.querySelector('.testimonials-container');
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        
        if (testimonials.length > 1) {
            let currentIndex = 0;
            const interval = 2500; // 2.5秒間隔
            const cardsPerView = 2.5; // 顯示2.5張卡片

            // 顯示指定索引開始的評價
            function showTestimonials(startIndex) {
                testimonials.forEach((testimonial, i) => {
                    if (i >= startIndex && i < startIndex + cardsPerView) {
                        testimonial.classList.add('active');
                    } else {
                        testimonial.classList.remove('active');
                    }
                });

                // 計算變換以顯示正確的卡片
                const cardWidth = testimonials[0].offsetWidth + 30; // 包含邊距
                const transformX = -startIndex * cardWidth;
                testimonialsContainer.style.transform = `translateX(${transformX}px)`;
            }

            // 下一組評價
            function nextTestimonials() {
                currentIndex = (currentIndex + 1) % Math.ceil(testimonials.length / cardsPerView);
                showTestimonials(currentIndex * cardsPerView);
                updateDots();
            }

            // 初始化 - 顯示第一組評價
            showTestimonials(0);
        
            // 開始自動播放
            const autoplayInterval = setInterval(nextTestimonials, interval);

            // 滑鼠懸停時暫停
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });

            // 滑鼠離開時恢復
            testimonialSlider.addEventListener('mouseleave', () => {
                setInterval(nextTestimonials, interval);
            });

            // 添加導航點
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
        
            // 處理視窗大小調整
            window.addEventListener('resize', () => {
                showTestimonials(currentIndex * cardsPerView);
            });
        }
    }
    
    // 表單驗證
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const phoneInput = this.querySelector('input[name="phone"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            // 重置錯誤顯示
            this.querySelectorAll('.error-message').forEach(error => {
                error.remove();
            });
            
            // 驗證名稱
            if (!nameInput.value.trim()) {
                showError(nameInput, '請輸入您的姓名');
                valid = false;
            }
            
            // 驗證郵箱
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '請輸入有效的電子郵件地址');
                valid = false;
            }
            
            // 驗證電話
            if (phoneInput && !isValidPhone(phoneInput.value)) {
                showError(phoneInput, '請輸入有效的電話號碼');
                valid = false;
            }
            
            // 驗證留言
            if (!messageInput.value.trim()) {
                showError(messageInput, '請輸入您的留言');
                valid = false;
            }
            
            if (valid) {
                // 這裡可以添加表單提交代碼
                showSuccess();
            }
        });
        
        function showError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            input.parentNode.appendChild(errorMessage);
            input.classList.add('error');
        }
        
        function showSuccess() {
            const form = document.querySelector('.contact-form');
            if (form) {
                form.innerHTML = '<div class="success-message">感謝您的留言！我們將盡快與您聯絡。</div>';
            }
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        function isValidPhone(phone) {
            return /^[0-9+\-\s]{8,15}$/.test(phone);
        }
    }
});

// 預約表單功能
document.addEventListener('DOMContentLoaded', function() {
    const bookButtons = document.querySelectorAll('.book-service-btn');
    const bookingModal = document.querySelector('.booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const bookingSteps = document.querySelectorAll('.booking-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    
    let currentStep = 0;
    
    // 顯示模態框，當預約按鈕被點擊
    if (bookButtons) {
        bookButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (bookingModal) {
                    bookingModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // 防止背景滾動
                    showStep(currentStep);
                }
            });
        });
    }
    
    // 關閉模態框
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
                resetBookingForm();
            }
        });
    }
    
    // 點擊模態框外部關閉
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
                resetBookingForm();
            }
        });
    }
    
    // 下一步按鈕功能
    if (nextBtns) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });
    }
    
    // 上一步按鈕功能
    if (prevBtns) {
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentStep--;
                showStep(currentStep);
            });
        });
    }
    
    // 顯示指定步驟
    function showStep(stepIndex) {
        bookingSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === stepIndex) {
                step.classList.add('active');
            }
        });
        
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === stepIndex) {
                step.classList.add('active');
            } else if (index < stepIndex) {
                step.classList.add('completed');
            }
        });
        
        // 處理上一步/下一步按鈕的可見性
        prevBtns.forEach(btn => {
            btn.style.display = stepIndex === 0 ? 'none' : 'block';
        });
        
        // 在最後一步更改下一步按鈕的文字
        nextBtns.forEach(btn => {
            if (stepIndex === bookingSteps.length - 2) {
                btn.textContent = '完成預約';
            } else {
                btn.textContent = '下一步';
            }
            
            // 在確認步驟隱藏下一步按鈕
            if (stepIndex === bookingSteps.length - 1) {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'block';
            }
        });
    }
    
    // 在繼續之前驗證當前步驟
    function validateStep(stepIndex) {
        switch(stepIndex) {
            case 0: // 服務選擇驗證
                const selectedService = document.querySelector('.service-option.selected');
                if (!selectedService) {
                    alert('請選擇服務類型');
                    return false;
                }
                return true;
                
            case 1: // 日期和時間驗證
                const selectedDate = document.querySelector('.calendar-day.selected');
                const selectedTime = document.querySelector('.time-slot.selected');
                if (!selectedDate) {
                    alert('請選擇日期');
                    return false;
                }
                if (!selectedTime) {
                    alert('請選擇時間');
                    return false;
                }
                return true;
                
            case 2: // 表單驗證
                const name = document.getElementById('booking-name');
                const email = document.getElementById('booking-email');
                const phone = document.getElementById('booking-phone');
                const address = document.getElementById('booking-address');
                
                if (!name || !name.value.trim()) {
                    alert('請輸入您的姓名');
                    return false;
                }
                
                if (!email || !isValidEmail(email.value)) {
                    alert('請輸入有效的電子郵件地址');
                    return false;
                }
                
                if (!phone || !isValidPhone(phone.value)) {
                    alert('請輸入有效的電話號碼');
                    return false;
                }
                
                if (!address || !address.value.trim()) {
                    alert('請輸入您的地址');
                    return false;
                }
                
                return true;
                
            case 3: // 付款驗證
                const selectedPayment = document.querySelector('.payment-method.selected');
                if (!selectedPayment) {
                    alert('請選擇付款方式');
                    return false;
                }
                
                // 如果這是最後一個輸入步驟，準備確認頁面
                updateBookingSummary();
                return true;
                
            default:
                return true;
        }
    }
    
    // 更新預約摘要以供確認
    function updateBookingSummary() {
        const selectedService = document.querySelector('.service-option.selected');
        const selectedDate = document.querySelector('.calendar-day.selected');
        const selectedTime = document.querySelector('.time-slot.selected');
        const name = document.getElementById('booking-name');
        const email = document.getElementById('booking-email');
        const phone = document.getElementById('booking-phone');
        const address = document.getElementById('booking-address');
        const selectedPayment = document.querySelector('.payment-method.selected');
        
        // 如果它們存在，更新摘要字段
        if (document.getElementById('summary-service')) {
            document.getElementById('summary-service').textContent = 
                selectedService ? selectedService.querySelector('.service-name').textContent : '';
        }
        
        if (document.getElementById('summary-date')) {
            document.getElementById('summary-date').textContent = 
                selectedDate ? selectedDate.getAttribute('data-date') : '';
        }
        
        if (document.getElementById('summary-time')) {
            document.getElementById('summary-time').textContent = 
                selectedTime ? selectedTime.textContent : '';
        }
        
        if (document.getElementById('summary-name')) {
            document.getElementById('summary-name').textContent = 
                name ? name.value : '';
        }
        
        if (document.getElementById('summary-contact')) {
            document.getElementById('summary-contact').textContent = 
                phone ? phone.value : '';
        }
        
        if (document.getElementById('summary-payment')) {
            document.getElementById('summary-payment').textContent = 
                selectedPayment ? selectedPayment.querySelector('.payment-name').textContent : '';
        }
    }
    
    // 關閉時重置表單
    function resetBookingForm() {
        currentStep = 0;
        
        // 重置服務選擇
        document.querySelectorAll('.service-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // 重置日期和時間
        document.querySelectorAll('.calendar-day.selected, .time-slot.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        // 重置表單字段
        const formFields = document.querySelectorAll('.booking-form-group input, .booking-form-group textarea');
        formFields.forEach(field => {
            field.value = '';
        });
        
        // 重置付款方式
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
    }
    
    // 服務選項選擇
    const serviceOptions = document.querySelectorAll('.service-option');
    if (serviceOptions) {
        serviceOptions.forEach(option => {
            option.addEventListener('click', function() {
                serviceOptions.forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                this.querySelector('input[type="radio"]').checked = true;
            });
        });
    }
    
    // 日曆功能
    initCalendar();
    
    function initCalendar() {
        const calendarDays = document.querySelectorAll('.calendar-day:not(.disabled)');
        if (calendarDays) {
            calendarDays.forEach(day => {
                day.addEventListener('click', function() {
                    calendarDays.forEach(d => {
                        d.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });
        }
        
        // 日曆導航（簡化用於演示）
        const prevMonthBtn = document.querySelector('.prev-month');
        const nextMonthBtn = document.querySelector('.next-month');
        
        if (prevMonthBtn && nextMonthBtn) {
            prevMonthBtn.addEventListener('click', function() {
                alert('上個月功能將在實際實施中啟用');
            });
            
            nextMonthBtn.addEventListener('click', function() {
                alert('下個月功能將在實際實施中啟用');
            });
        }
    }
    
    // 時間段選擇
    const timeSlots = document.querySelectorAll('.time-slot:not(.disabled)');
    if (timeSlots) {
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                timeSlots.forEach(s => {
                    s.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
    }
    
    // 付款方式選擇
    const paymentMethods = document.querySelectorAll('.payment-method');
    if (paymentMethods) {
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => {
                    m.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
    }
    
    // 輔助函數用於驗證
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[0-9+\-\s]{8,15}$/.test(phone);
    }
}); 