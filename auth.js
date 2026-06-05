/**
 * ================================================
 * HUNTER SYSTEM - Authentication Module
 * Login and Registration functionality
 * ================================================
 */

// ============================================
// LOGIN PAGE FUNCTIONALITY
// ============================================

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}

/**
 * Handle login form submission
 * @param {Event} e - Form submission event
 */
function handleLogin(e) {
  e.preventDefault();

  // Get form values
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Clear previous errors
  clearFormError('email');
  clearFormError('password');

  // Validation
  let isValid = true;

  if (!email) {
    showFormError('email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showFormError('email', 'Please enter a valid email');
    isValid = false;
  }

  if (!password) {
    showFormError('password', 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showFormError('password', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (!isValid) {
    showNotification('Please fix the errors below', 'error');
    return;
  }

  // Get all registered users
  const users = getFromStorage('users') || [];

  // Find user with matching email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showFormError('password', 'Invalid email or password');
    showNotification('Invalid credentials', 'error');
    return;
  }

  // Create user session
  const currentUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    level: user.level || 1,
    xp: user.xp || 0,
    rank: user.rank || 'E',
    joinDate: user.joinDate,
    avatar: user.avatar || '🐉'
  };

  // Save session
  saveToStorage('currentUser', currentUser);

  // Save "remember me" preference
  if (rememberMe) {
    saveToStorage('rememberEmail', email);
  }

  showFormSuccess('successMessage', 'Login successful! Redirecting...');
  showNotification('Welcome back, ' + user.username + '!', 'success');

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
}

// ============================================
// REGISTRATION PAGE FUNCTIONALITY
// ============================================

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', handleRegister);
}

/**
 * Handle registration form submission
 * @param {Event} e - Form submission event
 */
function handleRegister(e) {
  e.preventDefault();

  // Get form values
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsAgreed = document.getElementById('terms').checked;

  // Clear previous errors
  clearFormError('username');
  clearFormError('email');
  clearFormError('password');
  clearFormError('confirmPassword');
  clearFormError('terms');

  // Validation
  let isValid = true;

  if (!username) {
    showFormError('username', 'Hunter name is required');
    isValid = false;
  } else if (username.length < 3) {
    showFormError('username', 'Hunter name must be at least 3 characters');
    isValid = false;
  } else if (username.length > 20) {
    showFormError('username', 'Hunter name must be at most 20 characters');
    isValid = false;
  }

  if (!email) {
    showFormError('email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showFormError('email', 'Please enter a valid email');
    isValid = false;
  }

  if (!password) {
    showFormError('password', 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showFormError('password', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (!confirmPassword) {
    showFormError('confirmPassword', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showFormError('confirmPassword', 'Passwords do not match');
    isValid = false;
  }

  if (!termsAgreed) {
    showFormError('terms', 'You must agree to the Terms of Service');
    isValid = false;
  }

  if (!isValid) {
    showNotification('Please fix the errors below', 'error');
    return;
  }

  // Get all users
  let users = getFromStorage('users') || [];

  // Check if email already exists
  if (users.some(u => u.email === email)) {
    showFormError('email', 'This email is already registered');
    showNotification('Email already registered', 'error');
    return;
  }

  // Check if username already exists
  if (users.some(u => u.username === username)) {
    showFormError('username', 'This hunter name is already taken');
    showNotification('Hunter name already taken', 'error');
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password, // In production, this should be hashed
    level: 1,
    xp: 0,
    rank: 'E',
    joinDate: new Date().toLocaleDateString(),
    avatar: generateAvatar()
  };

  // Save user
  users.push(newUser);
  saveToStorage('users', users);

  // Auto-login new user
  const currentUser = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    level: newUser.level,
    xp: newUser.xp,
    rank: newUser.rank,
    joinDate: newUser.joinDate,
    avatar: newUser.avatar
  };

  saveToStorage('currentUser', currentUser);

  showFormSuccess('successMessage', 'Account created! Redirecting to dashboard...');
  showNotification('Welcome to Hunter System, ' + username + '!', 'success');

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate random avatar emoji
 * @returns {string} Random avatar emoji
 */
function generateAvatar() {
  const avatars = ['🐉', '👹', '🔥', '❄️', '⚡', '🌙', '⚔️', '🎭', '👤', '🐺'];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

// ============================================
// PAGE LOAD - Remember Email
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Check if on login page
  if (document.getElementById('email')) {
    const rememberEmail = getFromStorage('rememberEmail');
    if (rememberEmail) {
      document.getElementById('email').value = rememberEmail;
      document.getElementById('rememberMe').checked = true;
    }
  }
});

// ============================================
// FORGOT PASSWORD (PLACEHOLDER)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const forgotPasswordLinks = document.querySelectorAll('a[href="#"]');
  forgotPasswordLinks.forEach(link => {
    if (link.textContent.includes('Forgot')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Password reset feature coming soon!', 'info');
      });
    }
  });
});
