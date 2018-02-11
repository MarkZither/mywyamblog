//self.importScripts('');
const CACHE_NAME = 'my-site-cache-v3';
self.addEventListener('install', function(event) {
    // Perform install steps
    var urlsToCache = [
        '/',
        '/index.html',
        '/offline.html',
        '/manifest.json',
        '/assets/css/bootstrap.min.css',
        '/assets/css/override.css',
        '/assets/css/bootstrap.min.css',
        '/assets/Images/Empty Test Explorer.png',
        '/assets/Images/GitHub fork Repository add origin.PNG',
        '/assets/Images/GitHub fork Repository change push upstream.PNG',
        '/assets/Images/GitHub fork Repository Rename to Upstream.PNG',
        '/assets/Images/GitHub fork Repository Settings.PNG',
        '/assets/Images/GitHub fork Team Explorer.PNG',
        '/assets/Images/NetlifyCMS_Webhooks.PNG',
        '/assets/Images/NetlifyCMS_Webhooks_PullRequest.PNG',
        '/assets/Images/Netlify_Identity_Complete_Signup.PNG',
        '/assets/Images/Netlify_Identity_Local_Testing.PNG',
        '/assets/Images/push-notification-icon.png',
        '/assets/Images/Tools Extensions and Updates Menu.png',
        '/assets/Images/Tools Extensions and Updates.png',
        '/assets/js/jquery.min.js',
        '/assets/js/bootstrap.min.js',
        '/posts/Playing%20with%20Service%20Workers',
        '/posts/exception using .net core',
        '/posts/Fork a cloned git repository',
        '/posts/index.html',
        '/posts/Job Interview Technical Test Preparation',
        '/posts/Nunit_Tests_Not_Showing_In_Test_Explorer',
        '/posts/Running ASP.NET Core on a RaspberryPi 2 with Nginx',
        '/posts/Setting up NetlifyCMS with Wyam',
        '/posts/Setting-Raspberry-Pi-NGINX-PHP-MySQL-LEMP-Stack',
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
    console.log(`WORKER: in sw fetch for ${event.request.url}`);

    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        Promise.race([timeout(20000), fetch(event.request)]).then(networkResponse => {
            console.log(`WORKER: Serving ${event.request.url} from NETWORK`);
            var responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
            return networkResponse;
        })
        .catch(_ => {
            console.log(`WORKER: Serving ${event.request.url} from CACHE`);
            return caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(matching) {
                    if (!matching || matching.status == 404) {
                        console.log(`WORKER: Offline as ${event.request.url} not in CACHE`);
                        return cache.match('offline.html')
                    } else {
                        console.log(`WORKER: Serving ${event.request.url} from CACHE`);
                        return matching;
                    }
                });
            });
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