
const options = {
  container: "#tarah",
  height: 50,
  width: 250,
  waveColor: "#707070ff",
  progressColor: "#f0a61eff",
  cursorColor: "#2df8ffff",
  cursorWidth: 2,
  barWidth: 3,
  barGap: NaN,
  barRadius: 20,
  barAlign: "",
  fillParent: true,
  url: "audio/tarah.mp3",
  mediaControls: false,
  interact: true,
  dragToSeek: true,
  hideScrollbar: true,
  audioRate: 1,
  autoScroll: true,
  autoCenter: true,
  sampleRate: 8000,
};

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}

var wavesurfers = [];

document.querySelectorAll(".wave").forEach((el) => {
  const id = el.id;
  const wavesurfer = WaveSurfer.create({
    ...options,
    container: `#${id}`,
    url: `audio/${id}.mp3`,
  });

  wavesurfers.push(wavesurfer);

  wavesurfer.on("ready", () => {
    el.closest(".song-card").querySelector("#total-time").textContent =
      formatTime(wavesurfer.getDuration());
  });

  wavesurfer.on("audioprocess", () => {
    el.closest(".song-card").querySelector("#current-time").textContent =
      formatTime(wavesurfer.getCurrentTime());
  });

  wavesurfer.on("complete", () => {
    el.closest(".song-card").querySelector("#current-time").textContent =
      formatTime(0);
  });
  // Find play/pause buttons inside this song-card only
  const card = el.closest(".song-card");
  const playBtn = card.querySelector(".playbtn");
  const pauseBtn = card.querySelector(".pausebtn");

  playBtn.addEventListener("click", function () {
    PauseAll();
    wavesurfer.playPause();
    playBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
  });

  pauseBtn.addEventListener("click", function () {
    wavesurfer.playPause();
    pauseBtn.classList.toggle("hidden");
    playBtn.classList.toggle("hidden");
  });
});

function PauseAll(){
  $(".playbtn").removeClass("hidden");
  $(".pausebtn").addClass("hidden");
  for (let i = 0; i < wavesurfers.length; i++) {
    if(wavesurfers[i].isPlaying()){
      wavesurfers[i].pause();
    
  }
}
}


