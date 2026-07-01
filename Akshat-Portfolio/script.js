/* ============================================================
   NAVBAR
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ============================================================
   HERO ENTRANCE
============================================================ */
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 110);
    });
});


/* ============================================================
   NETFLIX CARD POP-OUT SLIDESHOW

   Flow per slide:
     1. Load image into popout card (hidden, scale(1), opacity 0)
     2. Set bg in thumb slot
     3. POP OUT  →  scale(1.32) translateY(-6%), opacity 1   [0.5s spring]
     4. HOLD 2.5s  (user sees it large)
     5. SNAP IN  →  scale(1), opacity 0                      [0.4s sharp]
     6. Short pause, then next slide
============================================================ */

const slides       = document.querySelectorAll('.screen-slide');
const popoutCard   = document.getElementById('popoutCard');
const popoutImg    = document.getElementById('popoutImg');
const progressBar  = document.getElementById('slideProgressBar');

const T_OUT   = 500;   // pop-out spring
const T_HOLD  = 2500;  // hold time
const T_IN    = 400;   // snap-in
const T_PAUSE = 350;   // gap before next

let current = 0;
let started = false;

// Pre-load all slide backgrounds immediately
slides.forEach(slide => {
    if (slide.dataset.src) {
        slide.style.backgroundImage = `url('${slide.dataset.src}')`;
    }
});

// Show first slide thumb
slides[0].classList.add('active');

function runSlide(idx) {
    const slide = slides[idx];
    const src   = slide.dataset.src || '';

    // — Step 1: switch thumb (crossfade) —
    slides.forEach(s => s.classList.remove('active'));
    slide.classList.add('active');

    // — Step 2: load image into popout (while invisible) —
    popoutImg.src = src;

    // Reset: no transition, invisible, same size as thumb
    popoutCard.className = 'popout-card';

    // Reset progress bar instantly
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth;

    // — Step 3: POP OUT (next frame so reset is applied) —
    requestAnimationFrame(() => requestAnimationFrame(() => {
        popoutCard.classList.add('popping-out');

        // Progress bar animates over hold period
        setTimeout(() => {
            progressBar.style.transition = `width ${T_HOLD}ms linear`;
            progressBar.style.width = '100%';
        }, T_OUT);
    }));

    // — Step 4 → 5: after hold, SNAP IN —
    setTimeout(() => {
        popoutCard.classList.remove('popping-out');
        popoutCard.classList.add('snapping-in');
    }, T_OUT + T_HOLD);

    // — Step 6: next slide —
    setTimeout(() => {
        current = (idx + 1) % slides.length;
        runSlide(current);
    }, T_OUT + T_HOLD + T_IN + T_PAUSE);
}

// Start only when the card stage scrolls into view
const stageEl = document.getElementById('laptopStage');
const startObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting && !started) {
            started = true;
            setTimeout(() => runSlide(0), 500);
            startObs.disconnect();
        }
    });
}, { threshold: 0.35 });

if (stageEl) startObs.observe(stageEl);
