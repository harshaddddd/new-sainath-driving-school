/* ================================================
   NEW SHREE SAINATH DRIVING SCHOOL — script.js
   ================================================ */

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close nav when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== COUNTER-UP ANIMATION =====
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // ms
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    element.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(update);
}

// Use IntersectionObserver to trigger counters when visible
const counters = document.querySelectorAll('.stat-num[data-target]');
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
let autoplayInterval;

function initSlider() {
  if (!slides.length) return;

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  startAutoplay();
}

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  const dots = document.querySelectorAll('.slider-dot');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  clearInterval(autoplayInterval);
  goToSlide(currentSlide + direction);
  startAutoplay();
}

function startAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

initSlider();

// ===== FADE-IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.service-card, .trainer-card, .timeline-item, .why-point, .rto-step, .program-card');

if (fadeElements.length > 0) {
  fadeElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * i);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => fadeObserver.observe(el));
}

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    let valid = true;

    [name, phone, service].forEach(field => {
      if (field && !field.value.trim()) {
        field.style.borderColor = '#E31E24';
        valid = false;
      } else if (field) {
        field.style.borderColor = '#d0d0d0';
      }
    });

    if (!valid) {
      e.preventDefault();
      alert('Please fill in all required fields (Name, Phone, Service).');
    }
  });

  // Clear error styling on input
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '#d0d0d0';
    });
  });
}

// ===== SET ACTIVE NAV LINK =====
(function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

// ===== HAMBURGER ICON ANIMATION =====
document.querySelectorAll('.hamburger').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});