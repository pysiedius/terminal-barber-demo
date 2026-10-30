(function () {
  const dialog = document.getElementById("lightbox");
  if (!dialog) return;

  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-cap");
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  let index = 0;
  let lastFocus = null;

  function show(i) {
    index = (i + items.length) % items.length;
    const el = items[index];
    img.src = el.getAttribute("data-full") || el.querySelector("img").src;
    img.alt = el.getAttribute("data-alt") || "";
    cap.textContent = el.getAttribute("data-caption") || "";
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    dialog.querySelector("[data-lightbox-close]").focus();
  }

  function close() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  items.forEach(function (el, i) {
    el.addEventListener("click", function () {
      open(i);
    });
  });

  dialog.addEventListener("click", function (e) {
    const t = e.target;
    if (t.closest("[data-lightbox-close]")) close();
    else if (t.closest("[data-lightbox-prev]")) show(index - 1);
    else if (t.closest("[data-lightbox-next]")) show(index + 1);
    else if (t === dialog) close();
  });

  dialog.addEventListener("cancel", function (e) {
    e.preventDefault();
    close();
  });

  document.addEventListener("keydown", function (e) {
    if (!dialog.open) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
