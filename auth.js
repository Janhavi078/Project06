// Authentication JavaScript for Login and Signup

// API Base URL
const API_BASE_URL = window.location.origin + '/api/auth';

// Utility Functions
const showError = (message) => {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    if (errorMessage && errorText) {
        errorText.textContent = message;
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
};

const showSuccess = (message) => {
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    if (successMessage && successText) {
        successText.textContent = message;
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
};

const showFieldError = (fieldId, message) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
};

const hideFieldError = (fieldId) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
};

const clearAllFieldErrors = () => {
    const errorElements = document.querySelectorAll('[id$="Error"]');
    errorElements.forEach(el => el.classList.add('hidden'));
};

const setLoading = (isLoading, buttonId, textId) => {
    const button = document.getElementById(buttonId);
    const buttonText = document.getElementById(textId);
    const spinner = button.querySelector('.spinner');

    if (isLoading) {
        button.disabled = true;
        button.classList.add('opacity-75', 'cursor-not-allowed');
        buttonText.textContent = 'Processing...';
        spinner.classList.add('show');
    } else {
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
        buttonText.textContent = buttonId === 'loginBtn' ? 'Sign In' : 'Create Account';
        spinner.classList.remove('show');
    }
};

// Email Validation
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Password Strength Checker
const checkPasswordStrength = (password) => {
    let strength = 0;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');

    if (!strengthBar || !strengthText) return;

    // Check password criteria
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    // Update UI based on strength
    strengthBar.className = 'password-strength-bar';
    
    if (strength < 2) {
        strengthBar.classList.add('password-strength-weak');
        strengthText.textContent = 'Weak password';
        strengthText.className = 'text-xs text-red-400 mt-1';
    } else if (strength < 4) {
        strengthBar.classList.add('password-strength-medium');
        strengthText.textContent = 'Medium password';
        strengthText.className = 'text-xs text-yellow-400 mt-1';
    } else {
        strengthBar.classList.add('password-strength-strong');
        strengthText.textContent = 'Strong password';
        strengthText.className = 'text-xs text-green-400 mt-1';
    }
};

// Token Management
const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

const getToken = () => {
    return localStorage.getItem('authToken');
};

const removeToken = () => {
    localStorage.removeItem('authToken');
};

const saveUser = (user) => {
    localStorage.setItem('userData', JSON.stringify(user));
};

const getUser = () => {
    const user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
};

const removeUser = () => {
    localStorage.removeItem('userData');
};

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllFieldErrors();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Client-side validation
        let isValid = true;

        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            showFieldError('password', 'Password is required');
            isValid = false;
        }

        if (!isValid) return;

        // Make API request
        setLoading(true, 'loginBtn', 'loginBtnText');

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Save token and user data
                saveToken(data.token);
                saveUser(data.user);
                
                showSuccess('Login successful! Redirecting...');
                
                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                showError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('An error occurred. Please try again later.');
        } finally {
            setLoading(false, 'loginBtn', 'loginBtnText');
        }
    });

    // Real-time validation
    document.getElementById('email').addEventListener('blur', (e) => {
        const email = e.target.value.trim();
        if (email && !isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
        } else {
            hideFieldError('email');
        }
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllFieldErrors();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Client-side validation
        let isValid = true;

        if (!name) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            showFieldError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showFieldError('password', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!confirmPassword) {
            showFieldError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showFieldError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }

        if (!termsAccepted) {
            showError('Please accept the Terms of Service and Privacy Policy');
            isValid = false;
        }

        if (!isValid) return;

        // Make API request
        setLoading(true, 'signupBtn', 'signupBtnText');

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Save token and user data
                saveToken(data.token);
                saveUser(data.user);
                
                showSuccess('Account created successfully! Redirecting...');
                
                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                showError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            showError('An error occurred. Please try again later.');
        } finally {
            setLoading(false, 'signupBtn', 'signupBtnText');
        }
    });

    // Real-time validation
    document.getElementById('email').addEventListener('blur', (e) => {
        const email = e.target.value.trim();
        if (email && !isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
        } else {
            hideFieldError('email');
        }
    });

    document.getElementById('password').addEventListener('input', (e) => {
        checkPasswordStrength(e.target.value);
    });

    document.getElementById('confirmPassword').addEventListener('blur', (e) => {
        const password = document.getElementById('password').value;
        const confirmPassword = e.target.value;
        if (confirmPassword && password !== confirmPassword) {
            showFieldError('confirmPassword', 'Passwords do not match');
        } else {
            hideFieldError('confirmPassword');
        }
    });
}

// Check if user is logged in and update UI
const updateNavigation = () => {
    const user = getUser();
    const token = getToken();

    if (user && token) {
        // User is logged in
        console.log('User is logged in:', user);
        // You can update navigation here to show user profile, logout button, etc.
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});

// Logout function (can be called from other pages)
const logout = () => {
    removeToken();
    removeUser();
    window.location.href = '/login';
};

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.authUtils = {
        getToken,
        getUser,
        logout,
        isAuthenticated: () => !!getToken()
    };
}
