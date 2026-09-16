// Firebase Authentication
import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// PROTECT HOME PAGE
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in → go to login page
    window.location.href = "index.html";
    return;
  }

  // User is logged in
  console.log("User authenticated:", user.email);
});


// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
