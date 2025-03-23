// js/firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyBespCtavesyrdzKcB3LRr4vXd_U6XhfO4",
    authDomain: "token-9ae6a.firebaseapp.com",
    projectId: "token-9ae6a",
    storageBucket: "token-9ae6a.appspot.com",
    messagingSenderId: "434290198239",
    appId: "1:434290198239:web:a56983c6f74da146830b6a",
    measurementId: "G-FMB4BZ07DR"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
