/**
 * ================================================
 * HUNTER SYSTEM - Main Application JavaScript
 * Core functionality, navigation, and animations
 * ================================================
 */

// ============================================
// UTILITIES & HELPER FUNCTIONS
// ============================================

/**
 * Show notification popup
 * @param {string} message - Notification message
 * @param {string} type - Notification type: success, error, warning, info
 * @param {number} duration - How long to show (milliseconds)
 */
function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notificationContainer');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  container.appendChild(notification);

  // Auto remove after duration
  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Save user data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Get user data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Retrieved data or null
 */
function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

/**
 * Check if user is logged in
 * @returns {boolean} True if logged in
 */
function isLoggedIn() {
  return getFromStorage('currentUser') !== null;
}

/**
 * Get current logged-in user
 * @returns {object} User object or null
 */
function getCurrentUser() {
  return getFromStorage('currentUser');
}

/**
 * Logout user
 */
function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

/**
 * Format large numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================
// NAVIGATION SETUP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navbarMenu = document.getElementById('navbarMenu');

  if (hamburger && navbarMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navbarMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }

  // Sidebar toggle for dashboard
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking on a link (mobile)
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('active');
        }
      });
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }

  // Animated particles background
  initializeParticles();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Update active menu item based on current page
  updateActiveMenuItems();
});

/**
 * Initialize animated particles
 */
function initializeParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;

  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

/**
 * Update active navigation items
 */
function updateActiveMenuItems() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.navbar-menu a, .sidebar-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// FORM VALIDATION HELPERS
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show form error
 * @param {string} fieldId - Form field ID
 * @param {string} message - Error message
 */
function showFormError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

/**
 * Clear form error
 * @param {string} fieldId - Form field ID
 */
function clearFormError(fieldId) {
  const errorElement = document.getElementById(fieldId + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }
}

/**
 * Show form success message
 * @param {string} elementId - Success element ID
 * @param {string} message - Success message
 */
function showFormSuccess(elementId, message) {
  const successElement = document.getElementById(elementId);
  if (successElement) {
    successElement.textContent = message;
    successElement.classList.add('show');
  }
}

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

window.addEventListener('resize', () => {
  // Adjust layout on resize
  if (window.innerWidth > 1024) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.remove('active');
    }
  }
});

// ============================================
// PAGE TRANSITIONS
// ============================================

// Add fade-in animation to page load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ============================================
// INITIALIZATION
// ============================================

// Check authentication on protected pages
function checkAuthentication() {
  const currentPage = window.location.pathname.split('/').pop();
  const protectedPages = ['dashboard.html', 'inventory.html', 'leaderboard.html'];

  if (protectedPages.includes(currentPage) && !isLoggedIn()) {
    showNotification('Please log in to access this page', 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', checkAuthentication);
