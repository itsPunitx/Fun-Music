// Load single piano sound
const sound = new Audio("sounds/A.mp3");

// Romantic messages (10 options)
const messages = [
  "You are my sunshine 🌹",
  "Forever & Always 💕",
  "Made for each other 💖",
  "Love is in the air 💌",
  "You complete me ❤️",
  "My heart beats for you 💓",
  "Together forever 🌙",
  "You & Me = Magic ✨",
  "Endless Love 💍",
  "Happily Ever After 🕊️"
];

// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Floating text particles
let texts = [];

// Track if sound is already playing
let isPlaying = false;

class FloatingText {
  constructor(text) {
    this.text = text;
    this.x = canvas.width / 2;   // Center horizontally
    this.y = canvas.height / 2;  // Center vertically
    this.size = 50;
    this.opacity = 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }
  update() {
    this.opacity -= 0.01; // fade out
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px "Comic Sans MS", cursive`;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}

// Handle keypress
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Stop music and clear everything
    sound.pause();
    sound.currentTime = 0;
    isPlaying = false;
    texts = [];
    return;
  }

  // Play the music only if not already playing
  if (!isPlaying) {
    sound.currentTime = 0;
    sound.play();
    isPlaying = true;

    // When music finishes, reset flag
    sound.onended = () => {
      isPlaying = false;
    };
  }

  // Pick random romantic message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Create floating text in center
  texts.push(new FloatingText(randomMessage));
});

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  texts.forEach((t, i) => {
    t.update();
    t.draw();
    if (t.opacity <= 0) texts.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();
