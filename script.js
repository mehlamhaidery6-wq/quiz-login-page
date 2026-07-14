import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ==========================================
// HTML ELEMENTS
// ==========================================

const form = document.getElementById("loginForm");

const username = document.getElementById("username");
const gmail = document.getElementById("gmail");
const phone = document.getElementById("phone");
const quizPasscode = document.getElementById("quizPasscode");

const togglePassword = document.getElementById("togglePassword");

const submitBtn = form.querySelector("button");

const typingText = document.getElementById("typing-text");

// ==========================================
// TYPING EFFECT
// ==========================================

const message = "Secure Authentication Required";

typingText.innerHTML = "";

let i = 0;

function typingEffect() {

    if (i < message.length) {

        typingText.innerHTML += message.charAt(i);

        i++;

        setTimeout(typingEffect, 45);

    }

}

typingEffect();

// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener("click", () => {

    const icon = togglePassword.querySelector("i");

    if (quizPasscode.type === "password") {

        quizPasscode.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }

    else {

        quizPasscode.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

});

// ==========================================
// VALIDATION
// ==========================================

function validateUsername() {

    const value = username.value.trim();

    if (value === "") {

        alert("❌ Username cannot be empty.");

        username.focus();

        return false;

    }

    if (value.length < 3) {

        alert("❌ Username should contain at least 3 characters.");

        username.focus();

        return false;

    }

    return true;

}

// ------------------------------------------

function validateGmail() {

    const value = gmail.value.trim();

    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (value === "") {

        alert("❌ Gmail Address is required.");

        gmail.focus();

        return false;

    }

    if (!regex.test(value)) {

        alert("❌ Please enter a valid Gmail Address.");

        gmail.focus();

        return false;

    }

    return true;

}

// ------------------------------------------

function validatePhone() {

    const value = phone.value.trim();

    const regex = /^[0-9]{10}$/;

    if (value === "") {

        alert("❌ Phone Number is required.");

        phone.focus();

        return false;

    }

    if (!regex.test(value)) {

        alert("❌ Phone Number must contain exactly 10 digits.");

        phone.focus();

        return false;

    }

    return true;

}

// ------------------------------------------

function validatePasscode() {

    const value = quizPasscode.value.trim();

    if (value === "") {

        alert("❌ Quiz Passcode is required.");

        quizPasscode.focus();

        return false;

    }

    if (value.length < 4) {

        alert("❌ Quiz Passcode should contain at least 4 characters.");

        quizPasscode.focus();

        return false;

    }

    return true;

}

// ==========================================
// SUBMIT FORM
// ==========================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!validateUsername()) return;

    if (!validateGmail()) return;

    if (!validatePhone()) return;

    if (!validatePasscode()) return;

    submitBtn.disabled = true;

    submitBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';

    try {

        await addDoc(collection(db, "students"), {

            username: username.value.trim(),

            gmail: gmail.value.trim(),

            phone: phone.value.trim(),

            quizPasscode: quizPasscode.value.trim(),

            loginDate: new Date().toLocaleDateString(),

            loginTime: new Date().toLocaleTimeString()

        });

        submitBtn.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Access Granted';

        submitBtn.style.background =
            "linear-gradient(90deg,#00ff9d,#00d9ff)";

        setTimeout(() => {

            alert("✅ Authentication Successful!\nRedirecting to Quiz...");

            window.location.href =
                "https://docs.google.com/forms/d/e/1FAIpQLSe4MTR-Arc4cfIMQHS1Rfe4oX2IHoEmnGgg9uSHQKC4n5Q1Lw/viewform?usp=publish-editor";

        }, 1500);

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to connect to Firebase.");

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="fa-solid fa-shield"></i> ACCESS QUIZ';

    }

});