/* ============================================================
   NAVBAR EFFECT
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ============================================================
   SCROLL REVEAL MONITORING
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
   HERO ENTRANCE COORDINATION
============================================================ */
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 110);
    });
});


/* ============================================================
   PREMIUM FEATURED WORK DESIGN INTERACTIVES
============================================================ */
const workSection = document.getElementById('work');
const accordionStage = document.getElementById('accordionStage');
const workCards = document.querySelectorAll('.work-card');
const indicatorProgress = document.getElementById('workIndicatorProgress');

// Initialize Intersection Observers to trigger staggered viewport entrances
const workSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
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
 * Sync Tracking Indicator 
 * Controls status updates on the horizontal tracking track
 */
function updateProgressIndicator(activeIndex) {
    if (!indicatorProgress || window.innerWidth <= 768) return;
    const totalCards = workCards.length;
    const segmentsWidth = 100 / totalCards;
    
    indicatorProgress.style.width = `${segmentsWidth}%`;
    indicatorProgress.style.transform = `translateX(${activeIndex * 100}%)`;
}

// Initial Call setup on boot
updateProgressIndicator(0);

/**
 * Desktop Accordion Hover State Listeners
 */
workCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return; // Ignore hover actions inside mobile viewport matrices
        
        workCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        updateProgressIndicator(index);
    });
});

/**
 * Hardware Accelerated Parallax Animation Engine Loops
 * Feeds custom variables into will-change target boundaries via requestAnimationFrame loops
 */
let targetMouseX = 0;
let targetMouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;

// Lower numbers generate heavier cinematic dampening weight properties
const interpolationFactor = 0.08; 

window.addEventListener('mousemove', (e) => {
    // Center point tracking layout equations
    targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
}, { passive: true });

function processParallaxLoop() {
    // Linear Interpolation equations
    currentMouseX += (targetMouseX - currentMouseX) * interpolationFactor;
    currentMouseY += (targetMouseY - currentMouseY) * interpolationFactor;

    // Constrain relative pixel offset output translation ceilings
    const pxOffsetValueX = currentMouseX * 28;
    const pxOffsetValueY = currentMouseY * 28;

    // Apply translations exclusively to active visual items (images or videos)
    const activeMediaElement = document.querySelector('.work-card.active .card-bg-wrap > *');
    if (activeMediaElement && window.innerWidth > 768) {
        activeMediaElement.style.setProperty('--move-x', `${pxOffsetValueX}px`);
        activeMediaElement.style.setProperty('--move-y', `${pxOffsetValueY}px`);
    }

    requestAnimationFrame(processParallaxLoop);
}

// Execute animation processing loop
requestAnimationFrame(processParallaxLoop);

/**
 * Mobile Touch-Swipe Tracking Integrations
 */
if (accordionStage) {
    accordionStage.addEventListener('scroll', () => {
        if (window.innerWidth > 768) return;
        
        const stageWidth = accordionStage.offsetWidth;
        const currentScrollPosition = accordionStage.scrollLeft;
        
        // Calculate index values based on horizontal location ranges
        const estimatedIndex = Math.round(currentScrollPosition / (stageWidth * 0.85));
        
        if (workCards[estimatedIndex] && !workCards[estimatedIndex].classList.contains('active')) {
            workCards.forEach(c => c.classList.remove('active'));
            workCards[estimatedIndex].classList.add('active');
        }
    }, { passive: true });
}
