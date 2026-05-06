import { partners } from './data.js';

const coords = {
  'st-kilda-mums': [145.005,-37.8675], 'sisterworks': [144.897,-37.800],
  'foodfilled': [144.9605,-37.770], 'msa-wholefoods': [145.1362,-37.9105],
  'dixon-house': [145.240,-37.9856],
};

export function initMap() {
  if (typeof maplibregl === 'undefined') return;
  const container = document.getElementById('partnerMap');
  if (!container) return;

  const map = new maplibregl.Map({
    container, style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: [145.05, -37.86], zoom: 10, interactive: true, attributionControl: false,
  });
  map.on('load', () => {
    partners.forEach(p => {
      const el = document.createElement('div');
      el.className = 'marker-dot';
      el.title = p.name;
      new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(coords[p.slug] || [145,-37.8]).addTo(map);
    });
  });
}
