# MON2000 Volunteer Hub
**Status:** Active
**Description:** Web platform for Monash MON2000 *Volunteering in Practice* — Google Sign-In, bulletin board with replies, partner wiki with cross-semester archiving, and Gemini-powered reflection chatbot.
**Authors:** Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.
**Last Updated:** 2026-05-06

## Files
- `index.html` — single-page app shell: auth overlay, header, 4-zone tabs, mobile nav, footer
- `css/style.css` — full style system (warm professional palette)
- `js/app.js` — orchestrator: zone switching, toasts, board→wiki promotion wiring, boot
- `js/auth.js` — Firebase Google Sign-In, domain enforcement, demo fallback
- `js/firebase-config.js` — Firebase project config, Gemini API key, DEMO_MODE toggle
- `js/data.js` — 5 partners, semester config, 7 mock posts, 33 wiki entries, 6 chatbot question banks
- `js/map.js` — MapLibre GL JS map with partner markers
- `js/bulletin.js` — board CRUD, type+partner filtering, inline replies, spark reactions, wiki promotion
- `js/wiki.js` — wiki entries, filter by partner/semester/category, new entry form, board→wiki intake
- `js/chatbot.js` — Gemini 2.0 Flash 7-turn reflection chatbot with keyword fallback

## Tech Stack
Vanilla HTML/CSS/JS with ES modules, no build step. MapLibre GL JS 4.7.1 (CDN). Google Fonts: Inter, DM Mono. Firebase SDK v11.7.1 via CDN (Auth + Firestore). Gemini 2.0 Flash API (REST, key in firebase-config.js). Hosted via GitHub Pages.

## Architecture
- **Live mode** (current): `DEMO_MODE = false`. Firebase project `monash-volunteering` configured. Gemini API key hardcoded.
- **Demo mode**: Set `DEMO_MODE = true` to run with mock data and no external services.
- **Auth**: Firebase `signInWithPopup` (Google). No `hd` parameter — post-sign-in check enforces `@student.monash.edu` and `@monash.edu`. Falls back to demo user if Firebase init fails.
- **Boot timing**: `readyState` check in app.js handles top-level `await` in firebase-config.js finishing after `DOMContentLoaded`.
- **Board → Wiki**: bulletin.js exposes `setWikiPromoter(fn)`; app.js wires it to `promoteToWiki()` from wiki.js. Clicking 📖 Wiki on an insight/tip post switches to Wiki zone with form pre-filled.

## Palette
Bg `#FAFAF7` / Surface `#FFFFFF` / Accent `#DC4A2D` / Gold `#92702F` / Green `#16A34A`. Body: Inter 15px. Mono: DM Mono. 8px grid.

## Zones (4-tab IA)
1. **Board** — cohort post feed (reflections, insights, tips, questions). Type + partner filters. Compose form with partner selector. Inline replies. Spark reactions. 📖 Wiki promotion on insight/tip posts.
2. **Wiki** — partner knowledge base. Filter by partner, semester, category (logistics/culture/tips/accessibility). New entry form. Upvotes. 33 seed entries across 5 partners.
3. **Reflect** — Gemini-powered 7-turn fortnightly chatbot. 6 periods with themed prompts. System prompt as reflective practice facilitator. Falls back to keyword branching without API key.
4. **You** — personal dashboard (hours, reflections, posts, wiki contributions). Currently static mock data.

## Reflection Chatbot
Gemini 2.0 Flash via REST (`generativelanguage.googleapis.com`). System prompt in chatbot.js (~250 tokens). Per-turn context includes fortnight theme, turn number, and full conversation history. `temperature: 0.8`, `maxOutputTokens: 200`. Fallback: regex keyword matching → generic probes.

## Firebase Config
Project: `monash-volunteering`. Auth domain: `monash-volunteering.firebaseapp.com`. Authorized domains must include `lobsterbush.github.io`.

## Hosted
https://lobsterbush.github.io/volunteering/ (GitHub Pages, `main` branch root).

## Run
`python3 -m http.server 8000` or open `index.html` directly.

## Next Steps
- Firestore persistence for posts, wiki entries, and reflection transcripts (currently in-memory only).
- Dynamic week/semester display in header from `data.js` semester config.
- You dashboard wired to actual user data instead of static mock numbers.
