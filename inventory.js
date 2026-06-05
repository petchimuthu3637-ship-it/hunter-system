/**
 * ================================================
 * HUNTER SYSTEM - Inventory Module
 * Inventory management, search, and filtering
 * ================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeInventory();
});

/**
 * Initialize inventory page
 */
function initializeInventory() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  setupSearchAndFilter();
  displayInventoryItems();
  updateInventoryStats();
}

/**
 * Setup search and filter functionality
 */
function setupSearchAndFilter() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      filterInventoryItems(btn.dataset.filter);
    });
  });
}

/**
 * Handle search functionality
 * @param {Event} e - Input event
 */
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const items = document.querySelectorAll('.inventory-item');
  let visibleCount = 0;

  items.forEach(item => {
    const itemName = item.querySelector('h3').textContent.toLowerCase();
    const itemType = item.querySelector('p').textContent.toLowerCase();

    if (itemName.includes(searchTerm) || itemType.includes(searchTerm)) {
      item.style.display = 'block';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Show empty state if no items found
  const emptyState = document.getElementById('emptyState');
  if (visibleCount === 0) {
    if (emptyState) emptyState.style.display = 'block';
  } else if (emptyState) {
    emptyState.style.display = 'none';
  }
}

/**
 * Filter inventory items by category
 * @param {string} filter - Filter type (all, weapons, armor, potions, artifacts)
 */
function filterInventoryItems(filter) {
  const items = document.querySelectorAll('.inventory-item');
  let visibleCount = 0;

  items.forEach(item => {
    if (filter === 'all') {
      item.style.display = 'block';
      visibleCount++;
    } else if (item.dataset.itemType === filter) {
      item.style.display = 'block';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Show empty state if no items found
  const emptyState = document.getElementById('emptyState');
  if (visibleCount === 0) {
    if (emptyState) emptyState.style.display = 'block';
  } else if (emptyState) {
    emptyState.style.display = 'none';
  }
}

/**
 * Display inventory items
 */
function displayInventoryItems() {
  const inventoryGrid = document.getElementById('inventoryGrid');
  
  if (!inventoryGrid) return;

  // Add event listeners to item buttons
  inventoryGrid.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemCard = btn.closest('.inventory-item');
      const itemName = itemCard.querySelector('h3').textContent;
      const action = btn.textContent;

      handleItemAction(itemName, action);
    });
  });

  // Add hover animations
  inventoryGrid.querySelectorAll('.inventory-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-10px)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Handle item action (equip or use)
 * @param {string} itemName - Name of the item
 * @param {string} action - Action to perform
 */
function handleItemAction(itemName, action) {
  if (action.includes('Equip')) {
    showNotification(itemName + ' equipped successfully!', 'success');
  } else if (action.includes('Use')) {
    const xpBonus = Math.floor(Math.random() * 50) + 25;
    showNotification('Used ' + itemName + '! +' + xpBonus + ' XP', 'success');
    addXP(xpBonus);
  }
}

/**
 * Update inventory statistics
 */
function updateInventoryStats() {
  const totalItems = document.getElementById('totalItems');
  const inventorySpace = document.getElementById('inventorySpace');
  const totalValue = document.getElementById('totalValue');

  const items = document.querySelectorAll('.inventory-item');
  const itemCount = items.length;
  const maxSpace = 50;
  const totalGold = 12450;

  if (totalItems) totalItems.textContent = itemCount;
  if (inventorySpace) inventorySpace.textContent = itemCount + '/' + maxSpace;
  if (totalValue) totalValue.textContent = formatNumber(totalGold);
}

// ============================================
// ITEM MANAGEMENT
// ============================================

/**
 * Sort items by rarity
 * @param {string} rarity - Rarity to sort by
 */
function sortByRarity(rarity) {
  const items = document.querySelectorAll('.inventory-item');
  const grid = document.getElementById('inventoryGrid');

  const itemsArray = Array.from(items);
  
  if (rarity === 'all') {
    // Default order
    itemsArray.forEach(item => grid.appendChild(item));
  } else {
    // Sort by rarity
    itemsArray.sort((a, b) => {
      const aRarity = a.className.match(/item-rarity-\w+/)[0];
      const bRarity = b.className.match(/item-rarity-\w+/)[0];
      
      if (aRarity.includes(rarity)) return -1;
      if (bRarity.includes(rarity)) return 1;
      return 0;
    });

    itemsArray.forEach(item => grid.appendChild(item));
  }
}

/**
 * Sell item
 * @param {string} itemName - Item to sell
 * @param {number} price - Selling price
 */
function sellItem(itemName, price = 100) {
  let currentUser = getCurrentUser();
  
  currentUser.rewardsEarned = (currentUser.rewardsEarned || 0) + price;
  saveToStorage('currentUser', currentUser);

  showNotification('Sold ' + itemName + ' for ' + price + ' Gold!', 'success');
  updateInventoryStats();
}

/**
 * Discard item
 * @param {string} itemName - Item to discard
 */
function discardItem(itemName) {
  showNotification('Discarded ' + itemName, 'warning');
  updateInventoryStats();
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Ctrl+F for search focus
  if (e.ctrlKey && e.key === 'f') {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.focus();
  }
});
