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
