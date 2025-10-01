document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkLoginStatus();
    
    // Form switching
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboard = document.getElementById('memberDashboard');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToRegister && switchToLogin) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });

        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // Form submission handling
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');

    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            // Basic validation
            if (!email || !password) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('請輸入有效的電子郵件地址');
                return;
            }
            
            handleLogin(email, password);
        });
    }

    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const phone = document.getElementById('registerPhone').value.trim();
            const password = document.getElementById('registerPassword').value;
            
            // Basic validation
            if (!name || !email || !phone || !password) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('請輸入有效的電子郵件地址');
                return;
            }
            
            if (password.length < 6) {
                alert('密碼至少需要6個字符');
                return;
            }
            
            if (!isValidPhone(phone)) {
                alert('請輸入有效的電話號碼');
                return;
            }
            
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

// Check if user is already logged in
async function checkLoginStatus() {
    // Check Firebase auth state
    if (window.firebase && window.firebase.auth) {
        try {
            const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            onAuthStateChanged(window.firebase.auth, async (user) => {
                if (user) {
                    // User is signed in
                    const userData = await getUserDataFromFirestore(user.uid);
                    showDashboard({ user: { id: user.uid } }, user.email, userData);
                }
            });
        } catch (error) {
            console.error('Firebase auth state check error:', error);
        }
    }
    
    // Fallback: Check local storage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && !window.firebase) {
        const userData = JSON.parse(currentUser);
        showDashboard({ user: { id: userData.id } }, userData.email);
    }
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Accept various phone formats: +852-1234-5678, 1234-5678, 12345678, etc.
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

// Firebase + Local Storage login function
async function handleLogin(email, password) {
    try {
        // Try Firebase first
        if (window.firebase && window.firebase.auth) {
            try {
                const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
                const userCredential = await signInWithEmailAndPassword(window.firebase.auth, email, password);
                const user = userCredential.user;
                
                // Get user data from Firestore
                const userData = await getUserDataFromFirestore(user.uid);
                showDashboard({ user: { id: user.uid } }, email, userData);
                return;
            } catch (firebaseError) {
                console.log('Firebase auth failed, trying local storage:', firebaseError.message);
            }
        }
        
        // Fallback to local storage authentication
        const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }));
            showDashboard({ user: { id: user.id } }, email);
        } else {
            throw new Error('無效的電子郵件或密碼');
        }
    } catch (err) {
        alert('登入失敗: ' + err.message);
    }
}

// Firebase + Local Storage registration function
async function handleRegistration(name, email, phone, password) {
    try {
        // Try Firebase first
        if (window.firebase && window.firebase.auth) {
            try {
                const { createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
                const userCredential = await createUserWithEmailAndPassword(window.firebase.auth, email, password);
                const user = userCredential.user;
                
                // Save user data to Firestore
                await saveUserDataToFirestore(user.uid, {
                    name: name,
                    email: email,
                    phone: phone,
                    createdAt: new Date().toISOString()
                });
                
                showDashboard({ user: { id: user.uid } }, email, { name, email, phone });
                alert('註冊成功！歡迎加入 Hygiene First！');
                return;
            } catch (firebaseError) {
                console.log('Firebase registration failed, trying local storage:', firebaseError.message);
                if (firebaseError.code === 'auth/email-already-in-use') {
                    throw new Error('此電子郵件已被使用');
                }
            }
        }
        
        // Fallback to local storage registration
        const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            throw new Error('用戶已存在');
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            phone: phone,
            password: password, // In real app, this should be hashed
            date: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('localUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone
        }));
        
        showDashboard({ user: { id: newUser.id } }, email);
        alert('註冊成功！歡迎加入 Hygiene First！');
        
    } catch (err) {
        alert('註冊失敗: ' + err.message);
    }
}

// Firebase helper functions
async function saveUserDataToFirestore(userId, userData) {
    if (window.firebase && window.firebase.db) {
        try {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            await setDoc(doc(window.firebase.db, 'users', userId), userData);
        } catch (error) {
            console.error('Error saving user data to Firestore:', error);
        }
    }
}

async function getUserDataFromFirestore(userId) {
    if (window.firebase && window.firebase.db) {
        try {
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const userDoc = await getDoc(doc(window.firebase.db, 'users', userId));
            return userDoc.exists() ? userDoc.data() : null;
        } catch (error) {
            console.error('Error getting user data from Firestore:', error);
            return null;
        }
    }
    return null;
}

async function handleLogout() {
    // Firebase logout
    if (window.firebase && window.firebase.auth) {
        try {
            const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            await signOut(window.firebase.auth);
        } catch (error) {
            console.error('Firebase logout error:', error);
        }
    }
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    
    // Show login form
    document.getElementById('memberDashboard').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

function showDashboard(user, email) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('memberDashboard').classList.add('active');
    
    // Get user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Update dashboard with user info
    const userNameElements = document.querySelectorAll('#userName');
    userNameElements.forEach(el => {
        el.textContent = currentUser.name || email;
    });
    
    const userEmailElements = document.querySelectorAll('#userEmail');
    userEmailElements.forEach(el => {
        el.textContent = email;
    });
    
    const userPhoneElements = document.querySelectorAll('#userPhone');
    userPhoneElements.forEach(el => {
        el.textContent = currentUser.phone || '未設定';
    });
    
    // Load user data
    loadUserData();
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
    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem('hygiene_orders') || '[]');
    
    // Update dashboard with orders
    updateDashboard({ orders });
    
    // Check if URL has #orders hash
    if (window.location.hash === '#orders') {
        // Switch to orders tab
        const ordersTab = document.querySelector('[href="#orders"]');
        if (ordersTab) {
            ordersTab.click();
        }
    }
}

// Update dashboard with user data
function updateDashboard(userData) {
    // Update orders from localStorage
    const ordersList = document.getElementById('ordersList');
    if (ordersList && userData.orders) {
        if (userData.orders.length === 0) {
            ordersList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">暫無訂單</p>';
        } else {
            ordersList.innerHTML = userData.orders.map(order => {
                const orderDate = new Date(order.orderDate);
                const formattedDate = orderDate.toLocaleDateString('zh-TW', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                const statusColor = {
                    'pending': { bg: '#fff3cd', text: '#856404', label: '待確認' },
                    'confirmed': { bg: '#d1ecf1', text: '#0c5460', label: '已確認' },
                    'completed': { bg: '#d4edda', text: '#155724', label: '已完成' },
                    'cancelled': { bg: '#f8d7da', text: '#721c24', label: '已取消' }
                };
                
                const status = statusColor[order.status] || statusColor.pending;
                
                return `
                    <div class="order-card" style="
                        background: white;
                        border: 2px solid #eee;
                        border-radius: 12px;
                        padding: 1.5rem;
                        margin-bottom: 1rem;
                        transition: all 0.3s ease;
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                            <div>
                                <div style="font-weight: bold; color: #FF7A00; font-size: 1.1rem; margin-bottom: 0.3rem;">
                                    訂單編號: ${order.orderId}
                                </div>
                                <div style="color: #999; font-size: 0.9rem;">
                                    <i class="fas fa-calendar-alt"></i> ${formattedDate}
                                </div>
                            </div>
                            <span style="
                                background: ${status.bg};
                                color: ${status.text};
                                padding: 0.4rem 1rem;
                                border-radius: 20px;
                                font-size: 0.9rem;
                                font-weight: 600;
                            ">${status.label}</span>
                        </div>
                        
                        <div style="border-top: 1px solid #eee; padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: grid; gap: 0.6rem;">
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: #666;"><i class="fas fa-broom"></i> 服務類型：</span>
                                    <strong>${order.service.type}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: #666;"><i class="fas fa-home"></i> 物業面積：</span>
                                    <strong>${order.service.propertySize}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: #666;"><i class="fas fa-clock"></i> 服務頻率：</span>
                                    <strong>${order.service.frequency}</strong>
                                </div>
                                ${order.service.addons && order.service.addons.length > 0 ? `
                                <div style="color: #666;">
                                    <i class="fas fa-plus-circle"></i> 額外服務：
                                    <ul style="margin: 0.3rem 0 0 1.5rem; color: #333;">
                                        ${order.service.addons.map(addon => `<li>${addon.name}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div style="border-top: 1px solid #eee; padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: grid; gap: 0.5rem; font-size: 0.95rem;">
                                <div><i class="fas fa-user"></i> ${order.customer.name}</div>
                                <div><i class="fas fa-phone"></i> ${order.customer.phone}</div>
                                <div><i class="fas fa-map-marker-alt"></i> ${order.customer.address}</div>
                                ${order.customer.preferredDate ? `<div><i class="fas fa-calendar-check"></i> 首選日期: ${order.customer.preferredDate}</div>` : ''}
                            </div>
                        </div>
                        
                        <div style="
                            background: linear-gradient(135deg, #FF7A00 0%, #FF9A40 100%);
                            color: white;
                            padding: 1rem;
                            border-radius: 8px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <span style="font-size: 1rem;">預估總價</span>
                            <span style="font-size: 1.5rem; font-weight: bold;">HK$ ${order.pricing.total.toFixed(0)}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
} 