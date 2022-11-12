const cacheName = 'cacheAssets-v2.0'; // cache name must be unique

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
            return response || fetch(event.request); // Cache with network fallback
            })
    )
});

self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log(caches)
    caches.open(cacheName).then(function(cache){
        console.log('[Service Worker] Installing...');
        return cache.addAll([
            // root folder
            'https://christy-varghese.github.io/PWA/',

            // main HTML file
            'https://christy-varghese.github.io/PWA/index.html',

            // JS file
            'https://christy-varghese.github.io/PWA/javascript/scripts.js',

            // Manifest file for PWA
            'https://christy-varghese.github.io/PWA/manifest.json',

            // CSS file
            'https://christy-varghese.github.io/PWA/css/main.css',

            // Images
            'https://christy-varghese.github.io/PWA/assets/icons/logo_icon_192.png',
            'https://christy-varghese.github.io/PWA/assets/icons/logo_icon_512.png'
        ]);
    }).catch((err) => {
        console.log('something went wrong', err);
    })
});

self.addEventListener('activate', function(event) {
    // console.log('[Service worker] activated',event);
    event.waitUntil(clients.claim());

    // Removal of old cache
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== cacheName)
                .map(cacheName => caches.delete(cacheName))
            )
        })
    )   
});

