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

 