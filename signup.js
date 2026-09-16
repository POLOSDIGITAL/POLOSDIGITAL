
import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");
const message = document.getElementById("signupMessage");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// SHOW / HIDE PASSWORD
togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});

// SHOW / HIDE CONFIRM PASSWORD
toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.textContent = "Hide";
    } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.textContent = "Show";
    }

});

// SIGN UP
signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "#f87171";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "#f87171";
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await setDoc(
            doc(db, "users", user.uid),
            {
                uid: user.uid,
                name: name,
                email: email,
                phone: phone,
                createdAt: new Date()
            }
        );

        message.textContent = "Account created successfully!";
        message.style.color = "#4ade80";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        message.style.color = "#f87171";

        if (error.code === "auth/email-already-in-use") {
            message.textContent = "This email is already registered.";
        }
        else if (error.code === "auth/invalid-email") {
            message.textContent = "Please enter a valid email address.";
        }
        else if (error.code === "auth/weak-password") {
            message.textContent = "Password is too weak.";
        }
        else {
            message.textContent = error.message;
        }

    }

});

