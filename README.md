# MON2000 Volunteer Hub

A professional, editorial-style web platform for Monash University's MON2000 *Volunteering in Practice* unit. Volunteers spend 12 weeks embedded at a partner organisation and use the Hub to share experiences, build institutional knowledge, and reflect on their growth.

## Authors

Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.

## Overview

MON2000 students complete 24 hours of volunteering placement with partner organisations (St Kilda Mums, SisterWorks, FoodFilled, MSA Wholefoods, Dixon House) alongside online modules and reflective assessments. The Volunteer Hub provides:

- **Interactive map** with partner pins, live SOS bar, and weekly call-sheet broadsheet
- **Bulletin board** where students post insights, tips, questions, carpools, and shift swaps — with filtering, spark reactions, and threaded replies
- **Partner wiki** — accumulated institutional knowledge per partner, browsable by category (logistics, culture, tips, accessibility) and by semester, creating a cross-cohort "hidden curriculum"
- **Fortnightly reflection chatbot** — a 7-turn guided conversation every two weeks, with adaptive branching that selects follow-up questions based on keyword/sentiment detection
- **Google Sign-In** for Monash students, gating interactive features while allowing guest browsing
- **Hours ledger** and **personal scrapbook** for tracking and reflection

The visual treatment is editorial and restrained: paper-tone background, fluoro riso-red accent, gold accent for wiki elements, stencil display typography, and minimal motion.

## Requirements

Any modern browser (Chrome / Firefox / Safari / Edge). Internet connection for Google Fonts, MapLibre tiles, and Firebase (when configured).

## Replication

1. Clone the repository.
2. Open `index.html` directly in a browser, or serve the directory:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000/`.
3. The app runs in **demo mode** by default with mock data — no Firebase project needed.
4. To enable live data, see the Firebase setup instructions in `WARP.md`.

## Repository Layout

```
index.html              — app shell
css/style.css           — style system (paper/ink/riso/gold palette)
js/app.js               — core orchestrator
js/auth.js              — Google Sign-In + auth state
js/firebase-config.js   — Firebase init with demo mode
js/data.js              — partner data, semester config, chatbot question banks
js/map.js               — MapLibre GL JS map
js/bulletin.js          — bulletin board CRUD + filtering
js/wiki.js              — partner wiki + archive browser
js/chatbot.js           — 7-turn adaptive reflection chatbot
WARP.md                 — project context
README.md               — this file
```

## Architecture

- **No build step** — vanilla HTML/CSS/JS with ES modules loaded via `<script type="module">`
- **Firebase (CDN)** — Auth (Google Sign-In) + Cloud Firestore, loaded only when `DEMO_MODE = false`
- **Demo mode** — default; all features work with rich mock data
- **Progressive auth** — unauthenticated users browse everything read-only; sign-in unlocks posting, wiki contributions, and reflections

## Status

Active. The platform is functional in demo mode and ready for Firebase integration when a project is provisioned.
