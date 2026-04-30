# MON2000 Volunteer Hub
An editorial-style web prototype for a multi-turn, interactive bulletin-board replacement supporting Monash University's MON2000 *Volunteering in Practice* unit.

## Authors
Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.

## Overview
MON2000 students complete 24 hours of volunteering placement with partner organisations (St Kilda Mums, SisterWorks, FoodFilled, MSA Wholefoods, Dixon House, etc.) alongside online modules and reflective assessments. The Volunteer Hub is a cohort-visible, real-time alternative to the static bulletin board: a map, a wall of postcards, a transparent hours ledger, and a personal scrapbook view, structured around a weekly turn cycle (Mon 06:00 call sheet → Sun 18:00 edition close).

The visual treatment is editorial and restrained: paper-tone background, a single fluoro accent (riso red `#FF4438`), distinctive display typography (Big Shoulders Stencil Display), and minimal motion.

## Mechanics demonstrated
- Live partner-site pulse and clickable markers
- SOS bar with live countdown and "claim shift" CTA
- Monday call-sheet broadsheet (3-column print-ready layout)
- Crew sparks with "ME TOO" two-tap matching
- Margin notes and postcard wall (halftone styled)
- Public, never-leaderboarded hours ledger
- Personal hours, iron-on patches, and scrapbook-in-progress preview
- Ticker, photocopy-noise texture, snap-cut motion

## Requirements
Any modern browser (Chrome / Firefox / Safari / Edge). Internet connection on first load to fetch Google Fonts; otherwise fully offline.

## Replication
1. Clone the repository.
2. Open `index.html` directly in a browser, or serve the directory:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000/`.
3. No build step, no dependencies, no backend.

## Map
The prototype uses **MapLibre GL JS** with the free **CARTO Positron** basemap, then applies a CSS filter (grayscale + contrast) plus a paper-color multiply overlay and a warm radial wash to produce the riso look. Five partner sites are placed at approximate Melbourne coordinates and rendered as custom HTML markers with the existing pulse animation.

To swap for **Mapbox GL JS**: see the comment above `partnerCoords` in `index.html`. You will need a Mapbox access token; MapLibre is the default because it works on GitHub Pages with no key.

## Repository layout
- `index.html` — the prototype.
- `WARP.md` — Warp project context.
- `README.md` — this file.

## Status
Draft. The prototype is intended to pressure-test the visual direction before committing to a framework or backend. See the working plan for the 10 core / 10 stretch mechanics roadmap.
