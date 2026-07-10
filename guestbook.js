import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const nameInput = document.getElementById("guest-name");
const messageInput = document.getElementById("guest-message");
const submitButton = document.getElementById("guest-submit");
const guestList = document.getElementById("guest-list");

let currentUser = null;


/* 익명 로그인 상태 확인 */

onAuthStateChanged(auth, function (user) {
  currentUser = user;

  if (submitButton) {
    submitButton.disabled = !user;

    submitButton.textContent = user
      ? "♡ Leave Message ♡"
      : "Connecting...";
  }
});


/* 방명록 저장 */

if (submitButton) {
  submitButton.addEventListener("click", async function () {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!currentUser) {
      alert("방명록에 연결 중이에요. 잠시 후 다시 눌러주세요!");
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

    if (name.length > 30) {
      alert("닉네임은 30자 이하로 입력해주세요!");
      return;
    }

    if (message.length > 500) {
      alert("메시지는 500자 이하로 입력해주세요!");
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

      submitButton.textContent = "♡ Saved! ♡";

      setTimeout(function () {
        submitButton.textContent = "♡ Leave Message ♡";
      }, 1000);

    } catch (error) {
      console.error("방명록 저장 오류:", error);
      alert("저장에 실패했어요. Firestore 규칙을 확인해주세요!");

    } finally {
      submitButton.disabled = false;
    }
  });
}


/* 저장된 방명록 실시간 불러오기 */

if (guestList) {
  const guestbookQuery = query(
    collection(db, "guestbook"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(
    guestbookQuery,

    function (snapshot) {
      guestList.innerHTML = "";

      if (snapshot.empty) {
        guestList.innerHTML =
          '<div class="guest-empty">아직 남겨진 메시지가 없어요 ♡</div>';

        return;
      }

      snapshot.forEach(function (documentSnapshot) {
        const data = documentSnapshot.data();

        const card = document.createElement("div");
        card.className = "guest-card";

        const name = document.createElement("div");
        name.className = "guest-card-name";
        name.textContent = "♡ " + (data.name || "Anonymous");

        const message = document.createElement("div");
        message.className = "guest-card-message";
        message.textContent = data.message || "";

        const time = document.createElement("div");
        time.className = "guest-card-time";

        if (data.createdAt && data.createdAt.toDate) {
          time.textContent =
            data.createdAt.toDate().toLocaleString("ko-KR");
        } else {
          time.textContent = "방금 전";
        }

        card.appendChild(name);
        card.appendChild(message);
        card.appendChild(time);

        guestList.appendChild(card);
      });
    },

    function (error) {
      console.error("방명록 불러오기 오류:", error);

      guestList.innerHTML =
        '<div class="guest-empty">방명록을 불러오지 못했어요.</div>';
    }
  );
}