// Mobile navigation menu and small quality-of-life enhancements.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

// Open and close the mobile menu with the menu button.
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Open navigation menu' : 'Close navigation menu',
    );
    navLinks.classList.toggle('open', !isOpen);
  });

  // Close the menu after a visitor chooses a section.
  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  // Close the menu with Escape for keyboard users.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.focus();
    }
  });
}

// Update the active navigation link as the visitor scrolls.
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isCurrent =
              link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isCurrent);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}

// Keep the footer year current.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
