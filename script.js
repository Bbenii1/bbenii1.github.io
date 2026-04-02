document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // Scroll to top on load
  // ===========================
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  // ===========================
  // Opening Overlay – remove after animation
  // ===========================
  const overlay = document.getElementById('opening-overlay');
  if (overlay) {
    overlay.addEventListener('animationend', () => {
      overlay.style.display = 'none';
    });
  }

  // ===========================
  // Hero Name – letter-by-letter reveal
  // ===========================
  const heroName = document.getElementById('hero-name');
  if (heroName) {
    const text = heroName.textContent.trim();
    heroName.textContent = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.classList.add('letter');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${1.2 + i * 0.08}s`;
      heroName.appendChild(span);
    });
  }

  // ===========================
  // Scroll Reveal – tied to scroll position
  // Deferred until opening animation completes
  // ===========================
  const revealEls = document.querySelectorAll('.reveal-left, .reveal-right');

  const initScrollReveal = () => {
    if (revealEls.length === 0) return;

    const handleScrollReveal = () => {
      const windowHeight = window.innerHeight;
      const scrollBottom = window.scrollY + windowHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollBottom >= docHeight - 20;

      revealEls.forEach((el) => {
        if (el.dataset.revealed === 'true') return;

        const rect = el.getBoundingClientRect();

        // Start revealing when the element is just inside the viewport (bottom 40px)
        const startY = windowHeight - 100;
        // End revealing after 200px of scrolling
        const endY = windowHeight - 440;

        if (rect.top <= endY || (isAtBottom && rect.top < windowHeight)) {
          // Fully revealed, don't update anymore
          el.style.setProperty('--reveal-progress', '1');
          el.dataset.revealed = 'true';
        } else if (rect.top < startY) {
          // Calculate progress between 0 and 1
          const progress = 1 - (rect.top - endY) / (startY - endY);
          el.style.setProperty('--reveal-progress', progress.toString());
        } else {
          el.style.setProperty('--reveal-progress', '0');
        }
      });
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(handleScrollReveal);
    }, { passive: true });

    // Initial check
    handleScrollReveal();
  };

  // Only start scroll reveals after the opening overlay finishes
  if (overlay) {
    overlay.addEventListener('animationend', () => {
      initScrollReveal();
    });
  } else {
    // No overlay present, start immediately
    initScrollReveal();
  }

  // ===========================
  // Mobile Menu Toggle
  // ===========================
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }
});
