/* ═══════════════════════════════════════════════
   Placida — supabase.js  v2.0
   Connection resilience: retry, wake-up, offline banner
   ═══════════════════════════════════════════════ */

const SUPABASE_URL  = 'https://snmfdktkjggsszziexsz.supabase.co';
const SUPABASE_ANON = 'sb_publishable_ZspyU3qfMZwqYIfVtrA1-g_K9Vz_c9c';

/* ── Connection state ── */
const _conn = { retries: 0, maxRetries: 4, online: true };

/* ── Show/hide reconnection banner ── */
function _showBanner(msg, type = 'warn') {
  let b = document.getElementById('_sb_banner');
  if (!b) {
    b = document.createElement('div');
    b.id = '_sb_banner';
    Object.assign(b.style, {
      position:'fixed', top:'0', left:'0', right:'0', zIndex:'9999',
      padding:'10px 20px', textAlign:'center', fontSize:'0.82rem',
      fontFamily:'Inter,sans-serif', fontWeight:'600',
      transition:'transform 0.35s ease', transform:'translateY(-100%)'
    });
    document.body.prepend(b);
  }
  b.style.background = type === 'ok'
    ? 'rgba(94,196,182,0.92)' : 'rgba(240,107,139,0.92)';
  b.style.color = '#fff';
  b.textContent = msg;
  b.style.transform = 'translateY(0)';
  if (type === 'ok') setTimeout(() => { b.style.transform = 'translateY(-100%)'; }, 3000);
}
function _hideBanner() {
  const b = document.getElementById('_sb_banner');
  if (b) b.style.transform = 'translateY(-100%)';
}

/* ── Exponential back-off helper ── */
function _wait(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ── Wake Supabase free-tier project (sends a lightweight ping) ── */
async function _pingSupabase() {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: { apikey: SUPABASE_ANON },
      signal: AbortSignal.timeout(8000)
    });
    return r.ok || r.status === 400; // 400 = project awake, just needs auth
  } catch { return false; }
}

/* ── Load SDK with retry ── */
async function _loadSDK() {
  for (let attempt = 0; attempt <= _conn.maxRetries; attempt++) {
    if (attempt > 0) {
      const delay = Math.min(1000 * 2 ** attempt, 16000); // 2s,4s,8s,16s
      _showBanner(`⏳ Reconnecting to database… (attempt ${attempt}/${_conn.maxRetries})`);
      await _wait(delay);

      // Try to wake Supabase free-tier before loading SDK
      const awake = await _pingSupabase();
      if (!awake) continue;
    }

    try {
      await new Promise((resolve, reject) => {
        if (window.__supabaseLoaded) { resolve(); return; }
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
        s.onload = () => { window.__supabaseLoaded = true; resolve(); };
        s.onerror = reject;
        document.head.appendChild(s);
      });

      // createClient (guard against re-creating)
      if (!window.supabase || !window.supabase.auth) {
        window.supabase = window.supabaseLib
          ? window.supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON, {
              auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
              }
            })
          : window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
              auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
              }
            });
      }

      _conn.online = true;
      _conn.retries = 0;
      if (attempt > 0) _showBanner('✅ Reconnected!', 'ok');
      return true;

    } catch (e) {
      console.warn(`[Placida] SDK load attempt ${attempt + 1} failed:`, e.message);
    }
  }
  return false; // all retries exhausted
}

/* ── Bootstrap ── */
(async function bootstrap() {
  // Skip if keys are placeholder
  if (SUPABASE_URL.includes('YOUR_PROJECT_ID') || SUPABASE_ANON.includes('YOUR_ANON_KEY')) {
    console.warn('[Placida] Supabase keys not set — offline mode.');
    window.supabase = null;
    document.dispatchEvent(new Event('supabase:ready'));
    return;
  }

  const ok = await _loadSDK();
  if (!ok) {
    console.warn('[Placida] All retries failed — offline mode.');
    _showBanner('🔌 Running offline — data saved locally. Reload to retry.');
    window.supabase = null;
  }
  document.dispatchEvent(new Event('supabase:ready'));

  // Listen for auth state changes (handles token refresh, sign-out from other tab)
  if (window.supabase?.auth) {
    window.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // Only redirect if not already on auth page
        if (!window.location.pathname.endsWith('auth.html')) {
          window.location.href = 'auth.html';
        }
      }
      if (event === 'TOKEN_REFRESHED') {
        console.log('[Placida] Session token refreshed.');
      }
    });
  }
})();

/* ── Re-connect when browser comes back online ── */
window.addEventListener('online', async () => {
  if (_conn.online) return;
  _conn.online = true;
  console.log('[Placida] Network restored — reconnecting…');
  const ok = await _loadSDK();
  if (ok) _showBanner('✅ Back online!', 'ok');
});
window.addEventListener('offline', () => {
  _conn.online = false;
  _showBanner('🔌 You are offline — changes saved locally.');
});

/* ── Helper: wait for SDK then run callback ── */
function withSupabase(cb) {
  if (window.supabase?.auth) { cb(window.supabase); return; }
  document.addEventListener('supabase:ready', () => cb(window.supabase), { once: true });
}

/* ── Auth helpers ── */
async function getSession() { return window.supabase?.auth.getSession(); }
async function getUser()    { return window.supabase?.auth.getUser(); }
async function signOut() {
  try { await window.supabase?.auth.signOut(); } catch {}
  window.location.href = 'auth.html';
}

/* ── Auth guard with retry ── */
function requireAuth() {
  withSupabase(async (sb) => {
    if (!sb) return; // offline → allow access
    let session = null;
    for (let i = 0; i < 3; i++) {
      try {
        const { data, error } = await sb.auth.getSession();
        if (!error) { session = data.session; break; }
      } catch (e) {
        if (i < 2) await _wait(1500 * (i + 1));
        else console.warn('[Placida] Auth guard failed after retries — offline mode:', e.message);
      }
    }
    if (session === null && !navigator.onLine) return; // offline grace
    if (session === false || (!session && navigator.onLine)) {
      window.location.href = 'auth.html';
    }
  });
}
