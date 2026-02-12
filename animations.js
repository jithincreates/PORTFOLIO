// Intersection Observer for Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in-section');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Dynamic Gradient Effect on Scroll
let ticking = false;

function updateGradient() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const gradientY = 20 + (scrollPercent * 60); // Moves from 20% to 80%
    const gradientX = 50 + (Math.sin(scrollPercent * Math.PI * 2) * 10); // Subtle horizontal shift

    document.body.style.setProperty('--gradient-x', `${gradientX}%`);
    document.body.style.setProperty('--gradient-y', `${gradientY}%`);

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateGradient();
        });
        ticking = true;
    }
});

// Initialize gradient position
updateGradient();
