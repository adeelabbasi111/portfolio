document.addEventListener("DOMContentLoaded", () => {

    // --- 1. PRE-LOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match CSS transition
    });

    // --- 2. HERO 3D TITLE ANIMATION ---
    const heroTitle = document.querySelector('.hero-title');
    const titleText = "Building Digital";
    titleText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        if (index==17) heroTitle.appendChild(document.createElement('br')); 
        span.textContent = char === ' ' ? '\u00A0' : char;
        
        // Use non-breaking space
        span.style.animationDelay = `${index * 50}ms`;
        heroTitle.appendChild(span);
    });

    // --- 3. PARTICLE.JS BACKGROUND ---
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#2A2A3C' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#2A2A3C', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 140, line_opacity: 1 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });

    // --- 4. PROJECT CARD STACK SCROLL EFFECT ---
    const projectCards = document.querySelectorAll('.project-card');
    window.addEventListener('scroll', () => {
        projectCards.forEach((card, index) => {
            // Only apply this effect to all but the last card
            if (index < projectCards.length - 1) {
                const rect = card.getBoundingClientRect();
                // Scale down the card as it approaches the top of the viewport
                if (rect.top < window.innerHeight && rect.top > 1000) {
                    const scale = 1 - (index * 0.05) - (rect.top / window.innerHeight) * 0.1;
                    card.style.transform = `scale(${Math.max(0.8, scale)})`; // Don't let it get too small
                    card.style.opacity = (rect.top / window.innerHeight) * 2;
                }
            }
        });
    });
    
    // Auto-play videos when they are mostly visible
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.9 });
    projectCards.forEach(card => videoObserver.observe(card));


    // --- 5. MAGNETIC BUTTONS ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0,0) scale(1)';
        });
    });
    
    // --- FOOTER YEAR ---
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

});