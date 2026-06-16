document.documentElement.classList.add("js-enabled");

// ===============================
// ハンバーガーメニューの開閉
// ===============================
(function () {
  "use strict";

  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  const links = menu.querySelectorAll("a");

  function updateMenuForViewport() {
    if (window.innerWidth >= 768) {
      // PC表示
      menu.setAttribute("aria-hidden", "false");

      links.forEach(function (lnk) {
        lnk.removeAttribute("tabindex");
      });
    } else {
      // スマホ表示
      if (!menu.classList.contains("is-open")) {
        menu.setAttribute("aria-hidden", "true");

        links.forEach(function (lnk) {
          lnk.setAttribute("tabindex", "-1");
        });
      }
    }
  }

  // 初期状態
  updateMenuForViewport();

  // 画面サイズ変更時
  window.addEventListener("resize", updateMenuForViewport);

  // ハンバーガーボタン
  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("is-open");

    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く"
    );

    menu.setAttribute("aria-hidden", String(!isOpen));

    links.forEach(function (lnk) {
      if (isOpen) {
        lnk.removeAttribute("tabindex");
      } else {
        lnk.setAttribute("tabindex", "-1");
      }
    });
  });

  // メニューリンクを押したら閉じる
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");

        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "メニューを開く");

        menu.setAttribute("aria-hidden", "true");

        links.forEach(function (lnk) {
          lnk.setAttribute("tabindex", "-1");
        });
      }
    });
  });

  // Escapeキーで閉じる
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      menu.classList.contains("is-open") &&
      window.innerWidth < 768
    ) {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "メニューを開く");

      menu.setAttribute("aria-hidden", "true");

      links.forEach(function (lnk) {
        lnk.setAttribute("tabindex", "-1");
      });
    }
  });
})();

// ===============================
// タイトル文字を1文字ずつ弾ませる
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".line").forEach((line) => {
    const text = line.textContent;

    line.textContent = "";

    [...text].forEach((char, index) => {
      const span = document.createElement("span");

      span.textContent = char;
      span.classList.add("bounce-char");
      span.style.display = "inline-block";
      span.style.animationDelay = `${0.6 + index * 0.08}s`;

      line.appendChild(span);
    });
  });
});

// ===============================
// スクロールアニメーション
// ===============================
const scrollElements = document.querySelectorAll(".js-scroll-trigger");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("is-visible");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.15)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// ===============================
// イベントの切り替え
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".event-card");

  function showEvents(period) {
    cards.forEach((card) => {
      if (card.dataset.period === period) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // 初期表示は上半期
  showEvents("first");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");
      showEvents(this.dataset.period);
    });
  });
});