document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navMobilePanel = document.querySelector(".nav-mobile-panel");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");

  // Sticky nav + active link highlight
  const updateNavState = () => {
    if (window.scrollY > 10) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    let currentId = "";
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 140) {
        currentId = sec.id;
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#" + currentId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  };

  window.addEventListener("scroll", updateNavState);
  updateNavState();

  // Mobile nav toggle
  if (navToggle && navMobilePanel) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navMobilePanel.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links-mobile a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navMobilePanel.classList.remove("open");
      });
    });
  }

  // Smooth scrolling for in-page links and buttons
  const smoothScroll = (targetId) => {
    const el = document.querySelector(targetId);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScroll(href);
      }
    });
  });

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      if (target) smoothScroll(target);
    });
  });

  // Featured carousel controls (scroll the row horizontally)
  const featuredRow = document.querySelector(".featured-row");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");

  if (featuredRow && prevBtn && nextBtn) {
    const scrollAmount = 260;
    prevBtn.addEventListener("click", () => {
      featuredRow.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      featuredRow.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  // Menu category filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      menuCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Scroll animations
  const animatedEls = document.querySelectorAll(".aos");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedEls.forEach((el) => observer.observe(el));

  // Footer year
  const yearSpan = document.getElementById("yearSpan");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

