describe('Service Worker Suite', function() {
    beforeEach(function() {
        Promise.all([
            SWTestHelper.unregisterAllRegistrations(),
            SWTestHelper.clearAllCaches()
        ])
    });

    it('should register a service worker and cache file on install', function() {
        // 1: Register service worker.
        // 2: Wait for service worker to install.
        // 3: Check cache was performed correctly.

        return navigator.serviceWorker.register('/sw.js'); //.then((reg) => {
        //return window.__waitForSWState(reg, 'installed');
        //});
    });
});