# 🎮 Hunter System - Anime Dark Fantasy Website

A complete, professional anime-inspired dark fantasy "Hunter System" website built with vanilla HTML, CSS, and JavaScript. Features a modern glassmorphism design with full authentication, user progression system, inventory management, and leaderboard functionality.

## ✨ Features

### Core Features
- ✅ **Modern Glassmorphism Design** - Beautiful transparent UI elements with backdrop blur
- ✅ **Dark Theme** - Purple, blue, and black color scheme optimized for eyes
- ✅ **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ✅ **Smooth Animations** - Fade-in, slide, and floating particle effects
- ✅ **Professional UI/UX** - Clean, intuitive interface with excellent UX
- ✅ **Local Storage Support** - Persistent user data without backend

### Pages
1. **index.html** - Landing page with hero section and features
2. **login.html** - User login with email/password validation
3. **register.html** - User registration with validation
4. **dashboard.html** - Main dashboard with XP, level, rank, and quests
5. **inventory.html** - Inventory management with search and filter
6. **leaderboard.html** - Global leaderboard with rankings

### Authentication System
- User registration with validation
- Secure login with remember me option
- Local storage persistence
- Session management
- Protected pages (requires login)

### Game Systems
- **Level System** - Track levels and experience points (XP)
- **Rank System** - E to S class rankings
- **Quest System** - Track active quests with progress
- **Inventory System** - Manage items with rarity levels
- **Leaderboard** - Global hunter rankings
- **Daily Rewards** - Claim daily login bonuses

### UI Components
- Responsive navigation bar with mobile menu
- Collapsible sidebar
- Animated progress bars
- Notification system
- Form validation with error messages
- Loading animations
- Modal system (ready for expansion)

## 📁 Folder Structure

```
project/
├── index.html           # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Main dashboard
├── inventory.html      # Inventory page
├── leaderboard.html    # Leaderboard page
│
├── css/
│   └── style.css       # Main stylesheet (all styling)
│
├── js/
│   ├── app.js         # Core app functionality & utilities
│   ├── auth.js        # Login & registration logic
│   ├── dashboard.js   # Dashboard & XP system
│   └── inventory.js   # Inventory & filtering
│
├── assets/
│   ├── images/        # Placeholder for images
│   └── icons/         # Placeholder for icons
│
└── README.md          # This file
```

## 🚀 Getting Started

### Installation
1. Clone or download this project
2. Open `index.html` in your web browser
3. No installation or dependencies required!

### First Time Use
1. Go to the landing page (index.html)
2. Click "Register" to create an account
3. Enter your hunter name, email, and password
4. Log in with your credentials
5. Access the dashboard and start your adventure!

### Test Accounts
After registering your first account, you can log in anytime with the same credentials stored in your browser.

## 🎨 Design Features

### Colors
- **Primary**: Purple (#7c3aed) - Main brand color
- **Secondary**: Sky Blue (#0ea5e9) - Accent color
- **Background**: Dark Slate (#0f172a) - Primary background
- **Text**: Light Slate (#f1f5f9) - Main text color

### Glassmorphism
- Frosted glass effect on cards and containers
- Backdrop blur filters
- Semi-transparent backgrounds
- Modern and elegant appearance

### Animations
- Fade-in page transitions
- Floating particle background
- Button hover effects
- Card hover animations
- Progress bar fills with shimmer effect
- Smooth scrolling

### Typography
- Segoe UI font family
- Gradient text for headings
- Responsive font sizes
- Clear visual hierarchy

## 💻 JavaScript Functionality

### Global Functions (app.js)
- `showNotification()` - Display notifications
- `saveToStorage()` - Save data locally
- `getFromStorage()` - Retrieve data locally
- `isLoggedIn()` - Check login status
- `getCurrentUser()` - Get current user
- `logoutUser()` - Logout user
- `validateEmail()` - Email validation

### Authentication (auth.js)
- `handleLogin()` - Process login
- `handleRegister()` - Process registration
- `generateAvatar()` - Random avatar for new users

### Dashboard (dashboard.js)
- `loadUserProfile()` - Display user info
- `updateStatistics()` - Update stats display
- `addXP()` - Add experience points
- `addRankPoints()` - Add rank points
- `completeQuest()` - Mark quest as complete
- `claimDailyReward()` - Claim daily bonus

### Inventory (inventory.js)
- `setupSearchAndFilter()` - Initialize search/filter
- `handleSearch()` - Search items
- `filterInventoryItems()` - Filter by type
- `handleItemAction()` - Equip/use items
- `sortByRarity()` - Sort items
- `sellItem()` - Sell items

## 📊 Local Storage Structure

### User Object
```javascript
{
  id: 1234567890,
  username: "HunterName",
  email: "hunter@example.com",
  password: "hashed_password",
  level: 1,
  xp: 0,
  rank: "E",
  rankPoints: 0,
  joinDate: "1/15/2026",
  avatar: "🐉",
  questsCompleted: 0,
  rewardsEarned: 0,
  achievements: 0
}
```

### Data Stored
- `users` - Array of all registered users
- `currentUser` - Currently logged-in user
- `rememberEmail` - Last used email (optional)

## 🎮 Game Systems Explained

### Level System
- Start at Level 1
- Gain XP by completing quests and achievements
- Each level requires XP (Level * 100)
- Level up rewards bonus XP
- Maximum level: 150 (can be customized)

### Rank System
- **E-Class**: Beginner (0 points)
- **D-Class**: Intermediate (1000 points)
- **C-Class**: Advanced (2000 points)
- **B-Class**: Expert (3000 points)
- **A-Class**: Master (4000 points)
- **S-Class**: Legendary (5000 points)

### Quest System
- Track active quests with progress
- Different difficulty levels (Easy, Medium, Hard)
- Earn XP and rank points upon completion
- Daily quests for bonus rewards

### Inventory System
- 50 item slots
- 4 rarity levels: Common, Rare, Epic, Legendary
- Items provide stat bonuses
- Equip or use items
- Search and filter functionality

### Leaderboard
- Global rankings by points
- Filter by rank class
- Search for specific hunters
- Display top hunters with badges

## 🔧 Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
  --primary-color: #7c3aed;    /* Your color here */
  --secondary-color: #0ea5e9;
  /* ... more variables */
}
```

### Adding New Pages
1. Create new HTML file
2. Include the navbar from existing pages
3. Link CSS and JavaScript files
4. Add content
5. Update navigation links

### Modifying Game Parameters
Edit values in `dashboard.js`:
```javascript
const xpRequired = level * 100;  // Change XP requirement
const maxInventory = 50;          // Change inventory limit
```

### Adding Quests
Edit the quests section in `dashboard.html` and add event handlers in `dashboard.js`.

## 🔐 Security Notes

⚠️ **Important**: This is a demonstration project using localStorage. In production:
- Use a backend server for authentication
- Hash passwords before storage
- Use secure sessions/tokens
- Implement proper data validation
- Use HTTPS for all communications

## 🐛 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🎯 Features Implemented

### Core Functionality ✅
- User authentication system
- Registration with validation
- Login with remember me
- Session persistence
- Protected pages

### Game Systems ✅
- Level and XP system
- Rank progression
- Quest tracking
- Inventory management
- Leaderboard rankings
- Daily rewards

### UI/UX ✅
- Glassmorphism design
- Responsive layout
- Smooth animations
- Notification system
- Form validation
- Dark theme
- Mobile-friendly

### Performance ✅
- Lightweight (no dependencies)
- Fast load times
- Smooth animations
- Optimized images
- Clean code structure

## 🚀 Future Enhancements

Possible additions:
- Backend server integration
- Real-time multiplayer
- Item trading system
- Guilds/Teams
- PvP battles
- Seasonal events
- Social features
- Mobile app version
- Achievement system expansion
- Custom animations and effects

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

- Designed and developed as a professional anime-inspired gaming platform
- Built with vanilla HTML, CSS, and JavaScript
- No external frameworks or libraries used

## 📞 Support

For questions or suggestions, please refer to the code comments which are comprehensive and well-documented.

## 🎬 Getting Started Steps

1. **Open index.html** in your browser
2. **Click Register** to create an account
3. **Enter your details**:
   - Hunter Name (3-20 characters)
   - Email address
   - Password (minimum 6 characters)
   - Confirm password
4. **Click "Create Hunter Account"**
5. **Automatically redirected to Dashboard**
6. **Explore all features**:
   - Check your profile
   - View statistics
   - Track active quests
   - Check daily rewards
   - Visit Inventory page
   - Check Leaderboard

## 💡 Tips for Users

- **Daily Login**: Check back daily for login bonuses
- **Complete Quests**: Quests give great XP rewards
- **Manage Inventory**: Organize items by rarity
- **Track Progress**: Check the leaderboard to see your ranking
- **Level Up**: Keep gaining XP to unlock new features
- **Mobile Friendly**: Works great on phones!

---

**Enjoy your journey as a Hunter! May your XP ever increase and your rank ever rise! ⚔️**
