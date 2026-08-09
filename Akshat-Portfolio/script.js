/* =========================
   AKSHAT PORTFOLIO — SCRIPT
   ========================= */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const preloader = document.getElementById('preloader');
const preloaderNumberEl = document.getElementById('preloaderNumber');
const heroNameEl = document.getElementById('heroName');
const navbar = document.getElementById('navbar');

let loaderDone = false;


/* ---------- KINETIC HERO NAME ---------- */

function buildKineticName(el) {
    if (!el || el.dataset.built === 'true') return;

    const lines = el.innerHTML.split(/<br\s*\/?\s*>/i);
    el.innerHTML = '';

    lines.forEach((line, lineIndex) => {

        if (lineIndex) {
            el.appendChild(document.createElement('br'));
        }

        [...line].forEach((char, i) => {

            const outer = document.createElement('span');
            outer.className = 'kchar';

            const inner = document.createElement('span');
            inner.className = 'kchar-inner';

            inner.textContent = char === ' ' ? '\u00A0' : char;

            inner.style.transitionDelay =
                `${(i + lineIndex * 12) * 35}ms`;

            outer.appendChild(inner);
            el.appendChild(outer);
        });
    });

    el.dataset.built = 'true';
}

buildKineticName(heroNameEl);


/* ---------- HERO + NAV REVEAL ---------- */

function revealHeroAndNav() {

    body.classList.remove('preloader-active');
    body.classList.add('preloader-complete');

    document
        .querySelectorAll('.hero .reveal')
        .forEach((el, i) => {

            setTimeout(() => {
                el.classList.add('visible');
            }, 120 + i * 150);

        });

    if (heroNameEl) {

        setTimeout(() => {
            heroNameEl.classList.add('kinetic-active');
        }, 220);

    }
}


/* ---------- PRELOADER FINISH ---------- */

function finishPreloader() {

    if (loaderDone || !preloader) return;

    loaderDone = true;

    if (preloaderNumberEl) {
        preloaderNumberEl.textContent = '100';
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


/* ---------- NUMBER PRELOADER 0 → 100 ---------- */

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

    let displayed = -1;

    let skipRequested = false;


    function tick(now) {

        const elapsed = now - startTime;

        const effectiveDuration =
            skipRequested ? 450 : duration;

        const t =
            Math.min(elapsed / effectiveDuration, 1);

        const eased =
            1 - Math.pow(1 - t, 3);

        const value =
            Math.min(100, Math.floor(eased * 100));


        if (value !== displayed) {

            displayed = value;

            preloaderNumberEl.textContent = value;

        }


        if (t < 1) {

            requestAnimationFrame(tick);

        } else {

            setTimeout(finishPreloader, 220);

        }

    }

    requestAnimationFrame(tick);


    /* click / scroll speeds up loader */

    const skip = () => {

        if (loaderDone) return;

        skipRequested = true;

        preloader.removeEventListener('click', skip);

        window.removeEventListener('wheel', skip);

        window.removeEventListener('touchstart', skip);

        window.removeEventListener('keydown', keySkip);

    };


    const keySkip = (e) => {

        if (
            e.key === 'Enter' ||
            e.key === ' ' ||
            e.key === 'Escape'
        ) {

            skip();

        }

    };


    preloader.addEventListener('click', skip);

    window.addEventListener(
        'wheel',
        skip,
        { passive: true, once: true }
    );

    window.addEventListener(
        'touchstart',
        skip,
        { passive: true, once: true }
    );

    window.addEventListener(
        'keydown',
        keySkip
    );
}

runPreloader();


/* ---------- NAVBAR ---------- */

if (navbar) {

    window.addEventListener(
        'scroll',
        () => {

            navbar.classList.toggle(
                'scrolled',
                window.scrollY > 40
            );

        },
        { passive: true }
    );

}


/* ---------- MOBILE MENU ---------- */

const menuToggle =
    document.getElementById('menuToggle');

const mobileMenu =
    document.getElementById('mobileMenu');


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        'click',
        () => {

            const open =
                mobileMenu.classList.toggle('open');

            menuToggle.classList.toggle(
                'open',
                open
            );

            menuToggle.setAttribute(
                'aria-expanded',
                String(open)
            );

        }
    );


    mobileMenu
        .querySelectorAll('a')
        .forEach(link => {

            link.addEventListener(
                'click',
                () => {

                    mobileMenu.classList.remove('open');

                    menuToggle.classList.remove('open');

                    menuToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }
            );

        });

}


/* ---------- GENERAL SCROLL REVEALS ---------- */

if ('IntersectionObserver' in window) {

    const revealObs =
        new IntersectionObserver(
            entries => {

                entries.forEach((entry, i) => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            entry.target.classList.add(
                                'visible'
                            );

                        }, i * 80);

                        revealObs.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    document
        .querySelectorAll(
            '.reveal:not(.hero .reveal)'
        )
        .forEach(el => {

            revealObs.observe(el);

        });

}


/* ---------- ABOUT WORD REVEAL ---------- */

document
    .querySelectorAll('[data-split]')
    .forEach(p => {

        const text =
            p.textContent.trim();

        p.innerHTML = '';

        text
            .split(/\s+/)
            .forEach(word => {

                const span =
                    document.createElement('span');

                span.className =
                    'split-word';

                span.textContent =
                    word;

                p.appendChild(span);

                p.appendChild(
                    document.createTextNode(' ')
                );

            });

    });


if ('IntersectionObserver' in window) {

    const aboutWordObs =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    entry.target
                        .querySelectorAll('.split-word')
                        .forEach((word, i) => {

                            setTimeout(() => {

                                word.classList.add(
                                    'word-visible'
                                );

                            }, i * 28);

                        });

                    aboutWordObs.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.3
            }
        );


    document
        .querySelectorAll('[data-split]')
        .forEach(el => {

            aboutWordObs.observe(el);

        });

}


/* ---------- JOURNEY TIMELINE ---------- */

const timelineProgress =
    document.getElementById(
        'timelineProgress'
    );

const timelineEl =
    document.querySelector(
        '.timeline'
    );


function updateTimelineProgress() {

    if (
        !timelineProgress ||
        !timelineEl
    ) return;


    const rect =
        timelineEl.getBoundingClientRect();


    const progress =
        Math.max(
            0,
            Math.min(
                1,
                (
                    window.innerHeight * 0.85 -
                    rect.top
                ) / rect.height
            )
        );


    timelineProgress.style.height =
        `${progress * 100}%`;

}


window.addEventListener(
    'scroll',
    updateTimelineProgress,
    { passive: true }
);

window.addEventListener(
    'resize',
    updateTimelineProgress
);

updateTimelineProgress();


/* ---------- CINEMATIC FOOTER ---------- */

const footerEl =
    document.getElementById('contact');


if (
    footerEl &&
    'IntersectionObserver' in window
) {

    const footerObs =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting
                ) {

                    footerEl.classList.add(
                        'footer-active'
                    );

                    footerObs.unobserve(
                        footerEl
                    );

                }

            },
            {
                threshold: 0.25
            }
        );


    footerObs.observe(footerEl);

}


/* ---------- CURSOR GLOW ---------- */

const cursorGlow =
    document.getElementById(
        'cursorGlow'
    );


if (
    cursorGlow &&
    window.matchMedia(
        '(min-width: 901px)'
    ).matches &&
    !prefersReducedMotion
) {

    let active = false;


    window.addEventListener(
        'mousemove',
        e => {

            cursorGlow.style.transform =
                `translate(
                    ${e.clientX - 190}px,
                    ${e.clientY - 190}px
                )`;


            if (!active) {

                cursorGlow.classList.add(
                    'active'
                );

                active = true;

            }

        },
        { passive: true }
    );


    window.addEventListener(
        'mouseleave',
        () => {

            cursorGlow.classList.remove(
                'active'
            );

        }
    );

}


/* ---------- MAGNETIC BUTTONS ---------- */

if (
    !prefersReducedMotion &&
    window.matchMedia(
        '(min-width: 901px)'
    ).matches
) {

    document
        .querySelectorAll('.magnetic')
        .forEach(btn => {

            btn.addEventListener(
                'mousemove',
                e => {

                    const r =
                        btn.getBoundingClientRect();

                    const x =
                        e.clientX -
                        r.left -
                        r.width / 2;

                    const y =
                        e.clientY -
                        r.top -
                        r.height / 2;


                    btn.style.transform =
                        `translate(
                            ${x * 0.18}px,
                            ${y * 0.35}px
                        )`;

                }
            );


            btn.addEventListener(
                'mouseleave',
                () => {

                    btn.style.transform =
                        'translate(0,0)';

                }
            );

        });

}


/* =========================================================
   PROJECT DATA
   ========================================================= */

const projectDataHub = {

    'pixel-play': {

        meta:
            'Competition · Cinematic Direction',

        title:
            'Pixel Play Showcase',

        desc:
            'A comprehensive generative AI video pipeline showcasing complete timeline synchronization. Engineered using text-to-video diffusion loops combined with synthesized spectral audio elements.',

        tags:
            [
                'Runway Gen-2',
                'Higgsfield AI',
                'Audio Sync'
            ],

        videoSrc:
            './assets/work/pixel-play.mp4'
    },


    'pocket-fm': {

        meta:
            'Campaign · Generative AI Workflow',

        title:
            'Pocket FM Scale Assets',

        desc:
            'Automated deep graphic workflows to scale asset requirements across high-impact Hindi UGC story universes. Boosted community asset deployment efficiency by more than 40%.',

        tags:
            [
                'Midjourney',
                'Prompt Matrix',
                'Asset Scaling'
            ],

        imgSrc:
            'assets/work/work2.jpg'
    },


    'chernobyl': {

        meta:
            'Keyart · Matte Painting',

        title:
            'Chernobyl Promo Art',

        desc:
            'Atmospheric promotional poster configuration managing customized fine-grain composition maps and industrial exposure fields to echo narrative weight.',

        tags:
            [
                'Photoshop',
                'Matte Composite',
                'Color Grading'
            ],

        imgSrc:
            'assets/work/work3.jpg'
    },


    'contests': {

        meta:
            'Community Engagement · Strategy',

        title:
            'High-Impact Contests',

        desc:
            'Designed and scaled structural promotional media vectors targeted towards global user design marathons. Managed end-to-end promotional visuals and cross-channel community operations.',

        tags:
            [
                'Creative Direction',
                'AI Promos',
                'Campaign Layout'
            ],

        imgSrc:
            'assets/work/work4.jpg'
    },


    'stranger-things': {

        meta:
            'VFX Motion · High-Contrast',

        title:
            'Stranger Things Concept',

        desc:
            'Cinematic title framing study built in After Effects. Seamlessly intersections neon glow layouts with heavy analog film-grain mapping channels.',

        tags:
            [
                'After Effects',
                'Premiere Pro',
                'VFX Motion'
            ],

        imgSrc:
            'assets/work/work5.jpg'
    }

};


/* =========================================================
   PROJECT MODAL
   ========================================================= */

const modalOverlay =
    document.getElementById(
        'premiumProjectModal'
    );

const modalMediaAnchor =
    document.getElementById(
        'modalMediaAnchor'
    );

const modalMetaField =
    document.getElementById(
        'modalMetaField'
    );

const modalTitleField =
    document.getElementById(
        'modalTitleField'
    );

const modalDescField =
    document.getElementById(
        'modalDescField'
    );

const modalTagsField =
    document.getElementById(
        'modalTagsField'
    );

const modalCloseBtn =
    document.getElementById(
        'modalCloseBtn'
    );


function openCinematicModal(projectId) {

    const data =
        projectDataHub[projectId];

    if (
        !data ||
        !modalOverlay
    ) return;


    if (modalMetaField) {

        modalMetaField.textContent =
            data.meta;

    }


    if (modalTitleField) {

        modalTitleField.textContent =
            data.title;

    }


    if (modalDescField) {

        modalDescField.textContent =
            data.desc;

    }


    if (modalTagsField) {

        modalTagsField.innerHTML = '';


        data.tags.forEach(tag => {

            const span =
                document.createElement(
                    'span'
                );

            span.className =
                'tag';

            span.textContent =
                tag;

            modalTagsField.appendChild(
                span
            );

        });

    }


    if (modalMediaAnchor) {

        if (data.videoSrc) {

            modalMediaAnchor.innerHTML =
                `<video
                    autoplay
                    loop
                    controls
                    playsinline
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover
                    "
                >
                    <source
                        src="${data.videoSrc}"
                        type="video/mp4"
                    >
                </video>`;

        } else {

            modalMediaAnchor.innerHTML =
                `<img
                    src="${data.imgSrc}"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover
                    "
                    alt="${data.title}"
                >`;

        }

    }


    modalOverlay.classList.add(
        'modal-visible'
    );

}


function closeCinematicModal() {

    if (!modalOverlay) return;

    modalOverlay.classList.remove(
        'modal-visible'
    );

    if (modalMediaAnchor) {

        modalMediaAnchor.innerHTML =
            '';

    }

}


if (modalCloseBtn) {

    modalCloseBtn.addEventListener(
        'click',
        closeCinematicModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        'click',
        e => {

            if (
                e.target === modalOverlay
            ) {

                closeCinematicModal();

            }

        }
    );

}


window.addEventListener(
    'keydown',
    e => {

        if (
            e.key === 'Escape' &&
            modalOverlay?.classList.contains(
                'modal-visible'
            )
        ) {

            closeCinematicModal();

        }

    }
);


/* =========================================================
   FEATURED WORK
   ACCORDION + SLIDESHOW
   ========================================================= */

const workSection =
    document.getElementById(
        'work'
    );

const accordionStage =
    document.getElementById(
        'accordionStage'
    );

const workCards =
    [
        ...document.querySelectorAll(
            '.work-card'
        )
    ];

const indicatorProgress =
    document.getElementById(
        'workIndicatorProgress'
    );

let activeSlideshowIntervals = [];


/* ---------- PROGRESS ---------- */

function updateProgressIndicator(index) {

    if (
        !indicatorProgress ||
        window.innerWidth <= 768 ||
        !workCards.length
    ) return;


    indicatorProgress.style.width =
        `${100 / workCards.length}%`;


    indicatorProgress.style.transform =
        `translateX(${index * 100}%)`;

}


/* ---------- START SLIDESHOW ---------- */

function initializeCardSlideshowSequence(card) {

    const wrap =
        card?.querySelector(
            '.dynamic-slideshow'
        );

    if (!wrap) return;


    const slides =
        [
            ...wrap.querySelectorAll(
                '.card-bg-img'
            )
        ];


    if (
        slides.length <= 1 ||
        activeSlideshowIntervals.some(
            x => x.card === card
        )
    ) return;


    let index =
        slides.findIndex(
            s =>
                s.classList.contains(
                    'active-slide'
                )
        );


    if (index < 0) index = 0;


    const interval =
        setInterval(() => {

            slides[index]
                .classList
                .remove(
                    'active-slide'
                );


            if (
                slides[index].tagName ===
                'VIDEO'
            ) {

                slides[index].pause();

            }


            index =
                (index + 1) %
                slides.length;


            slides[index]
                .classList
                .add(
                    'active-slide'
                );


            if (
                slides[index].tagName ===
                'VIDEO'
            ) {

                slides[index].muted =
                    true;

                slides[index]
                    .play()
                    .catch(() => {});

            }

        }, 2800);


    activeSlideshowIntervals.push({
        card,
        interval
    });

}


/* ---------- STOP SLIDESHOW ---------- */

function terminateCardSlideshowSequence(card) {

    activeSlideshowIntervals =
        activeSlideshowIntervals.filter(
            item => {

                if (
                    item.card !== card
                ) {

                    return true;

                }


                clearInterval(
                    item.interval
                );


                const slides =
                    [
                        ...card.querySelectorAll(
                            '.card-bg-img'
                        )
                    ];


                slides.forEach(
                    (slide, i) => {

                        slide.classList.toggle(
                            'active-slide',
                            i === 0
                        );


                        if (
                            slide.tagName ===
                            'VIDEO'
                        ) {

                            if (i === 0) {

                                slide
                                    .play()
                                    .catch(
                                        () => {}
                                    );

                            } else {

                                slide.pause();

                            }

                        }

                    }
                );


                return false;

            }
        );

}


/* ---------- WORK SECTION REVEAL ---------- */

if (
    workSection &&
    'IntersectionObserver' in window
) {

    const workObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting
                ) {

                    workSection
                        .querySelectorAll(
                            '.animate-init'
                        )
                        .forEach(el =>
                            el.classList.add(
                                'animate-active'
                            )
                        );


                    workObserver.unobserve(
                        workSection
                    );

                }

            },
            {
                threshold: 0.05
            }
        );


    workObserver.observe(
        workSection
    );

}


if (workSection) {

    setTimeout(
        () => {

            workSection
                .querySelectorAll(
                    '.animate-init'
                )
                .forEach(el =>
                    el.classList.add(
                        'animate-active'
                    )
                );

        },
        800
    );

}


updateProgressIndicator(0);


if (workCards[0]) {

    initializeCardSlideshowSequence(
        workCards[0]
    );

}


/* ---------- CARD HOVER ---------- */

workCards.forEach(
    (card, index) => {

        card.addEventListener(
            'mouseenter',
            () => {

                if (
                    window.innerWidth <= 768
                ) return;


                workCards.forEach(
                    other => {

                        if (
                            other !== card
                        ) {

                            other.classList.remove(
                                'active'
                            );

                            terminateCardSlideshowSequence(
                                other
                            );


                            const vid =
                                other.querySelector(
                                    'video'
                                );


                            if (vid) {

                                vid.pause();

                            }

                        }

                    }
                );


                card.classList.add(
                    'active'
                );


                updateProgressIndicator(
                    index
                );


                initializeCardSlideshowSequence(
                    card
                );


                const activeVideo =
                    card.querySelector(
                        '.active-slide'
                    );


                if (
                    activeVideo?.tagName ===
                    'VIDEO'
                ) {

                    activeVideo.muted =
                        true;

                    activeVideo
                        .play()
                        .catch(
                            () => {}
                        );

                }

            }
        );


        card.addEventListener(
            'click',
            () => {

                if (
                    window.innerWidth > 768 &&
                    !card.classList.contains(
                        'active'
                    )
                ) {

                    return;

                }


                openCinematicModal(
                    card.getAttribute(
                        'data-project'
                    )
                );

            }
        );

    }
);


/* =========================================================
   WORK MEDIA PARALLAX
   ========================================================= */

let targetMouseX = 0;
let targetMouseY = 0;

let currentMouseX = 0;
let currentMouseY = 0;


window.addEventListener(
    'mousemove',
    e => {

        targetMouseX =
            (
                e.clientX -
                window.innerWidth / 2
            ) /
            (
                window.innerWidth / 2
            );


        targetMouseY =
            (
                e.clientY -
                window.innerHeight / 2
            ) /
            (
                window.innerHeight / 2
            );

    },
    {
        passive: true
    }
);


function processParallaxLoop() {

    currentMouseX +=
        (
            targetMouseX -
            currentMouseX
        ) * 0.08;


    currentMouseY +=
        (
            targetMouseY -
            currentMouseY
        ) * 0.08;


    if (
        window.innerWidth > 768
    ) {

        const media =
            document.querySelector(
                '.work-card.active .card-bg-wrap .active-slide'
            );


        if (media) {

            media.style.setProperty(
                '--move-x',
                `${currentMouseX * 28}px`
            );


            media.style.setProperty(
                '--move-y',
                `${currentMouseY * 28}px`
            );

        }

    }


    requestAnimationFrame(
        processParallaxLoop
    );

}


requestAnimationFrame(
    processParallaxLoop
);


/* =========================================================
   DEFAULT VIDEO AUTOPLAY
   ========================================================= */

window.addEventListener(
    'DOMContentLoaded',
    () => {

        const video =
            document.getElementById(
                'showcaseVideo'
            );


        if (!video) return;


        video.muted = true;


        video.play().catch(() => {

            const retry = () => {

                video
                    .play()
                    .catch(() => {});


                window.removeEventListener(
                    'click',
                    retry
                );


                window.removeEventListener(
                    'scroll',
                    retry
                );

            };


            window.addEventListener(
                'click',
                retry,
                { once: true }
            );


            window.addEventListener(
                'scroll',
                retry,
                { once: true }
            );

        });

    }
);


/* =========================================================
   MOBILE WORK SWIPE
   ========================================================= */

if (accordionStage) {

    accordionStage.addEventListener(
        'scroll',
        () => {

            if (
                window.innerWidth > 768
            ) return;


            const width =
                accordionStage.offsetWidth;


            const index =
                Math.round(
                    accordionStage.scrollLeft /
                    (width * 0.85)
                );


            if (
                workCards[index] &&
                !workCards[index]
                    .classList
                    .contains('active')
            ) {

                workCards.forEach(
                    card =>
                        card.classList.remove(
                            'active'
                        )
                );


                workCards[index]
                    .classList
                    .add('active');

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   GSAP OPTIONAL ENHANCEMENT
   ========================================================= */

if (
    window.gsap &&
    window.ScrollTrigger &&
    !prefersReducedMotion
) {

    gsap.registerPlugin(
        ScrollTrigger
    );


    gsap
        .utils
        .toArray(
            '.about-meta, .skills-grid'
        )
        .forEach(el => {

            gsap.fromTo(
                el,
                {
                    y: 24
                },
                {
                    y: 0,
                    ease: 'none',

                    scrollTrigger: {

                        trigger: el,

                        start:
                            'top bottom',

                        end:
                            'top center',

                        scrub: 0.6

                    }

                }
            );

        });

}
