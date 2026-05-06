# MON2000 Volunteer Hub

A platform for Monash University's MON2000 *Volunteering in Practice* unit. Students spend 12 weeks embedded at one partner organisation and use the Hub to share experiences, build institutional knowledge, and complete guided reflections.

## Authors

Charles Crabtree, Senior Lecturer, School of Social Sciences, Monash University and K-Club Professor, University College, Korea University.

## Overview

- **Board** — cohort-wide feed of reflections, insights, tips, and questions
- **Wiki** — accumulated knowledge per partner, browsable by category and semester
- **Reflect** — Gemini-powered 7-turn fortnightly reflection conversations
- **You** — personal dashboard with hours, reflection progress, and contributions

## Requirements

Modern browser. Internet for fonts, map tiles, and Gemini API (when configured).

## Quick Start

```
python3 -m http.server 8000
```
Visit `http://localhost:8000`. Runs in demo mode with mock data by default.

## Gemini Chatbot

To enable LLM-powered reflections, add a Gemini API key in `js/firebase-config.js`:
```js
export const GEMINI_API_KEY = 'your-key-here';
```
Without a key, the chatbot uses structured keyword-based branching.

## Status

Active. Functional in demo mode, ready for Firebase + Gemini integration.
