# MON2000 Volunteer Hub
**Status:** Draft
**Description:** Editorial-style web prototype for an interactive bulletin-board replacement supporting Monash MON2000 *Volunteering in Practice*.
**Authors:** Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.
**Last Updated:** 2026-05-01

## Files
- `index.html` — single-file standalone prototype. No build step. Open in a browser.
- `README.md` — overview and replication.

## Tech Stack
Vanilla HTML/CSS/JS, no build step. MapLibre GL JS 4.7.1 (CDN, unpkg) for the map. Google Fonts: Big Shoulders Stencil Display, Special Elite, DM Mono. Hosted via GitHub Pages from `main` branch root at https://lobsterbush.github.io/volunteering/.

## Map
MapLibre GL JS with the free CARTO Positron basemap, lightly filtered (grayscale + soft paper multiply). Partner coordinates and a Mapbox GL swap-in note live in the JS block above `partnerCoords` in `index.html`.

## Aesthetic
Clean editorial layout with a single fluoro accent. Paper (`#F1ECDF`) / ink (`#141414`) / riso red (`#FF4438`). Display: Big Shoulders Stencil Display. Accent: Special Elite. Body: DM Mono. Subtle paper texture; minimal motion.

## Zones (4-tab IA)
1. **The Map** — partner pins on a Melbourne basemap, live SOS bar, crew sparks sidebar, Monday call-sheet broadsheet.
2. **The Wall** — postcards from the week, classifieds-style bulletin board, and wiki-style margin notes from prior cohorts.
3. **The Ledger** — public, append-only, never-leaderboarded record of cohort hours by partner and by week.
4. **You** — personal hours, achievements (patches), and a scrapbook in progress.

## Mechanics in this prototype
Live pulse · SOS countdown · crew-spark JOIN toggle · partner marker selection · call-sheet broadsheet · postcard wall · cohort bulletin board · margin notes · cohort hours ledger · patch wall · scrapbook preview.

## Not yet implemented (stretch)
Constellation view, time-scrubber, cohort weather (visual), audio postcards, manifesto, anonymous ask box, live floor view, wildcard week, Paged.js scrapbook export, solidarity radio.

## Run
Open `index.html` directly in any modern browser, or serve the directory and visit `http://localhost:8000/`. Requires internet for Google Fonts, MapLibre, and the CARTO basemap tiles.

## Hosted
Live at https://lobsterbush.github.io/volunteering/ (GitHub Pages from `main` branch root). Repo: https://github.com/lobsterbush/volunteering.

## Next Steps
- Awaiting feedback from program coordinator (Zareh).
- If pursued, replace mock data with a real partner-shift feed (3–5 pilot partners).
- Decide between auto-generated and co-edited weekly call sheet.
- Decide whether margin notes persist across cohorts or wipe each semester.
