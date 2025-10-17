// sw.js - CORREGIDO

const CACHE_NAME = 'buca-cache-v1';
// ¡AQUÍ ESTÁ LA LÍNEA QUE FALTABA!
// Esta es la lista de archivos esenciales para que tu app funcione sin conexión.
const urlsToCache = [
  '/',
  '/index.html',
  // NOTA: Los nombres de los archivos CSS y JS pueden cambiar
  // después de cada 'npm run build'. Por ahora, esto es suficiente para empezar.
  // Más adelante se puede hacer este cacheo de forma dinámica.
];

// Evento de Instalación: Se dispara cuando el SW se instala por primera vez.
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache abierto. Cacheando archivos base...');
        // Ahora 'urlsToCache' sí existe y el comando funcionará.
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
          console.error('[Service Worker] Falló el cacheo de archivos base:', err);
      })
  );
});

// Evento Fetch: Se dispara cada vez que la página pide un recurso (CSS, JS, imagen, etc.)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si el recurso está en el caché, lo devuelve desde ahí.
        if (response) {
          return response;
        }
        // Si no, lo pide a la red.
        return fetch(event.request);
      })
  );
});