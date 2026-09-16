
import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const forgotPassword = document.getElementById("forgotPassword");


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


// LOGIN
loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  loginMessage.textContent = "";
  loginMessage.style.color = "#f87171";

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;

  console.log("Login email:", email);
  console.log("Password length:", password.length);

  // Basic validation
  if (!email || !password) {
    loginMessage.textContent = "Please enter email and password.";
    return;
  }

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Firebase login successful!");
    console.log("Logged in user:", userCredential.user.email);

    loginMessage.style.color = "#4ade80";
    loginMessage.textContent = "Login successful!";

    // Redirect to main website
    window.location.href = "index.html";

  } catch (error) {

    console.error("Firebase error code:", error.code);
    console.error("Firebase error message:", error.message);

    loginMessage.style.color = "#f87171";

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/invalid-login-credentials"
    ) {

      loginMessage.textContent =
        "Email or password is incorrect.";

    } else if (error.code === "auth/user-not-found") {

      loginMessage.textContent =
        "No account exists with this email.";

    } else if (error.code === "auth/wrong-password") {

      loginMessage.textContent =
        "Password is incorrect.";

    } else if (error.code === "auth/invalid-email") {

      loginMessage.textContent =
        "Please enter a valid email.";

    } else if (error.code === "auth/too-many-requests") {

      loginMessage.textContent =
        "Too many attempts. Please try again later.";

    } else {

      loginMessage.textContent =
        error.message;

    }

  }

});

// FORGOT PASSWORD

forgotPassword.addEventListener("click", async (event) => {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  // Check email
  if (!email) {
    loginMessage.style.color = "#f87171";
    loginMessage.textContent =
      "Please enter your email address first.";
    return;
  }

  try {

    // Send Firebase password reset email
    await sendPasswordResetEmail(auth, email);

    loginMessage.style.color = "#4ade80";
    loginMessage.textContent =
      "Password reset email sent! Check your spam inbox.";

  } catch (error) {

    console.error("Password reset error:", error);

    loginMessage.style.color = "#f87171";

    if (error.code === "auth/invalid-email") {

      loginMessage.textContent =
        "Please enter a valid email address.";

    } else if (error.code === "auth/user-not-found") {

      loginMessage.textContent =
        "No account exists with this email.";

    } else if (error.code === "auth/too-many-requests") {

      loginMessage.textContent =
        "Too many requests. Please try again later.";

    } else {

      loginMessage.textContent =
        "Unable to send reset email. Please try again.";

    }
  }

});


