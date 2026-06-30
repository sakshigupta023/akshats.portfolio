// ============================================================
// Navbar — glass effect on scroll
// ============================================================

const header = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });


// ============================================================
// Scroll reveal
// ============================================================

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 90);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));


// ============================================================
// Hero entrance (runs once on load, no scroll needed)
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero .reveal').forEach((el) => {
        // small delay so the page paints first
        requestAnimationFrame(() => {
            setTimeout(() => el.classList.add('visible'), 80);
        });
    });
});


// ============================================================
// Featured work slideshow — auto-cycle, hold 2.5s, crossfade
// ============================================================

const slides = document.querySelectorAll('#slideshow .slide');
let currentSlide = 0;

if (slides.length > 1) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 2500);
}
