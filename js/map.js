/**
 * VOLUNTEER//HUB — Map Module
 * MapLibre GL JS with CARTO Positron basemap and partner markers.
 */

import { partners } from './data.js';

let activePartnerIndex = 0;
let onSelectCallback = null;

export function initMap(onSelect) {
  onSelectCallback = onSelect;

  if (typeof maplibregl === 'undefined') {
    console.warn('[Map] MapLibre GL not loaded');
    return;
  }

  const map = new maplibregl.Map({
    container: 'maplibre-map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: [145.05, -37.86],
    zoom: 10.1,
    interactive: true,
    attributionControl: false,
  });

  map.on('load', () => {
    partners.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'marker' + (i === 0 ? ' active' : '');
      el.dataset.org = String(i);
      el.innerHTML =
        `<span class="ring"${i > 0 ? ` style="animation-delay:-${(i * 0.3).toFixed(1)}s"` : ''}></span>` +
        '<span class="dot"></span>' +
        `<span class="label">${p.name}</span>`;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setActive(i);
      });

      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(p.coords)
        .addTo(map);
    });
  });
}

export function setActive(index) {
  activePartnerIndex = index;
  document.querySelectorAll('.marker').forEach(m =>
    m.classList.toggle('active', +m.dataset.org === index));

  renderPartnerCard(index);
  if (onSelectCallback) onSelectCallback(index);
}

function renderPartnerCard(i) {
  const card = document.getElementById('partnerCard');
  if (!card) return;
  const p = partners[i];

  card.querySelector('h3').textContent = p.name;
  card.querySelector('.role').textContent = p.role;
  card.querySelector('.meta-row').innerHTML = p.chips.map((c, idx) =>
    `<span class="chip ${idx === 0 ? 'access' : ''}">${c}</span>`).join('');
  card.querySelector('.pulse-info').innerHTML =
    `<span class="pulse-dot"></span><span>${p.pulse}</span>`;
}
