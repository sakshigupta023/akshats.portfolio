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
// Work carousel — prev / next buttons
// ============================================================

const track = document.getElementById('workTrack');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (track && prevBtn && nextBtn) {
    const scrollAmount = 250;

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}


// ============================================================
// Work filters — visual active state
// (Hook actual filtering logic here once real project data/tags exist)
// ============================================================

const filterBtns = document.querySelectorAll('.filter');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Placeholder: currently shows all cards regardless of filter.
        // When real project tags are added, filter .work-card elements
        // by matching their data-category attribute against btn.dataset.filter.
    });
});
