// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Replace the values with yours
const firebaseConfig = {
    apiKey: "AIzaSyDfb-Et0hcr9GJbXhFULgiquxYJTycUlls",
    authDomain: "moteur-reservation-adrware.firebaseapp.com",
    projectId: "moteur-reservation-adrware",
    storageBucket: "moteur-reservation-adrware.appspot.com",
    messagingSenderId: "65338018145",
    appId: "1:65338018145:web:4e99c0b84f44f905bf9d20",
    measurementId: "G-BQ95TXMFP0"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Not necessary, but if you want to handle clicks on notifications
self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
    if (!pathname) return
    const url = new URL(pathname, self.location.origin).href

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientsArr) => {
                const hadWindowToFocus = clientsArr.some((windowClient) =>
                    windowClient.url === url ? (windowClient.focus(), true) : false
                )

                if (!hadWindowToFocus)
                    self.clients
                        .openWindow(url)
                        .then((windowClient) =>
                            windowClient ? windowClient.focus() : null
                        )
            })
    )
})