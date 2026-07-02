/* ============================================================
   NAVBAR CONTROL
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ============================================================
   SCROLL REVEAL (Hero, About, Journey, Toolkit Sections)
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
   HERO ENTRANCE CORRELATION
============================================================ */
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 110);
    });
});


/* ============================================================
   PREMIUM FEATURED WORK DESIGN ARCHITECTURE
============================================================ */
const workSection = document.getElementById('work');
const accordionStage = document.getElementById('accordionStage');
const workCards = document.querySelectorAll('.work-card');
const indicatorProgress = document.getElementById('workIndicatorProgress');

// Initialize Global Stagger Entrance Matrix upon Scroll Viewport Crossings
const workSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger sequenced staggered animation transitions built cleanly via our specific utility sets
            workSection.querySelectorAll('.animate-init').forEach(el => {
                el.classList.add('animate-active');
            });
            workSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

if (workSection) {
    workSectionObserver.observe(workSection);
}

/**
 * Sync Tracking Indicator Logic
 * Dynamically resizes tracking meter states depending on current selection context coordinates
 */
function updateProgressIndicator(activeIndex) {
    if (!indicatorProgress || window.innerWidth <= 768) return;
    const totalCards = workCards.length;
    const segmentsWidth = 100 / totalCards;
    
    indicatorProgress.style.width = `${segmentsWidth}%`;
    indicatorProgress.style.transform = `translateX(${activeIndex * 100}%)`;
}

// Setup Active Status Indicator on Boot up
updateProgressIndicator(0);

/**
 * Expand/Collapse Transition Listeners
 * Tracks interaction vectors over the main desktop accordion layers without layout jumps
 */
workCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return; // Prevent interference with mobile swipe interactions
        
        workCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        updateProgressIndicator(index);
    });
});

/**
 * High-Performance Parallax Loop Logic
 * Managed seamlessly inside requestAnimationFrame ticks to maintain a locked 60 FPS
 */
let targetMouseX = 0;
let targetMouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;

// Lower values generate heavier, organic lag responses for luxury visual weights
const interpolationFactor = 0.08; 

window.addEventListener('mousemove', (e) => {
    // Standardize cursor positioning fields relative to viewport center coordinates
    targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
}, { passive: true });

function processParallaxLoop() {
    // Apply Linear Interpolation (LERP) variables safely
    currentMouseX += (targetMouseX - currentMouseX) * interpolationFactor;
    currentMouseY += (targetMouseY - currentMouseY) * interpolationFactor;

    // Calculate structural pixel offsets (Max 25px translation threshold mappings)
    const pxOffsetValueX = currentMouseX * 25;
    const pxOffsetValueY = currentMouseY * 25;

    // Direct hardware-accelerated property updates exclusively on the active graphic element
    const activeCardImage = document.querySelector('.work-card.active .card-bg-img');
    if (activeCardImage && window.innerWidth > 768) {
        activeCardImage.style.setProperty('--move-x', `${pxOffsetValueX}px`);
        activeCardImage.style.setProperty('--move-y', `${pxOffsetValueY}px`);
    }

    requestAnimationFrame(processParallaxLoop);
}

// Start tracking calculations
requestAnimationFrame(processParallaxLoop);

/**
 * Mobile Mobile Snap Scroll Synchronization Listener
 */
if (accordionStage) {
    accordionStage.addEventListener('scroll', () => {
        if (window.innerWidth > 768) return;
        
        const stageWidth = accordionStage.offsetWidth;
        const currentScrollPosition = accordionStage.scrollLeft;
        
        // Quantize indices based on horizontal location ranges
        const estimatedIndex = Math.round(currentScrollPosition / (stageWidth * 0.85));
        
        if (workCards[estimatedIndex] && !workCards[estimatedIndex].classList.contains('active')) {
            workCards.forEach(c => c.classList.remove('active'));
            workCards[estimatedIndex].classList.add('active');
        }
    }, { passive: true });
}
