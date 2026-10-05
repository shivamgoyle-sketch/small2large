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
  const resultsCarousel = document.getElementById('results-carousel');
  if (resultsCarousel) {
    const introSlide = document.createElement('img');
    introSlide.className = 'result-intro active';
    introSlide.src = 'assets/images/why-small2large.png';
    introSlide.alt = 'Small2Large growth strategy';
    resultsCarousel.insertBefore(introSlide, resultsCarousel.firstChild);
    resultsCarousel.querySelectorAll('img:not(.result-intro)').forEach(slide => slide.classList.add('ads-result'));
  }
  const resultSlides = resultsCarousel ? Array.from(resultsCarousel.querySelectorAll('img')) : [];
  const resultsIndicator = resultsCarousel ? resultsCarousel.querySelector('.results-indicator') : null;
  let currentResult = 0;
  let resultsTimer;
  const showResult = index => {
    if (!resultSlides.length) return;
    currentResult = (index + resultSlides.length) % resultSlides.length;
    resultSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentResult));
    if (resultsIndicator) resultsIndicator.textContent = `${currentResult + 1} / ${resultSlides.length}`;
  };
  const startResultsAutoplay = () => {
    window.clearInterval(resultsTimer);
    resultsTimer = window.setInterval(() => showResult(currentResult + 1), 4500);
  };
  if (resultsCarousel) {
    showResult(0);
    resultsCarousel.querySelector('.results-prev').addEventListener('click', () => { showResult(currentResult - 1); startResultsAutoplay(); });
    resultsCarousel.querySelector('.results-next').addEventListener('click', () => { showResult(currentResult + 1); startResultsAutoplay(); });
    startResultsAutoplay();
  }
  whyTabs.forEach(tab => tab.addEventListener('click', () => {
    whyTabs.forEach(item => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    const showingResults = tab.dataset.title === 'Results';
    if (resultsCarousel) resultsCarousel.classList.toggle('active', showingResults);
    whyImage.style.opacity = showingResults ? '0' : '1';
    window.setTimeout(() => { whyHeading.textContent = tab.dataset.title; whyKicker.textContent = tab.dataset.kicker; whyCopy.textContent = tab.dataset.copy; if (!showingResults) whyImage.src = whyImageSources[tab.dataset.title] || 'assets/images/why-small2large.png'; }, 180);
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
