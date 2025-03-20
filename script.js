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

// دالة تسجيل الخروج (مثال)
function logout() {
    alert("تم تسجيل الخروج!");
    // يمكنك إضافة كود تسجيل خروج Firebase هنا
}
