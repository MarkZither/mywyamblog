Title: Playing with Service Workers
Published: 2017-12-18
Tags: 
  - Service Workers
  - Notifications API
  - Push API
  - PWA
  - Progressive Web Apps
---

# Service workers, Push API, Notifcations API and PWAs

## Location of the serviceworker.js file matters
I started with the sw.js file in the assets/scripts folder with the rest of the script files, but calls to ```navigator.serviceWorker.getRegistration()``` were never returning, this stackoverflow thread explains the issue.
[Service Worker is never ready](https://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready)

<script>
  window.addEventListener('load', function() {
      // Registration was successful
      console.log('PAGE: Get Notification permission');
      askPermission();
      setTimeout(notify, 2000);
  });

function notify(){
  var title = 'Welcome to the blog.';
  var body = 'Enjoy this post about service workers and the push and notification APIs.';
  var icon = 'https://noknok.pl/images/favico.png';
  var tag = 'simple-push-demo-notification-tag';
if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        reg.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag
      })
    });
  }
}


function askPermission() {
    return new Promise(function(resolve, reject) {
            const permissionResult = Notification.requestPermission(function(result) {
                resolve(result);
            });

            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
        .then(function(permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
            }
        });
}
</script>