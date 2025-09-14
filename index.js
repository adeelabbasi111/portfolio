const skills = ["Web Developer", "Photoshop Expert", "Video Editor",
    "Game Developer", "App Developer", "Music Producer","Python Developer"
];


let skillIndex = 0;
const skillText = document.getElementById("skillText");

function updateSkill() {
  skillText.textContent = skills[skillIndex];
  
  skillIndex = (skillIndex + 1) % skills.length;
}

// Change skill every 500ms
setInterval(updateSkill, 500);

document.addEventListener("DOMContentLoaded", () => {
 // Skill Timeline Animation
  const skillItems = document.querySelectorAll(".skill-item");
  const skillContainer = document.querySelector(".skill-container");
  const line = skillContainer.querySelector("::after"); // Cannot select pseudo-element directly with JS

  // Observer for Skill Items
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optionally, if you want the line to draw based on first skill item visibility
          if (entry.target === skillItems[0]) {
            document.documentElement.style.setProperty('--animation-play-state', 'running');
          }
        } else {
          // Optional: remove is-visible when not intersecting to replay animation on scroll up
          // entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the item is visible
  );

  skillItems.forEach((item) => {
    skillObserver.observe(item);
  });

  // NEW: Education Section Animation
  const educationItems = document.querySelectorAll(".education-item");

  const educationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -50px 0px" } // Slightly adjusted threshold and rootMargin
  );

  educationItems.forEach((item) => {
    educationObserver.observe(item);
  });

    // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

});
