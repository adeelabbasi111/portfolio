document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Services Timeline Animation ---
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Start drawing the timeline line when the first item is visible
                if (entry.target === serviceItems[0]) {
                    document.documentElement.style.setProperty('--animation-play-state', 'running');
                }
                serviceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    serviceItems.forEach(item => {
        serviceObserver.observe(item);
    });

    // --- Portfolio Grid Card Animation ---
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    portfolioCards.forEach(card => {
        cardObserver.observe(card);
    });
});