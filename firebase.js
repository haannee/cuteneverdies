import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIX_9H3wjKPk2TGshsYa8GOsB7vrD43z4",
  authDomain: "cuteneverdies.firebaseapp.com",
  projectId: "cuteneverdies",
  storageBucket: "cuteneverdies.firebasestorage.app",
  messagingSenderId: "776777303124",
  appId: "1:776777303124:web:5215883dc2a007b89999c1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

signInAnonymously(auth)
  .then(function () {
    alert("익명 로그인 성공!");
  })
  .catch(function (error) {
    alert("Firebase 연결 실패");
    console.error(error);
  });

export { app, auth, db };