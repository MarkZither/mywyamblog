var PushNotifications = (function() {
    let applicationServerPublicKey;

    let consoleOutput;
    let pushServiceWorkerRegistration;
    let subscribeButton, unsubscribeButton;
    let topicInput, urgencySelect, notificationInput;

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }

    function initializeConsole() {
        consoleOutput = document.getElementById('output');
        document.getElementById('clear').addEventListener('click', clearConsole);
    }

    function clearConsole() {
        while (consoleOutput.childNodes.length > 0) {
            consoleOutput.removeChild(consoleOutput.lastChild);
        }
    }

    function writeToConsole(text) {
        var paragraph = document.createElement('p');
        paragraph.style.wordWrap = 'break-word';
        paragraph.appendChild(document.createTextNode(text));

        consoleOutput.appendChild(paragraph);
    }

    function registerPushServiceWorker() {
        navigator.serviceWorker.register('/assets/js/service-workers/push-service-worker.js', { scope: '/assets/js/service-workers/push-service-worker/' })
            .then(function(serviceWorkerRegistration) {
                pushServiceWorkerRegistration = serviceWorkerRegistration;

                initializeUIState();

                writeToConsole('Push Service Worker has been registered successfully');
            }).catch(function(error) {
                writeToConsole('Push Service Worker registration has failed: ' + error);
            });
    }

    function initializeUIState() {
        subscribeButton = document.getElementById('subscribe');
        subscribeButton.addEventListener('click', subscribeForPushNotifications);

        unsubscribeButton = document.getElementById('unsubscribe');
        unsubscribeButton.addEventListener('click', unsubscribeFromPushNotifications);

        topicInput = document.getElementById('topic');
        notificationInput = document.getElementById('notification');
        urgencySelect = document.getElementById('urgency');
        document.getElementById('send').addEventListener('click', sendPushNotification);

        pushServiceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                changeUIState(Notification.permission === 'denied', subscription !== null);
            });
    }

    function changeUIState(notificationsBlocked, isSubscibed) {
        subscribeButton.disabled = notificationsBlocked || isSubscibed;
        unsubscribeButton.disabled = notificationsBlocked || !isSubscibed;

        if (notificationsBlocked) {
            writeToConsole('Permission for Push Notifications has been denied');
        }
    }

    function subscribeForPushNotifications() {
        if (applicationServerPublicKey) {
            subscribeForPushNotificationsInternal();
        } else {
            fetch('https://msbaspnetcorepush.azurewebsites.net/push-notifications-api/public-key')
                .then(function(response) {
                    if (response.ok) {
                        return response.text();
                    } else {
                        writeToConsole('Failed to retrieve Public Key');
                    }
                }).then(function(applicationServerPublicKeyBase64) {
                    applicationServerPublicKey = urlB64ToUint8Array(applicationServerPublicKeyBase64);
                    writeToConsole('Successfully retrieved Public Key');

                    subscribeForPushNotificationsInternal();
                }).catch(function(error) {
                    writeToConsole('Failed to retrieve Public Key: ' + error);
                });
        }
    }

    function subscribeForPushNotificationsInternal() {
        pushServiceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerPublicKey
            })
            .then(function(pushSubscription) {
                fetch('https://msbaspnetcorepush.azurewebsites.net/push-notifications-api/subscriptions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pushSubscription)
                    })
                    .then(function(response) {
                        if (response.ok) {
                            writeToConsole('Successfully subscribed for Push Notifications');
                        } else {
                            writeToConsole('Failed to store the Push Notifications subscrition on server');
                        }
                    }).catch(function(error) {
                        writeToConsole('Failed to store the Push Notifications subscrition on server: ' + error);
                    });

                changeUIState(false, true);
            }).catch(function(error) {
                if (Notification.permission === 'denied') {
                    changeUIState(true, false);
                } else {
                    writeToConsole('Failed to subscribe for Push Notifications: ' + error);
                }
            });
    }

    function unsubscribeFromPushNotifications() {
        pushServiceWorkerRegistration.pushManager.getSubscription()
            .then(function(pushSubscription) {
                if (pushSubscription) {
                    pushSubscription.unsubscribe()
                        .then(function() {
                            fetch('https://msbaspnetcorepush.azurewebsites.net/push-notifications-api/subscriptions?endpoint=' + encodeURIComponent(pushSubscription.endpoint), {
                                    method: 'DELETE',
                                })
                                .then(function(response) {
                                    if (response.ok) {
                                        writeToConsole('Successfully unsubscribed from Push Notifications');
                                    } else {
                                        writeToConsole('Failed to discard the Push Notifications subscrition from server');
                                    }
                                }).catch(function(error) {
                                    writeToConsole('Failed to discard the Push Notifications subscrition from server: ' + error);
                                });

                            changeUIState(false, false);
                        }).catch(function(error) {
                            writeToConsole('Failed to unsubscribe from Push Notifications: ' + error);
                        });
                }
            });
    }

    function sendPushNotification() {
        let payload = { topic: topicInput.value, notification: notificationInput.value, urgency: urgencySelect.value };

        fetch('https://msbaspnetcorepush.azurewebsites.net/push-notifications-api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                if (response.ok) {
                    writeToConsole('Successfully sent Push Notification');
                } else {
                    writeToConsole('Failed to send Push Notification');
                }
            }).catch(function(error) {
                writeToConsole('Failed to send Push Notification: ' + error);
            });
    }

    return {
        initialize: function() {
            initializeConsole();

            if ('serviceWorker' in navigator) {
                writeToConsole('Service Workers are supported');
            } else {
                writeToConsole('Service Workers are not supported');
                return;
            }

            if ('PushManager' in window) {
                writeToConsole('Push API supported');
            } else {
                writeToConsole('Push API not supported');
                return;
            }

            registerPushServiceWorker();
        }
    };
})();

PushNotifications.initialize();