const slideshow = document.querySelector('[data-slideshow]');

if (slideshow) {
  const slides = [...slideshow.querySelectorAll('.portrait-slide')];
  const caption = slideshow.querySelector('[data-slide-caption]');
  const count = slideshow.querySelector('[data-slide-count]');
  const controls = slideshow.querySelector('.slideshow-controls');
  const previous = slideshow.querySelector('[data-slide-prev]');
  const next = slideshow.querySelector('[data-slide-next]');
  const toggle = slideshow.querySelector('[data-slide-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 4000;
  let current = 0;
  let timer;
  let paused = reducedMotion.matches;
  let hovering = false;
  let focused = false;

  slides.forEach((slide, index) => {
    slide.hidden = false;
    slide.setAttribute('aria-hidden', String(index !== current));
  });

  function show(index) {
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden', 'false');
    caption.textContent = slides[current].dataset.caption;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  function schedule() {
    clearTimeout(timer);
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    if (!paused && !hovering && !focused && !document.hidden) {
      timer = setTimeout(() => {
        show(current + 1);
        schedule();
      }, interval);
    }
  }

  previous.addEventListener('click', () => { show(current - 1); schedule(); });
  next.addEventListener('click', () => { show(current + 1); schedule(); });
  toggle.addEventListener('click', () => { paused = !paused; schedule(); });
  slideshow.addEventListener('pointerenter', () => { hovering = true; schedule(); });
  slideshow.addEventListener('pointerleave', () => { hovering = false; schedule(); });
  slideshow.addEventListener('focusin', () => { focused = true; schedule(); });
  slideshow.addEventListener('focusout', (event) => {
    if (!slideshow.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; schedule(); });

  controls.hidden = false;
  schedule();
}
