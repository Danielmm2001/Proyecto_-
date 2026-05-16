const enterBtn = document.getElementById("enterBtn");
const welcome = document.getElementById("welcomeScreen");
const content = document.getElementById("mainContent");
const audioToggle = document.getElementById("audioToggle");
const bgMusic = document.getElementById("bgMusic");

const galleryTrack = document.getElementById("galleryTrack");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

enterBtn.addEventListener("click", () => {
  welcome.style.opacity = "0";
  welcome.style.transform = "translateY(-12px)";

  setTimeout(() => {
    welcome.classList.add("hidden");
    content.classList.remove("hidden");
    startReveal();
  }, 450);
});

audioToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      audioToggle.textContent = "⏸️ Pausar música";
      audioToggle.setAttribute("aria-pressed", "true");
    } catch {
      audioToggle.textContent = "No se pudo activar audio";
    }
  } else {
    bgMusic.pause();
    audioToggle.textContent = "🎵 Activar música";
    audioToggle.setAttribute("aria-pressed", "false");
  }
});

function startReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((item) => observer.observe(item));
}

function slideBy(direction = 1) {
  const width = galleryTrack.clientWidth;
  galleryTrack.scrollBy({
    left: width * direction,
    behavior: "smooth",
  });
}

nextSlide.addEventListener("click", () => slideBy(1));
prevSlide.addEventListener("click", () => slideBy(-1));
