import { initAuth } from './auth.js';
import { initMap } from './map.js';
import { initBulletin, setWikiPromoter } from './bulletin.js';
import { initWiki, promoteToWiki } from './wiki.js';
import { initChatbot } from './chatbot.js';

export function showToast(msg, type = '') {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`; t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.classList.add('out'), 3000);
  setTimeout(() => t.remove(), 3400);
}

function initZones() {
  const zones = document.querySelectorAll('.zone');
  const go = zone => {
    zones.forEach(s => s.toggleAttribute('data-active', s.dataset.zone === zone));
    document.querySelectorAll('.nav-tabs button, .mobile-nav button').forEach(b =>
      b.setAttribute('aria-current', b.dataset.zone === zone ? 'true' : 'false'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.querySelectorAll('.nav-tabs button, .mobile-nav button').forEach(b =>
    b.addEventListener('click', () => go(b.dataset.zone)));
}

async function boot() {
  initZones();
  await initAuth();
  initMap();
  initBulletin();
  initWiki();
  setWikiPromoter(promoteToWiki);
  initChatbot();
  console.log('[App] Booted');
}

// Modules with top-level await can finish AFTER DOMContentLoaded fires,
// so check readyState instead of relying on the event.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
