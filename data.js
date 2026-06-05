/**
 * ================================================
 * HUNTER SYSTEM - Data Initialization
 * Initialize example data and setup (optional)
 * ================================================
 */

// This file can be included in pages if you want to
// pre-populate example data for demonstration

/**
 * Initialize example users (for demo purposes)
 */
function initializeExampleData() {
  // Check if data already exists
  if (getFromStorage('users')) {
    return; // Data already initialized
  }

  // Create example users
  const exampleUsers = [
    {
      id: 1,
      username: "ThunderStrike",
      email: "thunder@hunter.com",
      password: "password123",
      level: 85,
      xp: 4500,
      rank: "S",
      rankPoints: 5000,
      joinDate: "Dec 1, 2025",
      avatar: "⚡",
      questsCompleted: 324,
      weekQuests: 12,
      rewardsEarned: 125000,
      achievements: 42
    },
    {
      id: 2,
      username: "ShadowNight",
      email: "shadow@hunter.com",
      password: "password123",
      level: 72,
      xp: 2100,
      rank: "A",
      rankPoints: 3800,
      joinDate: "Dec 10, 2025",
      avatar: "🌙",
      questsCompleted: 198,
      weekQuests: 8,
      rewardsEarned: 89000,
      achievements: 28
    },
    {
      id: 3,
      username: "InfernoFury",
      email: "inferno@hunter.com",
      password: "password123",
      level: 65,
      xp: 1200,
      rank: "A",
      rankPoints: 2900,
      joinDate: "Dec 15, 2025",
      avatar: "🔥",
      questsCompleted: 156,
      weekQuests: 5,
      rewardsEarned: 72000,
      achievements: 18
    }
  ];

  // Save example users
  saveToStorage('users', exampleUsers);
}

/**
 * Initialize example inventory
 */
function initializeExampleInventory() {
  const exampleInventory = [
    {
      id: 1,
      name: "Demon Slayer",
      type: "weapons",
      rarity: "legendary",
      value: 5000,
      bonus: "+45 ATK"
    },
    {
      id: 2,
      name: "Void Cloak",
      type: "armor",
      rarity: "epic",
      value: 3000,
      bonus: "+30 DEF"
    },
    {
      id: 3,
      name: "Moon Bow",
      type: "weapons",
      rarity: "rare",
      value: 1500,
      bonus: "+25 ATK"
    },
    {
      id: 4,
      name: "Health Potion",
      type: "potions",
      rarity: "common",
      value: 50,
      bonus: "+50 HP",
      quantity: 5
    }
  ];

  return exampleInventory;
}

/**
 * Log example data to console for debugging
 */
function logExampleData() {
  const users = getFromStorage('users');
  const currentUser = getFromStorage('currentUser');

  console.log('=== Hunter System Data ===');
  console.log('All Users:', users);
  console.log('Current User:', currentUser);
  console.log('Stored Keys:', Object.keys(localStorage));
}

/**
 * Clear all data (for testing purposes)
 */
function clearAllData() {
  if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
    localStorage.clear();
    console.log('All data cleared');
    window.location.href = 'index.html';
  }
}

/**
 * Export user data as JSON
 */
function exportUserData() {
  const data = {
    users: getFromStorage('users'),
    currentUser: getFromStorage('currentUser'),
    timestamp: new Date().toISOString()
  };

  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'hunter-system-data.json';
  link.click();
}

/**
 * Import user data from JSON
 */
function importUserData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.users) saveToStorage('users', data.users);
      if (data.currentUser) saveToStorage('currentUser', data.currentUser);
      showNotification('Data imported successfully!', 'success');
    } catch (error) {
      showNotification('Error importing data', 'error');
      console.error(error);
    }
  };
  reader.readAsText(file);
}

// Developer console commands
window.Hunter = {
  init: initializeExampleData,
  inventory: initializeExampleInventory,
  log: logExampleData,
  clear: clearAllData,
  export: exportUserData,
  import: importUserData
};

console.log('%c🎮 Hunter System Developer Console', 'font-size: 20px; color: #7c3aed; font-weight: bold;');
console.log('%cAvailable commands:', 'color: #7c3aed; font-weight: bold;');
console.log('Hunter.init()         - Initialize example data');
console.log('Hunter.log()          - Log all stored data');
console.log('Hunter.clear()        - Clear all data');
console.log('Hunter.export()       - Export data as JSON');
console.log('Hunter.inventory()    - View example inventory');
console.log('%c⚔️ Happy Hunting!', 'font-size: 14px; color: #a78bfa;');
