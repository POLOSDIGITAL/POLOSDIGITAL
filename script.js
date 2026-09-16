```javascript
// Firebase Authentication
import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// CHECK LOGIN STATUS

onAuthStateChanged(auth, (user) => {

  if (!user) {

    // User is NOT logged in
    window.location.href = "login.html";

    return;
  }

  // User is logged in
  console.log("User logged in:", user.email);

});


// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    e.preventDefault();

    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});
```
