import { mockPosts, postTypes, partners, semester } from './data.js';
import { getUser, isSignedIn } from './auth.js';
import { showToast } from './app.js';

let posts = [];
let activeFilter = 'all';

export function initBulletin() {
  posts = [...mockPosts];
  renderFilters();
  renderPosts();
  setupCompose();
}

function renderFilters() {
  const c = document.getElementById('boardFilters');
  if (!c) return;
  c.innerHTML = [`<button class="filter-btn" data-f="all" aria-pressed="true">All</button>`,
    ...postTypes.map(t => `<button class="filter-btn" data-f="${t.value}" aria-pressed="false">${t.label}</button>`)
  ].join('');
  c.addEventListener('click', e => {
    const b = e.target.closest('.filter-btn');
    if (!b) return;
    activeFilter = b.dataset.f;
    c.querySelectorAll('.filter-btn').forEach(x => x.setAttribute('aria-pressed', x.dataset.f === activeFilter));
    renderPosts();
  });
}

function renderPosts() {
  const c = document.getElementById('boardFeed');
  if (!c) return;
  const filtered = posts.filter(p => activeFilter === 'all' || p.type === activeFilter);
  if (!filtered.length) {
    c.innerHTML = '<div class="empty-state"><div class="icon">💬</div><h4>No posts yet</h4><p>Share a reflection, insight, or question about your placement.</p></div>';
    return;
  }
  c.innerHTML = filtered.map((p, i) => {
    const pt = postTypes.find(t => t.value === p.type);
    const pName = partners.find(x => x.slug === p.partner)?.name || '';
    return `<div class="post-card" style="animation-delay:${i*0.05}s">
      <span class="post-type ${pt?.cls || ''}">${pt?.label || p.type}</span>
      <div class="post-body">${p.body}</div>
      ${p.replies.length ? `<div class="replies">${p.replies.map(r => `<div class="reply"><strong>${r.who}</strong> ${r.body}</div>`).join('')}</div>` : ''}
      <div class="post-meta">
        <span class="author">${p.who}</span>
        <span>${pName}</span>
        <span>Week ${p.week}</span>
        <button class="spark-btn" data-id="${p.id}">♡ ${p.sparks}</button>
      </div>
    </div>`;
  }).join('');

  c.querySelectorAll('.spark-btn').forEach(el => el.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to react'); return; }
    const post = posts.find(p => p.id === el.dataset.id);
    if (post) { post.sparks++; el.textContent = `♡ ${post.sparks}`; }
  }));
}

function setupCompose() {
  const toggle = document.getElementById('btnCompose');
  const form = document.getElementById('composeForm');
  const submit = document.getElementById('btnPostSubmit');
  if (toggle && form) toggle.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to post'); return; }
    form.hidden = !form.hidden;
  });
  if (submit) submit.addEventListener('click', () => {
    const type = document.getElementById('postType')?.value || 'reflection';
    const body = document.getElementById('postBody')?.value?.trim();
    if (!body) { showToast('Write something first'); return; }
    const user = getUser();
    const pt = postTypes.find(t => t.value === type);
    posts.unshift({
      id: 'p' + Date.now(), type, body,
      who: user?.displayName || 'Anonymous',
      partner: 'st-kilda-mums', week: semester.currentWeek,
      sparks: 0, replies: [],
    });
    renderPosts();
    document.getElementById('postBody').value = '';
    form.hidden = true;
    showToast('Post shared', 'success');
    if (type === 'insight' || type === 'tip') showToast('This could be added to the partner wiki', 'gold');
  });
}
