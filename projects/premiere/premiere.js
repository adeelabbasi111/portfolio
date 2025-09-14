document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // --- On-Scroll Animations using Intersection Observer ---
  const animatedElements = document.querySelectorAll(
    ".timeline-item, .portfolio-card"
  );
  const timeline = document.querySelector(".timeline-container::after");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Special handling for the timeline line
          if (entry.target.classList.contains("timeline-item")) {
            document
              .querySelector(".timeline-container")
              .style.setProperty("--animation-state", "running");
          }
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe each element
  animatedElements.forEach((el) => observer.observe(el));

  // Special observer for the timeline line itself
  const lineObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.style.animationPlayState = "running";
      }
    },
    { threshold: 0.1 }
  );

  const timelineContainer = document.querySelector(".timeline-container");
  if (timelineContainer) {
    lineObserver.observe(timelineContainer);
  }

  // --- Video Lightbox Functionality ---
  const lightbox = document.getElementById("lightbox");
  const lightboxVideo = document.getElementById("lightbox-video");
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  const closeButton = document.querySelector(".lightbox-close");

  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoSrc = card.getAttribute("data-video-src");
      if (videoSrc) {
        lightboxVideo.setAttribute("src", videoSrc + "?autoplay=1"); // Autoplay
        lightbox.classList.add("active");
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightboxVideo.setAttribute("src", ""); // Stop the video
  };

  closeButton.addEventListener("click", closeLightbox);
  // Also close lightbox when clicking on the background
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
