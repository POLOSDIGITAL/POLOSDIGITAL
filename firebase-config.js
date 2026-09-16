import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ5Ylc6YwkmwQpJkewc3YeBzuHefiBAUc",
  authDomain: "polos-db-fa093.firebaseapp.com",
  projectId: "polos-db-fa093",
  storageBucket: "polos-db-fa093.firebasestorage.app",
  messagingSenderId: "130277666906",
  appId: "1:130277666906:web:1de72ba3f6209a846ee863",
  measurementId: "G-BM03FSH6EW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
