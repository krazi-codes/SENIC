# Scotia Creator Network — Change Log

## v1.0.0 — Initial Prototype (2026-05-23)

Built from scratch for CaseHacks 2026. Single-file React app, no backend.

---

### Files Added

| File | Purpose |
|------|---------|
| `App.jsx` | Entire application — all components, data, styles |
| `main.jsx` | React root (`ReactDOM.createRoot`) |
| `index.html` | Vite HTML entry point |
| `vite.config.js` | Vite + React plugin config |
| `package.json` | Dependencies: React 18, Vite 6 |
| `package-lock.json` | Locked dependency tree |
| `.gitignore` | Excludes `node_modules/`, `dist/` |

---

### App Structure

```
App
├── Header                    — logo, BETA badge, tab switcher
├── CreatorPortal
│   ├── Sidebar               — desktop (220px fixed) + mobile (horizontal scroll strip)
│   ├── Dashboard
│   │   ├── ProfileCard       — Alex Chen, @alexchenfinance, referral code copy button
│   │   ├── StatGrid          — 4 tiles: clicks, accounts, conversion rate, earnings
│   │   └── ActivityFeed      — 5 hardcoded recent events
│   ├── FactLibrary
│   │   ├── SearchBar         — filters on title + tags + category (live)
│   │   └── FactCard ×8       — header, plain language, CAN/CANNOT bullets, copy button
│   ├── DisclosureGenerator
│   │   ├── PlatformSelector  — TikTok / YouTube / Instagram / Podcast toggle
│   │   └── DisclosureBox     — gold left border, character count, copy button
│   └── ScriptChecker
│       ├── Textarea          — red focus ring
│       ├── CheckButton       — 1.2s spinner animation on click
│       └── ResultsPanel      — "warning" (text entered) or "clear" (empty)
└── InvestorOnboarding
    ├── PhoneFrame            — 390px wide, 32px radius, shadow, expands on mobile
    ├── ProgressBar           — step X of 4, animated width transition
    ├── Step0_ReferralLanding — Scotia logo, Alex Chen attribution, bonus box, CTA
    ├── Step1_GoalSelector    — 6 goal cards (2×3 grid), red border on select
    ├── Step2_AccountRec      — maps goal → account type, shows reasons + contribution room
    ├── Step3_FirstDeposit    — preset amounts, custom input, portfolio picker, round-up toggle
    └── Step4_MilestoneCard   — share card preview, Instagram share toast, copy referral code
```

---

### Hardcoded Data

**Fact cards (8):** TFSA, RRSP, FHSA, Index Fund/ETF, Compound Interest, Contribution Room, Diversification, Risk Tolerance

**Disclosure text (4):** TikTok, YouTube, Instagram, Podcast

**Goal → Account mapping (6):**

| Goal | Account |
|------|---------|
| First Home | FHSA |
| Education | RESP |
| Travel | TFSA |
| Retirement | RRSP |
| Emergency Fund | TFSA |
| Just Exploring | TFSA |

**Creator:** Alex Chen · @alexchenfinance · Referral code `ALEX-SCN-2847`

---

### Design Tokens

All colors defined in the `C` object in `App.jsx` (top of file). Fonts via CSS in `GLOBAL_CSS` string.

| Token | Value | Used for |
|-------|-------|---------|
| `navy` | `#0D1B2A` | Primary background |
| `navyMid` | `#1A2E45` | Card backgrounds |
| `navyLight` | `#2D4A6A` | Borders, dividers |
| `red` | `#C8102E` | Primary actions, active states |
| `redDark` | `#991B1C` | Hover state |
| `gold` | `#F2A900` | Accents, badges, numbers |
| `textSec` | `#A0AEC0` | Secondary text |
| `greenLight` | `#86EFAC` | CAN SAY bullets |
| `dangerLight` | `#FCA5A5` | CANNOT SAY bullets |

---

### State (all `useState`, no context/Redux)

```js
// Global
activeTab           'creator' | 'investor'

// Creator Portal (local to CreatorPortal)
activeSection       'dashboard' | 'facts' | 'disclosure' | 'checker'

// Fact Library (local to FactLibrary)
search              string — filters cards live

// Disclosure Generator (local)
platform            'tiktok' | 'youtube' | 'instagram' | 'podcast'

// Script Checker (local)
text                string
result              null | 'warning' | 'clear'
checking            boolean

// Investor Onboarding (lifted to InvestorOnboarding)
step                0–4
selectedGoal        null | 'home' | 'education' | 'travel' | 'retirement' | 'emergency' | 'exploring'
selectedAmount      number (default 50)
customAmount        string
selectedPortfolio   'conservative' | 'balanced' | 'growth' (default 'balanced')
roundUpEnabled      boolean (default true)
```

---

### Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤ 768px` | Sidebar → horizontal scroll strip; facts grid → 1 col; stat grid → 2×2; platform buttons wrap; portfolio cards stack |
| `≤ 480px` | Phone frame expands to full screen, no rounded corners or shadow |

---

### Interactions

| Interaction | Implementation |
|-------------|---------------|
| Tab switch | `key={activeTab}` on wrapper → CSS `fadeIn` 150ms |
| Step transitions | `slide-in` CSS class → `translateX(30px→0)` 200ms |
| Script checker loading | `checking` state → spinning border div, 1.2s `setTimeout` |
| Copy buttons | `copied` state → "Copied ✓" text, reverts after 2000ms |
| Round-up toggle | `left: 23px / 3px` CSS transition on knob, 200ms |
| Progress bar | CSS `transition: width 0.3s ease` |
| Instagram share | Toast div with `fadeIn` animation, auto-hides after 3000ms |

---

### Known Limitations / Possible Extensions

- **Script Checker is not real NLP** — always shows the same hardcoded warning for any non-empty input. To make real: swap the `setTimeout` mock with an API call to a text analysis service.
- **No authentication** — everything is one session, no login.
- **Referral code is static** — `ALEX-SCN-2847` hardcoded everywhere. Real version would fetch from a user session.
- **No form validation** — inputs accept any value. Fine for demo.
- **RESP not in Fact Library** — only the 8 specified facts are present. RESP card could be added.
- **No back button in onboarding flow** — users can't go back between steps. Easy to add with `setStep(step - 1)`.
- **Earnings calculation is static** — `$1,248` hardcoded. Real version would compute from referral events.
- **Share to Instagram** — copies link to clipboard, shows toast. Doesn't actually open Instagram (Web Share API or deep link could be added).

---

### How to Run

```bash
npm install       # first time only
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```
