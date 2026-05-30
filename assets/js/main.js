/**
 * Karan Desai Portfolio — main.js
 * Requires: AOS, Typed.js, GLightbox, Isotope, imagesLoaded, Waypoints (all via CDN)
 */

(function () {
  "use strict";

  /* =========================================================
     Preloader
  ========================================================= */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /* =========================================================
     Mobile Nav Toggle
  ========================================================= */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  // Close mobile nav when a nav link is clicked
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /* =========================================================
     Scroll-to-Top Button
  ========================================================= */
  const scrollTopBtn = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    window.scrollY > 100
      ? scrollTopBtn.classList.add("active")
      : scrollTopBtn.classList.remove("active");
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* =========================================================
     AOS (Animate On Scroll)
  ========================================================= */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /* =========================================================
     Typed.js — Hero Subtitle
  ========================================================= */
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    const strings = typedEl
      .getAttribute("data-typed-items")
      .split(",")
      .map((s) => s.trim());

    new Typed(".typed", {
      strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /* =========================================================
     Skills Progress Bar Animation (Waypoints)
  ========================================================= */
  document.querySelectorAll(".skills-animation").forEach((section) => {
    new Waypoint({
      element: section,
      offset: "80%",
      handler: function () {
        section.querySelectorAll(".progress-bar").forEach((bar) => {
          bar.style.width = bar.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /* =========================================================
     GLightbox
  ========================================================= */
  GLightbox({ selector: ".glightbox" });

  /* =========================================================
     Isotope Portfolio Filtering
  ========================================================= */
  document.querySelectorAll(".isotope-layout").forEach((wrapper) => {
    const layout = wrapper.getAttribute("data-layout") ?? "masonry";
    const defaultFilter = wrapper.getAttribute("data-default-filter") ?? "*";
    const sortBy = wrapper.getAttribute("data-sort") ?? "original-order";
    const container = wrapper.querySelector(".isotope-container");

    let iso;

    imagesLoaded(container, () => {
      iso = new Isotope(container, {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: defaultFilter,
        sortBy,
      });
    });

    wrapper.querySelectorAll(".isotope-filters li").forEach((btn) => {
      btn.addEventListener("click", function () {
        wrapper
          .querySelector(".isotope-filters .filter-active")
          .classList.remove("filter-active");
        this.classList.add("filter-active");
        iso.arrange({ filter: this.getAttribute("data-filter") });
        if (typeof AOS !== "undefined") AOS.refresh();
      });
    });
  });

  /* =========================================================
     Navmenu Scrollspy
  ========================================================= */
  const navLinks = document.querySelectorAll(".navmenu a");

  function navScrollspy() {
    const scrollPos = window.scrollY + 200;

    navLinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (
        scrollPos >= section.offsetTop &&
        scrollPos <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navScrollspy);
  document.addEventListener("scroll", navScrollspy);

  /* =========================================================
     Contact Form (client-side demo handler)
  ========================================================= */
  const contactForm = document.querySelector(".php-email-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const loading = this.querySelector(".loading");
      const errorMsg = this.querySelector(".error-message");
      const sentMsg = this.querySelector(".sent-message");

      loading.style.display = "block";
      errorMsg.style.display = "none";
      sentMsg.style.display = "none";

      // Replace this timeout with a real fetch() call to your backend
      setTimeout(() => {
        loading.style.display = "none";
        sentMsg.style.display = "block";
        contactForm.reset();
      }, 1500);
    });
  }
})();
