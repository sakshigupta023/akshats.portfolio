/* ============================================================
   AKSHAT PORTFOLIO — FINAL CLEAN REPLACEMENT
   ============================================================ */

(() => {
    'use strict';

    /* =========================================================
       BASIC SETUP
       ========================================================= */

    const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const body = document.body;

    const preloader =
        document.getElementById('preloader');

    const preloaderNumber =
        document.getElementById('preloaderNumber');

    const hero =
        document.querySelector('.hero');

    const heroName =
        document.getElementById('heroName');

    const navbar =
        document.getElementById('navbar');

    let loaderFinished = false;


    /* =========================================================
       LOAD FONT
       ========================================================= */

    function loadFont() {

        if (
            document.querySelector(
                'link[data-akshat-font]'
            )
        ) return;

        const font =
            document.createElement('link');

        font.rel = 'stylesheet';

        font.href =
            'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap';

        font.dataset.akshatFont = 'true';

        document.head.appendChild(font);
    }

    loadFont();


    /* =========================================================
       HERO CLEANUP
       ========================================================= */

    function prepareHero() {

        if (!hero) return;


        /* Remove HELLO, I'M */

        const greeting =
            hero.querySelector('.greet');

        if (greeting) {
            greeting.remove();
        }


        /* Remove portrait/image completely */

        const heroImage =
            hero.querySelector('.hero-image');

        if (heroImage) {
            heroImage.remove();
        }


        /* Hide old work heading */

        document
            .querySelectorAll(
                '.work-heading, .work-subheading'
            )
            .forEach(element => {

                element.style.display = 'none';

            });


        /* Make sure hero name exists */

        if (heroName) {

            heroName.classList.add(
                'kinetic-name'
            );

            heroName.innerHTML =
                'AKSHAT<br>SHARMA';

        }


        /* Create smoke layer */

        if (
            !hero.querySelector(
                '.hero-smoke'
            )
        ) {

            const smoke =
                document.createElement('div');

            smoke.className =
                'hero-smoke';

            smoke.setAttribute(
                'aria-hidden',
                'true'
            );

            hero.appendChild(smoke);
        }
    }


    /* =========================================================
       COMPLETE HERO / LOADER STYLING
       ========================================================= */

    function injectStyles() {

        if (
            document.getElementById(
                'akshat-final-styles'
            )
        ) return;


        const style =
            document.createElement('style');

        style.id =
            'akshat-final-styles';


        style.textContent = `

        /* =====================================================
           HERO
           ===================================================== */

        .hero {
            position: relative !important;
            min-height: 100svh !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;

            display: flex !important;
            align-items: center !important;
            justify-content: center !important;

            padding:
                120px 30px 80px !important;

            overflow: hidden !important;

            text-align: center !important;
        }


        .hero-content {
            position: relative !important;
            z-index: 5 !important;

            width: 100% !important;
            max-width: 1500px !important;

            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
        }


        /* =====================================================
           MAIN NAME
           ===================================================== */

        #heroName {

            width: 100% !important;
            max-width: 1500px !important;

            margin: 0 auto !important;

            font-family:
                'Sora',
                'Inter',
                sans-serif !important;

            font-size:
                clamp(
                    4rem,
                    10.5vw,
                    10.5rem
                ) !important;

            font-weight:
                800 !important;

            line-height:
                .82 !important;

            letter-spacing:
                -.075em !important;

            text-align:
                center !important;

            white-space:
                nowrap !important;

            overflow:
                visible !important;

            color:
                transparent !important;

            background:
                linear-gradient(
                    110deg,
                    #74757b 0%,
                    #f3f3f5 20%,
                    #bfc0c5 40%,
                    #707177 58%,
                    #e7e7e9 80%,
                    #898a90 100%
                ) !important;

            background-size:
                220% 100% !important;

            -webkit-background-clip:
                text !important;

            background-clip:
                text !important;

            animation:
                akshatGradient 9s
                ease-in-out
                infinite
                alternate;

            user-select:
                none !important;

            will-change:
                transform,
                filter;
        }


        @keyframes akshatGradient {

            from {
                background-position:
                    0% 50%;
            }

            to {
                background-position:
                    100% 50%;
            }

        }


        /* =====================================================
           KINETIC LETTERS
           ===================================================== */

        #heroName .kchar {

            display:
                inline-block !important;

            position:
                relative !important;

            width:
                auto !important;

            height:
                auto !important;

            overflow:
                visible !important;

            vertical-align:
                baseline !important;

            transform-origin:
                center center !important;

            will-change:
                transform !important;

            transition:
                transform
                .28s
                cubic-bezier(
                    .2,
                    .8,
                    .2,
                    1
                ) !important;
        }


        #heroName .kchar-inner {

            display:
                inline-block !important;

            overflow:
                visible !important;

            white-space:
                pre !important;

            color:
                transparent !important;

            background:
                inherit !important;

            background-size:
                220% 100% !important;

            -webkit-background-clip:
                text !important;

            background-clip:
                text !important;

            opacity:
                0 !important;

            transform:
                scaleX(.035)
                translateY(8px) !important;

            transform-origin:
                center center !important;

            filter:
                blur(14px) !important;

            transition:
                opacity
                .7s
                cubic-bezier(
                    .16,
                    1,
                    .3,
                    1
                ),

                filter
                .85s
                cubic-bezier(
                    .16,
                    1,
                    .3,
                    1
                ),

                transform
                .9s
                cubic-bezier(
                    .16,
                    1,
                    .3,
                    1
                ) !important;
        }


        #heroName.kinetic-active
        .kchar-inner {

            opacity:
                1 !important;

            filter:
                blur(0) !important;

            transform:
                scaleX(1)
                translateY(0) !important;
        }


        /* =====================================================
           ROLE
           ===================================================== */

        .hero .role {

            margin-top:
                38px !important;

            font-family:
                'Sora',
                'Inter',
                sans-serif !important;

            font-size:
                11px !important;

            font-weight:
                600 !important;

            letter-spacing:
                .34em !important;

            color:
                #c8c8cc !important;

            text-transform:
                uppercase !important;
        }


        /* =====================================================
           DESCRIPTION
           ===================================================== */

        .hero .intro {

            margin-top:
                16px !important;

            max-width:
                420px !important;

            font-size:
                14px !important;

            line-height:
                1.7 !important;

            color:
                #777980 !important;
        }


        .hero-btns {

            margin-top:
                34px !important;
        }


        /* =====================================================
           CURSOR SMOKE
           ===================================================== */

        .hero-smoke {

            position:
                fixed;

            left:
                50vw;

            top:
                50vh;

            width:
                380px;

            height:
                380px;

            transform:
                translate(
                    -50%,
                    -50%
                );

            border-radius:
                50%;

            pointer-events:
                none;

            z-index:
                2;

            opacity:
                0;

            background:
                radial-gradient(
                    circle,
                    rgba(
                        230,
                        230,
                        235,
                        .13
                    ) 0%,

                    rgba(
                        150,
                        150,
                        160,
                        .065
                    ) 28%,

                    rgba(
                        100,
                        100,
                        110,
                        .025
                    ) 48%,

                    transparent 72%
                );

            filter:
                blur(42px);

            mix-blend-mode:
                screen;

            transition:
                opacity
                .35s
                ease;

            will-change:
                left,
                top,
                opacity;
        }


        /* =====================================================
           PRELOADER NUMBER
           ===================================================== */

        .preloader-count {

            position:
                relative !important;

            display:
                flex !important;

            align-items:
                center !important;

            justify-content:
                center !important;
        }


        #preloaderNumber {

            font-family:
                'Sora',
                'Inter',
                sans-serif !important;

            font-size:
                clamp(
                    4rem,
                    7vw,
                    7rem
                ) !important;

            font-weight:
                700 !important;

            letter-spacing:
                -.055em !important;

            font-variant-numeric:
                tabular-nums !important;

            min-width:
                1.4ch !important;

            text-align:
                right !important;
        }


        .preloader-percent {

            font-family:
                'Inter',
                sans-serif !important;

            font-size:
                clamp(
                    .8rem,
                    1vw,
                    1rem
                ) !important;

            font-weight:
                500 !important;

            color:
                rgba(
                    220,
                    220,
                    225,
                    .55
                ) !important;

            margin-left:
                7px !important;

            margin-top:
                .35em !important;
        }


        /* =====================================================
           SMALL NAME UNDER LOADER
           ===================================================== */

        .preloader-name {

            position:
                absolute;

            left:
                50%;

            top:
                calc(
                    100% + 22px
                );

            transform:
                translateX(-50%);

            white-space:
                nowrap;

            font-family:
                'Sora',
                'Inter',
                sans-serif;

            font-size:
                clamp(
                    .5rem,
                    .65vw,
                    .68rem
                );

            font-weight:
                600;

            letter-spacing:
                .42em;

            color:
                rgba(
                    215,
                    215,
                    220,
                    .5
                );

            text-transform:
                uppercase;

            pointer-events:
                none;
        }


        .preloader-underline {

            position:
                absolute;

            left:
                50%;

            top:
                calc(
                    100% + 11px
                );

            width:
                clamp(
                    70px,
                    8vw,
                    105px
                );

            height:
                1px;

            transform:
                translateX(-50%);

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(
                        220,
                        220,
                        225,
                        .75
                    ),
                    transparent
                );

            box-shadow:
                0 0 14px
                rgba(
                    210,
                    210,
                    220,
                    .15
                );
        }


        .preloader.preloader-complete
        .preloader-name,

        .preloader.preloader-complete
        .preloader-underline {

            opacity:
                0;

            transition:
                opacity
                .45s
                ease;
        }


        /* =====================================================
           TWO WORK TAPE STRIPS
           ===================================================== */

        .work-tape {

            width:
                100vw;

            margin-left:
                calc(
                    50% - 50vw
                );

            margin-top:
                18px;

            margin-bottom:
                18px;

            overflow:
                hidden;

            padding:
                7px 0;

            mask-image:
                linear-gradient(
                    to right,
                    transparent,
                    #000 5%,
                    #000 95%,
                    transparent
                );

            -webkit-mask-image:
                linear-gradient(
                    to right,
                    transparent,
                    #000 5%,
                    #000 95%,
                    transparent
                );
        }


        .work-tape-row {

            overflow:
                hidden;

            border-top:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .065
                );

            border-bottom:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .065
                );

            background:
                rgba(
                    255,
                    255,
                    255,
                    .018
                );
        }


        .work-tape-row + .work-tape-row {

            margin-top:
                7px;
        }


        .work-tape-track {

            display:
                flex;

            width:
                max-content;

            animation:
                tapeLeft
                34s
                linear
                infinite;

            will-change:
                transform;
        }


        .work-tape-row:nth-child(2)
        .work-tape-track {

            animation:
                tapeRight
                39s
                linear
                infinite;
        }


        .tape-item {

            min-width:
                300px;

            height:
                70px;

            padding:
                9px 22px 9px 14px;

            display:
                grid;

            grid-template-columns:
                24px 50px 1fr;

            grid-template-rows:
                1fr 1fr;

            column-gap:
                12px;

            align-items:
                center;

            border-right:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .075
                );

            color:
                rgba(
                    255,
                    255,
                    255,
                    .86
                );
        }


        .tape-index {

            grid-row:
                1 / 3;

            font-size:
                9px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .3
                );

            letter-spacing:
                .12em;
        }


        .tape-title {

            font-family:
                'Sora',
                'Inter',
                sans-serif;

            font-size:
                10px;

            font-weight:
                600;

            letter-spacing:
                .07em;

            white-space:
                nowrap;
        }


        .tape-meta {

            font-size:
                7px;

            letter-spacing:
                .16em;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .3
                );

            white-space:
                nowrap;
        }


        .tape-thumb,
        .tape-shape {

            grid-row:
                1 / 3;

            width:
                50px;

            height:
                46px;

            border:
                1px solid
                rgba(
                    255,
                    255,
                    255,
                    .1
                );

            background-size:
                cover;

            background-position:
                center;

            background-color:
                #111;

            position:
                relative;

            overflow:
                hidden;
        }


        .tape-video {

            background:
                linear-gradient(
                    135deg,
                    #17171b,
                    #77747d,
                    #151519
                );
        }


        .tape-video::after {

            content:
                '▶';

            position:
                absolute;

            inset:
                0;

            display:
                grid;

            place-items:
                center;

            font-size:
                11px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .7
                );

            background:
                rgba(
                    0,
                    0,
                    0,
                    .25
                );
        }


        .tape-shape {

            background:
                linear-gradient(
                    135deg,
                    #dadadd,
                    #55565d
                );

            opacity:
                .7;
        }


        .tape-ring {

            border-radius:
                50%;

            background:
                radial-gradient(
                    circle,
                    transparent 25%,
                    #d2d2d6 27%,
                    #696a71 47%,
                    transparent 49%
                );
        }


        .tape-grid {

            background:
                linear-gradient(
                    rgba(
                        255,
                        255,
                        255,
                        .15
                    ) 1px,
                    transparent 1px
                ),
                linear-gradient(
                    90deg,
                    rgba(
                        255,
                        255,
                        255,
                        .15
                    ) 1px,
                    transparent 1px
                ),
                linear-gradient(
                    135deg,
                    #25262b,
                    #7c7d84
                );

            background-size:
                11px 11px,
                11px 11px,
                100% 100%;
        }


        .tape-diamond {

            transform:
                rotate(45deg)
                scale(.65);

            background:
                linear-gradient(
                    135deg,
                    #e5e5e8,
                    #6b6c73
                );
        }


        .tape-bars {

            background:
                repeating-linear-gradient(
                    90deg,
                    #d7d7da 0 5px,
                    #55565c 5px 10px
                );
        }


        @keyframes tapeLeft {

            from {
                transform:
                    translateX(0);
            }

            to {
                transform:
                    translateX(-50%);
            }
        }


        @keyframes tapeRight {

            from {
                transform:
                    translateX(-50%);
            }

            to {
                transform:
                    translateX(0);
            }
        }


        .work-tape:hover
        .work-tape-track {

            animation-play-state:
                paused;
        }


        /* =====================================================
           RESPONSIVE
           ===================================================== */

        @media (max-width: 900px) {

            #heroName {

                font-size:
                    clamp(
                        3.3rem,
                        11.5vw,
                        7rem
                    ) !important;

                white-space:
                    normal !important;
            }

            .hero-smoke {

                width:
                    280px;

                height:
                    280px;
            }

            .tape-item {

                min-width:
                    245px;

                height:
                    62px;
            }
        }


        @media (max-width: 560px) {

            .hero {

                padding:
                    110px
                    18px
                    60px !important;
            }


            #heroName {

                font-size:
                    clamp(
                        2.7rem,
                        15vw,
                        5.5rem
                    ) !important;

                line-height:
                    .86 !important;
            }


            .hero .role {

                font-size:
                    9px !important;

                letter-spacing:
                    .24em !important;
            }


            .hero .intro {

                font-size:
                    12px !important;

                max-width:
                    310px !important;
            }


            #preloaderNumber {

                font-size:
                    clamp(
                        3.5rem,
                        17vw,
                        5.2rem
                    ) !important;
            }


            .preloader-name {

                font-size:
                    .48rem;

                letter-spacing:
                    .32em;
            }


            .tape-item {

                min-width:
                    220px;

                height:
                    57px;

                grid-template-columns:
                    20px 40px 1fr;

                column-gap:
                    8px;
            }


            .tape-thumb,
            .tape-shape {

                width:
                    40px;

                height:
                    38px;
            }


            .tape-title {

                font-size:
                    8px;
            }


            .tape-meta {

                font-size:
                    6px;
            }
        }


        @media (prefers-reduced-motion: reduce) {

            #heroName {

                animation:
                    none !important;
            }

            .hero-smoke {

                display:
                    none !important;
            }

            .work-tape-track {

                animation:
                    none !important;
            }
        }

        `;

        document.head.appendChild(style);
    }


    /* =========================================================
       BUILD KINETIC NAME
       ========================================================= */

    function buildKineticName() {

        if (!heroName) return;


        const lines =
            heroName.innerHTML
                .replace(
                    /<br\s*\/?>/gi,
                    '\n'
                )
                .replace(
                    /&nbsp;/g,
                    ' '
                )
                .split('\n')
                .map(
                    line =>
                        line
                            .replace(
                                /<[^>]*>/g,
                                ''
                            )
                            .trim()
                )
                .filter(Boolean);


        heroName.innerHTML = '';


        lines.forEach(
            (line, lineIndex) => {

                if (lineIndex > 0) {

                    heroName.appendChild(
                        document.createElement(
                            'br'
                        )
                    );
                }


                [...line].forEach(
                    (character, index) => {

                        const outer =
                            document.createElement(
                                'span'
                            );

                        outer.className =
                            'kchar';


                        const inner =
                            document.createElement(
                                'span'
                            );

                        inner.className =
                            'kchar-inner';


                        inner.textContent =
                            character === ' '
                                ? '\u00A0'
                                : character;


                        inner.style.transitionDelay =
                            `
                            ${
                                (
                                    lineIndex * 8 +
                                    index
                                ) * 38
                            }ms
                            `;


                        outer.appendChild(
                            inner
                        );

                        heroName.appendChild(
                            outer
                        );
                    }
                );
            }
        );
    }


    /* =========================================================
       LOADER NAME
       ========================================================= */

    function setupLoaderName() {

        if (!preloader) return;


        const count =
            preloader.querySelector(
                '.preloader-count'
            );

        if (!count) return;


        if (
            !count.querySelector(
                '.preloader-name'
            )
        ) {

            const name =
                document.createElement(
                    'div'
                );

            name.className =
                'preloader-name';

            name.textContent =
                'AKSHAT SHARMA';


            const underline =
                document.createElement(
                    'span'
                );

            underline.className =
                'preloader-underline';

            underline.setAttribute(
                'aria-hidden',
                'true'
            );


            count.appendChild(
                name
            );

            count.appendChild(
                underline
            );
        }
    }


    /* =========================================================
       HERO REVEAL
       ========================================================= */

    function revealHero() {

        body.classList.remove(
            'preloader-active'
        );

        body.classList.add(
            'preloader-complete'
        );


        if (navbar) {

            navbar.classList.add(
                'hero-ready'
            );
        }


        const reveals =
            hero
                ? hero.querySelectorAll(
                    '.role, .intro, .hero-btns'
                )
                : [];


        reveals.forEach(
            (element, index) => {

                setTimeout(
                    () => {

                        element.classList.add(
                            'visible'
                        );

                    },
                    600 +
                    index * 140
                );
            }
        );


        if (heroName) {

            setTimeout(
                () => {

                    heroName.classList.add(
                        'kinetic-active'
                    );

                },
                260
            );
        }
    }


    /* =========================================================
       NUMBER LOADER
       ========================================================= */

    function finishLoader() {

        if (loaderFinished) return;

        loaderFinished = true;


        if (preloaderNumber) {

            preloaderNumber.textContent =
                '100';
        }


        if (preloader) {

            preloader.classList.add(
                'preloader-complete'
            );
        }


        setTimeout(
            () => {

                if (preloader) {

                    preloader.classList.add(
                        'preloader-exit'
                    );
                }


                revealHero();

            },
            330
        );


        setTimeout(
            () => {

                if (preloader) {

                    preloader.classList.add(
                        'preloader-hidden'
                    );
                }

            },
            1350
        );
    }


    function startLoader() {

        if (
            !preloader ||
            !preloaderNumber
        ) {

            revealHero();

            return;
        }


        body.classList.add(
            'preloader-active'
        );


        if (prefersReducedMotion) {

            preloaderNumber.textContent =
                '100';

            finishLoader();

            return;
        }


        const duration =
            3100;

        const start =
            performance.now();

        let accelerated =
            false;

        let previous =
            -1;


        function animate(now) {

            const elapsed =
                now - start;


            const currentDuration =
                accelerated
                    ? 500
                    : duration;


            const progress =
                Math.min(
                    elapsed /
                    currentDuration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.min(
                    100,
                    Math.floor(
                        eased * 100
                    )
                );


            if (
                value !== previous
            ) {

                previous =
                    value;

                preloaderNumber.textContent =
                    String(value);
            }


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                preloaderNumber.textContent =
                    '100';


                setTimeout(
                    finishLoader,
                    240
                );
            }
        }


        requestAnimationFrame(
            animate
        );


        const accelerate =
            () => {

                if (
                    loaderFinished
                ) return;

                accelerated =
                    true;
            };


        preloader.addEventListener(
            'click',
            accelerate,
            {
                once: true
            }
        );


        window.addEventListener(
            'wheel',
            accelerate,
            {
                passive: true,
                once: true
            }
        );


        window.addEventListener(
            'touchstart',
            accelerate,
            {
                passive: true,
                once: true
            }
        );
    }


    /* =========================================================
       HERO CURSOR EFFECT
       ========================================================= */

    function setupHeroCursor() {

        if (
            !hero ||
            !heroName ||
            prefersReducedMotion ||
            window.matchMedia(
                '(max-width: 900px)'
            ).matches
        ) return;


        const chars =
            heroName.querySelectorAll(
                '.kchar'
            );


        const smoke =
            hero.querySelector(
                '.hero-smoke'
            );


        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let animationFrame =
            null;


        function render() {

            animationFrame =
                null;


            chars.forEach(
                char => {

                    const rect =
                        char.getBoundingClientRect();


                    const centerX =
                        rect.left +
                        rect.width / 2;


                    const centerY =
                        rect.top +
                        rect.height / 2;


                    const dx =
                        mouseX -
                        centerX;


                    const dy =
                        mouseY -
                        centerY;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    const radius =
                        360;


                    let influence =
                        1 -
                        distance /
                        radius;


                    influence =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                influence
                            )
                        );


                    if (
                        influence <= 0
                    ) {

                        char.style.transform =
                            `
                            translate3d(
                                0,
                                0,
                                0
                            )
                            scaleX(1)
                            `;

                        return;
                    }


                    /*
                     * Close to cursor:
                     * slight stretch
                     *
                     * Around cursor:
                     * slight compression
                     *
                     * NEVER large enough
                     * to break letters.
                     */

                    const close =
                        distance < 150;


                    const scale =
                        close
                            ? 1 +
                              influence *
                              0.13

                            : 1 -
                              influence *
                              0.045;


                    const moveX =
                        (
                            dx >= 0
                                ? 1
                                : -1
                        ) *
                        influence *
                        5;


                    const moveY =
                        -influence *
                        2;


                    char.style.transform =
                        `
                        translate3d(
                            ${moveX}px,
                            ${moveY}px,
                            0
                        )
                        scaleX(
                            ${scale}
                        )
                        `;
                }
            );


            if (smoke) {

                smoke.style.left =
                    `${mouseX}px`;

                smoke.style.top =
                    `${mouseY}px`;

                smoke.style.opacity =
                    '1';
            }
        }


        hero.addEventListener(
            'mousemove',
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                if (
                    !animationFrame
                ) {

                    animationFrame =
                        requestAnimationFrame(
                            render
                        );
                }
            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            'mouseleave',
            () => {

                chars.forEach(
                    char => {

                        char.style.transform =
                            `
                            translate3d(
                                0,
                                0,
                                0
                            )
                            scaleX(1)
                            `;
                    }
                );


                if (smoke) {

                    smoke.style.opacity =
                        '0';
                }
            }
        );
    }


    /* =========================================================
       NAVBAR
       ========================================================= */

    function setupNavbar() {

        if (!navbar) return;


        window.addEventListener(
            'scroll',
            () => {

                navbar.classList.toggle(
                    'scrolled',
                    window.scrollY > 40
                );

            },
            {
                passive: true
            }
        );


        const menuToggle =
            document.getElementById(
                'menuToggle'
            );

        const mobileMenu =
            document.getElementById(
                'mobileMenu'
            );


        if (
            menuToggle &&
            mobileMenu
        ) {

            menuToggle.addEventListener(
                'click',
                () => {

                    const open =
                        mobileMenu.classList.toggle(
                            'open'
                        );


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
                .forEach(
                    link => {

                        link.addEventListener(
                            'click',
                            () => {

                                mobileMenu.classList.remove(
                                    'open'
                                );

                                menuToggle.classList.remove(
                                    'open'
                                );

                                menuToggle.setAttribute(
                                    'aria-expanded',
                                    'false'
                                );
                            }
                        );
                    }
                );
        }
    }


    /* =========================================================
       GENERAL REVEALS
       ========================================================= */

    function setupReveals() {

        if (
            !('IntersectionObserver'
                in window)
        ) {

            document
                .querySelectorAll(
                    '.reveal'
                )
                .forEach(
                    el =>
                        el.classList.add(
                            'visible'
                        )
                );

            return;
        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        (entry, index) => {

                            if (
                                !entry.isIntersecting
                            ) return;


                            setTimeout(
                                () => {

                                    entry.target.classList.add(
                                        'visible'
                                    );

                                },
                                index * 70
                            );


                            observer.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold:
                        0.12
                }
            );


        document
            .querySelectorAll(
                '.reveal:not(.hero .reveal)'
            )
            .forEach(
                element =>
                    observer.observe(
                        element
                    )
            );
    }


    /* =========================================================
       ABOUT WORD REVEAL
       ========================================================= */

    function setupAbout() {

        document
            .querySelectorAll(
                '[data-split]'
            )
            .forEach(
                paragraph => {

                    const text =
                        paragraph
                            .textContent
                            .trim();


                    paragraph.innerHTML =
                        '';


                    text
                        .split(/\s+/)
                        .forEach(
                            word => {

                                const span =
                                    document.createElement(
                                        'span'
                                    );

                                span.className =
                                    'split-word';

                                span.textContent =
                                    word;

                                paragraph.appendChild(
                                    span
                                );

                                paragraph.appendChild(
                                    document.createTextNode(
                                        ' '
                                    )
                                );
                            }
                        );
                }
            );


        if (
            !('IntersectionObserver'
                in window)
        ) return;


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) return;


                            entry.target
                                .querySelectorAll(
                                    '.split-word'
                                )
                                .forEach(
                                    (word, index) => {

                                        setTimeout(
                                            () => {

                                                word.classList.add(
                                                    'word-visible'
                                                );

                                            },
                                            index * 28
                                        );
                                    }
                                );


                            observer.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold:
                        0.3
                }
            );


        document
            .querySelectorAll(
                '[data-split]'
            )
            .forEach(
                element =>
                    observer.observe(
                        element
                    )
            );
    }


    /* =========================================================
       TIMELINE
       ========================================================= */

    function setupTimeline() {

        const progress =
            document.getElementById(
                'timelineProgress'
            );

        const timeline =
            document.querySelector(
                '.timeline'
            );


        if (
            !progress ||
            !timeline
        ) return;


        function update() {

            const rect =
                timeline.getBoundingClientRect();


            let value =
                (
                    window.innerHeight *
                    0.85 -
                    rect.top
                ) /
                rect.height;


            value =
                Math.max(
                    0,
                    Math.min(
                        1,
                        value
                    )
                );


            progress.style.height =
                `${value * 100}%`;
        }


        window.addEventListener(
            'scroll',
            update,
            {
                passive: true
            }
        );


        window.addEventListener(
            'resize',
            update
        );


        update();
    }


    /* =========================================================
       FOOTER
       ========================================================= */

    function setupFooter() {

        const footer =
            document.getElementById(
                'contact'
            );


        if (
            !footer ||
            !('IntersectionObserver'
                in window)
        ) return;


        const observer =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0]
                            .isIntersecting
                    ) {

                        footer.classList.add(
                            'footer-active'
                        );

                        observer.unobserve(
                            footer
                        );
                    }
                },
                {
                    threshold:
                        0.25
                }
            );


        observer.observe(
            footer
        );
    }


    /* =========================================================
       CURSOR GLOW
       ========================================================= */

    function setupCursorGlow() {

        const glow =
            document.getElementById(
                'cursorGlow'
            );


        if (
            !glow ||
            prefersReducedMotion ||
            window.matchMedia(
                '(max-width: 900px)'
            ).matches
        ) return;


        window.addEventListener(
            'mousemove',
            event => {

                glow.style.transform =
                    `
                    translate(
                        ${event.clientX - 190}px,
                        ${event.clientY - 190}px
                    )
                    `;


                glow.classList.add(
                    'active'
                );

            },
            {
                passive: true
            }
        );


        window.addEventListener(
            'mouseleave',
            () => {

                glow.classList.remove(
                    'active'
                );

            }
        );
    }


    /* =========================================================
       MAGNETIC BUTTONS
       ========================================================= */

    function setupMagneticButtons() {

        if (
            prefersReducedMotion ||
            window.matchMedia(
                '(max-width: 900px)'
            ).matches
        ) return;


        document
            .querySelectorAll(
                '.magnetic'
            )
            .forEach(
                button => {

                    button.addEventListener(
                        'mousemove',
                        event => {

                            const rect =
                                button.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left -
                                rect.width /
                                2;


                            const y =
                                event.clientY -
                                rect.top -
                                rect.height /
                                2;


                            button.style.transform =
                                `
                                translate(
                                    ${x * .15}px,
                                    ${y * .25}px
                                )
                                `;
                        }
                    );


                    button.addEventListener(
                        'mouseleave',
                        () => {

                            button.style.transform =
                                'translate(0,0)';
                        }
                    );
                }
            );
    }


    /* =========================================================
       PROJECT DATA
       ========================================================= */

    const projectData = {

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

    function setupModal() {

        const overlay =
            document.getElementById(
                'premiumProjectModal'
            );

        const media =
            document.getElementById(
                'modalMediaAnchor'
            );

        const meta =
            document.getElementById(
                'modalMetaField'
            );

        const title =
            document.getElementById(
                'modalTitleField'
            );

        const description =
            document.getElementById(
                'modalDescField'
            );

        const tags =
            document.getElementById(
                'modalTagsField'
            );

        const closeButton =
            document.getElementById(
                'modalCloseBtn'
            );


        if (!overlay) {
            return null;
        }


        function open(projectId) {

            const data =
                projectData[projectId];

            if (!data) return;


            if (meta) {
                meta.textContent =
                    data.meta;
            }


            if (title) {
                title.textContent =
                    data.title;
            }


            if (description) {
                description.textContent =
                    data.desc;
            }


            if (tags) {

                tags.innerHTML =
                    '';


                data.tags.forEach(
                    tag => {

                        const element =
                            document.createElement(
                                'span'
                            );

                        element.className =
                            'tag';

                        element.textContent =
                            tag;

                        tags.appendChild(
                            element
                        );
                    }
                );
            }


            if (media) {

                if (
                    data.videoSrc
                ) {

                    media.innerHTML =
                        `
                        <video
                            autoplay
                            loop
                            controls
                            playsinline
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                        >
                            <source
                                src="${data.videoSrc}"
                                type="video/mp4"
                            >
                        </video>
                        `;

                } else {

                    media.innerHTML =
                        `
                        <img
                            src="${data.imgSrc}"
                            alt="${data.title}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                        >
                        `;
                }
            }


            overlay.classList.add(
                'modal-visible'
            );

            body.style.overflow =
                'hidden';
        }


        function close() {

            overlay.classList.remove(
                'modal-visible'
            );


            if (media) {
                media.innerHTML =
                    '';
            }


            body.style.overflow =
                '';
        }


        if (closeButton) {

            closeButton.addEventListener(
                'click',
                close
            );
        }


        overlay.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    close();
                }
            }
        );


        window.addEventListener(
            'keydown',
            event => {

                if (
                    event.key ===
                    'Escape' &&

                    overlay.classList.contains(
                        'modal-visible'
                    )
                ) {

                    close();
                }
            }
        );


        return open;
    }


    /* =========================================================
       MOVING WORK TAPES
       ========================================================= */

    function createWorkTapes() {

        const accordion =
            document.getElementById(
                'accordionStage'
            );


        if (!accordion) return;


        if (
            document.querySelector(
                '.work-tape'
            )
        ) return;


        const tape =
            document.createElement(
                'div'
            );

        tape.className =
            'work-tape';


        const projects = [

            {
                index: '01',
                image: '',
                title:
                    'PIXEL PLAY SHOWCASE',
                meta:
                    'AI VIDEO'
            },

            {
                index: '02',
                image:
                    'assets/work/work2.jpg',
                title:
                    'POCKET FM SCALE ASSETS',
                meta:
                    'GENERATIVE AI'
            },

            {
                index: '03',
                image:
                    'assets/work/work3.jpg',
                title:
                    'CHERNOBYL PROMO ART',
                meta:
                    'KEYART'
            },

            {
                index: '04',
                image:
                    'assets/work/work4.jpg',
                title:
                    'HIGH-IMPACT CONTESTS',
                meta:
                    'CAMPAIGN'
            },

            {
                index: '05',
                image:
                    'assets/work/work5.jpg',
                title:
                    'STRANGER THINGS CONCEPT',
                meta:
                    'MOTION'
            }

        ];


        const categories = [

            {
                index: 'A',
                type: '',
                title:
                    'VISUAL STORYTELLING',
                meta:
                    'CREATIVE DIRECTION'
            },

            {
                index: 'B',
                type:
                    'tape-ring',
                title:
                    'MOTION DESIGN',
                meta:
                    'AFTER EFFECTS'
            },

            {
                index: 'C',
                type:
                    'tape-grid',
                title:
                    'AI WORKFLOWS',
                meta:
                    'PRODUCTION SYSTEMS'
            },

            {
                index: 'D',
                type:
                    'tape-diamond',
                title:
                    'BRAND IDENTITY',
                meta:
                    'VISUAL SYSTEMS'
            },

            {
                index: 'E',
                type:
                    'tape-bars',
                title:
                    'CINEMATIC DIRECTION',
                meta:
                    'EDITING & AUDIO'
            }

        ];


        function makeItem(
            data,
            secondRow = false
        ) {

            const item =
                document.createElement(
                    'div'
                );

            item.className =
                'tape-item';


            const index =
                document.createElement(
                    'span'
                );

            index.className =
                'tape-index';

            index.textContent =
                data.index;


            const visual =
                document.createElement(
                    'span'
                );


            if (secondRow) {

                visual.className =
                    `tape-shape ${
                        data.type || ''
                    }`;

            } else {

                visual.className =
                    'tape-thumb';


                if (data.image) {

                    visual.style.backgroundImage =
                        `url("${data.image}")`;

                } else {

                    visual.classList.add(
                        'tape-video'
                    );
                }
            }


            const title =
                document.createElement(
                    'span'
                );

            title.className =
                'tape-title';

            title.textContent =
                data.title;


            const meta =
                document.createElement(
                    'small'
                );

            meta.className =
                'tape-meta';

            meta.textContent =
                data.meta;


            item.appendChild(
                index
            );

            item.appendChild(
                visual
            );

            item.appendChild(
                title
            );

            item.appendChild(
                meta
            );


            return item;
        }


        function makeTrack(
            data,
            secondRow
        ) {

            const track =
                document.createElement(
                    'div'
                );

            track.className =
                'work-tape-track';


            data.forEach(
                item => {

                    track.appendChild(
                        makeItem(
                            item,
                            secondRow
                        )
                    );
                }
            );


            /* Duplicate once so
               animation loops seamlessly */

            data.forEach(
                item => {

                    const duplicate =
                        makeItem(
                            item,
                            secondRow
                        );

                    duplicate.setAttribute(
                        'aria-hidden',
                        'true'
                    );

                    track.appendChild(
                        duplicate
                    );
                }
            );


            return track;
        }


        const rowOne =
            document.createElement(
                'div'
            );

        rowOne.className =
            'work-tape-row';


        rowOne.appendChild(
            makeTrack(
                projects,
                false
            )
        );


        const rowTwo =
            document.createElement(
                'div'
            );

        rowTwo.className =
            'work-tape-row';


        rowTwo.appendChild(
            makeTrack(
                categories,
                true
            )
        );


        tape.appendChild(
            rowOne
        );

        tape.appendChild(
            rowTwo
        );


        accordion.after(
            tape
        );
    }


    /* =========================================================
       FEATURED WORK
       ========================================================= */

    function setupFeaturedWork(
        openModal
    ) {

        const workSection =
            document.getElementById(
                'work'
            );

        const accordion =
            document.getElementById(
                'accordionStage'
            );

        const cards =
            [
                ...document.querySelectorAll(
                    '.work-card'
                )
            ];

        const indicator =
            document.getElementById(
                'workIndicatorProgress'
            );


        if (!cards.length) {
            return;
        }


        let slideshowIntervals =
            [];


        function updateIndicator(
            index
        ) {

            if (
                !indicator ||
                window.innerWidth <=
                768
            ) return;


            const width =
                100 /
                cards.length;


            indicator.style.width =
                `${width}%`;


            indicator.style.transform =
                `translateX(
                    ${index * 100}%
                )`;
        }


        function stopSlideshow(
            card
        ) {

            slideshowIntervals =
                slideshowIntervals.filter(
                    item => {

                        if (
                            item.card !==
                            card
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
                            (
                                slide,
                                index
                            ) => {

                                const active =
                                    index ===
                                    0;


                                slide.classList.toggle(
                                    'active-slide',
                                    active
                                );


                                if (
                                    slide.tagName ===
                                    'VIDEO'
                                ) {

                                    if (
                                        active
                                    ) {

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


        function startSlideshow(
            card
        ) {

            const wrap =
                card.querySelector(
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
                slides.length <=
                1
            ) return;


            stopSlideshow(
                card
            );


            let index =
                slides.findIndex(
                    slide =>
                        slide.classList.contains(
                            'active-slide'
                        )
                );


            if (index < 0) {
                index = 0;
            }


            const interval =
                setInterval(
                    () => {

                        slides[index]
                            .classList
                            .remove(
                                'active-slide'
                            );


                        if (
                            slides[index]
                                .tagName ===
                            'VIDEO'
                        ) {

                            slides[index]
                                .pause();
                        }


                        index =
                            (
                                index + 1
                            ) %
                            slides.length;


                        slides[index]
                            .classList
                            .add(
                                'active-slide'
                            );


                        if (
                            slides[index]
                                .tagName ===
                            'VIDEO'
                        ) {

                            slides[index].muted =
                                true;

                            slides[index]
                                .play()
                                .catch(
                                    () => {}
                                );
                        }

                    },
                    2800
                );


            slideshowIntervals.push({
                card,
                interval
            });
        }


        if (cards[0]) {

            startSlideshow(
                cards[0]
            );

            updateIndicator(
                0
            );
        }


        cards.forEach(
            (
                card,
                index
            ) => {

                card.addEventListener(
                    'mouseenter',
                    () => {

                        if (
                            window.innerWidth <=
                            768
                        ) return;


                        cards.forEach(
                            other => {

                                if (
                                    other !==
                                    card
                                ) {

                                    other.classList.remove(
                                        'active'
                                    );

                                    stopSlideshow(
                                        other
                                    );

                                    other
                                        .querySelectorAll(
                                            'video'
                                        )
                                        .forEach(
                                            video =>
                                                video.pause()
                                        );
                                }
                            }
                        );


                        card.classList.add(
                            'active'
                        );


                        updateIndicator(
                            index
                        );


                        startSlideshow(
                            card
                        );


                        const activeVideo =
                            card.querySelector(
                                '.active-slide'
                            );


                        if (
                            activeVideo &&
                            activeVideo.tagName ===
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
                            window.innerWidth >
                                768 &&
                            !card.classList.contains(
                                'active'
                            )
                        ) return;


                        if (
                            openModal
                        ) {

                            openModal(
                                card.getAttribute(
                                    'data-project'
                                )
                            );
                        }
                    }
                );
            }
        );


        /* Mobile horizontal scroll */

        if (accordion) {

            accordion.addEventListener(
                'scroll',
                () => {

                    if (
                        window.innerWidth >
                        768
                    ) return;


                    const width =
                        accordion.offsetWidth;


                    const index =
                        Math.round(
                            accordion.scrollLeft /
                            (
                                width *
                                .85
                            )
                        );


                    if (
                        cards[index] &&
                        !cards[index]
                            .classList
                            .contains(
                                'active'
                            )
                    ) {

                        cards.forEach(
                            card =>
                                card.classList.remove(
                                    'active'
                                )
                        );


                        cards[index]
                            .classList
                            .add(
                                'active'
                            );
                    }
                },
                {
                    passive: true
                }
            );
        }


        /* Work reveal */

        if (
            workSection &&
            'IntersectionObserver'
                in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        if (
                            entries[0]
                                .isIntersecting
                        ) {

                            workSection
                                .querySelectorAll(
                                    '.animate-init'
                                )
                                .forEach(
                                    element =>
                                        element.classList.add(
                                            'animate-active'
                                        )
                                );


                            observer.unobserve(
                                workSection
                            );
                        }
                    },
                    {
                        threshold:
                            .05
                    }
                );


            observer.observe(
                workSection
            );
        }


        /* Work parallax */

        if (
            prefersReducedMotion
        ) return;


        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            'mousemove',
            event => {

                targetX =
                    (
                        event.clientX -
                        window.innerWidth /
                        2
                    ) /
                    (
                        window.innerWidth /
                        2
                    );


                targetY =
                    (
                        event.clientY -
                        window.innerHeight /
                        2
                    ) /
                    (
                        window.innerHeight /
                        2
                    );
            },
            {
                passive: true
            }
        );


        function parallax() {

            currentX +=
                (
                    targetX -
                    currentX
                ) *
                .08;


            currentY +=
                (
                    targetY -
                    currentY
                ) *
                .08;


            if (
                window.innerWidth >
                768
            ) {

                const active =
                    document.querySelector(
                        '.work-card.active .card-bg-wrap .active-slide'
                    );


                if (active) {

                    active.style.setProperty(
                        '--move-x',
                        `${currentX * 28}px`
                    );


                    active.style.setProperty(
                        '--move-y',
                        `${currentY * 28}px`
                    );
                }
            }


            requestAnimationFrame(
                parallax
            );
        }


        requestAnimationFrame(
            parallax
        );
    }


    /* =========================================================
       VIDEO AUTOPLAY
       ========================================================= */

    function setupVideo() {

        const video =
            document.getElementById(
                'showcaseVideo'
            );


        if (!video) return;


        video.muted =
            true;


        video
            .play()
            .catch(
                () => {

                    const retry =
                        () => {

                            video
                                .play()
                                .catch(
                                    () => {}
                                );
                        };


                    window.addEventListener(
                        'click',
                        retry,
                        {
                            once: true
                        }
                    );


                    window.addEventListener(
                        'scroll',
                        retry,
                        {
                            once: true
                        }
                    );
                }
            );
    }


    /* =========================================================
       GSAP
       ========================================================= */

    function setupGSAP() {

        if (
            !window.gsap ||
            !window.ScrollTrigger ||
            prefersReducedMotion
        ) return;


        gsap.registerPlugin(
            ScrollTrigger
        );


        gsap
            .utils
            .toArray(
                '.about-meta, .skills-grid'
            )
            .forEach(
                element => {

                    gsap.fromTo(
                        element,

                        {
                            y: 24
                        },

                        {
                            y: 0,

                            ease:
                                'none',

                            scrollTrigger: {

                                trigger:
                                    element,

                                start:
                                    'top bottom',

                                end:
                                    'top center',

                                scrub:
                                    .6
                            }
                        }
                    );
                }
            );
    }


    /* =========================================================
       INITIALIZE
       ========================================================= */

    prepareHero();

    injectStyles();

    setupLoaderName();

    buildKineticName();

    createWorkTapes();

    const openModal =
        setupModal();

    setupNavbar();

    setupReveals();

    setupAbout();

    setupTimeline();

    setupFooter();

    setupCursorGlow();

    setupMagneticButtons();

    setupFeaturedWork(
        openModal
    );

    setupVideo();

    setupGSAP();

    setupHeroCursor();

    startLoader();

})();
