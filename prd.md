from pathlib import Path

prd_md = """
# PRD: Chore Champs – Motivating Kids Through Play

## 1. Project Overview
A web app designed to help parents, carers, and teachers encourage children (ages 4–12) to complete chores and tasks through positive reinforcement, gamified rewards, and financial literacy. The app will be engaging, safe, educational, and accessible from any device via the web.

## 2. Core User Roles

### Parent/Teacher (Admin)
- Create children’s profiles
- Assign chores and approve completions
- Manage rewards and set goals
- View progress and receive encouragement

### Child (User)
- View assigned tasks
- Mark tasks as complete
- Earn rewards, care for a virtual pet, and level up
- Track progress visually and interact with custom avatar

## 3. Key Features & Why They're Included

| Feature | Why It’s Included | Brief Explanation |
|--------|--------------------|-------------------|
| User Accounts (Parent-controlled) | To ensure task tracking and progress persistence across devices | Parents create and manage child accounts. Optional login with Firebase Auth (magic link/email or social OAuth) |
| Age-Appropriate Chores | To give users relevant suggestions | Preloaded chore bank filtered by age range (editable) |
| Custom Chore Creation | Flexibility for family-specific needs | Parents/teachers create custom tasks with descriptions, difficulty, and reward amount |
| Gamification (XP, Badges, Coins) | Boost engagement and habit-building | Completing chores earns points, coins, and achievements; unlocks visual badges |
| Virtual Pet System (optional) | Long-term motivation and emotional attachment | Kids can use rewards to care for a virtual pet that levels up; neglect has light consequences |
| Custom & Predefined Rewards | Motivation via choice and creativity | Parents define what rewards are available (money, screen time, outings); app offers suggestions |
| Parent-Approval for Task Completion | Maintain integrity and honesty | Kids mark a task “done,” but parents must approve before rewards are unlocked |
| Unlimited Child Accounts | For families or classrooms | No hard limit—use cases include families with many kids or teachers managing class chores |
| Visual Progress Dashboard | Track motivation and encourage effort | Graphs, progress bars, pet growth, and visual streaks |
| Encouragement System | Reinforce positivity for both kids and parents | Motivational phrases are displayed automatically |
| Custom Avatars | Builds identity and engagement | Kids create and customize avatars; unlock new features through achievements |
| Custom Themes with Accessibility Templates | Inclusion and personalization | Choose from themes that support neurodivergent and colorblind users |
| Offline Mode | Consistent access without Wi-Fi | Uses localStorage or IndexedDB to store data, synced later |
| Financial Literacy Integration | Teach life skills | Links to Martin Lewis’s MoneySavingExpert guide or embeds mini-lessons |
| Date Tracking | Ensure task accuracy | Device or internet clock detects current date; past and future task records stored locally |

## 4. Technology Stack

| Category | Tool | Reason |
|----------|------|--------|
| Frontend | React + Tailwind CSS | Component-based, fast styling |
| Backend/Auth/DB | Firebase | Free tier covers auth and storage needs |
| Offline Support | localStorage, IndexedDB, Workbox (PWA) | Offline persistence and background sync |
| Hosting | Netlify | Free static hosting with CI/CD |
| Design Tools | Figma or Penpot | Mockups and wireframes |
| Assets | OpenMoji, Heroicons, Kenney assets | Free, accessible icons and game sprites |
| Avatar Builder | Open Peeps or custom SVGs | Modular, kid-friendly characters |
| Analytics | GoatCounter or none | Privacy-first tracking or skip entirely |

## 5. Privacy & Safeguarding

- No tracking, no ads, no data resale
- Parent-controlled accounts only
- Parental consent required
- Minimal data collected
- Data deletion and opt-out options
- Offline-first mode supported
- GDPR and UK Age-Appropriate Design Code aware

## 6. Development Phases

### MVP (Phase 1)
- Parent login
- Add child and chores
- Track points and approve task completion
- Choose rewards
- Offline/localStorage support
- Visual tracking (XP, coins)
- Theming and accessibility options

### Phase 2
- Avatars and customization
- Virtual pet system
- Financial literacy popups
- Encouragement engine
- Teacher mode
- Pet shop and bonus missions

## 7. Stretch Goals
- AI-generated messages and pet interaction
- NFC check-ins for classroom use
- Voice assistant for chore narration
- Family leaderboard with privacy settings

## 8. File & Folder Structure (Planned)

/chore-champs
├── public/                   # Static assets (favicon, index.html, images)
├── src/
│   ├── assets/               # Icons, illustrations, pet graphics
│   ├── components/           # Reusable UI components
│   ├── layouts/              # Page templates (Dashboard, Auth)
│   ├── pages/                # Route-level views (Home, Login, Dashboard)
│   ├── data/                 # Static chore/reward templates
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Date handling, XP calculations, etc.
│   ├── context/              # Global app context
│   ├── firebase/             # Firebase setup
│   ├── styles/               # Tailwind and global styles
│   └── App.jsx               # Root app logic
├── .env                      # Firebase API keys (never commit)
├── .gitignore
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
"""

# Save to file
file_path = Path("/mnt/data/chore-champs-prd.md")
file_path.write_text(prd_md)

file_path.name
