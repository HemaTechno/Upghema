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

