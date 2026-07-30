(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
  updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
  menuButton.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuButton.setAttribute('aria-expanded', open); });
  links.forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .13 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  const numbers = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; const el = entry.target; const target = Number(el.dataset.count); const suffix = el.dataset.suffix || ''; const prefix = el.dataset.prefix || ''; const start = performance.now(); const duration = 1350; const tick = now => { const progress = Math.min((now - start) / duration, 1); const eased = 1 - Math.pow(1 - progress, 4); el.textContent = prefix + Math.floor(target * eased).toLocaleString('en-IN') + suffix; if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); countObserver.unobserve(el); }), { threshold: .5 });
  numbers.forEach(number => countObserver.observe(number));
  document.getElementById('year').textContent = new Date().getFullYear();
  const whyTabs = document.querySelectorAll('.why-tab');
  const whyHeading = document.getElementById('why-heading');
  const whyKicker = document.getElementById('why-kicker');
  const whyCopy = document.getElementById('why-copy');
  const whyImage = document.getElementById('why-image');
  const whyImageSources = {
    'Creative Edge': 'assets/images/why-creative-edge.png',
    'Client Success': 'assets/images/why-client-success.png',
    'Continuous Optimization': 'assets/images/why-continuous-optimization.png'
  };
  whyTabs.forEach(tab => tab.addEventListener('click', () => {
    whyTabs.forEach(item => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    whyImage.style.opacity = '0';
    window.setTimeout(() => { whyHeading.textContent = tab.dataset.title; whyKicker.textContent = tab.dataset.kicker; whyCopy.textContent = tab.dataset.copy; whyImage.src = whyImageSources[tab.dataset.title] || 'assets/images/why-small2large.png'; whyImage.style.opacity = '1'; }, 180);
  }));
  const leadersCarousel = document.getElementById('leaders-carousel');
  const leadersPrev = document.getElementById('leaders-prev');
  const leadersNext = document.getElementById('leaders-next');
  if (leadersCarousel && leadersPrev && leadersNext) {
    const moveLeaders = direction => leadersCarousel.scrollBy({ left: direction * 300, behavior: 'smooth' });
    leadersPrev.addEventListener('click', () => moveLeaders(-1));
    leadersNext.addEventListener('click', () => moveLeaders(1));
  }
})();
