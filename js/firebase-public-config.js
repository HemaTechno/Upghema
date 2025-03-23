// js/firebase-public-config.js
const firebaseConfigPublic = {
    apiKey: "AIzaSyDoK427q44Fj87JhgZh2vKeUnACkjl8HDc",
    authDomain: "treng-c6027.firebaseapp.com",
    projectId: "treng-c6027",
    storageBucket: "treng-c6027.appspot.com",
    messagingSenderId: "305527546716",
    appId: "1:305527546716:web:fd072a58200f31bb42d799",
    measurementId: "G-3JFKFT2LT0"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfigPublic);
const db = firebase.firestore();
