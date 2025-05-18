import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // تحويل لصفحة تسجيل الدخول
  } else {
    const name = user.displayName;
    const photo = user.photoURL;

    document.getElementById("user-name").textContent = name;
    document.getElementById("user-pic").src = photo;
  }
});

window.logout = async function () {
  try {
    await signOut(auth);
    alert("تم تسجيل الخروج");
    window.location.href = "index.html";
  } catch (error) {
    console.error("خطأ في تسجيل الخروج:", error);
  }
};
