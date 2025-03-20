document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
        apiKey: "AIzaSyDoK427q44Fj87JhgZh2vKeUnACkjl8HDc",
        authDomain: "treng-c6027.firebaseapp.com",
        projectId: "treng-c6027",
        storageBucket: "treng-c6027.appspot.com",
        messagingSenderId: "305527546716",
        appId: "1:305527546716:web:fd072a58200f31bb42d799",
        measurementId: "G-3JFKFT2LT0"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const urlParams = new URLSearchParams(window.location.search);
    const scriptId = urlParams.get("id");

    async function loadScriptDetails() {
        const doc = await db.collection("scripts").doc(scriptId).get();
        if (doc.exists) {
            const script = doc.data();
            document.getElementById("scriptTitle").innerText = script.title;
            document.getElementById("scriptImage").src = script.imageUrl;
            document.getElementById("scriptDescription").innerText = script.description;
            document.getElementById("codeEditor").innerText = script.scriptName;
        } else {
            document.querySelector(".script-container").innerHTML = "<p>عذرًا، لا يمكن العثور على تفاصيل السكربت.</p>";
        }
    }

    loadScriptDetails();
});

function downloadScript() {
    const codeContent = document.getElementById("codeEditor").innerText;
    const blob = new Blob([codeContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "script.txt";
    link.click();
}

function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    if (currentLang === "ar") {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        location.reload();
    } else {
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
        location.reload();
    }
}
