// ======================================================
// ARCHIVO: sw.js (en la raíz del proyecto)
// ======================================================
const CACHE_NAME = 'buca-v3.1.0'; // Incrementamos la versión para que se actualice
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/src/styles/main.css',
    '/src/main.js',
    '/src/App.js',
    // Añade aquí los iconos más importantes
    '/icons/android/android-launchericon-192-192.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css'
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Cache abierto. Cacheando archivos base...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker] Todos los archivos fueron cacheados exitosamente.');
                return self.skipWaiting();
            })
    );
});

self.addEventListener('fetch', event => {
    // Esta es la estrategia "Network Falling Back to Cache"
    event.respondWith(
        fetch(event.request).catch(() => {
            // Si la petición a la red falla (porque no hay internet),
            // buscamos el recurso en el caché.
            console.log(`[Service Worker] Red fallida. Buscando ${event.request.url} en caché.`);
            return caches.match(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`[Service Worker] Borrando caché antigua: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Reclamando clientes...');
            return self.clients.claim();
        })
    );
});