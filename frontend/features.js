/* ============================================
   PLACIDA — features.js
   Week 1 Features Logic — Sanchari
   Breathing Timer | Chatbot | Weekly Summary
   ============================================ */

/* ══════════════════════════════════════
   SECTION 1 — BREATHING TIMER (4-7-8)
   ══════════════════════════════════════ */

const BREATH_PHASES = [
  { label: 'Inhale', emoji: '🌬️', duration: 4, color: '#7c6af7' },
  { label: 'Hold', emoji: '🤚', duration: 7, color: '#5ec4b6' },
  { label: 'Exhale', emoji: '💨', duration: 8, color: '#f06b8b' },
];

let breathInterval = null;
let breathPhaseIdx = 0;
let breathCountdown = BREATH_PHASES[0].duration;
let breathCycles = 0;
let breathRunning = false;

function startBreathing() {
  if (breathRunning) return;
  breathRunning = true;
  breathPhaseIdx = 0;
  breathCountdown = BREATH_PHASES[0].duration;
  breathCycles = 0;

  updateBreathUI();
  setBreathStart();

  const btn = document.getElementById('breathBtn');
  if (btn) { btn.textContent = 'Stop Session'; btn.onclick = stopBreathing; }
}

function stopBreathing() {
  clearInterval(breathInterval);
  breathRunning = false;
  breathPhaseIdx = 0;
  breathCountdown = BREATH_PHASES[0].duration;

  const label = document.getElementById('breathLabel');
  const counter = document.getElementById('breathCounter');
  const circle = document.getElementById('breathCircle');
  const cycles = document.getElementById('breathCycles');
  const btn = document.getElementById('breathBtn');

  if (label) label.textContent = 'Ready when you are';
  if (counter) counter.textContent = '';
  if (circle) { circle.style.transform = 'scale(1)'; circle.style.boxShadow = '0 0 60px rgba(124,106,247,0.3)'; }
  if (cycles) cycles.textContent = '0 cycles completed';
  if (btn) { btn.textContent = 'Start Breathing'; btn.onclick = startBreathing; }
}

function setBreathStart() {
  breathInterval = setInterval(() => {
    breathCountdown--;
    updateBreathUI();

    if (breathCountdown <= 0) {
      breathPhaseIdx = (breathPhaseIdx + 1) % BREATH_PHASES.length;
      if (breathPhaseIdx === 0) breathCycles++;
      breathCountdown = BREATH_PHASES[breathPhaseIdx].duration;
    }
  }, 1000);
}

function updateBreathUI() {
  const phase = BREATH_PHASES[breathPhaseIdx];
  const label = document.getElementById('breathLabel');
  const counter = document.getElementById('breathCounter');
  const circle = document.getElementById('breathCircle');
  const cycles = document.getElementById('breathCycles');
  const phaseEl = document.getElementById('breathPhase');

  if (label) label.textContent = `${phase.emoji}  ${phase.label}`;
  if (counter) counter.textContent = breathCountdown + 's';
  if (cycles) cycles.textContent = `${breathCycles} cycle${breathCycles !== 1 ? 's' : ''} completed`;
  if (phaseEl) phaseEl.textContent = `Phase ${breathPhaseIdx + 1}/3`;

  if (circle) {
    if (phase.label === 'Inhale') {
      circle.style.transform = 'scale(1.35)';
      circle.style.boxShadow = `0 0 80px rgba(124,106,247,0.55)`;
    } else if (phase.label === 'Hold') {
      circle.style.transform = 'scale(1.35)';
      circle.style.boxShadow = `0 0 80px rgba(94,196,182,0.55)`;
    } else {
      circle.style.transform = 'scale(0.85)';
      circle.style.boxShadow = `0 0 60px rgba(240,107,139,0.45)`;
    }
    circle.style.borderColor = phase.color;
  }
}


/* ══════════════════════════════════════
   SECTION 2 — CHATBOT (Gemini AI + rule fallback)
   ══════════════════════════════════════ */

/* ⚠️  Replace with your free key from https://aistudio.google.com/app/apikey */
const GEMINI_KEY = 'AIzaSyBnIBJkfGh7vq7-DV7QzEesEA6u-7SIKLcE';

const GEMINI_SYSTEM = `You are Placida, a warm, empathetic AI mental wellness companion.
You help users with mood tracking, stress, anxiety, breathing, and emotional support.
RULES:
- Keep every reply SHORT — 2 to 4 sentences maximum.
- Write conversationally, like a caring friend, not a therapist.
- Never diagnose or replace professional help.
- If the user mentions self-harm or suicide, gently share: iCall 9152987821 (free, confidential).
- Use 1-2 emojis per reply at most.
- Vary your phrasing — never repeat the exact same opening twice.
- Naturally mention Placida features when relevant: breathing exercises (Breathe page), mood insights (Insights), journaling (Summary).`;

/* — No-repeat tracker — */
const recentBotReplies = [];
function trackReply(text) {
  recentBotReplies.push(text);
  if (recentBotReplies.length > 5) recentBotReplies.shift();
}
function pickUnique(arr) {
  const fresh = arr.filter(r => !recentBotReplies.includes(r));
  const pool = fresh.length ? fresh : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* — Conversation history for context — */
const chatHistory = [];

/* — Gemini API call — */
async function getGeminiResponse(userMessage) {
  if (!GEMINI_KEY || GEMINI_KEY.startsWith('YOUR_')) return null;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: GEMINI_SYSTEM }] },
          contents: [
            ...chatHistory.slice(-6).map(m => ({
              role: m.role === 'bot' ? 'model' : 'user',
              parts: [{ text: m.content }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
          ]
        })
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch { return null; }
}

/* — Rich rule-based fallback — */
const BOT_RULES = [
  {
    keys: ['hi', 'hello', 'hey', 'hii', 'helo', 'howdy', 'good morning', 'good evening', 'sup', 'yo'],
    replies: [
      "Hey there! 👋 How are you feeling today?",
      "Hello! I'm really glad you're here. What's on your mind?",
      "Hi! This is your safe space — how are you doing right now?",
      "Hey 😊 Hope you're doing okay. Tell me how things are going!"
    ]
  },
  {
    keys: ['anxious', 'anxiety', 'panic', 'nervous', 'worry', 'worried', 'overthinking', 'dread'],
    replies: [
      "Anxiety can feel really overwhelming 💙 Try breathing with me — press B to open the guided breathe page.",
      "When anxiety hits, sometimes just naming it helps. What’s triggering it right now?",
      "That unsettled feeling is your mind working overtime. What’s weighing on you most right now?",
      "Take one slow breath 🌬️ You don’t have to solve everything right now. What’s the main thing on your mind?"
    ]
  },
  {
    keys: ['sad', 'unhappy', 'depressed', 'down', 'low', 'crying', 'tears', 'hopeless', 'heartbroken', 'empty'],
    replies: [
      "I’m really sorry you’re feeling this way 💜 You’re not alone in this.",
      "It’s completely okay to feel sad. Would you like to talk about what’s going on?",
      "Sending you warmth right now 🌿 What’s weighing on you today?",
      "You reached out, and that takes courage. Tell me — what happened?"
    ]
  },
  {
    keys: ['happy', 'great', 'amazing', 'wonderful', 'fantastic', 'excited', 'joy', 'blessed', 'content'],
    replies: [
      "That’s wonderful to hear! 🌟 What made today so good?",
      "Love that energy! 😊 Want to log this mood so you can look back on it?",
      "So glad you’re feeling good — those moments are worth savouring. What sparked it?",
      "Yes! That’s the vibe 🎉 Celebrate yourself for a second."
    ]
  },
  {
    keys: ['stressed', 'stress', 'overwhelmed', 'pressure', 'burnout', 'too much', 'can\'t cope'],
    replies: [
      "Stress is your mind saying you’re carrying a lot. What’s the biggest thing piling up right now?",
      "You don’t have to solve everything at once 🌿 Even a 5-minute breathing session can create space.",
      "Overwhelm often means you care deeply. What can we take off your plate, even mentally?",
      "Take it one moment at a time. What’s genuinely urgent vs what can wait?"
    ]
  },
  {
    keys: ['tired', 'exhausted', 'drained', 'fatigue', 'sleepy', 'no energy', 'burnt out', 'burned out'],
    replies: [
      "Rest isn’t a weakness — it’s necessary 💤 Have you had a chance to slow down today?",
      "Feeling this drained often means you’ve been giving a lot. What’s taking the most out of you?",
      "Even 5 minutes of guided breathing can help reset your nervous system. Want to try?",
      "Your body is sending you a message. What does rest look like for you right now?"
    ]
  },
  {
    keys: ['angry', 'anger', 'mad', 'furious', 'frustrated', 'irritated', 'annoyed', 'rage', 'pissed'],
    replies: [
      "Anger is completely valid — let it out here 💬 What happened?",
      "Frustration often signals that something matters to you. What’s behind it?",
      "It’s safe to feel angry here. Take a breath, then tell me what’s going on.",
      "Anger often hides something underneath — hurt, disappointment, or feeling unheard. What is it for you?"
    ]
  },
  {
    keys: ['lonely', 'alone', 'isolated', 'no one', 'nobody', 'no friends', 'no one cares', 'left out'],
    replies: [
      "I’m right here with you 💙 You’re not as alone as it might feel right now.",
      "Loneliness is one of the heaviest feelings. You reached out — that took courage.",
      "You matter, even when it doesn’t feel that way. What’s making you feel this way?",
      "Just so you know — reaching out here is a real step. I’m listening."
    ]
  },
  {
    keys: ['help', 'need help', 'support', 'talk to someone', 'need someone'],
    replies: [
      "I’m right here and I’m listening 💙 What do you need right now?",
      "You don’t have to face this alone. Tell me what’s going on.",
      "Of course — I’m here for you. Start wherever feels easiest."
    ]
  },
  {
    keys: ['breathe', 'breathing', 'breath', 'calm down', 'relax', 'calm'],
    replies: [
      "Let’s slow down together 🌬️ Head to the Breathe page (press B) for a guided session.",
      "Box breathing works great: 4 in, hold 4, out 4, hold 4. Or try our guided 4-7-8 on the Breathe page!",
      "Even one deep breath changes your chemistry. Press B to open the breathing guide anytime."
    ]
  },
  {
    keys: ['journal', 'write', 'diary', 'express', 'reflect', 'thoughts', 'note'],
    replies: [
      "Writing is powerful for processing emotions 📓 Hit S to open your journal on the Summary page!",
      "Getting it out of your head and onto the screen really helps. Head to the Summary page when you’re ready.",
      "Journaling can turn confusion into clarity. Press S to open your private journal."
    ]
  },
  {
    keys: ['harm', 'hurt myself', 'end it', 'give up', 'kill', 'suicide', 'suicidal', 'self harm', 'want to die'],
    replies: [
      "🚨 I’m genuinely concerned right now. Please reach out to iCall: 9152987821 — they’re free, confidential, and available to talk. You matter deeply.",
      "Please don’t go through this alone 💙 Vandrevala Foundation is available 24/7: 1860-2662-345. Reaching out takes courage, and I’m proud of you for doing it."
    ]
  },
  {
    keys: ['thank', 'thanks', 'thank you', 'thankyou', 'appreciate'],
    replies: [
      "Always here for you 💜 Take care of yourself today.",
      "Of course! You deserve support too 🌿",
      "That means a lot. Remember — checking in with yourself is always worth it."
    ]
  },
];

const DEFAULT_REPLIES = [
  "I’m here and listening 💙 Tell me more.",
  "Thanks for sharing that. How does it make you feel?",
  "I want to understand better — can you tell me more about that?",
  "That sounds like a lot to carry. I’m with you.",
  "I hear you. What would feel most helpful right now?",
  "You’re doing the right thing by talking it out. What else is on your mind?"
];

function getRuleBasedReply(message) {
  const lower = message.toLowerCase();
  for (const rule of BOT_RULES) {
    if (rule.keys.some(k => lower.includes(k))) {
      return pickUnique(rule.replies);
    }
  }
  return pickUnique(DEFAULT_REPLIES);
}

function renderMessage(text, sender) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const wrapper = document.createElement('div');
  wrapper.className = `chat-msg ${sender}`;
  wrapper.style.animation = 'fadeInUp 0.3s ease both';
  wrapper.innerHTML = `
    <div class="bubble">${escapeHtmlChat(text)}</div>
    <div class="msg-time">${formatChatTime()}</div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot typing-indicator';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<div class="bubble"><span></span><span></span><span></span></div>';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  renderMessage(text, 'user');
  chatHistory.push({ role: 'user', content: text });
  input.value = '';
  showTypingIndicator();

  /* Try Gemini first, then fall back to rules */
  let reply = await getGeminiResponse(text);
  if (!reply) reply = getRuleBasedReply(text);

  /* Proportional delay: feels natural without being slow */
  const delay = Math.min(reply.length * 14, 2400);
  setTimeout(() => {
    removeTypingIndicator();
    renderMessage(reply, 'bot');
    chatHistory.push({ role: 'bot', content: reply });
    trackReply(reply);
  }, delay);
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function formatChatTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtmlChat(text) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(text));
  return d.innerHTML;
}


/* ══════════════════════════════════════
   SECTION 3 — WEEKLY SUMMARY
   ══════════════════════════════════════ */

const STORAGE_KEY_MOODS = 'placida_moods';

function loadWeeklySummary() {
  const allMoods = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_MOODS)) || []; }
    catch { return []; }
  })();

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekly = allMoods.filter(m => new Date(m.timestamp).getTime() > oneWeekAgo);

  renderSummaryStats(weekly);
  renderPrompt(weekly);
  renderWeeklyHistory(weekly);
}

function renderSummaryStats(moods) {
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  if (moods.length === 0) {
    setEl('summaryCount', '0');
    setEl('summaryAvg', '—');
    setEl('summaryTop', '—');
    setEl('summaryStreak', '0');
    return;
  }

  const avg = moods.reduce((s, m) => s + m.score, 0) / moods.length;

  // Most frequent mood
  const freq = {};
  moods.forEach(m => freq[m.emoji] = (freq[m.emoji] || 0) + 1);
  const topEmoji = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

  // Streak — consecutive days logged
  const days = [...new Set(moods.map(m => new Date(m.timestamp).toDateString()))];

  setEl('summaryCount', moods.length.toString());
  setEl('summaryAvg', avg.toFixed(1));
  setEl('summaryTop', topEmoji);
  setEl('summaryStreak', days.length + ' day' + (days.length !== 1 ? 's' : ''));
}

function renderPrompt(moods) {
  const el = document.getElementById('journalPrompt');
  if (!el) return;

  let prompt;
  if (moods.length === 0) {
    prompt = "This is your space to reflect. Start logging moods on the home page — your summary will appear here 🌙";
  } else {
    const avg = moods.reduce((s, m) => s + m.score, 0) / moods.length;
    if (avg >= 4)
      prompt = "✨ You've had a wonderful week! What moments made it special? Write about one memory you want to hold onto.";
    else if (avg >= 3)
      prompt = "🌿 A solid, balanced week. What's one thing that could make next week even better? Take a moment to reflect.";
    else
      prompt = "💜 It's been a tough week, and that's okay. Be gentle with yourself. What's one small thing you need right now?";
  }

  el.textContent = prompt;
}

function renderWeeklyHistory(moods) {
  const container = document.getElementById('weeklyHistory');
  if (!container) return;

  if (moods.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">📅</div>
        <p>No entries this week.<br>Start logging on the home page!</p>
      </div>`;
    return;
  }

  container.innerHTML = moods.slice(0, 7).map(entry => {
    const d = new Date(entry.timestamp);
    const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    return `
      <div class="mood-entry">
        <div class="entry-emoji">${entry.emoji}</div>
        <div class="entry-info">
          <div class="entry-mood">${entry.label}</div>
          ${entry.note ? `<div class="entry-note">${entry.note}</div>` : ''}
        </div>
        <div class="entry-time">${dayLabel}</div>
      </div>`;
  }).join('');
}


/* ══════════════════════════════════════
   INIT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Breathing page
  const startBtn = document.getElementById('breathBtn');
  if (startBtn) startBtn.onclick = startBreathing;

  // Chat page
  const chatSend = document.getElementById('chatSendBtn');
  if (chatSend) chatSend.onclick = sendMessage;

  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.addEventListener('keydown', handleChatKey);

  // Chat welcome message
  if (document.getElementById('chatMessages')) {
    setTimeout(() => {
      renderMessage("Hey! 👋 I'm Placida, your mental wellness companion. How are you feeling today?", 'bot');
    }, 400);
  }

  // Summary page
  if (document.getElementById('summaryCount')) {
    loadWeeklySummary();
  }

  // Week 3: Keyboard shortcuts (all pages loading features.js)
  (function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const map = {
        m: 'index.html', b: 'breathe.html', c: 'chatbot.html',
        d: 'dashboard.html', i: 'insights.html', s: 'summary.html',
      };
      if (map[e.key.toLowerCase()]) window.location.href = map[e.key.toLowerCase()];
    });
    const hint = document.getElementById('shortcutHint');
    const panel = document.getElementById('shortcutPanel');
    if (hint && panel) {
      hint.addEventListener('click', () => {
        const visible = panel.style.display === 'block';
        panel.style.display = visible ? 'none' : 'block';
        panel.setAttribute('aria-hidden', String(visible));
      });
      document.addEventListener('click', e => {
        if (!hint.contains(e.target) && !panel.contains(e.target)) {
          panel.style.display = 'none';
          panel.setAttribute('aria-hidden', 'true');
        }
      });
    }
  })();
});
