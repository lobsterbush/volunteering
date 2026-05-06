/**
 * VOLUNTEER//HUB — Partner Wiki
 * Accumulated institutional knowledge per partner, browsable by
 * category and semester. Seeded from bulletin board insights/tips.
 */

import { mockWikiEntries, partners } from './data.js';
import { isSignedIn } from './auth.js';
import { showToast } from './app.js';

let entries = [];
let activePartner = 'all';
let activeCategory = 'all';
let activeSemester = 'all';

const categories = ['all', 'logistics', 'culture', 'tips', 'accessibility'];
const semesters  = ['all', 'S1-2026', 'S2-2025', 'S1-2025'];

export function initWiki() {
  entries = [...mockWikiEntries];
  renderControls();
  renderEntries();
}

function renderControls() {
  /* Partner select */
  const partnerSel = document.getElementById('wikiPartner');
  if (partnerSel) {
    partnerSel.innerHTML =
      `<option value="all">ALL PARTNERS</option>` +
      partners.map(p => `<option value="${p.slug}">${p.name}</option>`).join('');
    partnerSel.addEventListener('change', () => { activePartner = partnerSel.value; renderEntries(); });
  }

  /* Semester select */
  const semSel = document.getElementById('wikiSemester');
  if (semSel) {
    semSel.innerHTML = semesters.map(s =>
      `<option value="${s}">${s === 'all' ? 'ALL SEMESTERS' : s}</option>`
    ).join('');
    semSel.addEventListener('change', () => { activeSemester = semSel.value; renderEntries(); });
  }

  /* Category buttons */
  const catContainer = document.getElementById('wikiCategories');
  if (catContainer) {
    catContainer.innerHTML = categories.map(c =>
      `<button class="wiki-cat-btn" data-cat="${c}" aria-pressed="${c === 'all'}">${c === 'all' ? 'ALL' : c.toUpperCase()}</button>`
    ).join('');
    catContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.wiki-cat-btn');
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      catContainer.querySelectorAll('.wiki-cat-btn').forEach(b =>
        b.setAttribute('aria-pressed', b.dataset.cat === activeCategory));
      renderEntries();
    });
  }
}

function renderEntries() {
  const container = document.getElementById('wikiEntries');
  if (!container) return;

  const filtered = entries.filter(e => {
    if (activePartner !== 'all' && e.partner !== activePartner) return false;
    if (activeCategory !== 'all' && e.category !== activeCategory) return false;
    if (activeSemester !== 'all' && e.semester !== activeSemester) return false;
    return true;
  }).sort((a, b) => b.upvotes - a.upvotes);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📖</div>
        <h4>NO ENTRIES YET</h4>
        <p>Wiki entries are seeded from bulletin board insights and tips. Post one to get started.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map((e, i) => `
    <div class="wiki-entry" style="animation-delay:${i * 0.05}s" data-id="${e.id}">
      <div class="entry-cat">${e.category.toUpperCase()}</div>
      <div class="entry-title">${e.title}</div>
      <div class="entry-body">${e.body}</div>
      <div class="entry-meta">
        <span>${partnerLabel(e.partner)}</span>
        <span>${e.semester}</span>
        <span>${e.who}</span>
        <span class="upvote" data-id="${e.id}">▲ ${e.upvotes}</span>
      </div>
    </div>
  `).join('');

  /* Upvote clicks */
  container.querySelectorAll('.upvote').forEach(el => {
    el.addEventListener('click', () => {
      if (!isSignedIn()) { showToast('Sign in to upvote'); return; }
      const entry = entries.find(e => e.id === el.dataset.id);
      if (entry) { entry.upvotes++; el.textContent = `▲ ${entry.upvotes}`; }
    });
  });
}

function partnerLabel(slug) {
  const p = partners.find(x => x.slug === slug);
  return p ? p.name : slug?.toUpperCase() || '';
}
