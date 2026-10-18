(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");
  const navMenu = document.querySelector("#navmenu");
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mobileNavIcon = mobileNavToggle?.querySelector("i");
  const scrollTop = document.querySelector("#scroll-top");
  const navLinks = document.querySelectorAll("#navmenu ul a[href^='#']");

  function setMobileNavOpen(isOpen) {
    body.classList.toggle("mobile-nav-active", isOpen);
    mobileNavToggle?.setAttribute("aria-expanded", String(isOpen));
    mobileNavToggle?.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    mobileNavIcon?.classList.toggle("bi-list", !isOpen);
    mobileNavIcon?.classList.toggle("bi-x", isOpen);
  }

  mobileNavToggle?.addEventListener("click", function() {
    setMobileNavOpen(!body.classList.contains("mobile-nav-active"));
  });

  navMenu?.querySelectorAll("a[href^='#']").forEach(function(link) {
    link.addEventListener("click", function() {
      setMobileNavOpen(false);
    });
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      setMobileNavOpen(false);
    }
  });

  function updatePageState() {
    if (header && (header.classList.contains("fixed-top") || header.classList.contains("sticky-top") || header.classList.contains("scroll-up-sticky"))) {
      body.classList.toggle("scrolled", window.scrollY > 100);
    }

    scrollTop?.classList.toggle("active", window.scrollY > 100);

    let activeLink = null;
    navLinks.forEach(function(link) {
      const section = document.getElementById(link.hash.slice(1));
      if (section && window.scrollY + 200 >= section.offsetTop && window.scrollY + 200 < section.offsetTop + section.offsetHeight) {
        activeLink = link;
      }
    });

    navLinks.forEach(function(link) {
      link.classList.toggle("active", link === activeLink);
    });
  }

  document.addEventListener("scroll", updatePageState, { passive: true });
  window.addEventListener("load", updatePageState);
  updatePageState();

  window.addEventListener("load", function() {
    if (window.AOS && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });
})();
