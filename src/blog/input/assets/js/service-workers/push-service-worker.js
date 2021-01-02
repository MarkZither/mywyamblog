const pushNotificationTitle = 'Demo.AspNetCore.PushNotifications';

self.addEventListener('push', function(event) {
    event.waitUntil(self.registration.showNotification(pushNotificationTitle, {
        body: event.data.text(),
        icon: '/assets/Images/push-notification-icon.png'
    }));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
});