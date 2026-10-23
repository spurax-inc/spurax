// ===== 1. SHARED HEADER AND FOOTER (edit here, every page updates) =====
const LOGO = `
  <a href="index.html" class="logo">
    <img src="logo.jpeg" alt="Spurax logo" class="logo-img" onerror="this.style.display='none'">
    <span>SPURAX</span>
  </a>`;

const ICON_X = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>`;
const ICON_LINKEDIN = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm6.5 0h3.8v1.5h.1c.5-1 1.8-1.8 3.7-1.8 3.9 0 4.6 2.5 4.6 5.8V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.75z"/></svg>`;

// Replace each # with the real profile link when the accounts exist
const SOCIALS = `
  <div class="socials">
    <a href="https://x.com/spurax" aria-label="X">${ICON_X}</a>
    <a href="https://www.linkedin.com/company/spurax/" aria-label="LinkedIn">${ICON_LINKEDIN}</a>
  </div>`;

const HEADER = `
  <header class="site-header">
    <div class="container nav">
      ${LOGO}
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu">&#9776;</button>
      <nav class="nav-links" id="navLinks">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <div class="dropdown" id="brandsDropdown">
          <a href="index.html#brands" id="brandsLink">Our Brands &#9662;</a>
          <div class="dropdown-menu">
            <a href="global-marketplace.html">Spurax Global Marketplace</a>
            <a href="imarax-drip.html">Imarax Drip</a>
            <a href="food-market.html">Spurax Food Market</a>
            <a href="spurax-eats.html">Spurax Eats</a>
          </div>
        </div>
        <a href="support.html">Help &amp; Support</a>
        <a href="contact.html" class="btn">Contact</a>
      </nav>
    </div>
  </header>`;

const FOOTER = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          ${LOGO}
          <p>A family of four brands, built to make everyday life better.</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Spurax</a></li>
            <li><a href="index.html#brands">Our Branches</a></li>
            <li><a href="litmark.html">LIT-MAK HOLDINGS</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@spurax.com">info@spurax.com</a></li>
            <li>Lagos, Nigeria</li>
            <li>${SOCIALS}</li>
          </ul>
        </div>
        <div>
          <h4>Help &amp; Support</h4>
          <ul>
            <li><a href="support.html">Help Center</a></li>
            <li><a href="support.html#faq">FAQs</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">&copy; ${new Date().getFullYear()} Spurax. All rights reserved.</div>
    </div>
  </footer>`;

document.getElementById('site-header').innerHTML = HEADER;
document.getElementById('site-footer').innerHTML = FOOTER;

// Contact page uses the same icons
const contactSocials = document.getElementById('contactSocials');
if (contactSocials) contactSocials.innerHTML = SOCIALS;

// ===== 2. Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// ===== 3. On phones, tapping "Our Brands" opens the dropdown =====
const brandsDropdown = document.getElementById('brandsDropdown');
document.getElementById('brandsLink').addEventListener('click', (e) => {
  if (window.innerWidth <= 900) {
    e.preventDefault();
    brandsDropdown.classList.toggle('open');
  }
});

// ===== 4. Fade sections in as they scroll into view =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== 5. FAQ: open and close answers =====
document.querySelectorAll('.faq-item').forEach((item) => {
  const answer = item.querySelector('.faq-a');
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : null;
  });
});

// ===== 6. Contact form: opens the visitor's email app with the message filled in =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent('[' + data.get('topic') + '] from ' + data.get('name'));
    const body = encodeURIComponent(data.get('message') + '\n\nFrom: ' + data.get('name') + '\nEmail: ' + data.get('email'));
    window.location.href = 'mailto:info@spurax.com?subject=' + subject + '&body=' + body;
  });
}
// ===== 7. Hero video slider: plays each video, then slides to the next =====
const slider = document.getElementById('videoSlider');
if (slider) {
  const track = slider.querySelector('.vs-track');
  const videos = [...track.querySelectorAll('video')];
  const dotsBox = slider.querySelector('.vs-dots');
  let current = 0;
  let failures = 0;
  let visible = true;

  // Build one small bar per video
  videos.forEach((video, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Show video ' + (i + 1));
    dot.addEventListener('click', () => go(i));
    dotsBox.appendChild(dot);

    video.addEventListener('ended', () => go(i + 1));       // finished: swipe to the next
    video.addEventListener('error', () => {                // broken or missing file: skip it
      failures++;
      if (i === current && failures < videos.length) go(i + 1);
    });
  });
  const dots = [...dotsBox.children];

  function go(n) {
    videos[current].pause();
    current = (n + videos.length) % videos.length;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    const video = videos[current];
    video.currentTime = 0;
    if (visible) video.play().catch(() => {});
  }

  // Pause when the hero is scrolled out of view, resume when it comes back
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) videos[current].play().catch(() => {});
    else videos[current].pause();
  }, { threshold: 0.25 }).observe(slider);

  go(0);
}