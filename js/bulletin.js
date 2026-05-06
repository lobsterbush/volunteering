import { mockPosts, postTypes, partners, semester } from './data.js';
import { getUser, isSignedIn } from './auth.js';
import { showToast } from './app.js';

let posts = [];
let activeTypeFilter = 'all';
let activePartnerFilter = 'all';

/** Callback set by app.js so bulletin can trigger wiki promotion. */
let onPromoteToWiki = null;
export function setWikiPromoter(fn) { onPromoteToWiki = fn; }

export function initBulletin() {
  posts = [...mockPosts];
  renderFilters();
  renderPosts();
  setupCompose();
}

function renderFilters() {
  const c = document.getElementById('boardFilters');
  if (!c) return;
  c.innerHTML = [
    `<button class="filter-btn" data-f="all" aria-pressed="true">All</button>`,
    ...postTypes.map(t => `<button class="filter-btn" data-f="${t.value}" aria-pressed="false">${t.label}</button>`),
    `<span class="filter-sep"></span>`,
    `<select class="filter-partner" id="boardPartnerFilter">
      <option value="all">All partners</option>
      ${partners.map(p => `<option value="${p.slug}">${p.name}</option>`).join('')}
    </select>`,
  ].join('');

  c.addEventListener('click', e => {
    const b = e.target.closest('.filter-btn');
    if (!b) return;
    activeTypeFilter = b.dataset.f;
    c.querySelectorAll('.filter-btn').forEach(x => x.setAttribute('aria-pressed', x.dataset.f === activeTypeFilter));
    renderPosts();
  });
  document.getElementById('boardPartnerFilter')?.addEventListener('change', e => {
    activePartnerFilter = e.target.value;
    renderPosts();
  });
}

function renderPosts() {
  const c = document.getElementById('boardFeed');
  if (!c) return;
  const filtered = posts.filter(p =>
    (activeTypeFilter === 'all' || p.type === activeTypeFilter) &&
    (activePartnerFilter === 'all' || p.partner === activePartnerFilter)
  );
  if (!filtered.length) {
    c.innerHTML = '<div class="empty-state"><div class="icon">💬</div><h4>No posts yet</h4><p>Share a reflection, insight, or question about your placement.</p></div>';
    return;
  }
  c.innerHTML = filtered.map((p, i) => {
    const pt = postTypes.find(t => t.value === p.type);
    const pName = partners.find(x => x.slug === p.partner)?.name || '';
    const canPromote = (p.type === 'insight' || p.type === 'tip');
    return `<div class="post-card" style="animation-delay:${i*0.05}s">
      <span class="post-type ${pt?.cls || ''}">${pt?.label || p.type}</span>
      <div class="post-body">${escapeHtml(p.body)}</div>
      ${p.replies.length ? `<div class="replies">${p.replies.map(r => `<div class="reply"><strong>${escapeHtml(r.who)}</strong> ${escapeHtml(r.body)}</div>`).join('')}</div>` : ''}
      <div class="post-meta">
        <span class="author">${escapeHtml(p.who)}</span>
        <span>${pName}</span>
        <span>Week ${p.week}</span>
        ${canPromote ? `<button class="promote-btn" data-id="${p.id}" title="Add to partner wiki">📖 Wiki</button>` : ''}
        <button class="reply-btn" data-id="${p.id}">↩ Reply</button>
        <button class="spark-btn" data-id="${p.id}">♡ ${p.sparks}</button>
      </div>
      <div class="reply-form" data-reply-for="${p.id}" hidden>
        <input type="text" class="reply-input" placeholder="Write a reply…">
        <button class="reply-submit">Send</button>
      </div>
    </div>`;
  }).join('');

  // Spark reactions
  c.querySelectorAll('.spark-btn').forEach(el => el.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to react'); return; }
    const post = posts.find(p => p.id === el.dataset.id);
    if (post) { post.sparks++; el.textContent = `♡ ${post.sparks}`; }
  }));

  // Reply toggle
  c.querySelectorAll('.reply-btn').forEach(el => el.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to reply'); return; }
    const form = c.querySelector(`.reply-form[data-reply-for="${el.dataset.id}"]`);
    if (form) { form.hidden = !form.hidden; if (!form.hidden) form.querySelector('.reply-input')?.focus(); }
  }));

  // Reply submit
  c.querySelectorAll('.reply-submit').forEach(el => el.addEventListener('click', () => {
    const form = el.closest('.reply-form');
    const input = form?.querySelector('.reply-input');
    const text = input?.value?.trim();
    if (!text) return;
    const postId = form.dataset.replyFor;
    const post = posts.find(p => p.id === postId);
    const user = getUser();
    if (post) {
      post.replies.push({ who: user?.displayName || 'Anonymous', body: text });
      renderPosts();
      showToast('Reply added', 'success');
    }
  }));

  // Promote to wiki
  c.querySelectorAll('.promote-btn').forEach(el => el.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in first'); return; }
    const post = posts.find(p => p.id === el.dataset.id);
    if (post && onPromoteToWiki) onPromoteToWiki(post);
  }));
}

function setupCompose() {
  const toggle = document.getElementById('btnCompose');
  const form = document.getElementById('composeForm');
  const submit = document.getElementById('btnPostSubmit');

  // Populate partner selector in compose form
  const partnerSel = document.getElementById('postPartner');
  if (partnerSel) {
    partnerSel.innerHTML = partners.map(p => `<option value="${p.slug}">${p.name}</option>`).join('');
  }

  if (toggle && form) toggle.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to post'); return; }
    form.hidden = !form.hidden;
  });
  if (submit) submit.addEventListener('click', () => {
    const type = document.getElementById('postType')?.value || 'reflection';
    const partner = document.getElementById('postPartner')?.value || partners[0].slug;
    const body = document.getElementById('postBody')?.value?.trim();
    if (!body) { showToast('Write something first'); return; }
    const user = getUser();
    posts.unshift({
      id: 'p' + Date.now(), type, body,
      who: user?.displayName || 'Anonymous',
      partner, week: semester.currentWeek,
      sparks: 0, replies: [],
    });
    renderPosts();
    document.getElementById('postBody').value = '';
    form.hidden = true;
    showToast('Post shared', 'success');
    if (type === 'insight' || type === 'tip') {
      showToast('Tip: use the 📖 Wiki button on your post to add it to the partner wiki', 'gold');
    }
  });
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
