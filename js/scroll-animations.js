// Scroll-triggered animations
// This script adds reveal animations to elements as they scroll into view

document.addEventListener('DOMContentLoaded', function() {
    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

    // Observe cards
    const cards = document.querySelectorAll('.card-hover, .debate-card, .module-card, .resource-card');
    cards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe demo container
    const demoContainer = document.querySelector('.demo-container');
    if (demoContainer) {
        demoContainer.classList.add('scroll-reveal');
        observer.observe(demoContainer);
    }

    // Add parallax effect to hero banner
    const bannerImage = document.querySelector('.banner-image');
    if (bannerImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            bannerImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
        });
    }

    // Add smooth color transition on scroll for navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(249, 250, 251, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--surface)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }
});
