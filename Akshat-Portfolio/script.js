/* ============================================================
   AKSHAT SHARMA PORTFOLIO - SCRIPT.JS
   ============================================================ */

/* ============================================================
   REDUCED MOTION CHECK
   ============================================================ */
const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   GLOBAL ELEMENTS
   ============================================================ */
const body = document.body;
const heroNameEl = document.getElementById('heroName');
const preloader = document.getElementById('preloader');
const preloaderNumberEl = document.getElementById('preloaderNumber');
let loaderDone = false;

/* ============================================================
   HERO NAME — KINETIC LETTER BUILD
   ============================================================ */
function buildKineticName(el) {
    if (!el) return;

    const lines = ['AKSHAT', 'SHARMA'];
    el.innerHTML = '';

    lines.forEach((word, lineIndex) => {
        const line = document.createElement('span');
        line.className = 'name-line';
        line.style.display = 'block';
        line.style.whiteSpace = 'nowrap';
        line.style.textAlign = 'center';

        [...word].forEach((character, charIndex) => {
            const outer = document.createElement('span');
            outer.className = 'kchar';

            const inner = document.createElement('span');
            inner.className = 'kchar-inner';
            inner.textContent = character;

            inner.style.transitionDelay = `${(lineIndex * word.length + charIndex) * 45}ms`;

            outer.appendChild(inner);
            line.appendChild(outer);
        });

        el.appendChild(line);
    });
}

if (heroNameEl) {
    buildKineticName(heroNameEl);
}

/* ============================================================
   PRELOADER → HERO REVEAL
   ============================================================ */
function revealHeroAndNav() {
    body.classList.remove('preloader-active');
    body.classList.add('preloader-complete');

    document.querySelectorAll('.hero .reveal').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 120 + index * 150);
    });

    if (heroNameEl) {
        setTimeout(() => {
            heroNameEl.classList.add('kinetic-active');
        }, 220);
    }
}

/* ============================================================
   FINISH PRELOADER
   ============================================================ */
function finishPreloader() {
    if (loaderDone) return;
    loaderDone = true;

    if (!preloader) {
        revealHeroAndNav();
        return;
    }

    preloader.classList.add('preloader-complete');

    setTimeout(() => {
        preloader.classList.add('preloader-exit');
        revealHeroAndNav();
    }, 280);

    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
    }, 1250);
}

/* ============================================================
   RUN PRELOADER (0 → 100)
   ============================================================ */
function runPreloader() {
    if (!preloader || !preloaderNumberEl) {
        revealHeroAndNav();
        return;
    }

    if (prefersReducedMotion) {
        preloaderNumberEl.textContent = '100';
        finishPreloader();
        return;
    }

    body.classList.add('preloader-active');

    const duration = 3200;
    const startTime = performance.now();
    let skipRequested = false;
    let displayed = -1;

    function tick(now) {
        const effectiveDuration = skipRequested ? 450 : duration;
        const elapsed = now - startTime;
        const t = Math.min(elapsed / effectiveDuration, 1);

        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.floor(eased * 100);

        if (value !== displayed) {
            displayed = value;
            preloaderNumberEl.textContent = value;
        }

        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            preloaderNumberEl.textContent = '100';
            setTimeout(finishPreloader, 220);
        }
    }

    requestAnimationFrame(tick);

    const skip = () => {
        if (loaderDone) return;
        skipRequested = true;

        preloader.removeEventListener('click', skip);
        window.removeEventListener('wheel', skip);
        window.removeEventListener('touchstart', skip);
        window.removeEventListener('keydown', keySkip);
    };

    const keySkip = (event) => {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
            skip();
        }
    };

    preloader.addEventListener('click', skip);
    window.addEventListener('wheel', skip, { passive: true, once: true });
    window.addEventListener('touchstart', skip, { passive: true, once: true });
    window.addEventListener('keydown', keySkip);
}

runPreloader();

/* ============================================================
   NAVBAR & SCROLL EFFECT
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener(
    'scroll',
    () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    },
    { passive: true }
);

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ============================================================
   GENERIC SCROLL REVEAL
   ============================================================ */
const revealObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal:not(.hero .reveal)').forEach((element) => {
    revealObs.observe(element);
});

/* ============================================================
   ABOUT — WORD BY WORD REVEAL
   ============================================================ */
document.querySelectorAll('[data-split]').forEach((paragraph) => {
    const text = paragraph.textContent.trim();
    paragraph.innerHTML = '';

    text.split(' ').forEach((word) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word;

        paragraph.appendChild(span);
        paragraph.appendChild(document.createTextNode(' '));
    });
});

const aboutWordObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('.split-word');
                words.forEach((word, index) => {
                    setTimeout(() => {
                        word.classList.add('word-visible');
                    }, index * 28);
                });
                aboutWordObs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll('[data-split]').forEach((element) => {
    aboutWordObs.observe(element);
});

/* ============================================================
   JOURNEY — TIMELINE
   ============================================================ */
const timelineProgress = document.getElementById('timelineProgress');
const timelineEl = document.querySelector('.timeline');

function updateTimelineProgress() {
    if (!timelineProgress || !timelineEl) return;

    const rect = timelineEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const total = rect.height;

    let progress = (viewportHeight * 0.85 - rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));

    timelineProgress.style.height = `${progress * 100}%`;
}

window.addEventListener('scroll', updateTimelineProgress, { passive: true });
window.addEventListener('resize', updateTimelineProgress);
updateTimelineProgress();

/* ============================================================
   FOOTER — CINEMATIC ENDING
   ============================================================ */
const footerEl = document.getElementById('contact');

if (footerEl) {
    const footerObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    footerEl.classList.add('footer-active');
                    footerObs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.25 }
    );

    footerObs.observe(footerEl);
}

/* ============================================================
   CURSOR GLOW
   ============================================================ */
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && !prefersReducedMotion && window.matchMedia('(min-width: 901px)').matches) {
    let glowActive = false;

    window.addEventListener(
        'mousemove',
        (event) => {
            cursorGlow.style.transform = `translate(${event.clientX - 190}px, ${event.clientY - 190}px)`;

            if (!glowActive) {
                cursorGlow.classList.add('active');
                glowActive = true;
            }
        },
        { passive: true }
    );

    window.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
if (!prefersReducedMotion && window.matchMedia('(min-width: 901px)').matches) {
    document.querySelectorAll('.magnetic').forEach((button) => {
        button.addEventListener('mousemove', (event) => {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0,0)';
        });
    });
}

/* ============================================================
   PROJECT DATA
   ============================================================ */
const projectDataHub = {
    'pixel-play': {
        meta: 'Competition · Cinematic Direction',
        title: 'Pixel Play Showcase',
        desc: 'A comprehensive generative AI video pipeline showcasing complete timeline synchronization. Engineered using text-to-video diffusion loops combined with synthesized spectral audio elements.',
        tags: ['Runway Gen-2', 'Higgsfield AI', 'Audio Sync'],
        videoSrc: './assets/work/pixel-play.mp4'
    },
    'pocket-fm': {
        meta: 'Campaign · Generative AI Workflow',
        title: 'Pocket FM Scale Assets',
        desc: 'Automated deep graphic workflows to scale asset requirements across high-impact Hindi UGC story universes. Boosted community asset deployment efficiency by more than 40%.',
        tags: ['Midjourney', 'Prompt Matrix', 'Asset Scaling'],
        imgSrc: 'assets/work/work2.jpg'
    },
    chernobyl: {
        meta: 'Keyart · Matte Painting',
        title: 'Chernobyl Promo Art',
        desc: 'Atmospheric promotional poster configuration managing customized fine-grain composition maps and industrial exposure fields to echo narrative weight.',
        tags: ['Photoshop', 'Matte Composite', 'Color Grading'],
        imgSrc: 'assets/work/work3.jpg'
    },
    contests: {
        meta: 'Community Engagement · Strategy',
        title: 'High-Impact Contests',
        desc: 'Designed and scaled structural promotional media vectors targeted towards global user design marathons. Managed end-to-end promotional visuals and cross-channel community operations.',
        tags: ['Creative Direction', 'AI Promos', 'Campaign Layout'],
        imgSrc: 'assets/work/work4.jpg'
    },
    'stranger-things': {
        meta: 'VFX Motion · High-Contrast',
        title: 'Stranger Things Concept',
        desc: 'Cinematic title framing study built in After Effects. Seamlessly intersections neon glow layouts with heavy analog film-grain mapping channels.',
        tags: ['After Effects', 'Premiere Pro', 'VFX Motion'],
        imgSrc: 'assets/work/work5.jpg'
    }
};

/* ============================================================
   PROJECT MODAL
   ============================================================ */
const modalOverlay = document.getElementById('premiumProjectModal');
const modalMediaAnchor = document.getElementById('modalMediaAnchor');
const modalMetaField = document.getElementById('modalMetaField');
const modalTitleField = document.getElementById('modalTitleField');
const modalDescField = document.getElementById('modalDescField');
const modalTagsField = document.getElementById('modalTagsField');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function openCinematicModal(projectId) {
    const data = projectDataHub[projectId];
    if (!data || !modalOverlay) return;

    if (modalMetaField) modalMetaField.innerHTML = data.meta;
    if (modalTitleField) modalTitleField.innerText = data.title;
    if (modalDescField) modalDescField.innerText = data.desc;

    if (modalTagsField) {
        modalTagsField.innerHTML = '';
        data.tags.forEach((tag) => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.innerText = tag;
            modalTagsField.appendChild(span);
        });
    }

    if (modalMediaAnchor) {
        if (data.videoSrc) {
            modalMediaAnchor.innerHTML = `
                <video autoplay loop controls playsinline style="width:100%; height:100%; object-fit:cover;">
                    <source src="${data.videoSrc}" type="video/mp4">
                </video>
            `;
        } else {
            modalMediaAnchor.innerHTML = `
                <img src="${data.imgSrc}" style="width:100%; height:100%; object-fit:cover;" alt="Showcase">
            `;
        }
    }

    modalOverlay.classList.add('modal-visible');
}

function closeCinematicModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('modal-visible');
    if (modalMediaAnchor) modalMediaAnchor.innerHTML = '';
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCinematicModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeCinematicModal();
        }
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('modal-visible')) {
        closeCinematicModal();
    }
});

/* ============================================================
   FEATURED WORK ACCORDION & SLIDESHOWS
   ============================================================ */
const workSection = document.getElementById('work');
const accordionStage = document.getElementById('accordionStage');
const workCards = document.querySelectorAll('.work-card');
const indicatorProgress = document.getElementById('workIndicatorProgress');

if (workSection) {
    const workSectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting || document.readyState === 'complete') {
                    workSection.querySelectorAll('.animate-init').forEach((element) => {
                        element.classList.add('animate-active');
                    });
                    workSectionObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05 }
    );

    workSectionObserver.observe(workSection);

    setTimeout(() => {
        workSection.querySelectorAll('.animate-init').forEach((element) => {
            element.classList.add('animate-active');
        });
    }, 800);
}

function updateProgressIndicator(activeIndex) {
    if (!indicatorProgress || window.innerWidth <= 768 || workCards.length === 0) return;

    const totalCards = workCards.length;
    const segmentWidth = 100 / totalCards;

    indicatorProgress.style.width = `${segmentWidth}%`;
    indicatorProgress.style.transform = `translateX(${activeIndex * 100}%)`;
}

updateProgressIndicator(0);

let activeSlideshowIntervals = [];

function initializeCardSlideshowSequence(card) {
    if (!card) return;
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
            slides[activeSlideIndex].play().catch(() => {});
        }
    }, 2800);

    activeSlideshowIntervals.push({
        card: card,
        interval: intervalId
    });
}

function terminateCardSlideshowSequence(card) {
    activeSlideshowIntervals = activeSlideshowIntervals.filter((item) => {
        if (item.card === card) {
            clearInterval(item.interval);

            const slides = card.querySelectorAll('.card-bg-img');
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active-slide');
                    if (slide.tagName === 'VIDEO') {
                        slide.play().catch(() => {});
                    }
                } else {
                    slide.classList.remove('active-slide');
                    if (slide.tagName === 'VIDEO') {
                        slide.pause();
                    }
                }
            });
            return false;
        }
        return true;
    });
}

if (workCards[0]) {
    initializeCardSlideshowSequence(workCards[0]);
}

workCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return;

        workCards.forEach((otherCard) => {
            otherCard.classList.remove('active');
            terminateCardSlideshowSequence(otherCard);

            const fallbackVideo = otherCard.querySelector('video');
            if (fallbackVideo) {
                fallbackVideo.pause();
            }
        });

        card.classList.add('active');
        updateProgressIndicator(index);
        initializeCardSlideshowSequence(card);

        const activeVideo = card.querySelector('.active-slide');
        if (activeVideo && activeVideo.tagName === 'VIDEO') {
            activeVideo.muted = true;
            activeVideo.play().catch(() => {});
        }
    });

    card.addEventListener('click', () => {
        if (window.innerWidth > 768 && !card.classList.contains('active')) {
            return;
        }
        const projectId = card.getAttribute('data-project');
        openCinematicModal(projectId);
    });
});

/* ============================================================
   HARDWARE ACCELERATED PARALLAX FOR WORK CARDS
   ============================================================ */
let targetMouseX = 0;
let targetMouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
const interpolationFactor = 0.08;

window.addEventListener(
    'mousemove',
    (event) => {
        targetMouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetMouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    },
    { passive: true }
);

function processParallaxLoop() {
    currentMouseX += (targetMouseX - currentMouseX) * interpolationFactor;
    currentMouseY += (targetMouseY - currentMouseY) * interpolationFactor;

    const pxOffsetValueX = currentMouseX * 28;
    const pxOffsetValueY = currentMouseY * 28;

    const activeMediaElement = document.querySelector(
        '.work-card.active .card-bg-wrap .active-slide'
    );

    if (activeMediaElement && window.innerWidth > 768) {
        activeMediaElement.style.setProperty('--move-x', `${pxOffsetValueX}px`);
        activeMediaElement.style.setProperty('--move-y', `${pxOffsetValueY}px`);
    }

    requestAnimationFrame(processParallaxLoop);
}

requestAnimationFrame(processParallaxLoop);

/* ============================================================
   VIDEO AUTOPLAY RECOVERY
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
    const defaultVideoElement = document.getElementById('showcaseVideo');
    if (!defaultVideoElement) return;

    defaultVideoElement.muted = true;
    defaultVideoElement.play().catch(() => {
        const initialInteractionTrigger = () => {
            defaultVideoElement.play().catch(() => {});
            window.removeEventListener('click', initialInteractionTrigger);
            window.removeEventListener('scroll', initialInteractionTrigger);
        };

        window.addEventListener('click', initialInteractionTrigger);
        window.addEventListener('scroll', initialInteractionTrigger);
    });
});

/* ============================================================
   MOBILE TOUCH / SWIPE TRACKING
   ============================================================ */
if (accordionStage) {
    accordionStage.addEventListener(
        'scroll',
        () => {
            if (window.innerWidth > 768) return;

            const stageWidth = accordionStage.offsetWidth;
            const currentScrollPosition = accordionStage.scrollLeft;
            const estimatedIndex = Math.round(currentScrollPosition / (stageWidth * 0.85));

            if (workCards[estimatedIndex] && !workCards[estimatedIndex].classList.contains('active')) {
                workCards.forEach((card) => card.classList.remove('active'));
                workCards[estimatedIndex].classList.add('active');
            }
        },
        { passive: true }
    );
}

/* ============================================================
   GSAP SCROLLTRIGGER ENHANCEMENTS
   ============================================================ */
if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.about-meta, .skills-grid').forEach((element) => {
        gsap.fromTo(
            element,
            { y: 24 },
            {
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 0.6
                }
            }
        );
    });
}

/* ============================================================
   FINAL SAFETY LOAD CHECK
   ============================================================ */
if (document.readyState === 'complete') {
    setTimeout(() => {
        if (heroNameEl && !heroNameEl.classList.contains('kinetic-active')) {
            heroNameEl.classList.add('kinetic-active');
        }
    }, 100);
}
