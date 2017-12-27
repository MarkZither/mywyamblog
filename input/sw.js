//self.importScripts('');
self.addEventListener('install', function(event) {
    // Perform install steps
    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
        '/',
        '/assets/css/override.css',
        '/index.html',
        '/posts/Playing%20with%20Service%20Workers',
        '/assets/css/bootstrap.min.css',
        '/assets/js/jquery.min.js',
        '/assets/js/bootstrap.min.js'
    ];

    caches.delete(CACHE_NAME);

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('WORKER: Opened cache');
            return cache.addAll(urlsToCache);
        })
    );

    event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', function(event) {
    var CACHE_NAME = 'my-site-cache-v1';
    console.log(`WORKER: in sw fetch for ${event.request.url}`);

    if (event.request.method !== 'GET') {
        return;
    }
    var title = 'You are online message.';
    var body = 'We have received a push message.';
    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';

    event.respondWith(
        Promise.race([timeout(20000), fetch(event.request)]).then(networkResponse => {
            console.log(`WORKER: Serving ${event.request.url} from NETWORK`);
            if (Notification.permission == 'granted' && event.request.url.indexOf('Playing') > -1) {
                self.registration.showNotification('you are online', {
                    body: `this page was fetched from the server ${event.request.url}`
                })
            }
            var responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
            return networkResponse;
        })
        //.timeout(200)
        .catch(_ => {
            console.log(`WORKER: Serving ${event.request.url} from CACHE`);
            if (Notification.permission == 'granted' && event.request.url.indexOf('Playing') > -1) {
                self.registration.showNotification('it still works, but', {
                    body: 'looks like you are not online'
                })
            }
            return caches.match(event.request);
        })
    );
});

self.addEventListener('activate', function(e) {
    // This event will be fired once when this version of the script is first registered for
    // a given URL scope.
    // It's an opportunity to clean up any stale data that might be left behind in self.caches
    // by an older version of this script.
    // e.waitUntil(promise) is also available here to delay activation until work has been performed,
    // but note that waiting within the activate event will delay handling of any
    // fetch or message events that are fired in the interim. When possible, do work during the install phase.
    // It will NOT be fired each time the service worker is revived after being terminated.
    // To perform an action when the service worker is revived, include that logic in the
    // `onfetch` or `onmessage` event listeners.
    console.log('Activate event:', e);
});

function timeout(value) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('fetch timed out');
            reject(new Error('Sorry, request timed out.'));
        }, value);
    })
}