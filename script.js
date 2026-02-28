(function () {
  const root = document.documentElement;

  // ===== Theme =====
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.dataset.theme = savedTheme;

  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "" : "dark";
    if (next) root.dataset.theme = next;
    else delete root.dataset.theme;
    localStorage.setItem("theme", next);
  });

  // ===== Views (single-page navigation) =====
  const views = Array.from(document.querySelectorAll(".view"));
  const go = (name) => {
    views.forEach(v => v.classList.toggle("is-active", v.dataset.view === name));
    closeAllDropdowns();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-view], a[data-view]");
  if (btn) {
    e.preventDefault();
    go(btn.dataset.view);
  }
});

  // ===== Dropdowns =====
  const dropdowns = Array.from(document.querySelectorAll(".dropdown"));
  const closeAllDropdowns = () => dropdowns.forEach(d => d.classList.remove("open"));

  dropdowns.forEach(d => {
    const toggle = d.querySelector(".dropdown-toggle");
    toggle?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = d.classList.contains("open");
      closeAllDropdowns();
      d.classList.toggle("open", !isOpen);
    });
  });

  document.addEventListener("click", () => closeAllDropdowns());

  // ===== Mobile menu =====
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("navMenu");
  const closeMobileMenu = () => {
    navMenu?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMobileMenu();
  });

  // ===== Accordion =====
  const accHeads = Array.from(document.querySelectorAll(".acc-head"));
  accHeads.forEach((head) => {
    head.addEventListener("click", () => {
      const expanded = head.getAttribute("aria-expanded") === "true";
      head.setAttribute("aria-expanded", String(!expanded));

      // small trick: wrap head into a marker class to show its next sibling
      head.classList.toggle("acc-item", true);
      head.classList.toggle("open", !expanded);

      const next = head.nextElementSibling;
      if (next && next.classList.contains("acc-body")) {
        next.style.display = expanded ? "none" : "block";
      }
    });
  });

  // Default view
  go("home");
})();
