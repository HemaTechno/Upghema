document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    const toggleBtn = document.querySelector(".toggle-btn");

    // دالة فتح وإغلاق الشريط الجانبي
    function toggleSidebar() {
        sidebar.classList.toggle("closed");
        mainContent.style.marginLeft = sidebar.classList.contains("closed") ? "60px" : "250px";
    }

    // عند الضغط على زر القائمة
    toggleBtn.addEventListener("click", toggleSidebar);

    // تحميل الصفحات داخل الـ iframe
    window.loadPage = function (page) {
        document.getElementById("content-frame").src = page;
    };

    // دالة تسجيل الخروج
    window.logout = function () {
        alert("تم تسجيل الخروج!");
    };
});
