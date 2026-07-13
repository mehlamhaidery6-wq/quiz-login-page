import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ===============================
// HTML Elements
// ===============================

const form = document.getElementById("loginForm");

const username = document.getElementById("username");
const gmail = document.getElementById("gmail");
const quizPasscode = document.getElementById("quizPasscode");
const phone = document.getElementById("phone");

const togglePassword = document.getElementById("togglePassword");

// ===============================
// Show / Hide Passcode
// ===============================

togglePassword.addEventListener("click", () => {

    if (quizPasscode.type === "password") {

        quizPasscode.type = "text";
        togglePassword.innerHTML = "🙈";

    } else {

        quizPasscode.type = "password";
        togglePassword.innerHTML = "👁️";

    }

});

// ===============================
// Validation Functions
// ===============================

function validateUsername() {

    const value = username.value.trim();

    if (value === "") {

        alert("❌ Username is required.");
        username.focus();
        return false;

    }

    if (value.length < 3) {

        alert("❌ Username must contain at least 3 characters.");
        username.focus();
        return false;

    }

    return true;

}

// -------------------------------

function validateGmail() {

    const value = gmail.value.trim();

    if (value === "") {

        alert("❌ Gmail Address is required.");
        gmail.focus();
        return false;

    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(value)) {

        alert("❌ Please enter a valid Gmail Address.");
        gmail.focus();
        return false;

    }

    return true;

}

// -------------------------------

function validatePhone() {

    const value = phone.value.trim();

    if (value === "") {

        alert("❌ Phone Number is required.");
        phone.focus();
        return false;

    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(value)) {

        alert("❌ Enter a valid 10-digit Phone Number.");
        phone.focus();
        return false;

    }

    return true;

}

// -------------------------------

function validatePasscode() {

    const value = quizPasscode.value.trim();

    if (value === "") {

        alert("❌ Quiz Passcode is required.");
        quizPasscode.focus();
        return false;

    }

    if (value.length < 4) {

        alert("❌ Quiz Passcode must contain at least 4 characters.");
        quizPasscode.focus();
        return false;

    }

    return true;

}

// ===============================
// Submit Form
// ===============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Validation

    if (!validateUsername()) return;

    if (!validateGmail()) return;

    if (!validatePhone()) return;

    if (!validatePasscode()) return;

    try {

        // Save Data to Firebase

        await addDoc(collection(db, "students"), {

            username: username.value.trim(),

            gmail: gmail.value.trim(),

            phone: phone.value.trim(),

            quizPasscode: quizPasscode.value.trim(),

            loginDate: new Date().toLocaleDateString(),

            loginTime: new Date().toLocaleTimeString()

        });

        alert("✅ Login Successful!\nRedirecting to Quiz...");

        // Replace this with your Google Form Link

        window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSe4MTR-Arc4cfIMQHS1Rfe4oX2IHoEmnGgg9uSHQKC4n5Q1Lw/viewform?usp=publish-editor";

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to save data to Firebase.");

    }

});