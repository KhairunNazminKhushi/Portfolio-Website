/* ==========================================================================
   KHAIRUN NAZMIN KHUSHI — PORTFOLIO SCRIPT
   Vanilla JavaScript only. Organized into reusable functions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursorGlow();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveSectionHighlight();
  initTypingAnimation();
  initScrollReveal();
  initCounterAnimation();
  initSkillBars();
  initTimelineFill();
  initCertificateLightbox();
  initBackToTop();
  initContactFormValidation();
  initLazyLoading();
  setFooterYear();
});

/* ---------------------------------------------------------------------- */
/* Loading animation                                                       */
/* ---------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 2500);
}

/* ---------------------------------------------------------------------- */
/* Decorative cursor glow (desktop only)                                   */
/* ---------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ---------------------------------------------------------------------- */
/* Sticky navbar appearance change on scroll                               */
/* ---------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggleScrolled = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

/* ---------------------------------------------------------------------- */
/* Mobile hamburger menu                                                   */
/* ---------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------------------------------------------------------------------- */
/* Smooth scrolling for internal anchor links                              */
/* ---------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------------------------------------------------------------------- */
/* Navbar active-section highlight while scrolling                         */
/* ---------------------------------------------------------------------- */
function initActiveSectionHighlight() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------------- */
/* Typing animation cycling through roles                                  */
/* ---------------------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
    'Machine Learning Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 80;
  const DELETE_SPEED = 40;
  const HOLD_TIME = 1400;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------------------------------------------------------------------- */
/* Scroll reveal / fade-in animations                                      */
/* ---------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 60);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------- */
/* Counter animation for stats                                             */
/* ---------------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ---------------------------------------------------------------------- */
/* Animated skill/competency progress bars                                 */
/* ---------------------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width || 0;
          entry.target.style.width = `${width}%`;
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------------------------------------------------------------------- */
/* Animated education timeline fill                                        */
/* ---------------------------------------------------------------------- */
function initTimelineFill() {
  const line = document.getElementById('timelineLine');
  const timeline = document.querySelector('.timeline');
  if (!line || !timeline) return;

  const updateFill = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const visible = Math.min(Math.max(viewportH * 0.75 - rect.top, 0), rect.height);
    const percent = rect.height > 0 ? (visible / rect.height) * 100 : 0;
    line.style.setProperty('--fill', `${Math.min(percent, 100)}%`);
  };

  updateFill();
  window.addEventListener('scroll', updateFill, { passive: true });
  window.addEventListener('resize', updateFill);
}

/* ---------------------------------------------------------------------- */
/* Certificate lightbox preview                                            */
/* ---------------------------------------------------------------------- */
function initCertificateLightbox() {
  const cards = document.querySelectorAll('.certificate-card');
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const labelEl = document.getElementById('lightboxLabel');
  const imgEl = document.getElementById('lightboxImg');
  if (!cards.length || !lightbox) return;

  const openLightbox = (title, imgSrc) => {
    labelEl.textContent = title;
    if (imgEl) {
      imgEl.src = imgSrc;
      imgEl.alt = title;
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || 'Certificate';
      // Matches images/certificate-1.jpg, images/certificate-2.jpg, etc.
      const certNumber = card.dataset.cert || card.querySelector('.certificate-image img')?.getAttribute('src');
      const imgSrc = card.querySelector('.certificate-image img')?.getAttribute('src') || `images/certificate-${certNumber}.jpg`;
      openLightbox(title, imgSrc);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ---------------------------------------------------------------------- */
/* Back to top button                                                      */
/* ---------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('show', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------------- */
/* Contact form validation                                                  */
/* ---------------------------------------------------------------------- */
function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = document.getElementById('formSuccess');

  const fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    subject: { input: document.getElementById('subject'), error: document.getElementById('subjectError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    field.input.closest('.form-group').classList.add('invalid');
    field.error.textContent = message;
  }

  function clearError(field) {
    field.input.closest('.form-group').classList.remove('invalid');
    field.error.textContent = '';
  }

  function validateField(key) {
    const field = fields[key];
    const value = field.input.value.trim();

    if (!value) {
      setError(field, 'This field is required.');
      return false;
    }
    if (key === 'email' && !emailPattern.test(value)) {
      setError(field, 'Please enter a valid email address.');
      return false;
    }
    if (key === 'message' && value.length < 10) {
      setError(field, 'Message should be at least 10 characters.');
      return false;
    }
    clearError(field);
    return true;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('blur', () => validateField(key));
    fields[key].input.addEventListener('input', () => {
      if (fields[key].input.closest('.form-group').classList.contains('invalid')) {
        validateField(key);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.remove('show');

    const results = Object.keys(fields).map((key) => validateField(key));
    const allValid = results.every(Boolean);

    if (allValid) {
      successMsg.classList.add('show');
      form.reset();
      setTimeout(() => successMsg.classList.remove('show'), 4000);
    }
  });
}

/* ---------------------------------------------------------------------- */
/* Simple lazy-loading fade-in for elements marked [data-lazy]             */
/* ---------------------------------------------------------------------- */
function initLazyLoading() {
  const lazyEls = document.querySelectorAll('[data-lazy]');
  if (!lazyEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  lazyEls.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------- */
/* Footer year                                                             */
/* ---------------------------------------------------------------------- */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
