/**
 * Next Generation Business – Landing Page
 * Countdown, form validation, scroll animations, navigation
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // SMOOTH SCROLL (Lenis) + SOFT SECTION SNAP
    // ========================
    // Lenis handles buttery wheel/keyboard scrolling with a soft easing curve.
    // A custom snap layer on top waits for the user to stop scrolling, then
    // gently glides to the nearest section using the same easing — creating
    // elegant "slide" transitions without the rigid jerk of native CSS snap.
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.6,
            // quart.out – morbido, decelera dolcemente senza mai scattare
            easing: (t) => 1 - Math.pow(1 - t, 4),
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.6,
            lerp: 0.06,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Ricalcola l'altezza totale della pagina dopo che tutto è stato renderizzato
        const resizeLenis = () => lenis && lenis.resize();
        window.addEventListener('load', () => setTimeout(resizeLenis, 150));
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => setTimeout(resizeLenis, 100));
        }

        // --- Soft section snap ---
        const snapTargets = Array.from(
            document.querySelectorAll('.hero, .section')
        );
        const footerEl = document.querySelector('.footer');
        if (footerEl) snapTargets.push(footerEl);

        const SNAP_DELAY = 160;    // ms to wait after scroll stops
        const SNAP_DURATION = 1.5; // seconds for the easing glide
        let snapTimer = null;
        let isSnapping = false;
        let prevScroll = 0;

        const softEasing = (t) => 1 - Math.pow(1 - t, 4);

        const snapToNearest = () => {
            if (!lenis || isSnapping) return;

            const currentScroll = lenis.scroll;
            const maxScroll = lenis.limit;

            // Allow the user to rest at the very bottom of the document
            if (currentScroll >= maxScroll - 6) return;

            // Find the closest snap target (clamped to max scroll so that
            // the footer, which may sit beyond maxScroll, still snaps nicely)
            let targetScroll = null;
            let closestDistance = Infinity;

            for (const el of snapTargets) {
                const scrollFor = Math.min(el.offsetTop, maxScroll);
                const distance = Math.abs(scrollFor - currentScroll);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    targetScroll = scrollFor;
                }
            }

            if (targetScroll === null || closestDistance < 5) return;

            isSnapping = true;
            lenis.scrollTo(targetScroll, {
                duration: SNAP_DURATION,
                easing: softEasing,
                lock: true,
                onComplete: () => {
                    // small grace window so residual scroll events don't retrigger snap
                    setTimeout(() => { isSnapping = false; }, 80);
                },
            });
        };

        lenis.on('scroll', ({ scroll }) => {
            if (isSnapping) { prevScroll = scroll; return; }
            // Reset debounce each time scroll updates; fires once user stops
            clearTimeout(snapTimer);
            snapTimer = setTimeout(snapToNearest, SNAP_DELAY);
            prevScroll = scroll;
        });

        window.lenis = lenis;
    }

    // ========================
    // NAVBAR SCROLL BEHAVIOR
    // ========================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================
    // COUNTDOWN TIMER
    // ========================
    const eventDate = new Date('2026-04-29T14:00:00+02:00').getTime();
    const countdownEl = document.getElementById('countdown');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            countdownEl.innerHTML =
                '<p style="color: var(--accent); font-size: 1.1rem; font-weight: 600; letter-spacing: 1px;">L\'evento è in corso</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================
    // SCROLL ANIMATIONS
    // ========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.about-card, .about-feature, .speaker-card, .timeline-item, ' +
        '.location-info, .location-map, .partner-category, .form-wrapper'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 4) * 0.08}s`;
        observer.observe(el);
    });

    // ========================
    // HERO BACKGROUND PARTICLES
    // Subtle, slow-moving dots for a refined look
    // ========================
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleDrift {
                0%   { transform: translateY(0) translateX(0); opacity: 0; }
                15%  { opacity: 0.6; }
                85%  { opacity: 0.6; }
                100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        for (let i = 0; i < 18; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 2.5 + 1;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleDrift ${Math.random() * 15 + 20}s linear infinite;
                animation-delay: ${Math.random() * -30}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // ========================
    // FORM VALIDATION & SUBMIT
    // ========================
    const form = document.getElementById('accreditationForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (field.type !== 'checkbox') {
                field.addEventListener('blur', () => validateField(field));
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        validateField(field);
                    }
                });
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }

            // Show loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API endpoint)
            setTimeout(() => {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    function validateField(field) {
        const errorEl = document.getElementById(field.id + 'Error');

        if (field.type === 'checkbox') {
            if (!field.checked) {
                if (errorEl) errorEl.textContent = 'Campo obbligatorio';
                return false;
            }
            if (errorEl) errorEl.textContent = '';
            return true;
        }

        const value = field.value.trim();

        if (!value) {
            field.classList.add('error');
            if (errorEl) errorEl.textContent = 'Campo obbligatorio';
            return false;
        }

        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                if (errorEl) errorEl.textContent = 'Inserire un indirizzo email valido';
                return false;
            }
        }

        field.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
        return true;
    }

    // ========================
    // SMOOTH SCROLL FOR ANCHORS
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            if (lenis) {
                lenis.scrollTo(target, {
                    offset: -70,
                    duration: 2.0,
                    easing: (t) => 1 - Math.pow(1 - t, 4),
                });
            } else {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================
    // ACTIVE NAV LINK ON SCROLL
    // ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta)');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Set timeline data-time attributes for mobile view
    document.querySelectorAll('.timeline-item').forEach(item => {
        const time = item.querySelector('.timeline-time');
        const content = item.querySelector('.timeline-content');
        if (time && content) {
            content.setAttribute('data-time', time.textContent.trim());
        }
    });

});
