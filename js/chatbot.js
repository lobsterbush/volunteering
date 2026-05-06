/**
 * VOLUNTEER//HUB — Fortnightly Reflection Chatbot
 * 7-turn guided conversations that adapt follow-up questions
 * based on keyword/sentiment detection in student responses.
 */

import { questionBanks, currentFortnight, semester } from './data.js';
import { isSignedIn, getUser } from './auth.js';
import { showToast } from './app.js';

let activeSession = null; // { fortnight, turnIndex, turns: [] }
let completedFortnights = new Set(); // Track completed reflections

/* ── Keyword maps for branch selection ── */
const branchKeywords = {
  challenge:   ['hard','difficult','struggle','tough','frustrated','confus','overwhelm','challenge','problem','stress'],
  person:      ['name','person','staff','manager','coordinator','anwar','colleague','mentor','friend','team member'],
  surprise:    ['surprise','unexpected','didn\'t expect','shocked','amazed','wow','never thought'],
  positive:    ['better','great','amazing','loved','wonderful','exceeded','fantastic','enjoy','happy'],
  negative:    ['worse','disappoint','frustrat','boring','bad','annoying','difficult','not what'],
  neutral:     ['same','expected','pretty much','as I thought','normal','fine','okay'],
  routine:     ['routine','same thing','every day','pattern','structure','schedule','regular'],
  chaotic:     ['different','never know','unpredictable','varies','chaos','random','changes'],
  skills:      ['skill','learn','ability','technique','method','practice','competent','improve'],
  social:      ['people','awkward','clique','left out','social','fit in','belong','connect'],
  technical:   ['tool','system','software','machine','equipment','process','procedure','protocol'],
  soft:        ['communicate','empathy','patience','listen','teamwork','flexible','adapt'],
  yes:         ['yes','yeah','definitely','absolutely','i have','i did','took on'],
  no:          ['no','not really','haven\'t','not yet','same as before','nothing new'],
  conflict:    ['conflict','argument','disagree','tension','confrontation','clash','fight'],
  emotional:   ['sad','cry','emotional','heartbreak','moved','upset','heavy','painful','grief'],
  big:         ['big','significant','major','huge','real difference','changed','transformed'],
  small:       ['small','little','minor','tiny bit','not sure if','subtle','modest'],
  unsure:      ['unsure','don\'t know','hard to tell','maybe','not certain','who knows'],
  achievement: ['accomplish','achieve','complete','finish','milestone','proud of doing','built'],
  growth:      ['grew','growth','changed','develop','became','evolv','transform','matur'],
};

/* ── Detect best branch ── */
function detectBranch(text, branches) {
  const lower = text.toLowerCase();
  let bestMatch = 'default';
  let bestScore = 0;

  for (const [branch, keywords] of Object.entries(branchKeywords)) {
    if (!(branch in branches)) continue;
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) { bestScore = score; bestMatch = branch; }
  }

  /* Short response → probe deeper */
  if (text.split(/\s+/).length < 8 && branches.default) {
    return 'default';
  }

  return bestMatch;
}

/* ── Public API ── */
export function initChatbot() {
  renderFortnightGrid();
  setupChatInput();

  const startBtn = document.getElementById('btnStartReflection');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (!isSignedIn()) { showToast('Sign in to start a reflection'); return; }
      startSession(currentFortnight());
    });
  }
}

/* ── Fortnight Grid ── */
function renderFortnightGrid() {
  const grid = document.getElementById('fortnightGrid');
  if (!grid) return;

  const current = currentFortnight();
  grid.innerHTML = questionBanks.map(bank => {
    let cls = 'fn-badge';
    if (completedFortnights.has(bank.fortnight)) cls += ' complete';
    else if (bank.fortnight === current) cls += ' active';
    else if (bank.fortnight > current) cls += ' locked';

    return `
      <div class="${cls}" data-fn="${bank.fortnight}">
        <span class="fn-num">F${bank.fortnight}</span>
        ${bank.weeks}
      </div>`;
  }).join('');

  grid.querySelectorAll('.fn-badge:not(.locked)').forEach(el => {
    el.addEventListener('click', () => {
      const fn = parseInt(el.dataset.fn);
      if (completedFortnights.has(fn)) {
        showToast(`Fortnight ${fn} already completed`);
        return;
      }
      if (isSignedIn()) startSession(fn);
      else showToast('Sign in to start a reflection');
    });
  });
}

/* ── Start Session ── */
function startSession(fortnight) {
  const bank = questionBanks.find(b => b.fortnight === fortnight);
  if (!bank) return;

  activeSession = { fortnight, turnIndex: 0, turns: [], bank };

  const chatWindow = document.getElementById('chatWindow');
  const chatInput  = document.getElementById('chatInputRow');
  const startBtn   = document.getElementById('btnStartReflection');

  if (chatWindow) { chatWindow.hidden = false; chatWindow.innerHTML = ''; }
  if (chatInput)  chatInput.hidden = false;
  if (startBtn)   startBtn.style.display = 'none';

  updateTurnCounter();
  botSays(bank.questions[0].text, 0);
}

/* ── Bot message ── */
function botSays(text, turnIndex) {
  const chatWindow = document.getElementById('chatWindow');
  if (!chatWindow) return;

  /* Typing indicator */
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatWindow.appendChild(typing);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = `<span class="turn-label">Reflection · Turn ${turnIndex + 1} of 7</span>${text}`;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 800 + Math.random() * 600);
}

/* ── Student response ── */
function handleStudentResponse(text) {
  if (!activeSession || !text.trim()) return;

  const chatWindow = document.getElementById('chatWindow');
  const turn = activeSession.turnIndex;

  /* Add student bubble */
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble student';
  bubble.innerHTML = `<span class="turn-label">You · Turn ${turn + 1}</span>${escapeHtml(text)}`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  /* Save turn */
  activeSession.turns.push(
    { role: 'bot', text: activeSession.bank.questions[turn].text },
    { role: 'student', text }
  );

  activeSession.turnIndex++;
  updateTurnCounter();

  /* Check if session complete */
  if (activeSession.turnIndex >= 7) {
    completeSession();
    return;
  }

  /* Select next question with adaptive branching */
  const nextQ = activeSession.bank.questions[activeSession.turnIndex];
  const branch = detectBranch(text, nextQ.branches);
  const adapted = nextQ.branches[branch] || nextQ.branches.default || nextQ.text;

  botSays(adapted, activeSession.turnIndex);
}

/* ── Complete session ── */
function completeSession() {
  const chatWindow = document.getElementById('chatWindow');
  const chatInput  = document.getElementById('chatInputRow');
  const startBtn   = document.getElementById('btnStartReflection');

  completedFortnights.add(activeSession.fortnight);

  setTimeout(() => {
    const summary = document.createElement('div');
    summary.className = 'chat-bubble bot';
    summary.innerHTML = `<span class="turn-label">Session Complete</span>
      Thank you for completing your Fortnight ${activeSession.fortnight} reflection.
      Your responses have been saved. You can review them in your scrapbook at the end of the semester.`;
    chatWindow.appendChild(summary);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (chatInput) chatInput.hidden = true;
    if (startBtn) {
      startBtn.style.display = '';
      startBtn.textContent = 'REFLECTION COMPLETE ✓';
      startBtn.disabled = true;
    }

    renderFortnightGrid();
    showToast(`Fortnight ${activeSession.fortnight} reflection saved`, 'success');
    activeSession = null;
    updateTurnCounter();
  }, 1200);
}

/* ── Chat input setup ── */
function setupChatInput() {
  const input = document.getElementById('chatInput');
  const send  = document.getElementById('chatSend');

  function submit() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleStudentResponse(text);
  }

  if (send) send.addEventListener('click', submit);
  if (input) input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  });
}

/* ── Turn counter ── */
function updateTurnCounter() {
  const el = document.getElementById('turnCounter');
  if (!el) return;
  if (activeSession) {
    el.textContent = `Turn ${activeSession.turnIndex + 1} of 7 · Fortnight ${activeSession.fortnight}: ${activeSession.bank.theme}`;
  } else {
    el.textContent = '';
  }
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
