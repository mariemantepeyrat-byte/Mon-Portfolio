/* =============================================
   SCRIPT.JS – Portfolio Marie Mante Peyrat
   Interaction : dépliage des cartes expériences
   + menu mobile
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. CARTES EXPÉRIENCES : clic pour déplier/replier ──────────────────
  const expCards = document.querySelectorAll('.exp-card');

  expCards.forEach(function (card) {
    const header = card.querySelector('.exp-header');

    header.addEventListener('click', function () {
      const isOpen = card.classList.contains('open');

      // Ferme toutes les cartes ouvertes
      expCards.forEach(function (c) { c.classList.remove('open'); });

      // Si la carte cliquée n'était pas ouverte, on l'ouvre
      if (!isOpen) {
        card.classList.add('open');

        // Défilement doux pour amener la carte en vue
        setTimeout(function () {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });

    // Accessibilité clavier
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // ── 2. MENU MOBILE ─────────────────────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.navbar nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // Ferme le menu mobile au clic sur un lien
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // ── 3. NAVBAR : lien actif au défilement ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar nav a[href^="#"]');

  function updateActiveLink () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ── 4. ANIMATION D'APPARITION AU DÉFILEMENT ────────────────────────────
  const animTargets = document.querySelectorAll(
    '.competence-card, .exp-card, .formation-item, .engagement-card, .stat'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

});
