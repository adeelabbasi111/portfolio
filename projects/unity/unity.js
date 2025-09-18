document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LOADING SCREEN ---
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.progress');
    window.addEventListener('load', () => {
        progress.style.width = '100%';
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 2200); // Wait for progress bar animation to finish
    });

    // --- 2. UI SOUND EFFECTS ---
    const synth = new Tone.Synth().toDestination();
    const playHoverSound = () => synth.triggerAttackRelease("C2", "8n");
    const playClickSound = () => synth.triggerAttackRelease("C4", "8n");

    document.querySelectorAll('.skill-item, .btn-launch, .btn-social').forEach(el => {
        el.addEventListener('mouseenter', playHoverSound);
        el.addEventListener('click', playClickSound);
    });
    
    // --- 3. INTERACTIVE 3D HERO with THREE.JS ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-canvas').appendChild(renderer.domElement);

    // Create a Unity-like cube with an emissive material
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ffc3,
        emissive: 0x00ffc3,
        emissiveIntensity: 1,
        metalness: 0.8,
        roughness: 0.4
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        // Rotate cube based on its own axis
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        // Rotate the entire scene slightly based on mouse position for a parallax effect
        scene.rotation.y = mouseX * 0.2;
        scene.rotation.x = mouseY * 0.2;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- 4. 3D TILT EFFECT FOR MISSION CARDS ---
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (rect.height / 2 - y) * 0.05;
            const rotateY = (x - rect.width / 2) * 0.05;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
        // Auto-play videos on hover
        card.addEventListener('mouseenter', () => card.querySelector('video').play());
        card.addEventListener('mouseleave', () => card.querySelector('video').pause());
    });

    // --- 5. FOOTER YEAR ---
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});