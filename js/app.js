/**
 * VOLUNTEER//HUB — App Core
 * Zone switching, toasts, SOS countdown, and module orchestration.
 */

import { initAuth } from './auth.js';
import { initMap } from './map.js';
import { initBulletin } from './bulletin.js';
import { initWiki } from './wiki.js';
import { initChatbot } from './chatbot.js';

/* ================================================================
   TOAST SYSTEM
   ================================================================ */
export function showToast(message, type = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => { toast.classList.add('out'); }, 3000);
  setTimeout(() => { toast.remove(); }, 3400);
}

/* ================================================================
   ZONE SWITCHING
   ================================================================ */
function initZones() {
  const zones = document.querySelectorAll('section.zone');
  function go(zone) {
    zones.forEach(s => s.toggleAttribute('data-active', s.dataset.zone === zone));
    document.querySelectorAll('nav.zones button, footer.tabs button').forEach(b => {
      b.setAttribute('aria-current', b.dataset.zone === zone ? 'true' : 'false');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('nav.zones button, footer.tabs button').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.zone));
  });
}

/* ================================================================
   SUB-TAB SWITCHING (Wall zone)
   ================================================================ */
function initSubTabs() {
  document.querySelectorAll('.sub-tabs').forEach(nav => {
    const container = nav.closest('.zone') || document.body;
    const subZones = container.querySelectorAll('.sub-zone');

    nav.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.sub;
        subZones.forEach(s => s.toggleAttribute('data-active', s.dataset.sub === target));
        nav.querySelectorAll('button').forEach(b =>
          b.setAttribute('aria-current', b.dataset.sub === target ? 'true' : 'false'));
      });
    });
  });
}

/* ================================================================
   SOS COUNTDOWN
   ================================================================ */
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  const start = Date.now() + (2 * 3600 + 18 * 60 + 42) * 1000;
  setInterval(() => {
    const diff = Math.max(0, start - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

/* ================================================================
   JOIN TOGGLE
   ================================================================ */
function initJoinToggles() {
  document.querySelectorAll('.me-too').forEach(b => {
    b.addEventListener('click', () => {
      if (b.textContent.trim() === 'JOIN') {
        b.textContent = 'IN ✓';
        b.style.background = 'var(--riso)';
        b.style.color = 'var(--ink)';
      } else {
        b.textContent = 'JOIN';
        b.style.background = 'var(--paper)';
        b.style.color = 'var(--ink)';
      }
    });
  });
}

/* ================================================================
   BOOTSTRAP
   ================================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  initZones();
  initSubTabs();
  initCountdown();
  initJoinToggles();

  /* Auth must init first (other modules depend on auth state) */
  await initAuth();

  /* Then init feature modules */
  initMap(() => {}); // onSelect callback placeholder
  initBulletin();
  initWiki();
  initChatbot();
});
