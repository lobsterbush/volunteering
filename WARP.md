# MON2000 Volunteer Hub
**Status:** Active
**Description:** Editorial-style web platform for Monash MON2000 *Volunteering in Practice* — with Google Sign-In, a real-time bulletin board, a partner wiki, and a fortnightly reflection chatbot.
**Authors:** Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.
**Last Updated:** 2026-05-06

## Files
- `index.html` — app shell: auth overlay, masthead, 4 zones, footer
- `css/style.css` — full style system
- `js/app.js` — core orchestrator: zone switching, toasts, SOS, bootstrap
- `js/auth.js` — Google Sign-In flow, auth state, demo user
- `js/firebase-config.js` — Firebase init with demo mode fallback
- `js/data.js` — partner data, semester config, chatbot question banks
- `js/map.js` — MapLibre GL JS map with partner markers
- `js/bulletin.js` — bulletin board CRUD, filtering, spark reactions
- `js/wiki.js` — partner wiki with category/semester navigation
- `js/chatbot.js` — 7-turn fortnightly reflection chatbot
- `README.md` — overview and replication
- `WARP.md` — this file

## Tech Stack
Vanilla HTML/CSS/JS with ES modules, no build step. MapLibre GL JS 4.7.1 (CDN). Google Fonts: Big Shoulders Stencil Display, Special Elite, DM Mono. Firebase SDK v11 loaded via CDN (Auth + Firestore). Hosted via GitHub Pages.

## Architecture
- **Demo mode** (default): All features work with mock data. No Firebase project needed.
- **Live mode**: Set `DEMO_MODE = false` in `js/firebase-config.js` and add Firebase config.
- **Auth**: Google Sign-In popup, restricted to `@student.monash.edu` and `@monash.edu`.

## Aesthetic
Paper (`#F1ECDF`) / Ink (`#141414`) / Riso Red (`#FF4438`) / Gold (`#C4A84A`). Display: Big Shoulders Stencil Display. Accent: Special Elite. Body: DM Mono (15px). 8px baseline grid.

## Zones (4-tab IA)
1. **The Map** — partner pins, SOS bar, crew sparks, call-sheet broadsheet.
2. **The Wall** — Postcards | Bulletin Board (interactive, filterable) | Partner Wiki (cross-semester archive).
3. **The Ledger** — public, never-leaderboarded hours ledger.
4. **You** — hours, patches, reflection chatbot (7-turn adaptive conversations), scrapbook.

## Reflection Chatbot
6 fortnightly periods. 7 turns per session. Adaptive branching via keyword/sentiment detection. Themed banks: first impressions → routines → skills → deeper engagement → impact → looking back.

## Firebase Setup (for live mode)
1. Create a Firebase project at `console.firebase.google.com`
2. Enable Google Sign-In in Authentication → Sign-in method
3. Create a Firestore database
4. Register a web app and copy the config
5. Paste into `js/firebase-config.js`, set `DEMO_MODE = false`
6. Add `lobsterbush.github.io` to Authorized domains

## Hosted
https://lobsterbush.github.io/volunteering/ (GitHub Pages, `main` branch root).

## Run
Open `index.html` or serve via `python3 -m http.server 8000`.
