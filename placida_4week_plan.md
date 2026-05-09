# 🌿 Placida — 4-Week Development Plan

> **Team:** Sahil · Ayushi · Sanchari · Divyans  
> **Stack:** HTML5 · CSS3 · Vanilla JS · localStorage (no backend yet)  
> **Repo:** github.com/BugBitCoder/PLACIDA  
> **Branch strategy:** Each member works on their own branch → PR into `main` at end of each week

---

## 📦 What's Already Done (Pre-Week Summary)

| Member | Branch | Completed |
|---|---|---|
| **Sahil** | `frontend-sahil` | Landing page, Dashboard, `script.js` (mood save/load/stats), full CSS design system, MindBridge theme |
| **Sanchari** | `features-sanchari` | Breathing timer (4-7-8), Weekly Summary page, `features.js` (chatbot engine + breathing logic + summary stats) |
| **Ayushi** | `backend-ayushi` | Chatbot UI (`chatbot.html`) — chat bubbles, typing indicator, persistence, mood-aware greeting, mobile nav, char counter, clear chat |
| **Divyans** | `docs-divyans` | `README.md`, `TESTING.md`, full Week 1 QA checklist, navigation testing, responsive testing |

---

## 📅 WEEK 1 — Status: ✅ COMPLETE

> All 5 pages built, documented and tested.

| Member | Deliverable | Status |
|---|---|---|
| Sahil | `index.html`, `dashboard.html`, `script.js`, `style.css` | ✅ Done & pushed |
| Sanchari | `breathe.html`, `summary.html`, `features.js` | ✅ Done & pushed |
| Ayushi | `chatbot.html` (full UI + Week 2 enhancements) | ✅ Done & pushed |
| Divyans | `README.md`, `TESTING.md`, full QA | ✅ Done & pushed to main |

---

## 📅 WEEK 2 — Polish, UX Improvements & localStorage Enhancements

> **Goal:** Make the existing 5 pages feel more polished, add user-facing improvements, improve data richness.

### 👨‍💻 Sahil — `frontend-sahil`
**Focus: Dashboard v2 + Mood Streak & Chart**
- [x] Add a **mood trend chart** to dashboard using Chart.js (CDN) — bar chart of last 7 days ✅
- [x] Add a **streak counter** — how many consecutive days user has logged ✅
- [x] Add a **"Clear All Data"** button on dashboard (with confirmation dialog) ✅
- [x] Make the dashboard greeting **time-aware** — "Good morning / evening, Sahil 👋" ✅

**Files:** `dashboard.html`, `script.js`, `style.css`  
**Branch:** `frontend-sahil` → PR to `main`

---

### 👩‍💻 Ayushi — `backend-ayushi`
**Focus: Chatbot v2 — Smarter Replies + Mood Context**
- [x] Mobile hamburger nav ✅
- [x] Character counter ✅
- [x] Clear chat button ✅
- [x] Chat persistence ✅
- [ ] Add **quick-reply chips** — e.g. "I'm feeling anxious", "I need help", "I'm okay"
- [ ] Complete **mood context badge** at top of chat showing last logged mood
- [ ] Add a **"Talk to a real person"** section after 5+ bot messages

**Files:** `frontend/chatbot.html`  
**Branch:** `backend-ayushi` → PR to `main`

---

### 👩‍🎨 Sanchari — `features-sanchari`
**Focus: Breathing v2 + Summary Enhancements**
- [ ] Add **alternative breathing patterns** — 4-7-8 / Box Breathing (4-4-4-4) / Simple (4-4)
- [ ] Add **session history** on breathe page — "You completed 3 cycles today"
- [ ] On `summary.html`, add **emoji mood row** for last 7 days (Mon😊 Tue😔 etc.)
- [ ] Add **"Save Journal Entry"** button — saves textarea to localStorage with timestamp

**Files:** `breathe.html`, `summary.html`, `features.js`  
**Branch:** `features-sanchari` → PR to `main`

---

### 📋 Divyans — `docs-divyans`
**Focus: Week 2 QA + CHANGELOG + Contributing guide**
- [ ] Test all Week 2 new features as members push them
- [ ] Update `TESTING.md` with Week 2 test cases
- [ ] Create `CHANGELOG.md` — document what changed Week 1 → Week 2
- [ ] Create `CONTRIBUTING.md` — how to run locally, branch naming rules, PR process
- [ ] Update `README.md` — add Week 2 features

**Files:** `README.md`, `TESTING.md`, `CHANGELOG.md`, `CONTRIBUTING.md`  
**Branch:** `docs-divyans` → PR to `main`

---

## 📅 WEEK 3 — New Features + Final Polish & Deployment

> **Goal:** Build remaining features, polish everything, deploy to GitHub Pages, and prepare the app for user testing next week.

### 👨‍💻 Sahil — `frontend-sahil`
**Focus: Insights page + Deploy + Final UI Polish**
- [ ] Create `insights.html` — dedicated insights page:
  - 30-day mood heatmap (color-coded calendar grid)
  - Best day of week analysis (avg score per weekday)
  - "Your happiest time" stat
- [ ] Add **onboarding modal** on first visit — "Welcome to Placida! Here's how it works 🌿"
- [ ] Add **keyboard shortcuts** — `M` = log mood, `B` = breathe, `C` = chat
- [ ] Add a **404.html** page
- [ ] Add **meta OG tags** for WhatsApp/LinkedIn sharing
- [ ] **Deploy to GitHub Pages** — configure repo settings, verify live URL works
- [ ] Final CSS consistency pass across all pages

**Files:** `insights.html`, `style.css`, `404.html`, all pages  
**Branch:** `frontend-sahil` → final merge to `main`

---

### 👩‍💻 Ayushi — `backend-ayushi`
**Focus: Resources page + Accessibility + Dark mode**
- [ ] Create `resources.html` — mental wellness resources page:
  - Indian helplines (iCall, Vandrevala, NIMHANS, Snehi)
  - Self-help links + breathing technique cards
  - "Find a therapist" static styled cards
- [ ] Add **crisis detection flow** in chatbot — after 3+ crisis keywords, show helpline modal
- [ ] Full **accessibility audit** — tab navigation, ARIA labels, contrast ratios
- [ ] Add **dark/light mode toggle** in navbar (saves to localStorage)

**Files:** `resources.html`, `chatbot.html`, `style.css`  
**Branch:** `backend-ayushi` → final merge to `main`

---

### 👩‍🎨 Sanchari — `features-sanchari`
**Focus: Mindfulness page + PWA + Performance**
- [ ] Create `mindful.html` — mindfulness activities page:
  - **Affirmation deck** — tap to reveal daily affirmations (10 rotating)
  - **Gratitude prompt** — text input + save to localStorage
- [ ] Add **ambient sound toggle** on breathe page (rain / white noise via HTML audio)
- [ ] Add `manifest.json` — makes the site installable as a PWA
- [ ] Add basic `service-worker.js` — caches pages for offline access
- [ ] Optimize `features.js` — edge cases, empty states, performance

**Files:** `mindful.html`, `breathe.html`, `features.js`, `manifest.json`, `service-worker.js`  
**Branch:** `features-sanchari` → final merge to `main`

---

### 📋 Divyans — `docs-divyans`
**Focus: Final docs + Presentation prep + User testing script**
- [ ] Update `README.md` with live GitHub Pages URL + screenshots
- [ ] Create `PRESENTATION.md` — structured talking points for each member
- [ ] Create `CREDITS.md` — design inspirations, fonts, libraries used
- [ ] Final `TESTING.md` — full regression test of all pages before user testing
- [ ] Write **user testing script** — 5 tasks with observation fields (ready for Week 4)
- [ ] Document any bugs in `BUGS.md` with severity ratings

**Files:** `README.md`, `PRESENTATION.md`, `CREDITS.md`, `TESTING.md`, `BUGS.md`  
**Branch:** `docs-divyans` → final merge to `main`

---

## 📅 WEEK 4 — User Feedback Collection & Incorporation

> **Goal:** Collect real user feedback on the live app, analyze it as a team, fix priority issues, and present the final polished product.

### 👨‍💻 Sahil — `frontend-sahil`
**Focus: Feedback form page + Fixing UI feedback**
- [ ] Create `feedback.html` — in-app feedback form:
  - Star rating (1–5) for each feature: Mood Logger, Dashboard, Breathing, Chat, Journal
  - Open-ended text fields: "What did you like?" / "What would you improve?"
  - Submit button saves to localStorage (or exports as JSON)
- [ ] Act on **UI/UX feedback** from users — fix reported layout/design issues
- [ ] Record a **final screen recording demo** of the complete app flow
- [ ] Update navbar on all pages to include the Feedback link

**Files:** `feedback.html`, any pages needing UI fixes  
**Branch:** `frontend-sahil` → PR to `main`

---

### 👩‍💻 Ayushi — `backend-ayushi`
**Focus: Chatbot feedback analysis + Fixes**
- [ ] Conduct **user testing sessions** (share live link, observe usage)
  - Ask 3–5 test users to try the chatbot and note issues
  - Record which chatbot replies felt unhelpful or wrong
- [ ] Update `BOT_RULES` in `features.js` based on feedback — add missing keywords/replies
- [ ] Fix any chatbot UI issues reported (e.g. scroll, timing, mobile layout)
- [ ] Write **"About Placida"** section for the final presentation

**Files:** `chatbot.html`, `features.js`  
**Branch:** `backend-ayushi` → PR to `main`

---

### 👩‍🎨 Sanchari — `features-sanchari`
**Focus: Feature feedback analysis + Breathing/Summary fixes**
- [ ] Run **user testing** on breathe and summary pages with 3–5 users
  - Note which breathing patterns users preferred
  - Note if the journal prompt resonated with users
- [ ] Incorporate feedback — update breathing UI, affirmation deck, or summary prompts
- [ ] Add **feedback summary card** on `summary.html` — shows "Your most-used feature this week"
- [ ] Final polish of all animations and transitions based on feedback

**Files:** `breathe.html`, `summary.html`, `features.js`, `mindful.html`  
**Branch:** `features-sanchari` → PR to `main`

---

### 📋 Divyans — `docs-divyans`
**Focus: Feedback analysis + Final presentation**
- [ ] Collect all feedback form responses, compile into `FEEDBACK_ANALYSIS.md`
  - Tally feature ratings (1–5)
  - Highlight most common complaints and praise
  - Recommend top 3 priority fixes for the team
- [ ] Update `README.md` with final screenshots + feedback summary
- [ ] Finalize `PRESENTATION.md` — structure the demo walkthrough:
  - Problem statement → Design thinking → Solution → Demo → Feedback results → Future scope
- [ ] Final regression test after all feedback fixes are applied
- [ ] Ensure all branches are merged into `main` cleanly

**Files:** `FEEDBACK_ANALYSIS.md`, `README.md`, `PRESENTATION.md`, `TESTING.md`  
**Branch:** `docs-divyans` → final merge to `main`

---

## 📊 Updated Summary Table

| | Sahil | Ayushi | Sanchari | Divyans |
|---|---|---|---|---|
| **Week 1** ✅ | Landing + Dashboard + CSS | Chatbot UI | Breathe + Summary + features.js | README + QA |
| **Week 2** | Dashboard v2 + Charts ✅ | Chatbot v2 + Quick replies | Breathing patterns + Journal save | CHANGELOG + CONTRIBUTING |
| **Week 3** | Insights + Deploy + 404 + OG | Resources + Accessibility + Dark mode | Mindful page + PWA + Ambient sound | Final docs + Presentation prep |
| **Week 4** | Feedback form + UI fixes + Demo | User testing + Bot improvements | Feature testing + Summary polish | Feedback analysis + Final presentation |

---

## 🔀 Git Workflow (Every Week)

```
1. Work on your branch
2. Commit with clear message: "feat(name): description"
3. Push to origin/<your-branch>
4. Open PR → main at end of each week
5. Divyans reviews + merges after QA sign-off
```

> **Commit format:** `feat(sahil): add mood chart to dashboard`  
> **PR title format:** `Week 3 — Sahil: Insights page + Deploy`

---

## 📝 Week 4 User Testing Guide

**How to collect feedback:**

1. Share the **live GitHub Pages link** with 5–10 test users (friends, classmates)
2. Ask them to complete these 5 tasks without help:
   - Log a mood with a note
   - View the dashboard and describe what they see
   - Complete one breathing session (minimum 3 cycles)
   - Have a 5-message conversation with the chatbot
   - Fill out the in-app feedback form
3. Observe and note: where do they get confused? what do they ignore? what do they love?
4. Divyans compiles all feedback into `FEEDBACK_ANALYSIS.md`
5. Team meets → prioritizes top 3 fixes each → implements → final demo
