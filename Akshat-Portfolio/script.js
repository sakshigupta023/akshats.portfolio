/* ===========================================
   LOADER
=========================================== */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

/* ===========================================
   NAVBAR SCROLL
=========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* ===========================================
   SCROLL REVEAL
=========================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section,.card,.skill,.timeline-item").forEach((el) => {

    observer.observe(el);

});

/* ===========================================
   HERO IMAGE FLOAT
=========================================== */

const heroImage = document.querySelector(".hero-image");

let angle = 0;

function floatImage() {

    angle += 0.01;

    heroImage.style.transform =
        `translateY(${Math.sin(angle) * 10}px)`;

    requestAnimationFrame(floatImage);

}

floatImage();

/* ===========================================
   HERO PARALLAX
=========================================== */

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 45;

    const y = (window.innerHeight / 2 - e.clientY) / 45;

    heroImage.style.transform =

        `translate(${x}px,${y}px)`;

});

/* ===========================================
   BUTTON RIPPLE
=========================================== */

document.querySelectorAll(".btn-primary").forEach((button) => {

button.addEventListener("mousemove",(e)=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

button.style.setProperty("--x",x+"px");

button.style.setProperty("--y",y+"px");

});

});
/* ===========================================
   SMOOTH SCROLL
=========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});

/* ===========================================
   CARD HOVER TILT
=========================================== */

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        card.style.transform = `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

});

/* ===========================================
   ACTIVE NAV LINK
=========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const top = section.offsetTop - 150;

        if (pageYOffset >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ===========================================
   SKILL HOVER EFFECT
=========================================== */

const skills = document.querySelectorAll(".skill");

skills.forEach((skill) => {

    skill.addEventListener("mouseenter", () => {

        skill.style.transform = "translateY(-8px) scale(1.05)";

    });

    skill.addEventListener("mouseleave", () => {

        skill.style.transform = "translateY(0) scale(1)";

    });

});

/* ===========================================
   PARALLAX GLOW
=========================================== */

const glow = document.querySelector(".gradient");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth) * 100;

    const y = (e.clientY / window.innerHeight) * 100;

    glow.style.background = `
    radial-gradient(circle at ${x}% ${y}%,
    rgba(158,255,79,.22),
    transparent 70%)
    `;

});

/* ===========================================
   CONSOLE MESSAGE
=========================================== */

console.log(
"%cDesigned & Developed by Sakshi ❤️",
"color:#9EFF4F;font-size:16px;font-weight:bold;"
);
