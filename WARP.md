# MON2000 Volunteer Hub
**Status:** Draft / prototype
**Description:** Brutalist DIY-zine prototype for an interactive bulletin-board replacement supporting Monash MON2000 *Volunteering in Practice*.
**Authors:** Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.

## Files
- `index.html` — single-file standalone prototype. No build step. Open in a browser.
- `README.md` — overview and replication.

## Map
MapLibre GL JS with the free CARTO Positron basemap, riso-filtered (grayscale + paper-color multiply + warm radial wash). To swap for Mapbox GL JS, see the comment above `partnerCoords` in `index.html`.

## Aesthetic
Brutalist DIY-zine, riso-print accents. Paper-white / ink-black / one fluoro accent (`#FF4438` riso red). Display: Big Shoulders Stencil Display. Accent: Special Elite. Body: DM Mono. Photocopy noise overlay, halftone postcards, masking-tape headers, snap-cut motion. No purple gradients. No Inter.

## Zones (4-tab IA)
1. **The Map** — counter-cartographic Melbourne, pulsing partner pins, live SOS, crew sparks, Monday call-sheet broadsheet.
2. **The Wall** — postcards + margin notes from the cohort.
3. **The Ledger** — public, append-only, never leaderboarded hours.
4. **You** — your hours, patches, scrapbook in progress.

## Mechanics in this prototype
Live pulse · SOS countdown · crew-spark "ME TOO" toggle · partner marker selection · call-sheet broadsheet · postcard wall · margin notes · cohort hours ledger · patch wall · scrapbook preview · ticker.

## Not yet implemented (stretch)
Constellation view, time-scrubber, cohort weather (visual), audio postcards, manifesto, anonymous ask box, live floor view, wildcard week, Paged.js scrapbook export, solidarity radio.

## Run
Open `index.html` directly in any modern browser, or serve the directory and visit `http://localhost:8000/`. Requires internet for Google Fonts, MapLibre, and the CARTO basemap tiles.

## Hosted
Deployed via GitHub Pages from the `main` branch root.
