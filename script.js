window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  let topZ = 1000;
  let currentSong = 0;
  let musicStarted = false;
  let lastTrailTime = 0;
  let lastSymbolTime = 0;

  /* ===========================
     DATA
  =========================== */

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
    { title: "한번더OK_", file: "music/한번더OK_.mp3" },
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
    {
      title: "헤어지지못하는여자떠나가지못하는남자",
      file: "music/헤어지지못하는여자떠나가지못하는남자.mp3"
    }
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

  /* ===========================
     ELEMENTS
  =========================== */

  const bgm = document.getElementById("bgm");
  const songTitle = document.getElementById("song-title");
  const nowPlayingText =
    document.getElementById("now-playing-text");

  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const barFill = document.querySelector(".bar-fill");
  const albumCover = document.getElementById("album-cover");

  const darkBtn = document.getElementById("dark-btn");
  const crtBtn = document.getElementById("crt-btn");

  const visitorCounter =
    document.getElementById("visitor-counter");

  const digitalClock =
    document.getElementById("digital-clock");

  const addBedBtn =
    document.getElementById("add-bed-btn");

  const roomBedItem =
    document.getElementById("room-bed-item");

  /* ===========================
     WINDOW HELPERS
  =========================== */

  function bringToFront(win) {
    if (!win) return;

    document
      .querySelectorAll(".window")
      .forEach(function (otherWin) {
        otherWin.classList.remove("active-window");
      });

    win.classList.add("active-window");
    win.style.zIndex = String(++topZ);
  }

  function playOpeningAnimation(win) {
    win.classList.remove("opening");

    void win.offsetWidth;

    win.classList.add("opening");

    setTimeout(function () {
      win.classList.remove("opening");
    }, 300);
  }

  function centerWindow(win) {
    win.style.position = "fixed";
    win.style.left = "50%";
    win.style.top = "50%";
    win.style.transform = "translate(-50%, -50%)";
  }

  function openWindow(windowClass) {
    if (!windowClass) return;

    const win =
      document.querySelector("." + windowClass);

    if (!win) return;

    win.classList.remove("closed");
    win.classList.remove("minimized");
    win.classList.remove("maximized");

    const maxBtn =
      win.querySelector(".max-btn");

    if (maxBtn) {
      maxBtn.textContent = "□";
    }

    centerWindow(win);
    playOpeningAnimation(win);
    bringToFront(win);
  }

  /* ===========================
     WINDOW CONTROLS
  =========================== */

  document
    .querySelectorAll(".window")
    .forEach(function (win) {
      win.addEventListener("mousedown", function () {
        bringToFront(win);
      });
    });

  document
    .querySelectorAll(".title-bar")
    .forEach(function (bar) {
      const win = bar.closest(".window");

      if (!win) return;

      bar.addEventListener("mousedown", function (event) {
        if (event.target.closest("button")) return;

        if (win.classList.contains("maximized")) {
          return;
        }

        event.preventDefault();

        const rect =
          win.getBoundingClientRect();

        const shiftX =
          event.clientX - rect.left;

        const shiftY =
          event.clientY - rect.top;

        win.style.position = "absolute";

        win.style.left =
          rect.left +
          window.scrollX +
          "px";

        win.style.top =
          rect.top +
          window.scrollY +
          "px";

        win.style.width =
          rect.width + "px";

        win.style.transform = "none";

        bringToFront(win);

        function move(moveEvent) {
          win.style.left =
            moveEvent.clientX +
            window.scrollX -
            shiftX +
            "px";

          win.style.top =
            moveEvent.clientY +
            window.scrollY -
            shiftY +
            "px";
        }

        function stop() {
          document.removeEventListener(
            "mousemove",
            move
          );

          document.removeEventListener(
            "mouseup",
            stop
          );
        }

        document.addEventListener(
          "mousemove",
          move
        );

        document.addEventListener(
          "mouseup",
          stop
        );
      });
    });

  document
    .querySelectorAll(".min-btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const win =
          btn.closest(".window");

        if (!win) return;

        win.classList.toggle("minimized");

        bringToFront(win);
      });
    });

  document
    .querySelectorAll(".max-btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const win =
          btn.closest(".window");

        if (!win) return;

        win.classList.remove("minimized");
        win.classList.toggle("maximized");

        btn.textContent =
          win.classList.contains("maximized")
            ? "❐"
            : "□";

        bringToFront(win);
      });
    });

  document
    .querySelectorAll(".close-btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const win =
          btn.closest(".window");

        if (!win) return;

        win.classList.add("closed");
      });
    });

  document
    .querySelectorAll(".menu-list li[data-window]")
    .forEach(function (item) {
      item.addEventListener("click", function () {
        if (item.dataset.window === "guestbook") {
          const guestbook = document.getElementById("guestbook");

          if (guestbook) {
            guestbook.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }

          return;
        }

        openWindow(item.dataset.window);
      });
    });

  document
    .querySelectorAll(".desktop-icon[data-window]")
    .forEach(function (icon) {
      icon.addEventListener("dblclick", function () {
        openWindow(icon.dataset.window);
      });
    });

  /* ===========================
     PLAYLIST
  =========================== */

  function renderPlaylist() {
    const list =
      document.getElementById("playlist-list");

    if (!list) return;

    list.innerHTML = "";

    playlist.forEach(function (song, index) {
      const item =
        document.createElement("div");

      item.className = "playlist-item";

      item.textContent =
        "♪ " + song.title;

      if (index === currentSong) {
        item.classList.add("active");
      }

      item.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        currentSong = index;
        musicStarted = true;

        loadSong(currentSong);
        playSong();
      });

      list.appendChild(item);
    });
  }

  function loadSong(index) {
    if (!bgm || !playlist[index]) {
      return;
    }

    bgm.src =
      playlist[index].file;

    if (songTitle) {
      songTitle.textContent =
        playlist[index].title;
    }

    if (nowPlayingText) {
      nowPlayingText.textContent =
        playlist[index].title;
    }

    if (barFill) {
      barFill.style.width = "0%";
    }

    if (
      albumCover &&
      albumCovers.length > 0
    ) {
      const randomCover =
        albumCovers[
          Math.floor(
            Math.random() *
            albumCovers.length
          )
        ];

      albumCover.src = randomCover;
    }

    renderPlaylist();
  }

  function playSong() {
    if (!bgm) return;

    bgm
      .play()
      .then(function () {
        if (albumCover) {
          albumCover.classList.add(
            "album-spin"
          );
        }
      })
      .catch(function (error) {
        console.error(
          "BGM 재생 오류:",
          error
        );
      });
  }

  function pauseSong() {
    if (!bgm) return;

    bgm.pause();

    if (albumCover) {
      albumCover.classList.remove(
        "album-spin"
      );
    }
  }

  function nextSong() {
    currentSong =
      (currentSong + 1) %
      playlist.length;

    loadSong(currentSong);
    playSong();
  }

  function prevSong() {
    currentSong =
      (
        currentSong -
        1 +
        playlist.length
      ) % playlist.length;

    loadSong(currentSong);
    playSong();
  }

  function startRandomMusic() {
    if (
      musicStarted ||
      playlist.length === 0
    ) {
      return;
    }

    musicStarted = true;

    currentSong =
      Math.floor(
        Math.random() *
        playlist.length
      );

    loadSong(currentSong);
    playSong();
  }

  if (playBtn) {
    playBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      musicStarted = true;

      playSong();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      pauseSong();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      musicStarted = true;

      nextSong();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      musicStarted = true;

      prevSong();
    });
  }

  if (bgm) {
    bgm.addEventListener("timeupdate", function () {
      if (
        !bgm.duration ||
        !barFill
      ) {
        return;
      }

      const percent =
        (
          bgm.currentTime /
          bgm.duration
        ) * 100;

      barFill.style.width =
        percent + "%";
    });

    bgm.addEventListener(
      "ended",
      nextSong
    );
  }

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

  document.addEventListener("click", function (event) {
    if (event.target.closest("button")) {
      return;
    }

    for (let i = 0; i < 14; i++) {
      const img =
        document.createElement("img");

      const angle =
        Math.random() *
        Math.PI *
        2;

      const distance =
        220 +
        Math.random() *
        220;

      const x =
        Math.cos(angle) *
        distance;

      const y =
        Math.sin(angle) *
        distance;

      const rotation =
        (
          Math.random() -
          0.5
        ) * 240;

      const size =
        65 +
        Math.random() *
        45;

      img.src =
        effects[
          Math.floor(
            Math.random() *
            effects.length
          )
        ];

      img.className = "effect";

      img.style.left =
        event.clientX + "px";

      img.style.top =
        event.clientY + "px";

      img.style.width =
        size + "px";

      img.style.setProperty(
        "--x",
        x + "px"
      );

      img.style.setProperty(
        "--y",
        y + "px"
      );

      img.style.setProperty(
        "--r",
        rotation + "deg"
      );

      document.body.appendChild(img);

      setTimeout(function () {
        img.remove();
      }, 1800);
    }
  });

  /* ===========================
     CURSOR TRAIL
  =========================== */

  document.addEventListener("mousemove", function (event) {
    const now = Date.now();

    if (
      now -
      lastTrailTime >=
      90
    ) {
      lastTrailTime = now;

      for (let i = 0; i < 2; i++) {
        const trail =
          document.createElement("img");

        trail.src =
          "images/effects/ribbon.png";

        trail.className =
          "cursor-trail";

        trail.style.left =
          event.clientX +
          (
            Math.random() -
            0.5
          ) *
            38 +
          "px";

        trail.style.top =
          event.clientY +
          (
            Math.random() -
            0.5
          ) *
            38 +
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
              Math.random() *
              glitters.length
            )
          ];

        glitter.className =
          "glitter";

        glitter.style.left =
          event.clientX +
          (
            Math.random() -
            0.5
          ) *
            70 +
          "px";

        glitter.style.top =
          event.clientY +
          (
            Math.random() -
            0.5
          ) *
            70 +
          "px";

        document.body.appendChild(glitter);

        setTimeout(function () {
          glitter.remove();
        }, 1000);
      }
    }

    if (
      now -
      lastSymbolTime >=
      380
    ) {
      lastSymbolTime = now;

      const symbol =
        document.createElement("div");

      const chars = [
        "♡",
        "✦",
        "✧",
        "♡"
      ];

      symbol.className =
        "cursor-symbol";

      symbol.textContent =
        chars[
          Math.floor(
            Math.random() *
            chars.length
          )
        ];

      symbol.style.left =
        event.clientX +
        (
          Math.random() -
          0.5
        ) *
          100 +
        "px";

      symbol.style.top =
        event.clientY +
        (
          Math.random() -
          0.5
        ) *
          100 +
        "px";

      symbol.style.fontSize =
        28 +
        Math.random() *
          18 +
        "px";

      document.body.appendChild(symbol);

      setTimeout(function () {
        symbol.remove();
      }, 1800);
    }
  });

  /* ===========================
     CRT MODE
  =========================== */

  if (crtBtn) {
    crtBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      document.body.classList.toggle(
        "crt-on"
      );

      crtBtn.textContent =
        document.body.classList.contains(
          "crt-on"
        )
          ? "CRT ON"
          : "CRT OFF";
    });
  }

  /* ===========================
     NIGHT MODE
  =========================== */

  if (darkBtn) {
    darkBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

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

  if (visitorCounter) {
    let visitorNumber = 1234;

    function updateVisitorCounter(animate) {
      const text =
        String(visitorNumber).padStart(
          6,
          "0"
        );

      visitorCounter.innerHTML = "";

      text
        .split("")
        .forEach(function (digit) {
          const span =
            document.createElement("span");

          span.textContent = digit;

          visitorCounter.appendChild(span);

          if (
            animate &&
            typeof span.animate ===
              "function"
          ) {
            span.animate(
              [
                {
                  transform:
                    "translateY(-10px)",
                  opacity: 0.3
                },
                {
                  transform:
                    "translateY(0)",
                  opacity: 1
                }
              ],
              {
                duration: 300,
                easing: "ease-out"
              }
            );
          }
        });
    }

    updateVisitorCounter(false);

    setInterval(function () {
      visitorNumber++;

      updateVisitorCounter(true);
    }, 8000);
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

    heart.className =
      "falling-heart";

    heart.textContent =
      heartShapes[
        Math.floor(
          Math.random() *
          heartShapes.length
        )
      ];

    heart.style.color =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    heart.style.left =
      Math.random() *
        Math.max(
          window.innerWidth - 50,
          0
        ) +
      "px";

    heart.style.top =
      "-50px";

    heart.style.fontSize =
      28 +
      Math.random() *
        20 +
      "px";

    heart.style.animationDuration =
      7 +
      Math.random() *
        5 +
      "s";

    document.body.appendChild(heart);

    setTimeout(function () {
      heart.remove();
    }, 12500);
  }, 500);

  /* ===========================
     DIGITAL CLOCK
  =========================== */

  function updateClock() {
    if (!digitalClock) return;

    const now = new Date();

    const hours =
      String(
        now.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        now.getMinutes()
      ).padStart(2, "0");

    const seconds =
      String(
        now.getSeconds()
      ).padStart(2, "0");

    digitalClock.textContent =
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
  }

  updateClock();

  setInterval(
    updateClock,
    1000
  );

  /* ===========================
     BOOT SCREEN
  =========================== */

  const bootScreen =
    document.getElementById("boot-screen");

  const bootMessage =
    document.getElementById("boot-message");

  const bootFill =
    document.getElementById("boot-fill");

  const bootPercent =
    document.getElementById("boot-percent");

  const bootMessages = [
    "Loading Rabbits...",
    "Loading Strawberries...",
    "Loading Tulips...",
    "Loading Memories...",
    "Loading Pink Dreams...",
    "Loading Diary...",
    "Loading Music...",
    "Loading Cute Things...",
    "Loading CUTENEVERDIES..."
  ];

  if (
    bootScreen &&
    bootMessage &&
    bootFill &&
    bootPercent
  ) {
    let progress = 0;
    let typingIndex = 0;

    const selectedMessage =
      bootMessages[
        Math.floor(
          Math.random() *
          bootMessages.length
        )
      ];

    bootMessage.textContent = "";

    const typingTimer =
      setInterval(function () {
        bootMessage.textContent +=
          selectedMessage.charAt(
            typingIndex
          );

        typingIndex++;

        if (
          typingIndex >=
          selectedMessage.length
        ) {
          clearInterval(
            typingTimer
          );
        }
      }, 180);

    const bootTimer =
      setInterval(function () {
        progress +=
          Math.floor(
            Math.random() *
              13
          ) + 5;

        progress =
          Math.min(
            progress,
            100
          );

        bootFill.style.width =
          progress + "%";

        bootPercent.textContent =
          progress + "%";

        if (progress >= 100) {
          clearInterval(
            bootTimer
          );

          bootMessage.textContent =
            "Welcome to CUTENEVERDIES ♡";

          setTimeout(function () {
            bootScreen.style.transition =
              "opacity 0.6s ease";

            bootScreen.style.opacity =
              "0";

            setTimeout(function () {
              bootScreen.remove();
            }, 600);
          }, 500);
        }
      }, 180);
  }

  /* ===========================
     MY ROOM - ADD BED
  =========================== */

  if (
    addBedBtn &&
    roomBedItem
  ) {
    addBedBtn.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        roomBedItem.classList.remove(
          "hidden"
        );
      }
    );
  }

  /* ===========================
     MY ROOM - DRAG BED
  =========================== */

  const roomStage =
    document.querySelector(".room-stage");

  if (
    roomStage &&
    roomBedItem
  ) {
    let isDraggingBed = false;
    let offsetX = 0;
    let offsetY = 0;

    roomBedItem.addEventListener(
      "pointerdown",
      function (event) {
        isDraggingBed = true;

        const bedRect =
          roomBedItem.getBoundingClientRect();

        offsetX =
          event.clientX -
          bedRect.left;

        offsetY =
          event.clientY -
          bedRect.top;

        roomBedItem.setPointerCapture(
          event.pointerId
        );
      }
    );

    roomBedItem.addEventListener(
      "pointermove",
      function (event) {
        if (!isDraggingBed) return;

        const stageRect =
          roomStage.getBoundingClientRect();

        let newLeft =
          event.clientX -
          stageRect.left -
          offsetX;

        let newTop =
          event.clientY -
          stageRect.top -
          offsetY;

        const maxLeft =
          roomStage.clientWidth -
          roomBedItem.offsetWidth;

        const maxTop =
          roomStage.clientHeight -
          roomBedItem.offsetHeight;

        newLeft = Math.max(
          0,
          Math.min(
            newLeft,
            maxLeft
          )
        );

        newTop = Math.max(
          0,
          Math.min(
            newTop,
            maxTop
          )
        );

        roomBedItem.style.left =
          newLeft + "px";

        roomBedItem.style.top =
          newTop + "px";

        roomBedItem.style.right =
          "auto";

        roomBedItem.style.bottom =
          "auto";
      }
    );

    roomBedItem.addEventListener(
      "pointerup",
      function (event) {
        isDraggingBed = false;

        if (
          roomBedItem.hasPointerCapture(
            event.pointerId
          )
        ) {
          roomBedItem.releasePointerCapture(
            event.pointerId
          );
        }
      }
    );

    roomBedItem.addEventListener(
      "pointercancel",
      function () {
        isDraggingBed = false;
      }
    );
  }

  /* ===========================
     INITIALIZE
  =========================== */

  loadSong(currentSong);
});