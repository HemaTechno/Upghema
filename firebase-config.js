// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ضع بيانات Firebase الخاصة بمشروعك هنا
const firebaseConfig = {
  apiKey: "AIzaSyDoK427q44Fj87JhgZh2vKeUnACkjl8HDc",
  authDomain: "treng-c6027.firebaseapp.com",
  projectId: "treng-c6027",
  storageBucket: "treng-c6027.appspot.com",
  messagingSenderId: "305527546716",
  appId: "1:305527546716:web:fd072a58200f31bb42d799",
  measurementId: "G-3JFKFT2LT0"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
