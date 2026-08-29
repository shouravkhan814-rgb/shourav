// ============ WhatsApp Form Submit ============
function sendWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const text = `Hello Shourav, I'm ${name}.\n\n${message}\n\n` +
                 `My contact: ${email}`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/8801773497376?text=${encoded}`;

    window.open(url, '_blank');
}

// ============ Navbar background on scroll + Scroll progress + Active link ============
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.scroll-progress span');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
    // Navbar style
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    // Active nav link
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', onScroll);
onScroll();

// ============ Smooth scroll (anchor links) ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
            history.replaceState(null, null, href);
        }
    });
});

// ============ Mobile menu ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
    if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

// ============ Scroll reveal ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ Custom cursor (desktop only) ============
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const glow = document.querySelector('.cursor-glow');

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth trailing for the glow ring
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Cursor grows over interactive elements
    const interactive = 'a, button, .card, .gallery-item, input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactive)) {
            dot.style.width = '16px';
            dot.style.height = '16px';
            glow.style.width = '56px';
            glow.style.height = '56px';
            glow.style.borderColor = 'var(--gold-glow)';
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactive)) {
            dot.style.width = '8px';
            dot.style.height = '8px';
            glow.style.width = '40px';
            glow.style.height = '40px';
            glow.style.borderColor = 'var(--gold-soft)';
        }
    });
}

// ============ Tilt effect on portrait ============
const portrait = document.querySelector('.portrait-frame');
if (portrait) {
    portrait.addEventListener('mousemove', (e) => {
        const rect = portrait.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / 30;
        const ry = (cx - x) / 30;
        portrait.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    portrait.addEventListener('mouseleave', () => {
        portrait.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    });
    portrait.style.transition = 'transform 0.25s ease, box-shadow 0.4s ease';
}

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', () => {
    // Contact form submit handler (kept inline in HTML, nothing to do here)
});
