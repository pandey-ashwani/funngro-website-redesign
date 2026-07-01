document.addEventListener('DOMContentLoaded', () => {
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
});
