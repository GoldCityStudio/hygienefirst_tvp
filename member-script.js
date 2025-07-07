document.addEventListener('DOMContentLoaded', function() {
    // Form switching
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboard = document.getElementById('memberDashboard');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToRegister && switchToLogin) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        });

        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }

    // Form submission handling
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');

    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Here you would typically make an API call to your backend
            // For now, we'll just simulate a successful login
            handleLogin(email, password);
        });
    }

    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const password = document.getElementById('registerPassword').value;
            
            // Here you would typically make an API call to your backend
            // For now, we'll just simulate a successful registration
            handleRegistration(name, email, phone, password);
        });
    }

    // Dashboard navigation
    const dashboardMenu = document.querySelector('.dashboard-menu');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    if (dashboardMenu) {
        dashboardMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                
                // Update active menu item
                dashboardMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                e.target.parentElement.classList.add('active');
                
                // Show target section
                dashboardSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                    }
                });
            }
        });
    }

    // Logout handling
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Shopping Cart Logic
    const cartKey = 'hygiene_cart';
    const cartCountEl = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartClearBtn = document.getElementById('cart-clear-btn');
    let appliedCoupon = null; // Initialize appliedCoupon variable
    
    console.log('Cart elements found:', {
        cartCountEl: !!cartCountEl,
        cartModal: !!cartModal,
        cartItemsEl: !!cartItemsEl,
        cartTotalEl: !!cartTotalEl,
        cartClearBtn: !!cartClearBtn
    });

    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey) || '[]');
    }
    function setCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartCount();
    }
    function updateCartCount() {
        const cart = getCart();
        let count = 0;
        cart.forEach(item => count += item.qty);
        if (cartCountEl) cartCountEl.textContent = count > 0 ? count : '';
    }
    function renderCart() {
        const cart = getCart();
        console.log('Rendering cart:', cart);
        if (!cartItemsEl) {
            console.error('cartItemsEl not found');
            return;
        }
        cartItemsEl.innerHTML = '';
        let total = 0;
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <input type="number" min="1" value="${item.qty}" data-idx="${idx}" class="cart-qty-input" style="width:40px;">
                <button class="cart-remove-btn" data-idx="${idx}">移除</button>
            `;
            cartItemsEl.appendChild(row);
        });
        
        // Apply discount if coupon is applied
        if (appliedCoupon) {
            let discount = 0;
            if (appliedCoupon.discountType === 'percentage') {
                discount = total * (appliedCoupon.discountValue / 100);
            } else {
                discount = appliedCoupon.discountValue;
            }
            discount = Math.min(discount, total);
            total -= discount;
        }
        
        if (cartTotalEl) {
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
        } else {
            console.error('cartTotalEl not found');
        }
    }
    function addToCart(name, price) {
        console.log('Adding to cart:', name, price);
        let cart = getCart();
        const idx = cart.findIndex(item => item.name === name);
        if (idx > -1) {
            cart[idx].qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        setCart(cart);
        renderCart();
        console.log('Cart updated:', cart);
    }
    function removeFromCart(idx) {
        let cart = getCart();
        cart.splice(idx, 1);
        setCart(cart);
        renderCart();
    }
    function updateQty(idx, qty) {
        let cart = getCart();
        cart[idx].qty = qty;
        setCart(cart);
        renderCart();
    }
    function clearCart() {
        setCart([]);
        renderCart();
    }
    // Event listeners
    if (cartClearBtn) cartClearBtn.onclick = clearCart;
    if (cartItemsEl) {
        cartItemsEl.onclick = function(e) {
            if (e.target.classList.contains('cart-remove-btn')) {
                removeFromCart(Number(e.target.dataset.idx));
            }
        };
        cartItemsEl.onchange = function(e) {
            if (e.target.classList.contains('cart-qty-input')) {
                const idx = Number(e.target.dataset.idx);
                const qty = Math.max(1, Number(e.target.value));
                updateQty(idx, qty);
            }
        };
    }
    // Add to cart buttons
    updateCartCount();
    renderCart();
    console.log('Found add-to-cart buttons:', document.querySelectorAll('.add-to-cart-btn').length);
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Add to cart clicked:', btn.dataset.name, btn.dataset.price);
            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);
            addToCart(name, price);
            if (cartModal) {
                cartModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cart modal open/close logic
    const cartIconBtn = document.querySelector('.cart-icon');
    const cartModalEl = document.getElementById('cart-modal');
    const closeCartModalBtn = document.querySelector('.close-cart-modal');
    if (cartIconBtn && cartModalEl && closeCartModalBtn) {
        cartIconBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartModalEl.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        closeCartModalBtn.addEventListener('click', function() {
            cartModalEl.style.display = 'none';
            document.body.style.overflow = '';
        });
        closeCartModalBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                cartModalEl.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        cartModalEl.addEventListener('click', function(e) {
            if (e.target === cartModalEl) {
                cartModalEl.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // --- Payment Processing Logic ---
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    const paymentForm = document.getElementById('payment-form');
    const backToCartBtn = document.getElementById('back-to-cart');
    const checkoutForm = document.getElementById('checkout-form');
    const processPaymentBtn = document.getElementById('process-payment');
    const paymentBtnText = document.getElementById('payment-btn-text');
    const paymentLoading = document.getElementById('payment-loading');

    // Card formatting functions
    function formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value;
    }

    function formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    function formatCVC(input) {
        input.value = input.value.replace(/\D/g, '').substring(0, 3);
    }

    // Form validation
    function validatePaymentForm() {
        const cardNumber = document.getElementById('card-number');
        const expiry = document.getElementById('card-expiry');
        const cvc = document.getElementById('card-cvc');
        const name = document.getElementById('billing-name');
        const email = document.getElementById('billing-email');
        const phone = document.getElementById('billing-phone');
        const address = document.getElementById('billing-address');
        
        let isValid = true;
        
        // Clear previous errors
        [cardNumber, expiry, cvc, name, email, phone, address].forEach(field => {
            field.classList.remove('error', 'success');
        });
        
        // Validate card number (basic Luhn check)
        const cardNum = cardNumber.value.replace(/\s/g, '');
        if (cardNum.length < 13 || cardNum.length > 19) {
            cardNumber.classList.add('error');
            isValid = false;
        } else {
            cardNumber.classList.add('success');
        }
        
        // Validate expiry
        const expiryValue = expiry.value;
        if (!/^\d{2}\/\d{2}$/.test(expiryValue)) {
            expiry.classList.add('error');
            isValid = false;
        } else {
            const [month, year] = expiryValue.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            
            if (parseInt(month) < 1 || parseInt(month) > 12 || 
                parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                expiry.classList.add('error');
                isValid = false;
            } else {
                expiry.classList.add('success');
            }
        }
        
        // Validate CVC
        if (cvc.value.length !== 3) {
            cvc.classList.add('error');
            isValid = false;
        } else {
            cvc.classList.add('success');
        }
        
        // Validate other fields
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        } else {
            name.classList.add('success');
        }
        
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        } else {
            email.classList.add('success');
        }
        
        if (!phone.value.trim()) {
            phone.classList.add('error');
            isValid = false;
        } else {
            phone.classList.add('success');
        }
        
        if (!address.value.trim()) {
            address.classList.add('error');
            isValid = false;
        } else {
            address.classList.add('success');
        }
        
        return isValid;
    }

    // Checkout flow
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = getCart();
            if (cart.length === 0) {
                alert('購物車是空的，請先添加商品。');
                return;
            }
            
            // Show payment form
            document.querySelector('.cart-modal-footer').style.display = 'none';
            paymentForm.style.display = 'block';
        });
    }

    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function() {
            paymentForm.style.display = 'none';
            document.querySelector('.cart-modal-footer').style.display = 'flex';
        });
    }

    // Payment form event listeners
    if (checkoutForm) {
        // Card formatting
        const cardNumberInput = document.getElementById('card-number');
        const expiryInput = document.getElementById('card-expiry');
        const cvcInput = document.getElementById('card-cvc');
        
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function() {
                formatCardNumber(this);
            });
        }
        
        if (expiryInput) {
            expiryInput.addEventListener('input', function() {
                formatExpiryDate(this);
            });
        }
        
        if (cvcInput) {
            cvcInput.addEventListener('input', function() {
                formatCVC(this);
            });
        }
        
        // Form submission
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validatePaymentForm()) {
                alert('請檢查並修正表單錯誤。');
                return;
            }
            
            // Show loading state
            processPaymentBtn.disabled = true;
            paymentBtnText.style.display = 'none';
            paymentLoading.style.display = 'inline';
            
            try {
                const cart = getCart();
                let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                
                // Apply coupon discount
                if (appliedCoupon) {
                    let discount = 0;
                    if (appliedCoupon.discountType === 'percentage') {
                        discount = total * (appliedCoupon.discountValue / 100);
                    } else {
                        discount = appliedCoupon.discountValue;
                    }
                    discount = Math.min(discount, total);
                    total -= discount;
                }
                
                const formData = {
                    items: cart,
                    total: total,
                    couponCode: appliedCoupon ? appliedCoupon.code : null,
                    payment: {
                        cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
                        expiry: document.getElementById('card-expiry').value,
                        cvc: document.getElementById('card-cvc').value,
                        name: document.getElementById('billing-name').value,
                        email: document.getElementById('billing-email').value,
                        phone: document.getElementById('billing-phone').value,
                        address: document.getElementById('billing-address').value
                    }
                };
                
                // Send to backend
                const response = await fetch('/api/payment/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    cartItemsEl.innerHTML = `
                        <div class="payment-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>付款成功！</h3>
                            <p>訂單編號: ${result.orderId}</p>
                            <p>我們會發送確認郵件到您的信箱。</p>
                        </div>
                    `;
                    
                    // Clear cart and coupon
                    setCart([]);
                    appliedCoupon = null;
                    
                    // Hide payment form
                    setTimeout(() => {
                        cartModalEl.style.display = 'none';
                        document.body.style.overflow = '';
                        paymentForm.style.display = 'none';
                        document.querySelector('.cart-modal-footer').style.display = 'flex';
                        renderCart();
                    }, 3000);
                    
                } else {
                    throw new Error(result.message || '付款處理失敗');
                }
                
            } catch (error) {
                console.error('Payment error:', error);
                cartItemsEl.innerHTML = `
                    <div class="payment-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>付款失敗</h3>
                        <p>${error.message || '請檢查您的付款資訊並重試。'}</p>
                    </div>
                `;
                
                setTimeout(() => {
                    renderCart();
                }, 3000);
                
            } finally {
                // Reset loading state
                processPaymentBtn.disabled = false;
                paymentBtnText.style.display = 'inline';
                paymentLoading.style.display = 'none';
            }
        });
    }

    // --- Coupon Logic ---
    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponCodeInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');

    if (applyCouponBtn && couponCodeInput) {
        applyCouponBtn.addEventListener('click', async function() {
            const code = couponCodeInput.value.trim();
            if (!code) {
                showCouponMessage('請輸入優惠券代碼', 'error');
                return;
            }
            
            try {
                const response = await fetch('/api/coupons/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    appliedCoupon = result.coupon;
                    showAppliedCoupon(result.coupon);
                    updateCartTotalWithDiscount();
                    showCouponMessage(`優惠券已套用！折扣: ${result.coupon.discountType === 'percentage' ? result.coupon.discountValue + '%' : '$' + result.coupon.discountValue}`, 'success');
                } else {
                    showCouponMessage(result.message || '優惠券無效', 'error');
                }
            } catch (error) {
                console.error('Coupon validation error:', error);
                showCouponMessage('優惠券驗證失敗，請重試', 'error');
            }
        });
    }

    function showCouponMessage(message, type) {
        couponMessage.textContent = message;
        couponMessage.className = `coupon-message ${type}`;
    }

    function showAppliedCoupon(coupon) {
        const couponContainer = document.querySelector('.coupon-input-group').parentElement;
        
        // Remove existing applied coupon display
        const existingApplied = couponContainer.querySelector('.applied-coupon');
        if (existingApplied) {
            existingApplied.remove();
        }
        
        // Create new applied coupon display
        const appliedCouponDiv = document.createElement('div');
        appliedCouponDiv.className = 'applied-coupon';
        appliedCouponDiv.innerHTML = `
            <div class="coupon-info">
                <i class="fas fa-tag"></i>
                <span>${coupon.code} - ${coupon.discountType === 'percentage' ? coupon.discountValue + '% 折扣' : '$' + coupon.discountValue + ' 折扣'}</span>
            </div>
            <button type="button" class="remove-coupon" onclick="removeCoupon()">×</button>
        `;
        
        couponContainer.appendChild(appliedCouponDiv);
        
        // Hide the input group
        document.querySelector('.coupon-input-group').style.display = 'none';
    }

    function removeCoupon() {
        appliedCoupon = null;
        
        // Remove applied coupon display
        const appliedCouponDiv = document.querySelector('.applied-coupon');
        if (appliedCouponDiv) {
            appliedCouponDiv.remove();
        }
        
        // Show input group again
        document.querySelector('.coupon-input-group').style.display = 'flex';
        couponCodeInput.value = '';
        showCouponMessage('', '');
        
        // Update total without discount
        updateCartTotalWithDiscount();
    }

    function updateCartTotalWithDiscount() {
        const cart = getCart();
        let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        if (appliedCoupon) {
            let discount = 0;
            if (appliedCoupon.discountType === 'percentage') {
                discount = total * (appliedCoupon.discountValue / 100);
            } else {
                discount = appliedCoupon.discountValue;
            }
            
            // Ensure discount doesn't exceed total
            discount = Math.min(discount, total);
            total -= discount;
        }
        
        if (cartTotalEl) {
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Promo Banner Functions
    function closePromoBanner() {
        const promoBanner = document.querySelector('.promo-banner');
        if (promoBanner) {
            promoBanner.style.display = 'none';
            localStorage.setItem('promo_banner_closed', 'true');
            // Adjust main content margin
            const main = document.querySelector('main');
            if (main) {
                main.style.marginTop = '80px';
            }
        }
    }

    // Check if promo banner should be shown
    function checkPromoBanner() {
        const promoBanner = document.querySelector('.promo-banner');
        const isClosed = localStorage.getItem('promo_banner_closed');
        
        if (promoBanner && isClosed === 'true') {
            promoBanner.style.display = 'none';
            const main = document.querySelector('main');
            if (main) {
                main.style.marginTop = '80px';
            }
        }
    }

    // Initialize promo banner check
    checkPromoBanner();
});

// Real login function
async function handleLogin(email, password) {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Login failed');
        localStorage.setItem('token', data.token);
        // Decode token to get user info
        const user = parseJwt(data.token);
        showDashboard(user, email);
    } catch (err) {
        alert('登入失敗: ' + err.message);
    }
}

// Real registration function
async function handleRegistration(name, email, phone, password) {
    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Registration failed');
        localStorage.setItem('token', data.token);
        // Decode token to get user info
        const user = parseJwt(data.token);
        showDashboard(user, email);
    } catch (err) {
        alert('註冊失敗: ' + err.message);
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    document.getElementById('memberDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function showDashboard(user, email) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('memberDashboard').classList.remove('hidden');
    document.getElementById('userName').textContent = user && user.user && user.user.id ? '會員' : email;
    document.getElementById('userEmail').textContent = email;
}

// Helper to decode JWT
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

// Load user data function
function loadUserData() {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate loading user data
    const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        orders: [
            {
                id: 'ORD001',
                date: '2024-03-15',
                status: 'completed',
                items: ['Basic Cleaning', 'Window Cleaning']
            },
            {
                id: 'ORD002',
                date: '2024-03-20',
                status: 'pending',
                items: ['Deep Cleaning']
            }
        ],
        appointments: [
            {
                id: 'APT001',
                date: '2024-03-25',
                time: '10:00 AM',
                service: 'Basic Cleaning'
            }
        ],
        favorites: [
            {
                id: 'FAV001',
                name: 'Deep Cleaning',
                price: '$150',
                image: 'path/to/image.jpg'
            }
        ],
        notifications: [
            {
                id: 'NOT001',
                title: 'Appointment Confirmed',
                message: 'Your cleaning appointment for March 25 has been confirmed.',
                time: '2 hours ago'
            }
        ]
    };

    // Update dashboard with user data
    updateDashboard(userData);
}

// Update dashboard with user data
function updateDashboard(userData) {
    // Update user info
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone;

    // Update orders
    const ordersList = document.getElementById('ordersList');
    if (ordersList) {
        ordersList.innerHTML = userData.orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <span class="order-number">Order #${order.id}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <span class="order-status ${order.status}">${order.status}</span>
                </div>
                <div class="order-items">
                    ${order.items.join(', ')}
                </div>
            </div>
        `).join('');
    }

    // Update appointments
    const appointmentsList = document.getElementById('appointmentsList');
    if (appointmentsList) {
        appointmentsList.innerHTML = userData.appointments.map(appointment => `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div class="appointment-time">
                        ${appointment.date} at ${appointment.time}
                    </div>
                    <div class="appointment-actions">
                        <button class="btn btn-primary">Reschedule</button>
                        <button class="btn btn-danger">Cancel</button>
                    </div>
                </div>
                <div class="appointment-service">
                    ${appointment.service}
                </div>
            </div>
        `).join('');
    }

    // Update favorites
    const favoritesList = document.getElementById('favoritesList');
    if (favoritesList) {
        favoritesList.innerHTML = userData.favorites.map(favorite => `
            <div class="favorite-card">
                <div class="favorite-image">
                    <img src="${favorite.image}" alt="${favorite.name}">
                </div>
                <div class="favorite-content">
                    <h4 class="favorite-title">${favorite.name}</h4>
                    <div class="favorite-price">${favorite.price}</div>
                </div>
            </div>
        `).join('');
    }

    // Update notifications
    const notificationsList = document.getElementById('notificationsList');
    if (notificationsList) {
        notificationsList.innerHTML = userData.notifications.map(notification => `
            <div class="notification-card">
                <div class="notification-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="notification-content">
                    <h4 class="notification-title">${notification.title}</h4>
                    <p class="notification-message">${notification.message}</p>
                    <span class="notification-time">${notification.time}</span>
                </div>
            </div>
        `).join('');
    }
} 