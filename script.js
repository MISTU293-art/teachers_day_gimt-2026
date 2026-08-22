// ============================================================
// CSE TEACHERS' DAY — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
    }));
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- staggered index for reveal-stagger groups ---------- */
  document.querySelectorAll('.reveal-stagger').forEach(group => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
  });

  /* ---------- floating binary particles (hero) ---------- */
  const particleWrap = document.getElementById('particles');
  if (particleWrap) {
    const chars = ['0', '1', '</>', '{ }', '01', '10'];
    const count = window.innerWidth < 720 ? 10 : 22;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'particle';
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.animationDuration = (8 + Math.random() * 10) + 's';
      span.style.animationDelay = (Math.random() * 10) + 's';
      particleWrap.appendChild(span);
    }
  }

  /* ---------- countdown to Sept 3 ---------- */
  const cd = document.getElementById('countdown');
  if (cd) {
    const target = new Date('2026-09-03T09:00:00');
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');
    const caption = document.getElementById('cd-caption');

    function tick() {
      const now = new Date();
      let diff = target - now;
      if (diff <= 0) {
        dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
        if (caption) caption.textContent = "It's Teachers' Day — happy celebrating! 🎉";
        clearInterval(timer);
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      dEl.textContent = String(d).padStart(2, '0');
      hEl.textContent = String(h).padStart(2, '0');
      mEl.textContent = String(m).padStart(2, '0');
      sEl.textContent = String(s).padStart(2, '0');
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---------- terminal typing effect ---------- */
  const typedEl = document.getElementById('typed-code');
  if (typedEl) {
    const lines = [
      { text: '$ whoami', cls: '' },
      { text: 'cse_2nd_year_students', cls: 'str' },
      { text: '', cls: '' },
      { text: '$ cat gratitude.txt', cls: '' },
      { text: 'Thank you for debugging our doubts,', cls: 'cmt' },
      { text: 'compiling confusion into clarity,', cls: 'cmt' },
      { text: 'and never once throwing a fatal error', cls: 'cmt' },
      { text: 'on our dreams.', cls: 'cmt' },
      { text: '', cls: '' },
      { text: '$ python teachers_day.py', cls: '' },
      { text: '>> Celebrating on 3rd September 🎉', cls: 'str' },
    ];

    let li = 0, ci = 0;
    const speed = 18;

    function typeNext() {
      if (li >= lines.length) return;
      const line = lines[li];
      if (ci === 0) {
        const div = document.createElement('div');
        if (line.cls) div.className = line.cls;
        div.dataset.line = li;
        typedEl.appendChild(div);
      }
      const currentDiv = typedEl.querySelector('[data-line="' + li + '"]');
      if (ci < line.text.length) {
        currentDiv.textContent += line.text[ci];
        ci++;
        setTimeout(typeNext, speed + Math.random() * 22);
      } else {
        li++; ci = 0;
        setTimeout(typeNext, 260);
      }
    }

    const startTyping = () => { typedEl.innerHTML = ''; li = 0; ci = 0; typeNext(); };

    if ('IntersectionObserver' in window) {
      const termIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startTyping();
            termIo.disconnect();
          }
        });
      }, { threshold: 0.3 });
      termIo.observe(typedEl);
    } else {
      startTyping();
    }
  }

  /* ---------- gallery masonry reveal + lightbox ---------- */
  const figures = document.querySelectorAll('.masonry figure');
  if (figures.length) {
    if ('IntersectionObserver' in window) {
      const gIo = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in-view'), idx * 40);
            gIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      figures.forEach(f => gIo.observe(f));
    } else {
      figures.forEach(f => f.classList.add('in-view'));
    }

    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCounter = document.getElementById('lb-counter');
    const imgs = Array.from(figures).map(f => f.querySelector('img').getAttribute('src'));
    let current = 0;

    function openLightbox(i) {
      current = i;
      lbImg.setAttribute('src', imgs[current]);
      lbCounter.textContent = (current + 1) + ' / ' + imgs.length;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    function nav_(delta) {
      current = (current + delta + imgs.length) % imgs.length;
      lbImg.setAttribute('src', imgs[current]);
      lbCounter.textContent = (current + 1) + ' / ' + imgs.length;
    }

    figures.forEach((f, i) => f.addEventListener('click', () => openLightbox(i)));
    document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lb-prev')?.addEventListener('click', () => nav_(-1));
    document.getElementById('lb-next')?.addEventListener('click', () => nav_(1));
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') nav_(-1);
      if (e.key === 'ArrowRight') nav_(1);
    });
  }
});
