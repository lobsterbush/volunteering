import { mockWikiEntries, partners, semester } from './data.js';
import { getUser, isSignedIn } from './auth.js';
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
  setupWikiCompose();
  render();
}

/** Open the wiki compose form pre-filled from a board post (called via board → wiki promotion). */
export function promoteToWiki(post) {
  const form = document.getElementById('wikiComposeForm');
  if (!form) return;
  form.hidden = false;
  const partnerSel = document.getElementById('wikiNewPartner');
  const catSel = document.getElementById('wikiNewCategory');
  const titleInput = document.getElementById('wikiNewTitle');
  const bodyInput = document.getElementById('wikiNewBody');
  if (partnerSel) partnerSel.value = post.partner || partners[0].slug;
  if (catSel) catSel.value = post.type === 'tip' ? 'tips' : 'culture';
  if (titleInput) titleInput.value = '';
  if (bodyInput) bodyInput.value = post.body || '';
  titleInput?.focus();

  // Switch to wiki zone
  document.querySelectorAll('.zone').forEach(s => s.toggleAttribute('data-active', s.dataset.zone === 'wiki'));
  document.querySelectorAll('.nav-tabs button, .mobile-nav button').forEach(b =>
    b.setAttribute('aria-current', b.dataset.zone === 'wiki' ? 'true' : 'false'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('Fill in a title and adjust the category, then submit', 'gold');
}

function setupWikiCompose() {
  const toggle = document.getElementById('btnWikiCompose');
  const form = document.getElementById('wikiComposeForm');
  const submit = document.getElementById('wikiNewSubmit');
  const cancel = document.getElementById('wikiNewCancel');

  const partnerSel = document.getElementById('wikiNewPartner');
  if (partnerSel) {
    partnerSel.innerHTML = partners.map(p => `<option value="${p.slug}">${p.name}</option>`).join('');
  }
  const catSel = document.getElementById('wikiNewCategory');
  if (catSel) {
    catSel.innerHTML = cats.filter(c => c !== 'all').map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('');
  }

  if (toggle && form) toggle.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to contribute'); return; }
    form.hidden = !form.hidden;
    if (!form.hidden) document.getElementById('wikiNewTitle')?.focus();
  });
  if (cancel && form) cancel.addEventListener('click', () => { form.hidden = true; });
  if (submit) submit.addEventListener('click', () => {
    const partner = document.getElementById('wikiNewPartner')?.value;
    const category = document.getElementById('wikiNewCategory')?.value;
    const title = document.getElementById('wikiNewTitle')?.value?.trim();
    const body = document.getElementById('wikiNewBody')?.value?.trim();
    if (!title || !body) { showToast('Fill in the title and body'); return; }
    const user = getUser();
    entries.unshift({
      id: 'w' + Date.now(), partner, category, title, body,
      semester: semester.code,
      who: user?.displayName || 'Anonymous',
      upvotes: 0,
    });
    render();
    document.getElementById('wikiNewTitle').value = '';
    document.getElementById('wikiNewBody').value = '';
    form.hidden = true;
    showToast('Wiki entry added', 'success');
  });
}

function render() {
  const c = document.getElementById('wikiList');
  if (!c) return;
  const f = entries.filter(e =>
    (activePart === 'all' || e.partner === activePart) &&
    (activeCat === 'all' || e.category === activeCat) &&
    (activeSem === 'all' || e.semester === activeSem)
  ).sort((a,b) => b.upvotes - a.upvotes);
  if (!f.length) {
    c.innerHTML = '<div class="empty-state"><div class="icon">📖</div><h4>No entries found</h4><p>Try changing the filters, or share an insight to seed the wiki.</p></div>';
    return;
  }
  c.innerHTML = f.map((e,i) => `<div class="wiki-entry" style="animation-delay:${i*0.04}s">
    <div class="cat-label">${escapeHtml(e.category)}</div>
    <div class="entry-title">${escapeHtml(e.title)}</div>
    <div class="entry-body">${escapeHtml(e.body)}</div>
    <div class="entry-meta">
      <span>${partners.find(p=>p.slug===e.partner)?.name||''}</span>
      <span>${e.semester}</span>
      <span>${escapeHtml(e.who)}</span>
      <span class="upvote" data-id="${e.id}">▲ ${e.upvotes}</span>
    </div>
  </div>`).join('');
  c.querySelectorAll('.upvote').forEach(el => el.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to upvote'); return; }
    const entry = entries.find(e => e.id === el.dataset.id);
    if (entry) { entry.upvotes++; el.textContent = `▲ ${entry.upvotes}`; }
  }));
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
