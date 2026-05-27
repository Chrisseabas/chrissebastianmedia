// Chris Sebastian Media — main.js

// --- SCROLL-AWARE HEADER (hide on down, show on up) ---
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current <= 0) {
    header.classList.remove('hidden', 'shadow');
  } else if (current > lastScroll && current > 80) {
    // scrolling down
    header.classList.add('hidden');
    header.classList.remove('shadow');
  } else {
    // scrolling up
    header.classList.remove('hidden');
    header.classList.add('shadow');
  }
  lastScroll = current;
}, { passive: true });

// --- MOBILE MENU TOGGLE ---
const headerToggle = document.getElementById('headerToggle');
const headerMobile = document.getElementById('headerMobile');

headerToggle.addEventListener('click', () => {
  const open = headerMobile.classList.toggle('open');
  headerToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu on link click
headerMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    headerMobile.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- SMOOTH SCROLL (offset for fixed header) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// --- SCROLL REVEAL ---
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 60}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-item, .work-card, .story__row, .stat, .showreel__inner, .services__header, .work__header'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}
