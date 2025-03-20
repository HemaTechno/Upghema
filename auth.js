import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// دالة تسجيل الدخول
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // إعادة توجيه الأدمن إلى لوحة التحكم
            window.location.href = "admin.html";
        })
        .catch((error) => {
            errorMessage.textContent = "خطأ في تسجيل الدخول. تحقق من البيانات.";
        });
}

window.login = login;
