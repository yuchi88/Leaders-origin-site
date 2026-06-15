// ハンバーガーメニューの開閉
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;
  var links = menu.querySelectorAll("a");

  // initialize hidden state
  menu.setAttribute("aria-hidden", "true");
  links.forEach(function (lnk) {
    lnk.setAttribute("tabindex", "-1");
  });

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く",
    );
    // accessibility: expose or hide menu content
    menu.setAttribute("aria-hidden", String(!isOpen));
    links.forEach(function (lnk) {
      if (isOpen) {
        lnk.removeAttribute("tabindex");
      } else {
        lnk.setAttribute("tabindex", "-1");
      }
    });
  });

  // メニュー内リンクをタップしたら閉じる（スマホ表示時）
  var links = menu.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "メニューを開く");
      menu.setAttribute("aria-hidden", "true");
      links.forEach(function (lnk) {
        lnk.setAttribute("tabindex", "-1");
      });
    });
  });

  // Close menu with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "メニューを開く");
        menu.setAttribute("aria-hidden", "true");
        links.forEach(function (lnk) {
          lnk.setAttribute("tabindex", "-1");
        });
      }
    }
  });
})();

// 1. タイトル文字を1文字ずつバラバラにして弾ませる演出
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

// 2. スクロール時にフワッと浮き出る演出（参考サイトの心地よいエフェクト）
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

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});
// 初回読み込み時にもチェック
window.addEventListener("load", () => {
  handleScrollAnimation();
});
