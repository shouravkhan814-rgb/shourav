/* =====================================================================
   SHOURAV HOSSAIN — LUXURY PERSONAL BRAND
   Preserves: WhatsApp form, navbar, smooth scroll, active nav,
   scroll progress, mobile menu, custom cursor, reveal, tilt, gallery.
   Adds: page loader, lightbox nav, count-up animations.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------------- PAGE LOADER ---------------- */
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        if (loader) loader.classList.add('hidden');
    };
    if (document.readyState === 'complete' || prefersReducedMotion) {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
        setTimeout(hideLoader, 2600); // safety fallback
    }

    /* ---------------- NAVBAR SCROLL ---------------- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.querySelector('.scroll-progress span');

    const onScroll = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        if (navbar) navbar.classList.toggle('scrolled', y > 40);
        if (scrollProgress) {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = total > 0 ? (y / total) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        }
        const current = getActiveSection();
        if (current) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------------- ACTIVE SECTION ---------------- */
    function getActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        let current = null;
        const y = window.scrollY + window.innerHeight * 0.35;
        sections.forEach(sec => {
            if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) current = sec.id;
        });
        return current;
    }

    /* ---------------- MOBILE MENU ---------------- */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        const closeMenu = () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        };
        menuToggle.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open', open);
            menuToggle.setAttribute('aria-expanded', String(open));
        });
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    }

    /* ---------------- CUSTOM CURSOR (desktop only) ---------------- */
    const dot = document.querySelector('.cursor-dot');
    const glow = document.querySelector('.cursor-glow');
    if (canHover && dot && glow) {
        let x = 0, y = 0, gx = 0, gy = 0;
        window.addEventListener('mousemove', e => {
            x = e.clientX; y = e.clientY;
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
        });
        const loop = () => {
            gx += (x - gx) * 0.14;
            gy += (y - gy) * 0.14;
            glow.style.left = gx + 'px';
            glow.style.top = gy + 'px';
            requestAnimationFrame(loop);
        };
        loop();
        const interactive = 'a, button, .card, .masonry-item, input, textarea, .menu-toggle';
        document.querySelectorAll(interactive).forEach(el => {
            el.addEventListener('mouseenter', () => {
                dot.style.width = '0px'; dot.style.height = '0px';
                glow.style.width = '54px'; glow.style.height = '54px';
                glow.style.borderColor = 'rgba(198,166,107,.5)';
            });
            el.addEventListener('mouseleave', () => {
                dot.style.width = '6px'; dot.style.height = '6px';
                glow.style.width = '38px'; glow.style.height = '38px';
                glow.style.borderColor = 'rgba(198,166,107,.18)';
            });
        });
    }

    /* ---------------- SCROLL REVEAL ---------------- */
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    /* ---------------- COUNT-UP STATS ---------------- */
    const counters = document.querySelectorAll('.count');
    const animateCount = el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const dur = 1600;
        const start = performance.now();
        const step = now => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    };
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCount);
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.4 });
    if (counters.length) counterObserver.observe(counters[0]);

    /* ---------------- PORTRAIT TILT ---------------- */
    const portraitFrame = document.querySelector('.portrait-frame');
    if (portraitFrame && canHover && !prefersReducedMotion) {
        portraitFrame.addEventListener('mousemove', e => {
            const r = portraitFrame.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            portraitFrame.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${py * -12}deg)`;
        });
        portraitFrame.addEventListener('mouseleave', () => {
            portraitFrame.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
        });
    }

    /* ---------------- PATTERN SHOWCASE 3D TILT ---------------- */
    const showcaseItems = document.querySelectorAll('.showcase-3d');
    if (showcaseItems.length && canHover && !prefersReducedMotion) {
        showcaseItems.forEach(card => {
            const shine = card.querySelector('.showcase-shine');
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `rotateY(${px * 14}deg) rotateX(${py * -14}deg)`;
                if (shine) {
                    const mx = ((e.clientX - r.left) / r.width) * 100;
                    const my = ((e.clientY - r.top) / r.height) * 100;
                    card.style.setProperty('--mx', mx + '%');
                    card.style.setProperty('--my', my + '%');
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateY(0) rotateX(0)';
            });
        });
    }

    /* ---------------- GALLERY LIGHTBOX ---------------- */
    const lightbox = document.getElementById('lightbox');
    const masonryItems = Array.from(document.querySelectorAll('.masonry-item'));
    let currentIndex = 0;
    const lbImg = document.getElementById('lbImg');
    const lbTag = document.getElementById('lbTag');
    const lbCap = document.getElementById('lbCap');

    function openLightbox(i) {
        if (!lightbox || !masonryItems.length) return;
        currentIndex = (i + masonryItems.length) % masonryItems.length;
        const item = masonryItems[currentIndex];
        const img = item.querySelector('img');
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.getAttribute('alt');
        lbTag.textContent = item.getAttribute('data-tag') || '';
        lbCap.textContent = item.getAttribute('data-caption') || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    masonryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));

    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
    if (lbNext) lbNext.addEventListener('click', () => openLightbox(currentIndex + 1));
    if (lightbox) {
        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', e => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
            if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
        });
    }

    /* ---------------- FOOTER YEAR ---------------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});

/* ---------------- WHATSAPP FORM ---------------- */
function sendWhatsApp(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) return;

    const text = [
        'New message from website:',
        '',
        'Name: ' + name,
        'Email: ' + email,
        '',
        'Message: ' + message
    ].join('\n');

    window.open('https://wa.me/8801773497376?text=' + encodeURIComponent(text), '_blank');
    event.target.reset();
}
