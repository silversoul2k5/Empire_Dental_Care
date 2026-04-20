const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".hero-dot"));
let activeSlide = 0;
let autoplayId = null;

function setSlide(index) {
  activeSlide = index;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
}

function nextSlide() {
  const nextIndex = (activeSlide + 1) % slides.length;
  setSlide(nextIndex);
}

function startAutoplay() {
  if (slides.length < 2) {
    return;
  }

  stopAutoplay();
  autoplayId = window.setInterval(nextSlide, 5200);
}

function stopAutoplay() {
  if (autoplayId) {
    window.clearInterval(autoplayId);
    autoplayId = null;
  }
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setSlide(index);
    startAutoplay();
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

setSlide(0);
startAutoplay();
