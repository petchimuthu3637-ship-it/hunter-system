/**
 * ================================================
 * HUNTER SYSTEM - Dashboard Module
 * Dashboard functionality and XP system
 * ================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeDashboard();
});

/**
 * Initialize dashboard
 */
function initializeDashboard() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  loadUserProfile(currentUser);
  updateStatistics(currentUser);
  initializeQuests(currentUser);
  simulateDailyRewards();
}

/**
 * Load user profile information
 * @param {object} user - Current user object
 */
function loadUserProfile(user) {
  // Update profile display
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  const userRank = document.getElementById('userRank');
  const joinDate = document.getElementById('joinDate');

  if (userAvatar) userAvatar.textContent = user.avatar || '🐉';
  if (userName) userName.textContent = user.username;
  if (userRank) userRank.textContent = 'Rank: ' + user.rank + '-Class';
  if (joinDate) joinDate.textContent = user.joinDate;
}

/**
 * Update statistics display
 * @param {object} user - Current user object
 */
function updateStatistics(user) {
  // Level
  const userLevel = document.getElementById('userLevel');
  const userXP = document.getElementById('userXP');
  const xpProgress = document.getElementById('xpProgress');
  const xpNeeded = document.getElementById('xpNeeded');

  const level = user.level || 1;
  const xp = user.xp || 0;
  const xpRequired = level * 100;
  const xpProgress_percent = (xp / xpRequired) * 100;

  if (userLevel) userLevel.textContent = level;
  if (userXP) userXP.textContent = formatNumber(xp);
  if (xpProgress) xpProgress.style.width = Math.min(xpProgress_percent, 100) + '%';
  if (xpNeeded) xpNeeded.textContent = formatNumber(Math.max(xpRequired - xp, 0));

  // Rank
  const hunterRankDisplay = document.getElementById('hunterRankDisplay');
  const rankPoints = document.getElementById('rankPoints');
  const rankProgress = document.getElementById('rankProgress');
  const pointsNeeded = document.getElementById('pointsNeeded');

  const rankPoints_value = user.rankPoints || 0;
  const rankProgress_percent = Math.min((rankPoints_value / 1000) * 100, 100);

  if (hunterRankDisplay) hunterRankDisplay.textContent = user.rank || 'E';
  if (rankPoints) rankPoints.textContent = formatNumber(rankPoints_value);
  if (rankProgress) rankProgress.style.width = rankProgress_percent + '%';
  if (pointsNeeded) pointsNeeded.textContent = formatNumber(Math.max(1000 - rankPoints_value, 0));

  // Quests Completed
  const questsCompleted = document.getElementById('questsCompleted');
  const weekQuests = document.getElementById('weekQuests');
  const rewardsEarned = document.getElementById('rewardsEarned');

  const quests = user.questsCompleted || 12;
  const weekQ = user.weekQuests || 3;
  const rewards = user.rewardsEarned || 2450;

  if (questsCompleted) questsCompleted.textContent = quests;
  if (weekQuests) weekQuests.textContent = weekQ;
  if (rewardsEarned) rewardsEarned.textContent = formatNumber(rewards);

  // Achievements
  const achievementCount = document.getElementById('achievementCount');
  const achievementPercent = document.getElementById('achievementPercent');
  const achievementProgress = document.getElementById('achievementProgress');

  const achievements = user.achievements || 5;
  const achievementPercentVal = (achievements / 20) * 100;

  if (achievementCount) achievementCount.textContent = achievements;
  if (achievementPercent) achievementPercent.textContent = Math.round(achievementPercentVal);
  if (achievementProgress) achievementProgress.style.width = achievementPercentVal + '%';
}

/**
 * Initialize quests display
 * @param {object} user - Current user object
 */
function initializeQuests(user) {
  // Quest 1
  const quest1Progress = document.getElementById('quest1Progress');
  const quest1Bar = document.getElementById('quest1Bar');
  const quest1Val = Math.floor(Math.random() * 50) + 30;

  if (quest1Progress) quest1Progress.textContent = quest1Val;
  if (quest1Bar) quest1Bar.style.width = quest1Val + '%';

  // Quest 2
  const quest2Progress = document.getElementById('quest2Progress');
  const quest2Bar = document.getElementById('quest2Bar');
  const quest2Val = Math.floor(Math.random() * 10) + 5;

  if (quest2Progress) quest2Progress.textContent = quest2Val;
  if (quest2Bar) quest2Bar.style.width = (quest2Val / 15) * 100 + '%';

  // Quest 3
  const quest3Progress = document.getElementById('quest3Progress');
  const quest3Bar = document.getElementById('quest3Bar');
  const quest3Val = Math.floor(Math.random() * 3) + 7;

  if (quest3Progress) quest3Progress.textContent = quest3Val;
  if (quest3Bar) quest3Bar.style.width = (quest3Val / 10) * 100 + '%';

  // Add click handlers to continue quest buttons
  document.querySelectorAll('.card .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.textContent.includes('Continue')) {
        showNotification('Quest continues! Keep going hunter!', 'success');
      }
    });
  });
}

/**
 * Simulate daily rewards timer
 */
function simulateDailyRewards() {
  const countdownElement = document.getElementById('dailyRewardCountdown');
  const claimButton = document.querySelector('.card .btn-primary[disabled]');

  if (!countdownElement) return;

  let hoursRemaining = Math.floor(Math.random() * 24);

  setInterval(() => {
    hoursRemaining--;
    if (hoursRemaining < 0) hoursRemaining = 24;

    if (countdownElement) {
      countdownElement.textContent = hoursRemaining + ' hours';
    }

    // Enable button when ready
    if (hoursRemaining === 0 && claimButton) {
      claimButton.disabled = false;
      claimButton.textContent = 'Claim Daily Reward';
      claimButton.classList.remove('btn-ghost');
      
      claimButton.addEventListener('click', claimDailyReward);
    }
  }, 3600000); // Update every hour
}

/**
 * Claim daily reward
 */
function claimDailyReward() {
  const rewards = [100, 50, 75, 200];
  const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

  showNotification('You claimed ' + randomReward + ' XP as your daily reward!', 'success');

  // Update user XP
  let currentUser = getCurrentUser();
  currentUser.xp = (currentUser.xp || 0) + randomReward;
  saveToStorage('currentUser', currentUser);

  // Refresh statistics
  updateStatistics(currentUser);
}

// ============================================
// XP & LEVELING SYSTEM
// ============================================

/**
 * Add XP to current user
 * @param {number} amount - XP amount to add
 */
function addXP(amount) {
  let currentUser = getCurrentUser();
  
  currentUser.xp = (currentUser.xp || 0) + amount;
  
  const level = currentUser.level || 1;
  const xpRequired = level * 100;
  
  // Check for level up
  if (currentUser.xp >= xpRequired) {
    currentUser.xp = currentUser.xp - xpRequired;
    currentUser.level = level + 1;
    showNotification('Level Up! You are now level ' + currentUser.level, 'success');
    
    // Bonus XP on level up
    currentUser.xp += 10;
  }
  
  saveToStorage('currentUser', currentUser);
  updateStatistics(currentUser);
}

/**
 * Add rank points
 * @param {number} amount - Points to add
 */
function addRankPoints(amount) {
  let currentUser = getCurrentUser();
  
  currentUser.rankPoints = (currentUser.rankPoints || 0) + amount;
  
  // Check for rank up
  const rankProgression = ['E', 'D', 'C', 'B', 'A', 'S'];
  const currentRankIndex = rankProgression.indexOf(currentUser.rank || 'E');
  
  if (currentUser.rankPoints >= 1000 && currentRankIndex < rankProgression.length - 1) {
    currentUser.rank = rankProgression[currentRankIndex + 1];
    currentUser.rankPoints = 0;
    showNotification('Rank Up! You are now ' + currentUser.rank + '-Class Hunter!', 'success');
  }
  
  saveToStorage('currentUser', currentUser);
  updateStatistics(currentUser);
}

// ============================================
// QUEST TRACKING
// ============================================

/**
 * Complete a quest
 * @param {string} questName - Name of quest
 * @param {number} xpReward - XP reward
 * @param {number} pointsReward - Rank points reward
 */
function completeQuest(questName, xpReward = 100, pointsReward = 50) {
  let currentUser = getCurrentUser();
  
  currentUser.questsCompleted = (currentUser.questsCompleted || 0) + 1;
  currentUser.rewardsEarned = (currentUser.rewardsEarned || 0) + (pointsReward * 10);
  
  saveToStorage('currentUser', currentUser);
  
  addXP(xpReward);
  addRankPoints(pointsReward);
  
  showNotification('Quest Complete! ' + questName + ' ✓', 'success');
}
