// Marugame Seimen practice site — shared interactions

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // ---- Language toggle (JP default; JP / EN / TH) ----
  const setLang = (lang) => {
    root.setAttribute('data-lang', lang);
    root.removeAttribute('data-jp');
    root.removeAttribute('data-en');
    root.removeAttribute('data-th');
    root.setAttribute('data-' + lang, '');
    root.lang = lang === 'jp' ? 'ja' : (lang === 'th' ? 'th' : 'en');
    localStorage.setItem('marugame-lang', lang);
  };
  const saved = localStorage.getItem('marugame-lang') || 'jp';
  setLang(saved);

  document.querySelectorAll('.btn-jp').forEach(b => b.addEventListener('click', () => setLang('jp')));
  document.querySelectorAll('.btn-en').forEach(b => b.addEventListener('click', () => setLang('en')));
  document.querySelectorAll('.btn-th').forEach(b => b.addEventListener('click', () => setLang('th')));

  // ---- Mobile nav ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // ---- Noren hero reveal ----
  const hero = document.querySelector('.noren-hero');
  if (hero) {
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('open'), 250);
    });
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---- Menu tabs (menu.html) ----
  const tabs = document.querySelectorAll('.menu-tab');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        document.querySelectorAll('.menu-category').forEach(sec => {
          sec.classList.toggle('active', sec.dataset.cat === cat);
        });
      });
    });
  }
});