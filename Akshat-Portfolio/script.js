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
// Work filters — real filtering by data-category
// ============================================================

const filterBtns = document.querySelectorAll('.filter');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const selected = btn.dataset.filter;

        workCards.forEach((card) => {
            const matches = selected === 'all' || card.dataset.category === selected;
            card.style.display = matches ? '' : 'none';
        });
    });
});


// ============================================================
// Lightbox — click a work card to pop it up larger
// ============================================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(card) {
    const img = card.dataset.img;
    const title = card.dataset.title;
    const desc = card.dataset.desc;

    lightboxImg.src = img;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

workCards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card));
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
