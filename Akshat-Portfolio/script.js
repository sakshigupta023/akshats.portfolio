/* ============================================================
   REDUCED MOTION CHECK
   ============================================================ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   CINEMATIC INTRO SEQUENCE
   ============================================================ */
const introOverlay = document.getElementById('introOverlay');
const body = document.body;
let introFinished = false;

function finishIntro() {
    if (introFinished) return;
    introFinished = true;

    introOverlay.classList.add('stage-exit');
    body.classList.remove('intro-active');
    body.classList.add('intro-complete');

    // Reveal hero content in a staged cinematic sequence
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 150 + i * 130);
    });

    setTimeout(() => {
        introOverlay.classList.add('intro-hidden');
    }, 950);
}

function runIntro() {
    if (prefersReducedMotion) {
        // Skip the cinematic build-up entirely, still show identity briefly.
        introOverlay.classList.add('stage-text', 'stage-glow');
        setTimeout(finishIntro, 400);
        return;
    }

    body.classList.add('intro-active');

    requestAnimationFrame(() => {
        setTimeout(() => introOverlay.classList.add('stage-text'), 200);
        setTimeout(() => introOverlay.classList.add('stage-glow'), 900);
    });

    // Auto-advance if the person doesn't interact
    const autoAdvance = setTimeout(finishIntro, 4200);

    const skip = () => {
        clearTimeout(autoAdvance);
        finishIntro();
        introOverlay.removeEventListener('click', skip);
        window.removeEventListener('wheel', skip);
        window.removeEventListener('touchstart', skip);
        window.removeEventListener('keydown', keySkip);
    };
    const keySkip = (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') skip();
    };

    introOverlay.addEventListener('click', skip);
    window.addEventListener('wheel', skip, { passive: true, once: true });
    window.addEventListener('touchstart', skip, { passive: true, once: true });
    window.addEventListener('keydown', keySkip);
}

runIntro();

/* ============================================================
   NAVBAR & SCROLL EFFECT
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ============================================================
   GENERIC SCROLL REVEAL (non-hero .reveal elements)
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => revealObs.observe(el));

/* ============================================================
   ABOUT SECTION — WORD-BY-WORD REVEAL
   ============================================================ */
document.querySelectorAll('[data-split]').forEach(p => {
    const text = p.textContent.trim();
    p.innerHTML = '';
    text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word;
        p.appendChild(span);
        p.appendChild(document.createTextNode(' '));
    });
});

const aboutWordObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll('.split-word');
            words.forEach((w, i) => {
                setTimeout(() => w.classList.add('word-visible'), i * 28);
            });
            aboutWordObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('[data-split]').forEach(el => aboutWordObs.observe(el));

/* ============================================================
   JOURNEY — TIMELINE LINE GROWTH ON SCROLL
   ============================================================ */
const timelineProgress = document.getElementById('timelineProgress');
const timelineEl = document.querySelector('.timeline');

function updateTimelineProgress() {
    if (!timelineProgress || !timelineEl) return;
    const rect = timelineEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const visibleStart = vh * 0.85;
    const visibleEnd = vh * 0.25;
    let progress = (visibleStart - rect.top) / (rect.top + total - visibleEnd - (visibleStart - visibleEnd) + total);
    progress = (visibleStart - rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));
    timelineProgress.style.height = (progress * 100) + '%';
}
window.addEventListener('scroll', updateTimelineProgress, { passive: true });
window.addEventListener('resize', updateTimelineProgress);
updateTimelineProgress();

/* ============================================================
   FOOTER — CINEMATIC ENDING SEQUENCE
   ============================================================ */
const footerEl = document.getElementById('contact');
if (footerEl) {
    const footerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footerEl.classList.add('footer-active');
                footerObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    footerObs.observe(footerEl);
}

/* ============================================================
   CURSOR GLOW (desktop only, subtle)
   ============================================================ */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(min-width: 901px)').matches && !prefersReducedMotion) {
    let glowActive = false;
    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.transform = `translate(${e.clientX - 190}px, ${e.clientY - 190}px)`;
        if (!glowActive) {
            cursorGlow.classList.add('active');
            glowActive = true;
        }
    }, { passive: true });
    window.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
if (!prefersReducedMotion && window.matchMedia('(min-width: 901px)').matches) {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0,0)';
        });
    });
}

/* ============================================================
   CASE STUDY MODAL STRUCTURAL MAPPINGS
   ============================================================ */
const projectDataHub = {
    'pixel-play': {
        meta: "Competition · Cinematic Direction",
        title: "Pixel Play Showcase",
        desc: "A comprehensive generative AI video pipeline showcasing complete timeline synchronization. Engineered using text-to-video diffusion loops combined with synthesized spectral audio elements.",
        tags: ["Runway Gen-2", "Higgsfield AI", "Audio Sync"],
        videoSrc: "./assets/work/pixel-play.mp4"
    },
    'pocket-fm': {
        meta: "Campaign · Generative AI Workflow",
        title: "Pocket FM Scale Assets",
        desc: "Automated deep graphic workflows to scale asset requirements across high-impact Hindi UGC story universes. Boosted community asset deployment efficiency by more than 40%.",
        tags: ["Midjourney", "Prompt Matrix", "Asset Scaling"],
        imgSrc: "assets/work/work2.jpg"
    },
    'chernobyl': {
        meta: "Keyart · Matte Painting",
        title: "Chernobyl Promo Art",
        desc: "Atmospheric promotional poster configuration managing customized fine-grain composition maps and industrial exposure fields to echo narrative weight.",
        tags: ["Photoshop", "Matte Composite", "Color Grading"],
        imgSrc: "assets/work/work3.jpg"
    },
    'contests': {
        meta: "Community Engagement · Strategy",
        title: "High-Impact Contests",
        desc: "Designed and scaled structural promotional media vectors targeted towards global user design marathons. Managed end-to-end promotional visuals and cross-channel community operations.",
        tags: ["Creative Direction", "AI Promos", "Campaign Layout"],
        imgSrc: "assets/work/work4.jpg"
    },
    'stranger-things': {
        meta: "VFX Motion · High-Contrast",
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

function closeCinematicModal() {
    modalOverlay.classList.remove('modal-visible');
    modalMediaAnchor.innerHTML = '';
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCinematicModal);
}
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCinematicModal();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('modal-visible')) closeCinematicModal();
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

if (workCards[0]) initializeCardSlideshowSequence(workCards[0]);

/**
 * Desktop Accordion Hover Channels & Whole-Card Click Interceptions
 */
workCards.forEach((card, index) => {
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

    card.addEventListener('click', () => {
        if (window.innerWidth > 768 && !card.classList.contains('active')) return;

        const projectId = card.getAttribute('data-project');
        openCinematicModal(projectId);
    });
});

/**
 * Hardware Accelerated Parallax Animation Engine Loops
 */
let targetMouseX = 0, targetMouseY = 0, currentMouseX = 0, currentMouseY = 0;
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

    // Subtle hero image parallax
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg && window.innerWidth > 1024) {
        heroImg.style.transform = `translate(${currentMouseX * 12}px, ${currentMouseY * 12}px)`;
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

/* ============================================================
   GSAP SCROLLTRIGGER ENHANCEMENTS (progressive enhancement)
   ============================================================ */
if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Subtle parallax drift on journey and skills eyebrows for continuity
    gsap.utils.toArray('.about-meta, .skills-grid').forEach(el => {
        gsap.fromTo(el, { y: 24 }, {
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top center', scrub: 0.6 }
        });
    });
}
