// ========================================
// MAIN.JS — Interaksi & Animations
// ========================================

// ===== TYPING EFFECT =====
const titles = [
    'Frontend Developer',
    'AI Engineer',
    'Computer Science Student (AI)',
    'Building AI-Powered Web Apps'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    if (!typingElement) return;
    
    const currentText = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

// ===== CLOSE MENU FUNCTION =====
function closeMenu() {
    if (navLinks) {
        navLinks.classList.remove('open');
        const icon = menuToggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
}
// Make it global for onclick
window.closeMenu = closeMenu;

// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let isDark = true;

// Cek preferensi user di localStorage
if (localStorage.getItem('theme') === 'light') {
    isDark = false;
    body.classList.add('light-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== FADE-IN ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Apply fade-in ke semua section dan card
document.querySelectorAll('.about, .experience, .projects, .certificates, .contact, .footer, .project-card, .certificate-card, .stat-card, .timeline-item, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== PARALLAX ON SCROLL (Hero Effect) =====
const hero = document.getElementById('home');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const content = hero.querySelector('.hero-content');
        if (content && scrolled < window.innerHeight) {
            content.style.transform = `translateY(${scrolled * 0.15}px)`;
            content.style.opacity = 1 - (scrolled / (window.innerHeight * 0.6));
        }
    });
}

console.log('🚀 Samuel M. Sinurat Portfolio loaded!');