// Initialize Intersection Observers to trigger staggered viewport entrances
const workSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Force the layout to reveal immediately if it intersects OR on window load fallback
        if (entry.isIntersecting || document.readyState === 'complete') {
            workSection.querySelectorAll('.animate-init').forEach(el => {
                el.classList.add('animate-active');
            });
            workSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 }); // Lowered threshold so it triggers the moment it touches the viewport edge

if (workSection) {
    workSectionObserver.observe(workSection);
    
    // Safety Fallback: Force reveal after 1 second if observer struggles to fire
    setTimeout(() => {
        workSection.querySelectorAll('.animate-init').forEach(el => {
            el.classList.add('animate-active');
        });
    }, 1000);
}
