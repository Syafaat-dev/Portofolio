document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initThemeToggle();
    initTypingEffect();
    initScrollReveal();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#menu .nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.remove('active');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function initThemeToggle() {
    const STORAGE_KEY = 'syafaat-theme';
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light') {
        root.setAttribute('data-theme', 'light');
    }
    updateToggleIcon();

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem(STORAGE_KEY, 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem(STORAGE_KEY, 'light');
        }
        updateToggleIcon();
    });

    function updateToggleIcon() {
        if (!toggleBtn) return;
        const isLight = root.getAttribute('data-theme') === 'light';
        toggleBtn.textContent = isLight ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', isLight ? 'Ganti ke mode gelap' : 'Ganti ke mode terang');
    }
}

function initTypingEffect() {
    const el = document.querySelector('[data-typing]');
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fullText = el.textContent;

    if (prefersReducedMotion) return; // biarkan teks statis

    el.textContent = '';
    el.style.borderRight = '2px solid var(--accent)';
    el.style.paddingRight = '2px';

    let i = 0;
    const speed = 55; // ms per karakter

    function type() {
        if (i < fullText.length) {
            el.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => { el.style.borderRight = 'none'; }, 900);
        }
    }
    type();
}

function initScrollReveal() {
    const sections = document.querySelectorAll('.content-section');
    if (!sections.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    sections.forEach(section => section.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(section => observer.observe(section));
}
