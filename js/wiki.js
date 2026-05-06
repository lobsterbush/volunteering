import { mockWikiEntries, partners } from './data.js';
import { isSignedIn } from './auth.js';
import { showToast } from './app.js';

let entries = [], activePart = 'all', activeCat = 'all', activeSem = 'all';
const cats = ['all','logistics','culture','tips','accessibility'];
const sems = ['all','S1-2026','S2-2025','S1-2025'];

export function initWiki() {
  entries = [...mockWikiEntries];
  const ps = document.getElementById('wikiPartner');
  if (ps) {
    ps.innerHTML = `<option value="all">All partners</option>` + partners.map(p => `<option value="${p.slug}">${p.name}</option>`).join('');
    ps.addEventListener('change', () => { activePart = ps.value; render(); });
  }
  const ss = document.getElementById('wikiSemester');
  if (ss) {
    ss.innerHTML = sems.map(s => `<option value="${s}">${s === 'all' ? 'All semesters' : s}</option>`).join('');
    ss.addEventListener('change', () => { activeSem = ss.value; render(); });
  }
  const cc = document.getElementById('wikiCats');
  if (cc) {
    cc.innerHTML = cats.map(c => `<button class="wiki-cat-btn" data-c="${c}" aria-pressed="${c==='all'}">${c==='all'?'All':c.charAt(0).toUpperCase()+c.slice(1)}</button>`).join('');
    cc.addEventListener('click', e => { const b = e.target.closest('.wiki-cat-btn'); if (!b) return; activeCat = b.dataset.c; cc.querySelectorAll('.wiki-cat-btn').forEach(x => x.setAttribute('aria-pressed', x.dataset.c === activeCat)); render(); });
  }
  render();
}

function render() {
  const c = document.getElementById('wikiList');
  if (!c) return;
  const f = entries.filter(e => (activePart === 'all' || e.partner === activePart) && (activeCat === 'all' || e.category === activeCat) && (activeSem === 'all' || e.semester === activeSem)).sort((a,b) => b.upvotes - a.upvotes);
  if (!f.length) { c.innerHTML = '<div class="empty-state"><div class="icon">📖</div><h4>No entries found</h4><p>Try changing the filters, or share an insight to seed the wiki.</p></div>'; return; }
  c.innerHTML = f.map((e,i) => `<div class="wiki-entry" style="animation-delay:${i*0.04}s">
    <div class="cat-label">${e.category}</div>
    <div class="entry-title">${e.title}</div>
    <div class="entry-body">${e.body}</div>
    <div class="entry-meta">
      <span>${partners.find(p=>p.slug===e.partner)?.name||''}</span>
      <span>${e.semester}</span>
      <span>${e.who}</span>
      <span class="upvote" data-id="${e.id}">▲ ${e.upvotes}</span>
    </div>
  </div>`).join('');
  c.querySelectorAll('.upvote').forEach(el => el.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to upvote'); return; }
    const entry = entries.find(e => e.id === el.dataset.id);
    if (entry) { entry.upvotes++; el.textContent = `▲ ${entry.upvotes}`; }
  }));
}
