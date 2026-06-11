const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');

const themeToggleButton = document.getElementById('theme-toggle');
const rootBody = document.body;

function applyTheme(theme) {
    if (!rootBody) return;

    const activeTheme = theme === 'light' ? 'light' : 'dark';
    rootBody.setAttribute('data-theme', activeTheme);

    if (themeToggleButton) {
        const icon = themeToggleButton.querySelector('i');
        if (icon) {
            icon.className = activeTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
        }
        themeToggleButton.setAttribute('aria-label', activeTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
        themeToggleButton.setAttribute('title', activeTheme === 'light' ? 'Dark mode' : 'Light mode');
    }
}

const savedTheme = localStorage.getItem('site-theme');
applyTheme(savedTheme || 'dark');

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = rootBody.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('site-theme', nextTheme);
    });
}

const heroTypewriterText = document.getElementById('heroTypewriterText');

if (heroTypewriterText) {
    const typePhrases = [
        'I build scalable web apps',
        'I create smart data dashboards',
        'I design clean user experiences',
        'I deliver reliable deployments'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeLoop = () => {
        const currentPhrase = typePhrases[phraseIndex];
        charIndex += isDeleting ? -1 : 1;
        heroTypewriterText.textContent = currentPhrase.slice(0, charIndex);

        let delay = isDeleting ? 42 : 76;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 1300;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typePhrases.length;
            delay = 280;
        }

        window.setTimeout(typeLoop, delay);
    };

    typeLoop();
}

const navLinks = document.querySelectorAll('.nav__link');

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('show');
    }
}

navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY + 80;

    sections.forEach((currentSection) => {
        const sectionHeight = currentSection.offsetHeight;
        const sectionTop = currentSection.offsetTop;
        const sectionId = currentSection.getAttribute('id');
        const activeLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

        if (!activeLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            activeLink.classList.add('active');
        } else {
            activeLink.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);
scrollActive();

const siteHeader = document.querySelector('.site-header');

function syncHeaderState() {
    if (!siteHeader) return;
    siteHeader.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', syncHeaderState);
syncHeaderState();

const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 900,
    delay: 120,
    reset: false
});

sr.reveal('.hero__text, .hero__photo-frame, .about__image, .about__content, .card, .project-card, .gallery-item, .timeline__item, .contact > div, .contact__form', { interval: 120 });

const heroImage = document.querySelector('.hero__photo');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroImage && !reduceMotion) {
    window.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 6;
        const y = (event.clientY / window.innerHeight - 0.5) * 6;
        heroImage.style.setProperty('--parallax-x', `${x}px`);
        heroImage.style.setProperty('--parallax-y', `${y}px`);
    });
}

const spotlightTargets = document.querySelectorAll('.card, .project-card');

if (!reduceMotion && spotlightTargets.length) {
    spotlightTargets.forEach((target) => {
        target.addEventListener('mousemove', (event) => {
            const rect = target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            target.style.setProperty('--mx', `${x}px`);
            target.style.setProperty('--my', `${y}px`);
        });
    });
}

const CV_URL = 'assets/resume.pdf';
const viewCvButton = document.getElementById('viewCvButton');
const downloadButton = document.getElementById('downloadButton');

if (viewCvButton) {
    viewCvButton.addEventListener('click', (event) => {
        event.preventDefault();
        const newWindow = window.open(CV_URL, '_blank', 'noopener');
        if (!newWindow) {
            window.location.href = CV_URL;
        }
    });
}

if (downloadButton) {
    downloadButton.addEventListener('click', (event) => {
        event.preventDefault();

        const link = document.createElement('a');
        link.href = CV_URL;
        link.download = 'rabin-cv.pdf';
        link.click();
    });
}

const lightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryViewButtons = document.querySelectorAll('.gallery-view-btn');

function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
}

if (lightbox && lightboxImage && galleryViewButtons.length) {
    galleryViewButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const galleryItem = button.closest('.gallery-item');
            const image = galleryItem ? galleryItem.querySelector('img') : null;

            if (!image) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add('show');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}