/**
 * VOLUNTEER//HUB — Bulletin Board
 * Interactive posting, filtering, replies, and spark reactions.
 * Runs on mock data in demo mode; Firestore in live mode.
 */

import { DEMO_MODE } from './firebase-config.js';
import { mockBulletinPosts, partners, semester } from './data.js';
import { getUser, isSignedIn } from './auth.js';
import { showToast } from './app.js';

let posts = [];
let activeFilter = 'all';
let activePartnerFilter = 'all';

/* ── Initialise ── */
export function initBulletin() {
  posts = [...mockBulletinPosts];
  renderFilters();
  renderPosts();
  setupComposeForm();
}

/* ── Filters ── */
function renderFilters() {
  const container = document.getElementById('bulletinFilters');
  if (!container) return;

  const types = ['all', 'insight', 'tip', 'question', 'carpool', 'swap', 'lost-found'];
  container.innerHTML = types.map(t =>
    `<button class="filter-chip" data-filter="${t}" aria-pressed="${t === 'all'}">${t === 'all' ? 'ALL' : t.toUpperCase().replace('-',' ')}</button>`
  ).join('');

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    container.querySelectorAll('.filter-chip').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.filter === activeFilter));
    renderPosts();
  });
}

/* ── Render Posts ── */
function renderPosts() {
  const container = document.getElementById('bulletinFeed');
  if (!container) return;

  const filtered = posts.filter(p => {
    if (activeFilter !== 'all' && p.type !== activeFilter) return false;
    if (activePartnerFilter !== 'all' && p.partner !== activePartnerFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">📋</div>
        <h4>NO POSTS YET</h4>
        <p>Be the first to share an insight, tip, or question about your placement.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map((p, i) => `
    <div class="bulletin-item" style="animation-delay:${i * 0.06}s" data-id="${p.id}">
      <span class="tag ${p.tagClass}">${p.tag}</span>
      ${p.sparks > 0 ? `<span class="spark-count" data-id="${p.id}">✦ ${p.sparks}</span>` : ''}
      <p>${p.body}</p>
      ${p.replies.length > 0 ? `
        <div class="replies">
          ${p.replies.map(r => `
            <div class="reply">
              <span class="who">${r.who}</span> ${r.body}
            </div>`).join('')}
        </div>` : ''}
      <div class="who">${p.who} · WK ${String(p.week).padStart(2,'0')} · ${partnerLabel(p.partner)}</div>
    </div>
  `).join('');

  /* Spark clicks */
  container.querySelectorAll('.spark-count').forEach(el => {
    el.addEventListener('click', () => {
      if (!isSignedIn()) { showToast('Sign in to spark a post'); return; }
      const post = posts.find(p => p.id === el.dataset.id);
      if (post) { post.sparks++; el.textContent = `✦ ${post.sparks}`; }
    });
  });
}

/* ── Compose Form ── */
function setupComposeForm() {
  const toggle = document.getElementById('btnCompose');
  const form   = document.getElementById('composeForm');
  const submit = document.getElementById('btnPostSubmit');

  if (toggle && form) {
    toggle.addEventListener('click', () => {
      if (!isSignedIn()) { showToast('Sign in to post'); return; }
      form.hidden = !form.hidden;
    });
  }

  if (submit) {
    submit.addEventListener('click', () => {
      const type    = document.getElementById('postType')?.value || 'insight';
      const partner = document.getElementById('postPartner')?.value || 'all';
      const body    = document.getElementById('postBody')?.value?.trim();
      if (!body) { showToast('Write something first'); return; }

      const tagMap = {
        'insight': { tag: 'INSIGHT', cls: 'gold' },
        'tip':     { tag: 'TIP', cls: 'gold' },
        'question':{ tag: 'ASK', cls: '' },
        'carpool': { tag: 'CARPOOL', cls: '' },
        'swap':    { tag: 'SHIFT SWAP', cls: '' },
        'lost-found': { tag: 'LOST & FOUND', cls: 'red' },
      };
      const tm = tagMap[type] || tagMap.insight;
      const user = getUser();

      const newPost = {
        id: 'p' + Date.now(),
        type,
        tag: tm.tag,
        tagClass: tm.cls,
        body,
        who: user ? `@${user.displayName.split(' ')[0].toLowerCase()}` : '@anonymous',
        week: semester.currentWeek,
        partner: partner === 'all' ? null : partner,
        sparks: 0,
        replies: [],
      };

      posts.unshift(newPost);
      renderPosts();
      document.getElementById('postBody').value = '';
      form.hidden = true;
      showToast('Post published', 'success');

      /* Offer wiki seed for insights/tips */
      if (type === 'insight' || type === 'tip') {
        showToast('Add this to the partner wiki? (coming soon)', 'gold');
      }
    });
  }
}

function partnerLabel(slug) {
  const p = partners.find(x => x.slug === slug);
  return p ? p.name : slug?.toUpperCase() || '';
}
