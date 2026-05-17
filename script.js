const enterBtn = document.getElementById("enterBtn");
const welcome = document.getElementById("welcomeScreen");
const content = document.getElementById("mainContent");

const audioFab = document.getElementById("audioFab");
const audioPanel = document.getElementById("audioPanel");
const volumeControl = document.getElementById("volumeControl");
const muteToggle = document.getElementById("muteToggle");
const bgMusic = document.getElementById("bgMusic");

const galleryTrack = document.getElementById("galleryTrack");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

let lastVolumeBeforeMute = Number(volumeControl.value);

bgMusic.volume = lastVolumeBeforeMute;

enterBtn.addEventListener("click", async () => {
  welcome.style.opacity = "0";
  welcome.style.transform = "translateY(-12px)";

  setTimeout(() => {
    welcome.classList.add("hidden");
    content.classList.remove("hidden");
    startReveal();
  }, 450);

  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      updateMusicIcon();
    } catch {
      // El navegador puede bloquear autoplay hasta interacción adicional.
    }
  }
});

audioFab.addEventListener("click", () => {
  const isHidden = audioPanel.classList.contains("hidden");
  audioPanel.classList.toggle("hidden");
  audioFab.setAttribute("aria-expanded", String(isHidden));
});

volumeControl.addEventListener("input", () => {
  const volume = Number(volumeControl.value);
  bgMusic.volume = volume;

  if (volume > 0) {
    bgMusic.muted = false;
    lastVolumeBeforeMute = volume;
    muteToggle.textContent = "Silenciar";
    muteToggle.classList.remove("is-muted");
    muteToggle.setAttribute("aria-pressed", "false");
  } else {
    bgMusic.muted = true;
    muteToggle.textContent = "Activar";
    muteToggle.classList.add("is-muted");
    muteToggle.setAttribute("aria-pressed", "true");
  }

  updateMusicIcon();
});

muteToggle.addEventListener("click", () => {
  if (bgMusic.muted || bgMusic.volume === 0) {
    bgMusic.muted = false;
    const restoredVolume = lastVolumeBeforeMute > 0 ? lastVolumeBeforeMute : 0.6;
    bgMusic.volume = restoredVolume;
    volumeControl.value = String(restoredVolume);
    muteToggle.textContent = "Silenciar";
    muteToggle.classList.remove("is-muted");
    muteToggle.setAttribute("aria-pressed", "false");
  } else {
    lastVolumeBeforeMute = bgMusic.volume;
    bgMusic.muted = true;
    muteToggle.textContent = "Activar";
    muteToggle.classList.add("is-muted");
    muteToggle.setAttribute("aria-pressed", "true");
  }

  updateMusicIcon();
});

function updateMusicIcon() {
  audioFab.textContent = bgMusic.muted || bgMusic.volume === 0 ? "🔇" : "🎵";
}

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
