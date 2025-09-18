document.addEventListener("DOMContentLoaded", () => {

            // Particles.js configuration - loaded from CDN
            const particlesConfig = {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#00a8f3"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#ffffffff"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false
                    },
                    "size": {
                        "value": 3,
                        "random": true
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00a8f3",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    }
                },
                "retina_detect": true
            };

            // Load particles.js if it's available
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', particlesConfig);
            }

    // --- Hero Terminal Typing Animation ---
    const subtitleElement = document.getElementById("terminal-subtitle");
    const textToType = 'Executing script: adeel_abbasi.py...\n> Specializing in automation, web apps, and data analysis.';
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            // Use innerHTML to correctly render newline characters
            subtitleElement.innerHTML += textToType.charAt(charIndex).replace('\n', '<br>');
            charIndex++;
            setTimeout(type, 50); // Speed of typing
        }
    }
    // Start typing after a short delay
    setTimeout(type, 1500);

    // --- On-Scroll Animations ---
    const animatedElements = document.querySelectorAll('.service-card, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a staggered delay for a nicer effect
                entry.target.style.setProperty('--delay', `${index * 100}ms`);
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Footer Year ---
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});