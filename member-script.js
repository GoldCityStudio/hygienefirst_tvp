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
});

// Simulated login function
function handleLogin(email, password) {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful login
    console.log('Logging in with:', email);
    
    // Show dashboard and hide forms
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('memberDashboard').classList.remove('hidden');
    
    // Load user data
    loadUserData();
}

// Simulated registration function
function handleRegistration(name, email, phone, password) {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful registration
    console.log('Registering user:', { name, email, phone });
    
    // Show dashboard and hide forms
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('memberDashboard').classList.remove('hidden');
    
    // Load user data
    loadUserData();
}

// Simulated logout function
function handleLogout() {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a logout
    console.log('Logging out');
    
    // Show login form and hide dashboard
    document.getElementById('memberDashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
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