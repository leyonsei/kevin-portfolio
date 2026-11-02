(() => {
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-navigation');
  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };
  toggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
  document.querySelectorAll('.primary-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  const homeLink = document.querySelector('[data-section="home"]');
  const projectsLink = document.querySelector('[data-section="projects"]');
  const setActive = which => {
    [homeLink, projectsLink].forEach(el => {
      const active = el.dataset.section === which;
      el.classList.toggle('active', active);
      if (active) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  };
  const projects = document.getElementById('projects');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setActive('projects');
      else if (window.scrollY < projects.offsetTop - 150) setActive('home');
    }, { rootMargin: '-110px 0px -55% 0px', threshold: 0 });
    observer.observe(projects);
    window.addEventListener('scroll', () => {
      setActive(window.scrollY >= projects.offsetTop - 160 ? 'projects' : 'home');
    }, { passive: true });
  }
})();
