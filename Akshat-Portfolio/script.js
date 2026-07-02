Skip to content
sakshigupta023
akshats.portfolio
Repository navigation
Code
Issues
Pull requests
Agents
Actions
Projects
Security and quality
Insights
Settings
Files
Go to file
t
T
Akshat-Portfolio
assets
README.md
index.html
script.js
style.css
akshats.portfolio/Akshat-Portfolio
/
script.js
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing script.js file contents
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
/* ============================================================
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
            activeVideo.play().catch(err => console.log("Autoplay blocked:", err));
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
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
