import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAy-11rYg3g4a3q9vAwKXZNL5GPg5B4t5s",
    authDomain: "quiz-login-e84bb.firebaseapp.com",
    projectId: "quiz-login-e84bb",
    storageBucket: "quiz-login-e84bb.firebasestorage.app",
    messagingSenderId: "765982739856",
    appId: "1:765982739856:web:506d0a1baa4ec2a7b8b715",
    measurementId: "G-5V2B4BEKPM"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };