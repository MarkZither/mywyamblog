---
title: "Playing with Service Workers"
authors: ["mark-burton"]
date: "2017-12-18"
tags: ["Service Workers", "Notifications API", "Push API", "PWA", "Progressive Web Apps", "VAPID", "CORS"]
---
# Service workers, Push API, Notifcations API and PWAs
This will not work for you as service workers are not supported ## Location of the serviceworker.js file and scope matters
I started with the sw.js file in the assetsscripts folder with the rest of the script files, but calls to ```navigator.serviceWorker.getRegistration()``` were never returning, this stackoverflow thread explains the issue.
[Service Worker is never ready](https:/stackoverflow.comquestions29874068navigator-serviceworker-is-never-ready).  Maybe this is the proper way  ```javascript
\\\{  navigator.serviceWorker.register('sw.js', \{  scope: '.'  \\}
```  ## Subscribe to notifications
<div id="dashboard-controls" /><div /><button disabled="disabled" id="subscribe" />Subscribe for Push Notifications<button />  <button disabled="disabled" id="unsubscribe" />Unsubscribe from Push Notifications<button />  <<br /><<hr />  <label for="topic" />Topic:<label /><<input type="text" id="topic" size="32" maxlength="32" />  <label for="urgency" />Urgency:<label />  <select id="urgency" />  <option value="VeryLow" />Very Low<option />  <option value="Low" />Low<option />  <option value="Normal" selected="selected" />Normal<option />  <option value="High" />High<option />  <select /><<br />  <<input id="notification" size="65" />  <button id="send" />Send Push Notification<button />
<div />  <<hr />
<div id="dashboard-console" /><div /><label />Log:<label />  <button id="clear" style="position: relative; top: 3px;" />Clear&lt;button>
<div />  ##  Building Progressive Web Apps with Chris Love
Great explaination of Service Workers and further reading and [offer](https:/love2dev.comdnrpwa) for Chris' course on this episode of
[DotNetRocks](https:/dotnetrocks.com?show=1509).  [PWA Builder](http:/www.pwabuilder.comgenerator)  ## CORS
As the blog is a static site and the backend is hosted in azure it is neccessary  setup CORS using one of the examples here[Enabling Cross-Origin Requests (CORS)](https:/docs.microsoft.comen-usaspnetcoresecuritycors)  don't forget to do the CORS section in Azure if you are using that.<<button id="clear" style="position: relative; top: 3px;"&gt;Clear&lt;button> />

<script src="imgjspush-notifications.js" /><script />
<script />  window.addEventListener('load', function() \\{  // Registration was successful  console.log('PAGE: Get Notification permission');  askPermission();  setTimeout(notify, 2000);  \});  function notify()\\\{  var title = 'Welcome to the blog.';  var body = 'Enjoy this post about service workers and the push and notification APIs.';  var icon = 'https:/noknok.plimagesfavico.png';  var tag = 'simple-push-demo-notification-tag';
if (Notification.permission == 'granted') \{  navigator.serviceWorker.getRegistration().then(function(reg) {  reg.showNotification(title, {  body: body,  icon: icon,  tag: tag  \\})  });  }
}  function askPermission() \\\{  return new Promise(function(resolve, reject) \{  const permissionResult = Notification.requestPermission(function(result) {  resolve(result);  \\});  if (permissionResult) \\{  permissionResult.then(resolve, reject);  \}  })  .then(function(permissionResult) \\\{  if (permissionResult !== 'granted') \{  throw new Error('We weren\'t granted permission.');  \\}  });
}
</script&gt;