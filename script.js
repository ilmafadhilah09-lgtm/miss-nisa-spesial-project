// Step control
function goToQuiz() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
}

function finish() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");

  const text = `Terima kasih ya, Miss Nisa 🌿🤍  
Udah sabar banget ngajarin aku hal-hal keren.  
Miss selalu jadi guru yang nyemangatin dan inspiratif buat aku.  
Semoga Miss selalu sehat, bahagia, dan makin keren setiap harinya 🤍✨  
I LOVE YOU MISS NISAA 😆✨🤍`;

  const target = document.getElementById("final-text");
  const typingSound = document.getElementById("typing-sound");
  const bgMusic = document.getElementById("bg-music");

  let i = 0;
  target.innerHTML = "";
  bgMusic.volume = 0.4;
  bgMusic.play();

  function typeWriter() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      typingSound.currentTime = 0;
      typingSound.play();
      i++;
      setTimeout(typeWriter, 60);
    } else {
      startConfetti();

      // --- Signature muncul pelan ---
      setTimeout(() => {
        const footer = document.createElement("p");
        footer.textContent = "💚 from your SMART student";
        footer.style.marginTop = "40px";
        footer.style.fontSize = "1.2rem";
        footer.style.color = "#b5ffb5";
        footer.style.textShadow = "0 0 15px #00ff80, 0 0 30px #00ffaa";
        footer.style.opacity = "0";
        footer.style.transition = "opacity 2s ease";
        document.getElementById("final").appendChild(footer);
        setTimeout(() => (footer.style.opacity = "1"), 500);
      }, 1000);
    }
  }

  typeWriter();
}

// Confetti
function startConfetti() {
  const duration = 6 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      spread: 70,
      startVelocity: 40,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ["#00ff80", "#00ffaa", "#ffffff"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Matrix background
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01HTMLCSSJS💻❤️";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff80";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(draw, 33);