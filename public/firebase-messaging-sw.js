importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');



// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBVXhcXHVbPhVBcM3NfcnYK4nOc6m-nZuE",
    authDomain: "notifications-pronoteplus.firebaseapp.com",
    projectId: "notifications-pronoteplus",
    storageBucket: "notifications-pronoteplus.appspot.com",
    messagingSenderId: "776699496952",
    appId: "1:776699496952:web:43705756a295a350406e0d",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// This background handler is called when the app is closed or not in the foreground.
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: './icon.ico'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

// on notification click
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://v3.pronote.plus')
    );
})