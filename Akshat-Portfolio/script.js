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
        if (entry.isIntersecting || document.readyState === 'complete') {
            workSection.querySelectorAll('.animate-init').forEach(el => {
                el.classList.add('animate-active');
            });
            workSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 }); // Lowered threshold to ensure it fires instantly

if (workSection) {
    workSectionObserver.observe(workSection);
    
    // Safety Fallback Trigger: Forces layout exposure if observer execution lags
    setTimeout(() => {
        workSection.querySelectorAll('.animate-init').forEach(el => {
            el.classList.add('animate-active');
        });
    }, 800);
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
 * Desktop Accordion Hover State Listeners with Force-Play Mechanics
 */
workCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return; // Ignore hover actions inside mobile viewport matrices
        
        workCards.forEach(c => {
            c.classList.remove('active');
            // Pause any out-of-focus background media loops to preserve resources
            const inactiveVideo = c.querySelector('video');
            if (inactiveVideo) {
                inactiveVideo.pause();
            }
        });

        card.classList.add('active');
        updateProgressIndicator(index);

        // Force initialize playback sequences on targeted active media tags immediately
        const activeVideo = card.querySelector('video');
        if (activeVideo) {
            activeVideo.muted = true;
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => console.log("Autoplay blocked on hover:", err));
            }
        }
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
 * Universal Autoplay Recovery Anchor
 * Forces video initialization immediately upon structural landing windows
 */
window.addEventListener('DOMContentLoaded', () => {
    const defaultVideoElement = document.getElementById('showcaseVideo');
    if (defaultVideoElement) {
        defaultVideoElement.muted = true;
        defaultVideoElement.play().catch(err => {
            // Fallback: trigger playback on user's first scroll/click gesture if the browser blocks cold autoplay
            const initialInteractionTrigger = () => {
                defaultVideoElement.play().catch(e => console.log(e));
                window.removeEventListener('click', initialInteractionTrigger);
                window.removeEventListener('scroll', initialInteractionTrigger);
            };
            window.addEventListener('click', initialInteractionTrigger);
            window.addEventListener('scroll', initialInteractionTrigger);
        });
    }
});

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
