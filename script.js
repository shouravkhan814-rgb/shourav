// Particles Animation
function createParticles() {
    const particles = document.getElementById('particles');
    const count = 50;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 18 + 's';
        particle.style.animationDuration = (Math.random() * 12 + 12) + 's';
        particles.appendChild(particle);
    }
}

// WhatsApp Form Submit
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

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .edu-item, .contact-item, .about-text');

    elements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.92)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
    }
});

// Tilt Effect on Profile Image
const profileImage = document.querySelector('.image-wrapper');
if (profileImage) {
    profileImage.addEventListener('mousemove', (e) => {
        const rect = profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    handleScrollAnimations();
});
