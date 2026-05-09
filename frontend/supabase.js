

const SUPABASE_URL = 'https://snmfdktkjggsszziexsz.supabase.co';
const SUPABASE_ANON = 'sb_publishable_ZspyU3qfMZwqYIfVtrA1-g_K9Vz_c9c';

/* Load Supabase JS SDK from CDN then expose `supabase` globally */
(function loadSupabase() {
  if (window.supabase) return;          // already loaded

  // ⚠️ Skip if keys are still placeholders — app works offline
  if (SUPABASE_URL.includes('YOUR_PROJECT_ID') || SUPABASE_ANON.includes('YOUR_ANON_KEY')) {
    console.warn('[Placida] Supabase keys not set — running in offline/localStorage mode.');
    window.supabase = null;
    document.dispatchEvent(new Event('supabase:ready'));
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  script.onload = () => {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    document.dispatchEvent(new Event('supabase:ready'));
  };
  script.onerror = () => {
    console.warn('[Placida] Supabase SDK failed to load — falling back to localStorage only.');
    document.dispatchEvent(new Event('supabase:ready'));   // fire anyway so pages still init
  };
  document.head.appendChild(script);
})();

/* ─── Helper: wait for SDK then run callback ─── */
function withSupabase(cb) {
  if (window.supabase?.from) { cb(window.supabase); return; }
  document.addEventListener('supabase:ready', () => cb(window.supabase), { once: true });
}

/* ─── Auth helpers ─── */
async function getSession() { return window.supabase?.auth.getSession(); }
async function getUser() { return window.supabase?.auth.getUser(); }
async function signOut() { await window.supabase?.auth.signOut(); window.location.href = 'auth.html'; }

/* ── Auth guard: call on every protected page ── */
function requireAuth() {
  withSupabase(async (sb) => {
    if (!sb) return;  // offline / SDK failed → allow access
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (!session) window.location.href = 'auth.html';
    } catch (e) {
      // Network error (Supabase paused/unreachable) → allow access in offline mode
      console.warn('[Placida] Auth check failed — running offline:', e.message);
    }
  });
}
