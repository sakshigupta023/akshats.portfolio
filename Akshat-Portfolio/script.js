/* ============================================================
   NAVBAR & SCROLL EFFECT
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 110);
    });
});

/* ============================================================
   CASE STUDY MODAL STRUCTURAL MAPPINGS (OPTION B)
============================================================ */
const projectDataHub = {
    'pixel-play': {
        meta: "Competition &middot; Cinematic Direction",
        title: "Pixel Play Showcase",
        desc: "A comprehensive generative AI video pipeline showcasing complete timeline synchronization. Engineered using text-to-video diffusion loops combined with synthesized spectral audio elements.",
        tags: ["Runway Gen-2", "Higgsfield AI", "Audio Sync"],
        videoSrc: "./assets/work/pixel-play.mp4"
    },
    'pocket-fm': {
        meta: "Campaign &middot; Generative AI Workflow",
        title: "Pocket FM Scale Assets",
        desc: "Automated deep graphic workflows to scale asset requirements across high-impact Hindi UGC story universes. Boosted community asset deployment efficiency by more than 40%.",
        tags: ["Midjourney", "Prompt Matrix", "Asset Scaling"],
        imgSrc: "assets/work/work2.jpg"
    },
    'chernobyl': {
        meta: "Keyart &middot; Matte Painting",
        title: "Chernobyl Promo Art",
        desc: "Atmospheric promotional poster configuration managing customized fine-grain composition maps and industrial exposure fields to echo narrative weight.",
        tags: ["Photoshop", "Matte Composite", "Color Grading"],
        imgSrc: "assets/work/work3.jpg"
    },
    'contests': {
        meta: "Community Engagement &middot; Strategy",
        title: "High-Impact Contests",
        desc: "Designed and scaled structural promotional media vectors targeted towards global user design marathons. Managed end-to-end promotional visuals and cross-channel community operations.",
        tags: ["Creative Direction", "AI Promos", "Campaign Layout"],
        imgSrc: "assets/work/work4.jpg"
    },
    'stranger-things': {
        meta: "VFX Motion &middot; High-Contrast",
        title: "Stranger Things Concept",
        desc: "Cinematic title framing study built in After Effects. Seamlessly intersections neon glow layouts with heavy analog film-grain mapping channels.",
        tags: ["After Effects", "Premiere Pro", "VFX Motion"],
        imgSrc: "assets/work/work5.jpg"
    }
};

const modalOverlay = document.getElementById('premiumProjectModal');
const modalMediaAnchor = document.getElementById('modalMediaAnchor');
const modalMetaField = document.getElementById('modalMetaField');
const modalTitleField = document.getElementById('modalTitleField');
const modalDescField = document.getElementById('modalDescField');
const modalTagsField = document.getElementById('modalTagsField');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function openCinematicModal(projectId) {
    const data = projectDataHub[projectId];
    if (!data) return;

    modalMetaField.innerHTML = data.meta;
    modalTitleField.innerText = data.title;
    modalDescField.innerText = data.desc;
    
    modalTagsField.innerHTML = '';
    data.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.innerText = t;
        modalTagsField.appendChild(span);
    });

    if (data.videoSrc) {
        modalMediaAnchor.innerHTML = `<video autoplay loop controls playsinline style="width:100%; height:100%; object-fit:cover;"><source src="${data.videoSrc}" type="video/mp4"></video>`;
    } else {
        modalMediaAnchor.innerHTML = `<img src="${data.imgSrc}" style="width:100%; height:100%; object-fit:cover;" alt="Showcase">`;
    }

    modalOverlay.classList.add('modal-visible');
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('modal-visible');
        modalMediaAnchor.innerHTML = ''; 
    });
}
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('modal-visible');
        modalMediaAnchor.innerHTML = '';
    }
});

/* ============================================================
   PREMIUM FEATURED WORK DESIGN INTERACTIVES & MULTI-SLIDESHOW
============================================================ */
const workSection = document.getElementById('work');
const accordionStage = document.getElementById('accordionStage');
const workCards = document.querySelectorAll('.work-card');
const indicatorProgress = document.getElementById('workIndicatorProgress');

const workSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting || document.readyState === 'complete') {
            workSection.querySelectorAll('.animate-init').forEach(el => {
                el.classList.add('animate-active');
            });
            workSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

if (workSection) {
    workSectionObserver.observe(workSection);
    setTimeout(() => {
        workSection.querySelectorAll('.animate-init').forEach(el => {
            el.classList.add('animate-active');
        });
    }, 800);
}

function updateProgressIndicator(activeIndex) {
    if (!indicatorProgress || window.innerWidth <= 768) return;
    const totalCards = workCards.length;
    const segmentsWidth = 100 / totalCards;
    indicatorProgress.style.width = `${segmentsWidth}%`;
    indicatorProgress.style.transform = `translateX(${activeIndex * 100}%)`;
}
updateProgressIndicator(0);

// Sequential Multi-Slide Loop Framework Initialization
let activeSlideshowIntervals = [];

function initializeCardSlideshowSequence(card) {
    const wrap = card.querySelector('.dynamic-slideshow');
    if (!wrap) return;
    
    const slides = wrap.querySelectorAll('.card-bg-img');
    if (slides.length <= 1) return;
    
    let activeSlideIndex = 0;
    
    const intervalId = setInterval(() => {
        slides[activeSlideIndex].classList.remove('active-slide');
        
        if (slides[activeSlideIndex].tagName === 'VIDEO') {
            slides[activeSlideIndex].pause();
        }
        
        activeSlideIndex = (activeSlideIndex + 1) % slides.length;
        slides[activeSlideIndex].classList.add('active-slide');
        
        if (slides[activeSlideIndex].tagName === 'VIDEO') {
            slides[activeSlideIndex].muted = true;
            slides[activeSlideIndex].play().catch(e => console.log(e));
        }
    }, 2800); 
    
    activeSlideshowIntervals.push({ card: card, interval: intervalId });
}

function terminateCardSlideshowSequence(card) {
    activeSlideshowIntervals = activeSlideshowIntervals.filter(item => {
        if (item.card === card) {
            clearInterval(item.interval);
            
            const slides = card.querySelectorAll('.card-bg-img');
            slides.forEach((s, idx) => {
                if (idx === 0) {
                    s.classList.add('active-slide');
                    if (s.tagName === 'VIDEO') s.play().catch(e => console.log(e));
                } else {
                    s.classList.remove('active-slide');
                    if (s.tagName === 'VIDEO') s.pause();
                }
            });
            return false;
        }
        return true;
    });
}

if(workCards[0]) initializeCardSlideshowSequence(workCards[0]);

/**
 * Desktop Accordion Hover Channels & Whole-Card Click Interceptions
 */
workCards.forEach((card, index) => {
    // Hover event tracking for fluid desktop layout shifts
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return; 
        
        workCards.forEach(c => {
            c.classList.remove('active');
            terminateCardSlideshowSequence(c);
            const fallbackVid = c.querySelector('video');
            if (fallbackVid) fallbackVid.pause();
        });

        card.classList.add('active');
        updateProgressIndicator(index);
        initializeCardSlideshowSequence(card);

        const activeVideo = card.querySelector('.active-slide');
        if (activeVideo && activeVideo.tagName === 'VIDEO') {
            activeVideo.muted = true;
            activeVideo.play().catch(err => console.log("Autoplay blocked on hover:", err));
        }
    });

    // Whole-Card Click Handler: Trigger modal window popup natively on click or touch tap vectors
    card.addEventListener('click', () => {
        // Desktop verification rule: click only activates if the card is already expanded/active
        if (window.innerWidth > 768 && !card.classList.contains('active')) return;
        
        const projectId = card.getAttribute('data-project');
        openCinematicModal(projectId);
    });
});

/**
 * Hardware Accelerated Parallax Animation Engine Loops
 */
let targetMouseX = 0; let targetMouseY = 0; let currentMouseX = 0; let currentMouseY = 0;
const interpolationFactor = 0.08; 

window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
}, { passive: true });

function processParallaxLoop() {
    currentMouseX += (targetMouseX - currentMouseX) * interpolationFactor;
    currentMouseY += (targetMouseY - currentMouseY) * interpolationFactor;

    const pxOffsetValueX = currentMouseX * 28;
    const pxOffsetValueY = currentMouseY * 28;

    const activeMediaElement = document.querySelector('.work-card.active .card-bg-wrap .active-slide');
    if (activeMediaElement && window.innerWidth > 768) {
        activeMediaElement.style.setProperty('--move-x', `${pxOffsetValueX}px`);
        activeMediaElement.style.setProperty('--move-y', `${pxOffsetValueY}px`);
    }

    requestAnimationFrame(processParallaxLoop);
}
requestAnimationFrame(processParallaxLoop);

/**
 * Universal Autoplay Recovery Anchor
 */
window.addEventListener('DOMContentLoaded', () => {
    const defaultVideoElement = document.getElementById('showcaseVideo');
    if (defaultVideoElement) {
        defaultVideoElement.muted = true;
        defaultVideoElement.play().catch(err => {
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
        const estimatedIndex = Math.round(currentScrollPosition / (stageWidth * 0.85));
        
        if (workCards[estimatedIndex] && !workCards[estimatedIndex].classList.contains('active')) {
            workCards.forEach(c => c.classList.remove('active'));
            workCards[estimatedIndex].classList.add('active');
        }
    }, { passive: true });
}
