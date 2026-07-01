/* ============================================================
   NAVBAR — glass on scroll
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   HERO ENTRANCE
============================================================ */
window.addEventListener('DOMContentLoaded', () => {
    const heroItems = document.querySelectorAll('.hero .reveal');
    heroItems.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 100);
    });
});


/* ============================================================
   LAPTOP POP-OUT SLIDESHOW
   Flow per slide:
     1. Set bg image in screen slot  (instant)
     2. Preload popout media
     3. Pop OUT  (0.45s spring)
     4. HOLD     (2.5s — user sees the work)
     5. Snap IN  (0.35s sharp)
     6. Brief pause then next slide
============================================================ */

const slides = document.querySelectorAll('.screen-slide');
const popoutCard  = document.getElementById('popoutCard');
const popoutImg   = document.getElementById('popoutImg');
const popoutVideo = document.getElementById('popoutVideo');
const progressBar = document.getElementById('slideProgressBar');

// Timings (ms)
const T_POP_OUT    = 450;   // spring out duration
const T_HOLD       = 2500;  // how long it stays popped out
const T_SNAP_IN    = 350;   // snap back duration
const T_PAUSE      = 400;   // gap between slides
const T_TOTAL      = T_POP_OUT + T_HOLD + T_SNAP_IN + T_PAUSE;

let current   = 0;
let running   = false;
let timerRef  = null;

// Pre-set all slide backgrounds immediately on load
slides.forEach(slide => {
    const src = slide.dataset.src;
    if (src && slide.dataset.type === 'image') {
        slide.style.backgroundImage = `url('${src}')`;
    }
});

// Activate first slide visually
if (slides.length) slides[0].classList.add('active');

function progressTick(elapsed, total) {
    const pct = Math.min((elapsed / total) * 100, 100);
    progressBar.style.width = pct + '%';
}

function runSlide(index) {
    if (!slides.length) return;
    running = true;

    const slide = slides[index];
    const type  = slide.dataset.type || 'image';
    const src   = slide.dataset.src  || '';

    // -- Activate screen slot --
    slides.forEach(s => s.classList.remove('active'));
    slide.classList.add('active');

    // Reset popout state (no transition while resetting position)
    popoutCard.className = 'popout-card';
    popoutCard.classList.toggle('is-video', type === 'video');

    // Load media into popout
    if (type === 'video') {
        popoutVideo.src = src;
        popoutVideo.load();
    } else {
        popoutImg.src = src;
    }

    // Reset progress bar
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth; // force reflow

    // -- 1. POP OUT --
    const popStart = performance.now();

    requestAnimationFrame(() => {
        popoutCard.classList.add('popping-out');
        if (type === 'video') {
            popoutVideo.currentTime = 0;
            popoutVideo.play().catch(() => {});
        }

        // Animate progress bar over HOLD period
        progressBar.style.transition = `width ${T_HOLD}ms linear`;
    });

    // -- 2. After pop-out animation completes, start progress bar tick --
    timerRef = setTimeout(() => {
        progressBar.style.width = '100%';
    }, T_POP_OUT);

    // -- 3. SNAP IN after hold --
    timerRef = setTimeout(() => {
        popoutCard.classList.remove('popping-out');
        popoutCard.classList.add('snapping-in');

        if (type === 'video') {
            popoutVideo.pause();
        }
    }, T_POP_OUT + T_HOLD);

    // -- 4. Next slide after snap completes --
    timerRef = setTimeout(() => {
        current = (index + 1) % slides.length;
        runSlide(current);
    }, T_POP_OUT + T_HOLD + T_SNAP_IN + T_PAUSE);
}

// Start the loop once the laptop stage enters viewport
const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !running) {
            // Small delay so the reveal animation finishes first
            setTimeout(() => runSlide(0), 600);
            stageObserver.disconnect();
        }
    });
}, { threshold: 0.4 });

const stage = document.getElementById('laptopStage');
if (stage) stageObserver.observe(stage);
