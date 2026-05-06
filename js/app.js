import { initAuth } from './auth.js';
import { initMap } from './map.js';
import { initBulletin } from './bulletin.js';
import { initWiki } from './wiki.js';
import { initChatbot, updateGeminiStatus } from './chatbot.js';
import { getGeminiKey, setGeminiKey } from './firebase-config.js';

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

function initSettings() {
  const btn = document.getElementById('btnSettings');
  const modal = document.getElementById('settingsModal');
  const close = document.getElementById('settingsClose');
  const keyInput = document.getElementById('geminiKeyInput');
  const save = document.getElementById('geminiKeySave');
  const clear = document.getElementById('geminiKeyClear');
  if (!btn || !modal) return;

  const open = () => { if (keyInput) keyInput.value = getGeminiKey(); modal.hidden = false; };
  btn.addEventListener('click', open);
  close?.addEventListener('click', () => modal.hidden = true);
  modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });

  save?.addEventListener('click', () => {
    const k = keyInput?.value.trim();
    if (!k) { showToast('Enter a valid API key'); return; }
    setGeminiKey(k);
    updateGeminiStatus();
    modal.hidden = true;
    showToast('Gemini API key saved', 'success');
  });
  clear?.addEventListener('click', () => {
    setGeminiKey('');
    if (keyInput) keyInput.value = '';
    updateGeminiStatus();
    modal.hidden = true;
    showToast('Gemini API key removed');
  });
}

async function boot() {
  initZones();
  initSettings();
  await initAuth();
  initMap();
  initBulletin();
  initWiki();
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
