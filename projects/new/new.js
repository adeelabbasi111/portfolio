document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- On-Scroll Animations using Intersection Observer ---
    const animatedElements = document.querySelectorAll('.service-item, .portfolio-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger the CSS transition
                entry.target.classList.add('animate-in');
                
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});