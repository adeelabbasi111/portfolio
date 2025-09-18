document.addEventListener("DOMContentLoaded", () => {
    // --- 1. DATA: Define all your tracks here ---
    const tracks = [
        { id: 'hackathon', title: 'Hackathon', imageSrc: 'images/hackathon.jpg', audioSrc: 'audio/hackathon.mp3' },
        { id: 'pankchi', title: 'Pankchi', imageSrc: 'images/pankchi.jpg', audioSrc: 'audio/pankchi.mp3' },
        { id: 'ashquie', title: 'Ashquie', imageSrc: 'images/ashquie.jpg', audioSrc: 'audio/ashquie.mp3' },
        { id: 'badday', title: 'Badday', imageSrc: 'images/badday.jpg', audioSrc: 'audio/badday.mp3' },
        { id: 'idgaf', title: 'IDGAF', imageSrc: 'images/idgaf.jpg', audioSrc: 'audio/idgaf.mp3' },
        { id: 'king-kon', title: 'King Kon', imageSrc: 'images/king-kon.jpg', audioSrc: 'audio/king-kon.mp3' },
        { id: 'nadan', title: 'Nadan', imageSrc: 'images/nadan.jpg', audioSrc: 'audio/nadan.mp3' },
        { id: 'snake', title: 'Snake', imageSrc: 'images/snake.jpg', audioSrc: 'audio/snake.mp3' },
        { id: 'tarah', title: 'Tarah', imageSrc: 'images/tarah.jpg', audioSrc: 'audio/tarah.mp3' },
    ];

    // --- 2. DOM Elements ---
    const carousel = document.getElementById('track-carousel');
    const albumArt = document.getElementById('current-album-art');
    const trackTitle = document.getElementById('current-track-title');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');

    let activeTrackElement = null;

    // --- 3. Initialize WaveSurfer ---
    const wavesurfer = WaveSurfer.create({
        container: '#main-waveform',
        waveColor: 'rgba(164, 156, 201, 0.5)',
        progressColor: '#00f2ea', // Neon Cyan
        cursorColor: '#ff00e6',   // Electric Magenta
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        height: 80,
        responsive: true,
    });

    // --- 4. Core Player Functions ---
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const loadTrack = (track) => {
        // Update UI
        albumArt.style.opacity = 0;
        albumArt.style.transform = 'scale(0.95)';
        setTimeout(() => {
            albumArt.src = track.imageSrc;
            trackTitle.textContent = track.title;
            albumArt.style.opacity = 1;
            albumArt.style.transform = 'scale(1)';
        }, 300);

        // Load and play audio
        wavesurfer.load(track.audioSrc);
        wavesurfer.once('ready', () => {
            totalTimeEl.textContent = formatTime(wavesurfer.getDuration());
            wavesurfer.play();
        });

        // Update active state in carousel
        if (activeTrackElement) {
            activeTrackElement.classList.remove('active');
        }
        activeTrackElement = document.querySelector(`[data-id="${track.id}"]`);
        activeTrackElement.classList.add('active');
    };

    // --- 5. Event Listeners ---
    wavesurfer.on('audioprocess', () => {
        currentTimeEl.textContent = formatTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on('finish', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    wavesurfer.on('play', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    wavesurfer.on('pause', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    playPauseBtn.addEventListener('click', () => {
        wavesurfer.playPause();
    });

    // --- 6. Build UI and Initialize ---
    tracks.forEach(track => {
        const trackEl = document.createElement('div');
        trackEl.className = 'track-item';
        trackEl.dataset.id = track.id;
        trackEl.innerHTML = `<img src="${track.imageSrc}" alt="${track.title}">`;
        
        trackEl.addEventListener('click', () => loadTrack(track));
        carousel.appendChild(trackEl);
    });

    // Load the first track automatically
    if (tracks.length > 0) {
        loadTrack(tracks[0]);
        wavesurfer.pause(); // Start in a paused state
    }
    
    // Set current year in footer
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});