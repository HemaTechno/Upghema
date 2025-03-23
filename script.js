function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-250px" : "0px";
}
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

function loadPage(page) {
    document.getElementById("content-frame").src = page;
}

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const mainContent = document.querySelector(".main-content");

    // فتح القائمة
    openBtn.addEventListener("click", function () {
        sidebar.classList.add("open");
        mainContent.classList.add("shift");
    });

    // إغلاق القائمة
    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("open");
        mainContent.classList.remove("shift");
    });
});

// تغيير محتوى الصفحة داخل الـ iframe
function loadPage(page) {
    document.getElementById("content-frame").src = page;
}

// دالة تسجيل الخروج
function logout() {
    alert("تم تسجيل الخروج!");
}

    function toggleSidebar() {
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("closed");

        // تعديل الـ margin للمحتوى عند فتح الشريط أو إغلاقه
        var mainContent = document.querySelector(".main-content");
        if (sidebar.classList.contains("closed")) {
            mainContent.style.marginLeft = "60px";
        } else {
            mainContent.style.marginLeft = "250px";
        }
    }


// تكوين Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBespCtavesyrdzKcB3LRr4vXd_U6XhfO4",
    authDomain: "token-9ae6a.firebaseapp.com",
    projectId: "token-9ae6a",
    storageBucket: "token-9ae6a.appspot.com",
    messagingSenderId: "434290198239",
    appId: "1:434290198239:web:a56983c6f74da146830b6a",
    measurementId: "G-FMB4BZ07DR"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("scripts").get().then((querySnapshot) => {
    const scriptsContainer = document.getElementById("scriptsContainer");
    querySnapshot.forEach((doc) => {
        const scriptData = doc.data();
        const scriptBox = document.createElement("div");
        scriptBox.classList.add("script-box");

        scriptBox.innerHTML = `
            <div class="script-title">${scriptData.title}</div>
            <div class="script-description">${scriptData.description}</div>
            <div class="script-platform">
                <img src="${getPlatformImage(scriptData.platform)}" alt="${scriptData.platform}" class="platform-image">
            </div>
            <a href="${scriptData.downloadLink}" class="script-link" target="_blank">رابط التحميل</a>
            <button class="share-button" onclick="shareLink('${doc.id}')">مشاركة</button>
        `;
        scriptsContainer.appendChild(scriptBox);
    });
});

function shareLink(id) {
    const link = `https://h-scripts.site/hack?id=${id}`;
    navigator.clipboard.writeText(link).then(() => {
        alert("تم نسخ الرابط للمشاركة!");
    }).catch(err => {
        console.error('خطأ في النسخ: ', err);
    });
}

function getPlatformImage(platform) {
    const images = {
        "android": "20241106_182915.png",
        "ios": "20241106_182935.png",
        "windows": "20241106_182953.png",
        "linux": "https://i.ibb.co/XVqYwdS/unnamed.png"
    };
    return images[platform.toLowerCase()] || "default.png";
}

// تبديل الصور في البنرات
let currentIndex = 0;
const images = document.querySelectorAll('.banner-container img');
setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}, 3000);


        if (!localStorage.getItem("notificationHidden")) {
        document.getElementById("notificationOverlay").style.display = "flex";
    }

    function hideNotification() {
        document.getElementById("notificationOverlay").style.display = "none";
        localStorage.setItem("notificationHidden", "true");
    }
