// Work page — work.js

// --- SCROLL-AWARE HEADER ---
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current <= 0) {
    header.classList.remove('hidden', 'shadow');
  } else if (current > lastScroll && current > 80) {
    header.classList.add('hidden');
    header.classList.remove('shadow');
  } else {
    header.classList.remove('hidden');
    header.classList.add('shadow');
  }
  lastScroll = current;
}, { passive: true });

// --- MOBILE MENU ---
const headerToggle = document.getElementById('headerToggle');
const headerMobile = document.getElementById('headerMobile');

headerToggle.addEventListener('click', () => {
  const open = headerMobile.classList.toggle('open');
  headerToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

headerMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    headerMobile.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- TABS ---
const tabs = document.querySelectorAll('.work-tab');
const sections = {
  long:      document.getElementById('tab-long'),
  short:     document.getElementById('tab-short'),
  corporate: document.getElementById('tab-corporate'),
  aesthetic: document.getElementById('tab-aesthetic'),
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide sections
    Object.entries(sections).forEach(([key, el]) => {
      el.style.display = key === target ? 'block' : 'none';
    });
  });
});
