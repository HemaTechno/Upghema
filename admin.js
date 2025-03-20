import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// التحقق من تسجيل الدخول
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html"; // إعادة التوجيه لصفحة تسجيل الدخول إذا لم يكن الأدمن مسجلًا
    }
});

// دالة تسجيل الخروج
function logout() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
}

window.logout = logout;
