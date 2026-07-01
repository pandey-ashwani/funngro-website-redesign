document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Menu Toggle ---
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenu && navMenu) {
    // Toggle menu
    mobileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-expanded', isActive);
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Scroll-Driven Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-zoom');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Interactive Stat Counter Count-up ---
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateValue = (obj, start, end, duration, prefix = '', suffix = '') => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.innerHTML = prefix + currentValue.toLocaleString() + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          obj.innerHTML = prefix + end.toLocaleString() + suffix;
        }
      };
      window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const targetVal = parseInt(targetEl.getAttribute('data-target'), 10);
          const prefix = targetEl.getAttribute('data-prefix') || '';
          const suffix = targetEl.getAttribute('data-suffix') || '';
          
          animateValue(targetEl, 0, targetVal, 1600, prefix, suffix);
          observer.unobserve(targetEl);
        }
      });
    }, {
      threshold: 0.2
    });

    statNumbers.forEach(num => statsObserver.observe(num));
  }
});
