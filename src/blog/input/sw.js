//self.importScripts('');
const CACHE_NAME = 'my-site-cache-v5';
self.addEventListener('install', function(event) {
    // Perform install steps
    var urlsToCache = [
        '/',
        '/index.html',
        '/offline.html',
        '/manifest.json',
        '/vendor/bootstrap/scss/bootstrap.css',
        '/scss/clean-blog.css',
        '/assets/Images/Empty Test Explorer.png',
        '/assets/Images/GitHub fork Repository add origin.png',
        '/assets/Images/GitHub fork Repository change push upstream.png',
        '/assets/Images/GitHub fork Repository Rename to Upstream.png',
        '/assets/Images/GitHub fork Repository Settings.png',
        '/assets/Images/GitHub fork Team Explorer.png',
        '/assets/Images/NetlifyCMS_Webhooks.PNG',
        '/assets/Images/NetlifyCMS_Webhooks_PullRequest.PNG',
        '/assets/Images/Netlify_Identity_Complete_Signup.PNG',
        '/assets/Images/Netlify_Identity_Local_Testing.PNG',
        '/assets/Images/push-notification-icon.png',
        '/assets/Images/Tools Extensions and Updates Menu.png',
        '/assets/Images/Tools Extensions and Updates.png',
        '/posts/playing-with-service-workers',
        '/posts/notsupportedexception-exception-using-encoding-in-.net-core',
        '/posts/fork-a-cloned-git-repository',
        //'/posts',
        '/posts/job-interview-technical-test-preparation',
        '/posts/nunit-tests-not-showing-in-test-explorer',
        '/posts/running-asp.net-core-on-a-raspberrypi-2-with-nginx',
        '/posts/setting-up-netlifycms-with-wyam-part-1',
        '/posts/setting-raspberry-pi-nginx-php-mysql-lemp-stack',
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
                    if (!matching || matching.status === 404) {
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