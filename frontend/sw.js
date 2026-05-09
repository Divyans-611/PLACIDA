/* ═══════════════════════════════════════════
   Placida Service Worker  v1.0
   Offline-first: cache all pages & assets
   ═══════════════════════════════════════════ */

const CACHE_NAME   = 'placida-v1';
const ASSETS = [
  './',
  './auth.html',
  './index.html',
  './dashboard.html',
  './breathe.html',
  './chatbot.html',
  './insights.html',
  './summary.html',
  './relax.html',
  './feedback.html',
  './404.html',
  './style.css',
  './script.js',
  './features.js',
  './supabase.js',
  './icon-512.png',
  './manifest.json',
  /* Google Fonts — cache on first fetch */
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  /* Chart.js CDN */
  'https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js'
];

/* ── Install: pre-cache all assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets…');
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(err =>
          console.warn('[SW] Failed to cache:', url, err.message)
        ))
      );
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: delete old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: Cache-first for assets, Network-first for API ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* Supabase API — always try network, fall back to offline page */
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  /* CDN resources — stale-while-revalidate */
  if (url.hostname.includes('cdn.jsdelivr.net') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          }).catch(() => cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  /* App pages & assets — Cache-first ── */
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        /* Cache successful GET responses */
        if (event.request.method === 'GET' && res.status === 200) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
        }
        return res;
      }).catch(() =>
        /* Offline fallback: serve 404.html for navigation requests */
        event.request.mode === 'navigate'
          ? caches.match('./404.html')
          : new Response('Offline', { status: 503 })
      );
    })
  );
});

/* ── Background Sync: queue mood entries when offline ── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-moods') {
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  /* Mood entries saved offline are in localStorage on the client.
     This sync event fires when connectivity is restored.
     The client pages handle the actual Supabase push. */
  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({ type: 'SYNC_READY' }));
}

/* ── Push notifications (future) ── */
self.addEventListener('push', event => {
  const data = event.data?.json() || { title: 'Placida', body: 'Time for your daily check-in 🌿' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icon-512.png',
      badge: './icon-512.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || './index.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
