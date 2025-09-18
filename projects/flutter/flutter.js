document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Interactive Floating Widgets in Hero ---
    const hero = document.getElementById('hero-flutter');
    const widgets = document.querySelectorAll('.widget');

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate movement based on cursor position from center
        const moveX = (clientX - centerX) * -0.01;
        const moveY = (clientY - centerY) * -0.01;

        // Apply parallax effect to each widget with different intensity
        widgets.forEach((widget, index) => {
            const intensity = (index + 1) * 0.5;
            widget.style.transform = `translate(${moveX * intensity}px, ${moveY * intensity}px)`;
        });
    });

    // --- 2. Glowing Border Effect on Feature Cards ---
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 3. Interactive Project Showcase ---
    const projectItems = document.querySelectorAll('.project-item');
    const displayImage = document.getElementById('project-display-image');

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            projectItems.forEach(p => p.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            const newImageSrc = item.getAttribute('data-image');
            
            // Fade out the old image, change src, then fade in
            displayImage.style.opacity = 0;
            setTimeout(() => {
                displayImage.src = newImageSrc;
                displayImage.style.opacity = 1;
            }, 500); // Match CSS transition duration
        });
    });

    // --- 4. On-Scroll Fade-in Animations ---
    const animatedElements = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--delay', `${index * 150}ms`);
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- 5. Footer Year ---
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});