import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const nameInput = document.getElementById("guest-name");
const messageInput = document.getElementById("guest-message");
const submitButton = document.getElementById("guest-submit");

let currentUser = null;

onAuthStateChanged(auth, function (user) {
  currentUser = user;

  if (submitButton) {
    submitButton.disabled = !user;
    submitButton.textContent = user
      ? "♡ Leave Message ♡"
      : "Connecting...";
  }
});

if (submitButton) {
  submitButton.addEventListener("click", async function () {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!currentUser) {
      alert("방명록 연결 중이에요. 잠시 후 다시 눌러주세요!");
      return;
    }

    if (!name) {
      alert("닉네임을 입력해주세요!");
      nameInput.focus();
      return;
    }

    if (!message) {
      alert("메시지를 입력해주세요!");
      messageInput.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Saving...";

    try {
      await addDoc(collection(db, "guestbook"), {
        name: name,
        message: message,
        uid: currentUser.uid,
        createdAt: serverTimestamp()
      });

      nameInput.value = "";
      messageInput.value = "";

      alert("방명록이 저장됐어요! ♡");
    } catch (error) {
      console.error("방명록 저장 오류:", error);
      alert("저장에 실패했어요. Firestore 규칙을 확인해주세요!");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "♡ Leave Message ♡";
    }
  });
}