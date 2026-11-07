// network-first: دايماً بيجيب أحدث نسخة، وإذا ما في نت بيستعمل آخر نسخة محفوظة
const C = 'ledger-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.hostname !== location.hostname && u.hostname !== 'www.gstatic.com') return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request))
  );
});
