/**
 * VOLUNTEER HUB — Reflection Chatbot
 * Gemini-powered adaptive 7-turn conversations.
 * Falls back to structured prompts when no API key is set.
 */
import { questionBanks, currentFortnight, partners } from './data.js';
import { isSignedIn, getUser } from './auth.js';
import { showToast } from './app.js';
import { getGeminiKey } from './firebase-config.js';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const MAX_TURNS = 7;

let session = null;
let completedFortnights = new Set();

const SYSTEM_PROMPT = `You are a warm, perceptive reflection facilitator for a university volunteering program (MON2000, Monash University). Students spend an entire 12-week semester embedded at one partner organisation.

Your role:
- Guide a structured 7-turn reflection conversation about the student's recent volunteer experience
- Be genuinely curious, empathetic, and specific — never generic or formulaic
- Ask one clear question per turn. Follow up on what the student actually says.
- If they mention a person, ask about that relationship. If they mention a challenge, explore it. If they give a short answer, gently probe deeper.
- Adapt your language to match the student's tone — informal if they're casual, more thoughtful if they're reflective
- On turn 7, provide a warm closing summary that names specific things they shared
- Never be preachy. Never use bullet points. Keep responses to 2-3 sentences.
- Do NOT number your questions or mention "Turn X of 7"`;

export function initChatbot() {
  renderFortnightGrid();
  setupChatInput();
  updateGeminiStatus();
  const btn = document.getElementById('btnStartReflection');
  if (btn) btn.addEventListener('click', () => {
    if (!isSignedIn()) { showToast('Sign in to start a reflection'); return; }
    startSession(currentFortnight());
  });
}

/** Update the Gemini status pill in the Reflect zone. */
export function updateGeminiStatus() {
  const el = document.getElementById('geminiStatus');
  if (!el) return;
  const active = !!getGeminiKey();
  el.className = `gemini-status ${active ? 'on' : 'off'}`;
  el.textContent = active ? '✦ Gemini active' : 'Gemini not configured';
}

function renderFortnightGrid() {
  const grid = document.getElementById('fortnightGrid');
  if (!grid) return;
  const current = currentFortnight();
  grid.innerHTML = questionBanks.map(b => {
    let cls = 'fn-badge';
    if (completedFortnights.has(b.fortnight)) cls += ' complete';
    else if (b.fortnight === current) cls += ' active';
    else if (b.fortnight > current) cls += ' locked';
    return `<div class="${cls}" data-fn="${b.fortnight}"><span class="fn-num">F${b.fortnight}</span><span class="fn-label">${b.weeks}</span></div>`;
  }).join('');

  grid.querySelectorAll('.fn-badge:not(.locked)').forEach(el => {
    el.addEventListener('click', () => {
      const fn = +el.dataset.fn;
      if (completedFortnights.has(fn)) { showToast('Already completed'); return; }
      if (isSignedIn()) startSession(fn); else showToast('Sign in first');
    });
  });
}

function startSession(fortnight) {
  const bank = questionBanks.find(b => b.fortnight === fortnight);
  if (!bank) return;
  const user = getUser();
  session = { fortnight, turnIndex: 0, history: [], bank, userName: user?.displayName || 'there' };

  const win = document.getElementById('chatWindow');
  const input = document.getElementById('chatInputRow');
  const btn = document.getElementById('btnStartReflection');
  if (win) { win.hidden = false; win.innerHTML = ''; }
  if (input) input.hidden = false;
  if (btn) btn.style.display = 'none';
  updateCounter();

  const opener = `Hi ${session.userName.split(' ')[0]}! This is your Fortnight ${fortnight} reflection — "${bank.theme}." Let's talk about the last two weeks at your placement. ${getOpener(fortnight)}`;
  botSays(opener);
}

function getOpener(fn) {
  const openers = {
    1: 'Tell me about your first impressions — what stood out to you when you arrived at your placement?',
    2: 'Has a routine started to form? Walk me through what a recent session looked like.',
    3: 'You\'re at the halfway mark. What skills have you developed that you didn\'t expect?',
    4: 'You\'re past halfway now. Have you taken on anything new recently?',
    5: 'With just a few weeks left — what difference do you think your work has made?',
    6: 'This is your final reflection. Looking back at the full 12 weeks, what are you most proud of?',
  };
  return openers[fn] || 'What\'s been on your mind about your placement lately?';
}

function botSays(text) {
  const win = document.getElementById('chatWindow');
  if (!win) return;
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  win.appendChild(typing);
  win.scrollTop = win.scrollHeight;

  const delay = getGeminiKey() ? 600 + Math.random() * 400 : 500;
  setTimeout(() => {
    typing.remove();
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    const label = session.turnIndex === MAX_TURNS ? 'Session complete' : `Turn ${session.turnIndex + 1} of ${MAX_TURNS}`;
    bubble.innerHTML = `<span class="turn-label">${label}</span>${text}`;
    win.appendChild(bubble);
    win.scrollTop = win.scrollHeight;
  }, delay);
}

async function handleResponse(text) {
  if (!session || !text.trim()) return;
  const win = document.getElementById('chatWindow');

  // Student bubble
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble student';
  bubble.innerHTML = `<span class="turn-label">You</span>${escapeHtml(text)}`;
  win.appendChild(bubble);
  win.scrollTop = win.scrollHeight;

  session.history.push({ role: 'user', parts: [{ text }] });
  session.turnIndex++;
  updateCounter();

  if (session.turnIndex >= MAX_TURNS) { completeSession(); return; }

  // Generate next question
  const nextQ = await generateNext(text);
  session.history.push({ role: 'model', parts: [{ text: nextQ }] });
  botSays(nextQ);
}

async function generateNext(studentText) {
  const apiKey = getGeminiKey();
  if (!apiKey) return getFallbackQuestion(studentText);

  try {
    const turnContext = `This is turn ${session.turnIndex + 1} of ${MAX_TURNS}. ${session.turnIndex === MAX_TURNS - 1 ? 'This is the final turn — give a warm closing summary.' : ''}`;
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: `${SYSTEM_PROMPT}\n\nFortnightly theme: "${session.bank.theme}" — ${session.bank.prompt}\n\n${turnContext}` }] },
        contents: session.history,
        generationConfig: { temperature: 0.8, maxOutputTokens: 200 },
      }),
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackQuestion(studentText);
  } catch (e) {
    console.warn('[Chatbot] Gemini call failed:', e);
    return getFallbackQuestion(studentText);
  }
}

function getFallbackQuestion(studentText) {
  const lower = studentText.toLowerCase();
  if (lower.length < 40) return 'Can you tell me more about that? I\'d love to hear the details.';
  if (/hard|difficult|struggle|tough|challenge/.test(lower)) return 'That sounds like it was challenging. How did you work through it?';
  if (/person|name|staff|coordinator|anwar|mentor/.test(lower)) return 'It sounds like that person made an impression. What did you learn from them?';
  if (/surprise|unexpected|didn.t expect/.test(lower)) return 'That\'s interesting — why do you think that caught you off guard?';
  if (/learn|skill|develop|improve/.test(lower)) return 'That\'s a valuable skill. Do you see yourself using it beyond this placement?';
  const generic = [
    'What made that moment stick with you?',
    'How has that shaped the way you approach your time there now?',
    'If you could tell a future volunteer about that, what would you say?',
    'How does that connect to what you expected going in?',
  ];
  return generic[session.turnIndex % generic.length];
}

function completeSession() {
  completedFortnights.add(session.fortnight);
  const closing = session.history.length > 2
    ? 'Thank you for sharing so openly. Your reflections from this fortnight have been saved and will appear in your scrapbook at the end of the semester.'
    : 'Thank you for completing this reflection. Your responses have been saved.';

  setTimeout(() => {
    botSays(closing);
    const input = document.getElementById('chatInputRow');
    const btn = document.getElementById('btnStartReflection');
    if (input) input.hidden = true;
    if (btn) { btn.style.display = ''; btn.textContent = 'Reflection complete ✓'; btn.disabled = true; }
    renderFortnightGrid();
    showToast(`Fortnight ${session.fortnight} reflection saved`, 'success');
    session = null;
    updateCounter();
  }, 800);
}

function setupChatInput() {
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const submit = () => { if (!input) return; const t = input.value.trim(); if (!t) return; input.value = ''; handleResponse(t); };
  if (send) send.addEventListener('click', submit);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
}

function updateCounter() {
  const el = document.getElementById('turnCounter');
  if (!el) return;
  el.textContent = session ? `Turn ${session.turnIndex + 1} of ${MAX_TURNS} · ${session.bank.theme}` : '';
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
