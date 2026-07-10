window.addEventListener("DOMContentLoaded", function () {
  let topZ = 1000;

  const playlist = [
    { title: "어제처럼", file: "music/어제처럼.mp3" },
    { title: "만약에", file: "music/만약에.mp3" },
    { title: "WeBelongTogether", file: "music/WeBelongTogether.mp3" },
    { title: "거짓말", file: "music/거짓말.mp3" },
    { title: "OrdinaryPeople", file: "music/OrdinaryPeople.mp3" },
    { title: "슬픈다짐", file: "music/슬픈다짐.mp3" },
    { title: "길에서", file: "music/길에서.mp3" },
    { title: "눈물도아까워", file: "music/눈물도아까워.mp3" },
    { title: "잘가요내사랑", file: "music/잘가요내사랑.mp3" },
    { title: "한번더OK?", file: "music/한번더OK?.mp3" },
    { title: "비밀번호486", file: "music/비밀번호486.mp3" },
    { title: "Memories", file: "music/Memories.mp3" },
    { title: "사고쳤어요", file: "music/사고쳤어요.mp3" },
    { title: "TrueRomance", file: "music/TrueRomance.mp3" },
    { title: "Fan", file: "music/Fan.mp3" },
    { title: "선곡표", file: "music/선곡표.mp3" },
    { title: "전화한번못하니", file: "music/전화한번못하니.mp3" },
    { title: "좋아해", file: "music/좋아해.mp3" },
    { title: "보란듯이", file: "music/보란듯이.mp3" },
    { title: "Honey", file: "music/Honey.mp3" },
    { title: "UrbanGreen", file: "music/UrbanGreen.mp3" },
    { title: "1분1초", file: "music/1분1초.mp3" },
    { title: "인형의꿈", file: "music/인형의꿈.mp3" },
    { title: "안부", file: "music/안부.mp3" },
    { title: "오정반합", file: "music/오정반합.mp3" },
    { title: "BabyBaby", file: "music/BabyBaby.mp3" },
    { title: "이바보", file: "music/이바보.mp3" },
    { title: "토요일오후에", file: "music/토요일오후에.mp3" },
    { title: "비행기", file: "music/비행기.mp3" },
    { title: "칵테일사랑", file: "music/칵테일사랑.mp3" },
    { title: "눈의꽃", file: "music/눈의꽃.mp3" },
    { title: "KissingYou", file: "music/KissingYou.mp3" },
    { title: "얼음연못", file: "music/얼음연못.mp3" },
    { title: "천둥", file: "music/천둥.mp3" },
    { title: "죽을만큼아파서", file: "music/죽을만큼아파서.mp3" },
    { title: "HowDeepIsYourLove", file: "music/HowDeepIsYourLove.mp3" },
    { title: "NeverEndingStory", file: "music/NeverEndingStory.mp3" },
    { title: "기억을걷는시간", file: "music/기억을걷는시간.mp3" },
    { title: "다이어리", file: "music/다이어리.mp3" },
    { title: "Rain", file: "music/Rain.mp3" },
    { title: "사랑해", file: "music/사랑해.mp3" },
    { title: "헤어지지못하는여자떠나가지못하는남자", file: "music/헤어지지못하는여자떠나가지못하는남자.mp3" }
  ];

  const effects = [
  "images/effects/heart.png",
  "images/effects/ribbon.png",
  "images/effects/rabbit.png",
  "images/effects/berry.png",
  "images/effects/flower.png",
  "images/effects/book.png",
  "images/effects/letter.png",
  "images/effects/CD.png",
  "images/effects/coffee.png"
];

const glitters = [
  "images/effects/glitter1.png",
  "images/effects/glitter2.png"
];

const albumCovers = effects;

let currentSong = 0;
let started = false;

const bgm = document.getElementById("bgm");
const songTitle = document.getElementById("song-title");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const barFill = document.querySelector(".bar-fill");
const albumCover = document.getElementById("album-cover");


/* ===========================
   WINDOW
=========================== */

function bringToFront(win) {
  win.style.zIndex = ++topZ;
}

document.querySelectorAll(".window").forEach(function (win) {
  win.addEventListener("mousedown", function () {
    bringToFront(win);
  });
});

document.querySelectorAll(".title-bar").forEach(function (bar) {
  const win = bar.closest(".window");
  if (!win) return;

  bar.addEventListener("mousedown", function (e) {
    if (e.target.tagName === "BUTTON") return;

    e.preventDefault();

    const rect = win.getBoundingClientRect();

    win.style.position = "absolute";
    win.style.left = rect.left + window.scrollX + "px";
    win.style.top = rect.top + window.scrollY + "px";
    win.style.width = rect.width + "px";

    bringToFront(win);

    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    function move(e) {
      win.style.left =
        e.clientX + window.scrollX - shiftX + "px";

      win.style.top =
        e.clientY + window.scrollY - shiftY + "px";
    }

    function stop() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  });
});

document.querySelectorAll(".min-btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const win = btn.closest(".window");
    if (!win) return;

    win.classList.toggle("minimized");
    bringToFront(win);
  });
});

document.querySelectorAll(".close-btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const win = btn.closest(".window");
    if (!win) return;

    win.classList.add("closed");
  });
});

document
  .querySelectorAll(".menu-list li[data-window]")
  .forEach(function (item) {
    item.addEventListener("click", function () {
      const win =
        document.querySelector("." + item.dataset.window);

      if (!win) return;

      win.classList.remove("closed");
      win.classList.remove("minimized");

      bringToFront(win);

      win.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  });


/* ===========================
   PLAYLIST
=========================== */

function renderPlaylist() {
  const list = document.getElementById("playlist-list");
  if (!list) return;

  list.innerHTML = "";

  playlist.forEach(function (song, index) {
    const item = document.createElement("div");

    item.className = "playlist-item";
    item.textContent = "♪ " + song.title;

    if (index === currentSong) {
      item.classList.add("active");
    }

    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      currentSong = index;
      started = true;

      loadSong(currentSong);
      playSong();
    });

    list.appendChild(item);
  });
}

function loadSong(index) {
  if (!bgm || !playlist[index]) return;

  bgm.src = playlist[index].file;

  if (songTitle) {
    songTitle.textContent = playlist[index].title;
  }

  if (barFill) {
    barFill.style.width = "0%";
  }

  if (albumCover) {
    const randomCover =
      albumCovers[
        Math.floor(Math.random() * albumCovers.length)
      ];

    albumCover.src = randomCover;
  }

  renderPlaylist();
}

function playSong() {
  if (!bgm) return;

  bgm.play()
    .then(function () {
      if (albumCover) {
        albumCover.classList.add("album-spin");
      }
    })
    .catch(function (error) {
      console.error("BGM 재생 오류:", error);

      alert(
        "BGM 파일을 재생할 수 없어요. 파일명과 music 폴더를 확인해주세요!"
      );
    });
}
function startRandomMusic() {
  if (started) return;

  started = true;

  currentSong =
    Math.floor(Math.random() * playlist.length);

  loadSong(currentSong);
  playSong();
}

function nextSong() {
  currentSong++;

  if (currentSong >= playlist.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }

  loadSong(currentSong);
  playSong();
}

if (playBtn) {
  playBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    started = true;
    playSong();
  });
}

if (pauseBtn) {
  pauseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (bgm) {
      bgm.pause();
    }

    if (albumCover) {
      albumCover.classList.remove("album-spin");
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    started = true;
    nextSong();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    started = true;
    prevSong();
  });
}

if (bgm) {
  bgm.addEventListener("timeupdate", function () {
    if (!bgm.duration || !barFill) return;

    const percent =
      (bgm.currentTime / bgm.duration) * 100;

    barFill.style.width = percent + "%";
  });

  bgm.addEventListener("ended", function () {
    nextSong();
  });
}

/* 처음 화면을 클릭하면 랜덤 BGM 시작 */
document.addEventListener(
  "mousedown",
  function () {
    startRandomMusic();
  },
  { once: true }
);


/* ===========================
   CLICK EXPLOSION
=========================== */

document.addEventListener("click", function (e) {
  if (e.target.closest("button")) return;

  for (let i = 0; i < 14; i++) {
    const img = document.createElement("img");

    img.src =
      effects[
        Math.floor(Math.random() * effects.length)
      ];

    img.className = "effect";

    img.style.left = e.clientX + "px";
    img.style.top = e.clientY + "px";

    const angle = Math.random() * Math.PI * 2;
    const distance = 220 + Math.random() * 220;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const rotation =
      (Math.random() - 0.5) * 240;

    const size =
      65 + Math.random() * 45;

    img.style.setProperty("--x", x + "px");
    img.style.setProperty("--y", y + "px");
    img.style.setProperty(
      "--r",
      rotation + "deg"
    );

    img.style.width = size + "px";

    document.body.appendChild(img);

    setTimeout(function () {
      img.remove();
    }, 1800);
  }
});


/* ===========================
   RIBBON + GLITTER + SYMBOL
=========================== */

let lastTrailTime = 0;
let lastSymbolTime = 0;

document.addEventListener("mousemove", function (e) {
  const now = Date.now();

  /* 리본과 글리터: 더 많이, 오래 남도록 */
  if (now - lastTrailTime >= 90) {
    lastTrailTime = now;

    for (let i = 0; i < 2; i++) {
      const trail =
        document.createElement("img");

      trail.src =
        "images/effects/ribbon.png";

      trail.className = "cursor-trail";

      trail.style.left =
        e.clientX +
        (Math.random() - 0.5) * 38 +
        "px";

      trail.style.top =
        e.clientY +
        (Math.random() - 0.5) * 38 +
        "px";

      document.body.appendChild(trail);

      setTimeout(function () {
        trail.remove();
      }, 1500);
    }

    for (let i = 0; i < 3; i++) {
      const glitter =
        document.createElement("img");

      glitter.src =
        glitters[
          Math.floor(
            Math.random() * glitters.length
          )
        ];

      glitter.className = "glitter";

      glitter.style.left =
        e.clientX +
        (Math.random() - 0.5) * 70 +
        "px";

      glitter.style.top =
        e.clientY +
        (Math.random() - 0.5) * 70 +
        "px";

      document.body.appendChild(glitter);

      setTimeout(function () {
        glitter.remove();
      }, 1000);
    }
  }

  /* ♡ ✦ ✧ 심볼 */
  if (now - lastSymbolTime >= 380) {
    lastSymbolTime = now;

    const symbol =
      document.createElement("div");

    const chars = ["♡", "✦", "✧", "♡"];

    symbol.className = "cursor-symbol";

    symbol.textContent =
      chars[
        Math.floor(Math.random() * chars.length)
      ];

    symbol.style.left =
      e.clientX +
      (Math.random() - 0.5) * 100 +
      "px";

    symbol.style.top =
      e.clientY +
      (Math.random() - 0.5) * 100 +
      "px";

    symbol.style.fontSize =
      28 + Math.random() * 18 + "px";

    document.body.appendChild(symbol);

    setTimeout(function () {
      symbol.remove();
    }, 1800);
  }
});


/* ===========================
   CRT
=========================== */

const crtBtn =
  document.getElementById("crt-btn");

if (crtBtn) {
  crtBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    document.body.classList.toggle("crt-on");

    crtBtn.textContent =
      document.body.classList.contains("crt-on")
        ? "CRT ON"
        : "CRT OFF";
  });
}


/* ===========================
   NIGHT MODE
=========================== */

const darkBtn =
  document.getElementById("dark-btn");

if (darkBtn) {
  darkBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    document.body.classList.toggle(
      "night-mode"
    );

    darkBtn.textContent =
      document.body.classList.contains(
        "night-mode"
      )
        ? "NIGHT ON"
        : "NIGHT OFF";
  });
}


/* ===========================
   VISITOR COUNTER
=========================== */

const counter =
  document.getElementById("visitor-counter");

if (counter) {
  let number = 1234;

  function updateCounter() {
    const text =
      String(number).padStart(6, "0");

    counter.innerHTML = "";

    text.split("").forEach(function (digit) {
      const span =
        document.createElement("span");

      span.textContent = digit;
      counter.appendChild(span);
    });
  }

  updateCounter();

  setTimeout(function () {
    number++;
    updateCounter();
  }, 2000);
}


/* ===========================
   FALLING HEARTS
=========================== */

setInterval(function () {
  const heart =
    document.createElement("div");

  const heartShapes = [
    "♡",
    "♥",
    "❤",
    "❣"
  ];

  const colors = [
    "#ff8dbf",
    "#ffffff"
  ];

  heart.className = "falling-heart";

  heart.textContent =
    heartShapes[
      Math.floor(
        Math.random() * heartShapes.length
      )
    ];

  heart.style.color =
    colors[
      Math.floor(
        Math.random() * colors.length
      )
    ];

  heart.style.left =
    Math.random() *
      (window.innerWidth - 50) +
    "px";

  heart.style.top = "-50px";

  heart.style.fontSize =
    28 + Math.random() * 20 + "px";

  heart.style.animationDuration =
    7 + Math.random() * 5 + "s";

  document.body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 12500);
}, 500);


/* 첫 곡과 플레이리스트 화면 준비 */
loadSong(currentSong);

});