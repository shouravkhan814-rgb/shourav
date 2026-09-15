/* =====================================================================
   SHOURAV HOSSAIN — LUXURY PERSONAL BRAND
   Preserves: WhatsApp form, navbar, smooth scroll, active nav,
   scroll progress, mobile menu, custom cursor, reveal, tilt, gallery.
   Adds: page loader, lightbox nav, count-up animations.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------------- THEME TOGGLE (dark/light) ---------------- */
    const themeToggle = document.getElementById('themeToggle');
    const applyTheme = (theme, save) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            const moon = themeToggle.querySelector('.fa-moon');
            const sun = themeToggle.querySelector('.fa-sun');
            if (moon) moon.style.display = theme === 'dark' ? '' : 'none';
            if (sun) sun.style.display = theme === 'dark' ? 'none' : '';
            themeToggle.setAttribute('aria-pressed', theme !== 'dark');
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'light' ? '#F5F1E8' : '#07130F');
        if (save) localStorage.setItem('shourav-theme', theme);
    };
    if (themeToggle) {
        const sun = document.createElement('i');
        sun.className = 'fas fa-sun';
        sun.setAttribute('aria-hidden', 'true');
        sun.style.display = 'none';
        themeToggle.appendChild(sun);
        const saved = localStorage.getItem('shourav-theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(saved || (prefersLight ? 'light' : 'dark'), false);
        themeToggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next, true);
        });
    }

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

    /* ---------------- PORTRAIT / ORB TILT ---------------- */
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

    /* ---------------- SKILL BARS ---------------- */
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length) {
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const card = entry.target;
                card.querySelectorAll('.skill-fill').forEach(fill => {
                    fill.style.width = fill.getAttribute('data-w');
                });
                card.querySelectorAll('.skill-pct').forEach(pct => {
                    const target = parseInt(pct.getAttribute('data-pct'), 10);
                    const dur = 1400;
                    const start = performance.now();
                    const step = now => {
                        const p = Math.min((now - start) / dur, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        pct.textContent = Math.floor(eased * target) + '%';
                        if (p < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                });
                skillObserver.unobserve(card);
            });
        }, { threshold: 0.5 });
        skillCards.forEach(c => skillObserver.observe(c));
    }

    /* ---------------- FOOTER YEAR ---------------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});

/* ---------------- WHATSAPP FORM ---------------- */
function sendWhatsApp(event) {
    event.preventDefault();
    const form = event.target;
    const isFooter = form.classList.contains('footer-consult');
    const name = document.getElementById(isFooter ? 'footer-name' : 'name').value.trim();
    const email = document.getElementById(isFooter ? 'footer-email' : 'email').value.trim();
    const message = document.getElementById(isFooter ? 'footer-message' : 'message').value.trim();
    if (!name || !email || !message) return;

    const text = [
        (isFooter ? 'New consultation request from website:' : 'New message from website:'),
        '',
        'Name: ' + name,
        'Email: ' + email,
        '',
        'Message: ' + message
    ].join('\n');

    window.open('https://wa.me/8801773497376?text=' + encodeURIComponent(text), '_blank');
    form.reset();
}

/* ---------------- KNIT MACHINE EXPLODED VIEW REPLAY ---------------- */
const knitBg = document.querySelector('.bg-knit');
let knitAutoBurst = null;
function knitBurst() {
    if (!knitBg) return;
    knitBg.classList.add('knit-burst');
    setTimeout(() => knitBg.classList.remove('knit-burst'), 12000);
}
if (knitBg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('load', () => {
        setTimeout(knitBurst, 3000);
        knitAutoBurst = setInterval(knitBurst, 22000);
    });
}
const knitStopAuto = () => {
    if (knitAutoBurst) { clearInterval(knitAutoBurst); knitAutoBurst = null; }
};

/* ---------------- HERO MACHINE CONTROLS (ROTATE / EXPLODE / ASSEMBLE) ---------------- */
(function () {
    const rotateBtn = document.getElementById('knitRotateBtn');
    const explodeBtn = document.getElementById('knitExplodeBtn');
    const assembleBtn = document.getElementById('knitAssembleBtn');
    if (!knitBg && !(rotateBtn || explodeBtn || assembleBtn)) return;

    if (rotateBtn) rotateBtn.addEventListener('click', () => {
        const paused = knitBg.classList.toggle('knit-paused');
        rotateBtn.classList.toggle('on', paused);
        rotateBtn.setAttribute('aria-pressed', paused);
        rotateBtn.querySelector('span').textContent = paused ? 'Resume' : 'Rotate';
    });
    if (explodeBtn) explodeBtn.addEventListener('click', () => {
        knitStopAuto();
        knitBg.classList.add('knit-burst');
        explodeBtn.classList.add('on');
        assembleBtn.classList.remove('on');
    });
    if (assembleBtn) assembleBtn.addEventListener('click', () => {
        knitStopAuto();
        knitBg.classList.remove('knit-burst');
        assembleBtn.classList.add('on');
        explodeBtn.classList.remove('on');
    });
})();

/* ---------------- EXPLORE MACHINE INTERACTIONS ---------------- */
(function () {
    const stage = document.getElementById('exploreStage');
    const viewport = document.getElementById('exploreViewport');
    const rotor = document.getElementById('exploreRotor');
    const explodeBtn = document.getElementById('explodeBtn');
    const assembleBtn = document.getElementById('assembleBtn');
    const spinToggle = document.getElementById('spinToggle');
    const nameEl = document.getElementById('exploreName');
    const fnEl = document.getElementById('exploreFn');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stage || !viewport || !rotor) return;

    const parts = stage.querySelectorAll('.ex-part');
    let yaw = -14, baseYaw = -14, spinning = false, dragging = false, lastX = 0;

    const render = () => {
        rotor.style.transform = 'rotateX(-4deg) rotateY(' + yaw + 'deg)';
    };
    const swing = () => {
        if (reduced) return;
        if (spinning) {
            yaw += 0.35;
        } else if (!dragging) {
            yaw = baseYaw + Math.sin(performance.now() / 1000 * 0.5) * 10;
        }
        render();
        requestAnimationFrame(swing);
    };
    requestAnimationFrame(swing);
    render();

    const setSpinUI = () => {
        if (!spinToggle) return;
        spinToggle.textContent = spinning ? 'Pause Rotation' : 'Resume Rotation';
    };

    viewport.addEventListener('pointerdown', e => {
        if (e.target.closest('.explore-note, .explore-actions, .ex-part')) return;
        dragging = true;
        lastX = e.clientX;
        if (viewport.setPointerCapture) viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', e => {
        if (!dragging) return;
        baseYaw += (e.clientX - lastX) * 0.4;
        lastX = e.clientX;
        yaw = baseYaw;
    });
    const stopDrag = () => { dragging = false; };
    viewport.addEventListener('pointerup', stopDrag);
    viewport.addEventListener('pointercancel', stopDrag);
    viewport.addEventListener('pointerleave', stopDrag);

    explodeBtn.addEventListener('click', () => stage.classList.add('exploded'));
    assembleBtn.addEventListener('click', () => stage.classList.remove('exploded'));
    spinToggle.addEventListener('click', () => {
        spinning = !spinning;
        setSpinUI();
    });

    parts.forEach(part => {
        part.addEventListener('click', e => {
            e.stopPropagation();
            parts.forEach(p => p.classList.remove('active'));
            part.classList.add('active');
            if (nameEl) nameEl.textContent = part.getAttribute('data-name') || 'Component';
            if (fnEl) fnEl.textContent = part.getAttribute('data-fn') || '';
            if (!stage.classList.contains('exploded')) explodeBtn.click();
        });
        part.addEventListener('mouseenter', () => {
            parts.forEach(p => p.classList.remove('active'));
            part.classList.add('active');
            if (nameEl) nameEl.textContent = part.getAttribute('data-name') || 'Component';
            if (fnEl) fnEl.textContent = part.getAttribute('data-fn') || '';
        });
        part.addEventListener('mouseleave', () => {
            if (stage.querySelector('.ex-part.active') === part) part.classList.remove('active');
        });
    });
})();

/* ---------------- PROCESS SCRUB ---------------- */
(function () {
    const scrub = document.getElementById('processScrub');
    const track = scrub && scrub.querySelector('.process-track');
    const stages = scrub && Array.prototype.slice.call(scrub.querySelectorAll('.process-stage'));
    if (!scrub || !track) return;

    const onScrub = () => {
        const r = scrub.getBoundingClientRect();
        const total = r.height;
        const traveled = Math.min(Math.max(window.innerHeight - r.top, 0), total);
        const progress = total > 0 ? traveled / total : 0;
        track.style.setProperty('--pr', progress);

        if (stages) stages.forEach(stage => {
            const pr = stage.getBoundingClientRect();
            stage.classList.toggle('in', pr.top < window.innerHeight * 0.72 && pr.bottom > window.innerHeight * 0.28);
        });
    };
    window.addEventListener('scroll', onScrub, { passive: true });
    onScrub();
})();

/* ---------------- CORE EXPERTISE ROW DWELL (subtle) ---------------- */
(function () {
    const rows = document.querySelectorAll('.skill-row');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => row.style.background = 'rgba(94,234,212,0.028)');
        row.addEventListener('mouseleave', () => row.style.background = '');
    });
})();

/* ---------------- EXPLORE META (MATERIAL / MECHANISM) ---------------- */
(function () {
    const mat = document.getElementById('exploreMat');
    const mech = document.getElementById('exploreMech');
    const fill = part => {
        if (!mat || !mech) return;
        mat.textContent = part.getAttribute('data-material') || '—';
        mech.textContent = part.getAttribute('data-mech') || '—';
    };
    if (!mat || !mech) return;
    document.querySelectorAll('.ex-part').forEach(part => {
        part.addEventListener('click', () => fill(part), true);
        part.addEventListener('mouseenter', () => fill(part), true);
    });
})();

/* ---------------- MAGNETIC BUTTONS ---------------- */
(function () {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    document.querySelectorAll('.hero-actions .btn, .cta-actions .btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width / 2) / r.width;
            const dy = (e.clientY - r.top - r.height / 2) / r.height;
            btn.style.transform = 'translate(' + dx * 7 + 'px,' + dy * 5 + 'px)';
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
})();
