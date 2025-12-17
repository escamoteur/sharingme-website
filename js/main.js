// Sharing Me Website - Main JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');

      // Toggle aria-expanded
      const isExpanded = !mobileMenu.classList.contains('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && mobileMenu) {
      mobileMenu.classList.add('hidden');
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll shadow to nav
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        nav.classList.add('shadow-md');
      } else {
        nav.classList.remove('shadow-md');
      }
    });
  }
});

// Language detection and redirect
function detectAndRedirectLanguage() {
  // Only redirect if on root and no language preference stored
  if (window.location.pathname === '/' && !localStorage.getItem('lang-preference')) {
    const browserLang = navigator.language.slice(0, 2);

    if (browserLang === 'de') {
      window.location.href = '/de/';
    } else if (browserLang === 'es') {
      window.location.href = '/es/';
    }
  }
}

// Run language detection on page load
detectAndRedirectLanguage();

// Store language preference when clicking language switcher
document.querySelectorAll('[href="/"], [href="/de/"], [href="/es/"]').forEach(function(link) {
  link.addEventListener('click', function() {
    const lang = this.getAttribute('href').replace(/\//g, '') || 'en';
    localStorage.setItem('lang-preference', lang);
  });
});
